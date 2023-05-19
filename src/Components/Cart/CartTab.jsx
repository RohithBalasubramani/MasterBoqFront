import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IconButton, Tab, Table, TableRow, TableCell, TableBody, TableHead, Input} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import cartgif from "../../Assets/cart.gif"

import { ReactComponent as DeleteIcon } from "../../Assets/DeleteIcon.svg"
import { DLT, ADD, REMOVE  } from '../../Redux/actions/action';

const Container=styled.div`
  margin: 3px;
  height: auto;
  width: 100%;
  background:#ffffff;
  border-radius: 8px;

`

const ProdName = styled.div`
font-family: Lexend;
font-size: 20px;
font-weight: 500;
line-height: 25px;
letter-spacing: 0em;
text-align: left;
padding-top: 2vh;
padding-bottom: 2vh;

`

const ProdContainer = styled.div`
margin-top: 0;
margin-bottom: 6%;
`

const Refno = styled.div`
font-family: Lexend;
font-size: 17px;
font-weight: 500;
line-height: 28px;
letter-spacing: 0em;
text-align: left;
color:#535353;
`

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
`

const Price = styled.div`
font-family: Lexend;
font-size: 16px;
font-weight: 700;
line-height: 28px;
letter-spacing: 0em;
text-align: right;
color: #00337C;

`

const CartlineQuant = styled.div`

font-family: Lexend;
font-size: 16px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
display: flex;
margin-bottom: 10vh;
color: #4F4F4F;
gap: 2vh;
`

const QuantBox = styled.div`
background: white;
border-radius: 3px;
border: 1px solid #4F4F4F;
width: 25px;
text-align: center;

`

const ImageCont = styled.div`
height: 40vh;
width: 20vw;
padding-top: 4.5vh;
padding-left: 3vw;
border: 1px solid #E0E0E0;
`

const Img = styled.img`
height:80%;

margin-left: auto;
  margin-right: auto;


`

const RFQButton = styled.button`
border: 1px solid #003171;
font-family: Lexend;
font-size: 14px;
font-weight: 500;
line-height: 32px;
letter-spacing: 0px;
text-align: left;
border-radius: 8px;
padding: 1vh;
padding-left: 3vh;
padding-right: 3vh;

`


const CartTab = () => {

    const [price,setPrice] = useState(0);
    // console.log(price);

    const getdata = useSelector((state)=> state.cartreducer.carts);
    // console.log(getdata);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dlt = (id)=>{
        dispatch(DLT(id))
    }

    const add = (id)=>{
        dispatch(ADD(id))
    }

    const rmv = (id)=>{
        dispatch(REMOVE(id))
    }

    
    const total = ()=>{
        let price = 0;
        getdata.map((ele,k)=>{
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };

    useEffect(()=>{
        total();
    },[total])



  return (


    <div>
        <Container>

                    {
                        getdata.length ? 
                        <div className='card_details' style={{width:"auto", borderRadius:"8px" }}>
                            <Table sx={{border:"2px solid grey", borderRadius:"8px"}}>
                            <TableHead sx={{fontWeight:"600",fontSize:"18px", border:"2px solid grey",backgroundColor:"#ff714a"}}>
                            <TableRow>
                            <TableCell sx={{width:"25vw", fontWeight:"600",fontSize:"18px"}}>Product Name</TableCell>
                            <TableCell sx={{fontWeight:"600",fontSize:"18px"}}  align="Left">Model Number</TableCell>
                            <TableCell sx={{fontWeight:"600",fontSize:"18px"}}  align="Left">Category</TableCell>

                            <TableCell align="Left"sx={{fontWeight:"600",fontSize:"18px"}}>Cat1</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat2</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat3</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Cat4</TableCell>

                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Brand</TableCell>
                            <TableCell align="Left"sx={{fontWeight:"600",fontSize:"18px"}}>Industry</TableCell>
                            <TableCell align="Left"sx={{ fontWeight:"600",fontSize:"18px"}}>Price</TableCell>

                            <TableCell sx={{fontWeight:"600",fontSize:"18px"}} align="Left">Delete</TableCell>
                                
                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {getdata.map((row) => (
                                <TableRow
                                key={row.rname}
                                sx={{  '&:last-child td, &:last-child th': { border: 0} }}
                                >

                                <TableCell component="th" scope="row"> 
                                    <ProdName> {row.ProductName}</ProdName>
                                </TableCell>


                                <TableCell align="left">
                                <Refno>{row.ModelNumber}</Refno> 
                                </TableCell>      

                                <TableCell align="left">
                                    <Refno>{row.Category}</Refno> 
                                </TableCell>    

                                
                                <TableCell align="left">
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
                                </TableCell>      

                                <TableCell align="left">
                                    <Refno>{row.Brand}</Refno> 
                                </TableCell>         

                                <TableCell align="left">
                                    <Refno>{row.Industry}</Refno> 
                                </TableCell>      
                                     
                                     
                                
                                                     
                               
                                
                                <TableCell align="left">

                                     
                                    <ProdPrice>
                                    <Price>₹ {row.Price} </Price>
                                    </ProdPrice> 
                                     </TableCell>

                                <TableCell align="left">
                                <IconButton sx={{color:"red",fontSize:20,cursor:"pointer", marginTop:"0%", marginBottom:"55%"}}  onClick={()=>dlt(row.id)}><DeleteIcon/> </IconButton>

                                </TableCell>      




                                </TableRow>
                            ))}

                            </TableBody>

  
                            </Table>
                        </div>:
                        
                   <div className='card_details d-flex justify-content-center align-items-center' style={{width:"90vw",padding:10,position:"relative",fontFamily: "Lexend"}}>
                    <i className='fas fa-close smallclose'
                    onClick={handleClose}
                     style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
                    <p style={{fontSize:22}}>Your table is empty</p>
                    <img src={cartgif} alt="" className='emptycart_img' style={{width:"5rem",padding:10}} />
                   </div>
                    }

      
                </Container>
      
    </div>
  )
}

export default CartTab
