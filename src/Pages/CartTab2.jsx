import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Backdrop, Paper, Snackbar, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RESET } from "../Redux/actions/action";
import { exportDataToExcel } from "../Components/Cart/exportdataToExcel";
import CartTab, {
  PrimaryButton,
  OutlineButton,
} from "../Components/Cart/CartTab";
import Send from "../Components/Cart/Send";

/* palette */
const primary = "#09193D";
const accent = "#FFF700";

/* ───────── layout cards ───────── */
const Wrap = styled.div`
  background: #f9f9f9;
  padding: 4vh 4vw;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4vh;
`;
const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: ${primary};
`;
const Body = styled.div`
  display: flex;
  gap: 3vw;
  flex-wrap: wrap;
`;
const Info = styled.div`
  flex: 3;
  min-width: 280px;
`;
const Summary = styled.aside`
  flex: 1;
  min-width: 240px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2vh 2vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
const SumHead = styled.h2`
  margin: 0 0 1.4rem;
  font-size: 1.4rem;
  color: ${primary};
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vh 0;
  font-size: ${({ total }) => (total ? "1.1rem" : "0.95rem")};
  font-weight: ${({ total }) => (total ? 600 : 400)};
  color: ${({ total }) => (total ? primary : "#4f4f4f")};
`;

/* ───────── popup ───────── */
const popSX = {
  width: "min(90vw,460px)",
  maxHeight: "80vh",
  p: "3vh 4vw 4vh",
  position: "relative",
};
const CloseBtn = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
`;

/* ───────── helpers ───────── */
const isNum = (x) => !isNaN(parseFloat(x));

/* ───────── component ───────── */
const CartTab2 = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cartreducer.carts);

  /* numeric subtotal */
  const subtotal = items.reduce(
    (sum, i) => (isNum(i.Price) ? sum + parseFloat(i.Price) * i.quantity : sum),
    0
  );

  /* #products (not qty) that need a quote */
  const quotesNeeded = items.filter((i) => !isNum(i.Price)).length;

  /* popup & snackbar */
  const [openPopup, setPopup] = useState(false);
  const [openSnack, setSnack] = useState(false);

  return (
    <Wrap>
      {/* ─── header ─── */}
      <Header>
        <Title>BOQ Table ({items.length})</Title>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/">
            <OutlineButton>Add More</OutlineButton>
          </Link>

          <PrimaryButton onClick={() => setPopup(true)}>
            Add to Group
          </PrimaryButton>

          <PrimaryButton onClick={() => dispatch(RESET())}>
            Clear Cart
          </PrimaryButton>
        </div>
      </Header>

      {/* ─── main ─── */}
      <Body>
        <Info>
          <CartTab />
        </Info>

        <Summary>
          <SumHead>Order Summary</SumHead>

          <Row>
            <span>Subtotal</span>
            <span>₹ {Math.ceil(subtotal).toLocaleString()}</span>
          </Row>

          <Row>
            <span>Quotes Required</span>
            <span>{quotesNeeded}</span>
          </Row>

          <Row total>
            <span>Total</span>
            <span>
              ₹ {Math.ceil(subtotal).toLocaleString()}
              {quotesNeeded > 0 &&
                ` + ${quotesNeeded} pending quotation${
                  quotesNeeded > 1 ? "s" : ""
                }`}
            </span>
          </Row>

          {/* ---- actions ---- */}
          <PrimaryButton
            style={{ width: "100%", marginTop: "2vh" }}
            onClick={() => exportDataToExcel(items, "BOQ.xlsx")}
          >
            Export to Excel
          </PrimaryButton>

          <OutlineButton
            style={{ width: "100%", marginTop: "1vh" }}
            onClick={() => alert("Download Quotations coming soon!")}
          >
            Download Quotations
          </OutlineButton>
        </Summary>
      </Body>

      {/* ─── popup (add‑to‑group) ─── */}
      <Backdrop open={openPopup} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Paper sx={popSX}>
          <CloseBtn onClick={() => setPopup(false)}>
            <Close />
          </CloseBtn>

          <Send
            handleClose={() => setPopup(false)}
            handleToggleSB={() => setSnack(true)}
          />
        </Paper>
      </Backdrop>

      {/* ─── snackbar ─── */}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ background: primary, color: accent }}
        >
          Products added to the group
        </Alert>
      </Snackbar>
    </Wrap>
  );
};

export default CartTab2;
