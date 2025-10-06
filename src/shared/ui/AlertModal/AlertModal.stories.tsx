import type { Meta } from '@storybook/nextjs';
import { useState } from 'react';
import { AlertModal } from '@/src/shared/ui/AlertModal/AlertModal';
import { EmailSentModal } from '@/src/features/auth/ui/EmailSentModal/EmailSentModal';

const meta: Meta<typeof AlertModal> = {
  title: 'UI/AlertModal',
  component: AlertModal,
  tags: ['autodocs']
};

export default meta;

// 🔹 Playground (базовый пример)
export const Playground = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        style={{
          padding: '8px 16px',
          background: '#4c6ef5',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
        onClick={() => setOpen(true)}
      >
        Open AlertModal
      </button>

      <AlertModal
        open={open}
        onOpenChange={setOpen}
        title="Info"
        message="This is an informational alert."
        confirmText="Got it"
      />
    </>
  );
};

// 🔹 Вариант через EmailSentModal
export const EmailSentExample = () => {
  const [open, setOpen] = useState(true);

  return <EmailSentModal open={open} onOpenChange={setOpen} email="epam@epam.com" />;
};
