'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function usePostModalQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { postId, isEdit } = useMemo(() => {
    const raw = searchParams.get('postId');
    const n = raw ? Number(raw) : NaN;
    const postId = Number.isFinite(n) ? n : null;
    const isEdit = searchParams.get('mode') === 'edit';
    return { postId, isEdit };
  }, [searchParams]);

  const navigate = useCallback(
    (mutate: (sp: URLSearchParams) => void, method: 'push' | 'replace' = 'push') => {
      const sp = new URLSearchParams(searchParams.toString());
      mutate(sp);
      const qs = sp.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (method === 'push') {
        router.push(url, { scroll: false });
      } else {
        router.replace(url, { scroll: false });
      }
    },
    [router, pathname, searchParams]
  );

  const openPost = useCallback(
    (id: number) => {
      navigate((sp) => {
        sp.set('postId', String(id));
        sp.delete('mode');
      }, 'push');
    },
    [navigate]
  );

  const closePost = useCallback(() => {
    navigate((sp) => {
      sp.delete('postId');
      sp.delete('mode');
    }, 'replace');
  }, [navigate]);

  const openEdit = useCallback(() => {
    if (postId === null) return;
    navigate((sp) => {
      sp.set('postId', String(postId));
      sp.set('mode', 'edit');
    }, 'push');
  }, [navigate, postId]);

  const closeEdit = useCallback(() => {
    navigate((sp) => sp.delete('mode'), 'replace');
  }, [navigate]);

  return { postId, isEdit, openPost, closePost, openEdit, closeEdit };
}
