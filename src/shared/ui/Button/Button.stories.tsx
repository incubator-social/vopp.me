import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import IconFlagRussia from './../../assets/icons/flag-russia.svg';
import IconGoogle from './../../assets/icons/google-svgrepo-com-1.svg';

const meta = {
  component: Button,
  title: 'UI/Button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Кнопка — интерактивный элемент для выполнения действий.

### Основные возможности:
- ✅ 4 варианта стилей (primary, secondary, outline, text)
- 🎛️ Гибкая настройка размеров через объект size
- 🖱️ Поддержка состояния disabled
- 🎨 Поддержка иконок и любого контента
- 📏 Адаптивные размеры (px, %, rem, vw, vh и другие CSS-единицы)

### Props:
- \`variant\` - вариант стиля: 'buttonPrimary' | 'buttonSecondary' | 'buttonOutline' | 'buttonText'
- \`isDisabled\` - отключение кнопки
- \`size\` - объект с размерами:
  - \`minWidth\` / \`maxWidth\` / \`width\` - ширина (число → px, строка → как есть)
  - \`minHeight\` / \`maxHeight\` / \`height\` - высота (число → px, строка → как есть)
  - \`padding\` - внутренние отступы (число → px, строка → как есть)
- \`onClick\` - обработчик клика
- \`type\` - тип кнопки: 'button' | 'submit' | 'reset'

### Примеры использования:
\`\`\`tsx
// Числовые значения (автоматически в px)
<Button 
  variant="buttonPrimary" 
  size={{ minWidth: 200, minHeight: 40 }}
>
  Click me
</Button>

// Строковые значения (любые CSS-единицы)
<Button 
  variant="buttonPrimary" 
  size={{ width: "100%", minWidth: "200px" }}
>
  Click me
</Button>

// Комбинированные значения
<Button 
  variant="buttonPrimary" 
  size={{ minWidth: 200, height: "48px", padding: "12px 24px" }}
>
  Click me
</Button>
\`\`\``
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['buttonPrimary', 'buttonSecondary', 'buttonOutline', 'buttonText'],
      description: 'Тема кнопки'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Состояние disabled'
    },
    size: {
      description: 'Объект с размерами кнопки'
    },
    onClick: {
      description: 'Обработчик клика'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'buttonPrimary',
    onClick: () => alert('Button Default clicked!')
  }
};

Default.parameters = {
  docs: {
    description: {
      story: `Стандартная кнопка с базовой темой`
    }
  }
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'buttonSecondary',
    onClick: () => alert('Button Secondary clicked!')
  }
};

Secondary.parameters = {
  docs: {
    description: {
      story: `Кнопка с темой Secondary`
    }
  }
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'buttonOutline',
    onClick: () => alert('Button Outline clicked!')
  }
};

Outline.parameters = {
  docs: {
    description: {
      story: `Кнопка с темой Outline`
    }
  }
};

export const CustomText: Story = {
  args: {
    children: 'Button',
    variant: 'buttonText',
    onClick: () => alert('Button Dark clicked!')
  }
};

CustomText.parameters = {
  docs: {
    description: {
      story: `Кнопка без видимого бордера для большей возможности кастомизации`
    }
  }
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'buttonPrimary',
    isDisabled: true,
    onClick: () => alert('Button Dark clicked!')
  }
};

Disabled.parameters = {
  docs: {
    description: {
      story: `Заблокированная кнопка`
    }
  }
};

export const TextWithIconRihgt: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline'
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      Button <IconFlagRussia />
    </Button>
  )
};

TextWithIconRihgt.parameters = {
  docs: {
    description: {
      story: `Кнопка с текстом и иконкой справа`
    }
  }
};

export const TextWithIconLeft: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button Dark clicked!')
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      <IconFlagRussia /> Button
    </Button>
  )
};

TextWithIconLeft.parameters = {
  docs: {
    description: {
      story: `Кнопка с текстом и иконкой слева`
    }
  }
};

export const OnlyIcon: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  }
};

OnlyIcon.parameters = {
  docs: {
    description: {
      story: `Кнопка только с иконкой`
    }
  }
};

export const WithSpan: Story = {
  args: {
    children: <IconFlagRussia />,
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  },
  render: () => (
    <Button variant={'buttonOutline'} onClick={() => alert('Button clicked!')}>
      <span style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
        <IconFlagRussia /> Button
      </span>
    </Button>
  )
};

WithSpan.parameters = {
  docs: {
    description: {
      story: `Кнопка содержит внутри дополнительную обертку span и содержимое выравнивается относительно span`
    }
  }
};

export const CustomWithIcon: Story = {
  args: {
    children: <IconGoogle />,
    variant: 'buttonOutline',
    size: {
      minWidth: 15,
      minHeight: 15,
      padding: '10px 10px 3px 10px'
    },
    onClick: () => alert('Button clicked!')
  }
};

CustomWithIcon.parameters = {
  docs: {
    description: {
      story: `Кнопка c иконкой и заданными размерами`
    }
  }
};

export const ResponsiveButton: Story = {
  args: {
    children: 'Responsive Button',
    variant: 'buttonSecondary',
    size: {
      width: '100%',
      minWidth: 'min-content',
      maxWidth: '400px',
      height: 'clamp(40px, 5vh, 60px)'
    },
    onClick: () => alert('Responsive button clicked!')
  }
};

ResponsiveButton.parameters = {
  docs: {
    description: {
      story: `Адаптивная кнопка с использованием CSS-функции \`clamp()\` в объекте size.`
    }
  }
};
