import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';

export const Search = () => {
  const [visabilityInput, setVisabilityInput] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [, setSearchParams] = useSearchParams();

  const toggleInput = () => setVisabilityInput((prev) => !prev);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!event) return;
    if (event.key === 'Enter') {
      setSearchParams({ q: target.value });
      setSearchVal('');
      toggleInput();
    }
  };

  return (
    <div className={styles.search}>
      <label className={visabilityInput ? styles.label : styles.labelNoBorder}>
        <img
          onClick={toggleInput}
          src={process.env.PUBLIC_URL + 'search.svg'}
          alt='Find something that will make you happy!'
        />
        {visabilityInput && (
          <input
            className={styles.input}
            type='search'
            name='search'
            id='search'
            placeholder='Search items!'
            value={searchVal}
            onChange={(event) => setSearchVal(event.target.value)}
            onKeyDown={(event) => handleSearch(event)}
          />
        )}
      </label>
    </div>
  );
};
