import { OptionId, options } from '@/src/widgets/Sidebar/data';
import Sidebar, { SidebarProps } from '@/src/widgets/Sidebar/Sidebar';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        gray: { name: 'gray', value: '#373737' },
        dark: { name: 'dark', value: '#191919' }
      }
    }
  },
  args: {
    value: OptionId.Feed
  }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: SidebarProps) => {
  const [value, setValue] = useState<string | undefined>(`${args.value}`);

  return <Sidebar {...args} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    onValueChange: () => {}
  }
};

export const Active: Story = {
  render: Template,
  args: {
    onValueChange: () => {}
  }
};

export const Hover: Story = {
  render: Template,
  args: {
    onValueChange: () => {}
  }
};

export const Focus: Story = {
  render: Template,
  args: {
    onValueChange: () => {}
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    onValueChange: () => {},
    isDisabledValue: options[2].id
  }
};
