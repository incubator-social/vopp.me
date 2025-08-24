'use client';

import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import styles from './RadioGroup.module.scss';

export default function RadioGroup({
  name,
  options = [],
  selectedValue,
  defaultValue,
  required = false,
  onChange,
  className
}: RadioGroupProps) {
  const value = selectedValue || defaultValue || (options.length > 0 ? options[0].option : null);
  return (
    <Root
      className={className || styles.radioGroup}
      name={name}
      value={value}
      onValueChange={onChange}
      required={required}
    >
      {options.map(({ option, label }, index) => (
        <div className={styles.itemWrap} key={index}>
          <Item className={styles.item} id={`${name}-${index}`} value={option} tabIndex={0}>
            <Indicator className={styles.indicator} />
          </Item>
          <label className={styles.label} htmlFor={`${name}-${index}`}>
            {label}
          </label>
        </div>
      ))}
    </Root>
  );
}

//type
export type RadioGroupProps = {
  name: string;
  options: Option[];
  selectedValue?: string;
  defaultValue?: string;
  required: boolean;
  onChange: (value: string) => void;
  className?: string;
};

type Option = {
  option: string;
  label: string;
};
