// https://storybook.js.org/docs/addons/writing-presets#managerentries
export const managerEntries = ['@alexgorbatchev/storybook-addon-localstorage/manager'];

// https://storybook.js.org/docs/addons/writing-presets#previewannotations
// Preview is bundled by Vite which handles file:// URLs correctly,
// unlike the manager which is bundled by esbuild.
export const previewAnnotations = [import.meta.resolve('./preview')];
