import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Cart } from '../../classes';
import { IProduct, IProductFromCart, ITicket } from '../../model';

import { Htag } from '../Htag';

import styles from './CartContainer.module.scss';
import { CartPromoCode } from './CartPromoCode';
import { CartItem } from './CartItem';
import { Modal } from '../Modal';
import { Form } from '../Form';

const tickets: ITicket[] = [
  { id: 1, ticket: 'happynewyear', sum: 15 },
  { id: 2, ticket: 'merrychristmas', sum: 10 },
  { id: 3, ticket: '2023', sum: 10 },
];

export const CartContainer = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(new Cart(JSON.parse(localStorage.getItem('cart') ?? '[]')));
  const [ticket, setTicket] = useState<ITicket[]>([]);
  const [message, setMessage] = useState<{ message: string; error: boolean } | null>(null);
  const handleInputDecrement = (id: number) => {
    setCart(cart.removeItem(id));
  };

  const handleInputIncrement = (item: IProduct) => {
    setCart(cart.addItem(item));
  };
  const deleteItem = (item: IProductFromCart) => setCart(cart.fullRemoveItem(item));
  const comeBack = () => navigate(-1);
  const [activeModal, setActiveModal] = useState(false);
  const checkTickets = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.target) return;
    const formData = new FormData(event.target as HTMLFormElement);

    const findTicket: ITicket | undefined = tickets.find(
      (item) => item.ticket.toUpperCase() === formData.get('ticket')?.toString().toUpperCase(),
    );

    if (findTicket && ticket.includes(findTicket)) {
      setMessage({ message: 'Oops, this promo code was already applied...', error: true });
    } else if (findTicket) {
      setTicket((prev) => [...prev, findTicket]);
      setMessage({ message: 'Promo code is applied!', error: false });
    } else {
      setMessage({ message: 'Invalid promo code.', error: true });
    }
  };

  useEffect(() => {
    const saveLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart.items));
    };
    saveLocalStorage();
  }, [cart]);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <Htag tag='h1'>Checkout</Htag>
          <span className={styles.goBack} onClick={comeBack} aria-label='Link go back' role='link'>
            Back to shopping
          </span>
        </div>
        <div className={styles.cartSection}>
          <Htag tag='h2'>1. Item Review</Htag>
          <ul className={styles.cartList}>
            {cart.items.length === 0 ? (
              <li className={styles.listItem}>Cart is empty 😔</li>
            ) : (
              cart.items.map((item: IProductFromCart) => {
                return (
                  <CartItem
                    key={item.id}
                    handleInputIncrement={handleInputIncrement}
                    handleInputDecrement={handleInputDecrement}
                    deleteItem={deleteItem}
                    item={item}
                  />
                );
              })
            )}
            {cart.items.length > 0 && <li className={styles.cartPrice}>Subtotal: ${cart.price}</li>}
          </ul>
        </div>
      </div>
      <CartPromoCode
        onSubmit={checkTickets}
        setMessage={setMessage}
        discount={ticket}
        shipping={10}
        setTicket={setTicket}
        subtotal={cart.price}
        message={message}
        openModal={setActiveModal}
      />
      <Modal active={activeModal} setActive={setActiveModal}>
        <Form />
      </Modal>
    </div>
  );
};
