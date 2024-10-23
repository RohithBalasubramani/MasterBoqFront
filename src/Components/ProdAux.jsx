import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard"; // Assuming you have a ProductCard component

const ProductAuxiliaries = ({ selectedProduct }) => {
  const [auxiliaries, setAuxiliaries] = useState([]);
  const [filteredAuxiliaries, setFilteredAuxiliaries] = useState([]);

  useEffect(() => {
    // Fetch the auxiliaries from your API endpoint
    fetch("/ProductAuxiliaries") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setAuxiliaries(data);
      })
      .catch((error) => {
        console.error("Error fetching auxiliaries:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProduct && auxiliaries.length > 0) {
      // Filter auxiliaries based on the matching criteria
      const filtered = auxiliaries.filter((auxiliary) => {
        // Split auxiliary's SubCategory6 into an array
        const auxSubCat6Values = auxiliary.SubCategory6
          ? auxiliary.SubCategory6.split(",").map((value) => value.trim())
          : [];

        // Check if auxiliary's SubCategory6 contains the product's SubCategory8
        const matchSubCat6 = auxSubCat6Values.includes(
          selectedProduct.SubCategory8
        );

        if (!matchSubCat6) {
          return false;
        }

        // Initialize matches as true
        let matchSubCat3 = true;
        let matchSubCat5 = true;

        // If auxiliary's SubCategory3 is present, it must match product's SubCategory4
        if (auxiliary.SubCategory3) {
          const auxSubCat3Values = auxiliary.SubCategory3.split(",").map(
            (value) => value.trim()
          );
          matchSubCat3 = auxSubCat3Values.includes(
            selectedProduct.SubCategory4
          );
        }

        // If auxiliary's SubCategory5 is present, it must match product's SubCategory7
        if (auxiliary.SubCategory5) {
          const auxSubCat5Values = auxiliary.SubCategory5.split(",").map(
            (value) => value.trim()
          );
          matchSubCat5 = auxSubCat5Values.includes(
            selectedProduct.SubCategory3
          );
        }

        // Return true only if all conditions are met
        return matchSubCat3 && matchSubCat5;
      });

      setFilteredAuxiliaries(filtered);
    }
  }, [selectedProduct, auxiliaries]);

  return (
    <div>
      <h2>Auxiliaries for {selectedProduct.ProductName}</h2>
      {filteredAuxiliaries.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredAuxiliaries.map((auxiliary) => (
            <ProductCard key={auxiliary.id} Prod={auxiliary} />
          ))}
        </div>
      ) : (
        <p>No auxiliaries found for this product.</p>
      )}
    </div>
  );
};

export default ProductAuxiliaries;
