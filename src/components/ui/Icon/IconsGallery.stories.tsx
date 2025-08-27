import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import * as Icons from '../../../shared/assets/icons/components/';
import { ICONS } from '../../../shared/assets/icons/components/icons-map';

import styles from './IconsGallery.module.scss';

const meta: Meta = {
  title: 'Design System/Icons',
  parameters: {
    docs: {
      description: {
        component: `
# 🎨 Работа с SVG-иконками

В проекте настроен полный цикл работы с иконками:  
от добавления \`.svg\`-файла до использования готового React-компонента и просмотра в Storybook.  

---

## 🚀 Добавление новой иконки
1. Скопируй исходный \`.svg\` в \`src/shared/assets/icons/svg\`.
2. Запусти:
\`\`\`bash
npm run build:icons
\`\`\`

---

## 🛠 Что делает скрипт
- Переименовывает SVG → \`kebab-case\`
- Генерирует React-компоненты в \`src/shared/assets/icons/components\`
- Создаёт \`index.ts\` для реэкспорта
- Формирует карту имён в \`icons-map.ts\`

---

## 📖 В Storybook

- Все иконки показаны сеткой с названиями:
        `
      }
    }
  }
};
export default meta;

type Story = StoryObj;

export const Gallery: Story = {
  render: () => (
    <div className={styles.grid}>
      {ICONS.map((name) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (Icons as any)[name];
        return (
          <div key={name} className={styles.item}>
            <Icon className={`${styles.icon} ${styles.icon24}`} />
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  )
};
