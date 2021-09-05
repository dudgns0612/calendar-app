import { MonthDates, DaySchedule } from '../../types/calendarTypes';

import styles from './Calendar.module.css';

interface CalendarBodyProps {
  monthDates: MonthDates[][];
  daySchedules: DaySchedule[];
  onClickDaySchedule: (daySchedule: DaySchedule) => void;
}

// 캘린더 달력 표출 컴포넌트
const CalendarBody = ({ monthDates, daySchedules, onClickDaySchedule }: CalendarBodyProps) => {
  const handleScheduleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    schedule: DaySchedule
  ) => {
    e.stopPropagation();
    onClickDaySchedule(schedule);
  };

  return (
    <div className={styles.body_wrap}>
      <table className={styles.date_table}>
        <thead>
          <tr className={styles.date_table_thead}>
            <td>Sunday</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
          </tr>
        </thead>
        <tbody>
          {monthDates.map((month, monthIndex) => (
            <tr key={monthIndex}>
              {month.map((date, dateIndex) => (
                <td key={dateIndex}>
                  <div
                    className={styles.data_table_day}
                    onClick={() =>
                      onClickDaySchedule({
                        scheduleNo: 0,
                        title: '',
                        startDate: date.date,
                        endDate: date.date,
                        startTime: '00:00',
                        endTime: '23:30',
                      })
                    }
                  >
                    {date.isToday ? (
                      <span className={styles.today}>{date.dayStr}</span>
                    ) : (
                      <span className={`${date.isCurrentMonth ? styles.current_month_day : ''}`}>
                        {date.dayStr}
                      </span>
                    )}
                    <div className={styles.day_schedule}>
                      {daySchedules
                        .filter(
                          (schedule) =>
                            schedule.startDate.clone().startOf('day') <= date.date &&
                            date.date <= schedule.endDate.clone().startOf('day')
                        )
                        .sort(
                          (a, b) =>
                            Number(a.startTime.replace(':', '')) -
                            Number(b.startTime.replace(':', ''))
                        )
                        .map((schedule) => (
                          <div
                            key={schedule.scheduleNo}
                            className={styles.day_schedule_item}
                            style={{ backgroundColor: schedule.color }}
                            onClick={(e) => handleScheduleClick(e, schedule)}
                          >
                            {schedule.title}
                          </div>
                        ))}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarBody;
