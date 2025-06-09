import React, { useEffect, useState, lazy, Suspense } from "react";
import styled, { useTheme } from "styled-components";
import {
  Avatar,
  Button,
  LinearProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import UserService from "../Services/UserService";

const ProjectDrawer = lazy(() => import("../Components/ProjectDrawer"));

const projectsData = [
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

const pageVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const Container = styled(motion.div)`
  padding: ${(p) => p.theme.spacing(4)}px;
  background: ${(p) => p.theme.palette.background.default};
  color: ${(p) => p.theme.palette.text.primary};
  min-height: 100vh;
  font-family: Lexend, sans-serif;
`;

const TopBarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing(4)}px;
`;

const KPIGrid = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(4)}px;
  margin-bottom: ${(p) => p.theme.spacing(4)}px;
`;

const Card = styled(motion.div)`
  flex: 1;
  padding: ${(p) => p.theme.spacing(2)}px;
  background: ${(p) => p.theme.palette.background.paper};
  border-radius: ${(p) => p.theme.shape.borderRadius}px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const TableSection = styled.section`
  margin-top: ${(p) => p.theme.spacing(2)}px;
`;

const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)}px;
`;

const progressColor = (value, theme) => {
  if (value >= 80) return theme.palette.success.main;
  if (value >= 50) return theme.palette.warning.main;
  return theme.palette.error.main;
};

const TopBar = ({ user, onLogout }) => (
  <TopBarWrap>
    <Typography variant="h6" component="h1">
      Master BOQ Dashboard
    </Typography>
    <Button
      startIcon={
        <Avatar sx={{ bgcolor: "#09193D", width: 32, height: 32 }}>
          {user?.charAt(0).toUpperCase() || "?"}
        </Avatar>
      }
      onClick={onLogout}
      aria-label="logout"
      variant="text"
    >
      {user || "User"}
    </Button>
  </TopBarWrap>
);

const InfoCard = ({ label, value }) => (
  <Card variants={itemVariants} aria-label={label} role="region">
    <Typography variant="body2" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Card>
);

const ProgressCell = ({ value }) => {
  const theme = useTheme();
  return (
    <ProgressWrap>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          flex: 1,
          height: 8,
          backgroundColor: theme.palette.action.hover,
          "& .MuiLinearProgress-bar": {
            backgroundColor: progressColor(value, theme),
          },
        }}
      />
      <span>{value}%</span>
    </ProgressWrap>
  );
};

const ProjectToolbar = () => (
  <Toolbar sx={{ pl: 0 }}>
    <Typography variant="subtitle1" component="div">
      Projects
    </Typography>
  </Toolbar>
);

const DataTable = ({ rows, loading, onRowClick }) => {
  const theme = useTheme();
  return (
    <TableContainer>
      <Table size="small" aria-label="project table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Project</TableCell>
            <TableCell sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Customer</TableCell>
            <TableCell sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Tender</TableCell>
            <TableCell sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Quotation</TableCell>
            <TableCell align="right" sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Panels</TableCell>
            <TableCell sx={{ position: "sticky", top: 0, background: theme.palette.background.paper }}>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from(new Array(3)).map((_, i) => (
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
                  variants={itemVariants}
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
  );
};

const ProjectTableSection = ({ rows, loading, onRowClick }) => (
  <TableSection>
    <ProjectToolbar />
    <DataTable rows={rows} loading={loading} onRowClick={onRowClick} />
  </TableSection>
);

const DashboardPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRows(projectsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const username = UserService.getUsername();

  return (
    <Container variants={pageVariants} initial="hidden" animate="visible">
      <TopBar user={username} onLogout={() => UserService.doLogout()} />
      <KPIGrid>
        <InfoCard label="Projects" value={projectsData.length} />
        <InfoCard
          label="Total Panels"
          value={projectsData.reduce((s, p) => s + p.panels, 0)}
        />
      </KPIGrid>
      <ProjectTableSection
        rows={rows}
        loading={loading}
        onRowClick={setSelected}
      />
      <Suspense fallback={null}>
        <ProjectDrawer
          open={Boolean(selected)}
          project={selected}
          onClose={() => setSelected(null)}
        />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
