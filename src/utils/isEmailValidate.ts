export const isEmailValidate = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');
  return regex.test(value);
};
