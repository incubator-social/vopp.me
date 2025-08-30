import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  component: Button,
  title: 'UI/Button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Это компонент кнопки, который можно использовать для различных действий'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['buttonPrimary', 'buttonSecondary', 'buttonDark'],
      description: 'Тема кнопки'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Состояние disabled'
    },
    size: {
      control: { type: 'radio' },
      options: ['buttonBig', 'buttonSmall'],
      description: 'Ширина кнопки'
    },
    onClick: {
      description: 'Клик'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Button',
    variant: 'buttonPrimary',
    onClick: () => alert('Button Default clicked!')
  }
};

export const Secondary: Story = {
  args: {
    title: 'Button',
    variant: 'buttonSecondary',
    onClick: () => alert('Button Secondary clicked!')
  }
};

export const Dark: Story = {
  args: {
    title: 'Button',
    variant: 'buttonDark',
    onClick: () => alert('Button Dark clicked!')
  }
};
