import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import IconFlagRussia from './../../assets/icons/flag-russia.svg';
import IconGoogle from './../../assets/icons/google-svgrepo-com-1.svg';

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
    onClick: {
      description: 'Клик'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'buttonPrimary',
    onClick: () => alert('Button Default clicked!')
  }
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'buttonSecondary',
    onClick: () => alert('Button Secondary clicked!')
  }
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'buttonOutline',
    onClick: () => alert('Button Outline clicked!')
  }
};

export const Custom: Story = {
  args: {
    children: 'Button',
    variant: 'buttonCustom',
    onClick: () => alert('Button Dark clicked!')
  }
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'buttonPrimary',
    isDisabled: true,
    onClick: () => alert('Button Dark clicked!')
  }
};

export const TextWithIconRihgt: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline'
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      Button <IconFlagRussia />
    </Button>
  )
};

export const TextWithIconLeft: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button Dark clicked!')
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      <IconFlagRussia /> Button
    </Button>
  )
};

export const OnlyIcon: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  }
};

export const WithSpan: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      <span style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
        <IconFlagRussia /> Button
      </span>
    </Button>
  )
};

export const CustomWithIcon: Story = {
  args: {
    children: <IconGoogle />,
    variant: 'buttonOutline',
    minWidth: 15,
    minHeight: 15,
    padding: '10px 10px 3px 10px',
    onClick: () => alert('Button clicked!')
  }
};
