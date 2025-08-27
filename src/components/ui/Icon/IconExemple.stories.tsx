import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Mic from '../../../shared/assets/icons/components/Mic';
import styles from './IconExemple.module.scss';

const meta: Meta<typeof Mic> = {
  title: 'Design System/Icons/Example',
  component: Mic,
  parameters: {
    docs: {
      description: {
        component: `
### Mic Icon 🎤

Можно менять:
- **цвет** через \`color\` или CSS
- **размер** через \`font-size\` или \`width/height\`
- **hover** стили через SCSS/inline CSS
        `
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof Mic>;

export const Default: Story = {
  render: () => <Mic className={styles.icon} />
};

export const Colored: Story = {
  render: () => <Mic className={styles.colored} />
};

export const Large: Story = {
  render: () => <Mic className={styles.large} />
};
