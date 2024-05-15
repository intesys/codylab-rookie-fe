import {
  BILLING_PATH,
  DASHBOARD_PATH,
  DOCTORS_PATH,
  NEWS_PATH,
  PATIENTS_PATH,
  PHARMACY_PATH,
  WARD_PATH,
} from "@config/paths";
import React from "react";
import { Link } from "react-router-dom";

const MainMenu: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to={DASHBOARD_PATH}>Dashboard</Link>
      </li>
      <li>
        <Link to={PATIENTS_PATH}>Patients database</Link>
      </li>
      <li>
        <Link to={DOCTORS_PATH}>Doctors database</Link>
      </li>
      <li>
        <Link to={PHARMACY_PATH}>Pharmacy</Link>
      </li>
      <li>
        <Link to={WARD_PATH}>Ward</Link>
      </li>
      <li>
        <Link to={BILLING_PATH}>Billing</Link>
      </li>
      <li>
        <Link to={NEWS_PATH}>News</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
