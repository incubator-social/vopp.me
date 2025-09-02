// components/ui/pagination/usePagination.ts
import { useMemo } from 'react';

export const DOTS = '…'; // U+2026 — сразу тот символ, что рендерим

const range = (start: number, end: number) => {
  const length = Math.max(0, end - start + 1);
  return Array.from({ length }, (_, i) => i + start);
};

export type UsePaginationParams = {
  count: number; // всего страниц
  currentPage: number; // текущая (1..count)
  siblings?: number; // кол-во соседей слева/справа
};

export type PaginationItem = number | typeof DOTS;

export const usePagination = ({ count, currentPage, siblings = 1 }: UsePaginationParams): PaginationItem[] => {
  return useMemo(() => {
    // защитимся от странных входов
    if (count <= 1) return [1];

    // first + last + current + 2*siblings + 2*dots
    const totalPageNumbers = 2 * siblings + 5;

    // если страниц мало — показываем всё подряд
    if (totalPageNumbers >= count) {
      return range(1, count);
    }

    const leftSibling = Math.max(currentPage - siblings, 1);
    const rightSibling = Math.min(currentPage + siblings, count);

    const shouldShowLeftDots = leftSibling > 2;
    const shouldShowRightDots = rightSibling < count - 2;

    const firstPage = 1;
    const lastPage = count;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(count - rightItemCount + 1, count);
      return [firstPage, DOTS, ...rightRange];
    }

    const middleRange = range(leftSibling, rightSibling);
    return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
  }, [count, currentPage, siblings]);
};
