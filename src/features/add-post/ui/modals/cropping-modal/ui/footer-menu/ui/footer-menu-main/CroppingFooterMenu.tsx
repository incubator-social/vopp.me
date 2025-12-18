import { OrientationMenu } from '../orientation-menu/ui/orientation-menu-main';
import { Button } from '@/src/shared/ui/Button';

import ExpandIcon from '@/src/shared/assets/icons/expand-outline.svg';
import { useState } from 'react';

import styles from './CroppingFooterMenu.module.scss';

// export type CroppingFooterMenuPropsType = {
// setImageCropper: (value: boolean) => void
// }

export const CroppingFooterMenu = () =>
  // { setImageCropper }: CroppingFooterMenuPropsType
  {
    const [orientationMenu, setOrientationMenu] = useState<boolean>(false);

    const onClickExpandButton = () => setOrientationMenu((prevState) => !prevState);

    return (
      <div className={styles.setupFooter}>
        <div className={styles.orientationContainer}>
          {orientationMenu && <OrientationMenu />}
          <Button
            variant={'buttonText'}
            className={styles.buttonFooter}
            onClick={onClickExpandButton}
            size={{ minWidth: 36, minHeight: 36, padding: 0 }}
          >
            <ExpandIcon />
          </Button>
        </div>
      </div>
    );
  };
