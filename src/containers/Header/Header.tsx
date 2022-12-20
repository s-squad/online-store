import { Link, NavLink } from 'react-router-dom';

import { CustomContainer } from '../CustomContainer';

import { Logo, Search } from '../../components';

import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';

import styles from './Header.module.scss';

const listItems = ['Women', 'Men', 'Girls', 'Boys', 'Sale'];

export const Header = () => {
  return (
    <header className={styles.header}>
      <CustomContainer>
        <div className={styles.flexContainer}>
          <Logo />
          <nav>
            <ul className={styles.list}>
              {listItems.map((item) => {
                return (
                  <li className={styles.listItem} key={item}>
                    <NavLink
                      to={`products/${item.toLowerCase()}`}
                      className={({ isActive }) => (isActive ? styles.active : '')}
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Search />
          <div className={styles.userButtons}>
            <div className={styles.favorite}>
              <HeartIcon />
              <span className={styles.favoriteNum}>2</span>
            </div>
            <Link to={'checkout'} className={styles.link}>
              <div className={styles.cart}>
                <span className={styles.cartPrice}>1200</span>
                <CartIcon />
                <span className={styles.cartNum}>5</span>
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
