import type { Block } from './block.js';

export type ProjectStatus = 'published' | 'draft' | 'archived';

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
}

export interface BaseContent {
  slug: string;
  title: string;
  seo?: SEOConfig;
  blocks: Block[];
}

export interface Project extends BaseContent {
  subtitle?: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: ProjectStatus;
  cover?: string;
  thumbnail?: string;
}

export interface Page extends BaseContent {
  navTitle?: string;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: ProjectStatus;
  thumbnail?: string;
  blockCount: number;
}

export function createProject(slug: string, title: string): Project {
  return {
    slug,
    title,
    date: new Date().toISOString().split('T')[0],
    tags: [],
    featured: false,
    status: 'draft',
    blocks: [],
  };
}
