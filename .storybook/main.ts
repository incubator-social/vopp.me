import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/shared/ui/**/*.stories.@(js|jsx|ts|tsx)', // 👈 Правильный путь!
  ],
  addons: [
    // '@storybook/addon-essentials',
    // '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
};
export default config;
