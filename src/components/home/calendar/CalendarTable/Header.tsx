// import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CalendarContext } from "@components/Home/Calendar";
import { monthName } from "@components/Home/Calendar/utils";
import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import "./Header.scss";

const Header: React.FC = () => {
  const { date, dispatch } = useContext(CalendarContext);
  const prevMonth = () => dispatch({ type: "PREV_MONTH" });
  const nextMonth = () => dispatch({ type: "NEXT_MONTH" });
  return (
    <Grid container spacing={4} className="calendar__navigation">
      <Grid item xs={6} className="calendar__navigation__date">
        {monthName(date)} {date.getFullYear()}
      </Grid>
      <Grid item xs={6} className="calendar__navigation__buttons">
        <Button onClick={prevMonth}>{/* <ChevronLeft /> */}</Button>
        <Button onClick={nextMonth}>{/* <ChevronRight /> */}</Button>
      </Grid>
    </Grid>
  );
};

export default Header;
