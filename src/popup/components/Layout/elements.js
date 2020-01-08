import AppBar from "@material-ui/core/AppBar";
import styled from "styled-components";

export const Root = styled.div`
  width: 400px;
  height: 600px; /** Required for perfect-scrollbar */
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => props.theme.palette.custom.light};
`;

export const Top = styled.div`
  padding: ${props =>
    props.selected
      ? "11px 24px"
      : props.shop && props.shop.logo
      ? "21px 24px 15px"
      : "25px 24px"};
`;

export const Center = styled.div`
  margin-top: ${props =>
    props.selected ? "72px" : "110px"}; /** Margin from app-bar */
  height: 100%;
  overflow-y: auto;
  :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.palette.primary.main};
    border-radius: 10px;
    min-height: 30px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.palette.primary.dark};
  }
`;

export const Footer = styled.div`
  height: max-content;
  width: 100%;
`;

export const StyledAppBar = styled(AppBar)`
  & {
    border-bottom: 1px solid ${props => props.theme.palette.primary.main};
  }
  &.MuiPaper-elevation4 {
    box-shadow: none !important;
  }
`;
