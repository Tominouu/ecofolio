import type { BlockDefinition } from '../../../core/types/block.js';

export const buttonBlock: BlockDefinition = {
  id: 'button',
  name: 'Bouton',
  icon: '🔘',
  category: 'content',
  defaults: {
    text: 'Voir le projet',
    url: '#',
    style: 'primary',
  },
  schema: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      url: { type: 'string' },
      style: { type: 'string', enum: ['primary', 'secondary', 'outline', 'ghost'] },
      target: { type: 'string' },
    },
  },
};
