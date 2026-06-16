import { ContentManager } from '../../content/manager.js';
import { StaticGenerator } from '../../generator/index.js';

export async function buildCommand() {
  const projectRoot = process.cwd();
  console.log(`\n  ✦ Ecofolio — build\n`);

  const contentManager = new ContentManager(projectRoot);
  const generator = new StaticGenerator(projectRoot, contentManager);

  console.log(`  Generating static site...`);
  await generator.generate();
  console.log(`  ✅  Site generated in dist/\n`);
}
