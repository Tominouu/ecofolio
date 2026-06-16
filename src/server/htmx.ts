import type { FastifyRequest } from 'fastify';
import type { Project, Block } from '../core/types/index.js';
import { getBlockDefinition } from '../blocks/registry.js';

export function isHtmx(req: FastifyRequest): boolean {
  return req.headers['hx-request'] === 'true';
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderProjectCard(project: Project): string {
  const statusColor =
    project.status === 'published'
      ? 'published'
      : project.status === 'draft'
        ? 'draft'
        : 'archived';

  return `
<article class="project-card" tabindex="0" onclick="window.location='/editor/${project.slug}'" onkeydown="if(event.key==='Enter')window.location='/editor/${project.slug}'">
  <div class="project-card-header">
    <span class="project-card-status ${statusColor}">${project.status}</span>
    ${project.featured ? '<span class="project-card-featured">★</span>' : ''}
  </div>
  <h2 class="project-card-title">${escapeHtml(project.title)}</h2>
  ${project.subtitle ? `<p class="project-card-desc">${escapeHtml(project.subtitle)}</p>` : ''}
  <div class="project-card-footer">
    <div class="project-card-meta">
      <span>${project.date}</span>
      ${project.tags.length ? `<span>·</span><span>${project.tags.slice(0, 2).join(', ')}</span>` : ''}
    </div>
    <div class="project-card-stats">
      <span>${project.blocks.length} blocs</span>
    </div>
  </div>
</article>`;
}

export function renderProjectCards(projects: Project[]): string {
  if (projects.length === 0) {
    return '<div class="empty-state"><p>Aucun projet pour le moment</p><p class="text-sm text-secondary">Cliquez sur + Nouveau projet pour commencer</p></div>';
  }
  return projects.map(renderProjectCard).join('\n');
}

export function renderBlockItem(block: Block, projectSlug: string): string {
  const def = getBlockDefinition(block.type);
  const icon = def?.icon || '■';
  const name = def?.name || block.type;
  const previewHtml = renderBlockPreview(block);

  return `
<div class="block" data-block-id="${block.id}" data-type="${block.type}">
  <div class="block-header">
    <div class="block-type">
      <span class="block-icon">${icon}</span>
      <span class="block-name">${name}</span>
    </div>
    <div class="block-actions" data-block-id="${block.id}">
      <button class="block-action-btn" title="Supprimer"
              hx-delete="/api/projects/${projectSlug}/blocks/${block.id}"
              hx-target="#blocks-container"
              hx-trigger="click"
              hx-swap="innerHTML">✕</button>
      <button class="block-action-btn drag-handle" draggable="true" title="Déplacer" data-block-id="${block.id}">⠿</button>
    </div>
  </div>
  <div class="block-preview">
    ${previewHtml}
  </div>
</div>`;
}

export function renderBlockItems(blocks: Block[], projectSlug: string): string {
  if (!blocks || blocks.length === 0) {
    return '<div class="empty-canvas"><p>Ce projet est vide</p><p class="text-sm text-secondary">Ajoutez votre premier bloc ci-dessous</p></div>';
  }
  return blocks.map((b) => renderBlockItem(b, projectSlug)).join('\n');
}

export function renderBlockPalette(projectSlug: string): string {
  const categories: { name: string; blocks: { id: string; name: string; icon: string }[] }[] = [
    {
      name: 'Contenu',
      blocks: [
        { id: 'text', name: 'Texte', icon: 'T' },
        { id: 'heading', name: 'Titre', icon: 'H' },
        { id: 'quote', name: 'Citation', icon: '"' },
        { id: 'button', name: 'Bouton', icon: '▣' },
        { id: 'divider', name: 'Séparateur', icon: '—' },
      ],
    },
    {
      name: 'Média',
      blocks: [
        { id: 'image', name: 'Image', icon: '🖼' },
        { id: 'gallery', name: 'Galerie', icon: '⊞' },
        { id: 'video', name: 'Vidéo', icon: '▶' },
      ],
    },
    {
      name: 'Avancé',
      blocks: [
        { id: 'timeline', name: 'Timeline', icon: '⏱' },
        { id: 'code', name: 'Code', icon: '</>' },
        { id: 'custom-html', name: 'HTML', icon: '⚡' },
      ],
    },
  ];

  return categories
    .map(
      (cat) => `
    <div class="palette-category">
      <h4 class="palette-category-title">${cat.name}</h4>
      <div class="palette-items">
        ${cat.blocks
          .map(
            (b) => `
          <button class="palette-item"
                  hx-post="/api/projects/${projectSlug}/blocks"
                  hx-vals='{"type":"${b.id}"}'
                  hx-target="#blocks-container"
                  hx-swap="innerHTML"
                  hx-on::after-request="closePalette()">
            <span class="palette-item-icon">${b.icon}</span>
            <span class="palette-item-name">${b.name}</span>
          </button>`,
          )
          .join('')}
      </div>
    </div>`,
    )
    .join('\n');
}

export function renderBlockPreview(block: Block): string {
  const data = block.data as Record<string, unknown>;

  switch (block.type) {
    case 'heading': {
      const content = (data.content as string) || '';
      const level = (data.level as number) || 2;
      return `<h${level} style="margin:0;font-size:${level === 1 ? '1.5rem' : level === 2 ? '1.25rem' : '1rem'}">${escapeHtml(content)}</h${level}>`;
    }
    case 'text': {
      const content = (data.content as string) || '';
      return `<p style="margin:0">${escapeHtml(content).slice(0, 120)}${content.length > 120 ? '…' : ''}</p>`;
    }
    case 'image': {
      const src = (data.src as string) || '';
      if (!src) return '<div class="block-placeholder"><span>🖼</span> Image — cliquez pour définir</div>';
      return `<img src="${src}" alt="" style="max-height:120px;border-radius:4px;object-fit:cover">`;
    }
    case 'gallery': {
      const images = (data.images as any[]) || [];
      return `<div class="block-placeholder"><span>⊞</span> Galerie — ${images.length} image(s)</div>`;
    }
    case 'video': {
      return `<div class="block-placeholder"><span>▶</span> Vidéo</div>`;
    }
    case 'quote': {
      const content = (data.content as string) || '';
      return `<blockquote style="margin:0;padding:0.5rem;border-left:2px solid var(--color-accent);font-style:italic;font-size:0.9rem">${escapeHtml(content)}</blockquote>`;
    }
    case 'button': {
      const text = (data.text as string) || 'Button';
      return `<span style="display:inline-block;padding:0.4em 1em;background:var(--color-accent);color:#fff;border-radius:6px;font-size:0.85rem">${escapeHtml(text)}</span>`;
    }
    case 'divider': {
      return `<hr style="border:none;border-top:1px solid var(--border-primary);margin:0.5rem 0">`;
    }
    case 'timeline': {
      const items = (data.items as any[]) || [];
      return `<div class="block-placeholder"><span>⏱</span> Timeline — ${items.length} étape(s)</div>`;
    }
    case 'code': {
      const code = (data.code as string) || '';
      return `<pre style="font-size:0.75rem;margin:0;max-height:80px;overflow:hidden">${escapeHtml(code).slice(0, 80)}</pre>`;
    }
    case 'custom-html': {
      return `<div class="block-placeholder"><span>⚡</span> HTML personnalisé</div>`;
    }
    default:
      return `<div class="block-placeholder">Bloc: ${block.type}</div>`;
  }
}
