import { IProduct, IProductFromCart } from '../../model/IProduct';

export class Cart {
  private _items: IProductFromCart[];
  private _fullPrice: number;

  constructor(items: IProductFromCart[] = []) {
    this._items = items;
    this._fullPrice = Number(this.setPrice().toFixed(2));
  }

  get items(): IProductFromCart[] {
    return this._items;
  }

  private setPrice(): number {
    return this._items.reduce((acc, val) => acc + val.totalPrice, 0);
  }
  addItem(product: IProduct): Cart {
    const existingId = this._items.findIndex((item) => item.id === product.id);

    if (existingId < 0) {
      return new Cart([
        ...this.items,
        {
          ...product,
          amount: 1,
          totalPrice: product.price,
        },
      ]);
    } else {
      return new Cart(
        this._items.map((item) => {
          if (item.id === product.id && item.amount !== product.stock) {
            const newAmount = this._items[existingId].amount + 1;
            return {
              ...item,
              amount: newAmount,
              totalPrice: Number((newAmount * item.price).toFixed(2)),
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
              totalPrice: Number((newAmount * item.price).toFixed(2)),
            };
          }
          return item;
        }),
      );
    }
  }
  fullRemoveItem(deleteItem: IProductFromCart) {
    return new Cart(this._items.filter((item) => item !== deleteItem));
  }

  get price(): number {
    return this._fullPrice;
  }
}
