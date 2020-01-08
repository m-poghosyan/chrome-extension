import React from "react";
import ReactReward from "react-rewards";

import { Root, Title, Subtitle } from "./elements";

function Reward({ title, subtitle }) {
  return (
    <Root>
      <ReactReward
        ref={ref => {
          ref && ref.rewardMe();
        }}
        type="confetti"
        config={{
          elementCount: 256,
          spread: 60
        }}
      >
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </ReactReward>
    </Root>
  );
}

export default Reward;
