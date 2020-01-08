import React, { Fragment } from "react";
import intl from "react-intl-universal";

import { Title } from "./elements";

const Header = ({ subtitle, currentShop }) => {
  if (currentShop && currentShop.logo) {
    return (
      <img
        width="143"
        height="59"
        src={`${process.env.REACT_APP_API_URL}${currentShop.logo}`}
        alt="Shop logo"
      />
    );
  }
  return (
    <Fragment>
      <Title>{intl.get("coupons.title").d("Coupons")}</Title>
      {currentShop && (
        <div>
          {intl.get("coupons.subtitle").d("Coupons and sales from")}{" "}
          <b>{currentShop.host}</b>
        </div>
      )}
      <div>{subtitle}</div>
    </Fragment>
  );
};

export default Header;
