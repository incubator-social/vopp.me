import { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';
import IconFlagRussia from './../../assets/icons/flag-russia.svg';
import IconGoogle from './../../assets/icons/google-svgrepo-com-1.svg';
import Link from 'next/link';

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
- 🔄 Поддержка asChild для композиции с другими компонентами

### Props:
- \`variant\` - вариант стиля: 'buttonPrimary' | 'buttonSecondary' | 'buttonOutline' | 'buttonText'
- \`disabled\` - отключение кнопки
- \`size\` - объект с размерами:
  - \`minWidth\` / \`maxWidth\` / \`width\` - ширина (число → px, строка → как есть)
  - \`minHeight\` / \`maxHeight\` / \`height\` - высота (число → px, строка → как есть)
  - \`padding\` - внутренние отступы (число → px, строка → как есть)
  - \`margin\` - внешние отступы (число → px, строка → как есть)
- \`onClick\` - обработчик клика
- \`type\` - тип кнопки: 'button' | 'submit' | 'reset'
- \`asChild\` - использование Slot из Radix UI для композиции с другими компонентами
- \`className\` - для добавления своих дополнительных стилей

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

// Использование asChild для создания ссылки
<Button 
  variant="buttonPrimary" 
  asChild
>
  <Link href="/some-page">
    Go to page
  </Link>
</Button>

// Использование asChild с кастомным компонентом
<Button 
  variant="buttonOutline" 
  asChild
>
  <CustomComponent onClick={handleClick}>
    Custom action
  </CustomComponent>
</Button>
\`\`\`

### Особенности работы с asChild:
При передаче пропса \`asChild={true}\` компонент Button не создает собственный DOM-элемент,
а вместо этого передает все свои пропсы и стили первому дочернему элементу через Slot из Radix UI.
Это позволяет использовать Button для стилизации любых компонентов, сохраняя единый визуальный стиль.

\`\`\`tsx
// Без asChild - создается элемент button
<Button variant="buttonPrimary">
  Click me
</Button>

// С asChild - создается элемент a (ссылка) с стилями кнопки
<Button variant="buttonPrimary" asChild>
  <a href="https://example.com">
    Go to example
  </a>
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
    disabled: {
      control: { type: 'boolean' },
      description: 'Состояние disabled'
    },
    size: {
      description: 'Объект с размерами кнопки'
    },
    onClick: {
      description: 'Обработчик клика'
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Использование Slot из Radix UI для композиции'
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

export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'buttonText',
    onClick: () => alert('Button Dark clicked!')
  }
};

Text.parameters = {
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
    disabled: true,
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

export const TextWithIconRight: Story = {
  args: {
    children: '',
    onClick: () => alert('Button clicked!'),
    variant: 'buttonOutline'
  },
  render: (args) => (
    <Button {...args}>
      Button <IconFlagRussia width={24} height={24} />
    </Button>
  )
};

TextWithIconRight.parameters = {
  docs: {
    description: {
      story: `Кнопка с текстом и иконкой справа`
    }
  }
};

export const TextWithIconLeft: Story = {
  args: {
    children: '',
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  },
  render: (args) => (
    <Button {...args}>
      <IconFlagRussia width={24} height={24} /> Button
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
    children: '',
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  },
  render: (args) => (
    <Button {...args}>
      <IconFlagRussia width={24} height={24} />
    </Button>
  )
};

OnlyIcon.parameters = {
  docs: {
    description: {
      story: `Кнопка только с иконкой`
    }
  }
};

export const WithCustomContent: Story = {
  args: {
    children: '',
    variant: 'buttonOutline',
    onClick: () => alert('Button clicked!')
  },
  render: (args) => (
    <Button {...args}>
      <span style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
        <IconFlagRussia width={24} height={24} /> Button
      </span>
    </Button>
  )
};

WithCustomContent.parameters = {
  docs: {
    description: {
      story: `Кнопка содержит внутри дополнительную обертку span и содержимое выравнивается относительно span`
    }
  }
};

export const CustomWithIcon: Story = {
  args: {
    children: '',
    variant: 'buttonOutline',
    size: {
      minWidth: 15,
      minHeight: 15,
      padding: '10px'
    },
    onClick: () => alert('Button clicked!')
  },
  render: (args) => (
    <Button {...args}>
      <IconGoogle width={24} height={24} />
    </Button>
  )
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

export const MarginParametrs: Story = {
  args: {
    children: '',
    size: {
      margin: '20px 0px 20px 0px'
    },
    onClick: () => alert('Button clicked!')
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ border: '5px solid #fefefe', width: 300 }}></div>
      <Button {...args}>Button</Button>
      <div style={{ border: '5px solid #fefefe', width: 300 }}></div>
    </div>
  )
};

MarginParametrs.parameters = {
  docs: {
    description: {
      story: `Кнопка с внешними отступами`
    }
  }
};

export const AsChildLink: Story = {
  args: {
    children: '',
    variant: 'buttonPrimary',
    asChild: true
  },
  render: (args) => (
    <Button {...args}>
      <a href="https://google.com" target={'_blank'}>
        Google
      </a>
    </Button>
  )
};

AsChildLink.parameters = {
  docs: {
    description: {
      story: `Использование asChild для превращения ссылки в кнопку. Стили кнопки применяются к элементу ссылки.`
    }
  }
};

export const AsChildNextLink: Story = {
  args: {
    children: '',
    variant: 'buttonSecondary',
    asChild: true
  },
  render: (args) => (
    <Button {...args}>
      <Link href="https://google.com" target={'_blank'}>
        Next.js Link as Button
      </Link>
    </Button>
  )
};

AsChildNextLink.parameters = {
  docs: {
    description: {
      story: `Использование asChild с Next.js Link компонентом. Стили кнопки применяются к элементу ссылки.`
    }
  }
};

export const AsChildCustomComponent: Story = {
  args: {
    children: '',
    variant: 'buttonOutline',
    asChild: true
  },
  render: (args) => {
    const CustomComponent = ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    );

    return (
      <Button {...args}>
        <CustomComponent>Custom Component as Button</CustomComponent>
      </Button>
    );
  }
};

AsChildCustomComponent.parameters = {
  docs: {
    description: {
      story: `Использование asChild с кастомным компонентом. Стили кнопки применяются к кастомному компоненту.`
    }
  }
};
