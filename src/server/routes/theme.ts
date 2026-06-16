import type { FastifyInstance } from 'fastify';
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { THEMES_DIR } from '../../core/constants.js';

export function registerThemeRoutes(app: FastifyInstance) {
  app.get('/api/themes', async () => {
    if (!existsSync(THEMES_DIR)) return [];
    const entries = await readdir(THEMES_DIR, { withFileTypes: true });
    const themes = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    return themes;
  });

  app.get('/api/theme', async () => {
    const config = await app.contentManager.readConfig();
    return config.theme;
  });

  app.put('/api/theme', async (req) => {
    const config = await app.contentManager.readConfig();
    const body = req.body as any;
    config.theme = { ...config.theme, ...body };
    await app.contentManager.writeConfig(config);
    return config.theme;
  });
}
