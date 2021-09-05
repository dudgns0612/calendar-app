import { useState } from 'react';
import Calendar from './components/Calendar';

import { DaySchedule } from './types/calendarTypes';

function App() {
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([]);

  // 일정 추가 및 수정
  const handleDayScheduleChange = (daySchedule: DaySchedule) => {
    const updateDaySchedules = daySchedules.filter(
      (schedule) => daySchedule.scheduleNo !== schedule.scheduleNo
    );

    setDaySchedules([...updateDaySchedules, daySchedule]);
  };

  // 일정 삭제
  const handleDayScheduleCancle = (daySchedule: DaySchedule) => {
    const updateDaySchedules = daySchedules.filter(
      (schedule) => daySchedule.scheduleNo !== schedule.scheduleNo
    );

    setDaySchedules([...updateDaySchedules]);
  };

  return (
    <>
      <Calendar
        daySchedules={daySchedules}
        onChangeDaySchedule={handleDayScheduleChange}
        onDeleteDaySchedule={handleDayScheduleCancle}
      />
    </>
  );
}

export default App;
