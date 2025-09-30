'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

type Props = {
  onChangeAction: (value: string | null) => void;
  className?: string;
};

const language = 'en';

export const Recaptcha = ({ onChangeAction, className }: Props) => {
  return (
    <div className={className}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChangeAction}
        theme={'dark'}
        hl={language}
      />
    </div>
  );
};
