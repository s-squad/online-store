import React from 'react';

import { CustomContainerProps } from './CustomContainer.props';
import styles from './CustomContainer.module.scss';

export const CustomContainer = ({ children }: CustomContainerProps) => (
  <div className={styles.container}>{children}</div>
);
