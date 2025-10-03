import type { Meta } from '@storybook/nextjs';
import { EmailVerification } from '@/src/features/auth/ui/EmailVerification/EmailVerification';

const meta: Meta<typeof EmailVerification> = {
  title: 'PAGES/EmailVerification',
  component: EmailVerification,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = () => {
  return <EmailVerification />;
};

Default.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus" по дефолту "success"`
    }
  }
};

export const WithoutInput = () => {
  return <EmailVerification emailStatus={'expired_without_input'} />;
};

WithoutInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_without_input"`
    }
  }
};

export const WithInput = () => {
  return <EmailVerification emailStatus={'expired_with_input'} />;
};

WithInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_with_input"`
    }
  }
};

export const Success = () => {
  return <EmailVerification emailStatus={'success'} />;
};

Success.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "success"`
    }
  }
};
