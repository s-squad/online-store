export const isPhoneValidate = (value: string): boolean => {
  const isValidateFirstSymbol = value[0] === '+';
  const numbers = value
    .slice(1)
    .trim()
    .split('')
    .filter((char) => char !== ' ');
  const isValidateNumbers = numbers.every((number) => !Number.isNaN(Number(number)));
  return isValidateFirstSymbol && isValidateNumbers && numbers.length >= 9;
};
