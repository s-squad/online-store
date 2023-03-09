import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IProduct } from '../../../model';

export interface CardItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  addToCard: (item: IProduct) => void;
  removeToCard: (id: number) => void;
  item: IProduct;
  added: boolean;
}
