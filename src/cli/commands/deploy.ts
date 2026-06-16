import { ContentManager } from '../../content/manager.js';
import { StaticGenerator } from '../../generator/index.js';
import simpleGit from 'simple-git';
import { cp, mkdir, rm, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { existsSync } from 'node:fs';
import { DIST_DIR } from '../../core/constants.js';

interface DeployOptions {
  message?: string;
  branch?: string;
}

export async function deployCommand(options: DeployOptions) {
  const projectRoot = process.cwd();
  console.log(`\n  ✦ Ecofolio — deploy\n`);

  const contentManager = new ContentManager(projectRoot);
  const generator = new StaticGenerator(projectRoot, contentManager);

  console.log(`  Building static site...`);
  await generator.generate();

  const git = simpleGit(projectRoot);
  const isRepo = await git.checkIsRepo().catch(() => false);

  if (!isRepo) {
    console.log(`  Initializing git repository...`);
    await git.init();
    await git.add('.');
    await git.commit('feat: initial portfolio');
  }

  const distPath = resolve(projectRoot, DIST_DIR);
  if (!existsSync(distPath)) {
    console.log(`  ❌  No dist/ directory found.`);
    process.exit(1);
  }

  const branch = options.branch || 'gh-pages';
  const message = options.message || 'feat: deploy portfolio';

  try {
    const tmpDir = `/tmp/ecofolio-deploy-${Date.now()}`;
    await rm(tmpDir, { recursive: true, force: true });
    await mkdir(tmpDir, { recursive: true });

    await cp(distPath, tmpDir, { recursive: true });

    const branches = await git.branchLocal();
    const exists = branches.all.includes(branch);

    if (exists) {
      await git.checkout(branch);
    } else {
      await git.checkout(['--orphan', branch]);
    }

    const keep = ['.git'];
    const entries = await readdir(projectRoot);
    for (const entry of entries) {
      if (!keep.includes(entry)) {
        await rm(join(projectRoot, entry), { recursive: true, force: true });
      }
    }

    const tmpEntries = await readdir(tmpDir);
    for (const entry of tmpEntries) {
      await cp(join(tmpDir, entry), join(projectRoot, entry), { recursive: true });
    }

    await git.add(['.']);
    const status = await git.status();
    if (status.files.length > 0) {
      await git.commit(message);
      await git.push('origin', branch).catch(() => {
        console.log(`  ⚠️  Push failed. Set a remote with: git remote add origin <url>`);
      });
      console.log(`  ✅  Deployed to ${branch}\n`);
    } else {
      console.log(`  ℹ️  No changes since last deploy.\n`);
    }

    await git.checkout('main').catch(() => {});
    await rm(tmpDir, { recursive: true, force: true });

    console.log(`  Configure GitHub Pages in your repo settings:`);
    console.log(`  Settings → Pages → Source → Deploy from a branch → ${branch}\n`);
  } catch (err) {
    await git.checkout('main').catch(() => {});
    console.log(`  ❌  Deploy failed:`, err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
