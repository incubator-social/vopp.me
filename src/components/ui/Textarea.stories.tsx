import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
// import { fn } from '@storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст лейбла'
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
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'Возможность изменения размера'
    },
    rows: {
      control: 'number',
      description: 'Количество строк'
    }
  },
  args: {
    // onChange: fn(),
    // onFocus: fn(),
    // onBlur: fn(),
    rows: 3
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая textarea
export const Default: Story = {
  args: {}
};

// С лейблом
export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...'
  }
};

// С ошибкой
export const Error: Story = {
  args: {
    label: 'Bio',
    errorMessage: 'This field is required'
  }
};

// Disabled состояние
export const Disabled: Story = {
  args: {
    label: 'Read Only',
    disabled: true,
    value: 'This text cannot be edited'
  }
};

// Без resize
export const NoResize: Story = {
  args: {
    label: 'No Resize',
    resize: 'none',
    placeholder: 'Cannot resize this textarea'
  }
};

// Много строк
export const MultipleRows: Story = {
  args: {
    label: 'Long Text',
    rows: 6,
    placeholder: 'Enter a long text...'
  }
};

// Кастомный плейсхолдер
export const CustomPlaceholder: Story = {
  args: {
    label: 'Custom',
    placeholder: 'This is a custom placeholder...'
  }
};

// Все состояния
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <Textarea label="Default Textarea" />
      <Textarea label="With Value" defaultValue="Already filled text" />
      <Textarea label="Disabled" disabled value="Cannot edit this" />
      <Textarea label="Error State" errorMessage="Field is required" />
      <Textarea label="No Resize" resize="none" />
      <Textarea label="5 Rows" rows={5} />
    </div>
  )
};
