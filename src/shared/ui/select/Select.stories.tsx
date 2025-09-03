import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CustomSelect } from './Select';
import IconFlagRussia from './../../assets/icons/flag-russia.svg';
import IconFlagUnitedKingdom from './../../assets/icons/flag-united-kingdom.svg';

const meta = {
  component: CustomSelect,
  title: 'UI/Select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Это компонент селект, позволяет выбирать разные штуки'
      }
    }
  }
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
];

const onlyNumber = [
  { value: '1', label: '1' },
  { value: '2', label: '10' },
  { value: '3', label: '100' }
];

const optionsWithIcons = [
  { value: '1', label: 'Option with Icon 1', icon: IconFlagRussia },
  { value: '2', label: 'Option with Icon 2', icon: IconFlagUnitedKingdom },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
];

const optionsWithIconsOnly = [
  { value: '1', label: '', icon: IconFlagRussia },
  { value: '2', label: '', icon: IconFlagUnitedKingdom }
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите опцию...'
  }
};

export const NumbersOptions: Story = {
  args: {
    options: onlyNumber,
    placeholder: 'Custom sizes...',
    defaultValue: '3'
  }
};

export const DisabledSelect: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select is disabled',
    isDisabled: true
  }
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'No options available...'
  }
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    defaultValue: '3',
    placeholder: 'Выберите опцию...'
  }
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Выберите опцию с иконкой...'
  }
};

export const CustomSizes: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Custom sizes...',
    size: {
      fontSize: 21,
      width: 270
    }
  }
};

export const OnlyIcon: Story = {
  args: {
    defaultValue: '1',
    options: optionsWithIconsOnly,
    placeholder: ''
  }
};
