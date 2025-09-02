import { DateRange, DayPicker, DayPickerProps } from 'react-day-picker';
import 'react-day-picker/style.css';
import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import styles from './DatePicker.module.scss';
import CalendarIcon from '@/src/shared/assets/icons/calendar-outline.svg';
import { getDateString, getDateRangeString } from '@/src/shared/lib/utils/dateToString';
import { clsx } from 'clsx';

const modifiers = {
  weekend: { dayOfWeek: [0, 6] }
};

const modifiersClassNames = {
  weekend: styles.weekend
};

type CommonProps = {
  labelProps?: ComponentProps<'label'>;
  triggerProps?: ComponentProps<'button'>;
  containerProps?: ComponentProps<'div'>;
  errorMessage?: string;
};

type SingleProps = {
  mode?: 'single';
  onChange?: (selected: Date | undefined) => void;
};

type RangeProps = {
  mode: 'range';
  onChange?: (selected: DateRange | undefined) => void;
};

type Props = (SingleProps | RangeProps) & Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'> & CommonProps;

export const DatePicker = ({
  triggerProps,
  labelProps,
  containerProps,
  errorMessage,
  onChange,
  mode = 'single',
  ...datePickerProps
}: Props) => {
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<Date | DateRange | undefined>(undefined);

  const classNames = {
    container: clsx(styles.container, containerProps?.className, open && styles.open, errorMessage && styles.error),
    label: clsx(styles.label, 'regular-text-14', labelProps?.className),
    trigger: clsx(styles.trigger, 'regular-text-16', triggerProps?.className),
    error: clsx(styles.errorMessage, 'small-text')
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleOpen();
    triggerProps?.onClick?.(event);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const isClickOutside =
      datePickerRef.current &&
      event.target instanceof Node &&
      datePickerRef.current !== event.target &&
      !datePickerRef.current.contains(event.target);
    if (isClickOutside) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  const getTriggerLabel = () => {
    if (mode === 'single') {
      return selected instanceof Date ? getDateString(selected) : (triggerProps?.children ?? 'Pick a date');
    } else {
      return selected && !('getDate' in selected) ? getDateRangeString(selected as DateRange) : 'Pick a date range';
    }
  };

  const dayPickerProps: DayPickerProps =
    mode === 'single'
      ? {
          mode: 'single',
          selected: selected as Date | undefined,
          onSelect: (date) => {
            setSelected(date ?? undefined);
            (onChange as SingleProps['onChange'])?.(date ?? undefined);
          },
          ...datePickerProps
        }
      : {
          mode: 'range',
          selected: selected as DateRange | undefined,
          onSelect: (range) => {
            setSelected(range ?? undefined);
            (onChange as RangeProps['onChange'])?.(range ?? undefined);
          },
          ...datePickerProps
        };

  return (
    <div {...containerProps} className={classNames.container}>
      <label {...labelProps} className={classNames.label}>
        {labelProps?.children ?? 'Date'}
        <button {...triggerProps} className={classNames.trigger} type="button" onClick={handleTriggerClick}>
          {getTriggerLabel()}
          <CalendarIcon />
        </button>
      </label>
      <div ref={datePickerRef}>
        {open && (
          <DayPicker
            className={styles.datePicker}
            showOutsideDays
            weekStartsOn={1}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            {...dayPickerProps}
          />
        )}
      </div>
      {errorMessage && <div className={classNames.error}>{errorMessage}</div>}
    </div>
  );
};
