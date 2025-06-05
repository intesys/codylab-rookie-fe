import MainMenu from "@components/MainMenu";
import { HOME_PATH } from "@config/paths";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const logoUrl = new URL("../../../assets/logo.png", import.meta.url);

const Menu: React.FC = () => (
  <Grid container spacing={0} className="layout-header-menu" justifyContent="center" alignItems="center">
    <Grid item xs={2} className="logo">
      <Link to={HOME_PATH}>
        <img src={logoUrl.href} alt="open hospital" />
      </Link>
    </Grid>
    <Grid item xs={10} className="menu">
      <MainMenu />
    </Grid>
  </Grid>
);

export default Menu;
