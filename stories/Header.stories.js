import { localStorageForStorybook } from '../dist/esm';

import { Header } from './Header';

const meta = {
  title: 'Header',
  component: Header,
};

export default meta;

export const JohnLoggedIn = {
  parameters: {
    // this helper automatically stringifies the values using `JSON.stringify`
    localStorage: localStorageForStorybook({
      value: 123,
      user: { name: 'John' },
    }),
  },
};

export const JaneLoggedIn = {
  parameters: {
    // if you have own serialzer, you can use it as well
    localStorage: {
      value: '123',
      user: JSON.stringify({ name: 'Jane' }),
    },
  },
};

export const LoggedOut = {};
