export type EcoRating = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Suggestion {
  type: 'improvement' | 'warning' | 'error';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SiteMetrics {
  totalSizeBytes: number;
  pageCount: number;
  htmlSizeBytes: number;
  cssSizeBytes: number;
  jsSizeBytes: number;
  imageSizeBytes: number;
  imageCount: number;
  requestCount: number;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticesScore: number;
  carbonPerVisitGrams: number;
  carbonYearlyGrams: number;
  ecoRating: EcoRating;
  suggestions: Suggestion[];
}

export interface GitCommit {
  hash: string;
  message: string;
  date: string;
  author: string;
  files: string[];
}

export interface GitStatus {
  staged: string[];
  unstaged: string[];
  untracked: string[];
  ahead: number;
  behind: number;
}
