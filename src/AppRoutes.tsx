import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Billing from "./components/Billing";
import Home from "./components/Home";
import News from "./components/News";
import Patient from "./components/Patient";
import Patients from "./components/Patients";
import Pharmacy from "./components/Pharmacy";
import Staff from "./components/Staff";
import StaffMember from "./components/StaffMember";
import Ward from "./components/Ward";
import {
  BILLING_PATH,
  DASHBOARD_PATH,
  HOME_PATH,
  NEWS_PATH,
  PATIENTS_PATH,
  PHARMACY_PATH,
  STAFF_PATH,
  WARD_PATH,
} from "./config/paths";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME_PATH}>
        <Route index element={<Navigate to={DASHBOARD_PATH} />} />
        <Route path={DASHBOARD_PATH} element={<Home />} />
        <Route path={PATIENTS_PATH}>
          <Route index element={<Patients />} />
          <Route path=":id" element={<Patient />} />
          <Route path="new" element={<Patient />} />
          <Route path=":id/edit" element={<Patient />} />
          <Route path=":id/record/new" element={<Patient />} />
        </Route>
        <Route path={STAFF_PATH}>
          <Route index element={<Staff />} />
          <Route path=":id" element={<StaffMember />} />
        </Route>
        <Route path={PHARMACY_PATH} element={<Pharmacy />} />
        <Route path={WARD_PATH} element={<Ward />} />
        <Route path={BILLING_PATH} element={<Billing />} />
        <Route path={NEWS_PATH} element={<News />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
