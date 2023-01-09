import { AccordionProps } from './Accordion.props';
import styles from './Accordion.module.scss';

export const Accordion = ({ title, children }: AccordionProps) => {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{title}</summary>
      {children}
    </details>
  );
};
