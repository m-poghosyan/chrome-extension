import styled from "styled-components";
import List from "react-virtualized/dist/commonjs/List";

export const StyledList = styled(List)`
  padding: 0 24px;
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

export const StyledElement = styled.div`
  padding: 0.1rem;
`;
