// src/shared/ui/Pagination/Pagination.stories.tsx
import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
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
          setPage(1); // сбрасываем на первую страницу при смене размера
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

**Основное:**
- \`pageCount\` — общее число страниц.
- \`currentPage\` (1..pageCount) — активная страница.
- \`onChange(page)\` — обязательный колбэк перехода по страницам.
- Клавиатура: ← / →, Home, End.
- \`siblings\` — количество соседних страниц слева/справа (по умолчанию 1).
- Селект «сколько на странице» показывается, если переданы \`perPage\`, \`perPageOptions\` и \`onPerPageChange\`.
- Селект может отображаться даже при одной странице. Чтобы скрыть его в таком случае, используйте \`hidePerPageWhenSinglePage\`.
- Многоточия (\`…\`) добавляются автоматически при длинной пагинации.

---

## Пример использования (клиентская пагинация)
Ниже — минимальный пример со списком данных в памяти. Считаем \`pageCount\` и делаем \`slice\` для текущей страницы.

\`\`\`tsx
function ListWithPagination({ items }: { items: string[] }) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);

  // 1) Считаем количество страниц
  const totalItems = items.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / perPage));


  return (
    <>
      <ul>
        {pageItems.map((it) => <li key={it}>{it}</li>)}
      </ul>

      <Pagination
        pageCount={pageCount}
        currentPage={page}
        onChange={setPage}
        perPage={perPage}
        perPageOptions={[10, 20, 50, 100]}
        onPerPageChange={(n) => {
          setPerPage(n);
          setPage(1); // важно сбросить на 1-ю страницу при смене размера
        }}
      />
    </>
  );
}
\`\`\`

## Пример использования (серверная/БД пагинация)
Вы отдаёте на клиент уже конкретную страницу и общее количество элементов \`total\`. \`pageCount\` вычисляете из \`total\` и текущего \`perPage\`.

\`\`\`tsx
function ServerPagedList() {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);

  const { items, total } = useQuery(['items', page, perPage], () =>
    fetch(\`/api/items?page=\${page}&perPage=\${perPage}\`).then(r => r.json())
  );

  const pageCount = Math.max(1, Math.ceil(total / perPage));

  return (
    <>
      <ul>
        {items.map((it: any) => <li key={it.id}>{it.name}</li>)}
      </ul>

      <Pagination
        pageCount={pageCount}
        currentPage={page}
        onChange={setPage}
        perPage={perPage}
        perPageOptions={[10, 20, 50, 100]}
        onPerPageChange={(n) => {
          setPerPage(n);
          setPage(1); // запросим 1-ю страницу в новом размере
        }}
      />
    </>
  );
}
\`\`\`

### Важные замечания
- \`currentPage\` всегда держите в диапазоне \`1..pageCount\`.
- \`perPageOptions\` **должен содержать** текущее \`perPage\` (иначе селект не покажет выбранное значение).
- При смене \`perPage\` **обычно** сбрасывайте \`currentPage\` в \`1\`.

        `.trim()
      }
    }
  },
  argTypes: {
    pageCount: { control: { type: 'number', min: 1 }, description: 'Общее число страниц' },
    currentPage: { control: { type: 'number', min: 1 }, description: 'Текущая страница (1..pageCount)' },
    siblings: { control: { type: 'number', min: 0, max: 5 }, description: 'Соседи слева/справа' },
    className: { control: false },
    labels: {
      control: 'object',
      description: 'Подписи/ARIA. Можно частично переопределить: nav, prev, next, show, onPage.'
    },
    perPage: { control: { type: 'number', min: 1 }, description: 'Элементов на странице (включает селект)' },
    perPageOptions: {
      control: 'object',
      description: 'Опции селекта (например, [10, 20, 30, 50, 100]). Должны содержать текущее perPage.'
    },
    hidePerPageWhenSinglePage: {
      control: 'boolean',
      description: 'Скрывать селект, если всего одна страница',
      table: { category: 'UX' }
    },
    onPerPageChange: { action: 'onPerPageChange', table: { disable: true } },
    onChange: { action: 'onChange', table: { disable: true } }
  }
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: (args) => <Controlled {...args} />,
  args: { pageCount: 10, currentPage: 4, siblings: 1 }
};

export const WithPerPageSelect: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    pageCount: 25,
    currentPage: 7,
    siblings: 1,
    perPage: 10,
    perPageOptions: [10, 20, 30, 50, 100]
  }
};

export const SinglePageHideSelect: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    pageCount: 1,
    currentPage: 1,
    perPage: 10,
    perPageOptions: [10, 20, 30, 50, 100],
    hidePerPageWhenSinglePage: true
  }
};

export const EdgeCases: Story = {
  render: (args) => <Controlled {...args} />,
  args: { pageCount: 3, currentPage: 1, siblings: 1 }
};
