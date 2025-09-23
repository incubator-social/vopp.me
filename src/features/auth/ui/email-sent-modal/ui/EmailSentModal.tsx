'use client';

import { AlertModal } from '@/src/shared/ui/AlertModal/AlertModal';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
};

export const EmailSentModal = ({ open, onOpenChange, email }: Props) => {
  const message = `We have sent a link to confirm your email to ${email}`;
  return <AlertModal open={open} onOpenChange={onOpenChange} title="Email sent" message={message} confirmText="OK" />;
};
