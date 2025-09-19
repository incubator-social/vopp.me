import type { Meta } from '@storybook/nextjs';
import { Modal } from './Modal';
import { useState } from 'react';
import Image from 'next/image';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `
### 🪟 Modal — универсальное модальное окно

**Props:**
- \`open?: boolean\` — управляет состоянием открытия
- \`onOpenChange?: (open: boolean) => void\` — колбэк при изменении состояния
- \`size?: 'sm' | 'md' | 'lg' | 'xl'\` — размер модалки
- \`title?: string\` — стандартный заголовок
- \`headerContent?: ReactNode\` — полностью кастомный header
- \`closeButtonPosition?: 'inside' | 'outside' | 'none'\` — позиция кнопки закрытия
- \`containerClassName?: string\` — кастомные стили контейнера
- \`contentClassName?: string\` — кастомные стили контента

---

### 📌 Примеры

#### 1. Базовый (с заголовком и кнопкой закрытия внутри)
\`\`\`tsx
<Modal open={open} onOpenChange={setOpen} size="sm" title="Email sent">
  <p>We have sent a link to confirm your email</p>
</Modal>
\`\`\`

#### 2. Кастомный header (например, Back / Next)
\`\`\`tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  size="lg"
  closeButtonPosition="none"
  headerContent={
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button>← Back</button>
      <span>Cropping</span>
      <button>Next →</button>
    </div>
  }
>
  <Content />
</Modal>
\`\`\`

#### 3. Кнопка закрытия снаружи
\`\`\`tsx
<Modal open={open} onOpenChange={setOpen} size="xl" closeButtonPosition="outside">
  <Gallery />
</Modal>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    closeButtonPosition: {
      control: 'radio',
      options: ['inside', 'outside', 'none']
    }
  }
};

export default meta;

// 🔹 Хелпер: шаблон для историй с useState
const withState = (Component: React.FC<{ open: boolean; setOpen: (open: boolean) => void }>) =>
  function WithStateWrapper() {
    const [open, setOpen] = useState(false);
    return <Component open={open} setOpen={setOpen} />;
  };

// 1️⃣ Playground
export const Playground = withState(({ open, setOpen }) => (
  <>
    <button
      style={{ padding: '8px 16px', background: '#4c6ef5', color: '#fff', border: 'none', borderRadius: 4 }}
      onClick={() => setOpen(true)}
    >
      Open Modal
    </button>

    <Modal open={open} onOpenChange={setOpen} size="md" title="Playground Modal" closeButtonPosition="inside">
      <p>Это модалка, которую можно открыть и закрыть.</p>
      <div style={{ marginTop: 30, textAlign: 'right' }}>
        <button onClick={() => setOpen(false)}>Закрыть</button>
      </div>
    </Modal>
  </>
));

// 2️⃣ Email Sent
export const EmailSent = withState(({ open, setOpen }) => (
  <>
    <button
      style={{ padding: '8px 16px', background: '#4c6ef5', color: '#fff', border: 'none', borderRadius: 4 }}
      onClick={() => setOpen(true)}
    >
      Open Modal
    </button>

    <Modal open={open} onOpenChange={setOpen} size="sm" title="Email sent">
      <p>
        We have sent a link to confirm your email to <b>epam@epam.com</b>
      </p>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button onClick={() => setOpen(false)}>OK</button>
      </div>
    </Modal>
  </>
));

// 4️⃣ Cropping
export const Cropping = withState(({ open, setOpen }) => (
  <>
    <button
      style={{ padding: '8px 16px', background: '#4c6ef5', color: '#fff', border: 'none', borderRadius: 4 }}
      onClick={() => setOpen(true)}
    >
      Open Modal
    </button>

    <Modal
      open={open}
      onOpenChange={setOpen}
      size="lg"
      closeButtonPosition="none"
      headerContent={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button style={{ fontSize: 20 }}>← Back</button>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Cropping</span>
          <button style={{ fontSize: 20 }}>Next →</button>
        </div>
      }
    >
      <div style={{ marginTop: 16 }}>
        <Image src="https://picsum.photos/600/400" alt="Preview" width={600} height={400} />
      </div>
    </Modal>
  </>
));

// 5️⃣ Gallery / Post
export const Gallery = withState(({ open, setOpen }) => (
  <>
    <button
      style={{ padding: '8px 16px', background: '#4c6ef5', color: '#fff', border: 'none', borderRadius: 4 }}
      onClick={() => setOpen(true)}
    >
      Open Modal
    </button>

    <Modal open={open} onOpenChange={setOpen} size="xl" closeButtonPosition="outside">
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2, position: 'relative' }}>
          <button style={{ position: 'absolute', left: 8, top: '50%' }}>←</button>
          <Image src="https://picsum.photos/600/500" alt="Post" width={600} height={500} />
          <button style={{ position: 'absolute', right: 8, top: '50%' }}>→</button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4>UserName</h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <p>
              <b>User1</b> Nice picture!
            </p>
            <p>
              <b>User2</b> Wow, amazing!
            </p>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <input placeholder="Add a comment…" style={{ width: '100%', marginBottom: 8 }} />
            <button className="btn-primary">Publish</button>
          </div>
        </div>
      </div>
    </Modal>
  </>
));
