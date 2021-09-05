import moment, { Moment } from 'moment';

import rightAllowIcon from '../../resources/images/right_allow.png';
import leftAllowIcon from '../../resources/images/left_allow.png';
import styles from './Calendar.module.css';

interface CalendarWeekHeaderProps {
  weekDate: Moment;
  calendarType: string;
  onChangeWeek: (currentDate: Moment) => void;
  onChangeCalendarType: (type: string) => void;
}

// 캘린더 헤더 컴포넌트
const CalendarWeekHeader = ({
  weekDate,
  calendarType,
  onChangeWeek,
  onChangeCalendarType,
}: CalendarWeekHeaderProps) => (
  <div className={styles.header_wrap}>
    <div className={styles.today_wrap}>
      <button
        type="button"
        className={styles.today_button}
        onClick={() => onChangeWeek(moment().startOf('week'))}
      >
        오늘
      </button>
    </div>
    <div className={styles.date_display_wrap}>
      <button type="button" onClick={() => onChangeWeek(weekDate.clone().add(-1, 'week'))}>
        <img src={leftAllowIcon} alt="이전 주간" />
      </button>
      <div>
        <span>
          {`${weekDate.clone().startOf('day').format('YYYY년 MM월 DD일')} ~ ${weekDate
            .clone()
            .startOf('day')
            .add(6, 'day')
            .format('YYYY년 MM월 DD일')}`}
        </span>
      </div>
      <button type="button" onClick={() => onChangeWeek(weekDate.clone().add(1, 'week'))}>
        <img src={rightAllowIcon} alt="다음 주간" />
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

export default CalendarWeekHeader;
