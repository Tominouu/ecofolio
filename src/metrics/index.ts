import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { existsSync } from 'node:fs';

export interface PageMetrics {
  path: string;
  htmlSize: number;
  cssSize: number;
  jsSize: number;
  imageCount: number;
  totalSize: number;
  requestCount: number;
  elementCount: number;
}

export interface MetricsResult {
  totalPageWeight: number;
  co2PerVisit: number;
  ecoScore: number;
  ecoGrade: string;
  recommendations: string[];
  pages: PageMetrics[];
  pageCount: number;
}

const KWH_PER_KB = 0.000001;
const CO2_PER_KWH = 0.475;

async function collectHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

async function fileSize(filePath: string): Promise<number> {
  try {
    const s = await stat(filePath);
    return s.size;
  } catch {
    return 0;
  }
}

function resolveAssetPath(htmlPath: string, distDir: string, href: string): string {
  if (href.startsWith('/')) {
    return resolve(distDir, href.slice(1));
  }
  return resolve(dirname(htmlPath), href);
}

function extractBackgroundImages(css: string): string[] {
  const urls: string[] = [];
  const regex = /background(?:-image)?:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(css)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function allImagesAreModern(images: string[]): boolean {
  if (images.length === 0) return true;
  return images.every((src) => {
    const ext = extname(src).toLowerCase();
    return ext === '.webp' || ext === '.avif';
  });
}

function computeEcoGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 50) return 'C';
  if (score >= 25) return 'D';
  return 'F';
}

function computeEcoScore(
  avgWeightKb: number,
  avgRequests: number,
  imagesModern: boolean,
  avgElements: number,
): number {
  let score = 0;

  if (avgWeightKb < 500) score += 40;
  else if (avgWeightKb < 1024) score += 30;
  else if (avgWeightKb < 2048) score += 15;
  else score += 5;

  if (avgRequests < 20) score += 30;
  else if (avgRequests < 50) score += 20;
  else if (avgRequests < 100) score += 10;
  else score += 5;

  if (imagesModern) score += 15;

  if (avgElements < 500) score += 15;
  else if (avgElements < 1000) score += 10;
  else score += 5;

  return score;
}

function generateRecommendations(pages: PageMetrics[], avgWeightKb: number, avgRequests: number, imagesModern: boolean, avgElements: number): string[] {
  const recs: string[] = [];

  if (avgWeightKb >= 1024) {
    recs.push('Reduce total page weight below 1 MB by optimizing assets and minimizing HTML/CSS/JS');
  }
  if (avgRequests >= 50) {
    recs.push('Reduce the number of HTTP requests by combining CSS/JS files and using sprites');
  }
  if (!imagesModern) {
    recs.push('Convert images to WebP or AVIF format to reduce page weight');
  }
  if (avgElements >= 1000) {
    recs.push('Simplify DOM structure — consider reducing the number of HTML elements');
  }

  const heavyPages = pages.filter((p) => p.totalSize > 1024 * 1024);
  if (heavyPages.length > 0) {
    recs.push(`Optimize large pages: ${heavyPages.map((p) => p.path).join(', ')}`);
  }

  if (recs.length === 0) {
    recs.push('Your site is well optimized. Keep up the good practices!');
  }

  return recs;
}

export async function analyzeMetrics(distDir: string): Promise<MetricsResult> {
  if (!existsSync(distDir)) {
    return {
      totalPageWeight: 0,
      co2PerVisit: 0,
      ecoScore: 0,
      ecoGrade: 'F',
      recommendations: ['No generated site found. Run a build first.'],
      pages: [],
      pageCount: 0,
    };
  }

  const htmlFiles = await collectHtmlFiles(distDir);
  if (htmlFiles.length === 0) {
    return {
      totalPageWeight: 0,
      co2PerVisit: 0,
      ecoScore: 0,
      ecoGrade: 'F',
      recommendations: ['No HTML pages found in the dist directory.'],
      pages: [],
      pageCount: 0,
    };
  }

  const pages: PageMetrics[] = [];
  let allImages: string[] = [];

  for (const htmlPath of htmlFiles) {
    const raw = await readFile(htmlPath, 'utf-8');
    const htmlSize = Buffer.byteLength(raw, 'utf-8');

    const cssLinks: string[] = [];
    const jsLinks: string[] = [];
    const imgSrcs: string[] = [];

    const linkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi;
    let m: RegExpExecArray | null;
    while ((m = linkRegex.exec(raw)) !== null) {
      cssLinks.push(m[1]);
    }

    const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
    while ((m = scriptRegex.exec(raw)) !== null) {
      jsLinks.push(m[1]);
    }

    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
    while ((m = imgRegex.exec(raw)) !== null) {
      imgSrcs.push(m[1]);
    }

    const bgRegex = /background(?:-image)?:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
    while ((m = bgRegex.exec(raw)) !== null) {
      imgSrcs.push(m[1]);
    }

    let cssSize = 0;
    for (const link of cssLinks) {
      const cssPath = resolveAssetPath(htmlPath, distDir, link);
      cssSize += await fileSize(cssPath);

      if (existsSync(cssPath)) {
        const cssContent = await readFile(cssPath, 'utf-8');
        const bgImages = extractBackgroundImages(cssContent);
        imgSrcs.push(...bgImages);
      }
    }

    let jsSize = 0;
    for (const link of jsLinks) {
      const jsPath = resolveAssetPath(htmlPath, distDir, link);
      jsSize += await fileSize(jsPath);
    }

    const totalSize = htmlSize + cssSize + jsSize;
    const requestCount = cssLinks.length + jsLinks.length + imgSrcs.length;
    const elementCount = (raw.match(/<[a-zA-Z!\/][^>]*>/g) || []).length;

    allImages = allImages.concat(imgSrcs);

    const relPath = htmlPath.replace(distDir + sep, '');
    pages.push({
      path: relPath,
      htmlSize,
      cssSize,
      jsSize,
      imageCount: imgSrcs.length,
      totalSize,
      requestCount,
      elementCount,
    });
  }

  const pageCount = pages.length;
  const avgWeightKb = pages.reduce((s, p) => s + p.totalSize, 0) / pageCount / 1024;
  const avgRequests = pages.reduce((s, p) => s + p.requestCount, 0) / pageCount;
  const avgElements = pages.reduce((s, p) => s + p.elementCount, 0) / pageCount;
  const imagesModern = allImagesAreModern(allImages);

  const ecoScore = computeEcoScore(avgWeightKb, avgRequests, imagesModern, avgElements);
  const ecoGrade = computeEcoGrade(ecoScore);
  const co2PerVisit = avgWeightKb * KWH_PER_KB * CO2_PER_KWH * 1000;
  const recommendations = generateRecommendations(pages, avgWeightKb, avgRequests, imagesModern, avgElements);

  return {
    totalPageWeight: Math.round(avgWeightKb * 100) / 100,
    co2PerVisit: Math.round(co2PerVisit * 10000) / 10000,
    ecoScore,
    ecoGrade,
    recommendations,
    pages,
    pageCount,
  };
}
