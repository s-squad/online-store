import { IProduct } from '../../model/IProduct';

export class Cart {
  private _items: IProduct[];
  private _fullPrice: number;

  constructor(items: IProduct[] = []) {
    this._items = items;
    this._fullPrice = this.setPrice();
  }
  get items(): IProduct[] {
    return this._items;
  }

  private setPrice(): number {
    return this._items.reduce((acc, val) => acc + val.price * val.amount, 0);
  }

  addItem(product: Omit<IProduct, 'amount'>): Cart {
    const existingId = this._items.findIndex((item) => item.id === product.id);

    if (existingId < 0) {
      return new Cart([...this.items, { ...product, amount: 1 }]);
    } else {
      return new Cart(
        this._items.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              amount: this._items[existingId].amount + 1,
            };
          }
          return item;
        }),
      );
    }
  }

  removeItem(id: number): Cart {
    const existingId = this._items.findIndex((item) => item.id === id);
    if (existingId < 0) return this;

    const { amount } = this._items[existingId];

    if (amount === 1) {
      return new Cart(this._items.filter((item) => item.id !== id));
    } else {
      const newAmount = amount - 1;
      return new Cart(
        this._items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              amount: newAmount,
            };
          }
          return item;
        }),
      );
    }
  }

  get price(): number {
    return this._fullPrice;
  }
}
