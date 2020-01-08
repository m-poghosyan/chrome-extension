import {
  GOLD_COUNT,
  GOLD_INCREASE,
  GOLD_INCREASE_REASON
} from "../actionTypes";

export const goldCountSuccess = goldCount => ({
  type: GOLD_COUNT,
  goldCount
});
export const goldIncreaseSuccess = goldIncrease => ({
  type: GOLD_INCREASE,
  goldIncrease
});
export const goldIncreaseReasonSuccess = goldIncreaseReason => ({
  type: GOLD_INCREASE_REASON,
  goldIncreaseReason
});
