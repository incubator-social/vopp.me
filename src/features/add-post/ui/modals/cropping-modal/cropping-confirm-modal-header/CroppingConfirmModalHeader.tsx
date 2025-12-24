'use client';

import { useAppDispatch } from '@/app/lib/hooks';

import { Button } from '@/src/shared/ui/Button';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';

import { setCurrentStep, Steps } from '../../../../model';

import styles from './CroppingConfirmModalHeader.module.scss';

export type CroppingConfirmModalHeaderPropsType = {
  setToConfirm: (value: boolean) => void;
};

export const CroppingConfirmModalHeader = ({ setToConfirm }: CroppingConfirmModalHeaderPropsType) => {
  const dispatch = useAppDispatch();

  const handleBack = () => {
    setToConfirm(true);
  };

  const handleNext = () => {
    dispatch(setCurrentStep(Steps.Description));
  };

  return (
    <div className={styles.headerCropping}>
      <Button
        variant={'buttonText'}
        className={styles.croppingArrowBack}
        size={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={handleBack}
      >
        <ArrowBack />
      </Button>
      <h1>Cropping</h1>
      <Button
        variant={'buttonText'}
        className={styles.croppingNext}
        size={{ padding: 0, minWidth: 'auto' }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};
