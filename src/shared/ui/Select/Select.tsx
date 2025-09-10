'use client';
import ArrowDown from './../../assets/icons/arrow-ios-down-outline.svg';
import ArrowUp from './../../assets/icons/arrow-ios-up.svg';
import React, { useState } from 'react';
import * as SelectRadix from '@radix-ui/react-select';
import styles from './Select.module.scss';
import clsx from 'clsx';

type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconProps?: React.SVGProps<SVGSVGElement>;
};

type SizeProps = {
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  height?: number | string;
  padding?: number | string;
  fontSize?: number | string;
  iconSize?: number;
  arrowSize?: number;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  required?: boolean;
  size?: SizeProps;
  contentWidth?: 'content' | 'trigger';
};

export const Select = ({
  options,
  placeholder,
  value,
  onValueChange,
  required = false,
  disabled = false,
  size = { fontSize: 16, iconSize: 24, arrowSize: 24 },
  contentWidth
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const isEmpty = options.length === 0;
  const selectedOption: SelectOption | undefined = options.find((option: SelectOption) => option.value === value);

  const triggerStyles = {
    // Ширина
    ...(size?.width && { width: typeof size.width === 'number' ? `${size.width}px` : size.width }),
    ...(size?.minWidth && { minWidth: typeof size.minWidth === 'number' ? `${size.minWidth}px` : size.minWidth }),
    ...(size?.maxWidth && { maxWidth: typeof size.maxWidth === 'number' ? `${size.maxWidth}px` : size.maxWidth }),

    // Высота
    ...(size?.height && { height: typeof size.height === 'number' ? `${size.height}px` : size.height }),
    ...(size?.minHeight && { minHeight: typeof size.minHeight === 'number' ? `${size.minHeight}px` : size.minHeight }),
    ...(size?.maxHeight && { maxHeight: typeof size.maxHeight === 'number' ? `${size.maxHeight}px` : size.maxHeight }),

    // Padding
    ...(size?.padding && { padding: typeof size.padding === 'number' ? `${size.padding}px` : size.padding }),

    // Font Size
    ...(size?.fontSize && { fontSize: typeof size.fontSize === 'number' ? `${size.fontSize}px` : size.fontSize })
  };

  // Размеры иконок
  const DEFAULT_SIZE = { fontSize: 16, iconSize: 24, arrowSize: 24 };
  const iconSize = size?.iconSize ?? DEFAULT_SIZE.iconSize;
  const arrowSize = size?.arrowSize ?? DEFAULT_SIZE.arrowSize;

  if (isEmpty) {
    return (
      <div className={styles.trigger} style={triggerStyles} aria-disabled={true}>
        <div className={styles.selectedValue}>
          <span className={styles.placeholder}>{placeholder}</span>
        </div>
        <ArrowDown
          style={{
            width: arrowSize,
            height: arrowSize,
            opacity: 0.5
          }}
        />
      </div>
    );
  }

  return (
    <SelectRadix.Root
      value={value}
      onValueChange={onValueChange}
      onOpenChange={setOpen}
      required={required}
      disabled={disabled}
    >
      <SelectRadix.Trigger
        className={styles.trigger}
        style={triggerStyles}
        aria-label="Выберите опцию"
        aria-disabled={disabled}
      >
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
            <SelectRadix.Value placeholder={placeholder} />
          )}
        </div>
        <SelectRadix.Icon asChild>
          {open ? (
            <ArrowUp
              style={{
                width: arrowSize,
                height: arrowSize
              }}
            />
          ) : (
            <ArrowDown
              style={{
                width: arrowSize,
                height: arrowSize
              }}
            />
          )}
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content
          className={clsx(styles.content, contentWidth === 'content' ? styles.autoWidth : styles.triggerWidth)}
          position="popper"
          sideOffset={-1}
          align="start"
        >
          <SelectRadix.Viewport className={styles.viewport}>
            {options.map((option) => (
              <SelectRadix.Item key={option.value} value={option.value} className={styles.item} style={triggerStyles}>
                {option.icon ? (
                  <div className={styles.itemWithIcon}>
                    <option.icon width={iconSize} height={iconSize} {...option.iconProps} />
                    <SelectRadix.ItemText className={styles.itemText}>{option.label}</SelectRadix.ItemText>
                  </div>
                ) : (
                  <SelectRadix.ItemText>{option.label}</SelectRadix.ItemText>
                )}
              </SelectRadix.Item>
            ))}
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};
