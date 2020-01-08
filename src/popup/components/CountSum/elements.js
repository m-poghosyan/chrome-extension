import styled from "styled-components";

export const CountSumContent = styled.div`
  && {
    height: 35%;
    display: flex;
    flex-direction: row;
    padding: 10px 22px;
  }
`;

export const ImgContent = styled.div`
  && {
  }
`;

export const CountDataContent = styled.div`
  && {
    margin-left: 20px;
  }
`;

export const GoldCountData = styled.p`
  && {
    font-weight: bold;
    font-size: 40px;
    margin: 0 7px;
    color: ${props => props.theme.palette.secondary.dark};
  }
`;

export const GetCoins = styled.p`
  && {
    font-size: 20px;
    margin: 7px;
  }
`;

export const GetCoinsRef = styled.a`
  && {
    color: ${props => props.theme.palette.secondary.main};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Ballance = styled.p`
  && {
    font-size: 20px;
    margin: 7px;
  }
`;
