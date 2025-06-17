import React from "react";
import styled, { useTheme } from "styled-components";
import {
  Drawer,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* ─────────────────  styled shells  ───────────────── */
const Wrap = styled.div`
  width: 380px;
  max-width: 90vw;
  padding: ${(p) => p.theme.spacing(3)}px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing(2)}px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: ${(p) => p.theme.spacing(1)}px;
  & > span {
    flex: 0 0 110px;
    font-weight: 500;
    opacity: 0.7;
  }
`;

/* helper for status colour */
const statusChip = (progress) =>
  progress >= 100
    ? ["Completed", "success"]
    : progress > 0
    ? ["In-Progress", "warning"]
    : ["Not Started", "default"];

/* ─────────────────  component  ───────────────── */
export default function ProjectDrawer({ open, onClose, project }) {
  const theme = useTheme();

  if (!project) return <></>;

  const [statusLabel, statusColor] = statusChip(project.progress);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Wrap>
        {/* header */}
        <HeaderRow>
          <Typography variant="h6" component="h2">
            {project.projectName}
          </Typography>
          <IconButton size="small" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </HeaderRow>

        {/* meta info */}
        <InfoRow>
          <span>Customer</span>
          <Typography variant="body2">
            {project.customerName || project.customer}
          </Typography>
        </InfoRow>
        <InfoRow>
          <span>Tender</span>
          <Typography variant="body2">{project.tender}</Typography>
        </InfoRow>
        <InfoRow>
          <span>Quotation</span>
          <Typography variant="body2">{project.quotation}</Typography>
        </InfoRow>

        {/* status chip & progress bar */}
        <Box sx={{ mb: 2 }}>
          <Chip
            label={statusLabel}
            color={statusColor}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {project.progress}% complete
          </Typography>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  project.progress >= 100
                    ? theme.palette.success.main
                    : project.progress > 0
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
              },
            }}
          />
        </Box>

        <Divider />

        {/* panel list */}
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          LT Panels ({project.panels?.length || 0})
        </Typography>

        <List dense sx={{ flexGrow: 1, overflowY: "auto" }}>
          {project.panels?.map((pl) => (
            <ListItem key={pl.id} disableGutters>
              <ListItemText
                primary={pl.panelName}
                secondary={`Type: ${pl.type}`}
              />
              <ListItemSecondaryAction>
                <Typography variant="caption" sx={{ mr: 1 }}>
                  {pl.progress}%
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {!project.panels?.length && (
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              No panels recorded.
            </Typography>
          )}
        </List>
      </Wrap>
    </Drawer>
  );
}
