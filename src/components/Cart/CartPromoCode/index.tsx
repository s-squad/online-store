import cn from 'classnames';

import { Button } from '../../Button';
import { Htag } from '../../Htag';
import { CartPromoCodeProps } from './CartPromoCode.props';

import styles from './CartPromoCode.module.scss';

export const CartPromoCode = (props: CartPromoCodeProps) => {
  const { onSubmit, discount, shipping, subtotal, message, setTicket, setMessage, openModal } =
    props;

  const handleClickPromoCode = (id: number) => {
    const updatePromo = discount.filter((item) => item.id !== id);
    setTicket(updatePromo);
    setMessage({ message: 'Promo code deactivated!', error: false });
  };
  return (
    <div className={styles.promoFlexContainer}>
      <form onSubmit={onSubmit}>
        <label className={styles.promoLabel}>
          Apply a promo code
          <div className={styles.promoInputContainer}>
            <input
              className={styles.promoInput}
              type='text'
              placeholder='Enter promo code'
              name='ticket'
            />
            <Button size='small' className={styles.promoSubmit} type='submit'>
              Apply
            </Button>
          </div>
          {message && (
            <span className={cn(styles.promoMessage, message.error ? styles.error : styles.succes)}>
              {message.message}
            </span>
          )}
        </label>
      </form>
      <ul className={styles.promoCodeTextList}>
        {discount.map((item) => {
          return (
            <li
              className={styles.promoCodeTextItem}
              key={item.id}
              onClick={() => handleClickPromoCode(item.id)}
            >
              {item.ticket}
            </li>
          );
        })}
      </ul>

      <div>
        <Htag tag='h2' className={styles.promoTitle}>
          Order totals
        </Htag>
        <div className={styles.promoStates}>
          <div className={styles.promoStatesCol}>
            <div className={styles.promoStatesItem}>
              <strong>Subtotal:</strong>
              <div>
                {discount.length > 0 ? (
                  <del className={styles.crossed}> ${subtotal}</del>
                ) : (
                  <strong>${subtotal}</strong>
                )}
                {discount.length > 0 && (
                  <strong>
                    ${subtotal - (subtotal / 100) * discount.reduce((acc, val) => acc + val.sum, 0)}
                  </strong>
                )}
              </div>
            </div>

            <div className={styles.promoStatesItem}>
              <span> Shipping costs:</span>
              <span>${shipping}</span>
            </div>

            <div className={styles.promoStatesItem}>
              <span>Discount:</span>
              {discount.length > 0 ? (
                <span>{discount.reduce((acc, val) => acc + val.sum, 0)}%</span>
              ) : (
                <span>—</span>
              )}
            </div>

            <div className={styles.promoStatesItem}>
              <span>Estimated sales tax:</span>
              <span>${Number((subtotal / 100) * 7).toFixed(2)}</span>
            </div>
          </div>
          <div className={cn(styles.promoStatesItem, styles.line)}>
            <Htag tag='h3'> Order total:</Htag>
            <Htag tag='h3'>
              $
              {Number(
                (
                  subtotal -
                  (subtotal / 100) * discount.reduce((acc, val) => acc + val.sum, 0) +
                  shipping +
                  (subtotal / 100) * 7
                ).toFixed(2),
              )}
            </Htag>
          </div>
        </div>
        <Button size='large' className={styles.promoComplete} onClick={() => openModal(true)}>
          Complete order
        </Button>
      </div>
    </div>
  );
};
