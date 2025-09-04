import type { StorybookConfig } from '@storybook/nextjs';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-vitest'],
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const imageRule = config.module.rules.find(
      (rule): rule is RuleSetRule =>
        rule != null &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
    );

    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

export default config;
