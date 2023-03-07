import { IProduct, ESorted, IParams } from '../model';

export interface applyFiltersProps {
  products: IProduct[];
  params: IParams;
}
export function applyFilters({ products, params }: applyFiltersProps): IProduct[] {
  const filteredProducts: IProduct[] = [];
  const { name, sort, descr, brand, category, rating, stock, price } = params;
  const [minStock, maxStock] = stock.split('⟷');
  const [minPrice, maxPrice] = price.split('⟷');

  for (const product of products) {
    if (name && !product.title.toLowerCase().includes(name)) {
      continue;
    }
    if (descr && !product.description.toLowerCase().includes(descr)) {
      continue;
    }
    if (brand && !brand.split(',').includes(product.brand.toLowerCase())) {
      continue;
    }
    if (category && !category.split(',').includes(product.category.toLowerCase())) {
      continue;
    }
    if (rating && product.rating !== Number(rating)) {
      continue;
    }
    if (
      stock &&
      !(
        (minStock &&
          product.stock >= Number(minStock) &&
          maxStock &&
          product.stock <= Number(maxStock)) ||
        (!maxStock && product.stock === Number(minStock))
      )
    ) {
      continue;
    }

    if (
      price &&
      !(
        (minPrice &&
          product.price >= Number(minPrice) &&
          maxPrice &&
          product.price <= Number(maxPrice)) ||
        (!maxPrice && product.price === Number(minPrice))
      )
    ) {
      continue;
    }
    filteredProducts.push(product);
  }
  return filteredProducts.sort((a, b) => {
    const { title, price, rating, stock, discountPercentage } = a;
    const {
      title: titleB,
      price: priceB,
      rating: ratingB,
      stock: stockB,
      discountPercentage: discountPercentageB,
    } = b;
    switch (sort) {
      case ESorted.PRICE_DESC:
        return priceB - price;
      case ESorted.PRICE_ASC:
        return price - priceB;
      case ESorted.RATING_DESC:
        return ratingB - rating;
      case ESorted.RATING_ASC:
        return rating - ratingB;
      case ESorted.STOCK_DESC:
        return stockB - stock;
      case ESorted.STOCK_ASC:
        return rating - ratingB;
      case ESorted.DISCOUNT_DESC:
        return discountPercentageB - discountPercentage;
      case ESorted.DISCOUNT_ASC:
        return discountPercentage - discountPercentageB;
      default:
        return title.localeCompare(titleB);
    }
  });
}
