import React from "react";
import CouponsListItem from "../CouponsListItem";
import VirtualizedList from "../VirtualizedList";
import NotFound from "../NotFound";

export default ({
  coupons,
  onCopyPromo,
  onShareCoupon,
  onLinkClick,
  onMoreInfo,
  height,
  onAvatarClick,
  onPromoTextClick,
  onTitleClick,
  onDescriptionClick,
  getSelectedCoupon,
  selectedCoupon
}) => {
  return (
    <>
      {coupons.length ? (
        <VirtualizedList
          height={height}
          items={coupons}
          renderItem={(item, index) => (
            <CouponsListItem
              getSelectedCoupon={getSelectedCoupon}
              selectedCoupon={selectedCoupon}
              index={index + 1}
              coupon={item}
              onCopy={onCopyPromo}
              onShare={onShareCoupon}
              onLinkClick={onLinkClick}
              onMoreInfo={onMoreInfo}
              onAvatarClick={onAvatarClick}
              onPromoTextClick={onPromoTextClick}
              onTitleClick={onTitleClick}
              onDescriptionClick={onDescriptionClick}
            />
          )}
        />
      ) : (
        <NotFound />
      )}
    </>
  );
};
