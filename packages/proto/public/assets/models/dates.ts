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

export const formatDate = (date: Date | string | undefined) => {
  const dt =
    (typeof date === "string" ? new Date(date) : date) ||
    new Date();
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();

  return `${d} ${m}`;
};

interface DateStringRange {
  startDate: string;
  endDate: string;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export function convertStartEndDates<T extends DateRange>(
  obj: unknown
) {
  const datestrings = obj as DateStringRange;
  let result = obj as T;
  result.startDate = new Date(datestrings.startDate);
  result.endDate = new Date(datestrings.endDate);
  return result;
}
