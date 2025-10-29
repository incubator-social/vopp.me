export const carouselVariants = {
  small: {
    arrow: { w: 24, h: 24 },
    dots: { w: 78, h: 12, dot: 6 },
    image: { w: 234, h: 240 }
  },
  large: {
    arrow: { w: 48, h: 48 },
    dots: { w: 104, h: 24, dot: 8 },
    image: { w: 490, h: 563 }
  }
} as const;

export type CarouselVariant = keyof typeof carouselVariants;
