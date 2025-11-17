// src/shared/hooks/useAlert.ts
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppAlert } from '@/app/store/appSlice';
import { AlertType } from '../types/common';

type AlertOptions = { duration?: number };

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const show = (type: AlertType, message: string, options?: AlertOptions) => {
    dispatch(setAppAlert({ type, message, ...options }));
  };

  return {
    success: (msg: string, opts?: AlertOptions) => show('success', msg, opts),
    error: (msg: string, opts?: AlertOptions) => show('error', msg, opts),
    warning: (msg: string, opts?: AlertOptions) => show('warning', msg, opts),
    info: (msg: string, opts?: AlertOptions) => show('info', msg, opts)
  };
};
