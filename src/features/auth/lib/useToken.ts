'use client';

import { useSyncExternalStore } from 'react';
import { AUTH_KEYS } from '@/src/shared/config/storage';

export function useToken() {
  const subscribe = (cb: () => void) => {
    if (typeof window === 'undefined') return () => {};
    const handler = () => cb();
    window.addEventListener('storage', handler);
    window.addEventListener('auth-changed', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('auth-changed', handler);
    };
  };
  const getSnapshot = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_KEYS.accessToken);
  };
  const getServerSnapshot = () => null;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
