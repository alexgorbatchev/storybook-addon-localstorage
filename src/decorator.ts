import type { DecoratorFunction } from '@storybook/types';
import { withLocalStorage } from './withLocalStorage';

export const decorators: DecoratorFunction[] = [withLocalStorage];
