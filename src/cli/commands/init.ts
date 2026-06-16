import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createDefaultConfig } from '../../core/types/config.js';
import { createProject } from '../../core/types/project.js';

export async function initCommand(directory?: string) {
  const projectRoot = directory ? resolve(process.cwd(), directory) : process.cwd();

  if (directory && !existsSync(projectRoot)) {
    await mkdir(projectRoot, { recursive: true });
  }

  console.log(`\n  ✦ Ecofolio — init\n`);
  console.log(`  Creating portfolio in ${projectRoot}`);

  const contentDir = resolve(projectRoot, 'content');
  const projectsDir = resolve(contentDir, 'projects');
  const assetsDir = resolve(projectRoot, 'assets');
  const ecofolioDir = resolve(projectRoot, '.ecofolio');

  await mkdir(contentDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });
  await mkdir(resolve(assetsDir, 'images'), { recursive: true });
  await mkdir(resolve(assetsDir, 'files'), { recursive: true });
  await mkdir(ecofolioDir, { recursive: true });

  await writeFile(
    resolve(projectRoot, 'config.json'),
    JSON.stringify(createDefaultConfig(), null, 2),
    'utf-8',
  );

  await writeFile(
    resolve(contentDir, 'index.json'),
    JSON.stringify({ slug: 'index', title: 'Accueil', blocks: [] }, null, 2),
    'utf-8',
  );

  await writeFile(
    resolve(contentDir, 'about.json'),
    JSON.stringify(
      {
        slug: 'about',
        title: 'À propos',
        navTitle: 'About',
        blocks: [
          {
            id: 'blk_welcome',
            type: 'heading',
            data: { level: 1, content: 'À propos de moi', align: 'left' },
          },
          {
            id: 'blk_intro',
            type: 'text',
            data: { content: 'Écris ici ta présentation...', format: 'markdown' },
          },
        ],
      },
      null,
      2,
    ),
    'utf-8',
  );

  const exampleProject = createProject('mon-premier-projet', 'Mon premier projet');
  exampleProject.subtitle = 'Une courte description de mon projet';
  exampleProject.tags = ['Design', '2025'];
  exampleProject.status = 'draft';
  exampleProject.blocks = [
    {
      id: 'blk_hero_1',
      type: 'heading',
      data: { level: 1, content: 'Mon premier projet', align: 'center' },
    },
    {
      id: 'blk_text_1',
      type: 'text',
      data: { content: 'Décris ton projet ici...', format: 'markdown' },
    },
  ];

  await writeFile(
    resolve(projectsDir, `${exampleProject.slug}.json`),
    JSON.stringify(exampleProject, null, 2),
    'utf-8',
  );

  await writeFile(
    resolve(projectRoot, '.gitignore'),
    `node_modules/\ndist/\n.ecofolio/cache/\n.ecofolio/state.json\n.DS_Store\n`,
    'utf-8',
  );

  console.log(`  ✅  Portfolio initialized!\n`);
  console.log(`  Next steps:`);
  console.log(`    cd ${directory || '.'}`);
  console.log(`    ecofolio dev\n`);
}
