export function padNumber (number, isPadded) {
  return isPadded ? `0${number}` : number;
}