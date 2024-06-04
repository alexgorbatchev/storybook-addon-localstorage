import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.{ts,tsx}'],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: false,
  format: ['esm'],
  dts: true,
});
