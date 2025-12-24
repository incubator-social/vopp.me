import { useAppDispatch } from '@/app/lib/hooks';
import { setImageAspect } from '@/src/features/add-post';
import { ASPECTS } from '@/src/features/add-post/ui/modals/cropping-modal/config/constants';
import { Button } from '@/src/shared/ui/Button';

import ImageOutline from '@/src/shared/assets/icons/image-outline.svg';
import clsx from 'clsx';
import styles from './AspectMenu.module.scss';

type AspectMenuPropsType = {
  imageId: string;
};

export const AspectMenu = ({ imageId }: AspectMenuPropsType) => {
  const dispatch = useAppDispatch();
  const onChangeAspect = (id: string, aspect: number) => {
    dispatch(setImageAspect({ id, aspect }));
  };

  return (
    <div className={styles.aspectMenuContainer}>
      <ul>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 26, padding: 0 }}
            className={styles.aspectMenuButton}
            onClick={() => {
              onChangeAspect(imageId, ASPECTS.ORIGINAL);
            }}
          >
            Original
            <ImageOutline height={24} />
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 26, padding: 0 }}
            className={styles.aspectMenuButton}
            onClick={() => {
              onChangeAspect(imageId, ASPECTS.SQUARE);
            }}
          >
            1:1
            <div className={clsx(styles.buttonIcon, styles.iconSquare)}></div>
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 26, padding: 0 }}
            className={styles.aspectMenuButton}
            onClick={() => {
              onChangeAspect(imageId, ASPECTS.PORTRAIT);
            }}
          >
            4:5
            <div className={clsx(styles.buttonIcon, styles.iconPortrait)}></div>
          </Button>
        </li>
        <li>
          <Button
            variant={'buttonText'}
            size={{ minWidth: 131, minHeight: 26, padding: 0 }}
            className={styles.aspectMenuButton}
            onClick={() => {
              onChangeAspect(imageId, ASPECTS.LANDSCAPE);
            }}
          >
            16:9
            <div className={clsx(styles.buttonIcon, styles.iconLandscape)}></div>
          </Button>
        </li>
      </ul>
    </div>
  );
};
