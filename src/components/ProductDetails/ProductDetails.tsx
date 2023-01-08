import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Htag } from '../Htag';

import styles from './ProductDetails.module.scss';

// import { IProduct } from '../../model';

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IProductFromCart extends IProduct {
  amount: number;
  totalPrice: number;
}

interface IProductDetails extends IProductFromCart {
  filledStarsCount: number;
  emptyStarsCount: number;
}

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProductDetails>();

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsList();
  }, []);

  if (product) {
    product.totalPrice =
      Math.round(product.price * (1 - product.discountPercentage / 100) * 100) / 100;
    product.filledStarsCount = Math.trunc(product.rating);
    product.emptyStarsCount = 5 - product.filledStarsCount;
  }

  return (
    <div className={styles.flexContainer}>
      <Htag tag='h1' className={styles.title}>
        {product?.title}
      </Htag>
      <div className={styles.product}>
        <div className={styles.images}>
          <div
            className={cn(styles.primary, styles.img)}
            style={{ backgroundImage: `url(${product?.images[0]})` }}
          ></div>
          <div className={styles.preview}>
            {product?.images.map((item: string, ind: number) => {
              return (
                <div
                  key={ind}
                  className={styles.img}
                  style={{ backgroundImage: `url(${item})` }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.top}>
            <div className={styles.price}>
              <span className={styles.totalPrice}>{product?.totalPrice}</span>
              <span className={styles.beforeSale}>{product?.price}</span>
              <span className={styles.discount}>{product?.discountPercentage}</span>
            </div>
            <div className={styles.rating}>
              <div className={styles.stars}>
                <div className={styles.filledStars}>
                  {Array(product?.filledStarsCount)
                    .fill(0)
                    .map((_, ind: number) => {
                      return <div key={ind} className={cn(styles.star, styles.filledStar)}></div>;
                    })}
                </div>
                <div className={styles.emptyStars}>
                  {Array(product?.emptyStarsCount)
                    .fill(0)
                    .map((_, ind: number) => {
                      return <div key={ind} className={cn(styles.star, styles.emptyStar)}></div>;
                    })}
                </div>
              </div>
              <div className={styles.number}>{product?.rating}</div>
            </div>
          </div>
          <div className={styles.stock}>
            <span>In stock:</span>
            <span className={styles.count}></span>
          </div>

          <div className={styles.buttons}>
            <div className={styles.input}></div>
            <div className={styles.btn}></div>
          </div>
          <div className={styles.details}>
            <Htag tag='h3'>Details</Htag>
            <div className={styles.description}></div>
          </div>
          <div className={styles.return}>
            <Htag tag='h3'>Return</Htag>
            <div className={styles.returnText}>
              You have <b>60 days</b> to return the item(s) using any of the following methods:
              <br />
              Free store return
              <br />
              Free returns via USPS Dropoff Service
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
