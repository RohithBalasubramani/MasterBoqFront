import React from "react";
import { Box, Card, CardContent, Typography, Table, TableHead, TableBody, TableRow, TableCell, LinearProgress } from "@mui/material";

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

const Dashboard = () => {
  const totalPanels = projects.reduce((sum, p) => sum + p.panels, 0);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Master BOQ Dashboard
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="h4">{projects.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Panels</Typography>
            <Typography variant="h4">{totalPanels}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Table size="small">
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
                <Box display="flex" alignItems="center" gap={1}>
                  <LinearProgress variant="determinate" value={p.progress} sx={{ flex: 1 }} />
                  <Typography variant="body2">{p.progress}%</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Dashboard;
