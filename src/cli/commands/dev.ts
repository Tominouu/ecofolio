import { resolve } from 'node:path';
import { ContentManager } from '../../content/manager.js';
import { startServer } from '../../server/index.js';
import { GitService } from '../../git/service.js';
import { createDefaultConfig } from '../../core/types/config.js';

export async function devCommand(options: { port: string }) {
  const projectRoot = process.cwd();
  const port = parseInt(options.port, 10);

  console.log(`\n  ✦ Ecofolio — dev server\n`);
  console.log(`  Portfolio : ${projectRoot}`);

  const contentManager = new ContentManager(projectRoot);
  await contentManager.init();

  const configPath = resolve(projectRoot, 'config.json');
  const { existsSync } = await import('node:fs');
  if (!existsSync(configPath)) {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(configPath, JSON.stringify(createDefaultConfig(), null, 2), 'utf-8');
    console.log(`  Config     : created default config`);
  }

  const git = new GitService(projectRoot);
  const isRepo = await git.isRepo();
  if (!isRepo) {
    await git.init();
    console.log(`  Git        : initialized repository`);
  }

  const app = await startServer({
    port,
    contentManager,
    projectRoot,
    devMode: true,
  });

  const address = app.server.address();
  const host = typeof address === 'object' ? `http://localhost:${address?.port}` : 'http://localhost:3000';
  console.log(`\n  🚀  Open ${host}\n`);
}
