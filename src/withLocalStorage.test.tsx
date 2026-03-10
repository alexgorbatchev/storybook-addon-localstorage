import React from 'react';

import { cleanup, render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EVENTS, NOTE } from './constants';

const mockEmit = vi.fn();
const mockChannel = { emit: mockEmit };

vi.mock('storybook/preview-api', () => ({
  addons: {
    getChannel: () => mockChannel,
  },
  makeDecorator: ({
    wrapper,
  }: {
    name: string;
    parameterName: string;
    wrapper: (getStory: () => any, context: any, options: { parameters: any }) => any;
  }) => {
    return wrapper;
  },
}));

const { StorybookAddonLocalStorage } = await import('./withLocalStorage');

describe('StorybookAddonLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockEmit.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('sets localStorage from parameters', () => {
    render(
      <StorybookAddonLocalStorage parameters={{ token: '"abc"' }}>
        <div>child</div>
      </StorybookAddonLocalStorage>,
    );

    expect(window.localStorage.getItem('token')).toBe('"abc"');
  });

  it('emits SET_INITIAL_VALUES', () => {
    render(
      <StorybookAddonLocalStorage parameters={{ token: '"abc"' }}>
        <div>child</div>
      </StorybookAddonLocalStorage>,
    );

    expect(mockEmit).toHaveBeenCalledWith(EVENTS.SET_INITIAL_VALUES, { token: '"abc"' });
  });

  it('renders children', () => {
    render(
      <StorybookAddonLocalStorage parameters={{ token: '"abc"' }}>
        <div>child content</div>
      </StorybookAddonLocalStorage>,
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('shows note when parameters are undefined', () => {
    render(
      <StorybookAddonLocalStorage parameters={undefined as any}>
        <div>child</div>
      </StorybookAddonLocalStorage>,
    );

    expect(mockEmit).toHaveBeenCalledWith(EVENTS.SET_INITIAL_VALUES, {
      [NOTE]: 'parameters.localStorage not defined',
    });
  });

  it('polls and emits SET_CURRENT_VALUES on change', () => {
    render(
      <StorybookAddonLocalStorage parameters={{ token: '"abc"' }}>
        <div>child</div>
      </StorybookAddonLocalStorage>,
    );

    mockEmit.mockClear();

    // Simulate external change to localStorage
    window.localStorage.setItem('token', '"xyz"');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockEmit).toHaveBeenCalledWith(EVENTS.SET_CURRENT_VALUES, { token: '"xyz"' });
  });

  it('cleans up localStorage and interval on unmount', () => {
    const { unmount } = render(
      <StorybookAddonLocalStorage parameters={{ token: '"abc"', theme: '"dark"' }}>
        <div>child</div>
      </StorybookAddonLocalStorage>,
    );

    expect(window.localStorage.getItem('token')).toBe('"abc"');

    unmount();

    expect(window.localStorage.getItem('token')).toBeNull();
    expect(window.localStorage.getItem('theme')).toBeNull();

    // Interval should be cleared — no more emits after unmount
    mockEmit.mockClear();
    window.localStorage.setItem('token', '"new"');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockEmit).not.toHaveBeenCalledWith(EVENTS.SET_CURRENT_VALUES, expect.anything());
  });
});
