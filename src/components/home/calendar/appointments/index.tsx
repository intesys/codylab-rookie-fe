import dayjs from "dayjs";
import React, { useContext } from "react";
import { CalendarContext } from "..";
import { AppointmentsContext, IAppointment } from "../AppointmentsProvider";
import Appointment from "./Appointment";
import "./index.scss";

const Appointments: React.FC = () => {
  const { date } = useContext(CalendarContext);
  const appointments = useContext(AppointmentsContext);
  const selectedDate = dayjs(date).format("YYYY-MM-DD");
  const list = appointments?.[selectedDate] || [];
  return (
    <div className="calendar__appointment_list">
      {list.map((appointment: IAppointment) => (
        <Appointment {...appointment} key={appointment.id} />
      ))}
    </div>
  );
};

export default Appointments;
