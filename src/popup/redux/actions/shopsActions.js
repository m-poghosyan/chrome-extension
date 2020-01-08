import {
  GET_SHOPS_WITH_COUPONS,
  GET_ALL_SHOPS,
  GET_CURRENT_SHOP,
  UPDATED_SHOPS
} from "../actionTypes";

export const getAllShopsSuccess = allShops => ({
  type: GET_ALL_SHOPS,
  allShops
});

export const getShopsWithCouponsSuccess = shopsWithCoupons => ({
  type: GET_SHOPS_WITH_COUPONS,
  shopsWithCoupons
});

export const getCurrentShopSuccess = currentShop => ({
  type: GET_CURRENT_SHOP,
  currentShop
});

export const getUpdatedShopsSuccess = searchValue => ({
  type: UPDATED_SHOPS,
  searchValue
});
