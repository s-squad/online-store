import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductDetails } from '../../components/ProductDetails';
import { CustomContainer } from '../../containers/CustomContainer';
// import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  return (
    <section className='main'>
      <Breadcrumbs />
      <CustomContainer>
        <ProductDetails />
      </CustomContainer>
    </section>
  );
};
