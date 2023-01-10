import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { Select } from '../Select';

import styles from './Search.module.scss';

export const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!event) return;
    if (event.key === 'Enter') {
      setSearchParams({ [selectVal || 'name']: target.value.toLowerCase() });
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
          { value: 'name', key: '1', text: 'name' },
          { value: 'brand', key: '2', text: 'brand' },
          { value: 'price', key: '3', text: 'price' },
          { value: 'category', key: '4', text: 'category' },
          { value: 'stock', key: '5', text: 'stock' },
          { value: 'rating', key: '6', text: 'rating' },
          { value: 'descr', key: '7', text: 'description' },
        ]}
        placeholder='Find by'
        onChange={handleChangeSearch}
      />
    </div>
  );
};
