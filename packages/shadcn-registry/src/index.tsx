import { blocks } from './registry-blocks';
import { examples } from './registry-examples';
import { hooks } from './registry-hooks';
import { lib } from './registry-lib';
import { themes } from './registry-themes';
import { ui } from './registry-ui';
import type { Registry } from './schema';

export const registry = {
  name: 'koroflow',
  homepage: 'https://koroflow.com/components',
  items: [
    ...ui,
    ...blocks,
    ...lib,
    ...hooks,
    ...themes,

    // Internal use only.
    ...examples,
  ],
} satisfies Registry;
