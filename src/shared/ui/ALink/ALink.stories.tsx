import ALink, { ALinkProps } from '@/src/shared/ui/ALink/ALink';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'UI/ALink',
  component: ALink,
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
    href: 'https://takeawalkonthewildside.rietveldacademie.nl/'
  }
} satisfies Meta<typeof ALink>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: ALinkProps) => {
  return <ALink href={'https://takeawalkonthewildside.rietveldacademie.nl/'}>{args.children}</ALink>;
};

export const Default: Story = {
  render: Template,
  args: {
    children: <div>Link to a crazy website</div>
  }
};
