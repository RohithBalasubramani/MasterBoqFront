import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ADD } from "../Redux/actions/action";
import axios from "axios"; // Import axios for API calls

const Container = styled.div`
  padding: 0vh;
  width: 95%;
  margin-bottom: 1.5vh;
  display: inline-flex;
  flex-wrap: wrap;

  border-radius: 8px;
  background-color: rgba(240, 240, 0, 0.421);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Price = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: justified;
  color: #5f5f5f;
  margin-top: auto;
  margin-bottom: auto;
`;

const Title = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  margin-top: auto;
  margin-bottom: auto;
  width: 75%;

  letter-spacing: 0em;
  text-align: justified;
  color: #000000;
`;

const Box = styled.button`
  margin-right: 3%;
  margin-left: 3%;
  margin: 1vh;
  width: min-content;

  background-color: rgba(4, 0, 61, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  align-items: center;
  border-radius: 8px;
  border-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: rgba(7, 0, 103, 0.5);
  }
`;

const AuxiliariesContainer = styled.div`
  padding: 0vh;
  width: 95%;
`;

const AuxiliaryTitle = styled.h3`
  font-family: Lexend;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;

const AuxiliaryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
`;

const AuxBox = styled.div`
  padding: 2vh;
  width: 95%;
  margin-bottom: 1.5vh;
  display: inline-flex;
  flex-wrap: wrap;

  border-radius: 8px;
  background-color: rgba(240, 240, 0, 0.421);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const LoadingMessage = styled.div`
  font-family: Lexend;
  font-size: 16px;
  color: #000000;
`;

const AuxCard = ({ Prod, HeadName }) => {
  const dispatch = useDispatch();
  const [showAuxiliaries, setShowAuxiliaries] = useState(false);
  const [auxiliaries, setAuxiliaries] = useState([]);
  const [filteredAuxiliaries, setFilteredAuxiliaries] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = (e) => {
    dispatch(ADD(e));
  };

  const prodWithKey = {
    ...Prod,
    Heading: HeadName,
    quantity: 1,
  };

  // Function to fetch auxiliaries when needed
  const fetchAuxiliaries = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        "https://www.boqmasteradmin.com/auxiliaries/"
      ); // Replace with your actual endpoint
      setAuxiliaries(response.data);
    } catch (error) {
      console.error("Error fetching auxiliaries:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Function to filter auxiliaries based on your criteria
  const filterAuxiliaries = () => {
    const filtered = auxiliaries.filter((auxiliary) => {
      // Split auxiliary's SubCategory6 into an array
      const auxSubCat6Values = auxiliary.SubCategory6
        ? auxiliary.SubCategory6.split(",").map((value) => value.trim())
        : [];

      // Check if auxiliary's SubCategory6 contains the product's SubCategory8
      const matchSubCat6 = auxSubCat6Values.includes(Prod.SubCategory8);

      if (!matchSubCat6) {
        return false;
      }

      // Initialize matches as true
      let matchSubCat3 = true;

      // If auxiliary's SubCategory3 is present, it must match product's SubCategory4
      if (auxiliary.SubCategory3) {
        const auxSubCat3Values = auxiliary.SubCategory3.split(",").map(
          (value) => value.trim()
        );
        matchSubCat3 = auxSubCat3Values.includes(Prod.SubCategory4);
      }

      // Return true only if all conditions are met
      return matchSubCat3;
    });

    setFilteredAuxiliaries(filtered);
  };

  const handleAddClick = async () => {
    send(prodWithKey);
    await fetchAuxiliaries(); // Fetch auxiliaries when the add button is clicked
    filterAuxiliaries(); // Filter auxiliaries based on the selected product
    setShowAuxiliaries(true); // Show auxiliaries
  };

  return (
    <div>
      <Container>
        <Box onClick={handleAddClick}>
          <Add />
        </Box>
        <Title>{prodWithKey.ProductName}</Title>
        <Price>(Rs. {prodWithKey.Price})</Price>
      </Container>
      <div>
        {loading && <LoadingMessage>Loading auxiliaries...</LoadingMessage>}
        {showAuxiliaries && !loading && filteredAuxiliaries.length > 0 && (
          <AuxiliariesContainer>
            <AuxiliaryTitle>Auxiliaries for {Prod.ProductName}:</AuxiliaryTitle>
            <AuxiliaryList>
              {filteredAuxiliaries.map((aux) => (
                <AuxBox key={aux.id}>
                  <Box onClick={handleAddClick}>
                    <Add />
                  </Box>
                  <Title>{aux.ProductName}</Title>
                  <Price>(Rs. {aux.Price})</Price>
                </AuxBox>
              ))}
            </AuxiliaryList>
          </AuxiliariesContainer>
        )}
      </div>
    </div>
  );
};

export default AuxCard;
