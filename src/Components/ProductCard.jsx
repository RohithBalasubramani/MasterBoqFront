import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD } from "../Redux/actions/action";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const Container = styled.div`
  padding: 2vh;
  width: 95%;
  margin-bottom: 1.5vh;
  display: inline-flex;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: rgba(7, 0, 103, 0.15);
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
  color: #5f5f5f;
`;

const Title = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  width: 75%;
  color: #000000;
`;

const Box = styled.button`
  margin: 1vh;
  background-color: rgba(4, 0, 61, 0.3);
  border-radius: 8px;
  color: #000000;
  &:hover {
    background-color: rgba(7, 0, 103, 0.5);
  }
`;

const AuxiliariesContainer = styled.div`
  width: 95%;
`;

const AuxiliaryTitle = styled.h3`
  font-family: Lexend;
  font-size: 18px;
  font-weight: 500;
  color: #373737;
  opacity: 0.6;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const LoadingMessage = styled.div`
  font-family: Lexend;
  font-size: 16px;
  color: #000000;
`;

const ShowLessButton = styled.button`
  margin-top: 1vh;
  margin-bottom: 2vh;
  margin-left: 90%;
  margin-right: 0%;
  width: max-content;

  background-color: rgba(240, 240, 0, 0.3);
  color: #4a4a4a;
  border: 1px dotted black;
  border-radius: 5px;
  padding: 0.5vh 1vh;
  cursor: pointer;
  &:hover {
    background-color: rgba(240, 240, 0, 0.6);
  }
`;

const ToggleAuxButton = styled.button`
  background-color: rgba(7, 0, 103, 0.3);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.5vh 1vh;
  cursor: pointer;
  &:hover {
    background-color: rgba(7, 0, 103, 0.6);
  }
  margin-right: 0%;
  margin-left: auto;
`;

const ProductCard = ({ Prod, HeadName }) => {
  const dispatch = useDispatch();
  const [showAuxiliaries, setShowAuxiliaries] = useState(false);
  const [auxiliaries, setAuxiliaries] = useState([]);
  const [filteredAuxiliaries, setFilteredAuxiliaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const send = (e) => {
    dispatch(ADD(e));
    setSnackbarMessage(`${e.ProductName} has been added to your BOQ Table`);
    setSnackbarOpen(true); // Open snackbar with product name message
  };

  const prodWithKey = {
    ...Prod,
    Heading: HeadName,
    quantity: 1,
  };

  const fetchAuxiliaries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://www.boqmasteradmin.com/auxiliaries/"
      );
      setAuxiliaries(response.data);
    } catch (error) {
      console.error("Error fetching auxiliaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAuxiliaries = (auxiliaries, product) => {
    return auxiliaries.filter((auxiliary) => {
      // Split and trim SubCategory6 of auxiliaries
      const auxSubCat6Values = auxiliary.SubCategory6
        ? auxiliary.SubCategory6.split(",").map((value) => value.trim())
        : [];
      // Check if SubCategory6 matches SubCategory9 of the product
      const matchSubCat6 = auxSubCat6Values.includes(product.SubCategory9);

      if (!matchSubCat6) {
        return false;
      }

      // Split and trim SubCategory3 of auxiliaries if it exists
      const auxSubCat3Values = auxiliary.SubCategory3
        ? auxiliary.SubCategory3.split(",").map((value) => value.trim())
        : [];
      // Check if SubCategory3 of auxiliaries matches SubCategory4 of the product
      const matchSubCat3 =
        !auxiliary.SubCategory3 ||
        auxSubCat3Values.includes(product.SubCategory4);

      if (!matchSubCat3) {
        return false;
      }

      // Split and trim SubCategory5 of auxiliaries if it exists
      const auxSubCat5Values = auxiliary.SubCategory5
        ? auxiliary.SubCategory5.split(",").map((value) => value.trim())
        : [];
      // Check if SubCategory5 of auxiliaries matches SubCategory3 of the product
      const matchSubCat5 =
        !auxiliary.SubCategory5 ||
        auxSubCat5Values.includes(product.SubCategory3);

      return matchSubCat5;
    });
  };

  useEffect(() => {
    if (auxiliaries.length > 0) {
      setFilteredAuxiliaries(filterAuxiliaries(auxiliaries, Prod));
    }
  }, [auxiliaries, Prod]);

  const handleAddClick = async () => {
    send(prodWithKey);
    await fetchAuxiliaries();
    setShowAuxiliaries(true);
  };

  const handleToggleAuxClick = async () => {
    if (!showAuxiliaries) {
      await fetchAuxiliaries();
    }
    setShowAuxiliaries(!showAuxiliaries);
  };

  const handleShowLessClick = () => {
    setShowAuxiliaries(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close snackbar when dismissed
  };

  return (
    <div>
      <Container>
        <Box onClick={handleAddClick}>
          <Add />
        </Box>
        <Title>{prodWithKey.ProductName}</Title>
        <Price>(Rs. {prodWithKey.Price})</Price>
        <ToggleAuxButton onClick={handleToggleAuxClick}>
          {showAuxiliaries ? "Hide Auxiliaries" : "Show Auxiliaries"}
        </ToggleAuxButton>
      </Container>
      <div>
        {loading && <LoadingMessage>Loading auxiliaries...</LoadingMessage>}
        {showAuxiliaries && !loading && filteredAuxiliaries.length > 0 && (
          <AuxiliariesContainer>
            <AuxiliaryTitle>Auxiliaries for {Prod.ProductName}:</AuxiliaryTitle>
            <AuxiliaryList>
              {filteredAuxiliaries.map((aux) => (
                <AuxBox key={aux.id}>
                  <Box onClick={() => send(aux)}>
                    <Add />
                  </Box>
                  <Title>{aux.ProductName}</Title>
                  <Price>(Rs. {aux.Price})</Price>
                </AuxBox>
              ))}
            </AuxiliaryList>
            <ShowLessButton onClick={handleShowLessClick}>
              Hide Auxiliaries
            </ShowLessButton>
          </AuxiliariesContainer>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          variant="filled"
          severity="success"
          sx={{
            maxWidth: "45vw",
            height: "100%",
            background: "rgba(240, 240, 0, 0.421)",
            color: "black",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductCard;
