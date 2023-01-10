import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { CustomContainer } from '../CustomContainer';

import { Logo, Search } from '../../components';

import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';

import { Cart } from '../../classes';

import styles from './Header.module.scss';

export const Header = () => {
  const [cart] = useState<Cart>(new Cart(JSON.parse(localStorage.getItem('cart') ?? '[]')));

  return (
    <header className={styles.header}>
      <CustomContainer>
        <div className={styles.flexContainer}>
          <Logo />
          <Search />
          <div className={styles.userButtons}>
            <Link to={'checkout'} className={styles.link}>
              <div className={styles.cart}>
                <span className={styles.cartPrice}>{cart.price}</span>
                <CartIcon />
                <span className={styles.cartNum}>{cart.items.length}</span>
              </div>
            </Link>
          </div>
        </div>
      </CustomContainer>
      <div className={styles.sale}>
        <span className={styles.saleBold}>Up to 70% Off. </span>
        <NavLink to={'products/sale'} className={({ isActive }) => (isActive ? styles.active : '')}>
          Shop our latest sale styles
        </NavLink>
      </div>
    </header>
  );
};
