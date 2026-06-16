import type { BlockDefinition } from '../../../core/types/block.js';

export const imageBlock: BlockDefinition = {
  id: 'image',
  name: 'Image',
  icon: '🖼',
  category: 'media',
  defaults: {
    src: '',
    alt: '',
    loading: 'lazy',
  },
  schema: {
    type: 'object',
    properties: {
      src: { type: 'string' },
      alt: { type: 'string' },
      caption: { type: 'string' },
      loading: { type: 'string', enum: ['lazy', 'eager'] },
    },
  },
};
