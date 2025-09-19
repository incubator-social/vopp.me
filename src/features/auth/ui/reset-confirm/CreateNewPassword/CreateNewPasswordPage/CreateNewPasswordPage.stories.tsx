import React from 'react';
import type { Meta } from '@storybook/nextjs';
import CreateNewPasswordPage from '@/src/features/auth/ui/reset-confirm/CreateNewPassword/CreateNewPasswordPage/CreateNewPasswordPage';

const meta: Meta<typeof CreateNewPasswordPage> = {
  title: 'PAGES/CreateNewPasswordPage',
  parameters: {
    layout: 'centered'
  },
  component: CreateNewPasswordPage
};
export default meta;

export const Default = () => {
  return <CreateNewPasswordPage />;
};
