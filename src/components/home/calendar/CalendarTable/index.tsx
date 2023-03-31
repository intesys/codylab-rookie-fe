import { Grid } from "@mui/material";
import React from "react";
import SelectedDate from "./SelectedDate";
import Header from "./header";
import Table from "./table";

const CalendarTable: React.FC = () => (
  <Grid container spacing={4}>
    <Grid item xs={4}>
      <SelectedDate />
    </Grid>
    <Grid item xs={8}>
      <Header />
      <Table />
    </Grid>
  </Grid>
);

export default CalendarTable;
