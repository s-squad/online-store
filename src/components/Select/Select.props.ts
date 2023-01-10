import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOptions {
  key: string;
  value: string;
  text: string;
}

export interface SelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: IOptions[];
  className?: string;
  placeholder: string;
  name: string;
  value: string;
}
