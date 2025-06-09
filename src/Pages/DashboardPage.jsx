import React, { useEffect, useState, lazy, Suspense, useContext } from "react";
import styled, { useTheme } from "styled-components";
import {
  Avatar,
  Button,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeModeContext } from "../theme/ThemeContext";
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

const Bar = styled.div`
  flex: 1;
  height: 8px;
  background: ${(p) => p.theme.palette.action.hover};
  border-radius: 4px;
  overflow: hidden;
`;

const BarFill = styled(motion.div)`
  height: 100%;
`;

const progressColor = (value, theme) => {
  if (value >= 80) return theme.palette.success.main;
  if (value >= 50) return theme.palette.warning.main;
  return theme.palette.error.main;
};

const TopBar = ({
  user,
  onLogout,
  search,
  onSearchChange,
  onToggleTheme,
  mode,
}) => (
  <TopBarWrap>
    <Typography variant="h6" component="h1">
      Master BOQ Dashboard
    </Typography>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <TextField
        size="small"
        placeholder="Search projects"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="search"
        sx={{ width: 200 }}
      />
      <IconButton aria-label="toggle theme" onClick={onToggleTheme}>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
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
    </div>
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
      <Bar>
        <BarFill
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
          style={{ background: progressColor(value, theme) }}
        />
      </Bar>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {value}%
      </motion.span>
    </ProgressWrap>
  );
};

const ProjectToolbar = ({ count }) => (
  <Toolbar sx={{ pl: 0 }}>
    <Typography variant="subtitle1" component="div">
      Projects ({count})
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
    <ProjectToolbar count={rows.length} />
    <DataTable rows={rows} loading={loading} onRowClick={onRowClick} />
  </TableSection>
);

const DashboardPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRows(projectsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const username = UserService.getUsername();
  const { toggle } = useContext(ThemeModeContext);
  const theme = useTheme();
  const filteredRows = rows.filter(
    (r) =>
      r.projectName.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase())
  );
  const avgProgress = Math.round(
    (rows.reduce((s, p) => s + p.progress, 0) || 0) / (rows.length || 1)
  );

  return (
    <Container variants={pageVariants} initial="hidden" animate="visible">
      <TopBar
        user={username}
        onLogout={() => UserService.doLogout()}
        search={search}
        onSearchChange={setSearch}
        onToggleTheme={toggle}
        mode={theme.palette.mode}
      />
      <KPIGrid>
        <InfoCard label="Projects" value={projectsData.length} />
        <InfoCard
          label="Total Panels"
          value={projectsData.reduce((s, p) => s + p.panels, 0)}
        />
        <InfoCard label="Avg Progress" value={`${avgProgress}%`} />
      </KPIGrid>
      <ProjectTableSection
        rows={filteredRows}
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
