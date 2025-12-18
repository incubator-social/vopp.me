'use client';

import { useAppDispatch } from '@/app/lib/hooks';
import { setCurrentStep, Steps } from '@/src/features/add-post/model';
import { Button } from '@/src/shared/ui/Button';

import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';

import styles from './DescriptionConfirmModalHeader.module.scss';

export type ConfirmModalHeaderPropsType = {
  isSubmitting?: boolean;
  isLoadingPostImage?: boolean;
  isLoadingCreatePost?: boolean;
};

export const DescriptionConfirmModalHeader = ({
  isSubmitting,
  isLoadingPostImage,
  isLoadingCreatePost
}: ConfirmModalHeaderPropsType) => {
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(setCurrentStep(Steps.Cropping));
  };

  return (
    <div className={styles.headerContainer}>
      <Button
        variant={'buttonText'}
        className={styles.headerArrowBack}
        size={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={handleBack}
      >
        <ArrowBack />
      </Button>
      <h1>Publication</h1>
      <Button
        variant={'buttonText'}
        className={styles.headerNext}
        size={{ padding: 0, minWidth: 'auto' }}
        type={'submit'}
        disabled={isSubmitting || isLoadingPostImage || isLoadingCreatePost}
        form={'post-publication-form'}
      >
        Publish
      </Button>
    </div>
  );
};
