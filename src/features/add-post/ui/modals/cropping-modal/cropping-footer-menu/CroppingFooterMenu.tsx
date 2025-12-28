'use client';

import { AspectMenu } from './menu-aspect/AspectMenu';
import { Button } from '@/src/shared/ui/Button';

import ExpandIcon from '@/src/shared/assets/icons/expand-outline.svg';
import { useState } from 'react';

import styles from './CroppingFooterMenu.module.scss';

export type CroppingFooterMenuPropsType = {
  imageId: string;
  setImageCropper: () => void;
};

export const CroppingFooterMenu = ({ imageId, setImageCropper }: CroppingFooterMenuPropsType) => {
  const [aspectMenu, setAspectMenu] = useState<boolean>(false);

  const onClickExpandButton = () => {
    setAspectMenu((prevState) => !prevState);
    setImageCropper();
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.orientationMenuButton}>
        {aspectMenu && <AspectMenu imageId={imageId} />}
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
