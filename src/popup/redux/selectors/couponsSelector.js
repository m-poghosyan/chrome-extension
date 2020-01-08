import { createSelector } from "reselect";

const activeCouponsHelper = state => {
  return state.couponsTab.activeCoupons;
};

export const activeCouponsSelect = createSelector(
  activeCouponsHelper,
  activeCoupons => {
    return activeCoupons;
  }
);

const getSelectedCouponHelper = state => {
  return state.couponsTab.selectedCoupon;
};

export const getSelectedCouponSelect = createSelector(
  getSelectedCouponHelper,
  selectedCoupon => {
    return selectedCoupon;
  }
);

const getisSelectedHelper = state => {
  return state.couponsTab.isSelectedCoupon;
};

export const getIsSelectedCouponSelect = createSelector(
  getisSelectedHelper,
  isSelectedCoupon => {
    return isSelectedCoupon;
  }
);
