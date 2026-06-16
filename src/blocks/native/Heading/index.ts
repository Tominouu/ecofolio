import type { BlockDefinition } from '../../../core/types/block.js';

export const headingBlock: BlockDefinition = {
  id: 'heading',
  name: 'Titre',
  icon: 'H',
  category: 'content',
  defaults: {
    level: 2,
    content: 'Titre de section',
    align: 'left',
  },
  schema: {
    type: 'object',
    properties: {
      level: { type: 'integer', minimum: 1, maximum: 6 },
      content: { type: 'string' },
      align: { type: 'string', enum: ['left', 'center', 'right'] },
    },
  },
};
