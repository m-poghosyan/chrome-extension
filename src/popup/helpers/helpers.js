import React from "react";

export const changeIcon = (
  Component,
  currentTabIndex,
  tabIndex,
  defaultIcon,
  selectedIcon
) => {
  return (
    <Component
      src={currentTabIndex !== tabIndex ? defaultIcon : selectedIcon}
    />
  );
};
