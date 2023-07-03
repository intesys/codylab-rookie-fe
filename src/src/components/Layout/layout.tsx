import { Grid } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import Body from "./body";
import Footer from "./footer";
import "./layout.scss";

interface IProps extends React.PropsWithChildren {}

const Layout: React.FC<IProps> = ({ children }) => (
  <div className="layout">
    <Grid container spacing={4} className="layout__no-margin">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Body>{children}</Body>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  </div>
);

export default Layout;
