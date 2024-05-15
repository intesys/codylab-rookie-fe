import { Typography } from "@mui/material";
import React, { Dispatch, useReducer } from "react";

import Appointments from "@components/Home/Calendar/Appointments";
import CalendarTable from "@components/Home/Calendar/CalendarTable";
import Summary from "@components/Home/Calendar/Summary";
import { Action, dateReducer } from "@components/Home/Calendar/lib";
import AppointmentsProvider from "@context/AppointmentsProvider";
import "./index.scss";

interface ICalendarContext {
  date: Date;
  dispatch: Dispatch<Action>;
}

export const CalendarContext: React.Context<ICalendarContext> = React.createContext({
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
