import moment, { Moment } from 'moment';

import rightAllowIcon from '../../resources/images/right_allow.png';
import leftAllowIcon from '../../resources/images/left_allow.png';
import styles from './Calendar.module.css';

interface CalendarHeaderProps {
  monthDate: Moment;
  calendarType: string;
  onChangeMonth: (currentDate: Moment) => void;
  onChangeCalendarType: (type: string) => void;
}

// 캘린더 헤더 컴포넌트
const CalendarHeader = ({
  monthDate,
  calendarType,
  onChangeMonth,
  onChangeCalendarType,
}: CalendarHeaderProps) => (
  <div className={styles.header_wrap}>
    <div className={styles.today_wrap}>
      <button type="button" className={styles.today_button} onClick={() => onChangeMonth(moment())}>
        오늘
      </button>
    </div>
    <div className={styles.date_display_wrap}>
      <button type="button" onClick={() => onChangeMonth(monthDate.clone().add(-1, 'month'))}>
        <img src={leftAllowIcon} alt="이전 달력" />
      </button>
      <div>
        <span>{monthDate.format(`YYYY년 MM월`)}</span>
      </div>
      <button type="button" onClick={() => onChangeMonth(monthDate.clone().add(1, 'month'))}>
        <img src={rightAllowIcon} alt="다음 달력" />
      </button>
    </div>
    <div>
      <button
        type="button"
        className={`${styles.month_button} ${calendarType === 'month' ? `${styles.active}` : ''}`}
        onClick={() => onChangeCalendarType('month')}
      >
        월
      </button>
      <button
        type="button"
        className={`${styles.week_button} ${calendarType === 'week' ? `${styles.active}` : ''}`}
        onClick={() => onChangeCalendarType('week')}
      >
        주
      </button>
    </div>
  </div>
);

export default CalendarHeader;
