import type { BlockDefinition } from '../../../core/types/block.js';

export const textBlock: BlockDefinition = {
  id: 'text',
  name: 'Texte',
  icon: 'T',
  category: 'content',
  defaults: {
    content: 'Écrivez votre texte ici...',
    format: 'markdown',
  },
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      format: { type: 'string', enum: ['markdown', 'html'] },
    },
  },
};
