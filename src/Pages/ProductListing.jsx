import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Badge,
  BottomNavigationAction,
  BottomNavigation,
  Checkbox,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Autocomplete,
  TextField,
} from "@mui/material";
import { styled as sty } from "@mui/material/styles";
import ProductCard from "../Components/ProductCard";
import SearchAppBar from "../Components/StyledSearch";
import { BackupTable, Category, Inventory, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #ffffff;
  width: 98%;
  height: auto;
  color: #333333;
`;

const Containerwhole = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

const FilterWrap = styled.div`
  flex: 5;
  height: 100vh;
  background: #ffffff;
  margin-left: 5vh;
  margin-right: 5vh;
`;

const HeadCon = styled.div`
  background-color: #15375a;
  position: sticky;
  width: 100%;
  z-index: 100;
  padding: 1vh;
  display: flex;
`;

const SearchCon = styled.div`
  margin-left: 5%;
  width: 70%;
`;
const CartCont = styled.div`
  margin-left: auto;
  margin-right: 5%;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  /* display: grid;
    grid-template-columns: auto auto auto; */
  background-color: #ffffff;
  grid-gap: 1vh;
  padding: 2vh;
  height: 90vh;
  overflow-y: scroll;
  /* padding-right: 5vh; */
`;

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
  letter-spacing: 0em;
  text-align: left;
  display: block;
`;

const FilterContTwo = styled.div`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  display: grid;
  grid-template-columns: auto auto auto;
`;

const WrapperTit = styled.div`
  font-family: Lexend;
  font-size: 48px;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
`;

const WrapperNum = styled.div`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const Sort = styled.div`
  margin-left: auto;
  margin-right: 5%;
  display: flex;
  margin-top: auto;
  margin-bottom: 0;
`;

const SortText = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  margin-top: auto;
  margin-bottom: auto;
`;
const WrapperFlex = styled.div`
  width: 100%;
  display: flex;
  vertical-align: middle;
`;

const FilterFlex = styled.div`
  display: flex;
  width: 100%;
`;

const StyledBadge = sty(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,

    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#fff700",
    color: "#000000",
  },
}));

