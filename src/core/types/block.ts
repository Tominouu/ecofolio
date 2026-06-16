export const BLOCK_TYPES = [
  'text',
  'heading',
  'image',
  'gallery',
  'video',
  'quote',
  'button',
  'timeline',
  'code',
  'divider',
  'custom-html',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const BLOCK_CATEGORIES = ['content', 'media', 'advanced'] as const;
export type BlockCategory = (typeof BLOCK_CATEGORIES)[number];

export interface Block {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
}

export interface BlockDefinition {
  id: BlockType;
  name: string;
  icon: string;
  category: BlockCategory;
  defaults: Record<string, unknown>;
  schema: Record<string, unknown>;
}

export interface TextBlockData {
  content: string;
  format: 'markdown' | 'html';
}

export interface HeadingBlockData {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  align: 'left' | 'center' | 'right';
}

export interface ImageBlockData {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  format?: string;
  loading?: 'lazy' | 'eager';
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryBlockData {
  images: GalleryImage[];
  layout: 'grid' | 'masonry' | 'carousel';
  columns: number;
  lightbox: boolean;
}

export interface VideoBlockData {
  src: string;
  provider: 'youtube' | 'vimeo' | 'local';
  caption?: string;
  poster?: string;
}

export interface QuoteBlockData {
  content: string;
  author: string;
  role?: string;
  avatar?: string;
  style?: 'default' | 'large' | 'bordered';
}

export interface ButtonBlockData {
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  target?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineBlockData {
  items: TimelineItem[];
  layout: 'left' | 'alternating';
}

export interface CodeBlockData {
  code: string;
  language: string;
  showLineNumbers: boolean;
  caption?: string;
  theme?: string;
}

export interface DividerBlockData {
  style: 'solid' | 'dashed' | 'dotted';
  size: 'small' | 'medium' | 'large';
  withIcon: boolean;
}

export interface CustomHtmlBlockData {
  html: string;
  css?: string;
  js?: string;
  title?: string;
}
