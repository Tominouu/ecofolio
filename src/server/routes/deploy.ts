import type { FastifyInstance } from 'fastify';
import type { ContentManager } from '../../content/manager.js';
import { StaticGenerator } from '../../generator/index.js';
import simpleGit from 'simple-git';
import { resolve } from 'node:path';
import { DIST_DIR } from '../../core/constants.js';

declare module 'fastify' {
  interface FastifyInstance {
    contentManager: ContentManager;
    projectRoot: string;
  }
}

export function registerDeployRoutes(app: FastifyInstance) {
  app.get('/api/deploy/status', async () => {
    try {
      const git = simpleGit(app.projectRoot);
      const isRepo = await git.checkIsRepo().catch(() => false);
      if (!isRepo) return { initialized: false, deployed: false, branch: null, lastDeploy: null };

      const log = await git.log({ maxCount: 1 });
      const branches = await git.branchLocal();
      const hasGhPages = branches.all.includes('gh-pages');

      return {
        initialized: true,
        deployed: hasGhPages,
        branch: hasGhPages ? 'gh-pages' : null,
        lastCommit: log.latest ? { hash: log.latest.hash, message: log.latest.message, date: log.latest.date } : null,
      };
    } catch {
      return { initialized: false, deployed: false, branch: null, lastDeploy: null };
    }
  });

  app.post('/api/deploy', async (_req, reply) => {
    try {
      const git = simpleGit(app.projectRoot);
      const isRepo = await git.checkIsRepo().catch(() => false);

      if (!isRepo) {
        await git.init();
        await git.add('.');
        await git.commit('feat: initial portfolio');
      }

      const generator = new StaticGenerator(app.projectRoot, app.contentManager);
      await generator.generate();

      const distPath = resolve(app.projectRoot, DIST_DIR);
      const branch = 'gh-pages';

      const branches = await git.branchLocal();
      const exists = branches.all.includes(branch);

      if (exists) {
        await git.checkout(branch);
      } else {
        await git.checkout(['--orphan', branch]);
      }

      const { rm, cp, readdir, mkdir } = await import('node:fs/promises');
      const { join } = await import('node:path');

      const tmpDir = `/tmp/ecofolio-deploy-${Date.now()}`;
      await rm(tmpDir, { recursive: true, force: true });
      await mkdir(tmpDir, { recursive: true });
      await cp(distPath, tmpDir, { recursive: true });

      const keep = ['.git'];
      const entries = await readdir(app.projectRoot);
      for (const entry of entries) {
        if (!keep.includes(entry)) {
          await rm(join(app.projectRoot, entry), { recursive: true, force: true });
        }
      }

      const tmpEntries = await readdir(tmpDir);
      for (const entry of tmpEntries) {
        await cp(join(tmpDir, entry), join(app.projectRoot, entry), { recursive: true });
      }

      await rm(tmpDir, { recursive: true, force: true });

      await git.add(['.']);
      await git.commit('feat: deploy portfolio');
      await git.push('origin', branch).catch(() => {});

      await git.checkout('main').catch(() => {});

      return { success: true, branch };
    } catch (err) {
      const git = simpleGit(app.projectRoot);
      await git.checkout('main').catch(() => {});
      return reply.status(500).send({ success: false, error: err instanceof Error ? err.message : 'Deploy failed' });
    }
  });
}
