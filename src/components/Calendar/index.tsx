import { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import CalendarMonthHeader from './CalendarMonthHeader';
import CalendarWeekHeader from './CalendarWeekHeader';
import CalendarMonthBody from './CalendarMonthBody';
import CalendarWeekBody from './CalendarWeekBody';
import ScheduleSaveModal from '../ScheduleSaveModal';

import { CalendarDate, DaySchedule } from '../../types/calendarTypes';
import { getMonthDates, getWeekDates } from '../../utils/dateUtils';
import styles from './Calendar.module.css';

interface CalendarProps {
  daySchedules: DaySchedule[];
  onChangeDaySchedule: (daySchdule: DaySchedule) => void;
  onDeleteDaySchedule: (daySchdule: DaySchedule) => void;
}

// 캘린더 컴포넌트
const Calendar = ({ daySchedules, onChangeDaySchedule, onDeleteDaySchedule }: CalendarProps) => {
  // 해당 월 달력 정보
  const [monthDates, setMonthDates] = useState<CalendarDate[][]>([]);
  // 해당 주 달력 정보
  const [weekDates, setWeekDates] = useState<CalendarDate[]>([]);
  // 해당 월 정보
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  // 해당 주정보
  const [currenWeek, setCurrentWeek] = useState<Moment>(moment().startOf('week'));
  // 선택 스케줄 정보
  const [selectDaySchedule, setSelectDaySchedule] = useState<DaySchedule>({
    scheduleNo: 0,
    title: '',
    startDate: moment(),
    endDate: moment(),
    startTime: '00:00',
    endTime: '23:30',
  });
  // 추가수정 모달 표출 여부
  const [isSaveModal, setIsSaveModal] = useState<boolean>(false);
  const [calendarType, setCalendarType] = useState<string>('month');

  // 선택 현재 월 정보가 변경 될경우
  useEffect(() => {
    setMonthDates(getMonthDates(currentDate));
  }, [currentDate]);

  // 현재 주 정보가 변경 될 경우
  useEffect(() => {
    setWeekDates(getWeekDates(currenWeek));
  }, [currenWeek]);

  // 달력 월 변경 이벤트
  const handleMonthChange = (changeDate: Moment) => {
    if (calendarType === 'month') {
      setCurrentDate(changeDate);
    } else {
      setCurrentWeek(changeDate);
    }
  };

  // 일정 추가 및 달력 수정 모달 표출 이벤트
  const handleSaveModalOpen = (daySchedule: DaySchedule) => {
    setSelectDaySchedule(daySchedule);
    setIsSaveModal(true);
  };

  // 일정 추가 및 달력 수정 종료 클릭 이벤트
  const handleSaveModalClose = () => {
    setIsSaveModal(false);
  };

  // 달력 월/주 변경
  const handleCalendarTypeChange = (type: string) => {
    setCalendarType(type);
  };

  // 일정 추가 및 수정 이벤트
  const handleDayScheduleChange = (daySchedule: DaySchedule) => {
    let saveDaySchedule = daySchedule;

    // 신규 생성 일정
    if (daySchedule.scheduleNo === 0) {
      saveDaySchedule = {
        ...daySchedule,
        scheduleNo: daySchedules.length + 1,
      };
    }
    onChangeDaySchedule(saveDaySchedule);
    setIsSaveModal(false);
  };

  // 일정 삭제 이벤트
  const handleDayScheduleDelete = (daySchedule: DaySchedule) => {
    onDeleteDaySchedule(daySchedule);
    setIsSaveModal(false);
  };

  return (
    <div className={styles.wrapper}>
      {calendarType === 'month' ? (
        <>
          <CalendarMonthHeader
            monthDate={currentDate}
            calendarType={calendarType}
            onChangeMonth={handleMonthChange}
            onChangeCalendarType={handleCalendarTypeChange}
          />
          <CalendarMonthBody
            monthDates={monthDates}
            daySchedules={daySchedules}
            onClickDaySchedule={handleSaveModalOpen}
          />
        </>
      ) : (
        <>
          <CalendarWeekHeader
            weekDate={currenWeek}
            calendarType={calendarType}
            onChangeWeek={handleMonthChange}
            onChangeCalendarType={handleCalendarTypeChange}
          />
          <CalendarWeekBody weekDates={weekDates} daySchedules={daySchedules} />
        </>
      )}

      {isSaveModal && (
        <ScheduleSaveModal
          daySchedules={daySchedules}
          daySchedule={selectDaySchedule}
          onClickSave={handleDayScheduleChange}
          onClickDelete={handleDayScheduleDelete}
          onClickSaveCancle={handleSaveModalClose}
        />
      )}
    </div>
  );
};

export default Calendar;
