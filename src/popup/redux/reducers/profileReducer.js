import {
  GOLD_COUNT,
  GOLD_INCREASE,
  GOLD_INCREASE_REASON
} from "../actionTypes";
import {
  goldCountSuccess,
  goldIncreaseSuccess,
  goldIncreaseReasonSuccess
} from "../actions/profileActions";

let initialState = {
  goldCount: 0,
  goldIncrease: null,
  goldIncreaseReason: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOLD_COUNT:
      return {
        ...state,
        goldCount: action.goldCount
      };
    case GOLD_INCREASE:
      return {
        ...state,
        goldIncrease: action.goldIncrease
      };
    case GOLD_INCREASE_REASON:
      return {
        ...state,
        goldIncreaseReason: action.goldIncreaseReason
      };
    default:
      return state;
  }
};

export const getGoldCount = goldCount => async dispatch => {
  dispatch(goldCountSuccess(goldCount));
};

export const getGoldIncrease = goldIncrease => async dispatch => {
  dispatch(goldIncreaseSuccess(goldIncrease));
};

export const getGoldIncreaseReason = goldIncreaseReason => async dispatch => {
  dispatch(goldIncreaseReasonSuccess(goldIncreaseReason));
};

export default profileReducer;
