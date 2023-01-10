import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Button } from '../../Button';
import { ReactComponent as CartIcon } from '../../../assets/icons/cart.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

import styles from './CardItem.module.scss';
import { CardItemProps } from './CardItem.props';

export const CardItem = ({ addToCard, removeToCard, item, className, added }: CardItemProps) => {
  const { id, images, price, title, brand, category, rating, stock, discountPercentage } = item;
  const handleClick = () => {
    if (!added) {
      addToCard(item);
    } else {
      removeToCard(id);
    }
  };

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.cardDiscount}>{discountPercentage}%</div>
      <Link to={`/products/${id}`} className={styles.cardBoxImage}>
        <img className={styles.cardImage} alt={title} src={images[0]} />
      </Link>

      <div className={styles.cardDescr}>
        <Link to={`/products/${id}`} className={styles.cardTitle}>
          {title}
        </Link>
        <strong>{category.replace(category[0], category[0].toUpperCase())}</strong>
        <strong>{brand.replace(brand[0], brand[0].toUpperCase())}</strong>
        <strong className={cn(rating > 4 ? styles.ratingGreen : styles.ratingYellow)}>
          Rating: {rating}
        </strong>
        <strong className={cn(stock > 100 ? styles.ratingGreen : styles.ratingYellow)}>
          Stock: {stock}
        </strong>
        <div className={styles.cardDown}>
          <strong className={styles.cardPrice}>${price}</strong>

          {!added ? (
            <Button border onClick={handleClick}>
              <CartIcon className={styles.icon} />
            </Button>
          ) : (
            <Button border onClick={handleClick}>
              <DeleteIcon className={styles.icon} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
