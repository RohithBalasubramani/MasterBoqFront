import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
  
 
 
const Container = styled.div`
gap: 5vh;
`

const FilterHead = styled.div`
font-family: Lexend;
font-size: 30px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0.045em;
text-align: left;
text-transform: uppercase;
padding-top: 3vh;
padding-bottom: 2vh;
margin-top: 2vh;
margin-bottom: 3vh;
margin-left: 17%;

`

const Send = (props) => {

    const [GroupName, setGroupName] = useState();

    const getdata = useSelector((state)=> state.cartreducer.carts);
      const serializedGroupedProducts = getdata.map(getdata => ({
        ...getdata,
        GroupTitle:GroupName,
      }));

      const selectedProducts = serializedGroupedProducts.map(({ id, GroupTitle }) => ({ ProductName: id, GroupTitle }));


      console.log(selectedProducts);


      const handlepost = () => {
        props.handleToggleSB();
        
        axios.post('http://www.boqmasteradmin.com/api/grouped-products/', selectedProducts)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
        
        props.handleClose();

      };

      const handleChange = (event) => {
        setGroupName(event.target.value);
      }



  return (
    <Container>
        <FilterHead>Group Name</FilterHead>
        <TextField fullWidth onChange={handleChange}></TextField>
        <Button sx={{color:"white",background:"#09193D",marginTop:"2vh", height:"8vh",fontSize:"3vh", padding:"2vh", paddingLeft:"5vh", paddingRight:"5vh","&:hover":{color:"#white",background:"#11224a"}}} onClick={handlepost} >Save</Button>

    </Container>
  )
}

export default Send
