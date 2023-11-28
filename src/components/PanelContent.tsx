import React from 'react';

import { TabsState } from '@storybook/components';
import { convert, themes } from '@storybook/theming';

import { LocalStorageRecord } from '../types';

interface PanelContentProps {
  initialValues: LocalStorageRecord;
  currentValues: LocalStorageRecord;
}

const toString = (value: LocalStorageRecord) => {
  const results: Record<string, any> = {};

  Object.entries(value).forEach(([key, value]) => {
    try {
      results[key] = JSON.parse(value as any);
    } catch {
      results[key] = value;
    }
  });

  return JSON.stringify(results, null, 2);
};

export const PanelContent: React.FC<PanelContentProps> = ({
  initialValues,
  currentValues,
}) => (
  <TabsState
    initial="initialValues"
    backgroundColor={convert(themes.normal).background.hoverable}
  >
    <div
      id="initialValues"
      title="Initial Values"
      color={convert(themes.normal).color.purple}
    >
      <pre>{toString(initialValues)}</pre>
    </div>
    <div
      id="currentValues"
      title="Current Values"
      color={convert(themes.normal).color.green}
    >
      <pre>{toString(currentValues)}</pre>
    </div>
  </TabsState>
);
