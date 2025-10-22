'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import styles from './Carousel.module.scss';
import { carouselVariants, CarouselVariant } from './variants';
import type { EmblaOptionsType } from 'embla-carousel';
import ArrowBackOutline from './../../assets/icons/arrow-ios-back-outline.svg';
import ArrowForwardOutline from './../../assets/icons/arrow-ios-forward-outline.svg';
import { getDotTargetIndex, getDotsCount } from './carouselDots';

type CarouselImage = {
  url: string;
  width: number;
  height: number;
  fileSize?: number;
  createdAt?: string;
  uploadId?: string;
};

type Props = {
  images: CarouselImage[];
  variant?: CarouselVariant;
  options?: EmblaOptionsType;
};

export const Carousel = ({ images, variant = 'small', options }: Props) => {
  const config = carouselVariants[variant];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className={styles.carousel}>
      {/* Viewport */}
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((image, idx) => (
            <div
              className={styles.slide}
              key={image.uploadId ?? idx}
              style={{ width: config.image.w, height: config.image.h }}
            >
              <img src={image.url} alt={`slide-${idx}`} className={styles.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — только если больше одной картинки */}
      {images.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.prev}`}
            style={{ width: config.arrow.w, height: config.arrow.h }}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowBackOutline width={config.arrow.w} height={config.arrow.h} />
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            style={{ width: config.arrow.w, height: config.arrow.h }}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowForwardOutline width={config.arrow.w} height={config.arrow.h} />
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className={styles.dots} style={{ width: config.dots.w, height: config.dots.h }}>
          {Array.from({ length: getDotsCount(images.length) }).map((_, idx) => {
            const targetIndex = getDotTargetIndex(selectedIndex, images.length, idx);

            return (
              <button
                key={idx}
                className={`${styles.dot} ${idx === selectedIndex % getDotsCount(images.length) ? styles.activeDot : ''}`}
                style={{ width: config.dots.dot, height: config.dots.dot }}
                onClick={() => scrollTo(targetIndex)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
