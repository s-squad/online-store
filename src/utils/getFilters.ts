import { IProduct } from '../model';

export const getFilters = (
  array: IProduct[],
  filter: 'brand' | 'category',
): { name: string; count: number }[] => {
  const uniqBrands: { name: string; count: number }[] = [];
  const allBrands = array.map((item) => {
    return { name: item[filter].toLowerCase(), count: 1 };
  });

  allBrands.forEach((brand) => {
    const itemId = uniqBrands.findIndex((element) => element.name === brand.name);
    if (itemId !== -1) {
      uniqBrands[itemId].count += 1;
    } else {
      uniqBrands.push(brand);
    }
  });
  return uniqBrands;
};
