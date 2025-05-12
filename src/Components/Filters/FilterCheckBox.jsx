import { Checkbox } from "@mui/material";
import React from "react";
import styled from "styled-components";

const FilterCont = styled.label`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  display: block;
`;

const FilterCheckBox = ({ value, setCheckBoxValue, selectedValues }) => {

    const handleCheckBoxChange = (event) => {
        if(event.target.checked){
            setCheckBoxValue((prev) => [...prev, event.target.value])
        } else{
            setCheckBoxValue((prev) => prev.filter((item) => item !== event.target.value))
        }
    }

  return (
    <FilterCont>
      <Checkbox
        type="checkbox"
        value={value}
        checked={selectedValues.includes(value)}
        onChange={(event) => handleCheckBoxChange(event)}
        sx={{
          color: "#E0E0E0",
          "&.Mui-checked": {
            color: "#ff6600",
          },
        }}
      />
      {value}
    </FilterCont>
  );
};

export default FilterCheckBox;
