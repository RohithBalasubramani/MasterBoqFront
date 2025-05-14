/*  src/Pages/ProductListing.jsx
    – version with pagination-reset fix **and** the “Header” <TextField />  */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled as sty } from "@mui/material/styles";
import { BackupTable, Category, Inventory } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductCard from "../Components/ProductCard";
import SearchAppBar from "../Components/StyledSearch";
import Filter from "../Components/Filters/Filter";
import FloatingSubCatFilter from "../Components/FloatingSubcatfilter";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────  constants  ─────────────────────── */

const BASE_LIST_URL = "https://www.boqmasteradmin.com/product/";
const BASE_FILTER_URL = "https://www.boqmasteradmin.com/product/filter/";

/* ───────────────────── styled bits (unchanged) ─────────────────── */

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  color: #333333;
`;
const HeadCon = styled.div`
  background-color: #15375a;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 1vh;
  display: flex;
`;
const SearchCon = styled.div`
  margin-left: 5%;
  width: 60%;
  display: flex;
  height: 7vh;
  background-color: ${(p) => p.bg};
  border: 2px solid ${(p) => p.bor};
  border-radius: 8px;
  color: ${(p) => p.col};
`;
const CartCont = styled.div`
  margin-left: auto;
  margin-right: 5%;
  margin-top: 10px;
`;
const ContainerWhole = styled.div`
  display: flex;
  width: 100%;
