// src/shared/ui/Pagination/Pagination.stories.tsx
import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination, type PaginationProps } from './Pagination';

const Controlled: React.FC<PaginationProps> = (args) => {
  const [page, setPage] = useState(args.currentPage ?? 1);
  const [perPage, setPerPage] = useState(args.perPage ?? 10);

  useEffect(() => {
    setPage(args.currentPage ?? 1);
  }, [args.currentPage]);

  useEffect(() => {
    if (typeof args.perPage === 'number') setPerPage(args.perPage);
  }, [args.perPage]);

  return (
    <div style={{ padding: 24 }}>
      <Pagination
        {...args}
        currentPage={page}
        perPage={perPage}
        onChange={setPage}
        onPerPageChange={(v) => {
          setPerPage(v);
          setPage(1);
        }}
      />
      <div style={{ marginTop: 12, color: '#8d9094', fontSize: 12 }}>
        Текущая страница: <b>{page}</b>
        {typeof perPage === 'number' && (
          <>
            {' '}
            • На странице: <b>{perPage}</b>
          </>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Контролируемый компонент постраничной навигации.

- \`currentPage\` (1..count) — активная страница;
- \`onChange\` обязателен.
- Клавиатура: ← / →, Home, End.
- \`siblings\` — кол-во соседей слева/справа (по умолчанию 1).
- Селект «сколько на странице» показывается, если переданы \`perPage\` и \`onPerPageChange\`.
- Многоточия (\`…\`) добавляются автоматически при длинной пагинации.
        `.trim()
      }
    }
  },
  argTypes: {
    count: { control: { type: 'number', min: 1 }, description: 'Общее число страниц' },
    currentPage: { control: { type: 'number', min: 1 }, description: 'Текущая страница (1..count)' },
    siblings: { control: { type: 'number', min: 0, max: 5 }, description: 'Соседи слева/справа' },
    className: { control: false },
    labels: {
      control: 'object',
      description: 'Подписи/ARIA. Можно частично переопределить: nav, prev, next, show, onPage.'
    },
    perPage: { control: { type: 'number', min: 1 }, description: 'Элементов на странице (включает селект)' },
    perPageOptions: {
      control: 'object',
      description: 'Опции селекта (например, [10,20,30,50,100]). Если не указать — можно скрыть селект.'
    },
    onPerPageChange: { action: 'onPerPageChange', table: { disable: true } },
    onChange: { action: 'onChange', table: { disable: true } }
  }
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: (args) => <Controlled {...args} />,
  args: { count: 10, currentPage: 4, siblings: 1 }
};

export const WithPerPageSelect: Story = {
  render: (args) => <Controlled {...args} />,
  args: { count: 25, currentPage: 7, siblings: 1, perPage: 20, perPageOptions: [10, 20, 30, 50, 100] }
};

export const ManyPagesCompact: Story = {
  render: (args) => <Controlled {...args} />,
  args: { count: 120, currentPage: 60, siblings: 0 }
};

export const SiblingsTwo: Story = {
  render: (args) => <Controlled {...args} />,
  args: { count: 30, currentPage: 15, siblings: 2 }
};

export const RussianLabels: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    count: 12,
    currentPage: 6,
    labels: {
      nav: 'Пагинация',
      prev: 'Предыдущая страница',
      next: 'Следующая страница',
      show: 'Показать',
      onPage: 'на странице'
    },
    perPage: 30,
    perPageOptions: [10, 20, 30, 50, 100]
  }
};

export const EdgeCases: Story = {
  render: (args) => <Controlled {...args} />,
  args: { count: 3, currentPage: 1, siblings: 1 }
};
