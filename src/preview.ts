import type { ProjectAnnotations, Renderer } from '@storybook/types';
import { withLocalStorage } from './withLocalStorage';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withLocalStorage],
};

export default preview;
