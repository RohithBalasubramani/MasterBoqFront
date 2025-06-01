import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductCard from "../Components/ProductCard"; // Adjust the path if necessary
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Badge,
  BottomNavigationAction,
  BottomNavigation,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { styled as sty } from "@mui/material/styles";
import { BackupTable, Category, Inventory } from "@mui/icons-material";
import axios from "axios";
import SearchAppBar from "../Components/StyledSearch";
import AuxCard from "../Components/AuxCard";
import Filter from "../Components/Filters/Filter";

const Container = styled.div`
  background-color: #ffffff;
  height: auto;
  color: #333333;
`;

const HeadCon = styled.div`
  background-color: #15375a;
  position: sticky;
  padding: 1vh;
  z-index: 100;
  display: flex;
  align-items: center;
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

const WrapperWhole = styled.div`
  background-color: #ffffff;
  display: block;
  border-left: 1px solid #e0e0e0;
  padding: 2vh;
  flex: 3;
`;

const WrapperHead = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 2vh;
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  flex-wrap: wrap;
  gap: 2vh;
  height: 64vh;
  overflow-y: auto;
`;

const Containerwhole = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

const WrapperTit = styled.h1`
  font-family: Lexend;
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const WrapperNum = styled.div`
  font-family: Lexend;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
