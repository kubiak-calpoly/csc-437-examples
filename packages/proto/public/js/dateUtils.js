const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const formatDate = (date) => {
  const dt =
    (typeof date === "string" ? new Date(date) : date) ||
    new Date();
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();

  return `${d} ${m}`;
};

export function nightsBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor(
    (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
}

export function convertStartEndDates(obj) {
  obj.startDate = new Date(obj.startDate);
  obj.endDate = new Date(obj.endDate);
  return obj;
}

export function toDateTimeString(date) {
  const iso = date.toISOString();
  const [dateString, timeString] = iso.split("T");
  return `${dateString} ${timeString.substring(0, 8)}`;
}

export function toDateString(date) {
  const iso = date.toISOString();
  return iso.substring(0, 10);
}
