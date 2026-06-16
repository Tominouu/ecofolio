import type { FastifyInstance } from 'fastify';
import sharp from 'sharp';
import { extname, resolve } from 'node:path';
import { writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function registerAssetRoutes(app: FastifyInstance) {
  app.get('/api/assets', async () => {
    const images = await app.contentManager.listAssets('images');
    const files = await app.contentManager.listAssets('files');
    return { images, files };
  });

  app.post('/api/assets/upload', async (req, reply) => {
    const file = await req.file();
    if (!file) {
      return reply.status(400).send({ error: true, message: 'No file uploaded' });
    }

    const buffer = await file.toBuffer();
    const originalName = file.filename;
    const ext = extname(originalName).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.bmp', '.tiff'].includes(ext);

    let filename: string;
    let optimizedBuffer: Buffer;

    const baseName = originalName
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .slice(0, 40);

    if (isImage && ext !== '.svg' && ext !== '.gif') {
      try {
        optimizedBuffer = await sharp(buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        filename = `${baseName}.webp`;
      } catch {
        optimizedBuffer = buffer;
        filename = `${baseName}${ext}`;
      }
    } else {
      optimizedBuffer = buffer;
      filename = `${baseName}${ext}`;
    }

    const assetsDir = resolve(app.projectRoot, 'assets', 'images');
    if (!existsSync(assetsDir)) {
      const { mkdir } = await import('node:fs/promises');
      await mkdir(assetsDir, { recursive: true });
    }

    const filePath = resolve(assetsDir, filename);
    let finalName = filename;
    if (existsSync(filePath)) {
      const timestamp = Date.now();
      finalName = `${baseName}-${timestamp}.${filename.split('.').pop()}`;
    }

    await writeFile(resolve(assetsDir, finalName), optimizedBuffer);

    const assetPath = `assets/images/${finalName}`;
    const originalSize = buffer.length;
    const optimizedSize = optimizedBuffer.length;

    return {
      path: assetPath,
      filename: finalName,
      originalSize,
      optimizedSize,
      savings: originalSize - optimizedSize,
    };
  });

  app.post('/api/assets/upload-url', async (req, reply) => {
    const { url } = req.body as { url: string };
    if (!url) {
      return reply.status(400).send({ error: true, message: 'URL is required' });
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch image');

      const buffer = Buffer.from(await response.arrayBuffer());
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const originalName = pathParts[pathParts.length - 1] || 'image.jpg';

      const ext = extname(originalName).toLowerCase();
      const baseName = originalName
        .replace(ext, '')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .slice(0, 40);

      let optimizedBuffer: Buffer;
      let filename: string;

      try {
        optimizedBuffer = await sharp(buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        filename = `${baseName}.webp`;
      } catch {
        optimizedBuffer = buffer;
        filename = `${baseName}${ext}`;
      }

      const assetsDir = resolve(app.projectRoot, 'assets', 'images');
      if (!existsSync(assetsDir)) {
        const { mkdir } = await import('node:fs/promises');
        await mkdir(assetsDir, { recursive: true });
      }

      await writeFile(resolve(assetsDir, filename), optimizedBuffer);
      return { path: `assets/images/${filename}` };
    } catch (err) {
      return reply.status(400).send({ error: true, message: 'Failed to fetch image from URL' });
    }
  });

  app.get('/api/assets/browser', async (req, reply) => {
    const images = await app.contentManager.listAssets('images');
    const assetsDir = resolve(app.projectRoot, 'assets', 'images');

    const items = await Promise.all(
      images.map(async (name) => {
        const fullPath = resolve(assetsDir, name);
        let size = 0;
        try { size = (await stat(fullPath)).size; } catch {}
        const ext = extname(name).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext);
        return { name, path: `/assets/images/${name}`, size, isImage };
      })
    );

    const isHtmx = req.headers['hx-request'] === 'true';

    if (!isHtmx) return items;

    const html = items.filter(i => i.isImage).map(i => `
      <div class="media-item" onclick="selectMedia('${i.path}', this)" data-path="${i.path}" title="${escapeHtml(i.name)} (${(i.size / 1024).toFixed(1)} KB)">
        <img src="${i.path}" alt="${escapeHtml(i.name)}" loading="lazy">
        <div class="media-name">${escapeHtml(i.name)}</div>
      </div>`).join('\n');

    reply.header('Content-Type', 'text/html');
    return `
      <div class="media-browser">
        <div class="media-browser-header">
          <span class="media-browser-title">Médiathèque</span>
          <button class="media-close" onclick="closeMediaBrowser()" type="button">✕</button>
        </div>
        <div class="media-grid">
          ${html || '<div class="media-empty">Aucune image. Importez une image depuis l\'inspecteur.</div>'}
        </div>
      </div>`;
  });

  app.delete<{ Params: { path: string } }>('/api/assets/*', async (req, reply) => {
    const fullPath = (req.params as any)['*'];
    await app.contentManager.deleteAsset(fullPath);
    return reply.status(204).send();
  });
}
