/**
 * Utility functions for formatting dates, times, and durations
 */

/**
 * Formats duration in minutes to a human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "1 hr 30 min" or "45 min")
 */
export const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min`
      : `${hours} hr`;
  }
  return `${minutes} min`;
};

/**
 * Formats a date string to YYYY-MM-DD format for HTML5 date input
 * @param date - Date string to format
 * @returns Formatted date string
 */
export const formatDateForInput = (date: string): string => {
  if (!date) return '';
  
  // Remove any leading/trailing whitespace
  date = date.trim();
  
  // Try parsing as ISO date first
  if (date.includes('T')) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  }
  
  // Check if date is already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  
  // Handle DD-MM-YYYY format
  const parts = date.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      return `${year}-${month}-${day}`;
    }
  }
  
  // Default: try to parse and format
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  
  return '';
};

/**
 * Formats a date string from YYYY-MM-DD to DD-MM-YYYY format for display
 * @param date - Date string to format
 * @returns Formatted date string
 */
export const formatDateForDisplay = (date: string): string => {
  if (!date) return '';
  // Check if date is in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) return date;
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Formats a time string for display (e.g., "09:00" to "9:00 AM")
 * @param timeStr - Time string in 24-hour format (HH:mm)
 * @returns Formatted time string in 12-hour format with AM/PM
 */
export const formatTimeForDisplay = (timeStr: string): string => {
  if (!timeStr) return '';
  
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
};

/**
 * Formats a date for profile display (e.g., "Jan 01, 2025")
 * @param dateStr - Date string to format
 * @returns Formatted date string
 */
export const formatDateForProfile = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateStr;
  }
};

/**
 * Formats a date and time for display (e.g., "Jan 01, 2025 9:00 AM")
 * @param dateTimeStr - Date time string to format
 * @returns Formatted date time string
 */
export const formatDateTime = (dateTimeStr: string): string => {
  if (!dateTimeStr) return '';
  try {
    const date = new Date(dateTimeStr);
    const dateStr = formatDateForProfile(dateTimeStr);
    const timeStr = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr} ${timeStr}`;
  } catch {
    return dateTimeStr;
  }
};
