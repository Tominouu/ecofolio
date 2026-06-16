import type { FastifyInstance } from 'fastify';
import type { ContentManager } from '../../content/manager.js';
import { resolve } from 'node:path';
import { analyzeMetrics } from '../../metrics/index.js';
import { DIST_DIR } from '../../core/constants.js';

declare module 'fastify' {
  interface FastifyInstance {
    contentManager: ContentManager;
    projectRoot: string;
  }
}

function gradeColor(grade: string): string {
  switch (grade) {
    case 'A':
    case 'B':
      return '#22c55e';
    case 'C':
      return '#eab308';
    default:
      return '#ef4444';
  }
}

function renderBadge(metrics: Awaited<ReturnType<typeof analyzeMetrics>>): string {
  const color = gradeColor(metrics.ecoGrade);
  const weight = metrics.totalPageWeight < 1024
    ? `${metrics.totalPageWeight} KB`
    : `${(metrics.totalPageWeight / 1024).toFixed(2)} MB`;

  return `<div class="metrics-badge" id="metrics-badge"
    hx-get="/api/metrics/badge"
    hx-trigger="every 30s"
    hx-swap="outerHTML">
    <span class="metrics-grade" style="background:${color}">${metrics.ecoGrade}</span>
    <span class="metrics-stat">${weight}</span>
    <span class="metrics-stat">${metrics.co2PerVisit.toFixed(4)} g CO₂</span>
    <span class="metrics-score">${metrics.ecoScore}/100</span>
  </div>`;
}

export function registerMetricsRoutes(app: FastifyInstance) {
  app.get('/api/metrics', async (_req, _reply) => {
    const distDir = resolve(app.projectRoot, DIST_DIR);
    const metrics = await analyzeMetrics(distDir);
    return metrics;
  });

  app.get('/api/metrics/badge', async (_req, reply) => {
    const distDir = resolve(app.projectRoot, DIST_DIR);
    const metrics = await analyzeMetrics(distDir);
    reply.header('Content-Type', 'text/html');
    return renderBadge(metrics);
  });
}
