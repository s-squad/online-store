import cn from 'classnames';
import { ModalProps } from './Modal.props';

import styles from './Modal.module.scss';

export const Modal = ({ active, setActive, children }: ModalProps) => (
  <div
    className={cn(styles.modal, active ? styles.modalOpen : styles.modalClose)}
    onClick={() => setActive(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        styles.modalContainer,
        active ? styles.modalContainerOpen : styles.modalContainerClose,
      )}
    >
      {children}
    </div>
  </div>
);