`;
const FilterWrap = styled.div`
  flex: 5;
  height: 90vh;
  margin: 0 5vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const StickyBottom = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  margin-top: 2vh;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5vw;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const PrimaryButton = styled.button`
  background-color: #09193d;
  color: #fff700;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  text-transform: none;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0c204f;
  }
`;
const OutlineButton = styled.button`
  background: transparent;
  color: #09193d;
  border: 2px solid #09193d;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
  &:hover {
    background: #09193d;
    color: #fff700;
  }
`;
const WrapperWhole = styled.div`
  flex: 8;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
`;
const WrapperHead = styled.div`
  padding-left: 2vh;
  border-bottom: 1px solid #e0e0e0;
`;
const WrapperTit = styled.div`
  font-family: Lexend, sans-serif;
  font-size: 48px;
  font-weight: 500;
`;
const WrapperFlex = styled.div`
  display: flex;
  width: 100%;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2vh;
  height: 80vh;
  overflow-y: auto;
`;
const WrapperNum = styled.div`
  font-family: Lexend, sans-serif;
  font-size: 12px;
  margin-top: auto;
`;
const Sort = styled.div`
  margin-left: auto;
  margin-right: 5%;
  display: flex;
  align-items: center;
`;
const SortText = styled.div`
  font-family: Lexend, sans-serif;
  font-size: 16px;
`;
const NameInput = styled.div`
  padding: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 2vh;
  padding-bottom: 5vh;
  height: 80vh;
  overflow-y: auto;
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
const CustomBottomNavigationAction = sty(BottomNavigationAction)`
      color: #ffffff;
      &.Mui-selected {
        color: #fff700;
      }
    `;

/* ───────────────────── component ───────────────────── */

export default function ProductListing() {
  /* ---------- search ---------- */
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleSearch = () => {
    const url = `${BASE_LIST_URL}?search=${encodeURIComponent(
      searchQuery.trim()
    )}`;
    setProducts([]);
    setCount(0);
    setApplyFilter(false);
    setNextUrl(BASE_LIST_URL); // reset standard pagination
    fetchProducts(url);
  };

  /* ---------- filters & state ---------- */
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState([]);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState([]);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState([]);
  const [selectedSubSeven, setSelectedSubSeven] = useState([]);
  const [selectedSubEight, setSelectedSubEight] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(BASE_LIST_URL);
  const [nextFilterUrl, setNextFilterUrl] = useState(BASE_FILTER_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [headName, setHeadName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const scrollContainerRef = useRef(null);
  const cartLen = useSelector((s) => s.cartreducer.carts.length);

  /* ---------- data fetchers ---------- */
  const fetchProducts = async (url = null) => {
    if ((!url && !nextUrl) || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(url || nextUrl);
      setProducts((prev) => [...prev, ...res.data.results]);
      setNextUrl(res.data.next);
      setCount(res.data.count);
    } catch {
      setError("Failed to load products, please retry.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsWithFilter = async (payload, url = null) => {
    if ((!url && !nextFilterUrl) || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(url || nextFilterUrl, payload);
      setProducts((prev) => [...prev, ...res.data.results]);
      setNextFilterUrl(res.data.next);
      setCount(res.data.count);
    } catch {
      setError("Failed to load products, please retry.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- initial load ---------- */
  useEffect(() => {
    fetchProducts(BASE_LIST_URL);
  }, []);

  /* ---------- infinite scroll ---------- */
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        if (applyFilter) {
          const payload = {
            brand: selectedBrand,
            subCategory: selectedCategory,
            subCategory1: selectedSubCategory1,
            subCategory2: selectedSubCategory2,
            subCategory3: selectedSubCategory3,
          };
          fetchProductsWithFilter(payload);
        } else {
          fetchProducts();
        }
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [applyFilter, loading]);

  /* ---------- helpers ---------- */
  const priceNum = (v) => (isNaN(parseFloat(v)) ? Infinity : parseFloat(v));
  const sortedProducts = products
    .slice()
    .sort((a, b) =>
      sortOrder === "asc"
        ? priceNum(a.Price) - priceNum(b.Price)
        : priceNum(b.Price) - priceNum(a.Price)
    );

  /* ---------- filter CTA ---------- */
  const callFetchProductsWithFilter = () => {
    if (
      selectedBrand ||
      selectedCategory ||
      selectedSubCategory1.length ||
      selectedSubCategory2.length ||
      selectedSubCategory3.length
    ) {
      const payload = {
        brand: selectedBrand,
        subCategory: selectedCategory,
        subCategory1: selectedSubCategory1,
        subCategory2: selectedSubCategory2,
        subCategory3: selectedSubCategory3,
      };
      setProducts([]);
      setCount(0);
      setApplyFilter(true);
      setNextFilterUrl(BASE_FILTER_URL); // **reset every new run**
      fetchProductsWithFilter(payload, BASE_FILTER_URL);
    }
  };

  const clearFilters = () => {
    if (!applyFilter) return;
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
    setProducts([]);
    setCount(0);
    setApplyFilter(false);
    setNextUrl(BASE_LIST_URL);
    setNextFilterUrl(BASE_FILTER_URL);
    fetchProducts(BASE_LIST_URL);
  };

  /* ---------- navigation state ---------- */
  const [navValue, setNavValue] = useState(0);

  /* ======================== render ======================== */
  return (
    <Container>
      {/* ───────── header ───────── */}
      <HeadCon>
        <BottomNavigation
          value={navValue}
          onChange={(_, v) => setNavValue(v)}
          showLabels
          sx={{
            background: "#09193d",
            borderRadius: "20px",
            color: "#b2b2b2",
            "& .Mui-selected, .Mui-selected > svg": { color: "#fff700" },
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
            value={2}
            icon={<BackupTable />}
          />
        </BottomNavigation>

        <SearchCon bg="#f2f2f2" bor="#e0e0e0" col="#4f4f4f">
          <SearchAppBar
            search={searchQuery}
            onchange={handleSearchQueryChange}
          />
          <OutlineButton
            onClick={handleSearch}
            sx={{ ml: 1, color: "#fff700" }}
          >
            Search
          </OutlineButton>
        </SearchCon>

        <CartCont>
          <IconButton component={Link} to="/table" sx={{ color: "white" }}>
            <StyledBadge badgeContent={cartLen}>
              <BackupTable />
            </StyledBadge>
          </IconButton>
        </CartCont>
      </HeadCon>

      {/* ───────── body ───────── */}
      <ContainerWhole>
        {/* filters */}
        <FilterWrap>
          <Filter
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
            selectedSubCategory1={selectedSubCategory1}
            selectedSubCategory2={selectedSubCategory2}
            selectedSubCategory3={selectedSubCategory3}
            setSelectedBrand={setSelectedBrand}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubCategory1={setSelectedSubCategory1}
            setSelectedSubCategory2={setSelectedSubCategory2}
            setSelectedSubCategory3={setSelectedSubCategory3}
          />
          <StickyBottom>
            <PrimaryButton onClick={callFetchProductsWithFilter}>
              Apply Filter
            </PrimaryButton>
            <OutlineButton onClick={clearFilters}>Clear Filter</OutlineButton>
          </StickyBottom>
        </FilterWrap>

        {/* products */}
        <WrapperWhole>
          <WrapperHead>
            <WrapperTit>{searchQuery}</WrapperTit>
            <WrapperFlex>
              <WrapperNum>{count} Results</WrapperNum>

              {/*   ←────   “Header” input preserved   ────→ */}

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
                <SortText style={{ marginRight: 8 }}>Sort by price:</SortText>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select value={sortOrder} displayEmpty>
                    <MenuItem onClick={() => setSortOrder("desc")} value="desc">
                      High → Low
                    </MenuItem>
                    <MenuItem onClick={() => setSortOrder("asc")} value="asc">
                      Low → High
                    </MenuItem>
                  </Select>
                </FormControl>
              </Sort>
            </WrapperFlex>
          </WrapperHead>

          <Wrapper ref={scrollContainerRef}>
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} HeadName={headName} Prod={p} />
            ))}
            {loading && <div className="spinner">🔄 Loading more…</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!nextUrl && !loading && !applyFilter && (
              <p>✅ All products loaded.</p>
            )}
            {!nextFilterUrl && !loading && applyFilter && (
              <p>✅ All filtered products loaded.</p>
            )}
          </Wrapper>
        </WrapperWhole>
      </ContainerWhole>
      <FloatingSubCatFilter
        products={products} /* full list */
        /* main filter selections */
        selectedBrand={selectedBrand}
        selectedCategory={selectedCategory}
        selectedSubCategory1={selectedSubCategory1}
        selectedSubCategory2={selectedSubCategory2}
        selectedSubCategory3={selectedSubCategory3}
        /* sub-cat-4/5 selections */
        selectedSubSeven={selectedSubSeven}
        setSelectedSubSeven={setSelectedSubSeven}
        selectedSubEight={selectedSubEight}
        setSelectedSubEight={setSelectedSubEight}
      />
    </Container>
  );
}
