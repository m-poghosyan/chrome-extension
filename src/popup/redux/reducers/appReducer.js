import {
  LOADING,
  GET_HOST,
  ERROR_MESSAGE,
  SET_TAB_INDEX
} from "../actionTypes";
import * as ExtensionUtils from "../../../libs/extensionUtils";
import {
  setLoadingStateSuccess,
  getCurrentHostSuccess,
  getErrorMessageSuccess,
  setTabIndexSuccess
} from "../actions/appActions";

let initialState = {
  loading: true,
  currentHost: null,
  errorMessage: null,
  tabIndex: 0
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case GET_HOST:
      return {
        ...state,
        currentHost: action.currentHost
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case SET_TAB_INDEX:
      return {
        ...state,
        tabIndex: action.tabIndex
      };
    default:
      return state;
  }
};

export const getCurrentHost = () => async dispatch => {
  let responce = await ExtensionUtils.fetchCurrentHost();
  dispatch(getCurrentHostSuccess(responce));
};

export const setLoadingState = loading => async dispatch => {
  dispatch(setLoadingStateSuccess(loading));
};

export const getErrorMessage = errorMessage => async dispatch => {
  dispatch(getErrorMessageSuccess(errorMessage));
};

export const getTabIndex = tabIndex => async dispatch => {
  dispatch(setTabIndexSuccess(tabIndex));
};

export default appReducer;
