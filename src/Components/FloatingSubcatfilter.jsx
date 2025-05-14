/*  src/Components/FloatingSubCatFilter.jsx
    – shows a bottom-right FAB **only when the user has picked
      every required top-level filter** (brand + sub-cats 1-3).      */

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Checkbox,
  Drawer,
  Fab,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

/* ───────────────────────── styled bits ────────────────────────── */

const StickyFab = styled(Fab)`
  position: fixed !important;
  bottom: 1.6rem;
  right: 1.6rem;
  z-index: 1300;
  background: #09193d !important;
  color: #fff700 !important;
`;

const FilterHead = styled(Typography).attrs({ variant: "subtitle2" })`
  font-family: Lexend;
  text-transform: uppercase;
  margin: 1.2rem 0 0.6rem;
`;

const FilterCont = styled.label`
  display: block;
  font-family: Lexend;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
`;

const DrawerBody = styled(Box)`
  width: 280px;
  padding: 1.6rem;
`;

/* ───────────────────────── component ─────────────────────────── */

export default function FloatingSubCatFilter({
  /* entire product list you fetched */
  products = [],

  /* selections from the main Filters component */
  selectedBrand,
  selectedCategory,
  selectedSubCategory1 = [],
  selectedSubCategory2 = [],
  selectedSubCategory3 = [],

  /* sub-cat-4 / 5 selections controlled here */
  selectedSubSeven,
  setSelectedSubSeven,
  selectedSubEight,
  setSelectedSubEight,
}) {
  /* ——— should FAB appear? ——— */
  const filterReady =
    !!selectedBrand &&
    !!selectedCategory &&
    selectedSubCategory1.length > 0 &&
    selectedSubCategory2.length > 0 &&
    selectedSubCategory3.length > 0;

  /* ——— open / close drawer ——— */
  const [open, setOpen] = useState(false);

  /* close drawer automatically if user changes filters → not ready  */
  useEffect(() => {
    if (!filterReady && open) setOpen(false);
  }, [filterReady, open]);

  /* ——— unique sub-cat-4 (7) / sub-cat-5 (8) lists ——— */
  const { allSubCatSeven, allSubCatEight } = useMemo(() => {
    const set7 = new Set();
    const set8 = new Set();
    products.forEach((p) => {
      if (p.SubCategory7) set7.add(p.SubCategory7.trim());
      if (p.SubCategory8) set8.add(p.SubCategory8.trim());
    });
    return {
      allSubCatSeven: Array.from(set7).sort(),
      allSubCatEight: Array.from(set8).sort(),
    };
  }, [products]);

  /* ——— helper to toggle checkbox arrays ——— */
  const toggleSel = (value, arr, setter) =>
    setter(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    );

  /* ——— render ——— */
  if (!filterReady) return null; // FAB hidden until all required filters are set

  return (
    <>
      <StickyFab size="medium" onClick={() => setOpen(true)}>
        <FilterListIcon />
      </StickyFab>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <DrawerBody>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Sub-Filters</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Sub-Cat-4 (from SubCategory7) */}
          {!!allSubCatSeven.length && (
            <>
              <FilterHead>Sub Cat 4</FilterHead>
              {allSubCatSeven.map((sc7) => (
                <FilterCont key={sc7}>
                  <Checkbox
                    size="small"
                    value={sc7}
                    checked={selectedSubSeven.includes(sc7)}
                    onChange={() =>
                      toggleSel(sc7, selectedSubSeven, setSelectedSubSeven)
                    }
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {sc7}
                </FilterCont>
              ))}
            </>
          )}

          {/* Sub-Cat-5 (from SubCategory8) */}
          {!!allSubCatEight.length && (
            <>
              <FilterHead>Sub Cat 5</FilterHead>
              {allSubCatEight.map((sc8) => (
                <FilterCont key={sc8}>
                  <Checkbox
                    size="small"
                    value={sc8}
                    checked={selectedSubEight.includes(sc8)}
                    onChange={() =>
                      toggleSel(sc8, selectedSubEight, setSelectedSubEight)
                    }
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {sc8}
                </FilterCont>
              ))}
            </>
          )}
        </DrawerBody>
      </Drawer>
    </>
  );
}
