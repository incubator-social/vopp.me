import styles from './PostsGridSkeleton.module.scss';

type PostsGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function PostsGridSkeleton({ count = 8, className = '' }: PostsGridSkeletonProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeleton} />
      ))}
    </div>
  );
}
