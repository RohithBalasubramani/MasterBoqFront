import CartTab from "../Components/Cart/CartTab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RESET } from "../Redux/actions/action";
import { CSVLink } from "react-csv";
import { Alert, Backdrop, IconButton, Paper, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import Send from "../Components/Cart/Send";
import { exportDataToExcel } from "../Components/Cart/exportdataToExcel";

const Container = styled.div`
  height: max-content;
  width: 100%;
  background: #f9f9f9;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-family: Lexend;
  font-size: 6vh;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;

  text-transform: capitalize;
  color: #000000;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 2vh;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#09193D" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
    background-color: #09193d;
    color: #ffffff;
  }
`;

const TopButtonDiv = styled.div`
  margin-left: 60%;
  display: flex;
  gap: 3vh;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  width: 75%;
  margin-right: 3vh;
  /* margin-left:75vw; */
`;

const Infocont = styled.div`
  width: 95vw;
`;

const Button = styled.button`
  width: 100%;
  padding: 2vh;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  background-color: #09193d;
  color: #ffffff;
  font-weight: 600;
  margin-top: 1vh;
  &:hover {
    background-color: transparent;
    color: #09193d;
  }
`;

const Wrapper2 = styled.div`
  display: block;
  align-items: center;
  margin-right: 0%;
  margin-left: 96%;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const CartTab2 = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  const [formattedData, setFormattedData] = useState([]);
  // console.log(getdata);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [qua, setQua] = useState(1);

  const reset = () => {
    dispatch(RESET());
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleSB = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSB = (event, reason) => {
    setOpenSnackBar(false);
  };

  const total = () => {
    let Price = 0;
    getdata.map((ele, k) => {
      Price = ele.Price * ele.quantity + Price;
    });
    setPrice(Price);
  };

  const handleExport = () => {
    exportDataToExcel(getdata, "BOQ.xlsx");
  };

  useEffect(() => {
    total();
  }, [qua]);

  // const selectedKeys = ["Heading", "ProductName", "Brand", "Price", "quantity"];
  // const selectedData = selectedKeys.reduce((acc, key) => {
  //   acc[key] = getdata[key];
  //   return acc;
  // }, {});

  // console.log(selectedData);

  // Extracting only selected keys using object spread
  const selectedKeys = [
    "Heading",
    "ProductName",
    "Brand",
    "SubCategory",
    "ModelNumber",
    "Price",
    "quantity",
  ];
  const extractedData = getdata.map((item) => {
    const selectedData = {};
    selectedKeys.forEach((key) => (selectedData[key] = item[key]));
    return selectedData;
  });

  const multipliedData = extractedData.map((item) => {
    const totalPrice = parseFloat(item.Price) * item.quantity;
    return { ...item, totalPrice };
  });

  console.log(multipliedData);

  return (
    <Container>
      <Wrapper>
        <Title>TABLE({getdata.length})</Title>
        <Top>
          <Link to="/">
            <TopButton>ADD MORE</TopButton>
          </Link>

          <TopButtonDiv>
            <TopButton type="filled" onClick={handleToggle}>
              {" "}
              ADD TO GROUP{" "}
            </TopButton>

            <TopButton
              type="filled"
              onClick={() => {
                reset();
              }}
            >
              {" "}
              CLEAR CART{" "}
            </TopButton>
          </TopButtonDiv>
        </Top>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Paper
            sx={{
              width: "25%",
              height: "38%",
              alignItems: "center",
              padding: "5vh",
              paddingTop: "2vh",
              textAlign: "center",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.5em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ff8e038d",
                outline: "1px solid slategrey",
              },
            }}
          >
            <Wrapper2>
              <IconButton
                onClick={handleClose}
                sx={{
                  marginRight: "0",
                  marginLeft: "auto",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "rotate(90deg)", transition: "0.5s" },
                }}
              >
                <Close />
              </IconButton>
            </Wrapper2>

            <Send handleClose={handleClose} handleToggleSB={handleToggleSB} />
            <Snackbar
              open={openSnackBar}
              autoHideDuration={20000}
              onClose={handleCloseSB}
            >
              <Alert
                onClose={handleCloseSB}
                severity="success"
                sx={{ width: "100%" }}
              >
                Products have been added to a group
              </Alert>
            </Snackbar>
          </Paper>
        </Backdrop>

        <Bottom>
          <Info>
            <CartTab qua={qua} setqua={setQua} />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {Math.ceil(price)}</SummaryItemPrice>
            </SummaryItem>

            <Button onClick={handleExport}> EXPORT </Button>
          </Summary>
        </Bottom>

        <Infocont>
          <Info>
            <Button type="filled" onClick={handleExport}>
              {" "}
              EXPORT{" "}
            </Button>
          </Info>
        </Infocont>
      </Wrapper>
    </Container>
  );
};

export default CartTab2;
