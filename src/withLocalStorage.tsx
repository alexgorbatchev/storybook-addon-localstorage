import React, { useEffect } from 'react';
import useLocalStorage from 'use-local-storage-state';

import { addons, makeDecorator } from '@storybook/addons';

import { EVENTS } from './constants';
import { LocalStorageRecord } from './types';

export const withLocalStorage = makeDecorator({
  name: 'withLocalStorage',
  parameterName: 'localStorage',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters }) => {
    const channel = addons.getChannel();

    if (!parameters) {
      channel.emit(EVENTS.RENDERED, {
        note: 'withLocalStorage decorator not used',
      });
      return storyFn(context);
    }

    const paramValues = parameters as LocalStorageRecord;
    const actualValues: Record<string, unknown> = {};

    useEffect(() => {
      Object.entries(paramValues).forEach(([key, value]) => {
        window.localStorage.setItem(key, String(value));
      });

      return () => {
        Object.keys(paramValues).forEach((key) => {
          window.localStorage.removeItem(key);
        });
      };
    }, []);

    Object.keys(paramValues).map((key) => {
      const [itemValue] = useLocalStorage(key);
      actualValues[key] = itemValue;
    });

    useEffect(() => {
      channel.emit(EVENTS.RENDERED, paramValues);
    }, [paramValues]);

    useEffect(() => {
      channel.emit(EVENTS.LOCAL_STORAGE_CHANGED, actualValues);
    }, [actualValues]);

    return <>{storyFn(context)}</>;
  },
});
