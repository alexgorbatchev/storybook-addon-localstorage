import { LocalStorageRecord } from './types';

export const localStorageForStorybook = (params: Record<string, unknown>) => {
  const results: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    results[key] = JSON.stringify(value);
  });

  return results;
};
