import Calendar from "@components/Home/Calendar";
import CallToActions from "@components/Home/CallToActions";
import MaterialList from "@components/Home/Materials/MaterialList";
import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import "./index.scss";

const Home: React.FC = () => {
  return (
    <div className="home" data-cy="home-page">
      <Box textAlign="center">
        <Typography variant="h5" data-cy="welcome-message">
          Welcome{" "}
          <Typography variant="h5" color="primary" component="span" data-cy="welcome-user-name">
            Mario Rossi
          </Typography>
        </Typography>
      </Box>
      <CallToActions />

      <Grid container spacing={4} className="home__row home__main">
        <Grid item xs={6}>
          <Typography variant="overline" fontSize="medium" data-cy="materials-section-title">
            Materials are running out
          </Typography>
          <Card data-cy="materials-section">
            <MaterialList />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="overline" fontSize="medium" data-cy="calendar-section-title">
            Calendar
          </Typography>
          <Card data-cy="calendar-section">
            <Calendar />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
