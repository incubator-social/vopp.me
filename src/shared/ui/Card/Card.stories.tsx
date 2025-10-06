import { Meta, StoryObj } from '@storybook/nextjs';
import Card, { CardProps } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        gray: { name: 'gray', value: '#373737' },
        dark: { name: 'dark', value: '#191919' }
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: CardProps) => {
  return <Card>{args.children}</Card>;
};

export const Default: Story = {
  render: Template,
  args: {
    children: <h1>Content</h1>
  }
};

export const WithInlineStyles: Story = {
  render: Template,
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '23px 24px 24px'
        }}
      >
        <h1 style={{ marginBottom: '13px' }}>Sign Up</h1>
      </div>
    )
  }
};
