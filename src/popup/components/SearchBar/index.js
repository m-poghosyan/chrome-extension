import React from "react";
import { Search } from "./elements";

const SearchBar = ({
  margin,
  searchText,
  handleChange,
  handleCancelSearch,
  searchInputValue
}) => {
  return (
    <Search
      placeholder={searchText || "Search"}
      style={margin}
      value={searchInputValue}
      onChange={handleChange}
      onCancelSearch={handleCancelSearch}
    />
  );
};
export default SearchBar;
