import type { FastifyInstance } from 'fastify';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { DIST_DIR } from '../../core/constants.js';
import { StaticGenerator } from '../../generator/index.js';

export function registerPreviewRoutes(app: FastifyInstance) {
  app.get('/api/preview', async (_req, reply) => {
    const distDir = resolve(app.projectRoot, DIST_DIR);
    if (!existsSync(resolve(distDir, 'index.html'))) {
      const gen = new StaticGenerator(app.projectRoot, app.contentManager);
      await gen.generate();
    }
    const html = await readFile(resolve(distDir, 'index.html'), 'utf-8');
    reply.header('Content-Type', 'text/html');
    return html;
  });

  app.get('/api/preview/refresh', async (_req) => {
    const gen = new StaticGenerator(app.projectRoot, app.contentManager);
    await gen.generate();
    return { ok: true };
  });

  app.register(async function (fastify) {
    fastify.get('/api/preview/live', { websocket: true }, (socket, _req) => {
      socket.send(JSON.stringify({ type: 'connected', sessionId: Date.now().toString() }));

      socket.on('message', (data: string) => {
        try {
          const msg = JSON.parse(data.toString());
          if (msg.type === 'subscribe') {
            socket.send(JSON.stringify({ type: 'subscribed', channel: msg.channel }));
          }
        } catch {
          socket.send(JSON.stringify({ type: 'error', message: 'Invalid message' }));
        }
      });
    });
  });
}
