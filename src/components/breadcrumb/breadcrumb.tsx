import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React from "react";
import { Link } from "react-router-dom";
import "./breadcrumb.scss";

interface IProps extends React.PropsWithChildren {}

const Breadcrumb: React.FC<IProps> = ({ children }) => (
  <div className="breadcrumb" data-cy="breadcrumb">
    <ul>
      <BreadcrumbEl>
        <Link to="/" data-cy="breadcrumb-home">
          Home
        </Link>
      </BreadcrumbEl>
      {children}
    </ul>
  </div>
);

export default Breadcrumb;
