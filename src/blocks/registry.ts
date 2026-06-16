import type { BlockDefinition, BlockType } from '../core/types/block.js';
import { textBlock } from './native/Text/index.js';
import { headingBlock } from './native/Heading/index.js';
import { imageBlock } from './native/Image/index.js';
import { galleryBlock } from './native/Gallery/index.js';
import { videoBlock } from './native/Video/index.js';
import { quoteBlock } from './native/Quote/index.js';
import { buttonBlock } from './native/Button/index.js';
import { timelineBlock } from './native/Timeline/index.js';
import { codeBlock } from './native/Code/index.js';
import { dividerBlock } from './native/Divider/index.js';
import { customHtmlBlock } from './native/CustomHtml/index.js';

const definitions: Record<BlockType, BlockDefinition> = {
  text: textBlock,
  heading: headingBlock,
  image: imageBlock,
  gallery: galleryBlock,
  video: videoBlock,
  quote: quoteBlock,
  button: buttonBlock,
  timeline: timelineBlock,
  code: codeBlock,
  divider: dividerBlock,
  'custom-html': customHtmlBlock,
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
    case 'gallery': {
      const images = (data as any).images || [];
      const columns = (data as any).columns || 3;
      if (!images.length) return '<div class="block-placeholder-text">Ajoutez des images à la galerie</div>';
      return `<div class="block-gallery" style="display:grid;grid-template-columns:repeat(${Math.min(columns, 4)},1fr);gap:0.5rem">
        ${images.map((img: any) => `<img src="${img.src}" alt="${img.alt || ''}" loading="lazy" style="width:100%;height:auto;border-radius:4px">`).join('')}
      </div>`;
    }
    case 'video': {
      const src = (data as any).src || '';
      if (!src) return '<div class="block-placeholder-text">Ajoutez une URL vidéo</div>';
      return `<div class="block-video" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px">
        <iframe src="${src}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen></iframe>
      </div>`;
    }
    case 'quote': {
      const content = (data as any).content || '';
      const author = (data as any).author || '';
      const role = (data as any).role || '';
      const style = (data as any).style || 'default';
      const cls = style === 'large' ? 'block-quote block-quote--large' : style === 'bordered' ? 'block-quote block-quote--bordered' : 'block-quote';
      return `<blockquote class="${cls}"><p>${content}</p><footer>${author}${role ? `<span class="quote-role">, ${role}</span>` : ''}</footer></blockquote>`;
    }
    case 'button': {
      const text = (data as any).text || 'Button';
      const url = (data as any).url || '#';
      const btnStyle = (data as any).style || 'primary';
      const target = (data as any).target || '';
      return `<a href="${url}" class="block-button block-button--${btnStyle}"${target ? ` target="${target}"` : ''}>${text}</a>`;
    }
    case 'timeline': {
      const items = (data as any).items || [];
      const layout = (data as any).layout || 'left';
      if (!items.length) return '<div class="block-placeholder-text">Ajoutez des étapes à la timeline</div>';
      return `<div class="block-timeline">
        ${items.map((item: any, i: number) => `
          <div class="timeline-item" style="padding-left:${layout === 'left' ? '1.5rem' : i % 2 === 0 ? '0' : '50%'};margin-bottom:1.5rem;position:relative">
            <div class="timeline-marker" style="position:absolute;left:0;top:0.3rem;width:10px;height:10px;border-radius:50%;background:var(--color-primary);${layout === 'alternating' && i % 2 === 0 ? 'right:-5px;left:auto' : ''}"></div>
            <div class="timeline-year" style="font-weight:700;font-size:0.85rem;color:var(--color-primary)">${item.year}</div>
            <div class="timeline-title" style="font-weight:600">${item.title}</div>
            ${item.description ? `<div class="timeline-desc" style="font-size:0.9rem;color:var(--text-secondary)">${item.description}</div>` : ''}
          </div>`).join('')}
      </div>`;
    }
    case 'code': {
      const code = (data as any).code || '';
      const showNumbers = (data as any).showLineNumbers;
      return `<pre class="block-code" style="background:#1e1e1e;color:#d4d4d4;padding:1rem;border-radius:8px;overflow-x:auto;font-size:0.85rem;line-height:1.5"><code>${showNumbers ? code.split('\n').map((l: string, i: number) => `<span style="color:#6e6e6e;user-select:none;margin-right:1rem">${String(i + 1).padStart(3, ' ')}</span>${l}`).join('<br>') : code}</code></pre>`;
    }
    case 'divider': {
      const style = (data as any).style || 'solid';
      const size = (data as any).size || 'medium';
      const margins = size === 'small' ? '1rem' : size === 'large' ? '2.5rem' : '1.5rem';
      return `<hr class="block-divider" style="border:none;border-top:1px ${style} var(--border-primary);margin:${margins} 0">`;
    }
    case 'custom-html': {
      const html = (data as any).html || '';
      if (!html) return '<div class="block-placeholder-text">Bloc HTML personnalisé</div>';
      return `<div class="block-custom-html">${html}</div>`;
    }
    default:
      return `<div class="block-${type}">${JSON.stringify(data)}</div>`;
  }
}
