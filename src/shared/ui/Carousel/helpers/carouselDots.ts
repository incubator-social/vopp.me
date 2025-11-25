// helpers/carouselDots.ts
export function getDotsCount(imagesLength: number): number {
  if (imagesLength <= 1) return 0;
  return Math.min(imagesLength, 5);
}

export function getDotTargetIndex(selectedIndex: number, imagesLength: number, dotIdx: number): number {
  if (imagesLength <= 5) return dotIdx;
  const page = Math.floor(selectedIndex / 5);
  return page * 5 + dotIdx;
}
