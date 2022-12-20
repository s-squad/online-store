import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import styles from './Search.module.scss';

export const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!event) return;
    if (event.key === 'Enter') {
      setSearchParams({ q: target.value });
      setSearchVal('');
    }
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
        <SearchIcon className={styles.icon} />
      </label>
    </div>
  );
};
