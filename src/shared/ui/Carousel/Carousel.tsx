'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import styles from './Carousel.module.scss';
import { carouselVariants, CarouselVariant } from './constants/variants';
import type { EmblaOptionsType } from 'embla-carousel';
import ArrowBackOutline from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';
import ArrowForwardOutline from '@/src/shared/assets/icons/arrow-ios-forward-outline.svg';
import { getDotTargetIndex, getDotsCount } from './helpers/carouselDots';
import Image from 'next/image';
import clsx from 'clsx';

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

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={styles.carousel}>
      {/* Viewport */}
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((image, idx) => (
            <div className={styles.slide} key={image.uploadId ?? idx}>
              <Image
                src={image.url}
                alt={`slide-${idx}`}
                fill
                sizes={`(max-width: 600px) 100vw, ${config.image.w}px`}
                priority={idx === 0}
                className={styles.image}
                onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            className={clsx(styles.arrow, styles.prev)}
            style={{ width: config.arrow.w, height: config.arrow.h }}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowBackOutline width={config.arrow.w} height={config.arrow.h} />
          </button>
          <button
            className={clsx(styles.arrow, styles.next)}
            style={{ width: config.arrow.w, height: config.arrow.h }}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowForwardOutline width={config.arrow.w} height={config.arrow.h} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className={styles.dots} style={{ width: config.dots.w, height: config.dots.h }}>
          {Array.from({ length: getDotsCount(images.length) }).map((_, idx) => {
            const targetIndex = getDotTargetIndex(selectedIndex, images.length, idx);
            const isActive = idx === selectedIndex % getDotsCount(images.length);

            return (
              <button
                key={idx}
                className={clsx(styles.dot, isActive && styles.activeDot)}
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
