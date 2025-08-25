import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    rows: 3
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...'
  }
};

export const Error: Story = {
  args: {
    label: 'Bio',
    errorMessage: 'This field is required'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    disabled: true,
    value: 'This text cannot be edited'
  }
};

export const NoResize: Story = {
  args: {
    label: 'No Resize',
    resize: 'none',
    placeholder: 'Cannot resize this textarea'
  }
};

export const MultipleRows: Story = {
  args: {
    label: 'Long Text',
    rows: 6,
    placeholder: 'Enter a long text...'
  }
};

export const CustomPlaceholder: Story = {
  args: {
    label: 'Custom',
    placeholder: 'This is a custom placeholder...'
  }
};

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
