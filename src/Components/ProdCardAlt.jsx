import { Add } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ADD } from '../Redux/actions/action'
  
 
const Container = styled.div`
background-color: #ffffff;
padding:2vh;
width:16vw;
height:18vh;
display:block;
border-radius: 8px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;



`

const Price = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 400;
line-height: 32px;
letter-spacing: 0em;
text-align: justified;
color: #4F4F4F;

`

const Title = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0em;
text-align: justified;

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




const ProductCardAlt = ({Prod}) => {

  const getdata = useSelector((state)=> state.cartreducer.carts);
  const dispatch = useDispatch();

  const send = (e)=>{
    // console.log(e);
    console.log(getdata)
    dispatch(ADD(e));

  }

  
  return (
    <Container>
      <Title>
        {Prod.ProductName}
      </Title>
      

      <Price>
       Rs. {Prod.Price}
      </Price>
        <Box onClick={()=> send(Prod)}>
          <Add/>
        </Box>
      
      
    </Container>
  )
}

export default ProductCardAlt
