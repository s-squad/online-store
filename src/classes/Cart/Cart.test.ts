import { IProduct } from '../../model';
import { Cart } from './Cart';

describe('сlass Cart', () => {
  const item: IProduct = {
    id: 2,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: '...',
    images: ['...', '...', '...'],
  };
  const second: IProduct = {
    id: 12,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: '...',
    images: ['...', '...', '...'],
  };

  it('Should return the number of items in the cart', () => {
    const cart = new Cart();
    expect(cart.items).toEqual([]);
  });
  it('Should add new item to cart', () => {
    const cart = new Cart().addItem(item);
    expect(cart.items).toEqual([
      { ...item, amount: 1, totalPrice: Number((1 * item.price).toFixed(2)) },
    ]);
  });

  it('Should add to cart a new product that is already in stock', () => {
    const cart = new Cart().addItem(item).addItem(item);
    expect(cart.items).toEqual([
      {
        ...item,
        amount: 2,
        totalPrice: Number((2 * item.price).toFixed(2)),
      },
    ]);
  });
  it('Should remove the product by index', () => {
    const result = new Cart().addItem(item).removeItem(2).addItem(second);
    expect(result.items).toEqual([
      { ...second, amount: 1, totalPrice: Number((1 * item.price).toFixed(2)) },
    ]);
  });

  it('Should delete item by index, if there are several of them, change the amount', () => {
    const cart = new Cart().addItem(item).addItem(item).addItem(item).addItem(item).removeItem(2);
    expect(cart.items).toEqual([
      {
        ...item,
        amount: 3,
        totalPrice: Number((3 * item.price).toFixed(2)),
      },
    ]);
  });

  it('Should changing the final monetary value of the cart when adding a product', () => {
    const cart = new Cart().addItem(item).addItem(item).addItem(item).addItem(item);
    expect(cart.price).toBe(item.price * 4);
  });

  it('Should changing the final cash value of the cart when deleting an item', () => {
    const cart = new Cart()
      .addItem(item)
      .removeItem(2)
      .addItem(second)
      .addItem(second)
      .addItem(item)
      .removeItem(2)
      .addItem(item)
      .addItem(item)
      .removeItem(2)
      .removeItem(2);
    expect(cart.price).toBe(second.price * 2);
  });

  it('Should return the old instance if the element is not found', () => {
    const cart = new Cart([{ ...second, amount: 1, totalPrice: 22.3 }]).removeItem(2);
    expect(cart.items).toEqual([{ ...second, amount: 1, totalPrice: 22.3 }]);
  });
});
