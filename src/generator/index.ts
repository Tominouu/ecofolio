import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ContentManager } from '../content/manager.js';
import type { Config, Project, Page } from '../core/types/index.js';
import { DIST_DIR, ASSETS_DIR } from '../core/constants.js';
import { renderBlock } from '../blocks/registry.js';

export class StaticGenerator {
  private root: string;
  private content: ContentManager;

  constructor(root: string, content: ContentManager) {
    this.root = root;
    this.content = content;
  }

  private distDir(...parts: string[]): string {
    return resolve(this.root, DIST_DIR, ...parts);
  }

  private async ensureDir(dir: string): Promise<void> {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async generate(): Promise<void> {
    const dist = this.distDir();
    await this.ensureDir(dist);
    await this.ensureDir(this.distDir('projects'));
    await this.ensureDir(this.distDir('assets', 'css'));
    await this.ensureDir(this.distDir('assets', 'images'));

    const config = await this.content.readConfig();
    const projects = await this.loadAllProjects();

    await this.generateIndex(config, projects);
    await this.generateProjectPages(config, projects);
    await this.generateAbout(config);
    await this.generateStaticAssets(config, projects);
    await this.generateSitemap(config, projects);

    await this.copyAssets();
  }

  private async loadAllProjects(): Promise<Project[]> {
    const slugs = await this.content.listProjects();
    const projects: Project[] = [];
    for (const slug of slugs) {
      try {
        const project = await this.content.readProject(slug);
        projects.push(project);
      } catch {
        // Skip invalid projects
      }
    }
    return projects.sort((a, b) => b.date.localeCompare(a.date));
  }

  private async generateIndex(config: Config, projects: Project[]): Promise<void> {
    const page = await this.readPageSafe('index');
    const html = this.wrapPage(config, 'Accueil', `
      <main class="main">
        ${this.renderBlocks(page?.blocks || [])}
        <section class="projects-grid">
          <h2>Projets</h2>
          <div class="grid">
            ${projects
              .filter((p) => p.status === 'published')
              .map(
                (p) => `
              <article class="project-card">
                <a href="projects/${p.slug}/">
                  ${p.thumbnail ? `<img src="../${p.thumbnail}" alt="${this.escapeHtml(p.title)}" loading="lazy">` : ''}
                  <h3>${this.escapeHtml(p.title)}</h3>
                  ${p.subtitle ? `<p>${this.escapeHtml(p.subtitle)}</p>` : ''}
                  <div class="project-meta">${p.tags.join(' · ')}</div>
                </a>
              </article>
            `,
              )
              .join('\n')}
          </div>
        </section>
      </main>
    `);
    await writeFile(this.distDir('index.html'), html, 'utf-8');
  }

  private async generateProjectPages(config: Config, projects: Project[]): Promise<void> {
    for (const project of projects) {
      if (project.status !== 'published') continue;

      const blocks = this.renderBlocks(project.blocks);
      const html = this.wrapPage(config, project.title, `
        <main class="main project-page">
          <a href="../" class="back-link">← Retour</a>
          <article>
            <header class="project-header">
              <h1>${this.escapeHtml(project.title)}</h1>
              ${project.subtitle ? `<p class="project-subtitle">${this.escapeHtml(project.subtitle)}</p>` : ''}
              <div class="project-meta">
                <time datetime="${project.date}">${project.date}</time>
                ${project.tags.map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`).join(' ')}
              </div>
            </header>
            ${blocks}
          </article>
        </main>
      `);

      const projectDir = this.distDir('projects', project.slug);
      await this.ensureDir(projectDir);
      await writeFile(resolve(projectDir, 'index.html'), html, 'utf-8');
    }
  }

  private async generateAbout(config: Config): Promise<void> {
    if (!config.pages.about) return;
    const page = await this.readPageSafe('about');
    if (!page) return;

    const html = this.wrapPage(config, page.title, `
      <main class="main">
        <h1>${this.escapeHtml(page.title)}</h1>
        ${this.renderBlocks(page.blocks)}
      </main>
    `);
    const dir = this.distDir('about');
    await this.ensureDir(dir);
    await writeFile(resolve(dir, 'index.html'), html, 'utf-8');
  }

  private async generateStaticAssets(config: Config, _projects: Project[]): Promise<void> {
    const primaryColor = config.theme.tokens.colorPrimary || '#6366f1';
    const maxWidth = config.theme.tokens.maxWidth || '72rem';

    const css = `
:root {
  --color-primary: ${primaryColor};
  --color-primary-light: ${primaryColor}22;
  --max-width: ${maxWidth};
  --text-primary: #0a0a0a;
  --text-secondary: #525252;
  --bg: #ffffff;
  --bg-secondary: #f5f5f5;
  --border: #e5e5e5;
  --radius: 0.5rem;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font);
  color: var(--text-primary);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

img { max-width: 100%; height: auto; border-radius: var(--radius); }
a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3 { line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
h1 { font-size: 2.5rem; margin-bottom: 1rem; }
h2 { font-size: 1.75rem; margin-top: 2.5rem; margin-bottom: 0.75rem; }

.project-header { margin-bottom: 2rem; }
.project-header h1 { margin-bottom: 0.5rem; }
.project-subtitle { font-size: 1.125rem; color: var(--text-secondary); }
.project-meta { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-top: 0.75rem; color: var(--text-secondary); font-size: 0.875rem; }

.tag { display: inline-block; padding: 0.2em 0.6em; background: var(--bg-secondary); border-radius: 999px; font-size: 0.8rem; }

.back-link { display: inline-block; margin-bottom: 2rem; color: var(--text-secondary); font-size: 0.9rem; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }

.project-card { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: box-shadow 0.2s; }
.project-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.project-card a { color: inherit; display: block; padding: 1.25rem; }
.project-card h3 { margin-top: 0.75rem; font-size: 1.125rem; }
.project-card p { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem; }
.project-card .project-meta { margin-top: 0.75rem; }

.block-text { max-width: 65ch; }
.block-text p { margin-bottom: 1rem; }
.block-heading { margin-top: 1.5rem; margin-bottom: 0.75rem; }
.block-image { display: block; margin: 1.5rem 0; }
.block-image figure { margin: 1.5rem 0; }
.block-image figcaption { text-align: center; font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem; }
.block-quote { border-left: 3px solid var(--color-primary); padding: 1rem 1.5rem; margin: 1.5rem 0; background: var(--bg-secondary); border-radius: 0 var(--radius) var(--radius) 0; }
.block-quote footer { margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); }
.block-divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
.block-button { display: inline-block; padding: 0.6em 1.4em; border-radius: var(--radius); font-weight: 500; font-size: 0.9rem; transition: all 0.2s; margin: 0.5rem 0; }
.block-button--primary { background: var(--color-primary); color: #fff; }
.block-button--primary:hover { opacity: 0.9; }
.block-button--outline { border: 1px solid var(--color-primary); color: var(--color-primary); }
.block-button--outline:hover { background: var(--color-primary-light); }

@media (max-width: 640px) {
  h1 { font-size: 1.75rem; }
  .main { padding: 1.5rem 1rem; }
  .grid { grid-template-columns: 1fr; }
}
    `.trim();

    await writeFile(this.distDir('assets', 'css', 'style.css'), css, 'utf-8');

    const notFound = this.wrapPage(config, '404', `
      <main class="main" style="text-align:center;padding:4rem 1.5rem;">
        <h1>404</h1>
        <p style="color:var(--text-secondary);margin-top:0.5rem;">Page non trouvée</p>
        <a href="/" style="display:inline-block;margin-top:1.5rem;">← Retour à l'accueil</a>
      </main>
    `);
    await writeFile(this.distDir('404.html'), notFound, 'utf-8');
  }

  private async generateSitemap(config: Config, projects: Project[]): Promise<void> {
    const baseUrl = config.site.url || '';
    const urls = ['/', '/about/'];
    for (const p of projects.filter((p) => p.status === 'published')) {
      urls.push(`/projects/${p.slug}/`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${baseUrl}${u}</loc></url>`).join('\n')}
</urlset>`;
    await writeFile(this.distDir('sitemap.xml'), xml, 'utf-8');
  }

  private async copyAssets(): Promise<void> {
    const assetDir = resolve(this.root, ASSETS_DIR, 'images');
    if (!existsSync(assetDir)) return;

    const { readdir } = await import('node:fs/promises');
    const { copyFile } = await import('node:fs/promises');

    const files = await readdir(assetDir);
    for (const file of files) {
      try {
        await copyFile(
          resolve(assetDir, file),
          this.distDir('assets', 'images', file),
        );
      } catch {
        // Skip invalid files
      }
    }
  }

  private renderBlocks(blocks: { id: string; type: any; data: Record<string, unknown> }[]): string {
    return blocks
      .map((block) => {
        const html = renderBlock(block.type, block.data);
        return `<div class="block" data-block-id="${block.id}">${html}</div>`;
      })
      .join('\n');
  }

  private wrapPage(config: Config, title: string, content: string): string {
    const siteTitle = config.site.title || 'Portfolio';
    const fullTitle = title === 'Accueil' ? siteTitle : `${title} — ${siteTitle}`;

    return `<!DOCTYPE html>
<html lang="${config.site.language || 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(fullTitle)}</title>
  <meta name="description" content="${this.escapeHtml(config.site.tagline || '')}">
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✦</text></svg>">
</head>
<body>
${content}
</body>
</html>`;
  }

  private async readPageSafe(slug: string): Promise<Page | null> {
    try {
      return await this.content.readPage(slug);
    } catch {
      return null;
    }
  }
}
