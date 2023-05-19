// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { Badge, Box, Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slider } from '@mui/material'
// import { styled as sty} from '@mui/material/styles';
// import ProductCard from '../Components/ProductCard';
// import SearchAppBar from '../Components/StyledSearch';
// import { BackupTable } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Container = styled.div`
// background-color: #ffffff;
// width: 98%;
// height: auto;
// color: #333333;


// `

// const Containerwhole = styled.div`
// display: flex;
// height: auto;
// width: 100%;
// `

// const FilterWrap = styled.div`
// flex: 5;
// height: 100vh;
// background: #ffffff;
// margin-left: 5vh;
// margin-right: 5vh;


// `

// const HeadCon = styled.div`
// background-color: #15375A;
// position: sticky;
// width: 100%;
// z-index: 100;
// padding:1vh;
// display:flex;
// `

// const SearchCon = styled.div`
// margin-left:15%;
// width: 70%;
// `
// const CartCont = styled.div`
// margin-left:auto;
// margin-right: 5%;
// margin-top:10px;
// `

// const Wrapper = styled.div`

//     width: 100%;
//     display: grid;
//     grid-template-columns: auto auto auto;
//     background-color: #ffffff;
//     grid-gap: 2vh;
//     padding: 2vh;
//     height: 90vh;
//     overflow-y: scroll;
//     /* padding-right: 5vh; */

// `

// const WrapperWhole = styled.div`
// background-color: #ffffff;
// display: block;
// border-left:1px solid #E0E0E0;
// flex: 8;

// `



// const WrapperHead = styled.div`
// background-color: #ffffff;
// width: 100%;
// padding-left: 2vh;
// border-bottom:1px solid #E0E0E0;
// `

// const FilterHead = styled.div`
// font-family: Lexend;
// font-size: 16px;
// font-weight: 500;
// line-height: 20px;
// letter-spacing: 0.045em;
// text-align: left;
// text-transform: uppercase;
// padding-top: 3vh;
// padding-bottom: 2vh;
// margin-top: 2vh;

// `

// const FilterCont = styled.label`
// font-family: Lexend;
// font-size: 12px;
// font-weight: 400;
// line-height: 15px;
// letter-spacing: 0em;
// text-align: left;
// display: block;

// `



// const WrapperTit = styled.div`
// font-family: Lexend;
// font-size: 48px;
// font-weight: 500;
// line-height: 60px;
// letter-spacing: 0em;
// text-align: left;

// `

// const WrapperNum = styled.div`
// font-family: Lexend;
// font-size: 12px;
// font-weight: 400;
// line-height: 15px;
// letter-spacing: 0.02em;
// text-align: left;
// `

// const WrapperFlex = styled.div`
// width: 100%;
// display: flex;
// vertical-align: middle;

// `

// const FilterFlex = styled.div`
// display:flex;
// width: 100%;
// `

// const StyledBadge = sty(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: -1,
    
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//     backgroundColor: '#5e7f03',
//     color:"#ffffff",
//   },
// }));




// const PriceWrap = styled.div`
// border-top: 1px solid #E0E0E0;
// border-bottom: 1px solid #E0E0E0;
// margin-top: 2vh;
// margin-bottom: 2vh;
// padding-bottom: 4vh;

// `

// const FilterOne = styled.div`
// flex:1;
// `



// const Groups = () => {

//   const [data, setData] = useState([]);

//     useEffect(() => {
//     axios.get("http://localhost:8000/api/get-grouped-products/")
//       .then(response => {
//         setData(response.data);
//         console.log(response.data);

//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);


  
// // Cart
//   const cart= useSelector(state =>state.cartreducer.carts)
//   let cartlen = cart.length
//   const [anchorEl, setAnchorEl] = useState(null);
//   const opencart = Boolean(anchorEl);


//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredGroup = data.filter((product) =>
//     product.ProductName.ProductName.includes(searchTerm.toLowerCase())
//   );



//   const [selectedBrands, setSelectedBrands] = useState([]);

//   // Brandcheckbox
//       function handleBrandCheckboxChange(event) {
//         const Brand = event.target.value;
//         if (event.target.checked) {
//           setSelectedBrands([...selectedBrands, Brand]);
//         } 
//         else {
//           setSelectedBrands(selectedBrands.filter(selectedBrand => selectedBrand !== Brand));
//         }
//       }


    
    
//       const allGroup = Array.from(new Set(data.map(product => product.GroupTitle)));

    
      
      

  
//       const count =filteredGroup.length;

//   return (
//     <Container>


//         <HeadCon>
//             <SearchCon>
//               <SearchAppBar search={searchTerm} onchange={(e) => setSearchTerm(e.target.value)}/>
//             </SearchCon>

//             <CartCont>
//               <IconButton component={Link} to="/table" sx={{color:"white"}}>
//               <StyledBadge badgeContent={cartlen}  
//                 id="basic-button"
//                 aria-controls={opencart ? 'basic-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={opencart ? 'true' : undefined}

//                 >
//                   <BackupTable/>
//                 </StyledBadge>

//               </IconButton>
              
//             </CartCont>
//         </HeadCon> 

        


//     <Containerwhole>

//     <FilterWrap>
//     <PriceWrap>
//     <FilterHead> BrandFilters</FilterHead>  

//       </PriceWrap>

//       <FilterFlex>
//         <FilterOne>
//         <FilterHead> Groups</FilterHead>
//         {allGroup.map(Brand => (
//         <FilterCont key={Brand}>
//         <Checkbox

//           type="checkbox"
//           value={Brand}
//           checked={selectedBrands.includes(Brand)}
//           onChange={event => handleBrandCheckboxChange(event)}
//           sx={{
//             color: "#E0E0E0",
//             '&.Mui-checked': {
//               color: "#ff6600",
//             },
//           }}
//         />
//         {Brand}
//       </FilterCont>
//       ))} 


//         </FilterOne>
        


          
//       </FilterFlex>
        

//     </FilterWrap>

//     <WrapperWhole>
//       <WrapperHead>
//       <WrapperTit>

//         </WrapperTit>
//         <WrapperTit>{searchTerm}</WrapperTit>
//         <WrapperFlex>
//         <WrapperNum>‘{count}’ Results</WrapperNum>

      
//        </WrapperFlex>
        

//       </WrapperHead>
//       <Wrapper>
//         {filteredGroup.map(product => (
//             <ProductCard Prod={product}/>
//         ))}
//         </Wrapper>
//       </WrapperWhole>




//     </Containerwhole>



//     </Container>
//   )
// }

// export default Groups
