import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePicker } from '@/src/shared/ui/DatePicker/DatePicker';
import { getDateString } from '@/src/shared/lib/utils/dateToString';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'Компонент сделан на основе библиотеки DayPicker: https://daypicker.dev/.<br>' +
          'Компонент не помечен как клиентский из-за того, что принимает функцию в качестве пропса. Его родитель долден быть клиентским компонентом. Подробнее почитать по ссылкам: ' +
          'https://github.com/vercel/next.js/discussions/46795<br>' +
          'https://github.com/vercel/next.js/issues/74343#issuecomment-2870184138<br>' +
          'Компонент можно кастомизировать по документации библиотеки, принимает все настройки, указанные в ней, например, можно определить первый день начала недели.'
      }
    }
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: "Либо 'single' для выбора одной даты, Либо 'range' для выбора диапазона дат"
    },
    errorMessage: {
      control: { type: 'select' },
      options: [undefined, 'Required field']
    },
    containerProps: {
      description:
        'Пропсы, передаваемые в контейнер компонента. Например стили для отступов чтобы расположить элемент на странице'
    },
    labelProps: {
      description:
        'Пропсы для тега label. Текст передается через children. Пример: labelProps={{children: "Pick any date"}}'
    },
    triggerProps: {
      description: 'Пропсы для триггера - кнопки с датой и иконкой. Сюда, например, передавать disabled'
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
  args: { triggerProps: { children: getDateString(new Date()) }, labelProps: { children: 'Booking date' } }
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
