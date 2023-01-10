import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomContainer } from '../../containers/CustomContainer';
import homeIcon from '../../assets/icons/home.svg';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setCategory(data.category);
        setTitle(data.title);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  return (
    <div className={styles.breadcrumbs}>
      <CustomContainer>
        <div className={styles.flexContainer}>
          <div className={styles.home}>
            <Link to={'/'}>
              <img src={homeIcon} width='16' height='16' alt='Go home' />
            </Link>
          </div>
          <div className={styles.arrow}></div>
          <div className={styles.category}>{category}</div>
          <div className={styles.arrow}></div>
          <div className={styles.title}>{title}</div>
        </div>
      </CustomContainer>
    </div>
  );
};
