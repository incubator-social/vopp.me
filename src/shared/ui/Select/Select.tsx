'use client';
import ArrowDown from './../../assets/icons/arrow-ios-down-outline.svg';
import ArrowUp from './../../assets/icons/arrow-ios-up.svg';
import React, { useState } from 'react';
import * as SelectRadix from '@radix-ui/react-select';
import styles from './Select.module.scss';
import clsx from 'clsx';
import Scroll, { ScrollType } from '@/src/shared/ui/Scroll/Scroll';

type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconProps?: React.SVGProps<SVGSVGElement>;
};

type SizeProps = {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  padding?: string;
  fontSize?: number;
  iconSize?: number;
  arrowSize?: number;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  required?: boolean;
  size?: SizeProps;
  contentWidth?: 'content' | 'trigger';
};

export const Select = ({
  options,
  placeholder,
  defaultValue,
  value,
  onValueChange,
  required = false,
  disabled = false,
  size = { fontSize: 16, iconSize: 24, arrowSize: 24 },
  contentWidth
}: SelectProps & { value?: string }) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  const isEmpty = options.length === 0;

  const selectedValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
    setInternalValue(newValue);
  };

  const selectedOption = options.find((option) => option.value === selectedValue);

  const triggerStyles = {
    ...(size?.minWidth && { minWidth: `${size.minWidth}px` }),
    ...(size?.maxWidth && { maxWidth: `${size.maxWidth}px` }),
    ...(size?.minHeight && { height: `${size.minHeight}px` }),
    ...(size?.maxHeight && { height: `${size.maxHeight}px` }),
    ...(size?.fontSize && { fontSize: `${size.fontSize}px` }),
    ...(size?.padding && { padding: `${size.padding}` })
  };

  // Размеры иконок
  const DEFAULT_SIZE = { fontSize: 16, iconSize: 24, arrowSize: 24 };
  const iconSize = size?.iconSize ?? DEFAULT_SIZE.iconSize;
  const arrowSize = size?.arrowSize ?? DEFAULT_SIZE.arrowSize;

  if (isEmpty) {
    return (
      <div className={clsx(styles.trigger, styles.emptyTrigger)} style={triggerStyles} aria-disabled={true}>
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
      value={selectedValue}
      onValueChange={handleValueChange}
      defaultValue={defaultValue}
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
            <SelectRadix.Value placeholder={placeholder} className={styles.placeholder} />
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
          <Scroll type={ScrollType.always} viewportAsChild>
            <SelectRadix.Viewport className={styles.viewport}>
              {' '}
              {options.map((option) => (
                <SelectRadix.Item key={option.value} value={option.value} className={styles.item} style={triggerStyles}>
                  {' '}
                  {option.icon ? (
                    <div className={styles.itemWithIcon}>
                      {' '}
                      <option.icon width={iconSize} height={iconSize} {...option.iconProps} />{' '}
                      <SelectRadix.ItemText className={styles.itemText}>{option.label}</SelectRadix.ItemText>{' '}
                    </div>
                  ) : (
                    <SelectRadix.ItemText>{option.label}</SelectRadix.ItemText>
                  )}{' '}
                </SelectRadix.Item>
              ))}{' '}
            </SelectRadix.Viewport>
          </Scroll>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};
