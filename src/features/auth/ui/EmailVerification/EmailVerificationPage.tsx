'use client';

import styles from './EmailVerificationPage.module.scss';
import SuccessImage from '@/public/email-verification-img/success.svg';
import ExpiredImage from '@/public/email-verification-img/time-management.svg';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { SVGProps } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/config/routes';
import { useForm, FormValues } from 'react-hook-form';

type EmailStatus = 'success' | 'expired_with_input' | 'expired_without_input';

type Props = {
  emailStatus?: EmailStatus;
  initialEmail?: string;
};

type ContentType = {
  image: React.ComponentType<SVGProps<SVGSVGElement>>;
  imageWidth: number;
  imageHeight: number;
  title: string;
  description: string;
  descriptionMarginBottom: number;
  showInput: boolean;
  buttonText: string;
  buttonMarginBottom: number;
};

export const EmailVerificationPage = ({ emailStatus = 'success', initialEmail = '' }: Props) => {
  const {} = useForm<FormValues>({});

  const expiredContent = {
    image: ExpiredImage,
    imageWidth: 473,
    imageHeight: 352.44,
    title: 'Email verification link expired',
    description: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    descriptionMarginBottom: 30
  };

  const contentCases = {
    successCase: {
      image: SuccessImage,
      imageWidth: 432,
      imageHeight: 300,
      title: 'Congratulations!',
      description: 'Your email has been confirmed',
      descriptionMarginBottom: 54,
      showInput: false,
      buttonText: 'Sign In',
      buttonMarginBottom: 72,
      redirectLink: ROUTES.AUTH.SIGN_IN
    },

    expiredWithInputCase: {
      ...expiredContent,
      showInput: true,
      buttonText: 'Resend verification link',
      buttonMarginBottom: 36
    },

    expiredWithoutInputCase: {
      ...expiredContent,
      showInput: false,
      buttonText: 'Resend link',
      buttonMarginBottom: 31
    }
  };

  const getContent = (): ContentType => {
    switch (emailStatus) {
      case 'success':
        return contentCases.successCase;
      case 'expired_with_input':
        return contentCases.expiredWithInputCase;
      case 'expired_without_input':
        return contentCases.expiredWithoutInputCase;
      default:
        return contentCases.successCase;
    }
  };

  const content = getContent();
  const ImageComponent = content.image;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.description} style={{ marginBottom: content.descriptionMarginBottom }}>
        {content.description}
      </p>

      {content.showInput ? (
        <form>
          <Input type={'email'} label={'Email'} placeholder="Epam@epam.com" className={styles.input} />
          <div style={{ marginBottom: content.buttonMarginBottom }}>
            <Button>{content.buttonText}</Button>
          </div>
        </form>
      ) : (
        <div style={{ marginBottom: content.buttonMarginBottom }}>
          {contentCases.successCase ? (
            <Button asChild={true}>
              <Link href={ROUTES.AUTH.SIGN_IN}>{content.buttonText}</Link>
            </Button>
          ) : (
            <Button>{content.buttonText}</Button>
          )}
        </div>
      )}

      <div style={{ width: content.imageWidth, height: content.imageHeight }}>
        <ImageComponent width={content.imageWidth} height={content.imageHeight} />
      </div>
    </div>
  );
};
