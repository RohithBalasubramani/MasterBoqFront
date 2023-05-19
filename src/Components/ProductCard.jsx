import { Add } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ADD } from '../Redux/actions/action'
  
 
const Container = styled.div`
padding:2vh;
width:16vw;
height:18vh;
border-radius: 8px;
background-color: rgba(7, 0, 103, 0.15);  
 backdrop-filter: blur(30px);
 -webkit-backdrop-filter: blur(30px);
display:block;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;



`

const Price = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 400;
line-height: 32px;
letter-spacing: 0em;
text-align: justified;
color: #5f5f5f;

`

const Title = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0em;
text-align: justified;
color: #000000;

`

const Box = styled.button`
/* background-color: #5e7f03; */
margin-right:0;
margin-left:85%;
width:min-content;
background-color: rgba(4, 0, 61, 0.30);  
 backdrop-filter: blur(30px);
 -webkit-backdrop-filter: blur(30px);
align-items:center;
border-radius:8px;
border-color: #ffffff;
color: #000000;
&:hover{
  background-color: rgba(7, 0, 103, 0.5);  
     /* color: #000000; */

}
`




const ProductCard = ({Prod}) => {

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

export default ProductCard
