import { format, isValid, parse } from "date-fns";

const EVENT_DATE_FORMAT = "MMMM d, yyyy";
const EVENT_DATE_PARSE_REFERENCE = new Date(2000, 0, 1);

/**
 * PTI's calendar runs on Pacific time. Servers (Vercel, CI) run in UTC and
 * visitors can be anywhere, so "today" and event wall-clock times are always
 * resolved in this zone rather than the process or browser zone.
 */
export const BUSINESS_TIME_ZONE = "America/Los_Angeles";

const pad = (value: number, length = 2) => String(value).padStart(length, "0");

const dayKey = (year: number, month: number, day: number) =>
  year * 10000 + month * 100 + day;

/** Numeric YYYYMMDD key for the calendar day of `instant` in `timeZone`. */
export const calendarDayKeyInTimeZone = (
  instant: Date,
  timeZone: string = BUSINESS_TIME_ZONE
): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(instant);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return dayKey(read("year"), read("month"), read("day"));
};

/** Numeric YYYYMMDD key for an event display date such as "October 2, 2026". */
const eventDayKey = (dateString: string): number => {
  const date = parseEventDate(dateString);
  return dayKey(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

/**
 * Parse a date string as a local date to avoid timezone issues
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object in local timezone
 */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    throw new RangeError(`Invalid local date: ${dateString}`);
  }

  return parsedDate; // month is 0-indexed
};

/**
 * Format a date string for display, treating it as a local date
 * @param dateString - Date string in YYYY-MM-DD format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatLocalDate = (
  dateString: string, 
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string => {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString('en-US', options);
};

/**
 * Parse event date strings in various formats
 * @param dateString - Date string like "March 28, 2025" or "August 27, 2025"
 * @returns Date object
 */
export const parseEventDate = (dateString: string): Date => {
  const parsedDate = parse(
    dateString.trim(),
    EVENT_DATE_FORMAT,
    EVENT_DATE_PARSE_REFERENCE
  );

  if (
    !isValid(parsedDate) ||
    format(parsedDate, EVENT_DATE_FORMAT) !== dateString.trim()
  ) {
    throw new RangeError(
      `Invalid event date "${dateString}". Expected a real date formatted as "${EVENT_DATE_FORMAT}".`
    );
  }

  return parsedDate;
};

/**
 * Check if an event date is in the past, comparing calendar days in Pacific
 * time so the answer does not depend on the server or browser time zone.
 * @param dateString - Date string to check
 * @returns true if the date is in the past
 */
export const isEventPast = (
  dateString: string,
  referenceDate: Date = new Date()
): boolean =>
  eventDayKey(dateString) < calendarDayKeyInTimeZone(referenceDate);

/** True once the Pacific calendar day after `isoDate` (YYYY-MM-DD) has begun. */
export const isLocalDatePast = (
  isoDate: string,
  referenceDate: Date = new Date()
): boolean => {
  const date = parseLocalDate(isoDate);
  return (
    dayKey(date.getFullYear(), date.getMonth() + 1, date.getDate()) <
    calendarDayKeyInTimeZone(referenceDate)
  );
};

/** An event remains current for the full Pacific calendar day on which it occurs. */
export const isEventUpcoming = (
  dateString: string,
  referenceDate: Date = new Date()
): boolean => !isEventPast(dateString, referenceDate);

/** Sort event-style display dates in ascending chronological order. */
export const sortEventDates = <T extends { date: string }>(events: T[]): T[] =>
  [...events].sort(
    (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
  );

export interface ClockTime {
  hours: number;
  minutes: number;
}

const parseClockTime = (value: string): ClockTime | undefined => {
  const match = value.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return undefined;

  let hours = Number.parseInt(match[1], 10);
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return undefined;

  return { hours, minutes };
};

/**
 * Parse an event time label such as "8:00 AM - 3:00 PM" into start/end clock
 * times. Only a dash separates a range; "5:30 PM PT • 8:30 PM ET" lists one
 * moment in two zones, so it yields a start time only.
 */
export const parseEventTimeRange = (
  time?: string
): { start?: ClockTime; end?: ClockTime } => {
  if (!time) return {};
  const [startLabel, endLabel] = time.split(/\s+[-–—]\s+/);
  const start = parseClockTime(startLabel);
  const end = start && endLabel ? parseClockTime(endLabel) : undefined;
  return { start, end };
};

const offsetMinutesInTimeZone = (instant: Date, timeZone: string): number => {
  const label =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
      .formatToParts(instant)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = label.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
};

const formatOffset = (offsetMinutes: number) => {
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absolute = Math.abs(offsetMinutes);
  return `${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
};

/**
 * Format an event date for schema.org: a date-only ISO string when no clock
 * time is known, otherwise the local wall time with that zone's UTC offset on
 * that date (e.g. "2026-10-02T08:00:00-07:00").
 */
export const formatEventDateTime = (
  dateString: string,
  clock?: ClockTime,
  timeZone: string = BUSINESS_TIME_ZONE
): string => {
  const date = parseEventDate(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const isoDate = `${pad(year, 4)}-${pad(month)}-${pad(day)}`;

  if (!clock) return isoDate;

  // Read the wall time as UTC for a first offset guess, then re-read the
  // offset at the corrected instant so days with a DST change resolve right.
  const wallTimeAsUtc = Date.UTC(year, month - 1, day, clock.hours, clock.minutes);
  const firstGuess = offsetMinutesInTimeZone(new Date(wallTimeAsUtc), timeZone);
  const offsetMinutes = offsetMinutesInTimeZone(
    new Date(wallTimeAsUtc - firstGuess * 60_000),
    timeZone
  );

  return `${isoDate}T${pad(clock.hours)}:${pad(clock.minutes)}:00${formatOffset(offsetMinutes)}`;
};

/**
 * Create a unique key for an event date to prevent duplicates
 * @param date - Date string
 * @param time - Time string
 * @param location - Location string
 * @returns Unique key string
 */
export const createEventDateKey = (date: string, time: string, location: string): string => {
  return `${date}|${time}|${location}`;
};
