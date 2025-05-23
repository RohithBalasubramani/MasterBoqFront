/*  src/Components/ProductCard.jsx
    – keeps your original visual language (Lexend, frosted-glass cards, yellow
      aux boxes) **plus**:
        • Infinite-scroll aux list (20 → as many pages as exist)
        • Hover + focus effects on buttons for clearer affordance
        • Subtle skeleton shimmer while first aux page loads
        • Smooth height transition when the aux panel opens/closes            */

import { Add } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { ADD } from "../Redux/actions/action";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

/* ─────────────────────── styled components ─────────────────────── */

const Container = styled.div`
  padding: 2vh;
  width: 95%;
  margin-bottom: 1.5vh;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: rgba(7, 0, 103, 0.12);
  backdrop-filter: blur(22px);
  box-shadow: 0 6px 18px -6px rgba(0, 0, 0, 0.35);
`;

const Price = styled.div`
  font-family: Lexend;
  font-size: 15px;
  font-weight: 400;
  color: #5f5f5f;
`;

const Title = styled.div`
  font-family: Lexend;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  line-height: 1.2;
`;

const Box = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-right: 1rem;
  border-radius: 8px;
  background: rgba(4, 0, 61, 0.25);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover,
  &:focus-visible {
    background: rgba(7, 0, 103, 0.55);
  }
`;

const ToggleAuxBtn = styled.button`
  margin-left: auto;
  padding: 0.45rem 0.9rem;
  font-family: Lexend;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  background: rgba(7, 0, 103, 0.3);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  &:hover,
  &:focus-visible {
    background: rgba(7, 0, 103, 0.55);
  }
`;

const AuxContainer = styled.div`
  width: 95%;
  max-height: 48vh;
  overflow-y: auto;
  margin: 0.6rem auto 0;
  padding-right: 6px; /* scrollbar compensation */
  transition: max-height 0.4s ease;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(7, 0, 103, 0.35);
    border-radius: 3px;
  }
`;

const AuxHeader = styled.h3`
  font-family: Lexend;
  font-size: 17px;
  font-weight: 600;
  color: #373737;
  opacity: 0.8;
  margin: 0.2rem 0 0.6rem;
`;

const AuxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AuxBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1vh;
  border-radius: 10px;
  background: rgba(255, 241, 118, 0.35);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const LoadingMsg = styled.div`
  font-family: Lexend;
  font-size: 0.9rem;
  padding: 0.6rem 0;
`;

/* skeleton shimmer while the first page loads */
const shimmer = keyframes`
          0%  { background-position: -300px 0; }
          100%{ background-position: 300px 0; }
        `;
const Skeleton = styled.div`
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(230, 230, 230, 0.35) 0%,
    rgba(245, 245, 245, 0.8) 50%,
    rgba(230, 230, 230, 0.35) 100%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.1s infinite linear;
`;

/* ─────────────────────── utils ─────────────────────── */

const displayPrice = (v) =>
  isNaN(parseFloat(v)) || v === null || v === ""
    ? "Request Market Price"
    : `Rs. ${v}`;

/* ─────────────────────── component ─────────────────────── */

export default function ProductCard({ Prod, HeadName }) {
  const dispatch = useDispatch();

  /* aux state */
  const [auxItems, setAuxItems] = useState([]);
  const [auxNext, setAuxNext] = useState(null);
  const [auxLoad, setAuxLoad] = useState(false);
  const [showAux, setShowAux] = useState(false);
  const listRef = useRef(null);

  /* snackbar */
  const [snkOpen, setSnkOpen] = useState(false);
  const [snkMsg, setSnkMsg] = useState("");

  /* fetch page */
  const fetchAux = async (url) => {
    if (auxLoad || !url) return;
    setAuxLoad(true);
    try {
      const { data } = await axios.get(url);
      const results = Array.isArray(data) ? data : data.results || [];
      setAuxItems((p) => [...p, ...results]);
      setAuxNext(Array.isArray(data) ? null : data.next);
    } catch (err) {
      console.error("[ProductCard] aux fetch error:", err);
    } finally {
      setAuxLoad(false);
    }
  };

  /* toggle panel */
  const toggleAuxPanel = async () => {
    if (!showAux && auxItems.length === 0) {
      await fetchAux(
        `https://www.boqmasteradmin.com/product/${Prod.id}/auxiliaries/`
      );
    }
    setShowAux((v) => !v);
  };

  /* infinite-scroll listener */
  useEffect(() => {
    if (!showAux) return;
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
        fetchAux(auxNext);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [showAux, auxNext, auxLoad]);

  /* add to cart */
  const addToBoq = (item) => {
    dispatch(ADD(item));
    setSnkMsg(`${item.ProductName} added to BOQ`);
    setSnkOpen(true);
  };

  if (!Prod) return null;
  const prodForCart = { ...Prod, Heading: HeadName, quantity: 1 };

  /* ─────────────────────── render ─────────────────────── */
  return (
    <>
      {/* main product row */}
      <Container>
        <Box onClick={() => addToBoq(prodForCart)}>
          <Add fontSize="small" />
        </Box>

        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Title>{Prod.ProductName}</Title>
          <Price>{displayPrice(Prod.Price)}</Price>
        </div>

        <ToggleAuxBtn onClick={toggleAuxPanel}>
          {showAux ? "Hide Aux" : "Show Aux"}
        </ToggleAuxBtn>
      </Container>

      {/* aux panel */}
      {showAux && (
        <AuxContainer ref={listRef}>
          <AuxHeader>Auxiliaries for {Prod.ProductName}</AuxHeader>

          {auxItems.length === 0 && auxLoad && (
            <>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </>
          )}

          <AuxList>
            {auxItems.map((aux) => (
              <AuxBox key={aux.id}>
                <Box onClick={() => addToBoq(aux)}>
                  <Add fontSize="small" />
                </Box>
                <div style={{ flex: 1 }}>
                  <Title>{aux.ProductName}</Title>
                  <Price>{displayPrice(aux.Price)}</Price>
                </div>
              </AuxBox>
            ))}
          </AuxList>

          {auxLoad && auxItems.length > 0 && (
            <LoadingMsg>Loading more…</LoadingMsg>
          )}
          {!auxLoad && !auxNext && auxItems.length === 0 && (
            <LoadingMsg>No matching auxiliaries.</LoadingMsg>
          )}
          {!auxLoad && !auxNext && auxItems.length > 0 && (
            <LoadingMsg>All auxiliaries loaded.</LoadingMsg>
          )}
        </AuxContainer>
      )}

      {/* snackbar */}
      <Snackbar
        open={snkOpen}
        autoHideDuration={2500}
        onClose={() => setSnkOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ background: "rgba(255, 241, 118, 0.9)", color: "#000" }}
          onClose={() => setSnkOpen(false)}
        >
          {snkMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
