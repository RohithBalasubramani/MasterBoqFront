import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import cartgif from "../../Assets/cart.gif";

import { ReactComponent as DeleteIcon } from "../../Assets/DeleteIcon.svg";
import { DLT, REMOVE, ADDMORE } from "../../Redux/actions/action";

const Container = styled.div`
  margin: 3px;
  height: auto;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
`;

const ProdName = styled.div`
  font-family: Lexend;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

const Refno = styled.div`
  font-family: Lexend;
  font-size: 17px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: #535353;
`;

const ProdPrice = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  width: max-content;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: right;
  color: #333333;
  display: flex;
  background-color: #ffffff;
`;

const Price = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: right;
  color: #00337c;
`;

const Quant = styled.div`
  display: flex;
  outline-color: black;
  width: 10vw;
`;

const QuantVal = styled.div`
  width: 40%;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  text-align: center;
  vertical-align: middle;
  padding-top: 5%;
`;

const ValueButtonDecrease = styled.button`
  display: inline-block;
  border: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  padding: 11px 0;
  background: #eee;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: -4px;
  border-radius: 8px 0 0 8px;

  &:hover {
    cursor: pointer;
  }
`;

const ValueButtonIncrease = styled.button`
  display: inline-block;
  border: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  padding: 11px 0;
  background: #eee;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: -4px;
  border-radius: 0 8px 8px 0;

  &:hover {
    cursor: pointer;
  }
`;

const CartTab = () => {
  const [price, setPrice] = useState(0);
  const [qua, setQua] = useState(1);

  // console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);
  const [data, setdata] = useState(getdata);
  // console.log(data);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const add = (id) => {
    dispatch(ADDMORE(id));
  };

  const rmv = (id) => {
    dispatch(REMOVE(id));
  };

  // const addone

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {}, [qua]);

  localStorage.setItem("carts", JSON.stringify(data));

  return (
    <div>
      <Container>
        {getdata.length ? (
          <div
            className="card_details"
            style={{ width: "auto", borderRadius: "8px" }}
          >
            <Table sx={{ border: "2px solid grey", borderRadius: "8px" }}>
              <TableHead
                sx={{
                  fontWeight: "600",
                  fontSize: "18px",
                  border: "2px solid grey",
                  backgroundColor: "#ff714a",
                }}
              >
                <TableRow>
                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Heading
                  </TableCell>
                  <TableCell
                    sx={{ width: "25vw", fontWeight: "600", fontSize: "18px" }}
                  >
                    Product Name
                  </TableCell>
                  {/* <TableCell sx={{fontWeight:"600",fontSize:"18px"}}  align="Left">Model Number</TableCell>
                            <TableCell sx={{fontWeight:"600",fontSize:"18px"}}  align="Left">Category</TableCell>

                            <TableCell align="Left"sx={{fontWeight:"600",fontSize:"18px"}}>Cat1</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat2</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat3</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat4</TableCell> */}

                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Model Number
                  </TableCell>
                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Category
                  </TableCell>
                  {/* <TableCell align="Left"sx={{fontWeight:"600",fontSize:"18px"}}>Industry</TableCell> */}
                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    align="Left"
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Quantity
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                    align="right"
                  >
                    Total Price
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                    align="Left"
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.rname}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Refno>{row.Heading}</Refno>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <ProdName> {row.ProductName}</ProdName>
                    </TableCell>

                    {/* <TableCell align="left">
                                <Refno>{row.ModelNumber}</Refno> 
                                </TableCell>       */}
                    {/* 
                                <TableCell align="left">
                                    <Refno>{row.Category}</Refno> 
                                </TableCell>     */}

                    {/* <TableCell align="left">
                                    <Refno>{row.SubCategory}</Refno> 
                                </TableCell>         

                                
                                <TableCell align="left">
                                    <Refno>{row.SubCategory2}</Refno> 
                                </TableCell>         


                                
                                <TableCell align="left">
                                    <Refno>{row.SubCategory3}</Refno> 
                                </TableCell>         

                                <TableCell align="left">
                                    <Refno>{row.SubCategory4}</Refno> 
                                </TableCell>       */}

                    <TableCell align="left">
                      <Refno>{row.Brand}</Refno>
                    </TableCell>

                    <TableCell align="left">
                      <Refno>{row.ModelNumber}</Refno>
                    </TableCell>

                    <TableCell align="left">
                      <Refno>{row.SubCategory}</Refno>
                    </TableCell>

                    {/* <TableCell align="left">
                                    <Refno>{row.Industry}</Refno> 
                                </TableCell>       */}

                    <TableCell align="left">
                      <ProdPrice>
                        <Price>₹ {row.Price} </Price>
                      </ProdPrice>
                    </TableCell>

                    <TableCell align="right">
                      <Quant>
                        <ValueButtonDecrease
                          onClick={() => {
                            row.quantity = row.quantity - 1;
                            setQua(row.quantity);
                          }}
                        >
                          -
                        </ValueButtonDecrease>
                        <QuantVal>{row.quantity}</QuantVal>
                        <ValueButtonIncrease
                          onClick={() => {
                            row.quantity = row.quantity + 1;
                            setQua(row.quantity);
                          }}
                        >
                          +
                        </ValueButtonIncrease>
                      </Quant>
                    </TableCell>

                    <TableCell align="right">
                      <ProdPrice>
                        <Price>₹ {Math.ceil(row.Price * row.quantity)}</Price>
                      </ProdPrice>
                    </TableCell>

                    <TableCell align="left">
                      <IconButton
                        sx={{
                          color: "red",
                          fontSize: 20,
                          cursor: "pointer",
                          marginTop: "0%",
                          marginBottom: "55%",
                        }}
                        onClick={() => dlt(row.id)}
                      >
                        <DeleteIcon />{" "}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div
            className="card_details d-flex justify-content-center align-items-center"
            style={{
              width: "90vw",
              padding: 10,
              position: "relative",
              fontFamily: "Lexend",
            }}
          >
            <i
              className="fas fa-close smallclose"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            ></i>
            <p style={{ fontSize: 22 }}>Your table is empty</p>
            <img
              src={cartgif}
              alt=""
              className="emptycart_img"
              style={{ width: "5rem", padding: 10 }}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartTab;
