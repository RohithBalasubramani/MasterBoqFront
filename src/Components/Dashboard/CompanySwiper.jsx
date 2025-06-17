import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Typography, Chip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SwiperWrap = styled.div`
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(p) => p.theme.spacing(2)}px;
`;

const Card = styled(motion.div)`
  width: 190px;
  height: 120px;
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: ${(p) => p.theme.spacing(2)}px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  background: ${(p) => p.theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
`;

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.8,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({
    x: dir < 0 ? 250 : -250,
    opacity: 0,
    scale: 0.8,
  }),
};

export default function CompanySwiper({ companies = [], onChange }) {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  const paginate = (dir) => {
    const newIdx = (index + dir + companies.length) % companies.length;
    setIndex(newIdx);
    onChange?.(companies[newIdx], newIdx);
  };

  return (
    <SwiperWrap>
      {/* arrows */}
      <IconButton
        size="small"
        onClick={() => paginate(-1)}
        sx={{ left: 8, position: "absolute" }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => paginate(1)}
        sx={{ right: 8, position: "absolute" }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* card */}
      <AnimatePresence custom={1}>
        <Card
          key={companies[index]?.id}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) paginate(1);
            else if (info.offset.x > 100) paginate(-1);
          }}
          style={{
            border: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {companies[index]?.name}
          </Typography>
          <Chip
            label={`${companies[index]?.projects?.length || 0} project${
              companies[index]?.projects?.length === 1 ? "" : "s"
            }`}
            color="secondary"
            size="small"
          />
        </Card>
      </AnimatePresence>
    </SwiperWrap>
  );
}
