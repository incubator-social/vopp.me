import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки поля ввода'
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'number', 'url'],
      description: 'Тип поля ввода'
    }
  },
  args: {
    placeholder: 'Enter text'
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {}
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email'
  }
};

export const Error: Story = {
  args: {
    label: 'Email',
    errorMessage: 'Invalid email format'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    placeholder: 'Cannot edit this field'
  }
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...'
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-input-id',
    label: 'With Custom ID',
    placeholder: 'Accessible input field'
  }
};

export const ControlledInput: Story = {
  render: () => {
    // 🔹 Контролируемый компонент
    const [value, setValue] = React.useState('initial value');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <Input
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          containerStyle={{
            padding: '15px',
            border: '1px solid var(--color-primary)',
            borderRadius: '4px'
          }}
        />
        <div>Current value: {value}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Контролируемый компонент с управлением через React state'
      }
    }
  }
};

export const UncontrolledInput: Story = {
  render: () => {
    // 🔹 Неконтролируемый компонент
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleShowValue = () => {
      alert(inputRef.current?.value);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <Input
          ref={inputRef}
          label="Uncontrolled Input"
          defaultValue="initial value"
          placeholder="Type something..."
          containerStyle={{
            padding: '10px',
            border: '1px solid var(--color-dark-100)',
            borderRadius: '4px'
          }}
        />
        <button onClick={handleShowValue} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Show Value
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Неконтролируемый компонент с использованием ref и defaultValue'
      }
    }
  }
};

export const WithContainerStyles: Story = {
  args: {
    label: 'Styled Container Input',
    placeholder: 'With custom container styles',
    containerStyle: {
      padding: '20px',
      margin: '10px',
      border: '2px dashed var(--color-primary)',
      borderRadius: '8px',
      backgroundColor: 'var(--color-dark-300)'
    },
    containerClassName: 'custom-input-container'
  },
  parameters: {
    docs: {
      description: {
        story: 'Использование containerStyle для стилизации всего компонента'
      }
    }
  }
};

export const MixedInputUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '350px' }}>
      <Input
        label="Default Styled"
        placeholder="With container styles"
        containerStyle={{
          padding: '15px',
          backgroundColor: 'var(--color-dark-300)',
          border: '1px solid var(--color-primary)'
        }}
      />

      <Input label="Regular Input" placeholder="Without container styles" />

      <Input
        label="Error with Styles"
        errorMessage="Invalid input"
        containerStyle={{
          padding: '10px',
          border: '1px solid var(--color-danger-500)',
          backgroundColor: 'var(--color-danger-100)'
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '🎨 **НОВОЕ**: Различные варианты использования контейнерных стилей'
      }
    }
  }
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Input label="Default Input" />
      <Input label="With Value" defaultValue="Filled text" />
      <Input label="Disabled" disabled placeholder="Cannot edit" />
      <Input label="Error State" errorMessage="Field is required" />
      <Input type="search" placeholder="Search..." />
      <Input type="password" label="Password" placeholder="Enter password" />
    </div>
  )
};
