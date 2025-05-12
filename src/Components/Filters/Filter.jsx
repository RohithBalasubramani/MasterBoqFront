import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterCheckBox from "./FilterCheckBox";

const FilterFlex = styled.div`
  display: flex;
  width: 100%;
`;
const FilterOne = styled.div`
  flex: 1;
`;
const FilterHead = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.045em;
  text-align: left;
  text-transform: uppercase;
  padding-top: 3vh;
  padding-bottom: 2vh;
  margin-top: 2vh;
`;

const PriceWrap = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding-bottom: 4vh;
  padding-top: 5vh;
  display: flex;
`;

const Filter = (props) => {
  const [brands, setBrands] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [subCategory1, setSubCategory1] = useState({});
  const [subCategory2, setSubCategory2] = useState({});
  const [subCategory3, setSubCategory3] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.boqmasteradmin.com/product/get_meta_data")
      .then((response) => {
        console.log(response);
        setBrands(response.data.Brands);
        setSubCategories(response.data.subCategories);
        setSubCategory1(response.data.subCategories1);
        setSubCategory2(response.data.subCategories2);
        // setSubCategory3(response.data.subCategories3);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if(props.selectedSubCategory1.length == 0){
      props.setSelectedSubCategory2([])
      props.setSelectedSubCategory3([])
    }
    if(props.selectedSubCategory2.length == 0){
      props.setSelectedSubCategory3([])
    }
  },[props.selectedSubCategory1, props.selectedSubCategory2])

  return (
    <div>
      <PriceWrap>
        <Autocomplete
          disablePortal
          value={props.selectedBrand}
          onChange={(event, newValueAuto) => {
            //setValueAuto(newValueAuto);
            props.setSelectedBrand(newValueAuto);
            props.setSelectedCategory(null);
            props.setSelectedSubCategory1([]);
            props.setSelectedSubCategory2([]);
            props.setSelectedSubCategory3([]);
            console.log(newValueAuto);
          }}
          id="combo-box-demo"
          options={Object.keys(brands)}
          sx={{ width: 300 }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          //   setSelectedBrands(newInputValue);
          // }}
          // onChange={(event) => handleBrandCheckboxChange(event)}
          renderInput={(params) => <TextField {...params} label="Brand" />}
        />
        {props.selectedBrand && (
          <Autocomplete
            disablePortal
            value={props.selectedCategory}
            onChange={(event, newValueAuto) => {
              //setValueAuto(newValueAuto);
              props.setSelectedCategory(newValueAuto);
              props.setSelectedSubCategory1([]);
              props.setSelectedSubCategory2([]);
              props.setSelectedSubCategory3([]);
              console.log(newValueAuto);
            }}
            id="combo-box-demo"
            options={brands[props.selectedBrand]}
            sx={{ width: 300 }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            //   setSelectedBrands(newInputValue);
            // }}
            // onChange={(event) => handleBrandCheckboxChange(event)}
            renderInput={(params) => <TextField {...params} label="Sub-Cat" />}
          />
        )}
      </PriceWrap>
      <FilterFlex>
        <FilterOne>
          <div>
            {props.selectedCategory && (
              <>
                <FilterHead> Sub Cat 1 </FilterHead>
                {subCategories[props.selectedCategory]?.map((subCat1) => (
                  <FilterCheckBox
                    value={subCat1}
                    setCheckBoxValue={props.setSelectedSubCategory1}
                    selectedValues={props.selectedSubCategory1}
                  />
                ))}
              </>
            )}
          </div>
          <div>
            {props.selectedSubCategory1.length > 0 && (
              <>
                <FilterHead> Sub Cat 2 </FilterHead>
                {props.selectedSubCategory1.map((sc1) =>
                  subCategory1[sc1]?.map((subCat2) => (
                    <FilterCheckBox
                      value={subCat2}
                      setCheckBoxValue={props.setSelectedSubCategory2}
                      selectedValues={props.selectedSubCategory2}
                    />
                  ))
                )}
              </>
            )}
          </div>
          <div>
            {props.selectedSubCategory2.length > 0 && (
              <>
                <FilterHead> Sub Cat 3</FilterHead>
                {props.selectedSubCategory2.map((sc2) =>
                  subCategory2[sc2]?.map((subCat3) => (
                    <FilterCheckBox
                      value={subCat3}
                      setCheckBoxValue={props.setSelectedSubCategory3}
                      selectedValues={props.selectedSubCategory3}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </FilterOne>
      </FilterFlex>
    </div>
  );
};

export default Filter;
