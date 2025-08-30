import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import styles from './DatePicker.module.scss';
import type { DayPickerProps } from 'react-day-picker/dist/cjs/types';
import CalendarIcon from '@/src/shared/assets/icons/calendar-outline.svg';
import { formatDate, formatDateRange } from '@/src/shared/utils/formateDate';
import { clsx } from 'clsx';

const modifiers = {
  weekend: { dayOfWeek: [0, 6] }
};

const modifiersClassNames = {
  weekend: styles.weekend
};

type Props = {
  labelProps?: ComponentProps<'label'>;
  triggerProps?: ComponentProps<'button'>;
  containerProps?: ComponentProps<'div'>;
  errorMessage?: string;
  onChange?: (selected: Date | DateRange | undefined) => void;
} & DayPickerProps;

export const DatePicker = ({
  triggerProps,
  labelProps,
  containerProps,
  errorMessage,
  onChange,
  mode = 'single',
  ...datePickerProps
}: Props) => {
  const [selected, setSelected] = useState<Date | DateRange | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

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
    if (open) {
      const isClickOutside =
        datePickerRef.current &&
        event.target instanceof Node &&
        datePickerRef.current !== event.target &&
        !datePickerRef.current.contains(event.target);
      if (isClickOutside) {
        setOpen(false);
      }
    }
  };

  const getTrigger = () => {
    if (!selected) {
      return triggerProps?.children || 'Pick a date';
    }

    if (mode === 'single') {
      const selectedDate = selected as Date | undefined;
      return selectedDate ? formatDate(selectedDate) : (triggerProps?.children ?? formatDate(new Date()));
    }

    if (mode === 'range') {
      const selectedRange = selected as DateRange | undefined;
      return selectedRange ? formatDateRange(selectedRange) : formatDateRange({ from: new Date(), to: new Date() });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <div {...containerProps} className={classNames.container}>
      <label {...labelProps} className={classNames.label}>
        {labelProps?.children ?? 'Date'}
        <button {...triggerProps} className={classNames.trigger} type="button" onClick={handleTriggerClick}>
          {getTrigger()}
          <CalendarIcon />
        </button>
      </label>
      <div ref={datePickerRef}>
        {open && (
          <DayPicker
            className={styles.datePicker}
            animate
            mode={mode}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            selected={selected as DateRange | undefined}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onSelect={setSelected}
            showOutsideDays
            weekStartsOn={1}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            {...datePickerProps}
          />
        )}
      </div>
      {errorMessage && <div className={classNames.error}>{errorMessage}</div>}
    </div>
  );
};
