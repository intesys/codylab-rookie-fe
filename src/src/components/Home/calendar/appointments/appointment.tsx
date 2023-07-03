import { Grid } from "@mui/material";
import React from "react";
import { IAppointment } from "../AppointmentsProvider";

const Appointment: React.FC<IAppointment> = ({ hour, title, done }) => (
  <Grid container spacing={4} className="calendar__appointment_list__item">
    <Grid item xs={2} className="calendar__appointment_list__item__hour">
      {hour}
    </Grid>
    <Grid item xs={8} className="calendar__appointment_list__item__title">
      {title}
    </Grid>
    <Grid item xs={2} className="calendar__appointment_list__item__done">
      <input type="checkbox" checked={done} disabled />
    </Grid>
  </Grid>
);

export default Appointment;
