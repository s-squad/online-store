import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Htag } from '..';

import { ReactComponent as VisaIcon } from '../../assets/icons/visa.svg';
import { ReactComponent as MasterIcon } from '../../assets/icons/master-card.svg';
import { ReactComponent as AmericanExpressIcon } from '../../assets/icons/american-express.svg';
import { ReactComponent as DiscoverIcon } from '../../assets/icons/discover-card.svg';

import styles from './Form.module.scss';
import cn from 'classnames';

import {
  isAddressValidate,
  isPhoneValidate,
  isEmailValidate,
  isCardValidate,
  isCardDateValidate,
} from '../../utils';


export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
  cvc: string;
  date: string;
}

export const Form = () => {
  const {
    register,
    formState: { errors, isValid, },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    if (isValid) {
      reset()
      alert('Order is processed')
      localStorage.setItem('cart', JSON.stringify([]));
      setTimeout(() => navigate('/'), 300)
    }
  };

  const [cardFirstNumber, setCardFirstNumber] = useState();
  const navigate = useNavigate()

  return (
    <form action='#' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Htag tag='h2'>1. Shipping Method</Htag>
      <div className={styles.gridContainer}>
        <label className={styles.label}>
          First Name
          <input
            className={styles.input}
            placeholder='Your first name'
            {...register('firstName', {
              required: 'This field is required',
              minLength: { value: 3, message: 'Must contain at least 3 letters' },
            })}
          />
          {errors?.firstName && <div className={styles.error}>{errors?.firstName?.message}</div>}
        </label>
        <label className={styles.label}>
          Last Name
          <input
            className={styles.input}
            placeholder='Your last name'
            {...register('lastName', {
              required: 'This field is required',
              minLength: { value: 3, message: 'Must contain at least 3 letters' },
            })}
          />
          {errors?.lastName && <div className={styles.error}>{errors?.lastName?.message}</div>}
        </label>
        <label className={styles.label}>
          Phone
          <input
            className={styles.input}
            type='tel'
            placeholder='Your phone number'
            {...register('phone', {
              required: 'This field is required',
              validate: (value) => isPhoneValidate(value),
            })}
          />
          {errors?.phone && (
            <div className={styles.error}>
              {errors?.phone?.message || 'Please enter a valid phone'}
            </div>
          )}
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            placeholder='Your working email'
            type='email'
            {...register('email', {
              required: 'This field is required',
              validate: (value) => isEmailValidate(value),
            })}
          />
          {errors?.email && (
            <div className={styles.error}>
              {errors?.email?.message || 'Please enter a valid email'}
            </div>
          )}
        </label>
        <label className={cn(styles.label, styles.labelFull)}>
          Address
          <input
            className={styles.input}
            placeholder='Your address'
            {...register('address', {
              required: 'This field is required',
              validate: (value) => isAddressValidate(value),
            })}
          />
          {errors?.address && (
            <div className={styles.error}>
              {errors?.address?.message || 'Please enter a valid address'}
            </div>
          )}
        </label>
      </div>
      <div>
        <Htag tag='h2' className={styles.header}>
          2. Payment Method
        </Htag>
        <div className={styles.creditCard}>
          <div className={styles.flexContainer}>
            <Htag>Credit card</Htag>
            {cardFirstNumber === '6' && <DiscoverIcon height={40} width={40} />}
            {cardFirstNumber === '5' && <MasterIcon height={40} width={40} />}
            {cardFirstNumber === '4' && <VisaIcon height={40} width={40} />}
            {cardFirstNumber === '3' && <AmericanExpressIcon height={40} width={40} />}
          </div>
          <label className={cn(styles.label, styles.cardNumbers)}>
            Card number
            <input
              className={cn(styles.input, styles.cardInput)}
              type='number'
              placeholder='0000 0000 0000 0000'
              {...register('cardNumber', {
                required: 'This field is required',
                onBlur(event) {
                  setCardFirstNumber(event.target.value[0]);
                },
                validate: (value) => isCardValidate(value),
              })}
            />
            {errors?.cardNumber && (
              <div className={styles.error}>
                {errors?.cardNumber?.message || 'Please enter a valid Card'}
              </div>
            )}
          </label>
          <label className={styles.label}>
            Expiry date
            <input
              className={cn(styles.input, styles.cardInput)}
              type='number'
              placeholder='mm/yy'
              {...register('date', {
                required: 'This field is required',
                validate: (value) => isCardDateValidate(value),
              })}
            />
            {errors?.date && (
              <div className={styles.error}>
                {errors?.date?.message || 'Please enter a valid date'}
              </div>
            )}
          </label>
          <label className={styles.label}>
            CVC
            <input
              className={styles.input}
              {...register('cvc', {
                required: 'This field is required',
                minLength: { value: 3, message: 'Length less than 3 characters' },
                maxLength: { value: 3, message: 'More than 3 characters long' },
              })}
              type='number'
              placeholder='000'
            />
            {errors?.cvc && (
              <div className={styles.error}>
                {errors?.cvc?.message || 'Please enter a valid CVC'}
              </div>
            )}
          </label>
        </div>
      </div>
      <Button className={styles.formSubmit} size='large' type='submit'>
        Submit
      </Button>
    </form>
  );
};
