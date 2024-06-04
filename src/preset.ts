// https://storybook.js.org/docs/addons/writing-presets#managerentries
export const managerEntries = (entry = []) => [...entry, require.resolve('./manager')];

// https://storybook.js.org/docs/addons/writing-presets#previewannotations
export const previewAnnotations = (entry = []) => [...entry, require.resolve('./preview')];
