import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import Billing from "./components/Billing";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import News from "./components/News";
import Patient from "./components/Patient";
import Patients from "./components/Patients";
import Pharmacy from "./components/Pharmacy";
import Staff from "./components/Staff";
import StaffMember from "./components/StaffMember";
import Ward from "./components/Ward";
import { customTheme } from "./config/themeStyle";
import { MaterialProvider } from "./lib/MaterialProvider";

const App: React.FC = () => (
  <ThemeProvider theme={customTheme}>
    <div className="__show-structure">
      <MaterialProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<Patient />} />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/:id" element={<StaffMember />} />
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="ward" element={<Ward />} />
              <Route path="billing" element={<Billing />} />
              <Route path="news" element={<News />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MaterialProvider>
    </div>
  </ThemeProvider>
);

export default App;
