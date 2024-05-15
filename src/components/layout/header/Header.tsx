import Menu from "@components/Layout/Header/Menu";
import Toolbar from "@components/Layout/Header/Toolbar";
import { Container } from "@mui/material";
import React from "react";
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
