import { Add } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ADD } from "../Redux/actions/action";

const Container = styled.div`
  padding: 0vh;
  width: 95%;
  margin-bottom: 1.5vh;
  display: inline-flex;
  flex-wrap: wrap;

  border-radius: 8px;
  background-color: rgba(7, 0, 103, 0.15);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Price = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: justified;
  color: #5f5f5f;
  margin-top: auto;
  margin-bottom: auto;
`;

const Title = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  margin-top: auto;
  margin-bottom: auto;
  width: 75%;

  letter-spacing: 0em;
  text-align: justified;
  color: #000000;
`;

const Box = styled.button`
  /* background-color: #5e7f03; */
  margin-right: 3%;
  margin-left: 3%;
  margin: 1vh;
  width: min-content;

  background-color: rgba(4, 0, 61, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  align-items: center;
  border-radius: 8px;
  border-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: rgba(7, 0, 103, 0.5);
    /* color: #000000; */
  }
`;

const ProductCard = ({ Prod, HeadName }) => {
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();

  const send = (e) => {
    // console.log(e);
    // console.log(getdata);
    dispatch(ADD(e));
  };

  const prodWithKey = {
    ...Prod,
    Heading: HeadName, // Replace 'CommonValue' with your desired value
    quantity: 1,
  };

  // console.log(prodWithKey);

  return (
    <Container>
      <Box onClick={() => send(prodWithKey)}>
        <Add />
      </Box>
      <Title>{prodWithKey.ProductName}</Title>

      <Price>(Rs. {prodWithKey.Price})</Price>
    </Container>
  );
};

export default ProductCard;
