import React from "react";
import { Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProjectDrawer = ({ open, onClose, project }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <div style={{ width: 320, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          {project?.projectName}
        </Typography>
        <IconButton size="small" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <Typography variant="body2" component="div" sx={{ mb: 1 }}>
        Customer: {project?.customer}
      </Typography>
      <Typography variant="body2">Tender: {project?.tender}</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Quotation: {project?.quotation}
      </Typography>
      <Typography variant="body2">Panels: {project?.panels}</Typography>
      <Typography variant="body2">Progress: {project?.progress}%</Typography>
    </div>
  </Drawer>
);

export default ProjectDrawer;
