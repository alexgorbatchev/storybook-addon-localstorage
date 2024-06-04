import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['.'],
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: './.storybook/vite.config.ts',
      },
    },
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
