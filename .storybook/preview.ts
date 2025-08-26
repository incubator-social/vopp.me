import type { Preview } from '@storybook/nextjs-vite';
import '../src/shared/styles/index.scss';
import { themes } from 'storybook/theming';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#0d0d0d'
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
};

export default preview;
