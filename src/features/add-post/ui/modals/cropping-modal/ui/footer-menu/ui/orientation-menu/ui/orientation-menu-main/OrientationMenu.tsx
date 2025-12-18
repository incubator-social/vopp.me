import { Button } from '@/src/shared/ui/Button';

import ImageOutline from '@/src/shared/assets/icons/image-outline.svg';

import styles from './OrientationMenu.module.scss';

export const OrientationMenu = () => {
  return (
    <div className={styles.orientationMenuContainer}>
      <ul>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 'auto', padding: 0 }}
            className={styles.orientationMenuButton}
          >
            Original
            <ImageOutline width={24} height={24} />
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 'auto', padding: 0 }}
            className={styles.orientationMenuButton}
          >
            1:1{' '}
            <div className={styles.buttonIconContainer}>
              <div className={styles.buttonRectangle11}></div>
            </div>
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 'auto', padding: 0 }}
            className={styles.orientationMenuButton}
          >
            4:5
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 'auto', padding: 0 }}
            className={styles.orientationMenuButton}
          >
            16:9
          </Button>
        </li>
      </ul>
    </div>
  );
};
