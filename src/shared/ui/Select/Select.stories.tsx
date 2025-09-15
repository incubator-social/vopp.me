import React, { useState } from 'react';
import { Meta } from '@storybook/nextjs-vite';
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
- 🎛️ Гибкая настройка размеров через параметры size (числа и строки)
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
  - \`width\` / \`minWidth\` / \`maxWidth\` - ширина (число → px, строка → как есть)
  - \`height\` / \`minHeight\` / \`maxHeight\` - высота (число → px, строка → как есть)
  - \`padding\` - внутренние отступы (число → px, строка → как есть)
  - \`fontSize\` - размер текста (число → px, строка → как есть)
  - iconSize - размер иконок опций (числа)
  - arrowSize - размер стрелки раскрытия (числа)
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

const onlyNumbers = [
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

// Default

export const Default = () => {
  const [selected, setSelected] = useState('1');

  return (
    <div>
      <Select options={defaultOptions} value={selected} onValueChange={setSelected} />
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: `Стандартный селект с предвыбранным значением`
    }
  }
};

// Только числа

export const NumbersOptions = () => {
  const [selected, setSelected] = useState('3');

  const selectSize = {
    minWidth: 52,
    minHeight: 24,
    maxHeight: 24,
    arrowSize: 16,
    padding: '0 8px',
    fontSize: 14
  };
  return (
    <div>
      <Select
        options={onlyNumbers}
        size={selectSize}
        contentWidth={'trigger'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

NumbersOptions.parameters = {
  docs: {
    description: {
      story: `Компактный селект с числовыми значениями`
    }
  }
};

// Disabled

export const DisabledSelect = () => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <Select
        disabled={true}
        options={defaultOptions}
        placeholder={'Select is disabled'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

DisabledSelect.parameters = {
  docs: {
    description: {
      story: `Заблокированный селект`
    }
  }
};

// Пустой массив опций

export const EmptyOptions = () => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <Select options={[]} placeholder={'No options...'} value={selected} onValueChange={setSelected} />
    </div>
  );
};

EmptyOptions.parameters = {
  docs: {
    description: {
      story: `Селект без доступных опций`
    }
  }
};

// C иконками и текстом

export const WithIcons = () => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <Select
        options={optionsWithIcons}
        size={{ maxWidth: 240, minWidth: 240 }}
        placeholder={'Выберите страну...'}
        value={selected}
        contentWidth={'trigger'}
        onValueChange={setSelected}
      />
    </div>
  );
};

WithIcons.parameters = {
  docs: {
    description: {
      story: `Селект с иконками и текстом`
    }
  }
};

// Кастомные размеры

export const CustomSizes = () => {
  const [selected, setSelected] = useState('');

  const selectSize = {
    padding: '20px',
    arrowSize: 50,
    minHeight: 17,
    maxHeight: 24,
    fontSize: 30
  };

  return (
    <div>
      <Select
        options={defaultOptions}
        size={selectSize}
        placeholder={'Custom sizes...'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

CustomSizes.parameters = {
  docs: {
    description: {
      story: `Селект с кастомными размерами`
    }
  }
};

// Только иконки

export const OnlyIcon = () => {
  const [selected, setSelected] = useState('');

  const selectSize = {
    iconSize: 40,
    arrowSize: 40,
    minWidth: 50
  };

  return (
    <div>
      <Select
        options={optionsWithIconsOnly}
        size={selectSize}
        placeholder={'Выберите иконку'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

OnlyIcon.parameters = {
  docs: {
    description: {
      story: `Селект только с иконками`
    }
  }
};

// Длинные и короткие опции

export const LongOptions = () => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <Select
        options={longOptionsArr}
        size={{ maxWidth: 250, minWidth: 250 }}
        contentWidth={'content'}
        placeholder={'Выбрать опцию...'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

LongOptions.parameters = {
  docs: {
    description: {
      story: `Селект с длинными и короткими текстовыми опциями`
    }
  }
};

// Строковые и числовые размеры
export const WithStringSizes = () => {
  const [selected, setSelected] = useState('1');

  const selectSize = {
    width: '100%',
    minWidth: '200px',
    maxWidth: '400px',
    height: '48px',
    padding: '12px 16px',
    fontSize: '1rem',
    iconSize: 24,
    arrowSize: 24
  };

  return (
    <div style={{ width: '400px' }}>
      <Select
        options={defaultOptions}
        size={selectSize}
        placeholder={'Select with string sizes...'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

WithStringSizes.parameters = {
  docs: {
    description: {
      story: `Селект с размерами, заданными строковыми значениями. Поддерживаются любые CSS-единицы измерения.

**Используемые форматы:**
- \`width: '100%'\` - процентная ширина
- \`minWidth: '200px'\` - минимальная ширина в пикселях
- \`maxWidth: '400px'\` - максимальная ширина в пикселях
- \`height: '48px'\` - высота в пикселях
- \`padding: '12px 16px'\` - комплексный padding
- \`fontSize: '1rem'\` - относительные единицы (rem)
- \`iconSize: 24\` - размер иконок в  числах
- \`arrowSize: 24\` - размер стрелки в числах

**Также поддерживаются:**
- \`vw\` / \`vh\` - проценты от viewport
- \`em\` / \`rem\` - относительные единицы
- \`auto\` / \`fit-content\` - автоматические размеры
- \`clamp()\` / \`min()\` / \`max()\` - CSS-функции`
    }
  }
};

// Адаптивные размеры
export const ResponsiveSizes = () => {
  const [selected, setSelected] = useState('1');

  const selectSize = {
    width: '100%',
    minWidth: 'min-content',
    maxWidth: '500px',
    height: 'clamp(40px, 5vh, 60px)',
    padding: 'clamp(8px, 2vw, 16px)',
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    iconSize: 24,
    arrowSize: 24
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Select
        options={defaultOptions}
        size={selectSize}
        placeholder={'Responsive select...'}
        value={selected}
        onValueChange={setSelected}
      />
    </div>
  );
};

ResponsiveSizes.parameters = {
  docs: {
    description: {
      story: `Адаптивный селект с использованием CSS-функции \`clamp()\` для плавного изменения размеров в зависимости от размера viewport.

**Преимущества адаптивного подхода:**
- Плавное масштабирование на разных устройствах
- Контроль минимальных и максимальных значений
- Единая система отзывчивого дизайна

**Используемые CSS-функции:**
- \`clamp(min, preferred, max)\` - значение между min и max
- \`vw\` / \`vh\` - проценты от viewport для адаптивности
- \`min-content\` - минимальная ширина по содержимому`
    }
  }
};
