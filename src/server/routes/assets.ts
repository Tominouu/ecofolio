import type { FastifyInstance } from 'fastify';

export function registerAssetRoutes(app: FastifyInstance) {
  app.get('/api/assets', async () => {
    const images = await app.contentManager.listAssets('images');
    const files = await app.contentManager.listAssets('files');
    return { images, files };
  });

  app.post('/api/assets', async (req, reply) => {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart')) {
      return reply.status(400).send({ error: true, message: 'Multipart content type required' });
    }
    return reply.status(501).send({ error: true, message: 'File upload not yet implemented' });
  });

  app.delete<{ Params: { path: string } }>('/api/assets/*', async (req, reply) => {
    const fullPath = (req.params as any)['*'];
    await app.contentManager.deleteAsset(fullPath);
    return reply.status(204).send();
  });
}
