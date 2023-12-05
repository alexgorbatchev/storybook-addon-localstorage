import React, { useState } from 'react';

import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

import { PanelContent } from './components/PanelContent';
import { EVENTS, NOTE } from './constants';
import { LocalStorageRecord } from './types';

interface PanelProps {
  active: boolean;
  key: string;
}

export const Panel: React.FC<PanelProps> = (props) => {
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

  return (
    <AddonPanel {...props}>
      {note && <code style={{ padding: '1em' }}>{note}</code>}
      {!note && <PanelContent currentValues={currentValues} initialValues={initialValues} />}
    </AddonPanel>
  );
};
