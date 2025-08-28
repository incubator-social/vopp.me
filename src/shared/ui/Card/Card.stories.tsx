import Card from './Card';

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
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = () => {
  return <Card />;
};

export const Default: Story = {
  render: Template
};
