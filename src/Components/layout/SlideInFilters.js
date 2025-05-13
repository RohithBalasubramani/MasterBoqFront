import Drawer from "@mui/material/Drawer";
import { FilterList } from "@mui/icons-material";
import styled from "styled-components";

const Fab = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border: none;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
`;

export default function SlideInFilters({ open, onToggle, children }) {
  return (
    <>
      <Fab onClick={onToggle}>
        <FilterList />
      </Fab>
      <Drawer anchor="left" open={open} onClose={onToggle}>
        <div style={{ width: 320, padding: 16 }}>{children}</div>
      </Drawer>
    </>
  );
}
