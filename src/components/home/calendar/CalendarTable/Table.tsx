import { CalendarContext } from "@components/Home/Calendar";
import { CalendarTableData, IDay } from "@components/Home/Calendar/CalendarTable/lib";
import { week_subs } from "@components/Home/Calendar/utils";
import dayjs from "dayjs";
import React, { useContext } from "react";
import "./table.scss";

const Table: React.FC = () => {
  const { date, dispatch } = useContext(CalendarContext);
  const calendar = new CalendarTableData(date);

  const Day: React.FC<{ day: IDay }> = ({ day }) => {
    if (day.num === null) {
      return null;
    }
    let className = day.isToday ? "today" : "";

    const selected = dayjs(day.fullDate).isSame(date, "day");
    if (selected) {
      className += " selected";
    }

    const handleClick = () => {
      day.fullDate && dispatch({ type: "SET_DATE", payload: day.fullDate });
    };

    return (
      <div className={className} onClick={handleClick}>
        {day.num}
      </div>
    );
  };

  const Week: React.FC<{ days: IDay[] }> = ({ days }) => (
    <tr>
      {days.map((day: IDay, i) => (
        <td key={i}>
          <Day day={day} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="calendar__table">
      <table>
        <thead>
          <tr>
            {week_subs.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.table.map((weekDays, i) => (
            <Week key={i} days={weekDays} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
