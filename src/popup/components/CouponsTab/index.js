import React, { Component } from "react";
import intl from "react-intl-universal";
import { debounce } from "lodash";
import CouponsList from "../CouponsList";
import SearchBar from "../SearchBar";
import {
  activeCouponsSelect,
  getSelectedCouponSelect,
  getIsSelectedCouponSelect
} from "../../redux/selectors/couponsSelector";
import {
  updateCoupons,
  getSelectedCoupon
} from "../../redux/reducers/couponsReducer";
import { compose } from "redux";
import { connect } from "react-redux";
import CheckboxPromo from "../CheckboxPromo";
import { CheckboxContent, CouponDetailsContent } from "./elements";
import CouponsListItem from "../CouponsListItem";

// TODO add redux and make it container
class CouponsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedPromo: false,
      isCheckedAllCoupons: false,
      searchInputValue: ""
    };
    this.debounceSearchItems = debounce(this.handleSearchItems, 450);
  }
  componentDidMount() {
    if (!this.props.activeCoupons.length) {
      this.setState(
        {
          isCheckedAllCoupons: true
        },
        () => {
          this.handleSearchItems();
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.updateCoupons({
      searchInputValue: "",
      isCheckedAllCoupons: false,
      isCheckedPromo: false
    });
  }
  handleChange = searchText => {
    this.setState({ searchInputValue: searchText }, () => {
      this.debounceSearchItems();
    });
  };

  handleSearchItems = () => {
    const { afterSearchChange } = this.props;
    const {
      searchInputValue,
      isCheckedAllCoupons,
      isCheckedPromo
    } = this.state;
    this.props.updateCoupons({
      searchInputValue,
      isCheckedAllCoupons,
      isCheckedPromo
    });
    if (afterSearchChange) {
      afterSearchChange(searchInputValue);
    }
  };

  handleCancelSearch = () => {
    const { afterSearchCancel } = this.props;
    this.setState({ searchInputValue: "" }, () => {
      const {
        searchInputValue,
        isCheckedAllCoupons,
        isCheckedPromo
      } = this.state;
      this.props.updateCoupons({
        searchInputValue,
        isCheckedAllCoupons,
        isCheckedPromo
      });
    });

    if (afterSearchCancel) {
      afterSearchCancel();
    }
  };

  onToggleCheckbox = e => {
    if (e.target.name === "promo") {
      this.setState({ isCheckedPromo: e.target.checked }, () => {
        this.handleSearchItems();
      });
      if (this.props.afterCheckboxToggle && this.props.afterCheckboxToggle[0]) {
        this.props.afterWithPromoToggle(e.target.checked);
      }
    } else if (e.target.name === "allCoupons") {
      this.setState({ isCheckedAllCoupons: e.target.checked }, () => {
        this.handleSearchItems();
      });
      if (this.props.afterCheckboxToggle && this.props.afterCheckboxToggle[1]) {
        this.props.afterAllCouponsToggle(e.target.checked);
      }
    }
  };
  render() {
    const {
      onCopyPromo,
      onShareCoupon,
      onCouponLinkClick,
      onMoreCouponInfo,
      onCouponAvatarClick,
      onCouponPromoTextClick,
      onCouponTitleClick,
      onCouponDescriptionClick,
      height,
      activeCoupons,
      getSelectedCoupon,
      selectedCoupon,
      isSelectedCoupon
    } = this.props;
    const { searchInputValue, isCheckedAllCoupons } = this.state;
    if (isSelectedCoupon) {
      return (
        <CouponDetailsContent>
          <CouponsListItem
            getSelectedCoupon={getSelectedCoupon}
            selectedCoupon={selectedCoupon}
            isSelectedCoupon={isSelectedCoupon}
            coupon={selectedCoupon}
            onCopy={onCopyPromo}
            onShare={onShareCoupon}
            onLinkClick={onCouponLinkClick}
            onMoreInfo={onMoreCouponInfo}
            onAvatarClick={onCouponAvatarClick}
            onPromoTextClick={onCouponPromoTextClick}
            onTitleClick={onCouponTitleClick}
            onDescriptionClick={onCouponDescriptionClick}
          />
        </CouponDetailsContent>
      );
    }
    return (
      <>
        <SearchBar
          searchInputValue={searchInputValue}
          handleCancelSearch={this.handleCancelSearch}
          handleChange={this.handleChange}
          searchText={intl.get("coupons.search.placeholder").d("Search...")}
        />
        <CheckboxContent>
          <CheckboxPromo
            name="promo"
            checkboxText={intl.get("coupons.with_promo").d("With promo")}
            onToggleCheckbox={this.onToggleCheckbox}
          />
          <CheckboxPromo
            name="allCoupons"
            checked={isCheckedAllCoupons}
            checkboxText={intl.get("coupons.all_coupons").d("All shops")}
            onToggleCheckbox={this.onToggleCheckbox}
          />
        </CheckboxContent>
        <CouponsList
          isSelectedCoupon={isSelectedCoupon}
          getSelectedCoupon={getSelectedCoupon}
          selectedCoupon={selectedCoupon}
          height={height}
          coupons={activeCoupons}
          onCopyPromo={onCopyPromo}
          onShareCoupon={onShareCoupon}
          onMoreInfo={onMoreCouponInfo}
          onLinkClick={onCouponLinkClick}
          onAvatarClick={onCouponAvatarClick}
          onPromoTextClick={onCouponPromoTextClick}
          onTitleClick={onCouponTitleClick}
          onDescriptionClick={onCouponDescriptionClick}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  activeCoupons: activeCouponsSelect(state),
  selectedCoupon: getSelectedCouponSelect(state),
  isSelectedCoupon: getIsSelectedCouponSelect(state)
});

const mapDispatchToProps = {
  updateCoupons,
  getSelectedCoupon
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CouponsTab
);
