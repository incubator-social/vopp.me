import { ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import * as LabelRadix from '@radix-ui/react-label';
import clsx from 'clsx';
import Image from 'next/image';

import checkboxCheckedIcon from '../../assets/icons/checkbox-checked.svg';
import checkboxUncheckedIcon from '../../assets/icons/checkbox-unchecked.svg';
import checkboxCheckedDisabledIcon from '../../assets/icons/checkbox-checked-disable.svg';
import checkboxUncheckedDisabledIcon from '../../assets/icons/checkbox-unchecked-disable.svg';

import s from './checkbox.module.scss';

export type CheckboxInputProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>;
  label?: string;
  labelClassName?: string;
} & CheckboxProps;

type CheckboxRef = React.ComponentRef<typeof CheckboxRadix.Root>;

export const Checkbox = forwardRef<CheckboxRef, CheckboxInputProps>(
  (props: CheckboxInputProps, ref) => {
    const { className, containerProps, id, label, labelClassName, disabled, ...rest } = props;
    const generatedId = useId();
    const finalId = id ?? generatedId;

    const containerClassNames = clsx(s.checkboxContainer, containerProps?.className);
    const labelClassNames = clsx(s.label, labelClassName, disabled && s.disabledLabel);

    return (
      <div {...containerProps} className={containerClassNames}>
        <div className={clsx(s.checkboxWrapper, disabled && s.disabled)}>
          <div className={s.checkboxBg} />
          <CheckboxRadix.Root
            id={finalId}
            ref={ref}
            className={s.checkboxRoot}
            disabled={disabled}
            {...rest}
          >
            {/* базовое (unchecked) состояние */}
            <Image
              src={disabled ? checkboxUncheckedDisabledIcon : checkboxUncheckedIcon}
              alt="unchecked"
              width={18}
              height={18}
            />

            {/* поверх отображается если checked */}
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

        {label && (
          <LabelRadix.Root htmlFor={finalId} className={labelClassNames}>
            {label}
          </LabelRadix.Root>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
