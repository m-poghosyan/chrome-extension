import React from "react";

import { Root, Top, Center, StyledAppBar, Footer } from "./elements";

const Layout = ({ isSelectedCoupon, currentShop, top, center, footer }) => (
  <Root>
    <StyledAppBar color="inherit">
      <Top shop={currentShop} selected={isSelectedCoupon}>
        {top}
      </Top>
    </StyledAppBar>
    <Center selected={isSelectedCoupon}> {center} </Center>
    <Footer> {footer} </Footer>
  </Root>
);

export default Layout;
