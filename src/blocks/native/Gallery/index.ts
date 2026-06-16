import type { BlockDefinition } from '../../../core/types/block.js';

export const galleryBlock: BlockDefinition = {
  id: 'gallery',
  name: 'Galerie',
  icon: '⊞',
  category: 'media',
  defaults: {
    images: [],
    layout: 'grid',
    columns: 3,
    lightbox: true,
  },
  schema: {},
};
