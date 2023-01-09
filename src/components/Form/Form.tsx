import { useForm, SubmitHandler } from 'react-hook-form';
import { Htag } from '..';
import { ReactComponent as VisaIcon } from '../../assets/icons/visa.svg';
import { ReactComponent as MasterIcon } from '../../assets/icons/master-card.svg';
import styles from './Form.module.scss'

export const Form = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = () => {
    return 1
  }
  /* 
  Реализован блок ввода персональной информации с валидацией +20
  добавлено поле "Имя и Фамилия". Валидация: содержит не менее двух слов, длина каждого не менее 3 символов +5
  добавлено поле "Номер телефона". Валидация: должно начинаться с '+', содержать только цифры и быть не короче 9 цифр +5
  добавлено поле "Адрес доставки". Валидация: содержит не менее трех слов, длина каждого не менее 5 символов +5
  добавлено поле "E-mail". Валидация: проверяется, является ли введенный текст электронной почтой +5


  Реализован блок ввода данных банковской карты с валидацией +20
  реализован ввод номер карты. Валидация: кол-во введенных цифр должно быть ровно 16, допускается ввод только цифр +5
  реализована автоматическая смена логотипа платежной системы. Например, если номер карты начинает с 4, устанавливается логотип Visa, если 5 - MasterCard. Реализовать не менее 3 платежных систем. +5
  реализован блок ввода срока действия карты. Валидация: допускается ввод только цифр, месяц не может быть больше 12, длина поля должна быть равна 4. Например 12/25. Разделитель не учитывается и добавляется автоматически +5
  реализован блок ввод CVV кода. Валидация: длина 3 символа, допускается ввод только цифр +5
  Реализована кнопка завершения заказа +10
  при клике на кнопку submit/confirm проверяются все поля на валидность, если у поля есть ошибки валидации, то рядом с этим полем выводится сообщение с ошибкой +5
  при успешном прохождении валидации всех полей и нажатии на кнопку, выводится сообщение, что заказ оформлен. Затем, спустя 3-5 секунд происходит редирект на главную страницу магазина. Корзина при этом очищается +5 */
  return <form action='#' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <Htag tag='h2'>1. Shipping Method</Htag>
    <div className={styles.gridContainer}>
      <label className={styles.label}>
        First Name
        <input className={styles.input} type="text" name="firsName" id="firsName" placeholder='Your first name' />
      </label>
      <label className={styles.label}>
        Last Name
        <input className={styles.input} type="text" name="lastName" id="lastName" placeholder='Your last name' />
      </label>
      <label className={styles.label}>
        Phone
        <input className={styles.input} type="tel" name="lastName" id="phone" placeholder='Your phone number' />
      </label>
      <label className={styles.label}>
        Address
        <input className={styles.input} type="text" name="address" id="address" placeholder='Your address' />
      </label>
    </div>
    <div>
      <Htag tag='h2'>2. Payment Method</Htag>
      <div className={styles.creditCard}>
        <div className={styles.flexContainer}>
          <Htag>
            Credit card
          </Htag>
          <MasterIcon />
          <VisaIcon />
        </div>
        <label className={styles.label}>
          Card number
          <input className={styles.input} type="number" name="cardNumber" id="cardNumber" placeholder='0000 0000 0000 0000' />
        </label>
        <label className={styles.label}>
          Expiry date
          <input className={styles.input} type="date" name="cardDate" id="cardDate" placeholder='mm/yy' />
        </label>
        <label className={styles.label}>
          CVC
          <input className={styles.input} type="number" name="cardCvc" id="cardCvc" placeholder='000' />
        </label>
      </div>
    </div>

  </form>;
};
