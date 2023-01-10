import { CartItemProps } from './CartItem.props';

import styles from './CartItem.module.scss';

export const CartItem = ({
  item,
  handleInputIncrement,
  handleInputDecrement,
  deleteItem,
}: CartItemProps) => {
  return (
    <li className={styles.listItem} key={item.id}>
      <img className={styles.itemImage} src={item.images[0]} alt={item.title} />
      <div className={styles.listItemDescr}>
        <h4 className={styles.itemTitle}>{item.title}</h4>
        <label className={styles.label}>
          <input
            className={styles.input}
            type='number'
            min={1}
            step={1}
            readOnly
            value={item.amount}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                handleInputIncrement(item);
              } else if (event.key === 'ArrowDown') {
                handleInputDecrement(item.id);
              } else {
                return;
              }
            }}
          />
          <button onClick={() => handleInputIncrement(item)} className={styles.arrowTop}>
            ▲
          </button>
          <button onClick={() => handleInputDecrement(item.id)} className={styles.arrowBottom}>
            ▼
          </button>
        </label>

        <strong>${item.totalPrice}</strong>
      </div>

      <button className={styles.cartButton} onClick={() => deleteItem(item)}>
        Delete
      </button>
    </li>
  );
};
