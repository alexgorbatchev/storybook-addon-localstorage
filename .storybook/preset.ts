// https://storybook.js.org/docs/addons/writing-presets#managerentries
export const managerEntries = (entry = []) => [...entry, require.resolve('../src/manager.tsx')];

// https://storybook.js.org/docs/addons/writing-presets#previewannotations
export const previewAnnotations = (entry = [], options) => [...entry, require.resolve('../src/preview.ts')];
