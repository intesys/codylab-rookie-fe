import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import CallToActions from "./CallToActions";
import MaterialList from "./Materials/MaterialList";
import Calendar from "./calendar";
import "./index.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Breadcrumb>
        <BreadcrumbEl>Home</BreadcrumbEl>
      </Breadcrumb>

      <CallToActions />

      <Grid container spacing={4} className="home__row home__main">
        <Grid item xs={6}>
          <Typography variant="overline">Materials are running out</Typography>
          <Card>
            <MaterialList />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="overline">Calendar</Typography>
          <Card>
            <Calendar />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
