import React from "react";
import { Drawer, Typography } from "@mui/material";

const ProjectDrawer = ({ open, onClose, project }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <div style={{ width: 300, padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {project?.projectName}
      </Typography>
      <Typography variant="body2" component="div" sx={{ mb: 1 }}>
        Customer: {project?.customer}
      </Typography>
      <Typography variant="body2">Tender: {project?.tender}</Typography>
      <Typography variant="body2">Quotation: {project?.quotation}</Typography>
    </div>
  </Drawer>
);

export default ProjectDrawer;
