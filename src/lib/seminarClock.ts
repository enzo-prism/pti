import { calendarDayKeyInTimeZone, formatEventDateTime } from "@/lib/dateUtils";

/** Refresh the page's shared quote just after the next Pacific midnight. */
export const nextSeminarRefreshDelay = (now: Date): number => {
  const key = calendarDayKeyInTimeZone(now);
  const year = Math.floor(key / 10000);
  const month = Math.floor(key / 100) % 100;
  const day = key % 100;
  const tomorrow = new Date(Date.UTC(year, month - 1, day + 1));
  const label = tomorrow.toLocaleDateString("en-US", {
    timeZone: "UTC", year: "numeric", month: "long", day: "numeric",
  });
  const midnight = new Date(formatEventDateTime(label, { hours: 0, minutes: 0 }));
  return Math.max(25, midnight.getTime() - now.getTime() + 25);
};
