import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Components/UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Хедер по умолчанию. Показывает состояние для неавторизованного пользователя с кнопками "Log in" и "Sign up".'
      }
    }
  }
};

export const LoggedOut: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Хедер для неавторизованного пользователя. Показывает селект языка и кнопки "Log in" / "Sign up".'
      }
    }
  }
};

export const LoggedInNoNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя без уведомлений. Показывает селект языка и иконку колокольчика без бейджа.'
      }
    }
  }
};

export const LoggedInWithNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Хедер для авторизованного пользователя с уведомлениями. Показывает селект языка и иконку колокольчика с бейджем.'
      }
    }
  }
};

export const LoggedInWithManyNotifications: Story = {
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
      <Header />
      <Header />
      <Header />
      <Header />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все состояния хедера в одном месте для сравнения. Компонент использует внутреннее состояние, поэтому все экземпляры будут синхронизированы.'
      }
    }
  }
};

export const TestEnvironment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Тестовая среда для проверки работы переключения состояний. Используйте кнопки "Login/Logout" и "+1 Notif" в правом верхнем углу для тестирования различных состояний хедера.'
      }
    }
  }
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Версия хедера для мобильных устройств. Проверьте адаптивность на разных разрешениях.'
      }
    }
  }
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Версия хедера для планшетов. Проверьте адаптивность на средних разрешениях.'
      }
    }
  }
};

/*
// 🔮 ДЛЯ БУДУЩЕГО REDUX-ИНТЕГРАЦИИ:

// Когда переедем на Redux, можно будет использовать контролы:
// argTypes: {
//   isLoggedIn: {
//     control: 'boolean',
//     description: 'Статус авторизации пользователя'
//   },
//   notificationCount: {
//     control: {
//       type: 'number',
//       min: 0,
//       max: 20,
//       step: 1
//     },
//     description: 'Количество непрочитанных уведомлений'
//   }
// },
// args: {
//   isLoggedIn: false,
//   notificationCount: 0
// }

*/