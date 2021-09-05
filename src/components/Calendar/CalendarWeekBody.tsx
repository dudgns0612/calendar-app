import moment from 'moment';
import { CalendarDate, DaySchedule } from '../../types/calendarTypes';
import styles from './Calendar.module.css';

interface CalendarWeekBodyProps {
  weekDates: CalendarDate[];
  daySchedules: DaySchedule[];
}

interface WeekDaySchedule {
  date: DaySchedule;
}

const WeekDaySchedule = ({ date }: WeekDaySchedule) => (
  <div className={styles.week_day_schedule} style={{ backgroundColor: date.color }}>
    시간 : {date.startTime} - {date.endTime} <br />
    제목 : {date.title}
  </div>
);

// 캘린더 달력 표출 컴포넌트
const CalendarWeekBody = ({ weekDates, daySchedules }: CalendarWeekBodyProps) => (
  <div className={styles.body_wrap}>
    <table className={styles.date_table}>
      <thead>
        <tr className={styles.date_table_thead}>
          <td />
          {weekDates.map((date, index) => {
            const spanEl = <span className={`${date.isToday && styles.today}`}>{date.dayStr}</span>;

            if (index === 0) {
              return (
                <td key={index} className={styles.sunday_color}>
                  Sunday <br /> {spanEl}
                </td>
              );
            }
            if (index === weekDates.length - 1) {
              return (
                <td key={index} className={styles.saturday_color}>
                  Saturday <br /> {spanEl}
                </td>
              );
            }
            return (
              <td key={index}>
                Monday <br />
                {spanEl}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>오전 12:00</span>
          </td>
          {Array(7)
            .fill(0)
            .map((td, tdIndex) => (
              <td key={tdIndex}>
                {daySchedules
                  .filter(
                    (date) =>
                      date.startDate <=
                        moment(`${weekDates[tdIndex].date.format('YYYY-MM-DD')} 00:00`) &&
                      date.endDate >=
                        moment(`${weekDates[tdIndex].date.format('YYYY-MM-DD')} 00:00`)
                  )
                  .map((date, dateIndex) => (
                    <WeekDaySchedule key={dateIndex} date={date} />
                  ))}
              </td>
            ))}
        </tr>
        {Array(12)
          .fill(0)
          .map((item, index) => (
            <tr key={index}>
              <td>
                {index >= 9 ? (
                  <span>{`오전 ${index + 1}:00`}</span>
                ) : (
                  <span>{`오전 0${index + 1}:00`}</span>
                )}
              </td>
              {Array(7)
                .fill(0)
                .map((td, tdIndex) => (
                  <td key={tdIndex}>
                    {daySchedules
                      .filter(
                        (date) =>
                          date.startDate <=
                            moment(
                              `${weekDates[tdIndex].date.format('YYYY-MM-DD')} ${index + 1}:00`
                            ) &&
                          date.endDate >=
                            moment(
                              `${weekDates[tdIndex].date.format('YYYY-MM-DD')} ${index + 1}:00`
                            )
                      )
                      .map((date, dateIndex) => (
                        <WeekDaySchedule key={dateIndex} date={date} />
                      ))}
                  </td>
                ))}
            </tr>
          ))}
        {Array(12)
          .fill(0)
          .map((item, index) => (
            <tr key={index}>
              <td>
                {index >= 9 ? (
                  <span>{`오후 ${index + 1}:00`}</span>
                ) : (
                  <span>{`오후 0${index + 1}:00`}</span>
                )}
              </td>
              {Array(7)
                .fill(0)
                .map((td, tdIndex) => (
                  <td key={tdIndex}>
                    {daySchedules
                      .filter(
                        (date) =>
                          date.startDate <=
                            moment(
                              `${weekDates[tdIndex].date.format('YYYY-MM-DD')} ${index + 13}:00`
                            ) &&
                          date.endDate >=
                            moment(
                              `${weekDates[tdIndex].date.format('YYYY-MM-DD')} ${index + 13}:00`
                            )
                      )
                      .map((date, dateIndex) => (
                        <WeekDaySchedule key={dateIndex} date={date} />
                      ))}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default CalendarWeekBody;
