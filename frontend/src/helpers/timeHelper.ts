import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getHourInSarajevoTimezone = (date: Date) => {
  const sarajevoTime = dayjs(date).tz('Europe/Sarajevo');
  return sarajevoTime.hour();
};

export const isStartAfterTheEnd = (start: Date, end: Date) => {
  const startInCorrectTimezone = getHourInSarajevoTimezone(start);
  const endInCorrectTimezone = getHourInSarajevoTimezone(end);

  return endInCorrectTimezone <= startInCorrectTimezone
}

export const formatTime = (dateString: string) => dayjs(dateString).format('DD.MM.YYYY. HH:mm')
