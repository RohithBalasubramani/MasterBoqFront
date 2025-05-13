/* ProductDisplay.jsx
   One‑file component — no logic changed, only displays the grid
*/
import React from "react";
import styled from "styled-components";
import { FormControl, Select, MenuItem, Input } from "@mui/material";

/* ⚠️  adjust this import if your ProductCard lives elsewhere */
import ProductCard from "../product/ProductCard";

/* ─── styled copies from original source ──────────────────────────── */
const WrapperWhole = styled.div`
  background-color: #ffffff;
  display: block;
  border-left: 1px solid #e0e0e0;
  flex: 8;
`;
const WrapperHead = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding-left: 2vh;
  border-bottom: 1px solid #e0e0e0;
`;
const WrapperTit = styled.div`
  font-family: Lexend;
  font-size: 48px;
  font-weight: 500;
  line-height: 60px;
`;
const WrapperFlex = styled.div`
  width: 100%;
  display: flex;
`;
const WrapperNum = styled.div`
  font-family: Lexend;
  font-size: 12px;
  margin-right: 1rem;
`;
const Sort = styled.div`
  margin-left: auto;
  margin-right: 5%;
  display: flex;
`;
const NameInput = styled.div`
  padding: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  grid-gap: 1vh;
  padding: 2vh;
  height: 65vh;
  overflow-y: scroll;
`;

/* ─── component ───────────────────────────────────────────────────── */
const ProductDisplay = ({
  searchTerm,
  headName,
  count,
  sortedProducts,
  loading,
  error,
  nextUrl,
  scrollContainerRef,
  sortOrder,
  setSortOrder,
  handleSearchChange,
}) => (
  <WrapperWhole>
    {/* header row */}
    <WrapperHead>
      <WrapperTit>{searchTerm}</WrapperTit>
      <WrapperFlex>
        <WrapperNum>‘{count}’ Results</WrapperNum>

        <Sort>
          <NameInput>
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </NameInput>
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>Sort:</div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select value={sortOrder} displayEmpty>
              <MenuItem onClick={() => setSortOrder("desc")} value="desc">
                High to Low
              </MenuItem>
              <MenuItem onClick={() => setSortOrder("asc")} value="asc">
                Low to High
              </MenuItem>
            </Select>
          </FormControl>
        </Sort>
      </WrapperFlex>
    </WrapperHead>

    {/* scrollable grid */}
    <Wrapper ref={scrollContainerRef}>
      {sortedProducts.map((p) => (
        <ProductCard key={p.id} HeadName={headName} Prod={p} />
      ))}

      {loading && <div>🔄 Loading more…</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!nextUrl && !loading && <p>✅ All products loaded.</p>}
    </Wrapper>
  </WrapperWhole>
);

export default ProductDisplay;
