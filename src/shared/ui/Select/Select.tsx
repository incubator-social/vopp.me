'use client';
import ArrowDown from './../../assets/icons/arrow-ios-down-outline.svg';
import ArrowUp from './../../assets/icons/arrow-ios-up.svg';

import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import styles from './Select.module.scss';

type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconProps?: React.SVGProps<SVGSVGElement>;
};

type SizeProps = {
  width?: number;
  height?: number;
  fontSize?: number;
  iconSize?: number;
  arrowSize?: number;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  onValueChange?: (value: string) => void;
  required?: boolean;
  size?: SizeProps;
};

export const CustomSelect = ({
  options,
  placeholder,
  defaultValue,
  onValueChange,
  required = false,
  isDisabled = false,
  size = { fontSize: 16, iconSize: 20, arrowSize: 24 }
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  const handleValueChange = (value: string) => {
    onValueChange?.(value);
    setSelectedValue(value);
  };

  const selectedOption = options.find((option) => option.value === selectedValue);

  const customStyles = {
    ...(size?.width && { minWidth: `${size.width}px` }),
    ...(size?.height && { height: `${size.height}px` }),
    ...(size?.fontSize && { fontSize: `${size.fontSize}px` })
  };

  // Размеры иконок
  const iconSize = size?.iconSize || 20;
  const arrowSize = size?.arrowSize || 16;

  return (
    <Select.Root
      value={selectedValue}
      onValueChange={handleValueChange}
      defaultValue={defaultValue}
      onOpenChange={setOpen}
      required={required}
      disabled={isDisabled}
    >
      <Select.Trigger className={styles.trigger} style={customStyles} aria-label="Выберите опцию">
        <div className={styles.selectedValue}>
          {selectedOption?.icon && (
            <selectedOption.icon
              width={iconSize}
              height={iconSize}
              {...selectedOption.iconProps}
              className={styles.selectedIcon}
            />
          )}

          {selectedOption ? (
            <span className={styles.selectedText}>{selectedOption.label}</span>
          ) : (
            <Select.Value placeholder={placeholder} className={styles.placeholder} />
          )}
        </div>
        <Select.Icon asChild>
          {open ? (
            <ArrowUp
              width={arrowSize}
              height={arrowSize}
              style={{
                width: arrowSize,
                height: arrowSize
              }}
            />
          ) : (
            <ArrowDown
              width={arrowSize}
              height={arrowSize}
              style={{
                width: arrowSize,
                height: arrowSize
              }}
            />
          )}
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className={styles.content} position="popper" sideOffset={0}>
        <Select.ScrollUpButton className={styles.scrollButton} />

        <Select.Viewport>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value} className={styles.item}>
              {option.icon ? (
                <div className={styles.itemWithIcon}>
                  <option.icon width={16} height={16} {...option.iconProps} />
                  <Select.ItemText className={styles.itemText}>{option.label}</Select.ItemText>
                </div>
              ) : (
                <Select.ItemText>{option.label}</Select.ItemText>
              )}
            </Select.Item>
          ))}
        </Select.Viewport>

        <Select.ScrollDownButton className={styles.scrollButton} />
      </Select.Content>
    </Select.Root>
  );
};
