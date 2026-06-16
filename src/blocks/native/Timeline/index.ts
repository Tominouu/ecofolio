import type { BlockDefinition } from '../../../core/types/block.js';

export const timelineBlock: BlockDefinition = {
  id: 'timeline',
  name: 'Timeline',
  icon: '⏱',
  category: 'advanced',
  defaults: {
    items: [
      { year: '2025', title: 'Titre étape', description: 'Description' },
      { year: '2024', title: 'Titre étape', description: 'Description' },
    ],
    layout: 'left',
  },
  schema: {},
};
