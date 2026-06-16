import type { FastifyInstance } from 'fastify';
import { getBlocksByCategory } from '../../blocks/registry.js';

export function registerBlocksDefinitionsRoutes(app: FastifyInstance) {
  app.get('/api/blocks/definitions', async () => {
    const grouped = getBlocksByCategory();
    const result: { category: string; blocks: { id: string; name: string; icon: string; category: string }[] }[] = [];

    for (const [category, blocks] of Object.entries(grouped)) {
      result.push({
        category,
        blocks: blocks.map((b) => ({
          id: b.id,
          name: b.name,
          icon: b.icon,
          category: b.category,
        })),
      });
    }

    return result;
  });
}