const CustomBottomNavigationAction = sty(BottomNavigationAction)(`
  color: #fff700;
  &.Mui-selected {
    color: #ffffff;
  }
`);

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = sty(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#c60000" : "#D2D2D2",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#ff6600",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#1e00ff",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

const FilterTwoCont = styled.div`
  border-radius: 10px;
  border: 5px solid;
  border-color: #777777;
  flex: 2;
  margin-top: 3vh;
  padding-left: 5vh;
  padding-bottom: 4vh;
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

const FilterOne = styled.div`
  flex: 1;
`;

const ClearFilters = styled.div`
  display: flex;
  margin-left: 8%;
  font-weight: 200;
`;

const NameInput = styled.div`
  padding: 10px;
`;

const ProductListing = ({ products }) => {
  // Cart
  const cart = useSelector((state) => state.cartreducer.carts);
  // console.log(cart);
  let cartlen = cart.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const opencart = Boolean(anchorEl);

  const [searchTerm, setSearchTerm] = useState("");
  const [headName, setHeadName] = useState("");

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // Define a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      // Handle search logic here
      console.log("Searching for:", searchTerm);
      // Update your state or perform API requests here
    }, 1000),
    []
  ); // Adjust the debounce delay as needed

  // Handle search term changes and call the debounced search function
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const searchKeywords = searchTerm ? searchTerm.toLowerCase().split(" ") : [];

  const filteredProd = products.filter((product) => {
    const subcategories = [
      product.ProductName,
      product.SubCategory,
      product.SubCategory2,
      product.SubCategory3,
      product.SubCategory4,
      product.SubCategory5,
      product.SubCategory6,
    ];

    return searchKeywords.every((keyword) =>
      subcategories.some((subcategory) => {
        if (keyword && subcategory) {
          return subcategory.toLowerCase().includes(keyword.toLowerCase());
        }
        return false; // Handle null or undefined values
      })
    );
  });

  function findMinMax(key) {
    const datas = products.map((node) => node[key]);

    return {
      min: Math.min(...datas),
      max: Math.max(...datas),
    };
  }

  // console.log(findMinMax("Price").min);

  const marks = [
    {
      value: findMinMax("Price").min,
      label: "min",
    },

    {
      value: (findMinMax("Price").min + findMinMax("Price").max) / 4,
      label: "25%",
    },

    {
      value: (findMinMax("Price").min + findMinMax("Price").max) / 2,
      label: "50%",
    },

    {
      value: ((findMinMax("Price").min + findMinMax("Price").max) * 3) / 4,
      label: "75%",
    },

    {
      value: findMinMax("Price").max,
      label: "max",
    },
  ];

  //Brand Filtering//

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedSubFour, setselectedSubFour] = useState([]);
  const [selectedSubTwo, setSelectedSubTwo] = useState([]);
  const [selectedSubThree, setSelectedSubThree] = useState([]);

  const [priceFilter, setPriceFilter] = useState([0, 100000000]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Brandcheckbox
  function handleBrandCheckboxChange(event) {
    const SubCategory4 = event.target.value;
    if (event.target.checked) {
      setselectedSubFour([...selectedSubFour, SubCategory4]);
    } else {
      setselectedSubFour(
        selectedSubFour.filter(
          (selectedSubFour) => selectedSubFour !== SubCategory4
        )
      );
    }
  }

  const handlePriceChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  // subcat1
  function handleSubTwoCheckboxChange(event) {
    const SubCategory2 = event.target.value;
    if (event.target.checked) {
      setSelectedSubTwo([...selectedSubTwo, SubCategory2]);
    } else {
      setSelectedSubTwo(
        selectedSubTwo.filter((selectedBrand) => selectedBrand !== SubCategory2)
      );
    }
  }

  // subcat2
  function handleSubThreeCheckboxChange(event) {
    const SubCategory3 = event.target.value;
    if (event.target.checked) {
      setSelectedSubThree([...selectedSubThree, SubCategory3]);
    } else {
      setSelectedSubThree(
        selectedSubThree.filter(
          (selectedBrand) => selectedBrand !== SubCategory3
        )
      );
    }
  }

  const allBrands = Array.from(
    new Set(products.map((product) => product.Brand))
  );
  const allSubCat = Array.from(
    new Set(products.map((product) => product.SubCategory))
  );

  // Assuming selectedBrands and selectedSubCategory are arrays containing the selected criteria.

  const selectedProducts = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory)
    );
  });

  const allSubCatTwo = Array.from(
    new Set(
      selectedProducts
        .map((product) => product.SubCategory2)
        .filter((value) => value !== null)
    )
  );
  const allSubCatFour = Array.from(
    new Set(
      selectedProducts
        .map((product) => product.SubCategory4)
        .filter((value) => value !== null)
    )
  );
  const allSubCatThree = Array.from(
    new Set(
      selectedProducts
        .map((product) => product.SubCategory3)
        .filter((value) => value !== null)
    )
  );

  // console.log(searchTerm);

  const filteredProducts = filteredProd.filter((product) => {
    if (
      selectedSubCategory.length === 0 &&
      selectedBrands.length === 0 &&
      selectedSubTwo.length === 0 &&
      selectedSubThree.length === 0 &&
      selectedSubFour.length === 0 &&
      product.Price >= priceFilter[0] &&
      product.Price <= priceFilter[1]
    ) {
      return true;
    } else {
      return (
        selectedSubCategory.includes(product.SubCategory) &&
        selectedBrands.includes(product.Brand) &&
        selectedSubTwo.includes(product.SubCategory2) &&
        selectedSubThree.includes(product.SubCategory3) &&
        selectedSubFour.includes(product.SubCategory4) &&
        product.Price >= priceFilter[0] &&
        product.Price <= priceFilter[1]
      );
    }
  });

  const count = filteredProducts.length;

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.Price - b.Price;
    } else {
      return b.Price - a.Price;
    }
  });

  function valuetext(value) {
    return `₹${value}`;
  }

  // console.log(selectedBrands);
  // console.log(headName);

  const handleClearFilters = () => {
    setSelectedSubCategory([]);
    setSelectedBrands([]);
    setSelectedSubTwo([]);
    setSelectedSubThree([]);
    setselectedSubFour([]);
    setPriceFilter([findMinMax("Price").min, findMinMax("Price").max]);
  };

  const [value, setValue] = React.useState(1);

  const [valueAuto, setValueAuto] = useState("L&T");
  const [valueAutoTwo, setValueAutoTwo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");

  // console.log(selectedBrands);

  return (
    <Container>
      <HeadCon>
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            background: "#09193D",
            borderRadius: "20px",
            color: "#b2b2b2",
            "& .Mui-selected, .Mui-selected > svg": {
              color: "#ffffff",
            },
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <CustomBottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            icon={<Inventory />}
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/Groups"
            label="Groups"
            icon={<Category />}
          />
        </BottomNavigation>

        <SearchCon>
          <SearchAppBar search={searchTerm} onchange={handleSearchChange} />
        </SearchCon>

        <CartCont>
          <IconButton component={Link} to="/table" sx={{ color: "white" }}>
            <StyledBadge
              badgeContent={cartlen}
              id="basic-button"
              aria-controls={opencart ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opencart ? "true" : undefined}
            >
              <BackupTable />
            </StyledBadge>
          </IconButton>
        </CartCont>
      </HeadCon>

      <Containerwhole>
        <FilterWrap>
          {/* <PriceWrap>
            <FilterHead>
              {" "}
              Price Range (Rs.{priceFilter[0]}-Rs.{priceFilter[1]} ){" "}
              <ClearFilters>
                Clear Filters
                <IconButton>
                  <Remove onClick={handleClearFilters} />
                </IconButton>
              </ClearFilters>
            </FilterHead>
            <IOSSlider
              id="price-filter"
              value={priceFilter}
              getAriaValueText={valuetext}
              onChange={handlePriceChange}
              step={50}
              min={findMinMax("Price").min}
              max={findMinMax("Price").max}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </PriceWrap> */}

          <PriceWrap>
            <Autocomplete
              disablePortal
              value={selectedBrands}
              onChange={(event, newValueAuto) => {
                setValueAuto(newValueAuto);
                // setSelectedBrands(newValueAuto);
              }}
              id="combo-box-demo"
              options={allBrands}
              sx={{ width: 300 }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setSelectedBrands(newInputValue);
              }}
              // onChange={(event) => handleBrandCheckboxChange(event)}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />

            <Autocomplete
              disablePortal
              value={selectedSubCategory}
              onChange={(event, newValueAuto) => {
                setValueAutoTwo(newValueAuto);
                // setSelectedBrands(newValueAuto);
              }}
              id="combo-box-demo"
              options={allSubCat}
              sx={{ width: 300, marginLeft: "1vw" }}
              inputValue={inputValueTwo}
              onInputChange={(event, newInputValueTwo) => {
                setInputValueTwo(newInputValueTwo);
                setSelectedSubCategory(newInputValueTwo);
              }}
              // onChange={(event) => handleBrandCheckboxChange(event)}
              renderInput={(params) => (
                <TextField {...params} label="Sub-Cat" />
              )}
            />

            <ClearFilters>
              <div>Clear Filters</div>
              <IconButton>
                <Remove onClick={handleClearFilters} />
              </IconButton>
            </ClearFilters>
          </PriceWrap>

          <FilterFlex>
            <FilterOne>
              <FilterHead> Sub Cat 1 </FilterHead>
              {allSubCatFour.map((SubCategory4) => (
                <FilterCont key={SubCategory4}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory4}
                    checked={selectedSubFour.includes(SubCategory4)}
                    onChange={(event) => handleBrandCheckboxChange(event)}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory4}
                </FilterCont>
              ))}

              <FilterHead> Sub Cat 2 </FilterHead>
              {allSubCatTwo.map((SubCategory2) => (
                <FilterCont key={SubCategory2}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory2}
                    checked={selectedSubTwo.includes(SubCategory2)}
                    onChange={(event) => handleSubTwoCheckboxChange(event)}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory2}
                </FilterCont>
              ))}
            </FilterOne>

            <FilterTwoCont>
              <FilterHead> Sub Cat 3 </FilterHead>
              <FilterContTwo>
                {allSubCatThree.map((SubCategory3) => (
                  <FilterCont key={SubCategory3}>
                    <Checkbox
                      type="checkbox"
                      value={SubCategory3}
                      checked={selectedSubThree.includes(SubCategory3)}
                      onChange={(event) => handleSubThreeCheckboxChange(event)}
                      sx={{
                        color: "#E0E0E0",
                        "&.Mui-checked": {
                          color: "#ff6600",
                        },
                      }}
                    />
                    {SubCategory3}
                  </FilterCont>
                ))}
              </FilterContTwo>
            </FilterTwoCont>
          </FilterFlex>

          {/* <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
      </button> */}
        </FilterWrap>

        <WrapperWhole>
          <WrapperHead>
            <WrapperTit></WrapperTit>
            <WrapperTit>{searchTerm}</WrapperTit>
            <WrapperFlex>
              <WrapperNum>‘{count}’ Results</WrapperNum>

              <Sort>
                <NameInput>
                  <TextField
                    id="outlined-basic"
                    label="Header"
                    variant="outlined"
                    sx={{}}
                    size="small"
                    onChange={(e) => setHeadName(e.target.value)}
                  />
                </NameInput>

                <SortText>Sort by price:</SortText>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    id="demo-simple-select"
                    value={sortOrder}
                    displayEmpty
                  >
                    <MenuItem
                      onClick={() => setSortOrder("desc")}
                      value={"desc"}
                    >
                      High to Low
                    </MenuItem>
                    <MenuItem onClick={() => setSortOrder("asc")} value={"asc"}>
                      Low to High
                    </MenuItem>
                  </Select>
                </FormControl>
              </Sort>
            </WrapperFlex>
          </WrapperHead>
          <Wrapper>
            {sortedProducts.map((product) => (
              <ProductCard HeadName={headName} Prod={product} />
            ))}
          </Wrapper>
        </WrapperWhole>
      </Containerwhole>
    </Container>
  );
};

export default ProductListing;
