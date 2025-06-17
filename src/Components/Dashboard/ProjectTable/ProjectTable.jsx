import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import ProgressCell from "./ProgressCell";
import ProjectToolbar from "./ProjectToolbar";

const Section = styled.section`
  margin-top: ${(p) => p.theme.spacing(2)}px;
`;

const rowAnim = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };

export default function ProjectTable({ rows, loading, onRowClick }) {
  const theme = useTheme();
  return (
    <Section>
      <ProjectToolbar count={rows.length} />

      <TableContainer /* virtualised later */>
        <Table size="small" aria-label="project table">
          <TableHead>
            {[
              "Project",
              "Customer",
              "Tender",
              "Quotation",
              "Panels",
              "Progress",
            ].map((h) => (
              <TableCell
                key={h}
                align={h === "Panels" ? "right" : "left"}
                sx={{
                  position: "sticky",
                  top: 0,
                  background: theme.palette.background.paper,
                }}
              >
                {h}
              </TableCell>
            ))}
          </TableHead>

          <TableBody>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton height={32} animation="wave" />
                    </TableCell>
                  </TableRow>
                ))
              : rows.map((r) => (
                  <TableRow
                    key={r.id}
                    hover
                    onClick={() => onRowClick(r)}
                    component={motion.tr}
                    variants={rowAnim}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{r.projectName}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell>{r.tender}</TableCell>
                    <TableCell>{r.quotation}</TableCell>
                    <TableCell align="right">{r.panels}</TableCell>
                    <TableCell>
                      <ProgressCell value={r.progress} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}
