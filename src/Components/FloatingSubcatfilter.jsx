// src/Components/FloatingSubCatFilter.jsx

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

/* ───────────────────────── styled bits ────────────────────────── */

const StickyFab = styled(Fab)`
  position: fixed !important;
  bottom: 1.6rem;
  right: 1.6rem;
  z-index: 1300;
  background: #09193d !important;
  color: #fff700 !important;
`;

const MotionFab = motion(StickyFab);

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
  products = [],
  selectedBrand,
  selectedCategory,
  selectedSubCategory1 = [],
  selectedSubCategory2 = [],
  selectedSubCategory3 = [],
  selectedSubSeven,
  setSelectedSubSeven,
  selectedSubEight,
  setSelectedSubEight,
  selectedSubTen,
  setSelectedSubTen,
  selectedSubEleven,
  setSelectedSubEleven,
}) {
  // only show FAB if all top-level filters are set
  const filterReady =
    !!selectedBrand &&
    !!selectedCategory &&
    selectedSubCategory1.length > 0 &&
    selectedSubCategory2.length > 0 &&
    selectedSubCategory3.length > 0;

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!filterReady && open) setOpen(false);
  }, [filterReady, open]);

  // derive sub-cat-4 & 5 lists
  const { allSubCatSeven, allSubCatEight, allSubCatTen, allSubCatEleven } = useMemo(() => {
    const set7 = new Set();
    const set8 = new Set();
    const set10 = new Set();
    const set11 = new Set();
    products.forEach((p) => {
      if (p.SubCategory7) set7.add(p.SubCategory7.trim());
      if (p.SubCategory8) set8.add(p.SubCategory8.trim());
      if (p.SubCategory10) set10.add(p.SubCategory10.trim());
      if (p.SubCategory11) set11.add(p.SubCategory11.trim());
    });
    return {
      allSubCatSeven: Array.from(set7).sort(),
      allSubCatEight: Array.from(set8).sort(),
      allSubCatTen: Array.from(set10).sort(),
      allSubCatEleven: Array.from(set11).sort(),
    };
  }, [products]);

  const toggleSel = (val, arr, setter) =>
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  // animation variants for the “reverse Thanos snap”
  const fabVariants = {
    hidden: { opacity: 0, scale: 0.2, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      filter: "blur(8px)",
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <>
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

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <DrawerBody>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Sub-Filters</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Sub-Cat-4 */}
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

          {/* Sub-Cat-5 */}
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
          {/* Sub-Cat-6 */}
          {!!allSubCatTen.length && (
            <>
              <FilterHead>Sub Cat 6</FilterHead>
              {allSubCatTen.map((sc10) => (
                <FilterCont key={sc10}>
                  <Checkbox
                    size="small"
                    value={sc10}
                    checked={selectedSubTen.includes(sc10)}
                    onChange={() =>
                      toggleSel(sc10, selectedSubTen, setSelectedSubTen)
                    }
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {sc10}
                </FilterCont>
              ))}
            </>
          )}
          {/* Sub-Cat-7 */}
          {!!allSubCatEleven.length && (
            <>
              <FilterHead>Sub Cat 7</FilterHead>
              {allSubCatEleven.map((sc11) => (
                <FilterCont key={sc11}>
                  <Checkbox
                    size="small"
                    value={sc11}
                    checked={selectedSubEleven.includes(sc11)}
                    onChange={() =>
                      toggleSel(sc11, selectedSubEleven, setSelectedSubEleven)
                    }
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": { color: "#ff6600" },
                    }}
                  />
                  {sc11}
                </FilterCont>
              ))}
            </>
          )}
        </DrawerBody>
      </Drawer>
    </>
  );
}
