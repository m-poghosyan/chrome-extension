import React, { Component } from "react";
import intl from "react-intl-universal";
import LinearProgress from "@material-ui/core/LinearProgress";

import rewards from "./rewards.json";
import * as Analytics from "../libs/analytics";
import * as ExtensionUtils from "../libs/extensionUtils";
import * as UrlUtils from "../libs/urlUtils";
import Header from "./components/Header";
import Layout from "./components/Layout";
import CouponsTab from "./components/CouponsTab";
import ProfileTab from "./components/ProfileTab";
import Reward from "./components/Reward";
import ShopsTab from "./components/ShopsTab";
import Tabs from "./components/Tabs";
import withIntl from "./withIntl";
import withTheme from "./withTheme";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getFixedAllCoupons,
  getActiveCoupons,
  getCouponURLPromise,
  getSelectedCoupon
} from "./redux/reducers/couponsReducer";
import {
  getAllShops,
  getShopsWithCoupons,
  getCurrentShop
} from "./redux/reducers/shopsReducer";
import {
  setLoadingState,
  getCurrentHost,
  getErrorMessage,
  getTabIndex
} from "./redux/reducers/appReducer.js";
import {
  activeCouponsSelect,
  getIsSelectedCouponSelect
} from "./redux/selectors/couponsSelector.js";
import {
  allShopsSelect,
  getCurrentShopSelect
} from "./redux/selectors/shopsSelector.js";
import {
  loadingStateSelect,
  currentHostSelect,
  errorMessageSelect,
  getTabIndexSelect
} from "./redux/selectors/appSelector.js";
import {
  goldCountSelect,
  goldIncreaseSelect,
  goldIncreaseReasonSelect
} from "./redux/selectors/profileSelector.js";
import {
  getGoldCount,
  getGoldIncrease,
  getGoldIncreaseReason
} from "./redux/reducers/profileReducer.js";
import CouponDescHeader from "./components/CouponDescHeader/index.js";

const STORAGE_PROFILE_KEY = "promocot-profile";

const fetchProfile = () => ExtensionUtils.Storage.get(STORAGE_PROFILE_KEY);
const saveProfile = profile =>
  ExtensionUtils.Storage.set(STORAGE_PROFILE_KEY, profile);

const isDefaultHost = host =>
  host === process.env.REACT_APP_WEBSITE_HOST || host === "localhost";

class App extends Component {
  async componentDidMount() {
    const { getFixedAllCoupons, getAllShops, getCurrentHost } = this.props;
    Analytics.init();
    await getFixedAllCoupons();
    await getAllShops();
    await getCurrentHost();
    const { currentHost } = this.props;

    Analytics.pageview(currentHost);
    Analytics.event("open-popup", currentHost);

    this.fetchShopsAndCouponsAndGold(currentHost);
    // Fetch all shops coupons
  }

  fetchShopsAndCouponsAndGold = async host => {
    try {
      // Fetch all shops
      const { allShops, getActiveCoupons } = this.props;
      // Find shop with current location
      const currentShop = isDefaultHost(host)
        ? { shop_id: null, host }
        : UrlUtils.findCurrentShop(allShops, host);

      if (!currentShop) {
        // Set only available shops
        this.setShopsAndCoupons(allShops, currentShop);
      } else {
        await getActiveCoupons(currentShop.shop_id);
        this.setShopsAndCoupons(allShops, currentShop);
      }
      // Fetch current profile info from chrome storage
      this.fetchGold(host);
    } catch (e) {
      this.setError(
        intl.get("coupons.fetch.error").d("Failed to load coupons")
      );
    }
  };

  setShopsAndCoupons = (shops, currentShop = null) => {
    const {
      setLoadingState,
      getShopsWithCoupons,
      getCurrentShop,
      getErrorMessage
    } = this.props;
    const shopsWithCoupons = shops
      .filter(shop => !!shop.counters.show)
      .sort((s1, s2) =>
        s1.counters.show < s2.counters.show
          ? 1
          : s1.counters.show > s2.counters.show
          ? -1
          : 0
      );
    setLoadingState(false);
    getShopsWithCoupons(shopsWithCoupons);
    getCurrentShop(currentShop);
    getErrorMessage(null);
  };

