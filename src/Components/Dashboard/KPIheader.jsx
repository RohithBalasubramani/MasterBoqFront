/* ────────────────────────────────────────────────────────────────
   KpiHeader  —  V2 “Classy” polish  ✦  Donut-chart upgrade
   ──────────────────────────────────────────────────────────────── */

import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Chip, LinearProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

/* ── NEW: Chart JS ─────────────────────────────────────────────── */
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
ChartJS.register(ArcElement, Tooltip, Legend);

/* ══════════ layout shell ══════════ */
const Wrap = styled(motion.section)`
  display: flex;
  gap: 2vw;
  margin: 1vh 0;
  height: 20vh;
  min-height: 200px;
  margin-bottom: 3vh;
`;

/* shared card */
const Card = styled(motion.div)`
  position: relative;
  padding: 2vh;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  backdrop-filter: blur(2px);
  color: ${(p) => p.theme.palette.text.primary};
  background: ${(p) =>
    p.gradient ||
    `linear-gradient(135deg, ${p.theme.palette.background.paper} 0%, ${p.theme.palette.background.default} 100%)`};
`;

/* sizes */
const RecentCard = styled(Card)`
  width: clamp(12vw, 14vw, 200px);
`;
const TotalCard = styled(Card)`
  width: clamp(12vw, 14vw, 200px);
`;
const CompanyCard = styled(Card)`
  width: clamp(24vw, 28vw, 420px);
`;
const ProgressCard = styled(Card)`
  flex: 1;
`;

/* helpers */
const FadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ══════════ component ══════════ */
export default function KpiHeader({ customers }) {
  const theme = useTheme();

  /* ── derive data ─────────────────────────────────────────────── */
  const projects = customers.flatMap((c) =>
    c.projects.map((p) => ({ ...p, customerName: c.name }))
  );
  const totalProjects = projects.length || 1;

  /* recent project */
  const recent =
    [...projects].sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
    )[0] || {};

  /* companies */
  const companyCount = customers.reduce(
    (acc, c) => ({ ...acc, [c.name]: c.projects.length }),
    {}
  );
  const topCompanies = Object.entries(companyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  /* overall buckets */
  const buckets = { completed: 0, inProgress: 0, notStarted: 0 };
  projects.forEach((p) => {
    if (p.progress >= 100) buckets.completed += 1;
    else if (p.progress > 0) buckets.inProgress += 1;
    else buckets.notStarted += 1;
  });

  /* progress-bar style */
  const barSx = (color) => ({
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.action.hover,
    "& .MuiLinearProgress-bar": { backgroundColor: color },
  });

  /* ── donut chart dataset / options (memoised) ──────────────── */
  const donutData = useMemo(
    () => ({
      labels: topCompanies.map(([name]) => name),
      datasets: [
        {
          data: topCompanies.map(([, count]) => count),
          backgroundColor: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
          ].slice(0, topCompanies.length),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }),
    [topCompanies, theme]
  );

  const donutOptions = useMemo(
    () => ({
      cutout: "65%", // “donut hole” size
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 12,
            usePointStyle: true,
            color: theme.palette.text.primary,
            padding: 16,
            font: { size: 13 },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.formattedValue}`,
          },
        },
      },
    }),
    [theme]
  );

  /* ─────────────────────────────────────────────────────────── */
  return (
    <Wrap
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="visible"
    >
      {/* recent */}
      <RecentCard
        variants={FadeIn}
        gradient={`linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`}
        style={{ color: theme.palette.primary.contrastText, padding: "1vh" }}
      >
        <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
          Recent Project
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
          {recent.projectName || "—"}
        </Typography>
        {recent.id && (
          <RouterLink
            to={`/`}
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              fontSize: 13,
              fontWeight: 500,
              color: theme.palette.primary.contrastText,
              opacity: 0.85,
              textDecoration: "none",
            }}
          >
            View →
          </RouterLink>
        )}
      </RecentCard>

      {/* total */}
      <TotalCard variants={FadeIn}>
        <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
          Total Projects
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.5 }}>
          {totalProjects}
        </Typography>
      </TotalCard>

      {/* top companies — DONUT CHART */}
      <CompanyCard variants={FadeIn}>
        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.85 }}>
          Top Companies
        </Typography>

        <Box sx={{ position: "relative", height: 140 }}>
          <Doughnut data={donutData} options={donutOptions} />
        </Box>
      </CompanyCard>

      {/* overall progress */}
      <ProgressCard variants={FadeIn}>
        <Typography variant="subtitle2" sx={{ opacity: 0.85, mb: 1 }}>
          Overall Progress ({totalProjects})
        </Typography>
        {[
          ["Completed", "completed", theme.palette.success.main],
          ["In-Progress", "inProgress", theme.palette.warning.main],
          ["Not Started", "notStarted", theme.palette.error.main],
        ].map(([label, key, color]) => {
          const pct = Math.round((buckets[key] / totalProjects) * 100);
          return (
            <Box key={key} sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">{label}</Typography>
                <Typography variant="body2">{pct}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={barSx(color)}
              />
            </Box>
          );
        })}
      </ProgressCard>
    </Wrap>
  );
}
