import type { BlockDefinition } from '../../../core/types/block.js';

export const customHtmlBlock: BlockDefinition = {
  id: 'custom-html',
  name: 'HTML',
  icon: '⚡',
  category: 'advanced',
  defaults: {
    html: '',
    css: '',
    js: '',
    title: 'Bloc personnalisé',
  },
  schema: {},
};
