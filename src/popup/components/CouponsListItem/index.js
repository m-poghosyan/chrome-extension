import React, { Component, Fragment } from "react";
import intl from "react-intl-universal";

import CardContent from "@material-ui/core/CardContent";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconArrow from "@material-ui/icons/ArrowForwardIos";

import ShareCouponButtons from "../ShareCouponButtons";
import {
  Description,
  MarginedLabel,
  StyledAvatar,
  CenteredCardActions,
  CenteredCardContent,
  VerticalEmptyDivider,
  WhiteFab,
  CouponData,
  StyledCardActions,
  StyledCard,
  CouponTitle,
  CouponCode,
  StyledFab,
  Line,
  StyledCardHeader
} from "./elements";

const findDiscountInText = text => {
  const regex = /\d+(%|\s\bpercent\b)/g;
  const matches = text.match(regex);

  if (!Array.isArray(matches) || matches.length === 0) {
    return null;
  }
  return matches[0];
};

const formatDate = date => new Date(date).toLocaleDateString();

const isPromotion = coupon => coupon.coupon_code === "Не нужен";

class CouponsListItem extends Component {
  handleMoreInfoOpen = () => {
    this.props.onMoreInfo(this.props.coupon, this.props.index);
    this.props.getSelectedCoupon(this.props.coupon, true);
  };

  handleCopyClick = () => {
    this.props.onCopy(this.props.coupon, this.props.index);
  };

  handleShareClick = ({ name, url }) => {
    this.props.onShare({ name, url }, this.props.index);
  };

  handleLinkClick = e => {
    this.props.onLinkClick(this.props.coupon, this.props.index);
    e.stopPropagation();
  };

  handleAvatarClick = () => {
    this.props.onAvatarClick(this.props.coupon, this.props.index);
  };

  handlePromoTextClick = () => {
    this.props.onPromoTextClick(this.props.coupon, this.props.index);
  };

  handleTitleClick = () => {
    this.props.onTitleClick(this.props.coupon, this.props.index);
  };

  handleDescriptionClick = () => {
    this.props.onDescriptionClick(this.props.coupon, this.props.index);
  };

  render() {
    const { coupon, isSelectedCoupon } = this.props;
    return (
      <StyledCard selected={isSelectedCoupon} onClick={this.handleMoreInfoOpen}>
        <StyledCardHeader
          avatar={
            <StyledAvatar
              aria-label="coupon-percent-avatar"
              onClick={this.handleAvatarClick}
            >
              {findDiscountInText(coupon.title) || "$"}
            </StyledAvatar>
          }
          title={
            <CouponCode>
              {isPromotion(coupon)
                ? intl.get("coupon.promotion").d("Promotion")
                : intl.get("coupon.promo").d("Promo: ") +
                  " " +
                  coupon.coupon_code}
            </CouponCode>
          }
          titleTypographyProps={{
            variant: "body1",
            onClick: this.handlePromoTextClick
          }}
          subheader={<CouponTitle>{coupon.title}</CouponTitle>}
          subheaderTypographyProps={{
            variant: "body1",
            onClick: this.handleTitleClick
          }}
        />
        {isSelectedCoupon && (
          <div>
            <Line />
            <CardContent onClick={this.handleDescriptionClick}>
              <Description>
                <CouponData>{intl.get("coupon.shop").d("Shop:")}</CouponData>
                <CouponData>
                  <b> {coupon.shop_host}</b>
                </CouponData>
              </Description>
              <Description>
                <CouponData>
                  {intl.get("coupon.date_start").d("Start date:")}{" "}
                </CouponData>
                <CouponData>
                  <b>{formatDate(coupon.coupon_date_start)}</b>
                </CouponData>
              </Description>
              <Description>
                <CouponData>
                  {intl.get("coupon.date_end").d("End date:")}{" "}
                </CouponData>
                <CouponData>
                  <b>{formatDate(coupon.coupon_date_end)}</b>
                </CouponData>
              </Description>
              {coupon.coupon_description && (
                <Fragment>
                  <br />
                  <Description>
                    {/* decode and insert into html <p>description & more description</p> */}
                    <CouponData
                      dangerouslySetInnerHTML={{
                        __html: unescape(coupon.coupon_description)
                      }}
                    />
                  </Description>
                </Fragment>
              )}
            </CardContent>
          </div>
        )}
        <CenteredCardContent>
          <WhiteFab
            size="medium"
            variant="extended"
            onClick={this.handleLinkClick}
          >
            <MarginedLabel>
              {intl.get("coupon.coupon_link").d("Go to promotions")}
            </MarginedLabel>
            <VerticalEmptyDivider />
            <IconArrow />
          </WhiteFab>
        </CenteredCardContent>

        {!isPromotion(coupon) && (
          <CenteredCardActions
            disableSpacing
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <CopyToClipboard
              text={coupon.coupon_code}
              onCopy={this.handleCopyClick}
            >
              <StyledFab size="medium" color="secondary" variant="extended">
                {intl.get("coupon.copy_promo").d("Copy promo")}
              </StyledFab>
            </CopyToClipboard>
          </CenteredCardActions>
        )}

        <StyledCardActions>
          <ShareCouponButtons
            title={coupon.title}
            description={coupon.coupon_description}
            shopName={coupon.shop_host}
            onShareClick={this.handleShareClick}
          />
        </StyledCardActions>
      </StyledCard>
    );
  }
}

export default CouponsListItem;
