import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled.div`
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

const getColor = (v, t) =>
  v >= 80
    ? t.palette.success.main
    : v >= 50
    ? t.palette.warning.main
    : t.palette.error.main;

export default function ProgressCell({ value }) {
  const theme = useTheme();
  return (
    <Wrap>
      <Bar>
        <BarFill
          style={{ background: getColor(value, theme) }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
        />
      </Bar>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {value}%
      </motion.span>
    </Wrap>
  );
}
