import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  isFetching: boolean;
  hasMore: boolean;
}

export default function InfiniteScrollTrigger({ onIntersect, isFetching, hasMore }: InfiniteScrollTriggerProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, isFetching, hasMore]);

  if (!hasMore) return null;

  return <div ref={observerRef} style={{ height: '1px' }} />;
}
