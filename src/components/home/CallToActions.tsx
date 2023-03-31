import { Add, Search } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";

const CallToActions: React.FC = () => (
  <Grid container spacing={4} className="home__row home__call_to_actions">
    <Grid item xs={6} className="home__main_button_cell--right">
      <Button className="home__main_button home__main_button--active">
        <Add />
        Register new patient
      </Button>
    </Grid>
    <Grid item xs={6} className="home__main_button_cell--left">
      <Button className="home__main_button">
        <Search />
        Search for patients
      </Button>
    </Grid>
  </Grid>
);

export default CallToActions;
