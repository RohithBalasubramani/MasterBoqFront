import React from "react";
import styled from "styled-components";
import CartTab2 from "../Pages/CartTab2";

/* centre card on grey background */
const Page = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  padding: 4vh 2vw;
  box-sizing: border-box;
`;
const Card = styled.div`
  width: 100%;
  max-width: 1440px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
`;

const Cart = () => (
  <Page>
    <Card>
      <CartTab2 />
    </Card>
  </Page>
);

export default Cart;
