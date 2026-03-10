import React from 'react';

import { cleanup, render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EVENTS, NOTE } from './constants';

// Capture the event handlers registered via useChannel
let channelHandlers: Record<string, (...args: any[]) => void> = {};

vi.mock('storybook/manager-api', () => ({
  useChannel: (handlers: Record<string, (...args: any[]) => void>) => {
    channelHandlers = handlers;
  },
}));

vi.mock('storybook/internal/components', () => ({
  TabsState: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs">{children}</div>,
}));

// Import after mocks
const { Panel } = await import('./Panel');

describe('Panel', () => {
  beforeEach(() => {
    channelHandlers = {};
  });

  afterEach(() => {
    cleanup();
  });

  it('renders nothing when inactive', () => {
    const { container } = render(<Panel active={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('shows values after SET_INITIAL_VALUES event', () => {
    render(<Panel active={true} />);

    act(() => {
      channelHandlers[EVENTS.SET_INITIAL_VALUES]({ theme: '"dark"' });
    });

    // Both initial and current tabs show the same values, so use getAllByText
    expect(screen.getAllByText(/"theme":/).length).toBe(2);
    expect(screen.getAllByText(/"dark"/).length).toBe(2);
  });

  it('shows note message when NOTE key is present', () => {
    render(<Panel active={true} />);

    act(() => {
      channelHandlers[EVENTS.SET_INITIAL_VALUES]({ [NOTE]: 'parameters.localStorage not defined' });
    });

    expect(screen.getByText('parameters.localStorage not defined')).toBeInTheDocument();
    expect(screen.queryByTestId('tabs')).not.toBeInTheDocument();
  });

  it('updates on SET_CURRENT_VALUES event', () => {
    render(<Panel active={true} />);

    act(() => {
      channelHandlers[EVENTS.SET_INITIAL_VALUES]({ theme: '"dark"' });
    });

    act(() => {
      channelHandlers[EVENTS.SET_CURRENT_VALUES]({ theme: '"light"' });
    });

    // Current values tab should show updated value
    const pres = screen.getAllByRole('generic').filter((el) => el.tagName === 'PRE');
    const currentValuesPre = pres[pres.length - 1];
    expect(currentValuesPre.textContent).toContain('"light"');
  });
});
