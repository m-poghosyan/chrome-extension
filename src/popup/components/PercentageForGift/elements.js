import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";

export const BorderLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 10px !important;
    background-color: ${props =>
      props.theme.palette.secondary.ultraLight} !important;
    border-radius: 10px !important;
  }
  .MuiLinearProgress-barColorPrimary {
    background-color: ${props => props.theme.palette.secondary.main} !important;
  }
`;
export const PercentForGiftContent = styled.div`
  && {
    margin: 0 15px;
    height: 8%;
    padding-left: 30px;
    display: flex;
    justify-content: space-around;
    margin: 0 10px;
  }
`;

export const CatImage = styled.img`
  && {
    position: absolute;
    top: -15px;
    z-index: 1;
    left: ${props => props.percentValue - 8.5}%;
  }
`;

export const PercentLoad = styled.div`
  && {
    margin-top: 20px;
    position: relative;
    width: 85%;
  }
`;
