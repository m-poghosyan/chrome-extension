import { createSelector } from "reselect";

const AllShopsHelper = state => {
  return state.shopsTab.allShops;
};

export const allShopsSelect = createSelector(AllShopsHelper, allShops => {
  return allShops;
});

const shopsWithCouponsHelper = state => {
  return state.shopsTab.shopsWithCoupons;
};

export const shopsWithCouponsSelect = createSelector(
  shopsWithCouponsHelper,
  shopsWithCoupons => {
    return shopsWithCoupons;
  }
);

const getCurrentShopHelper = state => {
  return state.shopsTab.currentShop;
};

export const getCurrentShopSelect = createSelector(
  getCurrentShopHelper,
  currentShop => {
    return currentShop;
  }
);
