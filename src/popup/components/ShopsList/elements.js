import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";

export const ShopsContent = styled.div`
  && {
    padding: 11px 22px;
    display: grid;
    grid-template-columns: repeat(2, 170px);
    grid-gap: 10px;
    overflow-y: auto;
    height: 375px;
    background-color: ${props => props.theme.palette.custom.light}
    font-weight: bold;
  }
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

export const StyledListItem = styled(ListItem)`
  && {
    background-color: white;
    padding: 0 !important;
    height: 150px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-around;
  }

  &&:hover {
    border: 1px solid ${props => props.theme.palette.secondary.main};
    transform: scale(1.05);
    transition: 0.3s;
    background-color: white;
    z-index: 2;
  }
`;

export const StyledBadge = styled(Badge)`
  && {
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .MuiBadge-badge {
    border-radius: 5px;
  }
`;

export const InsteadOfImage = styled.div`
  background-color: ${props => props.theme.palette.primary.light};
  width: 143px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${props => props.theme.palette.secondary.dark};
`;

export const ImageContent = styled.div`
  && {
    padding-top: 12px;
  }
`;

export const StyledListItemText = styled.div`
  && {
    font-weight: bold;
  }
`;
