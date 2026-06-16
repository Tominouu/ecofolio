import type { BlockDefinition, BlockType } from '../core/types/block.js';
import { textBlock } from './native/Text/index.js';
import { headingBlock } from './native/Heading/index.js';
import { imageBlock } from './native/Image/index.js';
import { dividerBlock } from './native/Divider/index.js';
import { quoteBlock } from './native/Quote/index.js';
import { buttonBlock } from './native/Button/index.js';

const definitions: Record<BlockType, BlockDefinition> = {
  text: textBlock,
  heading: headingBlock,
  image: imageBlock,
  gallery: {
    id: 'gallery',
    name: 'Galerie',
    icon: '📷',
    category: 'media',
    defaults: { images: [], layout: 'grid', columns: 3, lightbox: true },
    schema: {},
  },
  video: {
    id: 'video',
    name: 'Vidéo',
    icon: '▶',
    category: 'media',
    defaults: { src: '', provider: 'youtube' },
    schema: {},
  },
  quote: quoteBlock,
  button: buttonBlock,
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    icon: '⏱',
    category: 'advanced',
    defaults: { items: [], layout: 'left' },
    schema: {},
  },
  code: {
    id: 'code',
    name: 'Code',
    icon: '</>',
    category: 'advanced',
    defaults: { code: '', language: 'text', showLineNumbers: false },
    schema: {},
  },
  divider: dividerBlock,
  'custom-html': {
    id: 'custom-html',
    name: 'HTML personnalisé',
    icon: '⚡',
    category: 'advanced',
    defaults: { html: '', css: '', js: '' },
    schema: {},
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition | undefined {
  return definitions[type];
}

export function getAllBlockDefinitions(): BlockDefinition[] {
  return Object.values(definitions);
}

export function getBlocksByCategory(): Record<string, BlockDefinition[]> {
  const grouped: Record<string, BlockDefinition[]> = {};
  for (const def of Object.values(definitions)) {
    if (!grouped[def.category]) grouped[def.category] = [];
    grouped[def.category].push(def);
  }
  return grouped;
}

export function renderBlock(type: BlockType, data: Record<string, unknown>): string {
  const def = definitions[type];
  if (!def) return `<div>Unknown block type: ${type}</div>`;

  const merged = { ...def.defaults, ...data };
  return renderBlockContent(type, merged);
}

function renderBlockContent(type: BlockType, data: Record<string, unknown>): string {
  switch (type) {
    case 'text': {
      const content = (data as any).content || '';
      const format = (data as any).format || 'markdown';
      if (format === 'html') return `<div class="block-text">${content}</div>`;
      return `<div class="block-text"><p>${content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p></div>`;
    }
    case 'heading': {
      const level = (data as any).level || 2;
      const content = (data as any).content || '';
      const align = (data as any).align || 'left';
      return `<h${level} class="block-heading" style="text-align:${align}">${content}</h${level}>`;
    }
    case 'image': {
      const src = (data as any).src || '';
      const alt = (data as any).alt || '';
      const caption = (data as any).caption;
      const loading = (data as any).loading || 'lazy';
      const img = `<img src="${src}" alt="${alt}" loading="${loading}" class="block-image">`;
      return caption ? `<figure>${img}<figcaption>${caption}</figcaption></figure>` : img;
    }
    case 'divider': {
      const style = (data as any).style || 'solid';
      return `<hr class="block-divider" style="border-style:${style}">`;
    }
    case 'quote': {
      const content = (data as any).content || '';
      const author = (data as any).author || '';
      const role = (data as any).role || '';
      return `<blockquote class="block-quote"><p>${content}</p><footer>${author}${role ? `, ${role}` : ''}</footer></blockquote>`;
    }
    case 'button': {
      const text = (data as any).text || 'Button';
      const url = (data as any).url || '#';
      const btnStyle = (data as any).style || 'primary';
      const target = (data as any).target || '';
      return `<a href="${url}" class="block-button block-button--${btnStyle}"${target ? ` target="${target}"` : ''}>${text}</a>`;
    }
    default:
      return `<div class="block-${type}">${JSON.stringify(data)}</div>`;
  }
}
