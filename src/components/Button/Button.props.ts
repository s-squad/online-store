import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  size?: 'large' | 'regular' | 'small';
  type?: 'button' | 'submit' | 'reset';
  border?: boolean;
  path?: string;
}
