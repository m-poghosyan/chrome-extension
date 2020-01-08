import styled from "styled-components";

export const CouponHeaderContent = styled.div`
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CouponDetails = styled.p`
  && {
    font-size: 17px;
    font-weight: bold;
    margin: auto;
    color: ${props => props.theme.palette.custom.main};
  }
`;
