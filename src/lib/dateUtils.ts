import { parse, isAfter, startOfDay } from "date-fns";

/**
 * Parse a date string as a local date to avoid timezone issues
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object in local timezone
 */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
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
  try {
    // Parse dates like "March 28, 2025" or "August 27, 2025"
    return parse(dateString, "MMMM d, yyyy", new Date());
  } catch (error) {
    console.warn(`Failed to parse date: ${dateString}`, error);
    return new Date(); // fallback to current date
  }
};

/**
 * Check if an event date is in the past
 * @param dateString - Date string to check
 * @returns true if the date is in the past
 */
export const isEventPast = (dateString: string): boolean => {
  const eventDate = parseEventDate(dateString);
  const today = startOfDay(new Date());
  const eventDay = startOfDay(eventDate);
  return !isAfter(eventDay, today) && eventDay.getTime() !== today.getTime();
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