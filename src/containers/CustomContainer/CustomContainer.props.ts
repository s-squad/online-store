import { DetailedHTMLProps, ReactNode, HTMLAttributes } from 'react';

export interface CustomContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
