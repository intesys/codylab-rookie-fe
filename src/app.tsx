import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./app.scss";
import Layout from "./components/Layout/Layout";
import { customTheme } from "./config/themeStyle";
import { MaterialProvider } from "./lib/MaterialProvider";

const App: React.FC = () => (
  <ThemeProvider theme={customTheme}>
    <div className="__show-structure">
      <MaterialProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </MaterialProvider>
    </div>
  </ThemeProvider>
);

export default App;
