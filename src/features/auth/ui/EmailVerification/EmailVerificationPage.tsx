'use client';

import { useEmailResendingMutation } from '@/src/features/auth/api/authApi';
import { EmailSentModal } from '@/src/features/auth/ui/email-sent-modal';
import {
  emailVerificationSchema,
  FormValuesEmailVerification
} from '@/src/features/auth/ui/EmailVerification/EmailVerificationSchema';
import { ModalDataSignUp } from '@/src/features/auth/ui/sign-up/SignUpPage';
import { setSignUpServerError } from '@/src/features/auth/ui/sign-up/utils/setSignUpServerError';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './EmailVerificationPage.module.scss';
import SuccessImage from '@/public/email-verification-img/success.svg';
import ExpiredImage from '@/public/email-verification-img/time-management.svg';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { SVGProps, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/config/routes';
import { useForm } from 'react-hook-form';

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

export const EmailVerificationPage = ({ emailStatus = 'success' }: Props) => {
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
      const result = await emailResending(email).unwrap();
      console.log(result);
      setModal({ open: true, email });
      reset({ email: '' });
    } catch (error) {
      setSignUpServerError(error, setError);
      console.error(error);
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
