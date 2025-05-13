import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const Cont = styled("div")`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.col};
  border-radius: 8px;
  height: auto;
  width: auto;
`;

const IconWrap = styled("div")`
  color: #4f4f4f;
  margin-top: 10px;
  margin-bottom: auto;
`;

const Search = styled("div")(({ theme }) => ({
  fonrFamily: "Lexend",
  display: "flex",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "32px",
  /* identical to box height, or 267% */
  borderRadius: "8px",
  letterSpacing: "0.4px",

  position: "relative",
  color: "inherit",
  // height:"5vh",
  border: "0px",
  backgroundColor: "inherit",
  fontWeight: "400",
  "&:hover": {
    fontWeight: "600",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      "&:focus": {
        width: "36ch",
        backgroundColor: "#ffffff19",
        borderRadius: "20px",
      },
    },
  },
}));

export default function SearchAppBar({ search, onchange }) {
  return (
    <Cont bg="#F2F2F2" col="#4F4F4F">
      <Search>
        <IconWrap>
          <SearchIcon />
        </IconWrap>

        <StyledInputBase
          placeholder="Search Products, Brands, ..."
          inputProps={{ "aria-label": "search" }}
          onChange={onchange}
          value={search}
          width="100%"
        />
      </Search>
    </Cont>
  );
}
