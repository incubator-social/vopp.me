import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { ForgotPasswordForm } from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/ForgotPasswordForm';

const meta: Meta<typeof ForgotPasswordPage> = {
  title: 'PAGES/ForgotPassword',
  component: ForgotPasswordPage
};
export default meta;

type Story = StoryObj<typeof ForgotPasswordPage>;

export const Default: Story = {
  render: () => <ForgotPasswordPage />
};

export const WithForm: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ForgotPasswordForm />
    </div>
  )
};
