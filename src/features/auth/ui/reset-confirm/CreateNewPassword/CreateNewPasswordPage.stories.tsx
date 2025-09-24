import React from 'react';
import type { Meta } from '@storybook/nextjs';
import { CreateNewPasswordForm } from '@/src/features/auth/ui/reset-confirm/CreateNewPassword/CreateNewPasswordForm';

const meta: Meta<typeof CreateNewPasswordForm> = {
  title: 'PAGES/CreateNewPasswordForm',
  parameters: {
    layout: 'centered'
  },
  component: CreateNewPasswordForm
};
export default meta;

export const Default = () => {
  return <CreateNewPasswordForm />;
};
