import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyComponent from './Components/MyComp'
import ProductList from './Components/ProdListing';
import ProductListing from './Pages/ProductListing';
import Cart from './Components/Table';
import Groups from './Pages/Groups';
import Groups2 from './Pages/Groups2';

const App = () => {

  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/product/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/get-grouped-products/")
  //     .then(response => {
  //       setData(response.data);
  //       console.log(response.data);

  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);





  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductListing products={data}/>} />
      <Route path="/table" element={<Cart/>} />
      <Route path="/Groups" element={<Groups2/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App


