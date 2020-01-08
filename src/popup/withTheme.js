import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import { ThemeProvider } from "styled-components";

const theme = {
  palette: {
    primary: {
      light: "#f7f7f7",
      main: "#9e9e9e",
      dark: "#616161",
      contrastText: "#fff"
    },
    secondary: {
      ultraLight: "#d4c9fa",
      light: "#c1b2fc",
      main: "#9980fa",
      dark: "#8a6df9",
      contrastText: "#fff"
    },
    custom: {
      light: "#f3f5f5",
      medium: "#e9e8e8",
      main: "#2e3a46",
      dark: "#485460"
    }
  }
};
const muiTheme = createMuiTheme(theme);

export default WrappedComponent => ({ children, ...props }) => (
  <MuiThemeProvider theme={muiTheme}>
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props}>{children}</WrappedComponent>
      </ThemeProvider>
    </React.Fragment>
  </MuiThemeProvider>
);
