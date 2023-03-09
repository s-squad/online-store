import { IProductFromCart } from '../../../model';

export interface CartItemProps {
  item: IProductFromCart;
  handleInputIncrement: (item: IProductFromCart) => void;
  handleInputDecrement: (id: number) => void;
  deleteItem: (item: IProductFromCart) => void;
}