  setError = errorMessage => {
    const {
      setLoadingState,
      getShopsWithCoupons,
      getCurrentShop,
      getErrorMessage
    } = this.props;
    setLoadingState(false);
    getShopsWithCoupons([]);
    getCurrentShop(null);
    getErrorMessage(errorMessage);
  };

  fetchGold = async host => {
    const { getGoldCount } = this.props;
    const profile = await fetchProfile();
    if (profile && profile.gold) {
      getGoldCount(profile.gold);
      return;
    }

    Analytics.event("open-popup-first", host);
    this.reward(
      rewards.first_open_popup,
      intl.get("reward.for_first_open").d("For first open Promocot")
    );
  };

  storeGold = async (gold, goldIncrease, goldIncreaseReason) => {
    let profile = await fetchProfile();
    if (!profile || typeof profile !== "object") {
      profile = {};
    }
    if (!Array.isArray(profile.history)) {
      profile.history = [];
    }

    profile.gold = gold;
    profile.history.push({
      increase: goldIncrease,
      reason: goldIncreaseReason
    });

    await saveProfile(profile);
  };

  reward = (increase, increaseReason, callback = () => {}, timeout = 2000) => {
    const {
      goldCount,
      getGoldCount,
      getGoldIncrease,
      getGoldIncreaseReason
    } = this.props;
    const newGoldCount = goldCount + increase;
    getGoldCount(newGoldCount);
    getGoldIncrease(increase);
    getGoldIncreaseReason(increaseReason);
    this.storeGold(newGoldCount, increase, increaseReason);

    setTimeout(() => {
      getGoldIncrease(null);
      getGoldIncreaseReason(null);
      callback();
    }, timeout);
  };

  handleChangeTab = (_, tabIndex) => {
    const { currentHost, getTabIndex, getSelectedCoupon } = this.props;
    const tabName =
      tabIndex === 0
        ? "coupons"
        : tabIndex === 1
        ? "shops"
        : tabIndex === 2
        ? "profile"
        : `${tabIndex}`;
    Analytics.event(`click-${tabName}-tab`, currentHost);

    getTabIndex(tabIndex);
    getSelectedCoupon({}, false);
  };

  handleShopClick = shop => {
    Analytics.event("click-shop", shop.host);

    this.reward(
      rewards.go_to_shop,
      intl.get("reward.for_open_shop").d("For open shop"),
      () => {
        ExtensionUtils.openInNewTab(shop.site_url);
      }
    );
  };

  handleCopyPromo = (_, index) => {
    Analytics.event("click-copy", this.props.currentHost, index);

    this.reward(
      rewards.copy_promo,
      intl.get("reward.for_copy_promo").d("For copy promo")
    );
  };

  handleShareCoupon = async ({ name, url }, index) => {
    Analytics.event(`share-in-${name}`, this.props.currentHost, index);

    this.reward(
      rewards.share_coupon,
      intl.get("reward.for_share").d("For share with friends"),
      () => {
        ExtensionUtils.openInNewTab(url);
      }
    );
  };

  handleCouponLinkClick = (coupon, index) => {
    Analytics.event(`click-coupon-link`, this.props.currentHost, index);
    const fetchCouponUrlPromise = getCouponURLPromise(coupon.coupon_id);
    const rewardPromise = new Promise(resolve => {
      this.reward(
        rewards.click_coupon_link,
        intl.get("reward.for_coupon_link").d("For open promotion"),
        () => resolve()
      );
    });

    Promise.all([fetchCouponUrlPromise, rewardPromise])
      .then(([urlResponse]) => {
        const couponUrl = urlResponse && urlResponse.url;
        ExtensionUtils.openInNewTab(couponUrl || coupon.shop_site_url);
      })
      .catch(() => {
        ExtensionUtils.openInNewTab(coupon.shop_site_url);
      });
  };

