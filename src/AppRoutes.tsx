import DoctorDetail from "@components/Doctor/DoctorDetail";
import DoctorNew from "@components/Doctor/DoctorNew";
import Doctors from "@components/Doctors";
import Billing from "@components/billing";
import Home from "@components/home";
import News from "@components/news";
import Patient from "@components/patient";
import Patients from "@components/patients";
import Pharmacy from "@components/pharmacy";
import Ward from "@components/ward";
import {
  BILLING_PATH,
  DASHBOARD_PATH,
  DOCTORS_PATH,
  HOME_PATH,
  NEWS_PATH,
  PATIENTS_PATH,
  PHARMACY_PATH,
  WARD_PATH,
} from "@config/paths";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME_PATH}>
        <Route index element={<Navigate to={DASHBOARD_PATH} />} />
        <Route path={DASHBOARD_PATH} element={<Home />} />
        <Route path={PATIENTS_PATH}>
          <Route index element={<Patients />} />
          <Route path=":id" element={<Patient />} />
          {/* <Route path="new" element={<PatientNew />} />
          <Route path=":id/edit" element={<PatientEdit />} />
          <Route path={`:id/${PATIENTS_RECORDS_PATH}/new`} element={<PatientRecordNew />} /> */}
        </Route>
        <Route path={DOCTORS_PATH}>
          <Route index element={<Doctors />} />
          <Route path=":id" element={<DoctorDetail />} />
          <Route path="new" element={<DoctorNew />} />
          {/* <Route path=":id/edit" element={<DoctorEdit />} />
          <Route path="new" element={<DoctorNew />} /> */}
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
