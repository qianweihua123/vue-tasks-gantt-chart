export function fullFormatYearMonthDate(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  return (
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day)
  );
}
