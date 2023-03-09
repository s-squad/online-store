import { useState, useEffect } from 'react';
import cn from 'classnames';

import { Cart } from '../../../classes';
import { CardItem } from '../CardItem';

import { IProduct } from '../../../model';

import styles from './CardList.module.scss';
import { CardListProps } from './CardList.props';

export const CardList = ({ items, layout }: CardListProps) => {
  const [cart, setCart] = useState(new Cart(JSON.parse(localStorage.getItem('cart') ?? '[]')));

  const addToCard = (item: IProduct) => setCart(cart.addItem(item));
  const removeToCard = (id: number) => setCart(cart.removeItem(id));

  useEffect(() => {
    const saveLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart.items));
    };
    saveLocalStorage();
  }, [cart]);

  return (
    <ul className={cn(styles.productsList, styles[layout])}>
      {items.length === 0 && <li className={styles.itemList}>Oops, nothing found! 😔 </li>}
      {items.length !== 0 &&
        items.map((item) => (
          <CardItem
            key={item.id}
            addToCard={addToCard}
            removeToCard={removeToCard}
            item={item}
            added={cart.items.some((element) => element.id === item.id)}
            className={cn(layout === 'list' && styles.itemList)}
          />
        ))}
    </ul>
  );
};
