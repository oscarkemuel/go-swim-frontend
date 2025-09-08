import { formatInTimeZone } from "date-fns-tz";

export function formatTime(seconds: number, isRhythm = false) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secs.toString().padStart(2, '0');

  if (isRhythm) {
    return `${minutes}:${formattedSeconds}`;
  }

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export function formatTimeToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}min`;
}

export function formatDate(dateString: string) {
  return formatInTimeZone(dateString, "UTC", "dd/MM/yyyy");
}