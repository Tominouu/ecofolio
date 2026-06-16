import type { BlockDefinition } from '../../../core/types/block.js';

export const videoBlock: BlockDefinition = {
  id: 'video',
  name: 'Vidéo',
  icon: '▶',
  category: 'media',
  defaults: {
    src: '',
    provider: 'youtube',
    caption: '',
  },
  schema: {},
};
