// helpers/carouselDots.ts
export function getDotsCount(imagesLength: number): number {
  if (imagesLength <= 1) return 0;
  return Math.min(imagesLength, 5);
}

export function getDotTargetIndex(selectedIndex: number, imagesLength: number, dotIdx: number): number {
  // если картинок меньше 5, просто идём по индексу
  if (imagesLength <= 5) return dotIdx;

  // если картинок больше 5 — считаем страницу
  const page = Math.floor(selectedIndex / 5);
  return page * 5 + dotIdx;
}
