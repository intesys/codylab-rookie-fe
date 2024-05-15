import { CalendarContext } from "@components/Home/Calendar";
import { isToday } from "@components/Home/Calendar/utils";
import dayjs from "dayjs";
import React, { useContext } from "react";
import "./selected_date.scss";

const SelectedDate: React.FC = () => {
  const { date } = useContext(CalendarContext);
  return (
    <div className="calendar__selected_date">
      {isToday(date) ? <div className="calendar__selected_date__is_today">Today</div> : null}
      <div className="calendar__selected_date__selected_date">
        {dayjs(date).format("MMMM D")}
        <br /> {dayjs(date).format("dddd")}
        <br /> {dayjs(date).format("YYYY")}
      </div>
    </div>
  );
};

export default SelectedDate;
