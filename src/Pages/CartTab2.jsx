/*  ──────────────────────────────────────────────────────────────
    CartTab2  –  now with “Save as Panel” popup
   ────────────────────────────────────────────────────────────── */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Backdrop,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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

/* ───────── popup sX ───────── */
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

/* dummy customer → project mapping */
const customers = [
  {
    name: "ACME Industries",
    projects: ["Factory Alpha", "Warehouse B"],
  },
  {
    name: "Beta LLC",
    projects: ["Office Complex"],
  },
  {
    name: "Gamma Group",
    projects: ["Plant X", "Plant Y"],
  },
];

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

  /* pop-ups & snackbar */
  const [openAddGrp, setOpenAddGrp] = useState(false);
  const [openSavePnl, setOpenSavePnl] = useState(false);
  const [openSnack, setSnack] = useState(false);
  const [selectedCust, setCust] = useState("");
  const [selectedProj, setProj] = useState("");

  /* reset project dropdown when customer changes */
  const handleCustChange = (e) => {
    setCust(e.target.value);
    setProj("");
  };

  const handleSave = () => {
    // -> here you would dispatch / API call
    setOpenSavePnl(false);
    setSnack(true);
  };

  return (
    <Wrap>
      {/* ─── header ─── */}
      <Header>
        <Title>BOQ Table ({items.length})</Title>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/">
            <OutlineButton>Add More</OutlineButton>
          </Link>

          <PrimaryButton onClick={() => setOpenAddGrp(true)}>
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
            <span>Quotes&nbsp;Required</span>
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

          <OutlineButton
            style={{ width: "100%", marginTop: "1vh" }}
            onClick={() => setOpenSavePnl(true)}
          >
            Save&nbsp;as&nbsp;panel
          </OutlineButton>
        </Summary>
      </Body>

      {/* ─── popup #1 – add-to-group (unchanged) ─── */}
      <Backdrop open={openAddGrp} sx={{ zIndex: (t) => t.zIndex.drawer + 2 }}>
        <Paper sx={popSX}>
          <CloseBtn onClick={() => setOpenAddGrp(false)}>
            <Close />
          </CloseBtn>

          <Send
            handleClose={() => setOpenAddGrp(false)}
            handleToggleSB={() => setSnack(true)}
          />
        </Paper>
      </Backdrop>

      {/* ─── popup #2 – save-as-panel (NEW) ─── */}
      <Backdrop open={openSavePnl} sx={{ zIndex: (t) => t.zIndex.drawer + 3 }}>
        <Paper sx={popSX}>
          <CloseBtn onClick={() => setOpenSavePnl(false)}>
            <Close />
          </CloseBtn>

          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Save to Panel
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Company</InputLabel>
            <Select
              value={selectedCust}
              label="Company"
              onChange={handleCustChange}
            >
              {customers.map((c) => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedCust} sx={{ mb: 3 }}>
            <InputLabel>Project</InputLabel>
            <Select
              value={selectedProj}
              label="Project"
              onChange={(e) => setProj(e.target.value)}
            >
              {customers
                .find((c) => c.name === selectedCust)
                ?.projects.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <PrimaryButton
            disabled={!selectedCust || !selectedProj}
            onClick={handleSave}
            style={{ width: "100%" }}
          >
            Save
          </PrimaryButton>
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
          Panel saved successfully
        </Alert>
      </Snackbar>
    </Wrap>
  );
};

export default CartTab2;
