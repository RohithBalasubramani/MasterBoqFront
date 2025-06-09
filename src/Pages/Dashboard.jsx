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

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const SummaryGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background: #ffffff;
  flex: 1;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CardNumber = styled.div`
  font-size: 2rem;
  font-weight: 500;
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
      <Title>Master BOQ Dashboard</Title>

      <SummaryGrid>
        <InfoCard>
          <CardLabel>Projects</CardLabel>
          <CardNumber>{projects.length}</CardNumber>
        </InfoCard>
        <InfoCard>
          <CardLabel>Total Panels</CardLabel>
          <CardNumber>{totalPanels}</CardNumber>
        </InfoCard>
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
