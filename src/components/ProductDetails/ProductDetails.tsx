import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Htag } from '../Htag';

import styles from './ProductDetails.module.scss';
import { Button } from '../Button';
import { Cart } from '../../classes';
import { IProduct, IProductFromCart } from '../../model';

interface IProductDetails extends IProductFromCart {
  filledStarsCount: number;
  emptyStarsCount: number;
  isAdded: boolean;
}

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductDetails>();
  const [productForCart, setProductForCart] = useState<IProduct>();
  const [activeImgNum, setActiveImgNum] = useState<number>(0);

  const [cart, setCart] = useState(new Cart(JSON.parse(localStorage.getItem('cart') ?? '[]')));

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setProductForCart(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsList();
  }, []);

  useEffect(() => {
    const saveLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart.items));
    };
    saveLocalStorage();
  }, [cart]);

  if (product) {
    product.images.splice(4);
    product.totalPrice =
      Math.round(product.price * (1 - product.discountPercentage / 100) * 100) / 100;
    product.filledStarsCount = Math.trunc(product.rating);
    product.emptyStarsCount = 5 - product.filledStarsCount;
    product.isAdded = cart.items.some((element) => element.id === product.id);
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
            style={{ backgroundImage: `url(${product?.images[activeImgNum]})` }}
          ></div>
          <div className={styles.preview}>
            {product?.images.map((item: string, ind: number) => {
              return (
                <div
                  key={ind}
                  className={styles.img}
                  style={{ backgroundImage: `url(${item})` }}
                  onClick={() => setActiveImgNum(ind)}
                ></div>
              );
            })}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.top}>
            <div className={styles.price}>
              <span className={styles.totalPrice}>${product?.totalPrice}</span>
              <span className={styles.beforeSale}>${product?.price}</span>
              <span className={styles.discount}>-{product?.discountPercentage}%</span>
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
              <div className={styles.ratingNumber}>{product?.rating}</div>
            </div>
          </div>
          <div className={styles.stock}>
            <Htag tag='h3'>In stock</Htag>
            <div className={styles.stockCount}>{product?.stock}</div>
          </div>
          <div className={styles.details}>
            <Htag tag='h3'>Details</Htag>
            <div className={styles.description}>{product?.description}</div>
          </div>
          <div className={styles.buttons}>
            {!product?.isAdded ? (
              <Button
              size='large'
              className={styles.btnAddToCart}
              onClick={() => {
                if (productForCart) {
                  setCart(cart.addItem(productForCart));
                }
              }}>
              <div className={styles.iconAdd}></div>
              Add to cart
            </Button>
            ) : (
              <Button
                size='large'
                className={styles.btnRemoveFromCart}
                onClick={() => {
                  if (productForCart) {
                    setCart(cart.removeItem(productForCart.id));
                  }
                }}>
                Remove from cart
              </Button>
            )}
            <Button size='large' className={styles.btnBuyNow}
              onClick={() => {
                if (!product?.isAdded && productForCart) {
                  setCart(cart.addItem(productForCart));
                }
                setTimeout(() => {
                  navigate('/checkout');
                }, 100)
              }}
              >
               Buy now
            </Button>
          </div>
          <div className={styles.delivery}>
            <Htag tag='h3'>Delivery</Htag>
            <div className={styles.deliveryText}>
              Free standard shipping on orders <b>over $35</b> before tax, plus free returns.
              <table className={styles.deliveryTable}>
                <thead>
                  <tr>
                    <th className={styles.type}>TYPE</th>
                    <th className={styles.howLong}>HOW LONG</th>
                    <th className={styles.howMuch}>HOW MUCH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard delivery</td>
                    <td>1-4 business days</td>
                    <td>$4.50</td>
                  </tr>
                  <tr>
                    <td>Express delivery</td>
                    <td>1 business day</td>
                    <td>$10.00</td>
                  </tr>
                  <tr>
                    <td>Pick up in store</td>
                    <td>1-3 business days</td>
                    <td>Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.return}>
            <Htag tag='h3'>Return</Htag>
            <div className={styles.returnText}>
              You have <b>60 days</b> to return the item(s) using any of the following methods:
              <br />
              - Free store return
              <br />
              - Free returns via USPS Dropoff Service
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
