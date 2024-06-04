import React, { useEffect, useState } from 'react';

import { addons, makeDecorator } from '@storybook/preview-api';

import { EVENTS, NOTE } from './constants';
import type { LocalStorageRecord } from './types';

type Props = {
  children: React.ReactElement;
  parameters: LocalStorageRecord;
};

const StorybookAddonLocalStorage = ({ parameters, children }: Props) => {
  const channel = addons.getChannel();
  const [ready, setReady] = useState(false);

  const userNote = (note: string) => {
    channel.emit(EVENTS.SET_INITIAL_VALUES, { [NOTE]: note });
    return children;
  };

  if (!parameters) return userNote('parameters.localStorage not defined');

  useEffect(() => {
    window.localStorage.clear();

    Object.entries(parameters).forEach(([key, value]) => {
      window.localStorage.setItem(key, String(value));
    });

    let previousValuesAsJSON = '';
    const keys = Object.keys(parameters);

    const intervalId = setInterval(() => {
      const actualValues: Record<string, unknown> = {};

      for (const key of keys) {
        actualValues[key] = window.localStorage.getItem(key);
      }

      const actualValuesAsJSON = JSON.stringify(actualValues);

      if (previousValuesAsJSON !== actualValuesAsJSON) {
        previousValuesAsJSON = actualValuesAsJSON;
        channel.emit(EVENTS.SET_CURRENT_VALUES, actualValues);
      }
    }, 100);

    setReady(true);

    return () => {
      clearInterval(intervalId);

      Object.keys(parameters).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    };
  }, [parameters]);

  channel.emit(EVENTS.SET_INITIAL_VALUES, { ...parameters });

  return ready ? children : null;
};

export const withLocalStorage = makeDecorator({
  name: 'withLocalStorage',
  parameterName: 'localStorage',
  wrapper: (getStory, context, { parameters }) => (
    <StorybookAddonLocalStorage parameters={parameters}>{getStory(context) as any}</StorybookAddonLocalStorage>
  ),
});
