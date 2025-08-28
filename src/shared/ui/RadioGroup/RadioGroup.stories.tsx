import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import RadioGroup, { RadioGroupProps } from './RadioGroup';

const options = [
  { option: '1', label: 'Option 1' },
  { option: '2', label: 'Option 2' },
  { option: '3', label: 'Option 3' }
];

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
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
    name: 'radio-group-story',
    options,
    required: false,
    onChange: () => {}
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: RadioGroupProps) => {
  const [value, setValue] = useState<string | undefined>(args.selectedValue);

  return <RadioGroup {...args} selectedValue={value} onChange={setValue} />;
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
    disabled: true
  }
};
