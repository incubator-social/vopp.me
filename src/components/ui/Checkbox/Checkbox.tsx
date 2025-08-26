import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import * as LabelRadix from '@radix-ui/react-label';
import clsx, { type ClassValue } from 'clsx';
import Image from 'next/image';

import checkboxCheckedIcon from './../../../shared/assets/icons/checkbox-checked.svg';
import checkboxUncheckedIcon from './../../../shared/assets/icons/checkbox-unchecked.svg';
import checkboxCheckedDisabledIcon from './../../../shared/assets/icons/checkbox-checked-disable.svg';
import checkboxUncheckedDisabledIcon from './../../../shared/assets/icons/checkbox-unchecked-disable.svg';

import s from './checkbox.module.scss';

export type CheckboxInputProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>;
  label?: React.ReactNode;
  labelClassName?: ClassValue;
  labelProps?: Omit<ComponentPropsWithoutRef<typeof LabelRadix.Root>, 'htmlFor' | 'children' | 'className'>;
} & CheckboxProps;

type CheckboxRef = React.ComponentRef<typeof CheckboxRadix.Root>;

export const Checkbox = forwardRef<CheckboxRef, CheckboxInputProps>((props, ref) => {
  const { className, containerProps, id, label, labelClassName, labelProps, disabled, ...rest } = props;

  const generatedId = useId();
  const finalId = id ?? generatedId;

  const containerClassNames = clsx(s.checkboxContainer, containerProps?.className);
  const finalLabelClassNames = clsx(s.label, labelClassName, disabled && s.disabledLabel);

  return (
    <div {...containerProps} className={containerClassNames}>
      <div className={clsx(s.checkboxWrapper, disabled && s.disabled)}>
        <div className={s.checkboxBg} />
        <CheckboxRadix.Root
          id={finalId}
          ref={ref}
          className={clsx(s.checkboxRoot, className)}
          disabled={disabled}
          {...rest}
        >
          <Image
            src={disabled ? checkboxUncheckedDisabledIcon : checkboxUncheckedIcon}
            alt="unchecked"
            width={18}
            height={18}
          />
          <CheckboxRadix.Indicator className={s.checkboxIndicator}>
            <Image
              src={disabled ? checkboxCheckedDisabledIcon : checkboxCheckedIcon}
              alt="checked"
              width={18}
              height={18}
            />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>

      {label != null && (
        <LabelRadix.Root htmlFor={finalId} className={finalLabelClassNames} {...labelProps}>
          {label}
        </LabelRadix.Root>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
