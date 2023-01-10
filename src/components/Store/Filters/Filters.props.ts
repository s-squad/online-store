import { ChangeEvent } from 'react';

export interface FiltersProps {
  brands: { name: string; count: number }[];
  categories: { name: string; count: number }[];
  handleChange: (event: ChangeEvent<HTMLInputElement>, title: string) => void;
  priceRange: number[];
  stockRange: number[];
  resetFilters: () => void;
  copyLink: () => void;
}
