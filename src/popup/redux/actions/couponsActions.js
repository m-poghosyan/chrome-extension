import {
  FIXED_ALL_COUPONS,
  ACTIVE_COUPONS,
  UPDATE_COUPONS,
  SELECTED_COUPON
} from "../actionTypes";

export const getFixedAllCouponsSuccess = allCoupons => ({
  type: FIXED_ALL_COUPONS,
  allCoupons
});

export const getActiveCouponsSuccess = activeCoupons => ({
  type: ACTIVE_COUPONS,
  activeCoupons
});

export const updateCouponsSuccess = payload => ({
  type: UPDATE_COUPONS,
  payload
});

export const getSelectedCouponSuccess = (coupon, isSelectedCoupon) => ({
  type: SELECTED_COUPON,
  coupon,
  isSelectedCoupon
});
