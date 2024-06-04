import React, { useState } from 'react';

import { TabsState } from '@storybook/components';
import { useChannel } from '@storybook/manager-api';

import { EVENTS, NOTE } from './constants';
import { LocalStorageRecord } from './types';

type PanelProps = {
  active?: boolean;
};

type PanelContentProps = {
  initialValues?: LocalStorageRecord;
  currentValues?: LocalStorageRecord;
};

const toString = (value: LocalStorageRecord = {}) => {
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

const PanelContent: React.FC<PanelContentProps> = ({ initialValues, currentValues }) => (
  <TabsState initial="initialValues">
    <div id="initialValues" title="Initial Values">
      <pre>{toString(initialValues)}</pre>
    </div>
    <div id="currentValues" title="Current Values">
      <pre>{toString(currentValues)}</pre>
    </div>
  </TabsState>
);

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [currentValues, setCurrentValues] = useState<LocalStorageRecord>();
  const [initialValues, setInitialValues] = useState<LocalStorageRecord>();
  const note = initialValues && initialValues[NOTE];

  useChannel({
    [EVENTS.SET_INITIAL_VALUES]: (values) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [EVENTS.SET_CURRENT_VALUES]: (values) => {
      setCurrentValues(values);
    },
  });

  if (!active) return null;

  return (
    <>
      {note && <code style={{ padding: '1em' }}>{note}</code>}
      {!note && <PanelContent currentValues={currentValues} initialValues={initialValues} />}
    </>
  );
};
