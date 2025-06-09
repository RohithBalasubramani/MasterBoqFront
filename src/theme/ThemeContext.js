import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

export const ThemeModeContext = createContext({ toggle: () => {} });

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({ toggle: () => setMode((m) => (m === "light" ? "dark" : "light")) }),
    []
  );
  const theme = mode === "light" ? lightTheme : darkTheme;
  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
