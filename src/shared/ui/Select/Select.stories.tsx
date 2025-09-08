import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './Select';
import IconFlagRussia from './../../assets/icons/flag-russia.svg';
import IconFlagUnitedKingdom from './../../assets/icons/flag-united-kingdom.svg';

const meta = {
  component: Select,
  title: 'UI/Select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Select — это компонент для выбора одного значения из выпадающего списка опций.
Он поддерживает как **неконтролируемый режим** (через defaultValue),  
так и **контролируемый режим** (через value и onValueChange).  

### Основные возможности:
- ✅ Отображение выпадающего списка с текстовыми иконками
- 🎛️ Гибкая настройка размеров через параметры size
- 📏 Контроль ширины контента: по триггеру или по содержимому
- 🖱️ Поддержка состояния disabled 
- 🔄 Управление состоянием: неконтролируемое и контролируемое использование
- 📜 Встроенная поддержка скролла для длинных списков
- 🎨 Кастомизация иконок для каждой опции

### Когда использовать:
- Для выбора одного значения из списка опций
- В формах для выбора предопределенных значений  
- В фильтрах и настройках интерфейса
- Вместо нативных select элементов для лучшего UX

### Props:
- options - массив опций для выбора (обязательный)
- placeholder - текст placeholder при отсутствии выбора
- defaultValue - значение по умолчанию (неконтролируемый режим)
- value - контролируемый режим
- onValueChange - callback при изменении значения
- disabled - отключение компонента
- required - обязательность выбора
- size - объект с настройками размеров:
  - minWidth/maxWidth - минимальная/максимальная ширина
  - minHeight/maxHeight - минимальная/максимальная высота
  - padding - внутренние отступы
  - fontSize - размер текста
  - iconSize - размер иконок опций
  - arrowSize - размер стрелки раскрытия
- contentWidth - контроль ширивы выпадающего списка:
  - 'trigger' - ширина как у триггера (по умолчанию)
  - 'content' - ширина по содержимому

### Пример использования:
\`\`\`tsx
<Select
  options={[
    { value: 'option1', label: 'Опция 1', icon: MyIcon },
    { value: 'option2', label: 'Опция 2' }
  ]}
  placeholder="Выберите опцию"
  defaultValue="option1"
  onValueChange={(value) => console.log(value)}
  size={{ fontSize: 14, iconSize: 20 }}
  contentWidth="trigger"
/>
\`\`\``
      }
    }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Option 11' },
  { value: '12', label: 'Option 12' },
  { value: '13', label: 'Option 13' },
  { value: '14', label: 'Option 14' },
  { value: '15', label: 'Option 15' }
];

const onlyNumber = [
  { value: '1', label: '1' },
  { value: '2', label: '10' },
  { value: '3', label: '20' },
  { value: '4', label: '30' },
  { value: '5', label: '50' },
  { value: '6', label: '100' },
  { value: '7', label: '1000' },
  { value: '8', label: '10000' }
];

const optionsWithIcons = [
  { value: '1', label: 'Option with Icon 1', icon: IconFlagRussia },
  { value: '2', label: 'Option with Icon 2', icon: IconFlagUnitedKingdom },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
];

const optionsWithIconsOnly = [
  { value: '1', label: '', icon: IconFlagRussia },
  { value: '2', label: '', icon: IconFlagUnitedKingdom }
];

const longOptionsArr = [
  { value: '1', label: 'IconFlagUnitedKingdomIconFlagUnitedKingdom' },
  { value: '2', label: 'IconFlagUnitedKingdomIconFlagUnitedKingdomIconFlagUnitedKingdom' },
  { value: '3', label: '100' }
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите опцию...'
  },
  parameters: {
    docs: {
      description: {
        story: `Стандартный селект без настроек`
      }
    }
  }
};

export const NumbersOptions: Story = {
  args: {
    options: onlyNumber,
    defaultValue: '3',
    size: {
      minWidth: 52,
      minHeight: 24,
      maxHeight: 24,
      arrowSize: 16,
      padding: '0 8px',
      fontSize: 14
    },
    contentWidth: 'trigger'
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с числами для компонента с пагинацией`
      }
    }
  }
};

export const DisabledSelect: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select is disabled',
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: `Disabled режим`
      }
    }
  }
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'No options available...'
  },
  parameters: {
    docs: {
      description: {
        story: `Не передано никаких занчений`
      }
    }
  }
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    defaultValue: '3',
    placeholder: 'Выберите опцию...'
  },
  parameters: {
    docs: {
      description: {
        story: `Передано значение, которое сразу выбрано, указать defaultValue с числом индекса желаемого элемента передаваемого массива значений в виде строки. Установится при первом рендере`
      }
    }
  }
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Выберите опцию с иконкой...',
    contentWidth: 'trigger',
    size: {
      maxWidth: 240,
      minWidth: 240
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с иконкой и текстом`
      }
    }
  }
};

export const CustomSizes: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Custom sizes...',
    size: {
      padding: '30px',
      arrowSize: 50,
      minHeight: 17
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с произвольно выбранныеми размерами`
      }
    }
  }
};

export const OnlyIcon: Story = {
  args: {
    defaultValue: '1',
    options: optionsWithIconsOnly,
    placeholder: '',
    size: {
      iconSize: 40,
      arrowSize: 40,
      minWidth: 50
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект только с иконками без текста`
      }
    }
  }
};

export const LongOptions: Story = {
  args: {
    options: longOptionsArr,
    placeholder: 'Выбрать длинную опцию...',
    size: {
      maxWidth: 250,
      minWidth: 250
    },
    contentWidth: 'content'
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с опциями разной длины`
      }
    }
  }
};

export const DynamicControlled: Story = {
  args: {
    options: optionsWithIcons,
    value: '1',
    placeholder: 'Динамически изменяемый...',
    contentWidth: 'trigger',
    size: {
      maxWidth: 240,
      minWidth: 240
    }
  },
  parameters: {
    docs: {
      description: {
        story: `### Динамическое изменение value

Демонстрирует возможность программного изменения значения селекта через пропс \`value\`.

**Особенности:**
- Значение можно менять извне в любой момент
- Селект мгновенно отражает изменения пропса \`value\`
- Полезно для сброса значения или синхронизации с другими компонентами

**Пример сценария:**
\`\`\`tsx
const [selected, setSelected] = useState("1");

// Программное изменение значения
const handleChangeToRussia = () => setSelected("1");
const handleChangeToUK = () => setSelected("2");
const handleReset = () => setSelected("");

return (
  <div>
    <Select
      options={optionsWithIcons}
      value={selected}
      onValueChange={setSelected}
    />
    <button onClick={handleChangeToRussia}>Выбрать Россию</button>
    <button onClick={handleChangeToUK}>Выбрать UK</button>
    <button onClick={handleReset}>Сбросить</button>
  </div>
);
\`\`\``
      }
    }
  }
};
