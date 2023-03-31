import { Typography } from "@mui/material";
import React, { Dispatch, useReducer } from "react";
import Appointments from "./Appointments";
import AppointmentsProvider from "./AppointmentsProvider";
import CalendarTable from "./CalendarTable";
import "./index.scss";
import { Action, dateReducer } from "./lib";
import Summary from "./summary";

interface ICalendarContext {
  date: Date;
  dispatch: Dispatch<Action>;
}

export const CalendarContext: React.Context<ICalendarContext> =
  React.createContext({
    date: new Date(),
    dispatch: (action) => {},
  });

const Calendar: React.FC = () => {
  const [date, dispatch] = useReducer(dateReducer, new Date());
  const calendarContextValue = {
    date,
    dispatch,
  };

  return (
    <CalendarContext.Provider value={calendarContextValue}>
      <AppointmentsProvider>
        <div className="calendar">
          <CalendarTable />
          <Typography variant="overline">Appointments</Typography>
          <Appointments />
          <Typography variant="overline">Summary</Typography>
          <Summary />
        </div>
      </AppointmentsProvider>
    </CalendarContext.Provider>
  );
};

export default Calendar;
