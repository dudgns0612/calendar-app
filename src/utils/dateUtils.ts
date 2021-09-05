import moment, { Moment } from 'moment';
import { CalendarDate } from '../types/calendarTypes';

// 선택 월 일 정보 계산 함수
export const getMonthDates = (monthDate: Moment): CalendarDate[][] => {
  const today = moment();
  const startWeek = monthDate.startOf('month').week();
  let endWeek = monthDate.endOf('month').week();
  endWeek = endWeek - startWeek > 4 ? endWeek : endWeek + 1;

  let isDecember = false;
  if (monthDate.format('MM') === '12') {
    isDecember = true;
  }

  const calendar = [];
  for (let week = startWeek; week <= (isDecember ? 52 : endWeek); week++) {
    const weekCalendar = [];
    for (let i = 0; i < 7; i++) {
      // 12월의 경우 다음년도로 계산 되는 문제 처리
      const date = isDecember
        ? monthDate.clone().add(-1, 'year').week(week).startOf('week').add(i, 'day')
        : monthDate.clone().week(week).startOf('week').add(i, 'day');
      const dayStr = date.format('D');
      const isToday = today.format('YYYYMMDD') === date.format('YYYYMMDD');
      const isCurrentMonth = date.format('MM') === monthDate.format('MM');

      weekCalendar.push({ date, dayStr, isToday, isCurrentMonth });
    }
    calendar.push(weekCalendar);
  }

  // 12월 일경우 다음년도로 계산
  if (isDecember) {
    const nextMonthDate = monthDate.clone().add(1, 'year');
    for (let week = 1; week <= endWeek; week++) {
      const weekCalendar = [];
      for (let i = 0; i < 7; i++) {
        const date = nextMonthDate.clone().week(week).startOf('week').add(i, 'day');
        const dayStr = date.format('D');
        const isToday = today.format('YYYYMMDD') === date.format('YYYYMMDD');
        const isCurrentMonth = date.format('MM') === monthDate.format('MM');

        weekCalendar.push({ date, dayStr, isToday, isCurrentMonth });
      }
      calendar.push(weekCalendar);
    }
  }

  return calendar;
};

// 선택 주간 월 일 정보
export const getWeekDates = (weekDate: Moment): CalendarDate[] => {
  const today = moment();

  const calendar = [];
  for (let i = 0; i < 7; i++) {
    const date = weekDate.clone().add(i, 'day');
    const dayStr = date.format('D');
    const isToday = today.format('YYYYMMDD') === date.format('YYYYMMDD');
    calendar.push({ date, dayStr, isToday });
  }

  return calendar;
};
