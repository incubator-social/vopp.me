import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from './Header';

const meta = {
  title: 'Components/UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Статус авторизации пользователя',
      defaultValue: false
    },
    notificationCount: {
      control: {
        type: 'number',
        min: 0,
        max: 20,
        step: 1
      },
      description: 'Количество непрочитанных уведомлений',
      defaultValue: 0
    }
  },
  args: {
    isLoggedIn: false,
    notificationCount: 0
  }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoggedIn: false,
    notificationCount: 0
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          height: 'auto',
          overflow: 'hidden'
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Хедер по умолчанию. Показывает состояние для неавторизованного пользователя с кнопками "Log in" и "Sign up".'
      }
    }
  }
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    notificationCount: 0
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          height: 'auto',
          overflow: 'hidden' // ← Отключаем скролл
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Хедер для неавторизованного пользователя. Показывает селект языка и кнопки "Log in" / "Sign up".'
      }
    }
  }
};

export const LoggedInNoNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 0
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          height: 'auto',
          overflow: 'hidden' // ← Отключаем скролл
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Хедер для авторизованного пользователя без уведомлений. Показывает селект языка и иконку колокольчика без бейджа.'
      }
    }
  }
};

export const LoggedInWithNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 3
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          height: 'auto',
          overflow: 'hidden' // ← Отключаем скролл
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Хедер для авторизованного пользователя с уведомлениями. Показывает селект языка и иконку колокольчика с бейджем.'
      }
    }
  }
};

export const LoggedInWithManyNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 99
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          height: 'auto',
          overflow: 'hidden' // ← Отключаем скролл
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя с большим количеством уведомлений. Показывает бейдж "9+".'
      }
    }
  }
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Header isLoggedIn={false} notificationCount={0} />
      <Header isLoggedIn={true} notificationCount={0} />
      <Header isLoggedIn={true} notificationCount={3} />
      <Header isLoggedIn={true} notificationCount={99} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все состояния хедера в одном месте для сравнения.'
      }
    }
  }
};
