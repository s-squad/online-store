import cn from 'classnames';

import { SelectProps, IOptions } from './Select.props';

import styles from './Select.module.scss';

const SelectItem = ({ value, text }: IOptions) => {
  return <option value={value}>{text}</option>;
};

export const Select = ({
  className,
  options,
  placeholder,
  name,
  value,
  onChange,
  ...props
}: SelectProps) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    {...props}
    className={cn(styles.select, className)}
  >
    {placeholder && (
      <option value={placeholder} hidden={true}>
        {placeholder}
      </option>
    )}
    {options.map((item) => (
      <SelectItem key={item.key} value={item.value} text={item.text} />
    ))}
  </select>
);
