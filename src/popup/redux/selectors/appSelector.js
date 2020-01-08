import { createSelector } from "reselect";

const loadingStateHelper = state => {
  return state.app.loading;
};

export const loadingStateSelect = createSelector(
  loadingStateHelper,
  loading => {
    return loading;
  }
);

const currentHostHelper = state => {
  return state.app.currentHost;
};

export const currentHostSelect = createSelector(
  currentHostHelper,
  currentHost => {
    return currentHost;
  }
);

const errorMessageHelper = state => {
  return state.app.errorMessage;
};

export const errorMessageSelect = createSelector(
  errorMessageHelper,
  errorMessage => {
    return errorMessage;
  }
);

const getTabIndexHelper = state => {
  return state.app.tabIndex;
};

export const getTabIndexSelect = createSelector(getTabIndexHelper, tabIndex => {
  return tabIndex;
});
