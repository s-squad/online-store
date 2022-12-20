import { Link } from 'react-router-dom';

import { CustomContainer } from '../CustomContainer';

import { Logo, Search } from '../../components';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <CustomContainer>
        <div className={styles.flexContainer}>
          <div className=''>{/* mobile burger */}</div>
          <Logo />
          <div className={styles.userButtons}>
            <Search />
            <Link to={'cart'}>
              <img src={process.env.PUBLIC_URL + 'cart_icon.svg'} alt='Shopping bag' />
            </Link>
          </div>
        </div>
      </CustomContainer>
    </header>
  );
};
