import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ESearchBy } from '../../model';
import { Select } from '../Select';

import styles from './Search.module.scss';

export const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!event) return;
    if (event.key === 'Enter') {
      searchParams.append(selectVal || ESearchBy.NAME, target.value.toLowerCase())
      setSearchParams(searchParams)
      setSearchVal('');
    }
  };
  const handleChangeSearch = (event: ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;
    if (target) setSelectVal(target.value);
  };
  return (
    <div className={styles.search}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type='search'
          name='search'
          id='search'
          placeholder='Search for products...'
          value={searchVal}
          onChange={(event) => setSearchVal(event.target.value)}
          onKeyDown={(event) => handleSearch(event)}
        />
        {!searchVal && <SearchIcon className={styles.icon} />}
      </label>
      <Select
        name='sort'
        value={selectVal}
        options={[
          { value: ESearchBy.NAME, key: '1', text: 'name' },
          { value: ESearchBy.BRAND, key: '2', text: 'brand' },
          { value: ESearchBy.PRICE, key: '3', text: 'price' },
          { value: ESearchBy.CATEGORY, key: '4', text: 'category' },
          { value: ESearchBy.STOCK, key: '5', text: 'stock' },
          { value: ESearchBy.RATING, key: '6', text: 'rating' },
          { value: ESearchBy.DESCR, key: '7', text: 'description' },
        ]}
        placeholder='Find by'
        onChange={handleChangeSearch}
      />
    </div>
  );
};
