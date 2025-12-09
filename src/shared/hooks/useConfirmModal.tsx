'use client';

import { useState, useCallback } from 'react';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
};

export const useConfirmModal = () => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openConfirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!options?.onConfirm) return;
    try {
      setLoading(true);
      setOpen(false);
      await options.onConfirm();
    } finally {
      setLoading(false);
    }
  }, [options]);

  const handleCancel = useCallback(() => {
    options?.onCancel?.();
    setOpen(false);
  }, [options]);

  // компонент модалки
  const ConfirmModalComponent = useCallback(() => {
    if (!options) return null;
    return (
      <ConfirmModal
        open={open}
        title={options.title}
        message={options.message}
        confirmText={options.confirmText ?? 'Yes'}
        cancelText={options.cancelText ?? 'No'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        loading={loading}
      />
    );
  }, [open, loading, options, handleConfirm, handleCancel]);

  return { openConfirm, ConfirmModalComponent };
};
