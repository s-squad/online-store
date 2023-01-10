import { IProduct } from './IProduct';

export interface IResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}
