'use client';
import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/app/providers/store/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
