import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки поля ввода'
    },
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера'
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled'
    },
    errorMessage: {
      control: 'text',
      description: 'Текст ошибки'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'number', 'url'],
      description: 'Тип поля ввода'
    }
  },
  args: {
    placeholder: 'Enter text'
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {}
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email'
  }
};

export const Error: Story = {
  args: {
    label: 'Email',
    errorMessage: 'Invalid email format'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    placeholder: 'Cannot edit this field'
  }
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...'
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-input-id',
    label: 'With Custom ID',
    placeholder: 'Accessible input field'
  }
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Input label="Default Input" />
      <Input label="With Value" defaultValue="Filled text" />
      <Input label="Disabled" disabled placeholder="Cannot edit" />
      <Input label="Error State" errorMessage="Field is required" />
      <Input type="search" placeholder="Search..." />
      <Input type="password" label="Password" placeholder="Enter password" />
    </div>
  )
};
