import { useState } from 'react';
import { action } from 'storybook/actions';
import RadioGroup, { RadioGroupProps } from './RadioGroup';

const options = [
  { option: '1', label: 'Option 1' },
  { option: '2', label: 'Option 2' },
  { option: '3', label: 'Option 3' }
];

export default {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  argTypes: {
    onChange: { action: 'changed' }
  },
  parameters: {
    actions: {
      handles: ['focus']
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#232323' },
        light: { name: 'Light', value: '#F7F9F2' },
        gray: { name: 'Gray', value: '#f0f0f0' }
      }
    }
  }
};

const Template = (args: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(args.selectedValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    args.onChange(value);
  };

  return <RadioGroup {...args} selectedValue={selectedValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'storyGroup',
  options,
  selectedValue: '1',
  onChange: action('changed')
};

export const Active = Template.bind({});
Active.args = {
  name: 'storyGroup',
  options,
  selectedValue: '1',
  onChange: action('changed')
};

export const Hover = Template.bind({});
Hover.args = {
  name: 'storyGroup',
  options,
  selectedValue: '1',
  onChange: action('changed')
};

export const Focus = Template.bind({});
Focus.args = {
  name: 'storyGroup',
  options,
  selectedValue: '1',
  onChange: action('changed')
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'storyGroup',
  options,
  selectedValue: '1',
  onChange: action('changed')
};
