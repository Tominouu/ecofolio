import type { FastifyInstance } from 'fastify';

export function registerSettingsRoutes(app: FastifyInstance) {
  app.get('/api/settings', async () => {
    return app.contentManager.readConfig();
  });

  app.put('/api/settings', async (req) => {
    const current = await app.contentManager.readConfig();
    const updated = { ...current, ...(req.body as any), version: current.version };
    await app.contentManager.writeConfig(updated);
    return updated;
  });
}
