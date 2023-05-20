import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { HOME_PATH } from "../../../config/paths";
import MainMenu from "../../MainMenu";

const Menu: React.FC = () => (
  <Grid container spacing={0} className="layout-header-menu" justifyContent="center" alignItems="center">
    <Grid item xs={2} className="logo">
      <Link to={HOME_PATH}>
        <img src={logo} alt="open hospital" />
      </Link>
    </Grid>
    <Grid item xs={10} className="menu">
      <MainMenu />
    </Grid>
  </Grid>
);

export default Menu;
