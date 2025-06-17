import React from "react";
import { Toolbar, Typography } from "@mui/material";

export default function ProjectToolbar({ count }) {
  return (
    <Toolbar sx={{ pl: 0 }}>
      <Typography variant="subtitle1">Projects ({count})</Typography>
    </Toolbar>
  );
}
