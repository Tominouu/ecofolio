import type { FastifyInstance } from 'fastify';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function registerEditorRoutes(app: FastifyInstance) {
  const viewsDir = resolve(__dirname, '..', '..', 'editor', 'views');

  app.get('/', async (_req, reply) => {
    reply.header('Content-Type', 'text/html');
    const html = await readFile(resolve(viewsDir, 'dashboard.html'), 'utf-8');
    return html;
  });

  app.get('/editor', async (_req, reply) => {
    reply.header('Content-Type', 'text/html');
    const html = await readFile(resolve(viewsDir, 'editor.html'), 'utf-8');
    return html;
  });

  app.get('/editor/:slug', async (req, reply) => {
    const { slug } = req.params as { slug: string };
    if (!(await app.contentManager.projectExists(slug))) {
      return reply.status(404).send('Project not found');
    }
    reply.header('Content-Type', 'text/html');
    let html = await readFile(resolve(viewsDir, 'editor.html'), 'utf-8');
    html = html.replace('data-project=""', `data-project="${slug}"`);
    return html;
  });

  app.get('/settings', async (_req, reply) => {
    reply.header('Content-Type', 'text/html');
    const html = await readFile(resolve(viewsDir, 'settings.html'), 'utf-8');
    return html;
  });
}
