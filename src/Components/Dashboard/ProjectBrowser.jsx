/*  ──────────────────────────────────────────────────────────────
    ProjectBrowserSection – v4  (status pill @ darker text)
      • Card deck → MUI Select dropdown
      • Header corner-radius only outer corners
      • New status pill design (dark text + translucent bg)
      • Polished “no-selection” placeholder
   ────────────────────────────────────────────────────────────── */

import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import {
  alpha,
  darken,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";

const ProjectDrawer = lazy(() => import("./drawers/ProjectDrawer"));

/* ═════ Layout shells ═════ */
const Section = styled(motion.section)`
  display: flex;
  gap: 2vw;
  height: 60vh;
  width: 100%;
  overflow: hidden;
  padding-top: 2vh;
`;

const Col = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/* ═════ Header radius helper ═════ */
const HeadCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    fontWeight: 600,
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    "&:first-of-type": { borderTopLeftRadius: 8 },
    "&:last-of-type": { borderTopRightRadius: 8 },
  },
}));

/* ═════ Status pill  ═════ */
const Pill = styled(Box)(({ theme, bg }) => {
  const text = theme.palette.mode === "light" ? darken(bg, 0.3) : "#fff";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 500,
    backgroundColor: alpha(bg, 0.18), // translucent background
    color: text, // darker text for contrast
    "&::before": {
      content: '""',
      display: "block",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor",
    },
  };
});

/* status → [label, baseColor] */
const statusPill = (progress, palette) => {
  if (progress >= 100) return ["Completed", palette.success.main];
  if (progress > 0) return ["In Progress", palette.warning.main];
  return ["Not Started", palette.text.disabled];
};

/* ═════ Main component ═════ */
export default function ProjectBrowserSection({ customers = [] }) {
  const theme = useTheme();
  const [custIdx, setCustIdx] = useState(0);
  const [openProj, setOpenProj] = useState(null);

  /* keep index in bounds when customers list changes */
  useEffect(() => {
    setCustIdx((i) => Math.min(i, customers.length - 1));
  }, [customers.length]);

  const cust = customers[custIdx] || { projects: [] };

  /* memo list for selector */
  const selectItems = useMemo(
    () =>
      customers.map((c, i) => (
        <MenuItem key={c.id || c.name} value={i}>
          {c.name}
        </MenuItem>
      )),
    [customers]
  );

  return (
    <Section
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="visible"
    >
      {/* ── left column: selector + table ─────────────────────── */}
      <Col>
        {/* customer selector */}
        <Box sx={{ mb: 3, maxWidth: 260, mt: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Customer</InputLabel>
            <Select
              value={custIdx}
              label="Customer"
              onChange={(e) => setCustIdx(e.target.value)}
            >
              {selectItems}
            </Select>
          </FormControl>
        </Box>

        {/* projects table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 2,
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {["Project", "Tender", "Quotation", "Status", ""].map((h) => (
                  <HeadCell key={h}>{h}</HeadCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {cust.projects.map((p, i) => {
                const [label, color] = statusPill(p.progress, theme.palette);
                return (
                  <TableRow
                    key={p.id}
                    sx={{
                      background:
                        i % 2 ? theme.palette.action.selected : "inherit",
                    }}
                  >
                    <TableCell>{p.projectName}</TableCell>
                    <TableCell>{p.tender}</TableCell>
                    <TableCell>{p.quotation}</TableCell>
                    <TableCell>
                      <Pill bg={color}>{label}</Pill>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        endIcon={<OpenInNew fontSize="inherit" />}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Col>

      {/* ── right column: placeholder widget  ─────────────────── */}
      <Col
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          borderRadius: "8px",
        }}
      >
        <Inventory2Outlined
          fontSize="large"
          sx={{ color: theme.palette.action.disabled, mb: 1 }}
        />
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, opacity: 0.8 }}
        >
          No panel selected yet.
        </Typography>
      </Col>

      {/* ── project drawer ────────────────────────────────────── */}
      <Suspense fallback={null}>
        <ProjectDrawer
          open={Boolean(openProj)}
          project={openProj}
          onClose={() => setOpenProj(null)}
        />
      </Suspense>
    </Section>
  );
}
