
export function formatDate(time) {
  let day = time.getDate();
  return day < 10 ? "0" + day : day;
}
