import React, { useState } from 'react';

import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

import { PanelContent } from './components/PanelContent';
import { EVENTS } from './constants';
import { LocalStorageRecord } from './types';

interface PanelProps {
  active: boolean;
  key: string;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [currentValues, setCurrentValues] = useState<LocalStorageRecord>({});
  const [initialValues, setInitialValues] = useState<LocalStorageRecord>({});

  useChannel({
    [EVENTS.RENDERED]: (values) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [EVENTS.LOCAL_STORAGE_CHANGED]: (values) => {
      setCurrentValues(values);
    },
  });

  return (
    <AddonPanel {...props}>
      <PanelContent
        currentValues={currentValues}
        initialValues={initialValues}
      />
    </AddonPanel>
  );
};
