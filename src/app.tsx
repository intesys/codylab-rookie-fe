import Layout from "@components/Layout/layout";
import { customTheme } from "@config/themeStyle";
import { MaterialProvider } from "@context/MaterialProvider";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./app.scss";

const App: React.FC = () => (
  <ThemeProvider theme={customTheme}>
    <div className="__show-structure">
      <MaterialProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider maxSnack={3} autoHideDuration={2000} data-cy="snackbar">
            <BrowserRouter>
              <Layout>
                <AppRoutes />
              </Layout>
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      </MaterialProvider>
    </div>
  </ThemeProvider>
);

export default App;
