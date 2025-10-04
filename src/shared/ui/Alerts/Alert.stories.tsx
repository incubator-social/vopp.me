import type { Meta, StoryObj } from '@storybook/nextjs';
import { Alert } from '@/src/shared/ui/Alerts/Alert';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';
import StoreProvider from '@/app/providers/store/StoreProvider';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <StoreProvider>
        <AlertProvider>
          <Story />
        </AlertProvider>
      </StoreProvider>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения уведомлений (toast) на основе Radix Toast. Поддерживает типы `success` и `error`.'
      }
    }
  },
  argTypes: {
    type: {
      description: 'Тип алерта: success или error',
      control: { type: 'radio' },
      options: ['success', 'error']
    },
    message: {
      description: 'Текст уведомления',
      control: 'text'
    },
    duration: {
      description: 'Время отображения (мс)',
      control: 'number'
    },
    onClose: {
      description: 'Колбэк при закрытии уведомления',
      action: 'closed'
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Операция прошла успешно!',
    duration: Infinity
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с типом **success**. Используется для отображения успешных действий пользователя.'
      }
    }
  }
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Что-то пошло не так!',
    duration: Infinity
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с типом **error**. Подходит для отображения ошибок или проблемных ситуаций.'
      }
    }
  }
};

export const LongMessage: Story = {
  args: {
    type: 'success',
    message:
      'Это уведомление с длинным текстом. Оно должно переноситься на несколько строк и оставаться читаемым. Это уведомление с длинным текстом. Оно должно переноситься на несколько строк и оставаться читаемым.',
    duration: Infinity
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример алерта с длинным текстом. Текст переносится на несколько строк и остаётся читаемым.'
      }
    }
  }
};

export const DurationThreeSeconds: Story = {
  args: {
    type: 'success',
    message: 'Исчезнет через 3 секунды.',
    duration: 3000
  },
  parameters: {
    docs: {
      description: {
        story: 'Алерт, который автоматически исчезнет через **3 секунды**.'
      }
    }
  }
};

export const MultipleAlerts: Story = {
  args: {
    type: 'success',
    message: 'Несколько уведомлений.',
    duration: 3000
  },
  render: () => (
    <>
      <Alert type="success" message="Первый алерт: всё ок!" duration={Infinity} />
      <Alert type="error" message="Второй алерт: что-то пошло не так." duration={Infinity} />
      <Alert type="success" message="Третий алерт: операция завершена." duration={Infinity} />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример с несколькими уведомлениями одновременно. Можно увидеть, как они **стакуются друг над другом**.'
      }
    }
  }
};
