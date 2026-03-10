import { fileURLToPath } from 'node:url';

// https://storybook.js.org/docs/addons/writing-presets#managerentries
export function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../src/manager.tsx'))];
}

// https://storybook.js.org/docs/addons/writing-presets#previewannotations
export function previewAnnotations(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../src/preview.ts'))];
}
