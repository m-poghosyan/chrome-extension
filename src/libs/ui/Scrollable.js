import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "styled-components";
import "react-perfect-scrollbar/dist/css/styles.css";

const Scrollable = ({ children, ...props }) => (
  <PerfectScrollbar options={{ minScrollbarLength: 50 }} {...props}>
    {children}
  </PerfectScrollbar>
);

export default styled(Scrollable)`
  .ps__rail-y {
    width: 10px;
    &:hover {
      opacity: 0.7 !important;
    }
  }
  .ps__thumb-y {
    width: 6px !important;
  }
`;
