import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
      description: 'Статус авторизации пользователя'
    },
    notificationCount: {
      control: {
        type: 'number',
        min: 0,
        max: 20,
        step: 1
      },
      description: 'Количество непрочитанных уведомлений'
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
  args: {}
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    notificationCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер для неавторизованного пользователя. Показывает кнопки "Log in" и "Sign up"'
      }
    }
  }
};

export const LoggedInNoNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя без уведомлений'
      }
    }
  }
};

export const LoggedInWithNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя с уведомлениями. Показывает бейдж с количеством'
      }
    }
  }
};

export const LoggedInWithManyNotifications: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 15
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя с большим количеством уведомлений. Показывает "9+"'
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
      <Header isLoggedIn={true} notificationCount={12} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все состояния хедера в одном месте для сравнения'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: function Render(args) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(args.isLoggedIn);
    const [notificationCount, setNotificationCount] = React.useState(args.notificationCount);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label>
            <input type="checkbox" checked={isLoggedIn} onChange={(e) => setIsLoggedIn(e.target.checked)} />
            Пользователь авторизован
          </label>

          {isLoggedIn && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Уведомления:
              <input
                type="range"
                min="0"
                max="20"
                value={notificationCount}
                onChange={(e) => setNotificationCount(Number(e.target.value))}
              />
              <span>{notificationCount}</span>
            </label>
          )}
        </div>

        <Header isLoggedIn={isLoggedIn} notificationCount={notificationCount} />
      </div>
    );
  },
  args: {
    isLoggedIn: false,
    notificationCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная демонстрация с возможностью переключать состояния'
      }
    }
  }
};

export const WithCustomStyles: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер с кастомными стилями (если компонент поддерживает пропс className)'
      }
    }
  }
};

export const MobileView: Story = {
  args: {
    isLoggedIn: true,
    notificationCount: 2
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Версия хедера для мобильных устройств'
      }
    }
  }
};

export const TabletView: Story = {
  args: {
    isLoggedIn: false,
    notificationCount: 0
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Версия хедера для планшетов'
      }
    }
  }
};
