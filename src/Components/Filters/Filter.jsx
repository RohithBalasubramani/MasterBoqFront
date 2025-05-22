import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import FilterCheckBox from "./FilterCheckBox";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────── layout helpers ───────────────────────── */

const FilterFlex = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopGroup = styled.div``;

const BottomGroup = styled.div`
  margin-top: 0;
`;

const RightColumn = styled.div`
  border: 1px solid #e0e0e0;
  padding: 2vh;
  padding-top: 0;
  flex: 1.6;
`;

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.4rem;
  column-gap: 0.5rem;
`;

const FilterHead = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 1rem 0 0.5rem;
`;

const PriceWrap = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin: 2vh 0;
  padding: 5vh 0 4vh;
  display: flex;
`;

/* ───────────────────────── component ──────────────────────────── */

const Filter = ({
  selectedBrand,
  selectedCategory,
  selectedSubCategory1,
  selectedSubCategory2,
  selectedSubCategory3,
  setSelectedBrand,
  setSelectedCategory,
  setSelectedSubCategory1,
  setSelectedSubCategory2,
  setSelectedSubCategory3,
}) => {
  const [metaTree, setMetaTree] = useState({});

  // fetch hierarchy
  useEffect(() => {
    axios
      .get("https://www.boqmasteradmin.com/product/meta_tree/")
      .then(({ data }) => setMetaTree(data))
      .catch(console.error);
  }, []);

  // derive options
  const brandOptions = Object.keys(metaTree);
  const subCategoryOptions = selectedBrand
    ? Object.keys(metaTree[selectedBrand] || {})
    : [];
  const subCat1Options =
    selectedBrand && selectedCategory
      ? Object.keys((metaTree[selectedBrand] || {})[selectedCategory] || {})
      : [];
  let subCat2Options = selectedSubCategory1.flatMap((sc1) =>
    Object.keys(
      ((metaTree[selectedBrand] || {})[selectedCategory] || {})[sc1] || {}
    )
  );
  subCat2Options = new Set(subCat2Options)
  let subCat3Options = selectedSubCategory2.flatMap((sc2) =>
    selectedSubCategory1.flatMap(
      (sc1) =>
        (((metaTree[selectedBrand] || {})[selectedCategory] || {})[sc1] || {})[
          sc2
        ] || []
      )
    );
  subCat3Options = new Set(subCat3Options)


  // clear helpers
  const clearBelowBrand = () => {
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
  };
  const clearBelowSubCat = () => {
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
  };
  const clearBelowSubCat1 = () => {
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
  };
  const clearBelowSubCat2 = () => {
    setSelectedSubCategory3([]);
  };

  // animation variants
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div>
      <PriceWrap>
        <Autocomplete
          disablePortal
          value={selectedBrand}
          options={brandOptions}
          sx={{ width: 300 }}
          onChange={(_, val) => {
            setSelectedBrand(val);
            clearBelowBrand();
          }}
          renderInput={(params) => <TextField {...params} label="Brand" />}
        />

        {selectedBrand && (
          <Autocomplete
            disablePortal
            value={selectedCategory}
            options={subCategoryOptions}
            sx={{ width: 300, marginLeft: "1rem" }}
            onChange={(_, val) => {
              setSelectedCategory(val);
              clearBelowSubCat();
            }}
            renderInput={(params) => <TextField {...params} label="Sub-Cat" />}
          />
        )}
      </PriceWrap>

      <FilterFlex>
        <LeftColumn>
          <TopGroup>
            <AnimatePresence>
              {!!selectedCategory && (
                <motion.div
                  key="subcat1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <FilterHead>Sub Cat 1</FilterHead>
                  {subCat1Options.map((sc1) => (
                    <FilterCheckBox
                      key={sc1}
                      value={sc1}
                      selectedValues={selectedSubCategory1}
                      setCheckBoxValue={(vals) => {
                        setSelectedSubCategory1(vals);
                        clearBelowSubCat1();
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </TopGroup>

          <BottomGroup>
            <AnimatePresence>
              {!!selectedSubCategory2.length && (
                <motion.div
                  key="subcat3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <FilterHead>Sub Cat 3</FilterHead>
                  {Array.from(subCat3Options).sort().map((sc3) => (
                    <FilterCheckBox
                      key={sc3}
                      value={sc3}
                      selectedValues={selectedSubCategory3}
                      setCheckBoxValue={setSelectedSubCategory3}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </BottomGroup>
        </LeftColumn>

        <RightColumn>
          <AnimatePresence>
            {!!selectedSubCategory1.length && (
              <motion.div
                key="subcat2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <FilterHead>Sub Cat 2</FilterHead>
                <TwoColGrid>
                  {Array.from(subCat2Options).sort().map((sc2) => (
                    <FilterCheckBox
                      key={sc2}
                      value={sc2}
                      selectedValues={selectedSubCategory2}
                      setCheckBoxValue={(vals) => {
                        setSelectedSubCategory2(vals);
                        clearBelowSubCat2();
                      }}
                    />
                  ))}
                </TwoColGrid>
              </motion.div>
            )}
          </AnimatePresence>
        </RightColumn>
      </FilterFlex>
    </div>
  );
};

export default Filter;
