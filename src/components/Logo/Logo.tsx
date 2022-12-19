import React from 'react';
import { Link } from 'react-router-dom';

import LogoIcons from '../../assets/icons/logo.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to={'/'}>
        <img src={LogoIcons} width='150' height='50' alt='Logo text' />
      </Link>
    </div>
  );
};
