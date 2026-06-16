import type { FastifyInstance } from 'fastify';
import type { Block } from '../../core/types/block.js';
import { generateId } from '../../core/utils/id.js';
import { isHtmx, renderBlockItems } from '../htmx.js';

export function registerBlockRoutes(app: FastifyInstance) {
  app.get<{ Params: { slug: string } }>('/api/projects/:slug/blocks', async (req, reply) => {
    const { slug } = req.params;
    if (!(await app.contentManager.projectExists(slug))) {
      return reply.status(404).send({ error: true, message: 'Project not found' });
    }
    const project = await app.contentManager.readProject(slug);

    if (isHtmx(req)) {
      reply.header('Content-Type', 'text/html');
      return renderBlockItems(project.blocks, slug);
    }

    return project.blocks;
  });

  app.post<{ Params: { slug: string }; Body: { type: string; data?: Record<string, unknown> } }>(
    '/api/projects/:slug/blocks',
    async (req, reply) => {
      const { slug } = req.params;
      const { type, data = {} } = req.body;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      const block: Block = { id: generateId(), type: type as any, data };
      await app.contentManager.addBlock(slug, block);

      const project = await app.contentManager.readProject(slug);
      reply.header('Content-Type', 'text/html');
      return renderBlockItems(project.blocks, slug);
    },
  );

  app.put<{ Params: { slug: string; id: string }; Body: Record<string, unknown> }>(
    '/api/projects/:slug/blocks/:id',
    async (req, reply) => {
      const { slug, id } = req.params;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      await app.contentManager.updateBlock(slug, id, req.body);
      const project = await app.contentManager.readProject(slug);
      reply.header('Content-Type', 'text/html');
      return renderBlockItems(project.blocks, slug);
    },
  );

  app.delete<{ Params: { slug: string; id: string } }>(
    '/api/projects/:slug/blocks/:id',
    async (req, reply) => {
      const { slug, id } = req.params;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      await app.contentManager.deleteBlock(slug, id);
      const project = await app.contentManager.readProject(slug);
      reply.header('Content-Type', 'text/html');
      return renderBlockItems(project.blocks, slug);
    },
  );

  app.put<{ Params: { slug: string }; Body: { blockIds: string[] } }>(
    '/api/projects/:slug/blocks/reorder',
    async (req, reply) => {
      const { slug } = req.params;
      const { blockIds } = req.body;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      const project = await app.contentManager.reorderBlocks(slug, blockIds);
      reply.header('Content-Type', 'text/html');
      const { renderBlockItems } = await import('../htmx.js');
      return renderBlockItems(project.blocks, slug);
    },
  );
}
