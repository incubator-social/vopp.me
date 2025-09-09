'use client';
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
Работает только в **контролируемом режиме**.

### Основные возможности:
- ✅ Выпадающий список с текстовыми иконками
- 🎛️ Гибкая настройка размеров через параметры size
- 📏 Контроль ширины контента: по триггеру или по содержимому
- 🖱️ Поддержка состояния disabled 
- 🎨 Кастомизация иконок для каждой опции
- 📜 Встроенная поддержка скролла для длинных списков

### Когда использовать:
- Для выбора одного значения из списка опций
- В формах для выбора предопределенных значений  
- В фильтрах и настройках интерфейса
- Вместо нативных select элементов для лучшего UX

### Props:
- \`options\` - массив опций для выбора (обязательный)
- \`placeholder\` - текст placeholder при отсутствии выбора (value = '')
- \`value\` - текущее значение (обязательное)
- \`onValueChange\` - callback при изменении значения (обязательный)
- \`disabled\` - отключение компонента
- \`required\` - обязательность выбора
- \`size\` - объект с настройками размеров:
  - minWidth/maxWidth - минимальная/максимальная ширина
  - minHeight/maxHeight - минимальная/максимальная высота
  - padding - внутренние отступы
  - fontSize - размер текста
  - iconSize - размер иконок опций
  - arrowSize - размер стрелки раскрытия
- \`contentWidth\` - контроль ширины выпадающего списка:
  - 'trigger' - ширина как у триггера (по умолчанию)
  - 'content' - ширина по содержимому

### Пример использования:
\`\`\`tsx
const [selectedValue, setSelectedValue] = useState('');

<Select
  options={[
    { value: 'option1', label: 'Опция 1', icon: MyIcon },
    { value: 'option2', label: 'Опция 2' }
  ]}
  value={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="Выберите опцию"
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
  { value: '10', label: 'Option 10' }
];

const onlyNumber = [
  { value: '1', label: '10' },
  { value: '2', label: '20' },
  { value: '3', label: '30' },
  { value: '5', label: '50' },
  { value: '100', label: '100' }
];

const optionsWithIcons = [
  { value: '1', label: 'Россия', icon: IconFlagRussia },
  { value: '2', label: 'Великобритания', icon: IconFlagUnitedKingdom },
  { value: '3', label: 'Франция' },
  { value: '4', label: 'Индия' }
];

const optionsWithIconsOnly = [
  { value: '1', label: '', icon: IconFlagRussia },
  { value: '2', label: '', icon: IconFlagUnitedKingdom }
];

const longOptionsArr = [
  { value: '1', label: 'Очень длинное название опции которое не помещается' },
  { value: '2', label: 'Еще более длинное название опции которое точно не поместится в стандартный размер' },
  { value: '3', label: 'Короткое' }
];

const change = (value: string) => console.log('Selected:', value);

export const Default: Story = {
  args: {
    options: defaultOptions,
    value: '1',
    placeholder: 'Выберите опцию...',
    onValueChange: change
  },
  parameters: {
    docs: {
      description: {
        story: `Стандартный селект с предвыбранным значением`
      }
    }
  }
};

export const NumbersOptions: Story = {
  args: {
    options: onlyNumber,
    value: '1',
    placeholder: 'Выберите опцию...',
    onValueChange: change,
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
        story: `Компактный селект с числовыми значениями`
      }
    }
  }
};

export const DisabledSelect: Story = {
  args: {
    options: defaultOptions,
    value: '1',
    placeholder: 'Select is disabled',
    disabled: true,
    onValueChange: change
  },
  parameters: {
    docs: {
      description: {
        story: `Заблокированный селект`
      }
    }
  }
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    value: '1',
    placeholder: 'No options available...',
    onValueChange: change
  },
  parameters: {
    docs: {
      description: {
        story: `Селект без доступных опций`
      }
    }
  }
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    value: '1',
    placeholder: 'Выберите страну...',
    onValueChange: change,
    contentWidth: 'trigger',
    size: {
      maxWidth: 240,
      minWidth: 240
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с иконками и текстом`
      }
    }
  }
};

export const CustomSizes: Story = {
  args: {
    options: defaultOptions,
    value: '1',
    placeholder: 'Custom sizes...',
    onValueChange: change,
    size: {
      padding: '3px',
      arrowSize: 50,
      minHeight: 17,
      maxHeight: 24
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с кастомными размерами`
      }
    }
  }
};

export const OnlyIcon: Story = {
  args: {
    options: optionsWithIconsOnly,
    value: '1',
    placeholder: 'Выберите иконку',
    onValueChange: change,
    size: {
      iconSize: 40,
      arrowSize: 40,
      minWidth: 50
    }
  },
  parameters: {
    docs: {
      description: {
        story: `Селект только с иконками`
      }
    }
  }
};

export const LongOptions: Story = {
  args: {
    options: longOptionsArr,
    value: '1',
    placeholder: 'Выбрать опцию...',
    onValueChange: change,
    size: {
      maxWidth: 250,
      minWidth: 250
    },
    contentWidth: 'content'
  },
  parameters: {
    docs: {
      description: {
        story: `Селект с длинными текстовыми опциями`
      }
    }
  }
};
