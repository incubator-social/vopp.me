import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['email', 'password', 'search', 'tel', 'number', 'url', 'date', 'time', 'range', 'file', 'color']
    },
    label: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    },
    errorMessage: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: {
    type: 'email'
  }
};

export const Password: Story = {
  args: {
    type: 'password'
  }
};

export const Search: Story = {
  args: {
    type: 'search'
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле поиска без лейбла'
      }
    }
  }
};

export const ActiveState: Story = {
  args: {
    type: 'email'
  }
};

export const ErrorState: Story = {
  args: {
    type: 'email',
    errorMessage: 'Invalid email format'
  }
};

export const DisabledState: Story = {
  args: {
    type: 'email',
    disabled: true
  }
};

export const CustomLabelAndPlaceholder: Story = {
  args: {
    type: 'email',
    label: 'Your Email',
    placeholder: 'Enter your email address'
  }
};
