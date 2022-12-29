import { IProduct } from '../../../model';

export interface CartItemProps {
  item: IProduct;
  handleInputIncrement: (item: IProduct) => void;
  handleInputDecrement: (id: number) => void;
  deleteItem: (item: IProduct) => void;
}
