import React from "react";
import { Link } from "react-router-dom";

const MainMenu: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/patients">Patients database</Link>
      </li>
      <li>
        <Link to="/staff">Colleagues database</Link>
      </li>
      <li>
        <Link to="/pharmacy">Pharmacy</Link>
      </li>
      <li>
        <Link to="/ward">Ward</Link>
      </li>
      <li>
        <Link to="/billing">Billing</Link>
      </li>
      <li>
        <Link to="/news">News</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
function matchRoutes(routes: any, location: any): [{ route: any }] {
  throw new Error("Function not implemented.");
}
