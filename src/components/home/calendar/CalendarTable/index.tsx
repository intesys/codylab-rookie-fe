import Header from "@components/Home/Calendar/CalendarTable/Header";
import SelectedDate from "@components/Home/Calendar/CalendarTable/SelectedDate";
import Table from "@components/Home/Calendar/CalendarTable/Table";
import { Grid } from "@mui/material";
import React from "react";

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
