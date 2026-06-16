import type { BlockDefinition } from '../../../core/types/block.js';

export const dividerBlock: BlockDefinition = {
  id: 'divider',
  name: 'Séparateur',
  icon: '——',
  category: 'advanced',
  defaults: {
    style: 'solid',
    size: 'medium',
    withIcon: false,
  },
  schema: {
    type: 'object',
    properties: {
      style: { type: 'string', enum: ['solid', 'dashed', 'dotted'] },
      size: { type: 'string', enum: ['small', 'medium', 'large'] },
      withIcon: { type: 'boolean' },
    },
  },
};
