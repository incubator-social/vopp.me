import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import { options } from './data';
import { Sidebar, SidebarProps } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'gray', value: '#373737' },
        { name: 'dark', value: '#191919' }
      ]
    }
  },
  args: {
    value: 'feed',
    disabledValue: null
  }
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const Template: Story['render'] = (args: SidebarProps) => {
  const [value, setValue] = useState<string>(args.value);

  return (
    <div style={{ padding: 20 }}>
      <Sidebar
        {...args}
        value={value}
        onChange={setValue} // ← ИСПРАВЛЕНО
      />
    </div>
  );
};

export const Default: Story = {
  render: Template
};

export const WithDisabled: Story = {
  render: Template,
  args: {
    disabledValue: options[2].id
  }
};

export const ActiveItem: Story = {
  render: Template,
  args: {
    value: options[1].id
  }
};

export const Focused: Story = {
  render: Template,
  args: {}
};

export const Hovered: Story = {
  render: Template,
  args: {}
};
