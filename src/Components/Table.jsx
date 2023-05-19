import React from 'react'
import CartTab2 from '../Pages/CartTab2';
import styled from 'styled-components'


const Container = styled.div`
background:#F9F9F9;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;

  display: flex;
  margin: 0;
  height: 100%;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  flex: 1;
  margin: 3px;
  position: relative;
  position: relative;
  border-left: 10vh;
  border-right: auto;


`;

const Cart = () => {
  return (
    <>
    <Container>

    <CartTab2/>
    </Container>
      
    </>
  )
}

export default Cart
