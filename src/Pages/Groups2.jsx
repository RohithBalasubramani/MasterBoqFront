import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCardTwo from "../Components/ProdCardTwo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchAppBar from "../Components/StyledSearch";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  BackupTable,
  Category,
  CheckBox,
  Inventory,
} from "@mui/icons-material";
import { styled as sty } from "@mui/material/styles";
import { ADD } from "../Redux/actions/action";

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
  flex: 1.15;
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
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #ffffff;
  grid-gap: 2vh;
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
  font-size: 22px;
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
  font-size: 15px;
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

const PriceWrap = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding-bottom: 4vh;
`;

const FilterOne = styled.div`
  flex: 1;
`;

const Sort = styled.div`
  margin-left: auto;
  margin-right: 1.5%;
  display: flex;
  margin-top: auto;
  margin-bottom: 0;
`;

const Groups2 = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://www.boqmasteradmin.com/api/get-grouped-products/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const allGroup = Array.from(
    new Set(data.map((product) => product.GroupTitle))
  );

  const filteredGroup = data.filter((item) =>
    item.GroupTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cart = useSelector((state) => state.cartreducer.carts);
  let cartlen = cart.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const opencart = Boolean(anchorEl);

  const [selectedGroup, setSelectedGroup] = useState([]);

  // Brandcheckbox
  function handleGroupCheckboxChange(event) {
    const GroupTitle = event.target.value;
    if (event.target.checked) {
      setSelectedGroup([...selectedGroup, GroupTitle]);
    } else {
      setSelectedGroup(
        selectedGroup.filter((selectedGroup) => selectedGroup !== GroupTitle)
      );
    }
  }

  const filteredGroups = filteredGroup.filter((product) => {
    if (selectedGroup.length === 0) {
      return true;
    } else {
      return selectedGroup.includes(product.GroupTitle);
    }
  });

  const count = filteredGroups.length;

  const dispatch = useDispatch();

  const handleGroupSend = () => {
    filteredGroups.forEach((product) => {
      const updatedproduct = product.ProductName;
      // console.log(updatedproduct);
      dispatch(ADD(updatedproduct));
    });
  };

  const [value, setValue] = React.useState(1);

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
          <SearchAppBar
            search={searchTerm}
            onchange={(e) => setSearchTerm(e.target.value)}
          />
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
            <FilterHead> Groups</FilterHead>
          </PriceWrap>

          <FilterFlex>
            <FilterOne>
              {allGroup.map((GroupTitle) => (
                <FilterCont key={GroupTitle}>
                  <Checkbox
                    type="checkbox"
                    value={GroupTitle}
                    checked={selectedGroup.includes(GroupTitle)}
                    onChange={(event) => handleGroupCheckboxChange(event)}
                    sx={{
                      color: "#E0E0E0",
                      "&.Mui-checked": {
                        color: "#ff6600",
                      },
                    }}
                  />
                  {GroupTitle}
                </FilterCont>
              ))}
            </FilterOne>
          </FilterFlex>
        </FilterWrap>

        <WrapperWhole>
          <WrapperHead>
            <WrapperTit></WrapperTit>
            <WrapperTit>{searchTerm}</WrapperTit>
            <WrapperFlex>
              <WrapperNum>‘{count}’ Results</WrapperNum>

              <Sort>
                <Button
                  variant="outlined"
                  sx={{ margin: "2vh" }}
                  onClick={handleGroupSend}
                >
                  {" "}
                  ADD ALL
                </Button>
              </Sort>
            </WrapperFlex>
          </WrapperHead>
          <Wrapper>
            {filteredGroups.map((item) => (
              <ProductCardTwo key={item.id} Prod={item} />
            ))}
          </Wrapper>
        </WrapperWhole>
      </Containerwhole>
    </Container>
  );
};

export default Groups2;
