import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePicker } from '@/src/shared/ui/DatePicker/DatePicker';
import { formatDate } from '@/src/shared/utils/formateDate';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'More about this component in React DayPicker docs: https://daypicker.dev/.<br>' +
          "This component shouldn't be a client component, but it must be used inside a client component " +
          'because a function is passed as a prop.<br>' +
          'More details here:<br>' +
          'https://github.com/vercel/next.js/discussions/46795<br>' +
          'And here:<br>' +
          'https://github.com/vercel/next.js/issues/74343#issuecomment-2870184138'
      }
    }
  },
  argTypes: {
    errorMessage: {
      control: { type: 'select' },
      options: [undefined, 'Required field']
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range']
    }
  },
  args: {
    containerProps: { style: { minHeight: '360px' } }
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {};

export const RangeMode: Story = {
  args: { mode: 'range' }
};

export const WithCustomLabelAndTrigger: Story = {
  args: { triggerProps: { children: formatDate(new Date()) }, labelProps: { children: 'Booking date' } }
};

export const WithError: Story = {
  args: { errorMessage: 'Required field' }
};

export const Disabled: Story = {
  args: { triggerProps: { disabled: true } }
};

// full example:
// =====================

// <DatePicker
//   onChange={() => console.log('onChange')}
//   mode={'range'}
//   triggerProps={{ children: 'Select range' }}
//   labelProps={{ children: 'Booking date' }}
//   containerProps={{ style: { margin: '50px' } }}
// />;
