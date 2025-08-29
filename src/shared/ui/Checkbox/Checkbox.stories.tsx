import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { description: ' ✅ Отображение с подписью (\`label\`) или без неё ', control: 'text' },
    disabled: { description: ' - 🚫 Поддержка состояния \`disabled\` ', control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    containerProps: {
      description: `Пропсы, пробрасываемые во внешний контейнер (\`<div>\`), куда входит чекбокс и label. Можно использовать для передачи \`className\`, \`style\`, \`data-*\` атрибутов или обработчиков событий.`,
      control: 'object'
    },
    labelClassName: {
      description: `Дополнительный класс для элемента подписи (\`label\`). Используется для переопределения или расширения стандартных стилей (цвет, размер, отступы).`,
      control: 'text'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
\`Checkbox\` — это базовый компонент для выбора одного или нескольких параметров.  
Он поддерживает как **неконтролируемый режим** (через \`defaultChecked\`),  
так и **контролируемый режим** (через \`checked\` и \`onCheckedChange\`).  

### Основные возможности:
- ✅ Отображение с подписью (\`label\`) или без неё  
- 🚫 Поддержка состояния \`disabled\`  
- 🔄 Управление состоянием: неконтролируемое и контролируемое использование  
- 🎨 Легко интегрируется в формы и UI-компоненты  

### Когда использовать:
- Для включения/выключения опции  
- Для выбора нескольких элементов из списка  
- В составе более сложных формовых элементов
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Обычный чекбокс',
    defaultChecked: false
  },
  parameters: {
    docs: {
      description: {
        story: `Стандартный чекбокс без выделения. Используется для выбора опции пользователем.`
      }
    }
  }
};

export const Checked: Story = {
  args: {
    label: 'Выбранный по умолчанию',
    defaultChecked: true
  },
  parameters: {
    docs: {
      description: {
        story: `Чекбокс, который **изначально выбран**. Полезно для случаев, когда опция включена по умолчанию.`
      }
    }
  }
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Отключённый чекбокс',
    disabled: true,
    defaultChecked: false
  },
  parameters: {
    docs: {
      description: {
        story: `**Неактивный чекбокс**, который нельзя выбрать. Полезно для отображения недоступных опций.`
      }
    }
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Выбранный и отключённый',
    disabled: true,
    defaultChecked: true
  },
  parameters: {
    docs: {
      description: {
        story: `Чекбокс в состоянии **"выбран"**, но при этом **недоступен для изменения**.`
      }
    }
  }
};

export const WithoutLabel: Story = {
  args: {
    defaultChecked: false
  },
  parameters: {
    docs: {
      description: {
        story: `Чекбокс без подписи. Обычно используется как часть более сложного UI (например, в таблицах или списках).`
      }
    }
  }
};

export const CustomLabel: Story = {
  args: {
    label: `Чекбокс с кастомной подписью, где цвет и размер текста заданы через \`labelProps.style\`.`,
    defaultChecked: false,
    labelProps: { style: { color: 'yellow', fontWeight: '700' } }
  },
  parameters: {
    docs: {
      description: {
        story: `Чекбокс с кастомной подписью, где цвет и размер текста заданы через \`labelProps.style\`.`
      }
    }
  }
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Checkbox checked={checked} onCheckedChange={(value) => setChecked(!!value)} label="Контролируемый чекбокс" />

      <span style={{ color: '#ffffff' }}>{checked ? '✅ Выбран' : '⬜ Не выбран'}</span>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: `
**Контролируемый чекбокс** — это пример использования \`Checkbox\` в управляемом режиме.  
Значение хранится во внутреннем состоянии (\`useState\`) и обновляется через \`onCheckedChange\`.  

Такой подход нужен, если вы хотите полностью контролировать состояние чекбокса из компонента-родителя,  
например, для сложных форм или синхронизации с внешними данными.  

В этом примере рядом с чекбоксом отображается текстовый индикатор состояния:
- ✅ показывает, что чекбокс выбран,  
- ⬜ показывает, что чекбокс не выбран.
      `
    }
  }
};
