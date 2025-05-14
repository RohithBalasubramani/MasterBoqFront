/* ProductCard.jsx --------------------------------------------------------- */
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD } from "../Redux/actions/action";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

/* ───────────── styled components ───────────── */

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
  margin-left: auto;
  &:hover {
    background-color: rgba(7, 0, 103, 0.6);
  }
`;

/* ───────────── helpers ───────────── */

const displayPrice = (price) =>
  isNaN(parseFloat(price)) || price === null || price === ""
    ? "Request Market Price"
    : `Rs. ${price}`;

/* ───────────── component ───────────── */

const ProductCard = ({ Prod, HeadName }) => {
  /* hooks must run every render (so they are first) */
  const dispatch = useDispatch();

  const [showAuxiliaries, setShowAuxiliaries] = useState(false);
  const [auxiliaries, setAuxiliaries] = useState([]);
  const [filteredAuxiliaries, setFilteredAuxiliaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /* fetch once only when needed */
  const fetchAuxiliaries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://www.boqmasteradmin.com/auxiliaries/"
      );
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
        ? data.results
        : [];
      setAuxiliaries(list);
    } catch (err) {
      console.error("[ProductCard] fetchAuxiliaries error:", err);
      setAuxiliaries([]);
    } finally {
      setLoading(false);
    }
  };

  /* filter whenever list OR Prod changes */
  useEffect(() => {
    if (!Prod) return; // Prod may be undefined on very first render
    const prodCat9 = (Prod.SubCategory9 || "").trim().toLowerCase();
    const prodCat4 = (Prod.SubCategory4 || "").trim().toLowerCase();

    const matches = auxiliaries.filter((aux) => {
      const auxCat4Arr = (aux.SubCategory4 || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const auxCat3Arr = (aux.SubCategory3 || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (prodCat9 && prodCat4)
        return auxCat4Arr.includes(prodCat9) && auxCat3Arr.includes(prodCat4);
      if (prodCat9) return auxCat4Arr.includes(prodCat9);
      if (prodCat4) return auxCat3Arr.includes(prodCat4);
      return false;
    });

    setFilteredAuxiliaries(matches);
  }, [auxiliaries, Prod]);

  /* add to cart */
  const addToBoq = (item) => {
    dispatch(ADD(item));
    setSnackbarMessage(`${item.ProductName} has been added to your BOQ Table`);
    setSnackbarOpen(true);
  };

  /* handlers */
  const prodWithKey = Prod ? { ...Prod, Heading: HeadName, quantity: 1 } : null;

  const handleAddClick = async () => {
    if (!Prod) return;
    addToBoq(prodWithKey);
    if (!auxiliaries.length) await fetchAuxiliaries();
    setShowAuxiliaries(true);
  };

  const handleToggleAuxClick = async () => {
    if (!showAuxiliaries && !auxiliaries.length) await fetchAuxiliaries();
    setShowAuxiliaries((prev) => !prev);
  };

  /* early bail AFTER hooks to satisfy ESLint */
  if (!Prod) return null;

  /* ───────────── render ───────────── */
  return (
    <div>
      {/* main product row */}
      <Container>
        <Box onClick={handleAddClick}>
          <Add />
        </Box>

        <Title>{Prod.ProductName}</Title>
        <Price>{displayPrice(Prod.Price)}</Price>

        <ToggleAuxButton onClick={handleToggleAuxClick}>
          {showAuxiliaries ? "Hide Auxiliaries" : "Show Auxiliaries"}
        </ToggleAuxButton>
      </Container>

      {/* auxiliaries list */}
      {showAuxiliaries && (
        <div>
          {loading && <LoadingMessage>Loading auxiliaries…</LoadingMessage>}

          {!loading && filteredAuxiliaries.length > 0 && (
            <AuxiliariesContainer>
              <AuxiliaryTitle>
                Auxiliaries for {Prod.ProductName}:
              </AuxiliaryTitle>

              <AuxiliaryList>
                {filteredAuxiliaries.map((aux) => (
                  <AuxBox key={aux.id}>
                    <Box onClick={() => addToBoq(aux)}>
                      <Add />
                    </Box>
                    <Title>{aux.ProductName}</Title>
                    <Price>{displayPrice(aux.Price)}</Price>
                  </AuxBox>
                ))}
              </AuxiliaryList>

              <ShowLessButton onClick={() => setShowAuxiliaries(false)}>
                Hide Auxiliaries
              </ShowLessButton>
            </AuxiliariesContainer>
          )}

          {!loading && filteredAuxiliaries.length === 0 && (
            <LoadingMessage>No matching auxiliaries found.</LoadingMessage>
          )}
        </div>
      )}

      {/* snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{
            maxWidth: "45vw",
            background: "rgba(240, 240, 0, 0.421)",
            color: "black",
          }}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductCard;
