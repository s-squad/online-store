export const isAddressValidate = (value: string): boolean => {
  return value.split(' ').every((str) => str.length >= 5) && value.split(' ').length >= 3;
};
