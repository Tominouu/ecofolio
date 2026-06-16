import type { BlockDefinition } from '../../../core/types/block.js';

export const quoteBlock: BlockDefinition = {
  id: 'quote',
  name: 'Citation',
  icon: '"',
  category: 'content',
  defaults: {
    content: 'Une citation inspirante.',
    author: 'Auteur',
    style: 'default',
  },
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      author: { type: 'string' },
      role: { type: 'string' },
      style: { type: 'string', enum: ['default', 'large', 'bordered'] },
    },
  },
};
