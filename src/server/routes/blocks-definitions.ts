import type { FastifyInstance } from 'fastify';
import { renderBlockPalette } from '../htmx.js';

export function registerBlocksDefinitionsRoutes(app: FastifyInstance) {
  app.get('/api/blocks/definitions', async (req) => {
    const slug = (req.query as any)?.slug || '';
    return { html: renderBlockPalette(slug) };
  });
}
