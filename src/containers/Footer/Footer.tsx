import { CustomContainer } from '../CustomContainer';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <CustomContainer>
        <div className={styles.bottom}>
          <div>
            created in 2023 <br />
            by
            <a
              className={styles.link}
              href='https://github.com/olgakharkevich'
              title='Olga Kharkevich'
            >
              Olga Kharkevich
            </a>
            and
            <a className={styles.link} href='https://github.com/JohnGlod' title='John Glod'>
              John Glod
            </a>
          </div>
          <p>Copyright © All Rights Reserved.</p>
          <a href='https://rs.school/js/' title='The Rolling Scopes JavaScript/Front-end.'>
            <img
              src={`${process.env.PUBLIC_URL}/rs_logo.svg`}
              width='150'
              height='50'
              alt='The Rolling Scopes JavaScript/Front-end.'
            />
          </a>
        </div>
      </CustomContainer>
    </footer>
  );
};
