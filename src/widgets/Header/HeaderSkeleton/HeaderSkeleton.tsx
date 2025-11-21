'use client';

import styles from './HeaderSkeleton.module.scss';

export const HeaderSkeleton = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSkeleton} />
        <div className={styles.rightSkeleton}>
          <div className={styles.item} />
          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </header>
  );
};