  handleMoreCouponInfo = (_, index) => {
    Analytics.event("click-more-info", this.props.currentHost, index);
  };
  handleCouponAvatarClick = (_, index) => {
    Analytics.event("click-coupon-avatar", this.props.currentHost, index);
  };
  handleCouponPromoTextClick = (_, index) => {
    Analytics.event("click-coupon-promo-text", this.props.currentHost, index);
  };
  handleCouponTitleClick = (_, index) => {
    Analytics.event("click-coupon-title", this.props.currentHost, index);
  };
  handleCouponDescriptionClick = (_, index) => {
    Analytics.event("click-coupon-description", this.props.currentHost, index);
  };
  handleCouponsSearchChange = searchText => {
    Analytics.event("search-coupons", searchText);
  };
  handleCouponsSearchCancel = () => {
    Analytics.event("search-coupons-cancel");
  };
  handleCouponsWithPromoToggle = checked => {
    Analytics.event(
      checked ? "enable-with-promo" : "disable-with-promo",
      this.props.currentHost
    );
  };
  handleCouponsAllCouponsToggle = checked => {
    Analytics.event(
      checked ? "enable-all-coupons" : "disable-all-coupons",
      this.props.currentHost
    );
  };
  handleShopsSearchChange = searchText => {
    Analytics.event("search-shops", searchText);
  };
  handleShopsSearchCancel = () => {
    Analytics.event("search-shops-cancel");
  };

  render() {
    const {
      loading,
      currentShop,
      errorMessage,
      tabIndex,
      goldIncrease,
      goldIncreaseReason,
      isSelectedCoupon,
      getSelectedCoupon
    } = this.props;
    if (loading) {
      return (
        <Layout
          top={<Header subtitle={intl.get("app.loading").d("Loading...")} />}
          center={<LinearProgress color="secondary" />}
        />
      );
    }
    if (errorMessage) {
      return <Layout top={<Header subtitle={errorMessage} />} />;
    }

    return (
      <Layout
        isSelectedCoupon={isSelectedCoupon}
        currentShop={currentShop}
        top={
          <>
            {!isSelectedCoupon ? (
              <Header
                subtitle={
                  !currentShop &&
                  intl.get("coupons.not_found").d("Coupons not found")
                }
                currentShop={currentShop}
              />
            ) : (
              <CouponDescHeader getSelectedCoupon={getSelectedCoupon} />
            )}
          </>
        }
        center={
          <>
            {goldIncrease ? (
              <Reward
                title={`+${goldIncrease} ${intl
                  .get("reward.points")
                  .d("points")}`}
                subtitle={goldIncreaseReason}
              />
            ) : tabIndex === 0 ? (
              <CouponsTab
                height={340}
                onCopyPromo={this.handleCopyPromo}
                onShareCoupon={this.handleShareCoupon}
                onMoreCouponInfo={this.handleMoreCouponInfo}
                onCouponLinkClick={this.handleCouponLinkClick}
                onCouponAvatarClick={this.handleCouponAvatarClick}
                onCouponPromoTextClick={this.handleCouponPromoTextClick}
                onCouponTitleClick={this.handleCouponTitleClick}
                onCouponDescriptionClick={this.handleCouponDescriptionClick}
                afterSearchChange={this.handleCouponsSearchChange}
                afterSearchCancel={this.handleCouponsSearchCancel}
                afterWithPromoToggle={this.handleCouponsWithPromoToggle}
                afterAllCouponsToggle={this.handleCouponsAllCouponsToggle}
              />
            ) : tabIndex === 1 ? (
              <ShopsTab
                onShopClick={this.handleShopClick}
                afterSearchChange={this.handleShopsSearchChange}
                afterSearchCancel={this.handleShopsSearchCancel}
              />
            ) : tabIndex === 2 ? (
              <ProfileTab />
            ) : null}
          </>
        }
        footer={<Tabs onChange={this.handleChangeTab} tabIndex={tabIndex} />}
      />
    );
  }
}
const mapStateToProps = state => ({
  allShops: allShopsSelect(state),
  currentHost: currentHostSelect(state),
  activeCoupons: activeCouponsSelect(state),
  loading: loadingStateSelect(state),
  currentShop: getCurrentShopSelect(state),
  errorMessage: errorMessageSelect(state),
  tabIndex: getTabIndexSelect(state),
  goldCount: goldCountSelect(state),
  goldIncrease: goldIncreaseSelect(state),
  goldIncreaseReason: goldIncreaseReasonSelect(state),
  isSelectedCoupon: getIsSelectedCouponSelect(state)
});

const mapDispatchToProps = {
  getFixedAllCoupons,
  getCurrentHost,
  getActiveCoupons,
  setLoadingState,
  getAllShops,
  getShopsWithCoupons,
  getCurrentShop,
  getErrorMessage,
  getTabIndex,
  getGoldCount,
  getGoldIncrease,
  getGoldIncreaseReason,
  getSelectedCoupon
};
export default compose(
  withTheme,
  withIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
