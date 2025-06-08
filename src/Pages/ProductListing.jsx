/*  src/Pages/ProductListing.jsx – complete component with server-side filters + client-side AND sub-filters + original styling  */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
  IconButton,
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

/* ───────────────────────── constants ───────────────────────── */

const BASE_LIST_URL = "https://www.boqmasteradmin.com/product/";
const BASE_FILTER_URL = "https://www.boqmasteradmin.com/product/filter/";

/* ───────────────────────── styled bits ───────────────────────── */

const Container = styled.div`
  background: #ffffff;
  width: 100%;
  color: #333333;
`;
const HeadCon = styled.div`
  background: #15375a;
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
  background: ${(p) => p.bg};
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
  background: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const PrimaryBtn = styled.button`
  background: #09193d;
  color: #fff700;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #0c204f;
  }
`;
const OutlineBtn = styled.button`
  background: transparent;
  color: #09193d;
  border: 2px solid #09193d;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-family: Lexend, sans-serif;
  font-weight: 500;
  transition: all 0.2s;
  &:hover {
    background: #09193d;
    color: #fff700;
  }
`;
const WrapperWhole = styled.div`
  flex: 8;
  background: #ffffff;
  border-left: 1px solid #e0e0e0;
`;
const WrapperHead = styled.div`
  padding-left: 2vh;
  border-bottom: 1px solid #e0e0e0;
`;
const WrapperFlex = styled.div`
  display: flex;
  width: 100%;
  padding: 2vh;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 2vh 2vh 5vh;
  height: 80vh;
  overflow-y: auto;
`;
const StyledBadge = sty(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "#fff700",
    color: "#000000",
  },
}));
const CustomNavAction = sty(BottomNavigationAction)`
  color: #ffffff;
  &.Mui-selected {
    color: #fff700;
  }
