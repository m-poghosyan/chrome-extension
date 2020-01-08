import React from "react";
import { CellMeasurerCache, CellMeasurer } from "react-virtualized";
import { StyledList, StyledElement } from "./elements";

const VirtualizedList = ({
  padding,
  items = [],
  renderItem = (item, index) => <div>{item}</div>,
  height = 370,
  width = 400,
  CellMeasurerProps = {},
  ...props
}) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true
  });
  const rowRenderer = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        {...CellMeasurerProps}
      >
        <StyledElement key={key} style={style}>
          {index !== 0 && <br />}
          {renderItem(items[index], index)}
        </StyledElement>
      </CellMeasurer>
    );
  };

  return (
    <StyledList
      height={height}
      width={width}
      rowCount={items.length}
      rowHeight={cache.rowHeight}
      rowRenderer={rowRenderer}
      {...props}
    />
  );
};

export default VirtualizedList;
