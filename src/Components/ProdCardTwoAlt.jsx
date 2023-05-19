import { Add } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ADD } from '../Redux/actions/action'
  
 
const Container = styled.div`
background-color: #ffffff;
padding:2vh;
width:23.5vw;
height:20vh;
display:block;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;



`

const Price = styled.div`
font-size: medium;


`

const Box = styled.button`
background-color: #5e7f03;
margin-right:0;
margin-left:85%;
width:min-content;
align-items:center;
border-radius:8px;
color: #ffffff;
&:hover{
  background-color: #000000; 
     color: #ffffff;

}
`

const Title = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0em;
text-align: justified;
width: 80%;

`




const ProductCardTwo = ({Prod}) => {

  const getdata = useSelector((state)=> state.cartreducer.carts);
  const dispatch = useDispatch();

  const send = (e)=>{
    // console.log(e);
    // console.log(getdata)
    dispatch(ADD(e));

  }

  const ProductName = {};

  for (const [key, value] of Object.entries(Prod)) {
    ProductName[key] = value.ProductName;
  }

  return (
    <Container>
        <h3>{Prod.GroupTitle}</h3>
      
      <Title>
      {Prod.ProductName.ProductName}
      </Title>
      <Box onClick={()=> send(Prod.ProductName)}>
          <Add/>
        </Box>

      
      
    </Container>
  )
}

export default ProductCardTwo
