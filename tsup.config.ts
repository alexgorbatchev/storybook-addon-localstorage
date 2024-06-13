import { defineConfig } from 'tsup';
import { globalPackages } from '@storybook/manager/globals';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/manager.tsx', 'src/preset.ts', 'src/preview.ts'],
  splitting: true,
  format: ['cjs', 'esm'],
  bundle: true,
  dts: {
    // Setting resolve to true throws:
    // RollupError: "NextHandleFunction" is not exported
    resolve: false,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: 'node',
  skipNodeModulesBundle: true,
  external: globalPackages,
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
}));
