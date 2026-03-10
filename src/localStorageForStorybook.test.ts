import { describe, expect, it } from 'vitest';

import { localStorageForStorybook } from './localStorageForStorybook';

describe('localStorageForStorybook', () => {
  it('converts string values', () => {
    expect(localStorageForStorybook({ key: 'value' })).toEqual({ key: '"value"' });
  });

  it('converts number values', () => {
    expect(localStorageForStorybook({ count: 42 })).toEqual({ count: '42' });
  });

  it('converts boolean values', () => {
    expect(localStorageForStorybook({ flag: true })).toEqual({ flag: 'true' });
    expect(localStorageForStorybook({ flag: false })).toEqual({ flag: 'false' });
  });

  it('converts null values', () => {
    expect(localStorageForStorybook({ empty: null })).toEqual({ empty: 'null' });
  });

  it('converts object values', () => {
    expect(localStorageForStorybook({ user: { name: 'Alice' } })).toEqual({
      user: '{"name":"Alice"}',
    });
  });

  it('converts array values', () => {
    expect(localStorageForStorybook({ items: [1, 2, 3] })).toEqual({
      items: '[1,2,3]',
    });
  });

  it('handles multiple keys', () => {
    const result = localStorageForStorybook({ a: 1, b: 'two', c: true });
    expect(result).toEqual({ a: '1', b: '"two"', c: 'true' });
  });

  it('returns empty object for empty input', () => {
    expect(localStorageForStorybook({})).toEqual({});
  });
});
