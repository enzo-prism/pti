import { format, isValid, parse, startOfDay } from "date-fns";

const EVENT_DATE_FORMAT = "MMMM d, yyyy";
const EVENT_DATE_PARSE_REFERENCE = new Date(2000, 0, 1);

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
 * Check if an event date is in the past
 * @param dateString - Date string to check
 * @returns true if the date is in the past
 */
export const isEventPast = (
  dateString: string,
  referenceDate: Date = new Date()
): boolean => {
  const eventDate = parseEventDate(dateString);
  const today = startOfDay(referenceDate);
  const eventDay = startOfDay(eventDate);
  return eventDay.getTime() < today.getTime();
};

/** An event remains current for the full calendar day on which it occurs. */
export const isEventUpcoming = (
  dateString: string,
  referenceDate: Date = new Date()
): boolean => !isEventPast(dateString, referenceDate);

/** Sort event-style display dates in ascending chronological order. */
export const sortEventDates = <T extends { date: string }>(events: T[]): T[] =>
  [...events].sort(
    (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
  );

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
