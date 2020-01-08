import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";

export const StyledAvatar = styled(Avatar)`
  && {
    background-color: ${props => props.theme.palette.secondary.light};
    width: 50px;
    height: 50px;
    color: white;
    font-size: 1rem;
  }
`;

export const StyledCard = styled(Card)`
  && {
    justify-content: center;
    border: 1.5px solid ${props => props.theme.palette.custom.light};
  }
  :hover {
    border: ${props =>
      !props.selected
        ? `1.5px solid ${props.theme.palette.secondary.main}`
        : ""};
    cursor: ${props => (!props.selected ? "pointer" : "")};
    transition: ${props => (!props.selected ? "0.3s" : "")};
  }
`;

export const CenteredCardActions = styled(CardActions)`
  && {
    justify-content: center;
    padding: 8px 8px 0 8px;
    text-transform: none;
  }
  .MuiFab-extended.MuiFab-sizeMedium {
    width: 294px !important;
    height: 50px !important;
    border-radius: 3px !important;
  }
  .MuiFab-root {
    box-shadow: none;
  }
`;

export const CenteredCardContent = styled(CardContent)`
  text-align: center;
  padding: 0 !important;
  .MuiFab-extended.MuiFab-sizeMedium {
    width: 294px !important;
    height: 50px !important;
    border-radius: 3px !important;
    background-color: ${props => props.theme.palette.custom.light} !important;
    &:hover {
      background-color: ${props =>
        props.theme.palette.custom.medium} !important;
    }
  }
  .MuiFab-root {
    box-shadow: none;
  }
`;

export const Line = styled.hr`
  border: 1px dashed ${props => props.theme.palette.custom.medium};
  margin: 0 24px;
`;

export const StyledCardHeader = styled(CardHeader)`
  padding: 16px 24px !important;
`;

export const FixedWidthModal = styled.div`
  width: 320px;
`;

export const VerticalEmptyDivider = styled.span`
  margin: 0.2rem;
`;

export const MoreIconButton = styled(IconButton)`
  margin-left: auto !important;
`;

export const CouponData = styled.span`
  margin: 0;
  font-size: 17px;
  margin: 3px 0;
  color: ${props => props.theme.palette.custom.main};
`;

export const CouponTitle = styled.span`
  color: ${props => props.theme.palette.custom.main};
`;

export const CouponCode = styled.span`
  color: ${props => props.theme.palette.custom.main};
  font-weight: bold;
  font-size: 17px;
`;

export const Description = ({ children }) => {
  const StyledTypography = styled(Typography)`
    color: ${props => props.theme.palette.custom.main};
    padding: 0 12px !important;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  `;
  return (
    <StyledTypography variant="body2" color="textSecondary" component="p">
      {children}
    </StyledTypography>
  );
};

export const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-around;
`;

export const StyledFab = styled(Fab)`
  text-transform: none !important;
  font-size: 18px !important;
`;

export const WhiteFab = styled(Fab)`
  text-transform: none !important;
  font-size: 18px !important;
  font-weight: 600 !important;
`;

export const MarginedLabel = styled.span`
  color: ${props => props.theme.palette.custom.main};
  margin: 0 14px;
`;
