export const ADDON_ID = 'storybook/localStorage-addon';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = 'localStorage';

export const EVENTS = {
  LOCAL_STORAGE_CHANGED: `${ADDON_ID}/localStorage_changed`,
  RENDERED: `${ADDON_ID}/rendered`,
} as const;
