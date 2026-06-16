import type { FastifyInstance } from 'fastify';
import type { ContentManager } from '../../content/manager.js';
import { createProject } from '../../core/types/project.js';
import { slugify } from '../../core/utils/slug.js';
import { isHtmx, renderProjectCards } from '../htmx.js';

declare module 'fastify' {
  interface FastifyInstance {
    contentManager: ContentManager;
    projectRoot: string;
  }
}

export function registerProjectRoutes(app: FastifyInstance) {
  app.get('/api/projects', async (req, reply) => {
    const slugs = await app.contentManager.listProjects();
    const projects = await Promise.all(
      slugs.map((slug) => app.contentManager.readProject(slug)),
    );

    if (isHtmx(req)) {
      reply.header('Content-Type', 'text/html');
      return renderProjectCards(projects);
    }

    return projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      date: p.date,
      tags: p.tags,
      featured: p.featured,
      status: p.status,
      thumbnail: p.thumbnail,
      blockCount: p.blocks.length,
    }));
  });

  app.post<{ Body: { title: string } }>('/api/projects', async (req, reply) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return reply.status(400).send({ error: true, message: 'Title is required' });
    }
    const slug = slugify(title);
    if (await app.contentManager.projectExists(slug)) {
      return reply.status(409).send({ error: true, message: 'A project with this title already exists' });
    }
    const project = createProject(slug, title);
    await app.contentManager.writeProject(project);

    if (isHtmx(req)) {
      reply.header('HX-Redirect', `/editor/${slug}`);
      return '';
    }

    return reply.status(201).send(project);
  });

  app.get<{ Params: { slug: string } }>('/api/projects/:slug', async (req, reply) => {
    const { slug } = req.params;
    if (!(await app.contentManager.projectExists(slug))) {
      return reply.status(404).send({ error: true, message: 'Project not found' });
    }
    return app.contentManager.readProject(slug);
  });

  app.put<{ Params: { slug: string }; Body: Record<string, unknown> }>(
    '/api/projects/:slug',
    async (req, reply) => {
      const { slug } = req.params;
      if (!(await app.contentManager.projectExists(slug))) {
        return reply.status(404).send({ error: true, message: 'Project not found' });
      }
      const existing = await app.contentManager.readProject(slug);
      const updated = { ...existing, ...req.body, slug: existing.slug };
      await app.contentManager.writeProject(updated);
      return updated;
    },
  );

  app.delete<{ Params: { slug: string } }>('/api/projects/:slug', async (req, reply) => {
    const { slug } = req.params;
    if (!(await app.contentManager.projectExists(slug))) {
      return reply.status(404).send({ error: true, message: 'Project not found' });
    }
    await app.contentManager.deleteProject(slug);

    if (isHtmx(req)) {
      reply.header('HX-Redirect', '/');
      return '';
    }

    return reply.status(204).send();
  });
}
