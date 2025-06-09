import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing.jsx";
import Cart from "./Components/Table";
import Groups2 from "./Pages/Groups2";
import AuxiliaryListing from "./Pages/Auxiliaries";
import DashboardPage from "./Pages/DashboardPage";

const App = () => {
  // const fetchProducts = useCallback(async () => {
  //   if (!nextUrl || loading) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get(nextUrl);
  //     const data = response.data;

  //     setData((prev) => [...prev, ...data.results]);
  //     let url = data.next;
  //     setNextUrl(url);
  //     setCount(data.count);
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     setError("Failed to load products. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [nextUrl, loading]);

  // const fetchProductsWithFilter = async (payload) => {
  //   if (!nextFilterUrl || loading) return;

  //   setLoading(true);
  //   setError(null);

  //   try {

  //     const response = await axios.post(nextFilterUrl, payload);
  //     const data = response.data;

  //     setData((prev) => [...prev, ...data.results]);
  //     let url = data.next;
  //     setNextFilterUrl(url);
  //     setCount(data.count);
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //     setError("Failed to load products. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProductListing
            // products={data}
            // count={count}
            // fetchProducts={fetchProducts}
            // loading={loading}
            // error={error}
            // nextUrl={nextUrl}
            // setNextUrl={setNextUrl}
            // setNextFilterUrl={setNextFilterUrl}
            // setData={setData}
            // fetchProductsWithFilter={fetchProductsWithFilter}
            />
          }
        />
        <Route path="/table" element={<Cart />} />
        <Route path="/Groups" element={<Groups2 />} />
        <Route path="/auxiliaries" element={<AuxiliaryListing />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
