import { ITicket } from '../../../model';

export interface IMessage {
  message: string;
  error: boolean;
}

export interface CartPromoCodeProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  subtotal: number;
  shipping: number;
  discount: ITicket[];
  setTicket: (ticket: ITicket[]) => void;
  setMessage: (message: IMessage | null) => void;
  message: IMessage | null;
}
