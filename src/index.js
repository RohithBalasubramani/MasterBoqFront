// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "@fontsource/inter/variable.css";
import { Provider } from "react-redux";
import store from "./store";

import UserService from "./Services/UserService";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeModeProvider } from "./theme/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorBoundary from "./Components/ErrorBoundary";

//Initialize Keycloak before anything else

// 2) Create your React-Query client
const queryClient = new QueryClient();

// 3) Grab the root DOM node
const container = document.getElementById("root");
const root = () => createRoot(container).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeModeProvider>
            {/* Normalize & reset MUI styles */}
            <CssBaseline />
            <App />
          </ThemeModeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);

UserService.initKeycloak(root)

// 4) Web vitals (optional)
reportWebVitals();
