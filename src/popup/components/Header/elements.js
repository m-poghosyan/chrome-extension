import styled from "styled-components";

export const Link = styled.a`
  color: white;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const HeaderContent = styled.div`
  display: ${props => props.currentShop && props.currentShop.logo && "flex"};
`;
