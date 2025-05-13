import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../Assets/DeleteIcon.svg";
import { DLT, REMOVE, ADDMORE } from "../../Redux/actions/action";
import cartgif from "../../Assets/cart.gif";

/* palette */
const primary = "#09193D";
const accent = "#FFF700";

/* ───────── shared buttons (re‑exported for CartTab2) ───────── */
export const PrimaryButton = styled.button`
  background: ${primary};
  color: ${accent};
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.4rem;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  height: min-content;
`;
export const OutlineButton = styled.button`
  background: transparent;
  color: ${primary};
  border: 2px solid ${primary};
  border-radius: 6px;
  padding: 0.6rem 1.4rem;
  height: min-content;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${primary};
    color: ${accent};
  }
`;

/* ───────── wrapper card ───────── */
const Wrapper = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

/* ───────── quantity controls ───────── */
const QtyWrap = styled.div`
  display: flex;
  align-items: center;
`;
const QtyBtn = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #ddd;
  background: #eee;
  font-size: 1.25rem;
  line-height: 1;
  color: ${primary};
  cursor: pointer;
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
`;
const QtyVal = styled.div`
  padding: 0 0.8rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-family: Lexend;
`;

/* ───────── helpers ───────── */
const fmt = (n) => `₹ ${Math.ceil(n).toLocaleString()}`;
const isNum = (x) => !isNaN(parseFloat(x));

/* ───────── component ───────── */
const CartTab = () => {
  const items = useSelector((s) => s.cartreducer.carts);
  const dispatch = useDispatch();
  const [, force] = useState(0); // simple rerender trick

  return (
    <Wrapper>
      {items.length ? (
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow sx={{ background: primary }}>
              {[
                "Heading",
                "Product",
                "Brand",
                "Model",
                "Category",
                "Unit Price",
                "Qty",
                "Total",
                "Remove",
              ].map((h) => (
                <TableCell key={h} sx={{ color: accent, fontWeight: 600 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row) => {
              /* auto‑delete rows with qty < 1 */
              if (row.quantity < 1) {
                dispatch(DLT(row.id));
                return null;
              }

              /* pricing logic */
              const unitNum = parseFloat(row.Price);
              const unitTxt = isNum(row.Price)
                ? fmt(unitNum)
                : "Request Market price";
              const totalTxt = isNum(row.Price)
                ? fmt(unitNum * row.quantity)
                : "--";

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.Heading}</TableCell>
                  <TableCell sx={{ maxWidth: 260 }}>
                    {row.ProductName}
                  </TableCell>
                  <TableCell>{row.Brand}</TableCell>
                  <TableCell>{row.ModelNumber}</TableCell>
                  <TableCell>{row.SubCategory}</TableCell>

                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      color: primary,
                      fontWeight: 600,
                    }}
                  >
                    {unitTxt}
                  </TableCell>

                  <TableCell>
                    <QtyWrap>
                      {/* – button */}
                      <QtyBtn
                        onClick={() => {
                          if (row.quantity > 1) {
                            dispatch(REMOVE(row.id));
                          } else {
                            /* reduce from 1 → 0 ⇒ delete */
                            dispatch(DLT(row.id));
                          }
                          force((t) => t + 1);
                        }}
                      >
                        –
                      </QtyBtn>

                      <QtyVal>{row.quantity}</QtyVal>

                      {/* + button */}
                      <QtyBtn
                        onClick={() => {
                          dispatch(ADDMORE(row.id));
                          force((t) => t + 1);
                        }}
                      >
                        +
                      </QtyBtn>
                    </QtyWrap>
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ color: primary, fontWeight: 600 }}
                  >
                    {totalTxt}
                  </TableCell>

                  <TableCell>
                    <IconButton onClick={() => dispatch(DLT(row.id))}>
                      <DeleteIcon style={{ fill: "red", width: 22 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        /* empty‑state */
        <div style={{ textAlign: "center", padding: "4vh 0" }}>
          <p style={{ fontSize: 22, color: primary }}>Your table is empty</p>
          <img src={cartgif} alt="" style={{ width: 90 }} />
        </div>
      )}
    </Wrapper>
  );
};

export default CartTab;
