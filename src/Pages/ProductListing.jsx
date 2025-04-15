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
  background-color: #ffffff;
  grid-gap: 1vh;
  padding: 2vh;
  height: 120vh;
  overflow-y: scroll;
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
  color: #ffffff;
  &.Mui-selected {
    color: #fff700;
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

const FilterTwo = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  gap: 9vw;
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
  let cartlen = cart.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const opencart = Boolean(anchorEl);

  const [searchTerm, setSearchTerm] = useState("");
  const [headName, setHeadName] = useState("");

  // Debounce logic
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      console.log("Searching for:", searchTerm);
    }, 1000),
    []
  );

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
        return false;
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

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedSubFour, setselectedSubFour] = useState([]);
  const [selectedSubTwo, setSelectedSubTwo] = useState([]);
  const [selectedSubThree, setSelectedSubThree] = useState([]);
  const [selectedSubSeven, setSelectedSubSeven] = useState([]);
  const [selectedSubEight, setSelectedSubEight] = useState([]);

  // New filters for SubCategory11 & SubCategory12
  const [selectedSubEleven, setSelectedSubEleven] = useState([]);
  const [selectedSubTwelve, setSelectedSubTwelve] = useState([]);

  const [priceFilter, setPriceFilter] = useState([0, 100000000]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Handlers for existing filters
  function handleBrandCheckboxChange(event) {
    const SubCategory4 = event.target.value;
    if (event.target.checked) {
      setselectedSubFour([...selectedSubFour, SubCategory4]);
    } else {
      setselectedSubFour(
        selectedSubFour.filter((item) => item !== SubCategory4)
      );
    }
  }

  const handlePriceChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  function handleSubTwoCheckboxChange(event) {
    const SubCategory2 = event.target.value;
    if (event.target.checked) {
      setSelectedSubTwo([...selectedSubTwo, SubCategory2]);
    } else {
      setSelectedSubTwo(selectedSubTwo.filter((item) => item !== SubCategory2));
    }
  }

  function handleSubThreeCheckboxChange(event) {
    const SubCategory3 = event.target.value;
    if (event.target.checked) {
      setSelectedSubThree([...selectedSubThree, SubCategory3]);
    } else {
      setSelectedSubThree(
        selectedSubThree.filter((item) => item !== SubCategory3)
      );
    }
  }

  function handleSubSevenCheckboxChange(event) {
    const SubCategory7 = event.target.value;
    if (event.target.checked) {
      setSelectedSubSeven([...selectedSubSeven, SubCategory7]);
    } else {
      setSelectedSubSeven(
        selectedSubSeven.filter((selected) => selected !== SubCategory7)
      );
    }
  }

  function handleSubEightCheckboxChange(event) {
    const SubCategory8 = event.target.value;
    if (event.target.checked) {
      setSelectedSubEight([...selectedSubEight, SubCategory8]);
    } else {
      setSelectedSubEight(
        selectedSubEight.filter((selected) => selected !== SubCategory8)
      );
    }
  }

  // Handlers for SubCategory11 & SubCategory12
  function handleSubElevenCheckboxChange(event) {
    const SubCategory11 = event.target.value;
    if (event.target.checked) {
      setSelectedSubEleven([...selectedSubEleven, SubCategory11]);
    } else {
      setSelectedSubEleven(
        selectedSubEleven.filter((selected) => selected !== SubCategory11)
      );
    }
  }

  function handleSubTwelveCheckboxChange(event) {
    const SubCategory12 = event.target.value;
    if (event.target.checked) {
      setSelectedSubTwelve([...selectedSubTwelve, SubCategory12]);
    } else {
      setSelectedSubTwelve(
        selectedSubTwelve.filter((selected) => selected !== SubCategory12)
      );
    }
  }

  // Brand, SubCat arrays
  const allBrands = Array.from(new Set(products.map((p) => p.Brand)));
  const allSubCat = Array.from(new Set(products.map((p) => p.SubCategory)));

  // Next-level filtering for SubCat4
  const selectedProducts = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory)
    );
  });
  const allSubCatFour = Array.from(
    new Set(
      selectedProducts
        .map((product) => product.SubCategory4)
        .filter((value) => value !== null)
    )
  );

  // Next-level filtering for SubCat2
  const selectedProductsTwo = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4)
    );
  });
  const allSubCatTwo = Array.from(
    new Set(
      selectedProductsTwo
        .map((product) => product.SubCategory2)
        .filter((value) => value !== null)
    )
  );

  // Next-level filtering for SubCat3
  const selectedProductsThree = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4) &&
      selectedSubTwo.includes(product.SubCategory2)
    );
  });
  const allSubCatThree = Array.from(
    new Set(
      selectedProductsThree
        .map((product) => product.SubCategory3)
        .filter((value) => value !== null)
    )
  );

  const [sortedSubCatThree, setSortedSubCatThree] = useState([]);
  useEffect(() => {
    const sortedSubCat = [...allSubCatThree].sort((a, b) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
    setSortedSubCatThree(sortedSubCat);
  }, [allSubCatThree]);

  // Next-level filtering for SubCat7
  const selectedProductsSeven = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4) &&
      selectedSubTwo.includes(product.SubCategory2) &&
      selectedSubThree.includes(product.SubCategory3)
    );
  });
  const allSubCatSeven = Array.from(
    new Set(
      selectedProductsSeven
        .map((product) => product.SubCategory7)
        .filter((value) => value !== null)
    )
  );

  // Next-level filtering for SubCat8
  const selectedProductsEight = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4) &&
      selectedSubTwo.includes(product.SubCategory2) &&
      selectedSubThree.includes(product.SubCategory3) &&
      selectedSubSeven.includes(product.SubCategory7)
    );
  });
  const allSubCatEight = Array.from(
    new Set(
      selectedProductsEight
        .map((product) => product.SubCategory8)
        .filter((value) => value !== null)
    )
  );

  // New sub-eleven filtering
  const selectedProductsEleven = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4) &&
      selectedSubTwo.includes(product.SubCategory2) &&
      selectedSubThree.includes(product.SubCategory3) &&
      (selectedSubSeven.length === 0 ||
        (product.SubCategory7 &&
          selectedSubSeven.includes(product.SubCategory7))) &&
      (selectedSubEight.length === 0 ||
        (product.SubCategory8 &&
          selectedSubEight.includes(product.SubCategory8)))
    );
  });
  const allSubCatEleven = Array.from(
    new Set(
      selectedProductsEleven
        .map((product) => product.SubCategory11)
        .filter((value) => value !== null)
    )
  );

  // New sub-twelve filtering
  const selectedProductsTwelve = products.filter((product) => {
    return (
      selectedBrands.includes(product.Brand) &&
      selectedSubCategory.includes(product.SubCategory) &&
      selectedSubFour.includes(product.SubCategory4) &&
      selectedSubTwo.includes(product.SubCategory2) &&
      selectedSubThree.includes(product.SubCategory3) &&
      (selectedSubSeven.length === 0 ||
        (product.SubCategory7 &&
          selectedSubSeven.includes(product.SubCategory7))) &&
      (selectedSubEight.length === 0 ||
        (product.SubCategory8 &&
          selectedSubEight.includes(product.SubCategory8))) &&
      (selectedSubEleven.length === 0 ||
        (product.SubCategory11 &&
          selectedSubEleven.includes(product.SubCategory11)))
    );
  });
  const allSubCatTwelve = Array.from(
    new Set(
      selectedProductsTwelve
        .map((product) => product.SubCategory12)
        .filter((value) => value !== null)
    )
  );

  // Final filtered list
  const filteredProducts = filteredProd.filter((product) => {
    // If no subcategory/brand is selected (except optional sub7, sub8, sub11, sub12), show all that match price + optional checks
    if (
      selectedSubCategory.length === 0 &&
      selectedBrands.length === 0 &&
      selectedSubTwo.length === 0 &&
      selectedSubThree.length === 0 &&
      selectedSubFour.length === 0 &&
      (selectedSubSeven.length === 0 ||
        (product.SubCategory7 &&
          selectedSubSeven.includes(product.SubCategory7))) &&
      (selectedSubEight.length === 0 ||
        (product.SubCategory8 &&
          selectedSubEight.includes(product.SubCategory8))) &&
      (selectedSubEleven.length === 0 ||
        (product.SubCategory11 &&
          selectedSubEleven.includes(product.SubCategory11))) &&
      (selectedSubTwelve.length === 0 ||
        (product.SubCategory12 &&
          selectedSubTwelve.includes(product.SubCategory12))) &&
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
        (selectedSubSeven.length === 0 ||
          (product.SubCategory7 &&
            selectedSubSeven.includes(product.SubCategory7))) &&
        (selectedSubEight.length === 0 ||
          (product.SubCategory8 &&
            selectedSubEight.includes(product.SubCategory8))) &&
        (selectedSubEleven.length === 0 ||
          (product.SubCategory11 &&
            selectedSubEleven.includes(product.SubCategory11))) &&
        (selectedSubTwelve.length === 0 ||
          (product.SubCategory12 &&
            selectedSubTwelve.includes(product.SubCategory12))) &&
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

  const handleClearFilters = () => {
    setSelectedSubCategory([]);
    setSelectedBrands([]);
    setSelectedSubTwo([]);
    setSelectedSubThree([]);
    setselectedSubFour([]);
    setSelectedSubSeven([]);
    setSelectedSubEight([]);
    setSelectedSubEleven([]);
    setSelectedSubTwelve([]);
    setPriceFilter([findMinMax("Price").min, findMinMax("Price").max]);
  };

  const [value, setValue] = React.useState(0);

  const [valueAuto, setValueAuto] = useState("L&T");
  const [valueAutoTwo, setValueAutoTwo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");

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
              color: "#fff700",
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
            value={0}
            icon={<Inventory />}
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/Groups"
            label="Groups"
            value={1}
            icon={<Category />}
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/auxiliaries"
            label="Auxiliaries"
            icon={<BackupTable />}
            value={2}
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
          <PriceWrap>
            <Autocomplete
              disablePortal
              value={selectedBrands}
              onChange={(event, newValueAuto) => {
                setValueAuto(newValueAuto);
              }}
              id="combo-box-demo"
              options={allBrands}
              sx={{ width: 300 }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setSelectedBrands(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />

            <Autocomplete
              disablePortal
              value={selectedSubCategory}
              onChange={(event, newValueAuto) => {
                setValueAutoTwo(newValueAuto);
              }}
              id="combo-box-demo"
              options={allSubCat}
              sx={{ width: 300, marginLeft: "1vw" }}
              inputValue={inputValueTwo}
              onInputChange={(event, newInputValueTwo) => {
                setInputValueTwo(newInputValueTwo);
                setSelectedSubCategory(newInputValueTwo);
              }}
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
              <FilterHead>Sub Cat 1</FilterHead>
              {allSubCatFour.map((SubCategory4) => (
                <FilterCont key={SubCategory4}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory4}
                    checked={selectedSubFour.includes(SubCategory4)}
                    onChange={handleBrandCheckboxChange}
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

              <FilterHead>Sub Cat 2</FilterHead>
              {allSubCatTwo.map((SubCategory2) => (
                <FilterCont key={SubCategory2}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory2}
                    checked={selectedSubTwo.includes(SubCategory2)}
                    onChange={handleSubTwoCheckboxChange}
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
              <FilterHead>Sub Cat 3</FilterHead>
              <FilterContTwo>
                {sortedSubCatThree.map((SubCategory3) => (
                  <FilterCont key={SubCategory3}>
                    <Checkbox
                      type="checkbox"
                      value={SubCategory3}
                      checked={selectedSubThree.includes(SubCategory3)}
                      onChange={handleSubThreeCheckboxChange}
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
          <br />
          <div style={{ borderTop: "1px dotted #ccc", margin: "20px 0" }} />
          <h4 style={{ color: "#b6b6b6" }}>FILTERS</h4>
          <div style={{ borderTop: "1px dotted #ccc", margin: "20px 0" }} />
          <br />
          <FilterTwo>
            <div>
              <FilterHead>Sub Cat 4</FilterHead>
              {allSubCatSeven.map((SubCategory7) => (
                <FilterCont key={SubCategory7}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory7}
                    checked={selectedSubSeven.includes(SubCategory7)}
                    onChange={handleSubSevenCheckboxChange}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory7}
                </FilterCont>
              ))}
            </div>

            <div>
              <FilterHead>Sub Cat 5</FilterHead>
              {allSubCatEight.map((SubCategory8) => (
                <FilterCont key={SubCategory8}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory8}
                    checked={selectedSubEight.includes(SubCategory8)}
                    onChange={handleSubEightCheckboxChange}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory8}
                </FilterCont>
              ))}
            </div>
          </FilterTwo>

          {/*
            New containers for SubCategory11 & SubCategory12
          */}
          <FilterTwoCont>
            <FilterHead>Sub Cat 6</FilterHead>
            <FilterContTwo>
              {allSubCatEleven.map((SubCategory11) => (
                <FilterCont key={SubCategory11}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory11}
                    checked={selectedSubEleven.includes(SubCategory11)}
                    onChange={handleSubElevenCheckboxChange}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory11}
                </FilterCont>
              ))}
            </FilterContTwo>
          </FilterTwoCont>

          <FilterTwoCont>
            <FilterHead>Sub Cat 7</FilterHead>
            <FilterContTwo>
              {allSubCatTwelve.map((SubCategory12) => (
                <FilterCont key={SubCategory12}>
                  <Checkbox
                    type="checkbox"
                    value={SubCategory12}
                    checked={selectedSubTwelve.includes(SubCategory12)}
                    onChange={handleSubTwelveCheckboxChange}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {SubCategory12}
                </FilterCont>
              ))}
            </FilterContTwo>
          </FilterTwoCont>
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
              <ProductCard
                key={product.id}
                HeadName={headName}
                Prod={product}
              />
            ))}
          </Wrapper>
        </WrapperWhole>
      </Containerwhole>
    </Container>
  );
};

export default ProductListing;
