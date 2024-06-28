/*import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl"; sostituito sta riga */
import React from "react";
import { Link } from "react-router-dom";
import BreadcrumbEl from "../breadcrumb/BreadcrumbEl";
import "./breadcrumb.scss";

interface IProps extends React.PropsWithChildren {}

const Breadcrumb: React.FC<IProps> = ({ children }) => (
  <div className="breadcrumb">
    <ul>
      <BreadcrumbEl>
        <Link to="/">Home</Link>
      </BreadcrumbEl>
      {children}
    </ul>
  </div>
);

export default Breadcrumb;
