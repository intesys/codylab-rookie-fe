import React from "react";
import Menu from "./Menu";
import "./index.scss";

const Header: React.FC = () => (
  <div className="layout-header">
    {/* <Toolbar /> */}
    <Menu />
  </div>
);

export default Header;
