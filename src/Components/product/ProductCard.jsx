/* ProductCard.jsx --------------------------------------------------------- */
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD } from "../Redux/actions/action";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

/* ─── styled components (unchanged) ─────────────────────────────────────── */
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

/* ─── component ─────────────────────────────────────────────────────────── */
const ProductCard = ({ Key, Prod, HeadName }) => {
  const dispatch = useDispatch();

  /* state */
  const [showAuxiliaries, setShowAuxiliaries] = useState(false);
  const [auxiliaries, setAuxiliaries] = useState([]); // full fetched list
  const [filteredAuxiliaries, setFilteredAuxiliaries] = useState([]); // after matching
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /* helper: add to cart + toast */
  const addToBoq = (item) => {
    dispatch(ADD(item));
    setSnackbarMessage(`${item.ProductName} has been added to your BOQ Table`);
    setSnackbarOpen(true);
  };

  /* compose product with extra keys for cart */
  const prodWithKey = { ...Prod, Heading: HeadName, quantity: 1 };

  /* ── fetch auxiliaries safely ────────────────────────────────────────── */
  const fetchAuxiliaries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://www.boqmasteradmin.com/auxiliaries/"
      );
      // API may return an array OR { results: [...] }
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
        ? data.results
        : [];

      console.log("[ProductCard] fetched auxiliaries:", list.length);
      setAuxiliaries(list);
    } catch (err) {
      console.error("[ProductCard] fetchAuxiliaries error:", err);
      setAuxiliaries([]);
    } finally {
      setLoading(false);
    }
  };

  /* ── match logic ───────────────────────────────────────────────────────
   *  - SubCategory4 of auxiliary (csv) vs product.SubCategory8
   *  - SubCategory3 of auxiliary (csv) vs product.SubCategory4
   *  - Case‑insensitive
   *  - If both prod fields present → require both matches
   *  - If only one present → require that one
   */
  const filterAuxiliaries = (list, product) => {
    if (!Array.isArray(list)) {
      console.error("[ProductCard] filterAuxiliaries got non‑array:", list);
      return [];
    }

    const prodCat8 = (product.SubCategory8 || "").trim().toLowerCase();
    const prodCat4 = (product.SubCategory4 || "").trim().toLowerCase();

    return list.filter((aux) => {
      const auxCat4Arr = (aux.SubCategory4 || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      const auxCat3Arr = (aux.SubCategory3 || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      /* evaluate rules */
      if (prodCat8 && prodCat4) {
        return auxCat4Arr.includes(prodCat8) && auxCat3Arr.includes(prodCat4);
      }
      if (prodCat8) return auxCat4Arr.includes(prodCat8);
      if (prodCat4) return auxCat3Arr.includes(prodCat4);
      return false;
    });
  };

  /* re‑filter whenever aux list or product changes */
  useEffect(() => {
    setFilteredAuxiliaries(filterAuxiliaries(auxiliaries, Prod));
  }, [auxiliaries, Prod]);

  /* ── handlers ───────────────────────────────────────────────────────── */
  const handleAddClick = async () => {
    addToBoq(prodWithKey);
    if (!auxiliaries.length) await fetchAuxiliaries();
    setShowAuxiliaries(true);
  };

  const handleToggleAuxClick = async () => {
    if (!showAuxiliaries && !auxiliaries.length) await fetchAuxiliaries();
    setShowAuxiliaries((prev) => !prev);
  };

  /* ── render ─────────────────────────────────────────────────────────── */
  return (
    <div>
      {/* main product bar */}
      <Container>
        <Box onClick={handleAddClick}>
          <Add />
        </Box>
        <Title>{Prod.ProductName}</Title>
        <Price>(Rs. {Prod.Price})</Price>
        <ToggleAuxButton onClick={handleToggleAuxClick}>
          {showAuxiliaries ? "Hide Auxiliaries" : "Show Auxiliaries"}
        </ToggleAuxButton>
      </Container>

      {/* auxiliaries section */}
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
                    <Price>(Rs. {aux.Price})</Price>
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
