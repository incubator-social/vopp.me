'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { forwardRef } from 'react';

type Props = {
  onChangeAction: (value: string | null) => void;
  className?: string;
};

const language = 'en';

export const Recaptcha = forwardRef<ReCAPTCHA, Props>(({ onChangeAction, className }, ref) => {
  return (
    <div className={className}>
      <ReCAPTCHA
        ref={ref}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChangeAction}
        theme={'dark'}
        hl={language}
      />
    </div>
  );
});

Recaptcha.displayName = 'Recaptcha';
