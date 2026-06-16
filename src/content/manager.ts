import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Config, Project, Page, Block } from '../core/types/index.js';
import { createDefaultConfig } from '../core/types/config.js';
import { CONTENT_DIR, ASSETS_DIR, FILE_ENCODING, PORTRAIT_DIR } from '../core/constants.js';

export class ContentManager {
  private root: string;

  constructor(root: string) {
    this.root = root;
  }

  private contentDir(): string {
    return resolve(this.root, CONTENT_DIR);
  }

  private projectsDir(): string {
    return resolve(this.contentDir(), PORTRAIT_DIR);
  }

  private assetsDir(): string {
    return resolve(this.root, ASSETS_DIR);
  }

  private async ensureDir(dir: string): Promise<void> {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }

  async init(): Promise<void> {
    await this.ensureDir(this.contentDir());
    await this.ensureDir(this.projectsDir());
    await this.ensureDir(this.assetsDir());
    await this.ensureDir(resolve(this.assetsDir(), 'images'));
    await this.ensureDir(resolve(this.assetsDir(), 'files'));

    if (!existsSync(resolve(this.root, 'config.json'))) {
      await this.writeConfig(createDefaultConfig());
    }

    if (!existsSync(resolve(this.contentDir(), 'index.json'))) {
      await this.writePage('index', {
        slug: 'index',
        title: 'Accueil',
        blocks: [],
      });
    }
  }

  // ─── Config ──────────────────────────────────────────

  async readConfig(): Promise<Config> {
    const filePath = resolve(this.root, 'config.json');
    const raw = await readFile(filePath, FILE_ENCODING);
    return JSON.parse(raw) as Config;
  }

  async writeConfig(config: Config): Promise<void> {
    const filePath = resolve(this.root, 'config.json');
    await writeFile(filePath, JSON.stringify(config, null, 2), FILE_ENCODING);
  }

  // ─── Projects ────────────────────────────────────────

  async listProjects(): Promise<string[]> {
    const dir = this.projectsDir();
    if (!existsSync(dir)) return [];
    const files = await readdir(dir);
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
  }

  async readProject(slug: string): Promise<Project> {
    const filePath = resolve(this.projectsDir(), `${slug}.json`);
    const raw = await readFile(filePath, FILE_ENCODING);
    return JSON.parse(raw) as Project;
  }

  async writeProject(project: Project): Promise<void> {
    await this.ensureDir(this.projectsDir());
    const filePath = resolve(this.projectsDir(), `${project.slug}.json`);
    await writeFile(filePath, JSON.stringify(project, null, 2), FILE_ENCODING);
  }

  async deleteProject(slug: string): Promise<void> {
    const filePath = resolve(this.projectsDir(), `${slug}.json`);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  async projectExists(slug: string): Promise<boolean> {
    const filePath = resolve(this.projectsDir(), `${slug}.json`);
    return existsSync(filePath);
  }

  // ─── Blocks ──────────────────────────────────────────

  async addBlock(projectSlug: string, block: Block): Promise<Project> {
    const project = await this.readProject(projectSlug);
    project.blocks.push(block);
    await this.writeProject(project);
    return project;
  }

  async updateBlock(projectSlug: string, blockId: string, data: Record<string, unknown>): Promise<Project> {
    const project = await this.readProject(projectSlug);
    const index = project.blocks.findIndex((b) => b.id === blockId);
    if (index === -1) throw new Error(`Block ${blockId} not found in project ${projectSlug}`);
    project.blocks[index] = { ...project.blocks[index], data };
    await this.writeProject(project);
    return project;
  }

  async deleteBlock(projectSlug: string, blockId: string): Promise<Project> {
    const project = await this.readProject(projectSlug);
    project.blocks = project.blocks.filter((b) => b.id !== blockId);
    await this.writeProject(project);
    return project;
  }

  async reorderBlocks(projectSlug: string, blockIds: string[]): Promise<Project> {
    const project = await this.readProject(projectSlug);
    const blockMap = new Map(project.blocks.map((b) => [b.id, b]));
    project.blocks = blockIds.map((id) => {
      const block = blockMap.get(id);
      if (!block) throw new Error(`Block ${id} not found`);
      return block;
    });
    await this.writeProject(project);
    return project;
  }

  // ─── Pages ───────────────────────────────────────────

  async readPage(slug: string): Promise<Page> {
    const filePath = resolve(this.contentDir(), `${slug}.json`);
    const raw = await readFile(filePath, FILE_ENCODING);
    return JSON.parse(raw) as Page;
  }

  async writePage(slug: string, page: Page): Promise<void> {
    const filePath = resolve(this.contentDir(), `${slug}.json`);
    await writeFile(filePath, JSON.stringify(page, null, 2), FILE_ENCODING);
  }

  // ─── Assets ──────────────────────────────────────────

  async saveAsset(filename: string, buffer: Buffer): Promise<string> {
    const ext = filename.split('.').pop()?.toLowerCase() || 'bin';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(ext);
    const subDir = isImage ? 'images' : 'files';
    const targetDir = resolve(this.assetsDir(), subDir);
    await this.ensureDir(targetDir);

    const dest = resolve(targetDir, filename);
    await writeFile(dest, buffer);
    return `assets/${subDir}/${filename}`;
  }

  async deleteAsset(path: string): Promise<void> {
    const fullPath = resolve(this.root, path);
    if (existsSync(fullPath)) {
      await unlink(fullPath);
    }
  }

  async listAssets(subDir?: 'images' | 'files'): Promise<string[]> {
    const dir = subDir ? resolve(this.assetsDir(), subDir) : this.assetsDir();
    if (!existsSync(dir)) return [];
    const entries = await readdir(dir, { recursive: true });
    return entries.filter((e) => !existsSync(resolve(String(dir), String(e))) || true)
      .map(String);
  }
}
