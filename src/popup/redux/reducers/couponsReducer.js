import * as API from "./../../../libs/api";
import {
  getFixedAllCouponsSuccess,
  getActiveCouponsSuccess,
  updateCouponsSuccess,
  getSelectedCouponSuccess
} from "../actions/couponsActions";
import {
  FIXED_ALL_COUPONS,
  ACTIVE_COUPONS,
  UPDATE_COUPONS,
  SELECTED_COUPON
} from "../actionTypes";

let initialState = {
  fixedAllCoupons: [],
  fixedAllActiveCoupons: [],
  activeCoupons: [],
  selectedCoupon: {},
  isSelectedCoupon: false
};
const isCouponMatchSearch = (coupon, searchText, isChecked) => {
  const lowSearchText = searchText.toLowerCase();
  const {
    coupon_description: description,
    coupon_title: title,
    coupon_date_start: start,
    coupon_date_end: end,
    coupon_code
  } = coupon;
  if (isChecked && coupon_code === "Не нужен") {
    return false;
  }
  return `${title} ${description} ${coupon_code} ${start} ${end}`
    .toLowerCase()
    .includes(lowSearchText);
};

const typeItems = (action, state) => {
  if (action.payload.isCheckedAllCoupons) return state.fixedAllCoupons;
  return state.fixedAllActiveCoupons;
};

const couponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIXED_ALL_COUPONS:
      return {
        ...state,
        fixedAllCoupons: action.allCoupons
      };
    case ACTIVE_COUPONS:
      return {
        ...state,
        activeCoupons: action.activeCoupons,
        fixedAllActiveCoupons: action.activeCoupons
      };
    case UPDATE_COUPONS:
      return {
        ...state,
        activeCoupons: typeItems(action, state).filter(item =>
          isCouponMatchSearch(
            item,
            action.payload.searchInputValue,
            action.payload.isCheckedPromo
          )
        )
      };
    case SELECTED_COUPON:
      return {
        ...state,
        selectedCoupon: action.coupon,
        isSelectedCoupon: action.isSelectedCoupon
      };
    default:
      return state;
  }
};

export const getFixedAllCoupons = () => async dispatch => {
  let response = await API.fetchActiveCoupons(0);
  dispatch(getFixedAllCouponsSuccess(response));
};

export const getActiveCoupons = shopId => async dispatch => {
  let response = await API.fetchActiveCoupons(shopId);
  dispatch(getActiveCouponsSuccess(response));
};

export const getCouponURLPromise = couponId => {
  return API.fetchCouponUrl(couponId);
};

export const updateCoupons = payload => async dispatch => {
  dispatch(updateCouponsSuccess(payload));
};

export const getSelectedCoupon = (
  coupon,
  isSelectedCoupon
) => async dispatch => {
  dispatch(getSelectedCouponSuccess(coupon, isSelectedCoupon));
};

export default couponsReducer;
