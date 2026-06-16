import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ContentManager } from '../content/manager.js';
import { DEFAULT_PORT } from '../core/constants.js';
import { registerProjectRoutes } from './routes/projects.js';
import { registerBlockRoutes } from './routes/blocks.js';
import { registerPreviewRoutes } from './routes/preview.js';
import { registerEditorRoutes } from './routes/editor.js';
import { registerSettingsRoutes } from './routes/settings.js';
import { registerThemeRoutes } from './routes/theme.js';
import { registerAssetRoutes } from './routes/assets.js';
import { registerGitRoutes } from './routes/git.js';
import { registerBlocksDefinitionsRoutes } from './routes/blocks-definitions.js';
import { errorHandler } from './middleware/error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ServerOptions {
  port?: number;
  contentManager: ContentManager;
  projectRoot: string;
  devMode?: boolean;
}

export async function createServer(options: ServerOptions) {
  const { contentManager, projectRoot, devMode = true } = options;

  const app = Fastify({
    logger: {
      transport: devMode
        ? { target: 'pino-pretty', options: { translateTime: 'HH:MM:ss', ignore: 'pid,hostname' } }
        : undefined,
    },
  });

  app.setErrorHandler(errorHandler);

  await app.register(fastifyCors, { origin: true });
  await app.register(fastifyWebsocket);

  await app.register(fastifyStatic, {
    root: resolve(__dirname, '..', '..', 'public'),
    prefix: '/static/',
  });

  app.decorate('contentManager', contentManager);
  app.decorate('projectRoot', projectRoot);

  registerProjectRoutes(app);
  registerBlockRoutes(app);
  registerBlocksDefinitionsRoutes(app);
  registerPreviewRoutes(app);
  registerEditorRoutes(app);
  registerSettingsRoutes(app);
  registerThemeRoutes(app);
  registerAssetRoutes(app);
  registerGitRoutes(app);

  return app;
}

export async function startServer(options: ServerOptions) {
  const app = await createServer(options);
  const port = options.port || DEFAULT_PORT;

  try {
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`Ecofolio running at http://localhost:${port}`);
    return app;
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
