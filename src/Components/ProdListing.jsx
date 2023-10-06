import { useState } from "react";
import styled from "styled-components";
import { styled as sty } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import ProductCard from "./ProductCard";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: auto;
  color: #333333;
`;

const Containerwhole = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

const FilterWrap = styled.div`
  flex: 1;
  height: 100vh;
  background: #ffffff;
  margin-left: 5vh;
  margin-right: 5vh;
`;

const HeadCon = styled.div`
  background-color: #ff5c5c;
  position: sticky;
  width: 100%;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #ffffff;
  grid-gap: 2.5vh;
  padding: 2vh;
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
  border-top: 1px solid #e0e0e0;
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

function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceLim, setpriceLim] = useState([0, 0]);

  const filteredProd = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      label: "10k",
    },

    {
      value: (findMinMax("Price").min + findMinMax("Price").max) / 2,
      label: "30k",
    },

    {
      value: findMinMax("Price").max,
      label: "50k",
    },
  ];

  //Brand Filtering//

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceFilter, setPriceFilter] = useState([
    findMinMax("Price").min,
    findMinMax("Price").max,
  ]);
  const [sortOrder, setSortOrder] = useState("asc");

  function handleBrandCheckboxChange(event) {
    const Brand = event.target.value;
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, Brand]);
    } else {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== Brand)
      );
    }
  }

  const handlePriceChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  const allBrands = Array.from(
    new Set(products.map((product) => product.Brand))
  );

  const filteredProducts = filteredProd.filter((product) => {
    if (
      selectedBrands.length === 0 &&
      product.Price >= priceFilter[0] &&
      product.Price <= priceFilter[1]
    ) {
      return true;
    } else {
      return (
        selectedBrands.includes(product.Brand) &&
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

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {allBrands.map((Brand) => (
        <FilterCont key={Brand}>
          <Checkbox
            type="checkbox"
            value={Brand}
            checked={selectedBrands.includes(Brand)}
            onChange={(event) => handleBrandCheckboxChange(event)}
            sx={{
              color: "#E0E0E0",
              "&.Mui-checked": {
                color: "#ff6600",
              },
            }}
          />
          {Brand}
        </FilterCont>
      ))}

      <div>
        <FilterHead> Price </FilterHead>
        <IOSSlider
          id="price-filter"
          value={priceFilter}
          getAriaValueText={valuetext}
          onChange={handlePriceChange}
          step={50}
          min={findMinMax("Price").min}
          max={findMinMax("Price").max}
          valueLabelDisplay="auto"
        />
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>
              {product.ProductName}........{product.Price}
            </a>{" "}
            - ${product.Brand}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
