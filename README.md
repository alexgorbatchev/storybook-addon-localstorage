# Storybook LocalStorage Addon

A [Storybook](https://storybook.js.org/) v8 addon and decorator for mocking and displaying current values of the [`window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in a Storybook panel

If you want to setup `parameters` to be strongly typed, see [@alexgorbatchev/storybook-parameters](https://github.com/alexgorbatchev/storybook-parameters).

![](./screenshot.png)

## Install

```sh
npm i --save-dev @alexgorbatchev/storybook-addon-localstorage
```

Register the addon in `.storybook/main.js`

```ts
export default {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@alexgorbatchev/storybook-addon-localstorage'],
};
```

## Important

- If `parameters.localStorage` is set, `localStorage.clear()` will be called before
  populating the values.
- The values passed into `parameters.localStorage` **must be strings** because `localStorage`
  only works with strings. You can use `JSON.stringify` or there's a helper function provided by the addon
  called `localStorageForStorybook`.
- Finally, it's important to note that the addon works by polling and diffing mocked values
  in `localStorage` every 100ms.

## Usage

Given a simple component:

```tsx
export const Header = () => {
  const [user, setUser, { removeItem }] = useLocalStorage<{ name: string }>('user');

  return (
    <div>
      {user ? (
        <div>
          <div>{`Logged in as ${user.name}`}</div>
          <Button size="small" label="Log out" onClick={() => removeItem()} />
        </div>
      ) : (
        <div>
          <div>No one is signed in</div>
          <Button size="small" label="Log in" onClick={() => setUser({ name: 'John' })} />
        </div>
      )}
    </div>
  );
};
```

You can write a story as

```tsx
import { localStorageForStorybook } from '@alexgorbatchev/storybook-addon-localstorage';
import { Meta, StoryObj } from '@storybook/react';

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
```

Strongly typed example:

```tsx
import { Meta, StoryObj } from '@alexgorbatchev/storybook-parameters';
import { LocalStorageParameters } from '@alexgorbatchev/storybook-addon-localstorage';

interface StoryParameters extends LocalStorageParameters {}

const meta: Meta<typeof Header, StoryParameters> = {
  title: 'Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header, StoryParameters>;

export const JohnLoggedIn: Story = {
  parameters: {
    // `localStorage` will show up in `Parameters`
    localStorage: {
      key: 'value',
    },
  },
};
```

## Development Scripts

- `npm run storybook` starts Storybook
- `tsup` build `./dist`
