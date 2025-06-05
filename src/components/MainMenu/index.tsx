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
    <ul data-cy="main-menu">
      <li>
        <Link to={DASHBOARD_PATH} data-cy="menu-dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to={PATIENTS_PATH} data-cy="menu-patients">
          Patients database
        </Link>
      </li>
      <li>
        <Link to={DOCTORS_PATH} data-cy="menu-doctors">
          Doctors database
        </Link>
      </li>
      <li>
        <Link to={PHARMACY_PATH} data-cy="menu-pharmacy">
          Pharmacy
        </Link>
      </li>
      <li>
        <Link to={WARD_PATH} data-cy="menu-ward">
          Ward
        </Link>
      </li>
      <li>
        <Link to={BILLING_PATH} data-cy="menu-billing">
          Billing
        </Link>
      </li>
      <li>
        <Link to={NEWS_PATH} data-cy="menu-news">
          News
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
