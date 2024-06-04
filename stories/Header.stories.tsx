import { Meta, StoryObj } from '@storybook/react';

import { localStorageForStorybook } from '../src/localStorageForStorybook';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const JohnLoggedIn: Story = {
  parameters: {
    // this helper automatically stringifies the values using `JSON.stringify`
    localStorage: localStorageForStorybook({
      value: 123,
      user: { name: 'John' },
    }),
  },
};

export const JaneLoggedIn: Story = {
  parameters: {
    // if you have own serialzer, you can use it as well
    localStorage: {
      value: '123',
      user: JSON.stringify({ name: 'Jane' }),
    },
  },
};

export const ParametersNotSet: Story = {};
