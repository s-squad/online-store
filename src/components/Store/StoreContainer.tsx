import { useEffect, useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Filters } from '../../components/Store/Filters';

import { ReactComponent as GridIcon } from '../../assets/icons/grid.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';

import { IProduct, IResponse, ESorted, IParams } from '../../model';

import styles from './StoreContainer.module.scss';
import { Button, Select } from '../../components';
import { getFilters } from '../../utils/getFilters';
import { CardList } from './CardList';
import { applyFilters } from '../../utils/applyFilters';
import { getFiltersRange } from '../../utils/getFiltersRange';

export const StoreContainer = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState<string>(searchParams.get('layout') ?? 'grid');
  const [brands, setBrands] = useState<{ name: string; count: number }[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [sortProperty, setSortProperty] = useState(searchParams.get('sort') ?? 'name');
  const [limit, setLimit] = useState<string>(localStorage.getItem('limit') ?? '12');
  const [toggleVisabilityFilter, setToggleVisabilityFilter] = useState<boolean>(true);

  const params: IParams = {
    sort: sortProperty,
    name: searchParams.get('name') || '',
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    descr: searchParams.get('descr') || '',
    rating: searchParams.get('rating') || '',
    stock: searchParams.get('stock') || '',
    price: searchParams.get('price') || '',
  };

  /*   const searchNameParam = searchParams.get('name');
  const searchBrandParam = searchParams.get('brand');
  const searchCategoryParam = searchParams.get('category');
  const searchDescrParam = searchParams.get('descr');
  const searchRatingParam = searchParams.get('rating');
  const searchStockParam = searchParams.get('stock'); */

  const [price, setPrice] = useState<number[]>([20, 1500]);
  const [stock, setStock] = useState<number[]>([0, 100]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, title: string) => {
    let brands = searchParams.get('brand')?.split(',') ?? [];
    let categoryes = searchParams.get('category')?.split(',') ?? [];
    if (event.target.checked) {
      if (title === 'brand') {
        brands.push(event.target.name);
      } else {
        categoryes.push(event.target.name);
      }
    } else {
      if (title === 'brand') {
        brands = brands.filter((brand) => brand !== event.target.name);
      } else {
        categoryes = categoryes.filter((category) => category !== event.target.name);
      }
    }
    if (brands.length > 0) {
      searchParams.set('brand', brands.join(','));
    } else {
      searchParams.delete('brand');
    }
    if (categoryes.length > 0) {
      searchParams.set('category', categoryes.join(','));
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(applyFilters({ products, params }).length / Number(limit));

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * Number(limit)) % applyFilters({ products, params }).length;
    setItemOffset(newOffset);
  };
  const endOffset = itemOffset + +limit;
  const correntItems = applyFilters({ products, params });

  const resetFilters = () => setSearchParams({});
  const copyLink = () => navigator.clipboard.writeText(window.location.href);

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;
    if (target) {
      setSortProperty(target.value);
      searchParams.set('sort', target.value);
    }
  };

  const changeLayout = () => {
    if (layout === 'grid') {
      setLayout('list');
      setSearchParams({ layout: 'list' });
    } else {
      setLayout('grid');
      setSearchParams({ layout: 'grid' });
    }
  };

  /*   useEffect(() => {
    setBrands(getFilters(correntItems, 'brand'));
    setCategories(getFilters(correntItems, 'category'));
    setPrice(getFiltersRange(correntItems, 'price'));
    setStock(getFiltersRange(correntItems, 'stock'));
  }, [itemOffset, limit, searchParams]);
 */
  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: IResponse = await response.json();
        setProducts(data.products);
        setBrands(getFilters(data.products, 'brand'));
        setCategories(getFilters(data.products, 'category'));
        setPrice(getFiltersRange(data.products, 'price'));
        setStock(getFiltersRange(data.products, 'stock'));
      } catch (error) {
        console.error(error);
      }
    };
    getProductsList();
  }, []);

  return (
    <>
      <div className={styles.settings}>
        <Button
          size='large'
          onClick={() => setToggleVisabilityFilter((prev) => !prev)}
          className={styles.hideBtn}
        >
          Hide filters
        </Button>
        <div className={styles.settings__inputs}>
          <div className={styles.inputContainer}>
            Sort by
            <Select
              name='sort'
              value={sortProperty}
              options={[
                { value: ESorted.NAME, key: '1', text: 'Name' },
                { value: ESorted.PRICE_DESC, key: '2', text: 'Price descending' },
                { value: ESorted.PRICE_ASC, key: '3', text: 'Price ascending' },
                { value: ESorted.RATING_DESC, key: '4', text: 'Rating descending' },
                { value: ESorted.RATING_ASC, key: '5', text: 'Rating ascending' },
                { value: ESorted.STOCK_DESC, key: '6', text: 'Stock ascending' },
                { value: ESorted.STOCK_ASC, key: '7', text: 'Stock ascending' },
                { value: ESorted.DISCOUNT_DESC, key: '8', text: 'Discount ascending' },
                { value: ESorted.DISCOUNT_ASC, key: '9', text: 'Discount ascending' },
              ]}
              placeholder='Name'
              onChange={handleSort}
            />
          </div>
          <div className={styles.inputContainer}>
            Show
            <label className={styles.label}>
              <input
                className={styles.input}
                type='number'
                min={1}
                step={1}
                readOnly
                value={limit}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowUp') {
                    setLimit((prev) => String(Number(prev) + 1));
                    localStorage.setItem('limit', String(Number(limit) + 1));
                  } else if (event.key === 'ArrowDown') {
                    if (!(Number(limit) <= 1)) {
                      setLimit((prev) => String(Number(prev) - 1));
                      localStorage.setItem('limit', String(Number(limit) - 1));
                    }
                  } else {
                    return;
                  }
                }}
              />

              <button
                onClick={() => {
                  setLimit((prev) => String(Number(prev) + 1));
                  localStorage.setItem('limit', String(Number(limit) + 1));
                }}
                className={styles.arrowTop}
              >
                ▲
              </button>
              <button
                onClick={() => {
                  if (!(Number(limit) <= 1)) {
                    setLimit((prev) => String(Number(prev) - 1));
                    localStorage.setItem('limit', String(Number(limit) - 1));
                  }
                }}
                className={styles.arrowBottom}
              >
                ▼
              </button>
            </label>
            <span>products per page</span>
          </div>
        </div>
        <div className={styles.iconsContainer}>
          {layout === 'grid' ? (
            <GridIcon onClick={changeLayout} />
          ) : (
            <ListIcon onClick={changeLayout} />
          )}
          <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={7}
            pageCount={pageCount || 1}
            containerClassName={styles.paginate}
            previousLabel='<'
            pageLinkClassName={styles.paginateItem}
            previousLinkClassName={styles.paginateItem}
            nextLinkClassName={styles.paginateItem}
            activeLinkClassName={styles.active}
          />
        </div>
      </div>
      <div className={styles.flexContainer}>
        {toggleVisabilityFilter && (
          <Filters
            stockRange={stock}
            priceRange={price}
            brands={brands}
            categories={categories}
            copyLink={copyLink}
            resetFilters={resetFilters}
            handleChange={handleChange}
          />
        )}
        <CardList items={correntItems.slice(itemOffset, endOffset)} layout={layout} />
      </div>
    </>
  );
};
