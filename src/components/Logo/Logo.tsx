import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to={'/'}>
        <img
          src={process.env.PUBLIC_URL + 'logo.svg'}
          width='150'
          height='50'
          alt='Logo text'
        />
      </Link>
    </div>
  );
};
