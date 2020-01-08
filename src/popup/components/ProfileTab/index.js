import React, { Component } from "react";
import CountSum from "../CountSum";
import PercentageForGift from "../PercentageForGift";
import { ProfileContent } from "./elements";
import intl from "react-intl-universal";
import { goldCountSelect } from "../../redux/selectors/profileSelector";
import { compose } from "redux";
import { connect } from "react-redux";

// TODO add redux and make it container
class ProfileTab extends Component {
  render() {
    const profileInit = {
      balancePoints: intl.get("profile.balance_points").d("Balance points"),
      howGetPoint: intl.get("profile.how_get_point").d("How to get coins?")
    };
    const { goldCount } = this.props;
    return (
      <ProfileContent>
        <CountSum goldCount={goldCount} profileInit={profileInit} />
        <PercentageForGift
          percentValue={goldCount ? Math.round((100 * goldCount) / 1000) : 0}
        />
      </ProfileContent>
    );
  }
}
const mapStateToProps = state => ({
  goldCount: goldCountSelect(state)
});

export default compose(connect(mapStateToProps, {}))(ProfileTab);
