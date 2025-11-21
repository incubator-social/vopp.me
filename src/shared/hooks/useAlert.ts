import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppAlert } from '@/app/store/appSlice';
import { AlertType } from '../types/common';
import { useCallback, useMemo } from 'react';

type AlertOptions = { duration?: number };

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const show = useCallback(
    (type: AlertType, message: string, options?: AlertOptions) => {
      dispatch(setAppAlert({ type, message, ...options }));
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      success: (msg: string, opts?: AlertOptions) => show('success', msg, opts),
      error: (msg: string, opts?: AlertOptions) => show('error', msg, opts),
      warning: (msg: string, opts?: AlertOptions) => show('warning', msg, opts),
      info: (msg: string, opts?: AlertOptions) => show('info', msg, opts)
    }),
    [show]
  );
};
