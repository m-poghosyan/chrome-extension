import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  height: 434px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-family: "Sigmar One", cursive;
  color: ${props => props.theme.palette.secondary.main};
`;

export const Subtitle = styled.h1`
  color: ${props => props.theme.palette.primary.dark};
`;
