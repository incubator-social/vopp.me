'use client';

import { useEmailResendingMutation } from '@/src/features/auth/api/authApi';
import { emailVerificationSchema, FormValuesEmailVerification } from '@/src/features/auth/modal';
import Link from 'next/link';

import { ModalDataSignUp } from '@/src/features/auth/ui/SignUp/SignUp';
import { ROUTES } from '@/src/shared/config/routes';
import { SVGProps, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EmailSentModal } from '@/src/features/auth/ui/EmailSentModal';
import { setSignUpServerError } from '@/src/features/auth/ui/SignUp/utils/setSignUpServerError';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import styles from './EmailVerification.module.scss';
import SuccessImage from '@/public/email-verification-img/success.svg';
import ExpiredImage from '@/public/email-verification-img/time-management.svg';

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
  redirectLink?: string;
};

export const EmailVerification = ({ emailStatus = 'success' }: Props) => {
  const [modal, setModal] = useState<ModalDataSignUp>({ open: false, email: '' });

  const [emailResending] = useEmailResendingMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<FormValuesEmailVerification>({
    resolver: zodResolver(emailVerificationSchema),
    mode: 'onTouched',
    defaultValues: { email: '' }
  });

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

  const onSubmit = async ({ email }: Partial<FormValuesEmailVerification>) => {
    try {
      await emailResending(email as string).unwrap();
      setModal({ open: true, email });
      reset();
    } catch (error) {
      setSignUpServerError(error, setError);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.description} style={{ marginBottom: content.descriptionMarginBottom }}>
        {content.description}
      </p>

      {content.showInput ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            {...register('email')}
            type={'email'}
            label={'Email'}
            placeholder="Epam@epam.com"
            errorMessage={errors.email?.message}
            className={styles.input}
          />

          <div style={{ marginBottom: content.buttonMarginBottom }}>
            <Button type={'submit'} disabled={!isValid || !isDirty || isSubmitting} size={{ width: 229 }}>
              {content.buttonText}
            </Button>
          </div>
        </form>
      ) : (
        <div style={{ marginBottom: content.buttonMarginBottom }}>
          <Button asChild={true}>
            <Link href={{ pathname: content.redirectLink }}>{content.buttonText}</Link>
          </Button>
        </div>
      )}

      <div style={{ width: content.imageWidth, height: content.imageHeight }}>
        <ImageComponent width={content.imageWidth} height={content.imageHeight} />
      </div>

      {modal.open && (
        <EmailSentModal
          open={modal.open}
          email={modal.email}
          onOpenChange={(open) => setModal({ open, email: modal.email })}
          classOverlay={styles.classOverlay}
        />
      )}
    </div>
  );
};
