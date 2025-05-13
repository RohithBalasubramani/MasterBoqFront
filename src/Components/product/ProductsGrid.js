import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, headName }) {
  const columnCount = 2;
  const rowCount = Math.ceil(products.length / columnCount);
  const CARD_H = 190;
  const CARD_W = 380;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const idx = rowIndex * columnCount + columnIndex;
    if (idx >= products.length) return null;
    return (
      <div style={style}>
        <ProductCard Prod={products[idx]} HeadName={headName} />
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          height={height}
          width={width}
          columnCount={columnCount}
          columnWidth={CARD_W}
          rowCount={rowCount}
          rowHeight={CARD_H}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
}
