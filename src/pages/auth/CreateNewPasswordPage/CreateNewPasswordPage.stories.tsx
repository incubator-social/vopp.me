import type { Meta, StoryObj } from '@storybook/nextjs';
import CreateNewPasswordPage from './CreateNewPasswordPage';

const meta: Meta<typeof CreateNewPasswordPage> = {
  title: 'UI/CreateNewPasswordPage',
  component: CreateNewPasswordPage,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof CreateNewPasswordPage>;

export const Default: Story = {
  args: {}
};
