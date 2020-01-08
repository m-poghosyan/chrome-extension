import { createSelector } from "reselect";

const goldCountHelper = state => {
  return state.profile.goldCount;
};

export const goldCountSelect = createSelector(goldCountHelper, goldCount => {
  return goldCount;
});

const goldIncreaseHelper = state => {
  return state.profile.goldIncrease;
};

export const goldIncreaseSelect = createSelector(
  goldIncreaseHelper,
  goldIncrease => {
    return goldIncrease;
  }
);

const goldIncreaseReasonHelper = state => {
  return state.profile.goldIncreaseReason;
};

export const goldIncreaseReasonSelect = createSelector(
  goldIncreaseReasonHelper,
  goldIncreaseReason => {
    return goldIncreaseReason;
  }
);
