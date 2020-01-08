import React, { Component } from "react";
import intl from "react-intl-universal";

import ShopsList from "../ShopsList";
import SearchBar from "../SearchBar";
import { getUpdatedShops } from "../../redux/reducers/shopsReducer";
import { debounce } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { shopsWithCouponsSelect } from "../../redux/selectors/shopsSelector";

// TODO add redux and make it container
class ShopsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: ""
    };
    this.debounceSearchItems = debounce(this.handleSearchItems, 450);
  }

  componentWillUnmount() {
    this.props.getUpdatedShops("");
  }

  handleChange = searchText => {
    this.setState({ searchInputValue: searchText }, () => {
      this.debounceSearchItems();
    });
  };

  handleSearchItems = () => {
    const { afterSearchChange } = this.props;
    const { searchInputValue } = this.state;
    this.props.getUpdatedShops(searchInputValue);
    if (afterSearchChange) {
      afterSearchChange(searchInputValue);
    }
  };

  handleCancelSearch = () => {
    const { afterSearchCancel } = this.props;
    this.setState({ searchInputValue: "" }, () => {
      const { searchInputValue } = this.state;
      this.props.getUpdatedShops(searchInputValue);
    });

    if (afterSearchCancel) {
      afterSearchCancel();
    }
  };
  render() {
    const { shops, onShopClick } = this.props;
    const { searchInputValue } = this.state;
    return (
      <>
        <SearchBar
          searchInputValue={searchInputValue}
          handleCancelSearch={this.handleCancelSearch}
          handleChange={this.handleChange}
          margin={{ marginBottom: "10px" }}
          searchText={intl.get("shops.search.placeholder").d("Search...")}
        />
        <ShopsList shops={shops} onShopClick={onShopClick} />
      </>
    );
  }
}
const mapStateToProps = state => ({
  shops: shopsWithCouponsSelect(state)
});

const mapDispatchToProps = {
  getUpdatedShops
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(ShopsTab);
