import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст лейбла'
    },
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера'
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled'
    },
    errorMessage: {
      control: 'text',
      description: 'Текст ошибки'
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'Возможность изменения размера'
    },
    rows: {
      control: 'number',
      description: 'Количество строк'
    }
  },
  args: {
    rows: 3
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...'
  }
};

export const Error: Story = {
  args: {
    label: 'Bio',
    errorMessage: 'This field is required'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    disabled: true,
    value: 'This text cannot be edited'
  }
};

export const NoResize: Story = {
  args: {
    label: 'No Resize',
    resize: 'none',
    placeholder: 'Cannot resize this textarea'
  }
};

export const MultipleRows: Story = {
  args: {
    label: 'Long Text',
    rows: 6,
    placeholder: 'Enter a long text...'
  }
};

export const CustomPlaceholder: Story = {
  args: {
    label: 'Custom',
    placeholder: 'This is a custom placeholder...'
  }
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-textarea-id',
    label: 'With Custom ID',
    placeholder: 'This has a custom ID for accessibility'
  }
};

export const WithContainerStyles: Story = {
  args: {
    label: 'Styled Container',
    placeholder: 'This textarea has custom container styles',
    containerStyle: {
      padding: '20px',
      margin: '10px',
      border: '2px dashed var(--color-primary)',
      borderRadius: '8px',
      backgroundColor: 'var(--color-dark-300)'
    }
  }
};

export const WithContainerProps: Story = {
  args: {
    label: 'Textarea with Container Props',
    placeholder: 'This demonstrates containerProps usage',
    containerProps: {
      'aria-labelledby': 'custom-label-id',
      onClick: () => console.log('Container clicked!'),
      onMouseEnter: () => console.log('Mouse entered container')
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация использования `containerProps` для передачи data-атрибутов, ARIA-атрибутов и обработчиков событий на контейнер'
      }
    }
  }
};

export const WithAutoScroll: Story = {
  args: {
    label: 'Auto Scroll (Default)',
    placeholder: 'Type long text to see auto scroll...',
    value: 'Это текст с авто скроллом. Скреолл появляется автоматически когда контент превышает область.\n'.repeat(3),
    rows: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Автоматический скролл (по умолчанию) - появляется только при необходимости'
      }
    }
  }
};

export const ControlledComponent: Story = {
  render: () => {
    // 🔹 Контролируемый компонент (управление через state)
    const [value, setValue] = React.useState('Initial value');

    return (
      <Textarea
        label="Controlled Textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        containerStyle={{
          margin: '15px 0',
          padding: '15px',
          border: '1px solid var(--color-primary)',
          borderRadius: '4px'
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '🎛Контролируемый компонент с управлением через React state'
      }
    }
  }
};

export const UncontrolledComponent: Story = {
  render: () => {
    // 🔹 Неконтролируемый компонент (используем ref)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
      alert(textareaRef.current?.value);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px' }}>
        <Textarea
          ref={textareaRef}
          label="Uncontrolled Textarea"
          defaultValue="Initial value"
          placeholder="Type something..."
          containerStyle={{
            padding: '10px',
            border: '1px solid var(--color-dark-100)',
            borderRadius: '4px'
          }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Get Value
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Неконтролируемый компонент с использованием `ref` и `defaultValue`'
      }
    }
  }
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <Textarea label="Default Textarea" />
      <Textarea label="With Value" defaultValue="Already filled text" />
      <Textarea label="Disabled" disabled value="Cannot edit this" />
      <Textarea label="Error State" errorMessage="Field is required" />
      <Textarea label="No Resize" resize="none" />
      <Textarea label="5 Rows" rows={5} />
    </div>
  )
};
