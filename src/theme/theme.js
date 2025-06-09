import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#09193D" },
    secondary: { main: "#fff700" },
    background: { default: "#FFFFFF", paper: "#F9FAFB" },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  typography: { fontFamily: "Lexend, sans-serif" },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff700" },
    secondary: { main: "#09193D" },
    background: { default: "#121212", paper: "#1d1d1d" },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  typography: { fontFamily: "Lexend, sans-serif" },
});

export { lightTheme, darkTheme };
export default lightTheme;
