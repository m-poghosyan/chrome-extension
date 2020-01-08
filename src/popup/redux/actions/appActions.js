import {
  LOADING,
  GET_HOST,
  ERROR_MESSAGE,
  SET_TAB_INDEX
} from "../actionTypes";

export const setLoadingStateSuccess = loading => ({
  type: LOADING,
  loading
});

export const getCurrentHostSuccess = currentHost => ({
  type: GET_HOST,
  currentHost
});

export const getErrorMessageSuccess = errorMessage => ({
  type: ERROR_MESSAGE,
  errorMessage
});

export const setTabIndexSuccess = tabIndex => ({
  type: SET_TAB_INDEX,
  tabIndex
});
