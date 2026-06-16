import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PROJECT_ROOT = resolve(__dirname, '..', '..');
export const SRC_ROOT = resolve(__dirname, '..');
export const THEMES_DIR = resolve(PROJECT_ROOT, 'themes');

export const ECOFOLIO_DIR = '.ecofolio';
export const CONTENT_DIR = 'content';
export const ASSETS_DIR = 'assets';
export const DIST_DIR = 'dist';
export const THEMES_LINK = 'themes';

export const PORTRAIT_DIR = 'projects';

export const DEFAULT_PORT = 3000;
export const PREVIEW_PORT = 3001;

export const AUTO_SAVE_DELAY = 5000;
export const PREVIEW_REBUILD_DELAY = 300;
export const GIT_AUTO_COMMIT_DELAY = 30000;

export const FILE_ENCODING = 'utf-8' as const;
