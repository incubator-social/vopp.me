'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import CloseIcon from '@/src/shared/assets/icons/close.svg';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import styles from './Modal.module.scss';

export type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  /* Полностью кастомный header */
  headerContent?: ReactNode;
  closeButtonPosition?: 'inside' | 'outside' | 'none';
  containerClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const Modal = (props: ModalProps) => {
  const {
    open,
    onOpenChange,
    trigger,
    size = 'sm',
    title,
    children,
    headerContent,
    containerClassName,
    contentClassName,
    closeButtonPosition = 'inside',
    bodyClassName,
    closeOnOverlayClick = false,
    closeOnEsc = false,
    ...restProps
  } = props;

  return (
    <div {...restProps} className={containerClassName}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            className={clsx(styles.content, styles[size], contentClassName)}
            onInteractOutside={(e) => {
              if (!closeOnOverlayClick) e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              if (!closeOnEsc) e.preventDefault();
            }}
          >
            {/* Кастомный header или дефолт, смотря что родитель передает */}
            {headerContent ? (
              <div className={styles.header}>{headerContent}</div>
            ) : (
              (title || closeButtonPosition === 'inside') && (
                <div className={styles.headerDefault}>
                  {title && (
                    <Dialog.Title asChild>
                      <h1 className={styles.title}>{title}</h1>
                    </Dialog.Title>
                  )}
                  {closeButtonPosition === 'inside' && (
                    <Dialog.Close asChild>
                      <button className={styles.closeButtonInside} type="button">
                        <CloseIcon className={styles.closeIcon} />
                      </button>
                    </Dialog.Close>
                  )}
                </div>
              )
            )}

            <div className={clsx(styles.body, bodyClassName)}>{children}</div>

            {closeButtonPosition === 'outside' && (
              <Dialog.Close asChild>
                <button className={styles.closeButtonOutside} type="button">
                  <CloseIcon className={styles.closeIcon} />
                </button>
              </Dialog.Close>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
