import React from "react";
import intl from "react-intl-universal";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Tooltip from "@material-ui/core/Tooltip";
import couponDefault from "./../../../assets/images/coupon-default.png";
import couponSelected from "./../../../assets/images/coupon-selected.png";
import shopDefault from "./../../../assets/images/shop-default.png";
import shopSelected from "./../../../assets/images/shop-selected.png";
import userDefault from "./../../../assets/images/user-default.png";
import userSelected from "./../../../assets/images/user-selected.png";

import { StyledBottomNavigationItem, TabLogo } from "./elements";
import { changeIcon } from "../../helpers/helpers";

export default function BottomTabs({ onChange, tabIndex }) {
  return (
    <BottomNavigation value={tabIndex} onChange={onChange} showLabels>
      <Tooltip
        placement="top"
        title={intl.get("tabs.coupons").d("Promotions and promo codes")}
      >
        <StyledBottomNavigationItem
          icon={changeIcon(TabLogo, tabIndex, 0, couponDefault, couponSelected)}
        />
      </Tooltip>
      <Tooltip placement="top" title={intl.get("tabs.shops").d("Shops")}>
        <StyledBottomNavigationItem
          icon={changeIcon(TabLogo, tabIndex, 1, shopDefault, shopSelected)}
        />
      </Tooltip>
      <Tooltip placement="top" title={intl.get("tabs.profile").d("Profile")}>
        <StyledBottomNavigationItem
          icon={changeIcon(TabLogo, tabIndex, 2, userDefault, userSelected)}
        />
      </Tooltip>
    </BottomNavigation>
  );
}
