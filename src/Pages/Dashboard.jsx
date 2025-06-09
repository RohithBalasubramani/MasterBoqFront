import React from "react";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
} from "@mui/material";
import PageHeader from "../Components/PageHeader";
import SummaryCard from "../Components/SummaryCard";

const projects = [
  {
    id: 1,
    customer: "ACME Corp",
    projectName: "Factory A",
    tender: "T001",
    quotation: "Q1001",
    panels: 5,
    progress: 60,
  },
  {
    id: 2,
    customer: "Beta LLC",
    projectName: "Warehouse B",
    tender: "T002",
    quotation: "Q1002",
    panels: 3,
    progress: 35,
  },
  {
    id: 3,
    customer: "Gamma Industries",
    projectName: "Office Complex",
    tender: "T003",
    quotation: "Q1003",
    panels: 8,
    progress: 80,
  },
];

const Container = styled.div`
  background: #ffffff;
  padding: 3vh;
  color: #333333;
  font-family: Lexend, sans-serif;
`;

const SummaryGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;


const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 200px;
`;

const Percent = styled.span`
  font-size: 0.85rem;
`;

const StyledTable = styled(Table)`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;

const Dashboard = () => {
  const totalPanels = projects.reduce((sum, p) => sum + p.panels, 0);

  return (

    <Container>
      <PageHeader title="Master BOQ Dashboard" />

      <SummaryGrid>
        <SummaryCard label="Projects" number={projects.length} />
        <SummaryCard label="Total Panels" number={totalPanels} />
      </SummaryGrid>

      <StyledTable size="small">

        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Tender</TableCell>
            <TableCell>Quotation</TableCell>
            <TableCell align="right">Panels</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.projectName}</TableCell>
              <TableCell>{p.customer}</TableCell>
              <TableCell>{p.tender}</TableCell>
              <TableCell>{p.quotation}</TableCell>
              <TableCell align="right">{p.panels}</TableCell>
              <TableCell sx={{ width: 200 }}>

                <ProgressWrap>
                  <LinearProgress variant="determinate" value={p.progress} sx={{ flex: 1 }} />
                  <Percent>{p.progress}%</Percent>
                </ProgressWrap>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </StyledTable>
    </Container>

  );
};

export default Dashboard;
