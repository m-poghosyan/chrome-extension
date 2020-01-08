import React from "react";
import {
  CountSumContent,
  ImgContent,
  GoldCountData,
  GetCoins,
  Ballance,
  GetCoinsRef,
  CountDataContent
} from "./elements";
import img5 from "./../../../assets/images/imgpsh_fullsize_anim_5.png";

function CountSum({ goldCount, profileInit }) {
  return (
    <CountSumContent>
      <ImgContent>
        <img src={img5} alt="logo" width="105px" />
      </ImgContent>
      <CountDataContent>
        <Ballance>{profileInit.balancePoints}</Ballance>
        <GoldCountData>{goldCount}</GoldCountData>
        <GetCoins>
          <GetCoinsRef href="#">{profileInit.howGetPoint}</GetCoinsRef>
        </GetCoins>
      </CountDataContent>
    </CountSumContent>
  );
}

export default CountSum;
