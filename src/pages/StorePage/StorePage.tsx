import { StoreContainer } from '../../components/Store';
import { CustomContainer } from '../../containers/CustomContainer';

export const StorePage = () => {
  return (
    <section className='main'>
      <CustomContainer>
        <StoreContainer />
      </CustomContainer>
    </section>
  );
};
