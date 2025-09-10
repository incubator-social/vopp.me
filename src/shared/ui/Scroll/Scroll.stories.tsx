import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Scroll from './Scroll';

const meta = {
  title: 'UI/Scroll',
  component: Scroll,
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        gray: { name: 'gray', value: '#373737' },
        dark: { name: 'dark', value: '#191919' }
      }
    }
  }
} satisfies Meta<typeof Scroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args) => {
  return (
    <div style={{ width: '300px', height: '300px', border: '1px solid var(--color-light-900)', borderRadius: '3px' }}>
      <Scroll {...args} />
    </div>
  );
};

export const Horizontal: Story = {
  render: Template,
  args: {
    children: <div style={{ width: '500px' }}></div>
  }
};
export const HorizontalHover: Story = {
  render: Template,
  args: {
    children: <div style={{ width: '500px' }}></div>
  }
};

export const Vertical: Story = {
  render: Template,
  args: {
    children: <div style={{ height: '500px' }}></div>
  }
};

export const VerticalHover: Story = {
  render: Template,
  args: {
    children: <div style={{ height: '500px' }}></div>
  }
};
