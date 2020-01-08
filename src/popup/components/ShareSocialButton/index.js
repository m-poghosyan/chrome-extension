import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import intl from "react-intl-universal";

const ShareSocialButton = ({ name, icon, url, onClick }) => (
  <Tooltip title={`${intl.get("coupon.tooltip.share").d("Share via")} ${name}`}>
    <IconButton onClick={e => onClick({ name, url }, e.stopPropagation())}>
      {icon}
    </IconButton>
  </Tooltip>
);

export default ShareSocialButton;
