import type { FastifyInstance } from 'fastify';
import { GitService } from '../../git/service.js';

export function registerGitRoutes(app: FastifyInstance) {
  const git = new GitService(app.projectRoot);

  app.post('/api/git/commit', async (req) => {
    const body = req.body as any;
    const message = body?.message || 'feat: update portfolio';
    const hash = await git.commit(message);
    return { hash, message };
  });

  app.get('/api/git/history', async () => {
    return git.log(20);
  });

  app.post<{ Params: { sha: string } }>('/api/git/rollback/:sha', async (req) => {
    const { sha } = req.params;
    await git.rollback(sha);
    return { ok: true, rollbackTo: sha };
  });

  app.get('/api/git/status', async () => {
    return git.status();
  });
}