`;

const FilterSection = styled.div`
  height: 90vh;
  margin: 0 5vh;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NameInput = styled.div`
  display: flex;
  flex-direction: row-reverse;
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

const AUX_LIST_URL = "https://www.boqmasteradmin.com/auxiliaries/";
const AUX_FILTER_URL = "https://www.boqmasteradmin.com/auxiliaries/filter/";

const AuxiliaryListing = () => {
  const cart = useSelector((state) => state.cartreducer.carts);
  const cartlen = cart.length;
  const [auxiliaries, setAuxiliaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(2);
  // const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubCategory6, setSelectedSubCategory6] = useState([]);
  // const [selectedSubCategory3, setSelectedSubCategory3] = useState([]);
  const [selectedSubCategory5, setSelectedSubCategory5] = useState([]);
  const [headName, setHeadName] = useState("");
  const scrollRef = useRef(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [nextFilterUrl, setNextFilterUrl] = useState(AUX_FILTER_URL);
  const [applyFilter, setApplyFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState([]);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState([]);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState([]);

  const fetchAuxiliaries = async (url = null) => {
    if ((!url && !nextUrl) || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.get(url || nextUrl);
      setNextUrl(data.next);
      setAuxiliaries((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error("Error fetching auxiliaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuxiliariesWithFilter = async (payload, url = null) => {
    if ((!url && !nextFilterUrl) || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post(url || nextFilterUrl, payload);
      setAuxiliaries((prev) => [...prev, ...data.results]);
      setNextFilterUrl(data.next);
      //setServerCount(data.count);
    } catch {
      setError("Failed to load Auxiliaries, please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        applyFilter ? fetchAuxiliariesWithFilter(buildPayload()) : fetchAuxiliaries();
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [applyFilter, loading]);

  useEffect(() => {
    fetchAuxiliaries(AUX_LIST_URL);
  }, []);

  // Handle changes in filters
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleSubCategory6Change = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedSubCategory6([...selectedSubCategory6, value]);
    } else {
      setSelectedSubCategory6(
        selectedSubCategory6.filter((item) => item !== value)
      );
    }
  };

  const handleSubCategory3Change = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedSubCategory3([...selectedSubCategory3, value]);
    } else {
      setSelectedSubCategory3(
        selectedSubCategory3.filter((item) => item !== value)
      );
    }
  };

  const handleSubCategory5Change = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedSubCategory5([...selectedSubCategory5, value]);
    } else {
      setSelectedSubCategory5(
        selectedSubCategory5.filter((item) => item !== value)
      );
    }
  };

  // Extract unique values for dropdown and checkboxes
  const allBrands = Array.from(
    new Set(auxiliaries.map((aux) => aux.Brand))
  ).filter(Boolean);
  const allSubCategory6 = Array.from(
    new Set(
      auxiliaries
        .map((aux) => aux.SubCategory6 && aux.SubCategory6.split(","))
        .flat()
        .filter(Boolean)
        .map((value) => value.trim())
    )
  );
  const allSubCategory3 = Array.from(
    new Set(
      auxiliaries
        .map((aux) => aux.SubCategory3 && aux.SubCategory3.split(","))
        .flat()
        .filter(Boolean)
        .map((value) => value.trim())
    )
  );
  const allSubCategory5 = Array.from(
    new Set(
      auxiliaries
        .map((aux) => aux.SubCategory5 && aux.SubCategory5.split(","))
        .flat()
        .filter(Boolean)
        .map((value) => value.trim())
    )
  );

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

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  // Filtering logic
  // const filteredAuxiliaries = auxiliaries.filter((auxiliary) => {
  //   const matchesBrand = !selectedBrand || auxiliary.Brand === selectedBrand;

  //   const matchesSubCategory6 =
  //     selectedSubCategory6.length === 0 ||
  //     selectedSubCategory6.some((value) =>
  //       auxiliary.SubCategory6.split(",")
  //         .map((v) => v.trim())
  //         .includes(value)
  //     );

  //   const matchesSubCategory3 =
  //     selectedSubCategory3.length === 0 ||
  //     selectedSubCategory3.some((value) =>
  //       (auxiliary.SubCategory3 || "")
  //         .split(",")
  //         .map((v) => v.trim())
  //         .includes(value)
  //     );

  //   const matchesSubCategory5 =
  //     selectedSubCategory5.length === 0 ||
  //     selectedSubCategory5.some((value) =>
  //       (auxiliary.SubCategory5 || "")
  //         .split(",")
  //         .map((v) => v.trim())
  //         .includes(value)
  //     );

  //   return (
  //     matchesBrand &&
  //     matchesSubCategory6 &&
  //     matchesSubCategory3 &&
  //     matchesSubCategory5
  //   );
  // });

  const count = auxiliaries.length;

  const buildPayload = () => ({
    brand: selectedBrand,
    subCategory: selectedCategory,
    subCategory1: selectedSubCategory1,
    subCategory2: selectedSubCategory2,
    subCategory3: selectedSubCategory3,
  });

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);

    resetPagination();
    setApplyFilter(false);
    fetchAuxiliaries(AUX_LIST_URL);
  };

  const resetPagination = () => {
    setAuxiliaries([]);
    //setServerCount(0);
    setNextUrl(AUX_LIST_URL);
    setNextFilterUrl(AUX_FILTER_URL);
  };

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
      fetchAuxiliariesWithFilter(buildPayload(), AUX_FILTER_URL);
    }
  };

  const handleSearch = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubCategory1([]);
    setSelectedSubCategory2([]);
    setSelectedSubCategory3([]);
    const url = `${AUX_LIST_URL}?search=${encodeURIComponent(
      searchTerm.trim()
    )}`;
    resetPagination();
    fetchAuxiliaries(url);
  }

  return (
    <Container>
      {/* Header */}
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
            icon={<Inventory />}
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/Groups"
            label="Groups"
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

        <SearchCon bg="#f2f2f2" bor="#e0e0e0" col="#4f4f4f">
          <SearchAppBar search={searchTerm} onchange={handleSearchChange} />
          <OutlineBtn onClick={handleSearch} style={{ marginLeft: 8 }}>
            Search
          </OutlineBtn>
        </SearchCon>

        <CartCont>
          <IconButton component={Link} to="/table" sx={{ color: "white" }}>
            <StyledBadge badgeContent={cartlen}>
              <BackupTable />
            </StyledBadge>
          </IconButton>
        </CartCont>
      </HeadCon>

      <Containerwhole>
        {/* Filters */}
        <FilterSection>
          {/* <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedBrand}
              onChange={handleBrandChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Brands</em>
              </MenuItem>
              {allBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ display: "flex", gap: "2vh" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "60vh",
                overflowY: "scroll",
                borderRadius: "8px",
                padding: "2vh",
                border: "1px solid #8d8d8d",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(240, 240, 240, 0.5)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(7, 0, 103, 0.6)",
                  borderRadius: "10px",
                  border: "2px solid rgba(240, 240, 240, 0.5)",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "rgba(7, 0, 103, 0.8)",
                },
              }}
            >
              Type
              {allSubCategory6.map((subCat) => (
                <FormControlLabel
                  key={subCat}
                  control={
                    <Checkbox
                      value={subCat}
                      checked={selectedSubCategory6.includes(subCat)}
                      onChange={handleSubCategory6Change}
                    />
                  }
                  label={subCat}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              Amps
              {allSubCategory5.map((subCat) => (
                <FormControlLabel
                  key={subCat}
                  control={
                    <Checkbox
                      value={subCat}
                      checked={selectedSubCategory5.includes(subCat)}
                      onChange={handleSubCategory5Change}
                    />
                  }
                  label={subCat}
                />
              ))}
            </Box>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "8px",
              padding: "2vh",
              border: "1px solid #8d8d8d",
            }}
          >
            Poles
            {allSubCategory3.map((subCat) => (
              <FormControlLabel
                key={subCat}
                control={
                  <Checkbox
                    value={subCat}
                    checked={selectedSubCategory3.includes(subCat)}
                    onChange={handleSubCategory3Change}
                  />
                }
                label={subCat}
              />
            ))}
          </Box> */}
          <Filter
            url={"https://www.boqmasteradmin.com/auxiliaries/meta_tree/"}
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
        </FilterSection>

        {/* Main Content */}
        <WrapperWhole>
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

          <WrapperHead>
            <WrapperTit>{searchTerm}</WrapperTit>
            <WrapperNum>{count} Results</WrapperNum>
          </WrapperHead>
          <Wrapper ref={scrollRef}>
            {auxiliaries.length > 0 ? (
              auxiliaries.map((auxiliary) => (
                <AuxCard key={auxiliary.id} Prod={auxiliary} />
              ))
            ) : (
              <div>No auxiliaries found for the given search criteria.</div>
            )}
          </Wrapper>
        </WrapperWhole>
      </Containerwhole>
    </Container>
  );
};

export default AuxiliaryListing;
