// widgets/ui/pagination/usePagination.ts
import { useMemo } from 'react';

export const DOTS = '…'; // U+2026 — сразу тот символ, что рендерим

const range = (start: number, end: number) => {
  const length = Math.max(0, end - start + 1);
  return Array.from({ length }, (_, i) => i + start);
};

export type UsePaginationParams = {
  pageCount: number; // всего страниц
  currentPage: number; // текущая (1..count)
  siblings?: number; // кол-во соседей слева/справа
};

export type PaginationItem = number | typeof DOTS;

export const usePagination = ({ pageCount, currentPage, siblings = 1 }: UsePaginationParams): PaginationItem[] => {
  return useMemo(() => {
    // защитимся от странных входов
    if (pageCount <= 1) return [1];

    // first + last + current + 2*siblings + 2*dots
    const totalPageNumbers = 2 * siblings + 5;

    // если страниц мало — показываем всё подряд
    if (totalPageNumbers >= pageCount) {
      return range(1, pageCount);
    }

    const leftSibling = Math.max(currentPage - siblings, 1);
    const rightSibling = Math.min(currentPage + siblings, pageCount);

    const shouldShowLeftDots = leftSibling > 2;
    const shouldShowRightDots = rightSibling < pageCount - 2;

    const firstPage = 1;
    const lastPage = pageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(pageCount - rightItemCount + 1, pageCount);
      return [firstPage, DOTS, ...rightRange];
    }

    const middleRange = range(leftSibling, rightSibling);
    return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
  }, [pageCount, currentPage, siblings]);
};