`;

/* ───────────────────────── component ───────────────────────── */
export default function ProductListing() {
  /* ── search ── */
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearch = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
    const url = `${BASE_LIST_URL}?search=${encodeURIComponent(
      searchQuery.trim()
    )}`;
    resetPagination();
    fetchProducts(url);
  };

  /* ── server-side filters ── */
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState([]);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState([]);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState([]);

  /* ── client-side sub-filters ── */
  const [selectedSubSeven, setSelectedSubSeven] = useState([]);
  const [selectedSubEight, setSelectedSubEight] = useState([]);
  const [selectedSubTen, setSelectedSubTen] = useState([]);
  const [selectedSubEleven, setSelectedSubEleven] = useState([]);

  /* ── list state ── */
  const [applyFilter, setApplyFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(BASE_LIST_URL);
  const [nextFilterUrl, setNextFilterUrl] = useState(BASE_FILTER_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverCount, setServerCount] = useState(0);
  const [headName, setHeadName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [navValue, setNavValue] = useState(0);

  const scrollRef = useRef(null);
  const cartLen = useSelector((s) => s.cartreducer.carts.length);

  /* ── helpers ── */
  const priceNum = (v) => (isNaN(parseFloat(v)) ? Infinity : parseFloat(v));

  /* ── fetchers ── */
  const fetchProducts = async (url = null) => {
    if ((!url && !nextUrl) || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.get(url || nextUrl);
      setProducts((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
      setServerCount(data.count);
    } catch {
      setError("Failed to load products, please retry.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsWithFilter = async (payload, url = null) => {
    if ((!url && !nextFilterUrl) || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post(url || nextFilterUrl, payload);
      setProducts((prev) => [...prev, ...data.results]);
      setNextFilterUrl(data.next);
      setServerCount(data.count);
    } catch {
      setError("Failed to load products, please retry.");
    } finally {
      setLoading(false);
    }
  };

  /* ── initial load ── */
  useEffect(() => {
    fetchProducts(BASE_LIST_URL);
  }, []);

  /* ── infinite scroll ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        applyFilter ? fetchProductsWithFilter(buildPayload()) : fetchProducts();
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [applyFilter, loading]);

  const buildPayload = () => ({
    brand: selectedBrand,
    subCategory: selectedCategory,
    subCategory1: selectedSubCategory1,
    subCategory2: selectedSubCategory2,
    subCategory3: selectedSubCategory3,
  });

  /* ── client-side sub-filter AND logic ── */
  const applySubFilters = (list) => {
    let out = list;
    if (selectedSubSeven.length)
      out = out.filter((p) => selectedSubSeven.includes(p.SubCategory7));
    if (selectedSubEight.length)
      out = out.filter((p) => selectedSubEight.includes(p.SubCategory8));
    if (selectedSubTen.length)
      out = out.filter((p) => selectedSubTen.includes(p.SubCategory10));
    if (selectedSubEleven.length)
      out = out.filter((p) => selectedSubEleven.includes(p.SubCategory11));
    return out;
  };

  /* ── derive list to render ── */
  const filteredLocal = applySubFilters(products);
  const sortedProducts = filteredLocal.sort((a, b) =>
    sortOrder === "asc"
      ? priceNum(a.Price) - priceNum(b.Price)
      : priceNum(b.Price) - priceNum(a.Price)
  );

  /* ── CTA handlers ── */
  const doServerFilter = () => {
    if (
      selectedBrand ||
      selectedCategory ||
      selectedSubCategory1.length ||
      selectedSubCategory2.length ||
      selectedSubCategory3.length
    ) {
      resetPagination();
      setApplyFilter(true);
      fetchProductsWithFilter(buildPayload(), BASE_FILTER_URL);
    }
  };

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);

    /* clear sub-filters */
    setSelectedSubSeven([]);
    setSelectedSubEight([]);
    setSelectedSubTen([]);
    setSelectedSubEleven([]);

    resetPagination();
    setApplyFilter(false);
    fetchProducts(BASE_LIST_URL);
  };

  const resetPagination = () => {
    setProducts([]);
    setServerCount(0);
    setNextUrl(BASE_LIST_URL);
    setNextFilterUrl(BASE_FILTER_URL);
  };

  /* ───────────────────────── render ───────────────────────── */
  return (
    <Container>
      {/* ───── header ───── */}
      <HeadCon>
        <BottomNavigation
          value={navValue}
          onChange={(_, v) => setNavValue(v)}
          showLabels
          sx={{
            background: "#09193d",
            borderRadius: 20,
            "& .Mui-selected , & .Mui-selected > svg": { color: "#fff700" },
          }}
        >
          <CustomNavAction
            component={Link}
            to="/"
            value={0}
            label="Home"
            icon={<Inventory />}
          />
          <CustomNavAction
            component={Link}
            to="/Groups"
            value={1}
            label="Groups"
            icon={<Category />}
          />
          <CustomNavAction
            component={Link}
            to="/auxiliaries"
            value={2}
            label="Auxiliaries"
            icon={<BackupTable />}
          />
        </BottomNavigation>

        <SearchCon bg="#f2f2f2" bor="#e0e0e0" col="#4f4f4f">
          <SearchAppBar search={searchQuery} onchange={onSearchChange} />
          <OutlineBtn onClick={handleSearch} style={{ marginLeft: 8 }}>
            Search
          </OutlineBtn>
        </SearchCon>

        <CartCont>
          <IconButton component={Link} to="/table" sx={{ color: "#fff" }}>
            <StyledBadge badgeContent={cartLen}>
              <BackupTable />
            </StyledBadge>
          </IconButton>
        </CartCont>
      </HeadCon>

      {/* ───── body ───── */}
      <ContainerWhole>
        {/* filter column */}
        <FilterWrap>
          <Filter
            url={"https://www.boqmasteradmin.com/product/meta_tree/"}
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
            <PrimaryBtn onClick={doServerFilter}>Apply Filter</PrimaryBtn>
            <OutlineBtn onClick={clearFilters}>Clear Filter</OutlineBtn>
          </StickyBottom>
        </FilterWrap>

        {/* product column */}
        <WrapperWhole>
          <WrapperHead>
            <WrapperFlex>
              <div style={{ fontFamily: "Lexend", fontSize: 14 }}>
                {filteredLocal.length} of {serverCount} Results
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ marginRight: 8, fontFamily: "Lexend", fontSize: 16 }}
                >
                  Sort by price:
                </div>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <MenuItem value="desc">High → Low</MenuItem>
                    <MenuItem value="asc">Low → High</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginLeft: 16 }}>
                <TextField
                  label="Header"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setHeadName(e.target.value)}
                />
              </div>
            </WrapperFlex>
          </WrapperHead>

          <Wrapper ref={scrollRef}>
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} HeadName={headName} Prod={p} />
            ))}

            {loading && <div style={{ padding: 8 }}>🔄 Loading…</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!nextUrl && !loading && !applyFilter && (
              <p>All products loaded.</p>
            )}
            {!nextFilterUrl && !loading && applyFilter && (
              <p>All filtered products loaded.</p>
            )}
          </Wrapper>
        </WrapperWhole>
      </ContainerWhole>

      {/* floating sub-filter panel */}
      <FloatingSubCatFilter
        products={products}
        selectedBrand={selectedBrand}
        selectedCategory={selectedCategory}
        selectedSubCategory1={selectedSubCategory1}
        selectedSubCategory2={selectedSubCategory2}
        selectedSubCategory3={selectedSubCategory3}
        selectedSubSeven={selectedSubSeven}
        setSelectedSubSeven={setSelectedSubSeven}
        selectedSubEight={selectedSubEight}
        setSelectedSubEight={setSelectedSubEight}
        selectedSubTen={selectedSubTen}
        setSelectedSubTen={setSelectedSubTen}
        selectedSubEleven={selectedSubEleven}
        setSelectedSubEleven={setSelectedSubEleven}
      />
    </Container>
  );
}
