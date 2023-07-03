import { Container } from "@mui/material";
import React from "react";
import Menu from "./Menu";
import Toolbar from "./Toolbar";
import "./header.scss";

const Header: React.FC = () => (
  <div className="layout-header">
    <Container>
      <Toolbar />
      <Menu />
    </Container>
  </div>
);

export default Header;
