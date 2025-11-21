'use client';

import styles from './SidebarSkeleton.module.scss';

export const SidebarSkeleton = () => {
  const totalItems = 8; // всего пунктов меню

  return (
    <div className={styles.container}>
      <div className={styles.navList}>
        {Array.from({ length: totalItems }).map((_, idx) => (
          <div key={idx}>
            {idx === 7 && <div className={styles.spacer} />}
            <div className={styles.item} />
          </div>
        ))}
      </div>
    </div>
  );
};
