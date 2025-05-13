import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#09193D" },
    secondary: { main: "#fff700" },
    background: { default: "#FFFFFF", paper: "#F9FAFB" },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
});
export default theme;
