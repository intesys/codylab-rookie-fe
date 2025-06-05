import { Grid } from "@mui/material";
import React from "react";
import "./index.scss";

const informaticiUrl = new URL("../../../assets/informatici_senza_frontiere.png", import.meta.url);

interface IProps extends React.PropsWithChildren {}

const Footer: React.FC<IProps> = () => (
  <div className="layout-footer">
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <div className="layout-footer-content">
          <Grid container spacing={4}>
            <Grid item xs={4}>
              Open Hospital è un progetto di ISF 2005 - 2016 ISF © Informatici senza frontiere - ONLUS Viale IV
              Novembre, 100 - 31100 Treviso - Italy C.F. 94106980264
            </Grid>
            <Grid item xs={8} className="layout-footer__logo-informatici">
              <img src={informaticiUrl.href} alt="Informatici Senza Frontiere - Logo" />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  </div>
);

export default Footer;
