import StoreProvider from '@/app/providers/store/StoreProvider';
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
  return (
    <StoreProvider>
      <EmailVerification />;
    </StoreProvider>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus" по дефолту "success"`
    }
  }
};

export const WithoutInput = () => {
  return (
    <StoreProvider>
      <EmailVerification emailStatus={'expired_without_input'} />;
    </StoreProvider>
  );
};

WithoutInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_without_input"`
    }
  }
};

export const WithInput = () => {
  return (
    <StoreProvider>
      <EmailVerification emailStatus={'expired_with_input'} />;
    </StoreProvider>
  );
};

WithInput.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "expired_with_input"`
    }
  }
};

export const Success = () => {
  return (
    <StoreProvider>
      <EmailVerification emailStatus={'success'} />;
    </StoreProvider>
  );
};

Success.parameters = {
  docs: {
    description: {
      story: `Страница со значением "emailStatus": "success"`
    }
  }
};
