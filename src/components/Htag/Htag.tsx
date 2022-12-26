import cn from 'classnames';

import { HtagProps } from './Htag.props';
import styles from './Htag.module.scss';

export const Htag = ({ children, tag, className, ...props }: HtagProps) => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn(styles.header, styles.h1, className && className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(styles.header, styles.h2, className && className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(styles.header, styles.h3, className && className)} {...props}>
          {children}
        </h3>
      );
    default:
      return (
        <h4 className={cn(styles.header, className && className)} {...props}>
          {children}
        </h4>
      );
  }
};
