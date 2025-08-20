import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['email', 'password', 'search'],
    },
    variant: {
      control: 'select',
      options: ['default', 'active', 'error'],
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: {
    type: 'email',
    variant: 'default',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    variant: 'default',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле поиска без лейбла',
      },
    },
  },
};

export const ActiveState: Story = {
  args: {
    type: 'email',
    variant: 'active',
  },
};

export const ErrorState: Story = {
  args: {
    type: 'email',
    variant: 'error',
    errorMessage: 'Invalid email format',
  },
};

export const DisabledState: Story = {
  args: {
    type: 'email',
    variant: 'default',
    disabled: true,
  },
};

export const CustomLabelAndPlaceholder: Story = {
  args: {
    type: 'email',
    variant: 'default',
    label: 'Your Email',
    placeholder: 'Enter your email address',
  },
};
