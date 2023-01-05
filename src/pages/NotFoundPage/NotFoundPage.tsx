import { Link } from 'react-router-dom';
import { Htag } from '../../components';
import { CustomContainer } from '../../containers/CustomContainer';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className='main'>
      <CustomContainer>
        <Htag tag='h1'>Page not found</Htag>
        <div className={styles.message}>
          <p>
            Sorry! We couldn<span>&apos;</span>t fetch that page.
          </p>
          <p>
            Try searching or go to
            <Link to={'/'} className={styles.link}>
              CREATEX<span>&apos;</span>s home page.
            </Link>
          </p>
        </div>
      </CustomContainer>
    </section>
  );
};
