import styled from "styled-components";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

export const StyledBottomNavigationItem = styled(BottomNavigationAction)`
  &.MuiBottomNavigationAction-root.Mui-selected {
    background-color: ${props => props.theme.palette.custom.dark};
  }
`;

export const TabLogo = styled.img`
  width: 24px;
`;
