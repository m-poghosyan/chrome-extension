import * as API from "./../../../libs/api";
import {
  getAllShopsSuccess,
  getShopsWithCouponsSuccess,
  getCurrentShopSuccess,
  getUpdatedShopsSuccess
} from "../actions/shopsActions";
import {
  GET_ALL_SHOPS,
  GET_SHOPS_WITH_COUPONS,
  GET_CURRENT_SHOP,
  UPDATED_SHOPS
} from "../actionTypes";

let initialState = {
  allShops: [],
  shopsWithCoupons: [],
  currentShop: {},
  fixedShopsWithCoupons: []
};

const isShopMatchSearch = (shop, searchText) =>
  `${shop.title_en} ${shop.host}`
    .toLowerCase()
    .includes(searchText.toLowerCase());

const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SHOPS:
      return {
        ...state,
        allShops: action.allShops
      };
    case GET_SHOPS_WITH_COUPONS:
      return {
        ...state,
        shopsWithCoupons: action.shopsWithCoupons,
        fixedShopsWithCoupons: action.shopsWithCoupons
      };
    case GET_CURRENT_SHOP:
      return {
        ...state,
        currentShop: action.currentShop
      };
    case UPDATED_SHOPS:
      return {
        ...state,
        shopsWithCoupons: state.fixedShopsWithCoupons.filter(item =>
          isShopMatchSearch(item, action.searchValue)
        )
      };
    default:
      return state;
  }
};

export const getAllShops = () => async dispatch => {
  let response = await API.fetchActiveShops();
  dispatch(getAllShopsSuccess(response));
};

export const getShopsWithCoupons = shopsWithCoupons => async dispatch => {
  dispatch(getShopsWithCouponsSuccess(shopsWithCoupons));
};

export const getCurrentShop = currentShop => async dispatch => {
  dispatch(getCurrentShopSuccess(currentShop));
};

export const getUpdatedShops = searchValue => async dispatch => {
  dispatch(getUpdatedShopsSuccess(searchValue));
};

export default shopsReducer;
