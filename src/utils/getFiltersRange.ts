import { IProduct } from '../model';

export const getFiltersRange = (array: IProduct[], key: 'stock' | 'price'): number[] => {
  const arr = array.map((item) => item[key]);
  return [Math.min(...arr), Math.max(...arr)];
};
