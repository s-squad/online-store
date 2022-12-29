import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

export const Button = ({
  children,
  size = 'small',
  border = false,
  path,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  if (path) {
    switch (size) {
      case 'regular':
        return (
          <Link
            to={path}
            className={cn(
              styles.btn,
              styles.regular,
              border && styles.border,
              className && className,
            )}
          >
            {children}
          </Link>
        );
      case 'large':
        return (
          <Link
            to={path}
            className={cn(
              styles.btn,
              styles.large,
              border && styles.border,
              className && className,
            )}
          >
            {children}
          </Link>
        );
      default:
        return (
          <Link
            to={path}
            className={cn(
              styles.btn,
              styles.small,
              border && styles.border,
              className && className,
            )}
          >
            {children}
          </Link>
        );
    }
  }

  switch (size) {
    case 'regular':
      return (
        <button
          type={type}
          className={cn(
            styles.btn,
            styles.regular,
            border && styles.border,
            className && className,
          )}
          {...props}
        >
          {children}
        </button>
      );
    case 'large':
      return (
        <button
          type={type}
          className={cn(styles.btn, styles.large, border && styles.border, className && className)}
          {...props}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          type={type}
          className={cn(styles.btn, styles.small, border && styles.border, className && className)}
          {...props}
        >
          {children}
        </button>
      );
  }
};
