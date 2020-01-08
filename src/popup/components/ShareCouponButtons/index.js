import React, { Fragment } from "react";
import intl from "react-intl-universal";
import ShareSocialButton from "../ShareSocialButton";
import {
  StyledIconFacebook,
  StyledIconVkontakte,
  StyledIconOdnoklassniki,
  StyledIconTelegram
} from "./elements";

const URL_TO_SHARE = process.env.REACT_APP_SHARE_URL;

const ShareCouponSocialButtons = ({
  title = "",
  description = "",
  shopName = "",
  onShareClick = ({ name, url }) => {}
}) => {
  const textToShare = `%23promocot ${intl
    .get("coupon.share.in_shop")
    .d("At the store")} ${shopName} ${title} ${description}`;
  return (
    <Fragment>
      <ShareSocialButton
        icon={<StyledIconVkontakte />}
        name="VK"
        url={`http://vk.com/share.php?url=${URL_TO_SHARE}&title=${textToShare}`}
        onClick={onShareClick}
      />
      <ShareSocialButton
        icon={<StyledIconTelegram />}
        name="Telegram"
        url={`https://t.me/share/url?url=${URL_TO_SHARE}&text=${textToShare}`}
        onClick={onShareClick}
      />
      <ShareSocialButton
        icon={<StyledIconOdnoklassniki />}
        name="OK"
        url={`https://connect.ok.ru/offer?url=${URL_TO_SHARE}&title=${textToShare}`}
        onClick={onShareClick}
      />
      <ShareSocialButton
        icon={<StyledIconFacebook />}
        name="Facebook"
        url={`https://www.facebook.com/sharer.php?u=${URL_TO_SHARE}&quote=${textToShare}`}
        onClick={onShareClick}
      />
    </Fragment>
  );
};

export default ShareCouponSocialButtons;
