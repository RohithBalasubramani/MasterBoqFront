import React from "react";
import styled from "styled-components";
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  IconButton,
  Button,
} from "@mui/material";
import { BackupTable, Category, Inventory } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { styled as sty } from "@mui/material/styles";
import SearchAppBar from "../StyledSearch";

/* ---------- styled bits (copied verbatim) ---------- */
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

/* ---------- component ---------- */
const Header = ({
  value,
  setValue,
  searchQuery,
  handleSearchQueryChange,
  handleSearch,
  cartlen,
  opencart,
}) => (
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
      onChange={(e, newVal) => setValue(newVal)}
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
      <SearchAppBar search={searchQuery} onchange={handleSearchQueryChange} />
    </SearchCon>

    <Button onClick={handleSearch}>Search</Button>

    <CartCont>
      <IconButton component={Link} to="/table" sx={{ color: "white" }}>
        <StyledBadge badgeContent={cartlen}>
          <BackupTable />
        </StyledBadge>
      </IconButton>
    </CartCont>
  </HeadCon>
);

export default Header;
