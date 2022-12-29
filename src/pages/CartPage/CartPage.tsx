import { CustomContainer } from '../../containers/CustomContainer';
import { CartContainer } from '../../components/Cart';

export const CartPage = () => {
  return (
    <section className='main'>
      <CustomContainer>
        <CartContainer />
      </CustomContainer>
    </section>
  );
};
