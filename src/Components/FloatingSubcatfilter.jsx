/*  src/Components/FloatingSubCatFilter.jsx
    – client-side “sub-filters” panel, v2
      • Auto-fits to any screen width (no hard-coded pixel labels)
      • Pure -AND- logic across Sub-Cat 4/5/6/7 (7/8/10/11 fields)
      • Clears its own selections whenever the drawer closes or the FAB
        vanishes (so you never keep “stale” sub-filters)
      • Null-safe helpers to avoid `undefined.includes` crashes
      • Smooth, scalable UI with framer-motion fade/scale
*/

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
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────── styled bits ───────────────────── */

const StickyFab = styled(Fab)`
  position: fixed !important;
  bottom: 1.6rem;
  right: 1.6rem;
  z-index: 1300;
  background: #09193d !important;
  color: #fff700 !important;
`;

const MotionFab = motion(StickyFab);
const DrawerBody = styled(Box)`
  width: 300px;
  padding: 1.8rem;
`;
const FilterHead = styled(Typography).attrs({ variant: "subtitle2" })`
  font-family: Lexend;
  text-transform: uppercase;
  margin: 1.4rem 0 0.55rem;
`;
const FilterCont = styled.label`
  display: flex;
  align-items: center;
  font-family: Lexend;
  font-size: 0.82rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  gap: 0.4rem;
`;

/* ───────────────────── helpers ───────────────────── */

const safeIncludes = (arr, val) => Array.isArray(arr) && arr.includes(val);
const ensureArray = (v) => (Array.isArray(v) ? v : []);

export default function FloatingSubCatFilter({
  /* full product list currently rendered by parent */
  products = [],
  /* main filters (drive FAB visibility) */
  selectedBrand,
  selectedCategory,
  selectedSubCategory1 = [],
  selectedSubCategory2 = [],
  selectedSubCategory3 = [],
  /* sub-filters (SubCategory 7/8/10/11) */
  selectedSubSeven = [],
  setSelectedSubSeven = () => {},
  selectedSubEight = [],
  setSelectedSubEight = () => {},
  selectedSubTen = [],
  setSelectedSubTen = () => {},
  selectedSubEleven = [],
  setSelectedSubEleven = () => {},
}) {
  /* show FAB *only* when every “main” filter is locked-in */
  const filterReady =
    !!selectedBrand &&
    !!selectedCategory &&
    selectedSubCategory1.length &&
    selectedSubCategory2.length &&
    selectedSubCategory3.length;

  /* drawer state */
  const [open, setOpen] = useState(false);

  /* close the drawer automatically if the main filters change */
  useEffect(() => {
    if (!filterReady && open) setOpen(false);
  }, [filterReady, open]);

  /* clear ALL sub-filters whenever the drawer closes or FAB disappears */
  useEffect(() => {
    if (!open) {
      // setSelectedSubSeven([]);
      // setSelectedSubEight([]);
      // setSelectedSubTen([]);
      // setSelectedSubEleven([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filterReady]);

  /* ───── derive unique option lists from products (memoised) ───── */
  const { list4, list5, list6, list7 } = useMemo(() => {
    const s4 = new Set();
    const s5 = new Set();
    const s6 = new Set();
    const s7 = new Set();
    products.forEach((p = {}) => {
      p.SubCategory7 && s4.add(p.SubCategory7.trim()); // “Sub Cat 4”
      p.SubCategory8 && s5.add(p.SubCategory8.trim()); // “Sub Cat 5”
      p.SubCategory10 && s6.add(p.SubCategory10.trim()); // “Sub Cat 6”
      p.SubCategory11 && s7.add(p.SubCategory11.trim()); // “Sub Cat 7”
    });
    const toList = (s) => [...s].sort((a, b) => a.localeCompare(b));
    return {
      list4: toList(s4),
      list5: toList(s5),
      list6: toList(s6),
      list7: toList(s7),
    };
  }, [products]);

  /* toggle a checkbox value */
  const toggleSel = (value, selectedArr, setter) => {
    selectedArr = ensureArray(selectedArr);
    setter(
      safeIncludes(selectedArr, value)
        ? selectedArr.filter((v) => v !== value)
        : [...selectedArr, value]
    );
  };

  /* floating-button animation */
  const fabVariants = {
    hidden: { opacity: 0, scale: 0.25, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.25,
      filter: "blur(8px)",
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  /* ───────────────────── UI ───────────────────── */
  return (
    <>
      {/* floating FAB (appears only when filterReady) */}
      <AnimatePresence>
        {filterReady && (
          <MotionFab
            size="medium"
            onClick={() => setOpen(true)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fabVariants}
          >
            <FilterListIcon />
          </MotionFab>
        )}
      </AnimatePresence>

      {/* slide-in drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={300}
      >
        <DrawerBody>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Sub-Filters</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Sub Cat 4 */}
          {!!list4.length && (
            <>
              <FilterHead>Sub Cat&nbsp;4</FilterHead>
              {list4.map((opt) => (
                <FilterCont key={opt}>
                  <Checkbox
                    size="small"
                    checked={safeIncludes(selectedSubSeven, opt)}
                    onChange={() =>
                      toggleSel(opt, selectedSubSeven, setSelectedSubSeven)
                    }
                    sx={{
                      color: "#c0c0c0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {opt}
                </FilterCont>
              ))}
            </>
          )}

          {/* Sub Cat 5 */}
          {!!list5.length && (
            <>
              <FilterHead>Sub Cat&nbsp;5</FilterHead>
              {list5.map((opt) => (
                <FilterCont key={opt}>
                  <Checkbox
                    size="small"
                    checked={safeIncludes(selectedSubEight, opt)}
                    onChange={() =>
                      toggleSel(opt, selectedSubEight, setSelectedSubEight)
                    }
                    sx={{
                      color: "#c0c0c0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {opt}
                </FilterCont>
              ))}
            </>
          )}

          {/* Sub Cat 6 */}
          {!!list6.length && (
            <>
              <FilterHead>Sub Cat&nbsp;6</FilterHead>
              {list6.map((opt) => (
                <FilterCont key={opt}>
                  <Checkbox
                    size="small"
                    checked={safeIncludes(selectedSubTen, opt)}
                    onChange={() =>
                      toggleSel(opt, selectedSubTen, setSelectedSubTen)
                    }
                    sx={{
                      color: "#c0c0c0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {opt}
                </FilterCont>
              ))}
            </>
          )}

          {/* Sub Cat 7 */}
          {!!list7.length && (
            <>
              <FilterHead>Sub Cat&nbsp;7</FilterHead>
              {list7.map((opt) => (
                <FilterCont key={opt}>
                  <Checkbox
                    size="small"
                    checked={safeIncludes(selectedSubEleven, opt)}
                    onChange={() =>
                      toggleSel(opt, selectedSubEleven, setSelectedSubEleven)
                    }
                    sx={{
                      color: "#c0c0c0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {opt}
                </FilterCont>
              ))}
            </>
          )}
        </DrawerBody>
      </Drawer>
    </>
  );
}
