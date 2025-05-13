// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./store";

import UserService from "./Services/UserService";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import ErrorBoundary from "./Components/ErrorBoundary";

//Initialize Keycloak before anything else
UserService.initKeycloak();

// 2) Create your React-Query client
const queryClient = new QueryClient();

// 3) Grab the root DOM node
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            {/* Normalize & reset MUI styles */}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);

// 4) Web vitals (optional)
reportWebVitals();
