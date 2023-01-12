import cn from 'classnames';
import { useState } from 'react';

import { Accordion, Button } from '../../';
import { SliderRange } from '../../SliderRange';

import styles from './Filters.module.scss';
import { FiltersProps } from './Filters.props';

export const Filters = ({
  brands,
  categories,
  handleChange,
  stockRange,
  priceRange,
  resetFilters,
  copyLink,
}: FiltersProps) => {
  const [priceVal, setPriceVal] = useState<number | number[]>(priceRange);
  const [stockVal, setStockVal] = useState<number | number[]>(stockRange);
  const [copyActive, setCopyActive] = useState<boolean>(false);
  const filters = [
    { title: 'Categoryes', array: categories, filter: 'category' },
    { title: 'Brands', array: brands, filter: 'brand' },
  ];
  const filtersRange = [
    {
      title: 'Stock',
      value: { name: stockVal, initialValue: [0, 100] },
    },
    { title: 'Price', value: { name: priceVal, initialValue: [20, 1500] } },
  ];

  return (
    <div className={cn(styles.filters)}>
      <div className={styles.filtersButtons}>
        <Button onClick={resetFilters}>Reset Filters</Button>
        <Button onClick={() => {
          setCopyActive(prev => !prev)
          copyLink()
        }}>{!copyActive ? 'Copy Link' : 'Сopied'}</Button>
      </div>
      {filters.map((item, id) => (
        <Accordion key={id} title={item.title}>
          {item.array.map((checkbox) => {
            return (
              <label key={checkbox.name} className={cn(styles.label)}>
                <input
                  className={styles.inp}
                  type='checkbox'
                  name={checkbox.name}
                  id=''
                  onChange={(event) => handleChange(event, item.filter)}
                />
                {checkbox.name.replace(checkbox.name[0], checkbox.name[0].toUpperCase())}
                <span>({checkbox.count})</span>
              </label>
            );
          })}
        </Accordion>
      ))}
      {filtersRange.map((item) => {
        return (
          <Accordion key={item.title} title={item.title}>
            <SliderRange
              onAfterChange={() => {
                1;
              }}
              sliderValues={
                Array.isArray(item.value.name) ? item.value.name : item.value.initialValue
              }
              handleChange={
                item.title === 'Price'
                  ? (value) => {
                    setPriceVal(value);
                  }
                  : (value) => {
                    setStockVal(value);
                  }
              }
              key={item.title}
              min={item.value.initialValue[0]}
              max={item.value.initialValue[1]}
            />
          </Accordion>
        );
      })}
    </div>
  );
};
