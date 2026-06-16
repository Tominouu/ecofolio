import type { BlockDefinition } from '../../../core/types/block.js';

export const codeBlock: BlockDefinition = {
  id: 'code',
  name: 'Code',
  icon: '</>',
  category: 'advanced',
  defaults: {
    code: 'const hello = "world";',
    language: 'javascript',
    showLineNumbers: false,
  },
  schema: {},
};
