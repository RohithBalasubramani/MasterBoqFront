import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const Grid = styled.div`
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

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function KpiCards({ kpis }) {
  return (
    <Grid>
      {kpis.map(({ label, value }) => (
        <Card key={label} variants={itemVariants}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Card>
      ))}
    </Grid>
  );
}
