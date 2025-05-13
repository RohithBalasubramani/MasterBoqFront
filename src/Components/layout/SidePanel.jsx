import React from "react";
import styled from "styled-components";
import { Checkbox, Button, Slider, IconButton } from "@mui/material";
import { Remove } from "@mui/icons-material";
import Filter from "../Filters/Filter";

/* === styled copies =================================================== */
const FilterWrap = styled.div`
  flex: 5;
  height: 90vh;
  background: #ffffff;
  margin-left: 5vh;
  margin-right: 5vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
const FilterCont = styled.label`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  display: block;
`;
const FilterContTwo = styled.div`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  display: grid;
  grid-template-columns: auto auto auto;
`;
const FilterTwo = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  gap: 9vw;
`;
const FilterTwoCont = styled.div`
  border-radius: 10px;
  border: 5px solid;
  border-color: #777777;
  flex: 2;
  margin-top: 3vh;
  padding-left: 5vh;
  padding-bottom: 4vh;
`;
const ClearFilters = styled.div`
  display: flex;
  margin-left: 8%;
  font-weight: 200;
`;

/* IOSSlider styled block copied exactly */
const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#c60000" : "#D2D2D2",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#ff6600",
  },
  "& .MuiSlider-track": { border: "none" },
  "& .MuiSlider-rail": { opacity: 0.5, backgroundColor: "#1e00ff" },
}));

/* === component ======================================================= */
const SidePanel = ({
  FilterProps = {},
  uiData = {},
  callFetchProductsWithFilter,
  clearFilters,
}) => {
  // fall back to empty arrays if uiData.* is missing
  const {
    allSubCatSeven = [],
    allSubCatEight = [],
    allSubCatEleven = [],
    allSubCatTwelve = [],
  } = uiData;

  // fall back to no-op handlers & empty selected arrays
  const {
    selectedSubSeven = [],
    selectedSubEight = [],
    selectedSubEleven = [],
    selectedSubTwelve = [],
    handleSubSevenCheckboxChange = () => {},
    handleSubEightCheckboxChange = () => {},
    handleSubElevenCheckboxChange = () => {},
    handleSubTwelveCheckboxChange = () => {},
    /* …and the rest of your FilterProps handlers… */
  } = FilterProps;

  return (
    <FilterWrap>
      <Filter {...FilterProps} />

      <Button onClick={callFetchProductsWithFilter}>Apply Filter</Button>
      <Button onClick={clearFilters}>Clear Filter</Button>

      {/* SubCat7 */}
      <FilterTwo>
        <div>
          <FilterHead>Sub Cat 4</FilterHead>
          {allSubCatSeven.map((s) => (
            <FilterCont key={s}>
              <Checkbox
                value={s}
                checked={selectedSubSeven.includes(s)}
                onChange={handleSubSevenCheckboxChange}
              />
              {s}
            </FilterCont>
          ))}
        </div>

        <div>
          <FilterHead>Sub Cat 5</FilterHead>
          {allSubCatEight.map((s) => (
            <FilterCont key={s}>
              <Checkbox
                value={s}
                checked={selectedSubEight.includes(s)}
                onChange={handleSubEightCheckboxChange}
              />
              {s}
            </FilterCont>
          ))}
        </div>
      </FilterTwo>

      {/* SubCat11 */}
      <FilterTwoCont>
        <FilterHead>Sub Cat 6</FilterHead>
        <FilterContTwo>
          {allSubCatEleven.map((s) => (
            <FilterCont key={s}>
              <Checkbox
                value={s}
                checked={selectedSubEleven.includes(s)}
                onChange={handleSubElevenCheckboxChange}
              />
              {s}
            </FilterCont>
          ))}
        </FilterContTwo>
      </FilterTwoCont>

      {/* SubCat12 */}
      <FilterTwoCont>
        <FilterHead>Sub Cat 7</FilterHead>
        <FilterContTwo>
          {allSubCatTwelve.map((s) => (
            <FilterCont key={s}>
              <Checkbox
                value={s}
                checked={selectedSubTwelve.includes(s)}
                onChange={handleSubTwelveCheckboxChange}
              />
              {s}
            </FilterCont>
          ))}
        </FilterContTwo>
      </FilterTwoCont>
    </FilterWrap>
  );
};

export default SidePanel;
