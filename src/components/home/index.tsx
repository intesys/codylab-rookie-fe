import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import CallToActions from "./CallToActions";
import MaterialList from "./Materials/MaterialList";
import Calendar from "./calendar";
import "./index.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Box textAlign="center">
        <Typography variant="h5">
          Welcome{" "}
          <Typography variant="h5" color="primary" component="span">
            Mario Rossi
          </Typography>
        </Typography>
      </Box>
      <CallToActions />

      <Grid container spacing={4} className="home__row home__main">
        <Grid item xs={6}>
          <Typography variant="overline" fontSize="medium">
            Materials are running out
          </Typography>
          <Card>
            <MaterialList />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="overline" fontSize="medium">
            Calendar
          </Typography>
          <Card>
            <Calendar />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
