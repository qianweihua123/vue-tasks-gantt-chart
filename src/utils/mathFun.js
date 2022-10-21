export function baseCalculate(firstNumber, secondNumber, oneDayMs, type) {
  if (type == "divied") {
    return (firstNumber.getTime() - secondNumber.getTime()) / oneDayMs;
  }
}

export function getTimeFun(date) {
  return new Date(date).getTime();
}
