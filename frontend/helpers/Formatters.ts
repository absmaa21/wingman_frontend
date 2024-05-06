export function unixToString(unix: number): string {
  const date = new Date(unix);
  const minutes =
    date.getMinutes().valueOf() < 10
      ? '0' + date.getMinutes()
      : date.getMinutes();
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return (
    date.getDay() +
    14 +
    '/' +
    month +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    minutes
  );
}

export function durationToString(num: number): string {
  const seconds = num / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  return hours >= 1
    ? hours.toFixed(0) + 'h '
    : '' + minutes.toFixed(0) + 'm ' + (seconds / 180).toFixed(0) + 's';
}
