import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Sidebar, { SidebarProps } from './Sidebar';
import { options } from './data';

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
  }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: SidebarProps) => {
  return <Sidebar {...args} />;
};

export const Default: Story = {
  render: Template
};

export const Active: Story = {
  render: Template
};

export const Hover: Story = {
  render: Template
};

export const Focus: Story = {
  render: Template
};

export const Disabled: Story = {
  render: Template,
  args: {
    isDisabledValue: options.main[2].value
  }
};
