import type { FastifyInstance } from 'fastify';
import { getBlockEditorForm } from '../block-editor.js';

export function registerBlockEditorRoutes(app: FastifyInstance) {
  app.get<{ Params: { slug: string; id: string } }>(
    '/api/projects/:slug/blocks/:id/edit',
    async (req, reply) => {
      const { slug, id } = req.params;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      const project = await app.contentManager.readProject(slug);
      const block = project.blocks.find((b) => b.id === id);
      if (!block) {
        return reply.status(404).send({ error: true, message: 'Block not found' });
      }

      reply.header('Content-Type', 'text/html');
      return getBlockEditorForm(block);
    },
  );
}
