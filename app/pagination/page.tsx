// app/pagination-demo/page.tsx
'use client';

import { useState } from 'react';
import { Pagination } from './../../src/shared/ui/Pagination/Pagination';

export default function PaginationDemoPage() {
  const [page, setPage] = useState(7);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = 550;
  const count = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div style={{ paddingBlock: 24 }}>
      <h2 style={{ color: '#e6e6e6', margin: '0 0 16px' }}>Pagination Demo</h2>
      <Pagination
        count={count}
        currentPage={page}
        onChange={setPage}
        siblings={1}
        perPage={pageSize}
        perPageOptions={[10, 20, 30, 50, 100]}
        onPerPageChange={(v) => {
          setPageSize(v);
          setPage(1);
        }}
        labels={{ show: 'Show', onPage: 'on page' }}
      />
    </div>
  );
}
