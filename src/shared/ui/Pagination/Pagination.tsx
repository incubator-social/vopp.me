'use client';

import { FC, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { DOTS, PaginationItem, usePagination } from './usePagination';
import ArrowIosForward from './../../assets/icons/arrow-ios-forward.svg';
import ArrowIosBack from './../../assets/icons/arrow-ios-back.svg';
import s from './pagination.module.scss';
import { Select } from '../Select/Select';

export type PaginationProps = {
  pageCount: number;
  currentPage: number;
  hidePerPageWhenSinglePage?: boolean;
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
  onChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  pageCount,
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
  onPerPageChange,
  hidePerPageWhenSinglePage = false
}) => {
  const paginationRange = usePagination({ pageCount, currentPage, siblings });

  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null;
  // }
  const hasPages = paginationRange.length >= 2;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pageCount;

  const goTo = (p: number) => {
    if (p < 1 || p > pageCount || p === currentPage) return;
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
        goTo(pageCount);
        break;
    }
  };

  const baseShowPerPage = Boolean(perPage !== undefined && perPageOptions?.length && onPerPageChange);
  const showPerPage = baseShowPerPage && (!hidePerPageWhenSinglePage || pageCount > 1);
  const perPageSelectOptions = perPageOptions?.map((v) => ({ value: String(v), label: String(v) })) ?? [];
  const effectivePerPage = perPage ?? perPageOptions?.[0] ?? 10;

  // если нет ни страниц для показа, ни селекта — только тогда ничего не рендерим
  if (!hasPages && !showPerPage) return null;

  return (
    <div className={clsx(s.container, className)}>
      <nav className={s.root} aria-label={labels.nav} onKeyDown={onKey}>
        {hasPages && (
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
        )}
        {showPerPage && (
          <div className={s.selectBox}>
            <span id="pagination-per-page-label" className={s.selectLabel}>
              {labels.show}
            </span>
            <Select
              options={perPageSelectOptions}
              size={{
                minWidth: 52,
                minHeight: 24,
                maxHeight: 24,
                arrowSize: 16,
                padding: '0 8px',
                fontSize: 14
              }}
              contentWidth="trigger"
              value={String(effectivePerPage)}
              onValueChange={(value) => onPerPageChange?.(Number(value))}
              placeholder={String(effectivePerPage)}
              // Если добавите поддержку в Select, можно прокинуть:
              // ariaLabelledBy="pagination-per-page-label"
            />
            <span className={s.selectLabel}>{labels.onPage}</span>
          </div>
        )}
      </nav>
    </div>
  );
};
