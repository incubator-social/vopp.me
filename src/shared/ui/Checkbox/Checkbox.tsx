import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import * as LabelRadix from '@radix-ui/react-label';
import clsx, { type ClassValue } from 'clsx';

import CheckboxCheckedIcon from './../../assets/icons/checkbox-checked.svg';
import CheckboxUncheckedIcon from './../../assets/icons/checkbox-unchecked.svg';
import CheckboxCheckedDisabledIcon from './../../assets/icons/checkbox-checked-disable.svg';
import CheckboxUncheckedDisabledIcon from './../../assets/icons/checkbox-unchecked-disable.svg';

import s from './Checkbox.module.scss';

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
          {disabled ? <CheckboxUncheckedDisabledIcon /> : <CheckboxUncheckedIcon />}

          <CheckboxRadix.Indicator className={s.checkboxIndicator}>
            {disabled ? <CheckboxCheckedDisabledIcon /> : <CheckboxCheckedIcon />}
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
