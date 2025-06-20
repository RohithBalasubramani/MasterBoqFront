import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeModeContext } from "../theme/ThemeContext";
import UserService from "../Services/UserService";

// import TopBar from "../Components/Dashboard/TopBar";
// import KpiHeader from "../Components/Dashboard/KpiHeader";

import ProjectBrowserSection from "../Components/Dashboard/ProjectBrowser";
//import customers from "../mocks/customers"; // mock data for customers
import TopBar from "../Components/Dashboard/Topbar";
import KpiHeader from "../Components/Dashboard/KPIheader";
import { httpClient } from "../Services/HttpClient";

/* ═══════════ styled shells ═══════════ */
const Screen = styled.div`
  min-height: 100vh;
  /* background: radial-gradient(
      circle at top left,
      ${(p) => p.theme.palette.action.hover} 0%,
      transparent 50%
    ),
    ${(p) => p.theme.palette.background.default}; */
  background-color: #f1f1f1;
  padding-bottom: 5vh;
`;

const Container = styled(motion.main)`
  max-width: 90vw;
  margin: 0 auto;
  padding: ${(p) => p.theme.spacing(4)}px ${(p) => p.theme.spacing(3)}px;
  color: ${(p) => p.theme.palette.text.primary};
`;

const pageAnim = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DashboardPage() {
  /* demo: load “flat” projects for search/filter later (optional) */
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [customers, setCustomers] = useState([])

  /* search is no longer used in TopBar; kept here if you re-add */
  const [search] = useState("");

  /* theme toggle */
  const { toggle } = useContext(ThemeModeContext);
  const username = UserService.getUsername();

  /* mock fetch of flat projects (can delete if unused) */
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      try {
        let { data } = await httpClient.get("https://boqmasteradmin.com/main/api/customers/")
        setCustomers(data.results)
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, []);

  return (
    <Screen>
      <TopBar
        user={username}
        onToggleTheme={toggle}
        mode={undefined /* styled-components theme hook in TopBar */}
        onLogout={UserService.doLogout}
      />
      <Container variants={pageAnim} initial="hidden" animate="visible">
        {/* top bar */}

        {/* KPI strip */}
        <KpiHeader customers={customers} />

        {/* Browse projects by company */}
        <ProjectBrowserSection customers={customers} />
      </Container>
    </Screen>
  );
}
