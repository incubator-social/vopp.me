'use client';

import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import styles from './RadioGroup.module.scss';

const RadioGroup = ({
  name,
  options = [],
  selectedValue,
  required = false,
  disabled = false,
  disabledItem,
  onChange,
  className
}: RadioGroupProps) => {
  const value = selectedValue || (options.length > 0 ? options[0].option : undefined);
  return (
    <Root
      className={className || styles['radio-group']}
      name={name}
      value={value}
      onValueChange={onChange}
      required={required}
      disabled={disabled}
    >
      {options.map(({ option, label }, index) => (
        <div className={styles['item-wrap']} key={option}>
          <Item
            className={styles.item}
            id={`${name}-${index}`}
            value={option}
            disabled={disabledItem?.includes(option)}
          >
            <Indicator className={styles.indicator} />
          </Item>
          <label
            className={styles.label}
            htmlFor={`${name}-${index}`}
            data-disabled={disabled || disabledItem?.includes(option) || undefined}
          >
            {label}
          </label>
        </div>
      ))}
    </Root>
  );
};

export default RadioGroup;

//type
export type RadioGroupProps = {
  name: string;
  options: Option[];
  selectedValue?: string;
  disabled?: boolean;
  disabledItem?: string[];
  required: boolean;
  onChange: (value: string) => void;
  className?: string;
};

type Option = {
  option: string;
  label: string;
};
