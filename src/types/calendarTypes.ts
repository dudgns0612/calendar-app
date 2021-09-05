import { Moment } from 'moment';

export type MonthDates = {
  date: Moment;
  dayStr: string;
  isToday: boolean;
  isCurrentMonth: boolean;
};

export type DaySchedule = {
  scheduleNo: number;
  title: string;
  startDate: Moment;
  endDate: Moment;
  startTime: string;
  endTime: string;
  color?: string;
};
