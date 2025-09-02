'use client';

import { FC, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { DOTS, PaginationItem, usePagination } from './usePagination';
import ArrowIosForward from './../../assets/icons/arrow-ios-forward.svg';
import ArrowIosBack from './../../assets/icons/arrow-ios-back.svg';
import s from './pagination.module.scss';

export type PaginationProps = {
  count: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
  labels?: {
    nav?: string;
    prev?: string;
    next?: string;
    show?: string;
    onPage?: string;
  };
  perPage?: number;
  perPageOptions?: number[];
  onPerPageChange?: (value: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  count,
  currentPage,
  onChange,
  siblings = 1,
  className,
  labels = {
    nav: 'Pagination',
    prev: 'Previous page',
    next: 'Next page',
    show: 'Show',
    onPage: 'on page'
  },
  perPage,
  perPageOptions,
  onPerPageChange
}) => {
  const paginationRange = usePagination({ count, currentPage, siblings });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= count;

  const goTo = (p: number) => {
    if (p < 1 || p > count || p === currentPage) return;
    onChange(p);
  };

  const onPrev = () => goTo(currentPage - 1);
  const onNext = () => goTo(currentPage + 1);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onNext();
        break;
      case 'Home':
        e.preventDefault();
        goTo(1);
        break;
      case 'End':
        e.preventDefault();
        goTo(count);
        break;
    }
  };

  const showPerPage = perPage !== undefined && perPageOptions && onPerPageChange;

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.root} role="navigation" aria-label={labels.nav} onKeyDown={onKey}>
        <ul className={s.pages}>
          <li>
            <button
              type="button"
              className={clsx(s.item, s.icon)}
              aria-label={labels.prev}
              onClick={onPrev}
              disabled={isFirst}
            >
              <ArrowIosBack width={16} height={16} />
            </button>
          </li>

          {paginationRange.map((item: PaginationItem, idx) =>
            item === DOTS ? (
              <li key={`dots-${idx}`} className={s.dots} aria-hidden="true">
                {DOTS}
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  className={clsx(s.item, item === currentPage && s.selected)}
                  aria-label={`Go to page ${item}`}
                  aria-current={item === currentPage ? 'page' : undefined}
                  onClick={() => goTo(item)}
                  disabled={item === currentPage}
                >
                  {item}
                </button>
              </li>
            )
          )}

          <li>
            <button
              type="button"
              className={clsx(s.item, s.icon)}
              aria-label={labels.next}
              onClick={onNext}
              disabled={isLast}
            >
              <ArrowIosForward width={16} height={16} />
            </button>
          </li>
        </ul>

        {showPerPage && (
          <div className={s.selectBox}>
            <span className={s.selectLabel}>{labels.show}</span>
            <label className={s.visuallyHidden} htmlFor="pagination-per-page">
              {labels.show}
            </label>
            <select
              id="pagination-per-page"
              className={s.select}
              value={perPage}
              onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            >
              {perPageOptions!.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <span className={s.selectLabel}>{labels.onPage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
