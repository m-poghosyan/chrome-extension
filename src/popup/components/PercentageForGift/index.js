import React from "react";
import {
  PercentForGiftContent,
  CatImage,
  PercentLoad,
  BorderLinearProgress
} from "./elements";
import { makeStyles } from "@material-ui/core/styles";
import img3 from "./../../../assets/images/imgpsh_fullsize_anim_3.png";
import img4 from "./../../../assets/images/imgpsh_fullsize_anim_4.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(0)
  }
}));

const PercentageForGift = ({ percentValue }) => {
  const classes = useStyles();

  return (
    <PercentForGiftContent>
      <PercentLoad>
        <CatImage
          src={img3}
          alt="logo"
          width="35px"
          percentValue={percentValue}
        />

        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          value={percentValue}
        />
      </PercentLoad>
      <img src={img4} alt="gift" width="27px" height="33px" />
    </PercentForGiftContent>
  );
};

export default PercentageForGift;
