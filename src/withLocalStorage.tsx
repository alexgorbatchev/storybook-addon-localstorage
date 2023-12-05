import React, { useEffect, useState } from 'react';

import { addons, makeDecorator } from '@storybook/addons';

import { EVENTS, NOTE } from './constants';
import { LocalStorageRecord } from './types';

interface CommonProps {
  children: React.ReactElement;
  parameters: LocalStorageRecord;
}

const StorybookAddonLocalStorageInContext = ({ parameters, children }: CommonProps) => {
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

  if (ready) return children;
};

const StorybookAddonLocalStorage = (props: CommonProps) => {
  return <StorybookAddonLocalStorageInContext {...props} />;
};

export const withLocalStorage = makeDecorator({
  name: 'withLocalStorage',
  parameterName: 'localStorage',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters }) => {
    return <StorybookAddonLocalStorage parameters={parameters}>{storyFn(context) as any}</StorybookAddonLocalStorage>;
  },
});
