import type { Meta } from '@storybook/nextjs';
import { EmailVerificationPage } from './EmailVerificationPage';

const meta: Meta<typeof EmailVerificationPage> = {
  title: 'PAGES/EmailVerificationPage',
  component: EmailVerificationPage,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = () => {
  return <EmailVerificationPage />;
};

Default.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus" по дефолту "success"`
    }
  }
};

export const WithoutInput = () => {
  return <EmailVerificationPage emailStatus={'expired_without_input'} />;
};

WithoutInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_without_input"`
    }
  }
};

export const WithInput = () => {
  return <EmailVerificationPage emailStatus={'expired_with_input'} />;
};

WithInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_with_input"`
    }
  }
};

export const Success = () => {
  return <EmailVerificationPage emailStatus={'success'} />;
};

Success.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "success"`
    }
  }
};
