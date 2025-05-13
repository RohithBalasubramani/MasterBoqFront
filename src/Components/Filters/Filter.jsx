import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterCheckBox from "./FilterCheckBox";

/* ──────────────── layout helpers ──────────────── */

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
  margin-top: 0; /* pushes Sub‑Cat‑3 to bottom */
`;

const RightColumn = styled.div`
  border: 1px solid #e0e0e0;
  padding: 2vh;
  padding-top: 0%;
  flex: 1.6;
`;

/* two‑column grid for Sub‑Cat‑2 checkboxes */
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
  line-height: 20px;
  letter-spacing: 0.045em;
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

/* ───────────────── component ─────────────────── */

const Filter = (props) => {
  const [brands, setBrands] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [subCategory1, setSubCategory1] = useState({});
  const [subCategory2, setSubCategory2] = useState({});

  /* fetch meta data once */
  useEffect(() => {
    axios
      .get("https://www.boqmasteradmin.com/product/get_meta_data")
      .then(({ data }) => {
        setBrands(data.Brands);
        setSubCategories(data.subCategories);
        setSubCategory1(data.subCategories1);
        setSubCategory2(data.subCategories2);
      })
      .catch(console.error);
  }, []);

  /* cascading clear */
  useEffect(() => {
    if (props.selectedSubCategory1.length === 0) {
      props.setSelectedSubCategory2([]);
      props.setSelectedSubCategory3([]);
    }
    if (props.selectedSubCategory2.length === 0) {
      props.setSelectedSubCategory3([]);
    }
  }, [props.selectedSubCategory1, props.selectedSubCategory2]);

  return (
    <div>
      {/* ── Brand & primary Sub‑Cat selectors ───────────── */}
      <PriceWrap>
        <Autocomplete
          disablePortal
          value={props.selectedBrand}
          id="brand-autocomplete"
          options={Object.keys(brands)}
          sx={{ width: 300 }}
          onChange={(_, val) => {
            props.setSelectedBrand(val);
            props.setSelectedCategory(null);
            props.setSelectedSubCategory1([]);
            props.setSelectedSubCategory2([]);
            props.setSelectedSubCategory3([]);
          }}
          renderInput={(p) => <TextField {...p} label="Brand" />}
        />

        {props.selectedBrand && (
          <Autocomplete
            disablePortal
            value={props.selectedCategory}
            id="subcat-autocomplete"
            options={brands[props.selectedBrand]}
            sx={{ width: 300, marginLeft: "1rem" }}
            onChange={(_, val) => {
              props.setSelectedCategory(val);
              props.setSelectedSubCategory1([]);
              props.setSelectedSubCategory2([]);
              props.setSelectedSubCategory3([]);
            }}
            renderInput={(p) => <TextField {...p} label="Sub‑Cat" />}
          />
        )}
      </PriceWrap>

      {/* ── Three‑level subcategory filters ─────────────── */}
      <FilterFlex>
        {/* LEFT column: Sub‑Cat‑1 (top) & Sub‑Cat‑3 (bottom) */}
        <LeftColumn>
          <TopGroup>
            {props.selectedCategory && (
              <>
                <FilterHead>Sub Cat 1</FilterHead>
                {subCategories[props.selectedCategory]?.map((sc1) => (
                  <FilterCheckBox
                    key={sc1}
                    value={sc1}
                    setCheckBoxValue={props.setSelectedSubCategory1}
                    selectedValues={props.selectedSubCategory1}
                  />
                ))}
              </>
            )}
          </TopGroup>

          <BottomGroup>
            {props.selectedSubCategory2.length > 0 && (
              <>
                <FilterHead>Sub Cat 3</FilterHead>
                {props.selectedSubCategory2.flatMap((sc2) =>
                  subCategory2[sc2]?.map((sc3) => (
                    <FilterCheckBox
                      key={sc3}
                      value={sc3}
                      setCheckBoxValue={props.setSelectedSubCategory3}
                      selectedValues={props.selectedSubCategory3}
                    />
                  ))
                )}
              </>
            )}
          </BottomGroup>
        </LeftColumn>

        {/* RIGHT column: Sub‑Cat‑2 rendered in TWO columns */}
        <RightColumn>
          {props.selectedSubCategory1.length > 0 && (
            <>
              <FilterHead>Sub Cat 2</FilterHead>
              <TwoColGrid>
                {props.selectedSubCategory1.flatMap((sc1) =>
                  subCategory1[sc1]?.map((sc2) => (
                    <FilterCheckBox
                      key={sc2}
                      value={sc2}
                      setCheckBoxValue={props.setSelectedSubCategory2}
                      selectedValues={props.selectedSubCategory2}
                    />
                  ))
                )}
              </TwoColGrid>
            </>
          )}
        </RightColumn>
      </FilterFlex>
    </div>
  );
};

export default Filter;
