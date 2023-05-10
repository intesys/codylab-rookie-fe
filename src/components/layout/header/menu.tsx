import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import MainMenu from "../../MainMenu";

const Menu: React.FC = () => (
  <Grid
    container
    spacing={0}
    className="layout-header-menu"
    // direction="row"
    justifyContent="center"
    alignItems="center"
  >
    <Grid item xs={2} className="logo">
      <Link to="/">
        <img src={logo} alt="open hospital" />
      </Link>
    </Grid>
    <Grid item xs={10} className="menu">
      <MainMenu />
    </Grid>
  </Grid>
);

export default Menu;
