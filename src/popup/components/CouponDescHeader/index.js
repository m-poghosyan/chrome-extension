import React from "react";
import intl from "react-intl-universal";
import { CouponHeaderContent, CouponDetails } from "./elements";
import IconButton from "@material-ui/core/IconButton";
import IconArrowBack from "@material-ui/icons/KeyboardBackspace";
import IconClose from "@material-ui/icons/Close";

function CouponDescHeader({ getSelectedCoupon }) {
  return (
    <CouponHeaderContent>
      <IconButton
        onClick={() => {
          getSelectedCoupon({}, false);
        }}
        aria-label="show more"
        variant="contained"
      >
        <IconArrowBack style={{ color: "rgb(214, 214, 214)" }} />
      </IconButton>
      <CouponDetails>{intl.get("coupon.details").d("Details")}</CouponDetails>
      <IconButton
        onClick={() => {
          getSelectedCoupon({}, false);
        }}
        aria-label="show more"
        variant="contained"
      >
        <IconClose style={{ color: "rgb(214, 214, 214)" }} />
      </IconButton>
    </CouponHeaderContent>
  );
}

export default CouponDescHeader;
