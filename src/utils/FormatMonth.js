
export function formatMonth(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  return year + "-" + (month < 10 ? "0" + month : month);
}

