import React from "react";
import "./breadcrumb.scss";

interface IProps extends React.PropsWithChildren {}

const Breadcrumb: React.FC<IProps> = ({ children }) => (
  <div className="breadcrumb">
    <ul>{children}</ul>
  </div>
);

export default Breadcrumb;
