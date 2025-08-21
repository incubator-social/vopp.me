import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Обычный чекбокс',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Выбранный по умолчанию',
    defaultChecked: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Отключённый чекбокс',
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Выбранный и отключённый',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(!!value)}
        label="Контролируемый чекбокс"
      />

      <span style={{ color: '#ffffff' }}>{checked ? '✅ Выбран' : '⬜ Не выбран'}</span>
    </div>
  );
};
