export const carouselVariants = {
  small: {
    image: { w: 234, h: 240 },
    arrow: { w: 24, h: 24 },
    dots: { w: 78, h: 12, dot: 6 }
  },
  medium: {
    image: { w: 491, h: 563 },
    arrow: { w: 48, h: 48 },
    dots: { w: 104, h: 24, dot: 8 }
  },
  large: {
    image: { w: 491, h: 504 },
    arrow: { w: 48, h: 48 },
    dots: { w: 104, h: 24, dot: 8 }
  }
} as const;

export type CarouselVariant = keyof typeof carouselVariants;
