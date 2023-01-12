export const isCardDateValidate = (value: string): boolean => {
  const digits = value.split('').every((digit) => !Number.isNaN(Number(digit)));
  const month = value.slice(0, 2);
  /* 
    реализован блок ввода срока действия карты. Валидация: допускается ввод только цифр, месяц не может быть больше 12, длина поля должна быть равна 4. Например 12/25. Разделитель не учитывается и добавляется автоматически +5
     */
  const isValidateMonth = Number(month) < 13 && Number(month) > 0;
  console.log(digits && isValidateMonth && value.length === 4);
  return digits && isValidateMonth && value.length === 4;
};
