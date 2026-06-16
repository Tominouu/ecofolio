import type { Block } from '../core/types/block.js';
import { escapeHtml } from './htmx.js';

export function getBlockEditorForm(block: Block): string {
  const data = block.data as Record<string, unknown>;

  switch (block.type) {
    case 'heading':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Niveau</label>
            <select name="level" hx-trigger="change" data-block-id="${block.id}">
              ${[1, 2, 3, 4, 5, 6].map((l) => `<option value="${l}" ${(data.level as number) === l ? 'selected' : ''}>H${l}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Contenu</label>
            <input name="content" value="${escapeHtml((data.content as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Alignement</label>
            <select name="align" data-block-id="${block.id}">
              <option value="left" ${(data.align as string) === 'left' ? 'selected' : ''}>Gauche</option>
              <option value="center" ${(data.align as string) === 'center' ? 'selected' : ''}>Centre</option>
              <option value="right" ${(data.align as string) === 'right' ? 'selected' : ''}>Droite</option>
            </select>
          </div>
        </div>`;

    case 'text':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Contenu (Markdown)</label>
            <textarea name="content" rows="5" data-block-id="${block.id}">${escapeHtml((data.content as string) || '')}</textarea>
          </div>
        </div>`;

    case 'image':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Image</label>
            <div class="media-preview" id="media-preview-${block.id}">
              ${(data.src as string) ? `<img src="/${data.src}" alt="">` : ''}
            </div>
            <div class="upload-zone" id="upload-zone-${block.id}" data-block-id="${block.id}">
              <div class="upload-zone-content">
                <span class="upload-icon">🖼</span>
                <span class="upload-text">Glissez une image ou cliquez</span>
                <span class="upload-hint">PNG, JPG, GIF jusqu'à 10 Mo</span>
              </div>
              <input type="file" accept="image/*" class="upload-input" data-block-id="${block.id}" onchange="uploadFile(this, '${block.id}')">
            </div>
            <button class="btn btn-sm media-browser-btn" onclick="openMediaBrowser('${block.id}')" type="button">📂 Médiathèque</button>
          </div>
          <div class="form-group">
            <label>Ou URL distante</label>
            <div class="input-row">
              <input name="src" id="src-${block.id}" value="${escapeHtml((data.src as string) || '')}" placeholder="assets/images/photo.jpg" data-block-id="${block.id}">
              <button class="btn btn-sm" onclick="fetchUrl(${block.id})" type="button">↻</button>
            </div>
          </div>
          <div class="form-group">
            <label>Texte alternatif</label>
            <input name="alt" value="${escapeHtml((data.alt as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Légende</label>
            <input name="caption" value="${escapeHtml((data.caption as string) || '')}" data-block-id="${block.id}">
          </div>
        </div>`;

    case 'gallery':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Disposition</label>
            <select name="layout" data-block-id="${block.id}">
              <option value="grid" ${(data.layout as string) === 'grid' ? 'selected' : ''}>Grille</option>
              <option value="masonry" ${(data.layout as string) === 'masonry' ? 'selected' : ''}>Masonry</option>
              <option value="carousel" ${(data.layout as string) === 'carousel' ? 'selected' : ''}>Carousel</option>
            </select>
          </div>
          <div class="form-group">
            <label>Colonnes</label>
            <input name="columns" type="number" min="1" max="4" value="${(data.columns as number) || 3}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Ajouter des images</label>
            <div class="upload-zone" id="upload-zone-${block.id}" data-block-id="${block.id}" data-gallery="true">
              <div class="upload-zone-content">
                <span class="upload-icon">🖼</span>
                <span class="upload-text">Glissez des images ou cliquez</span>
                <span class="upload-hint">PNG, JPG, GIF jusqu'à 10 Mo</span>
              </div>
              <input type="file" accept="image/*" multiple class="upload-input" data-block-id="${block.id}" data-gallery="true" onchange="uploadGalleryFiles(this, '${block.id}')">
            </div>
          </div>
          <div class="form-group">
            <label>Images (JSON)</label>
            <textarea name="images" rows="4" data-block-id="${block.id}">${escapeHtml(JSON.stringify((data.images as any[]) || []))}</textarea>
          </div>
        </div>`;

    case 'video':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>URL de la vidéo</label>
            <input name="src" value="${escapeHtml((data.src as string) || '')}" placeholder="https://youtube.com/embed/..." data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Plateforme</label>
            <select name="provider" data-block-id="${block.id}">
              <option value="youtube" ${(data.provider as string) === 'youtube' ? 'selected' : ''}>YouTube</option>
              <option value="vimeo" ${(data.provider as string) === 'vimeo' ? 'selected' : ''}>Vimeo</option>
              <option value="local" ${(data.provider as string) === 'local' ? 'selected' : ''}>Locale</option>
            </select>
          </div>
        </div>`;

    case 'quote':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Citation</label>
            <textarea name="content" rows="3" data-block-id="${block.id}">${escapeHtml((data.content as string) || '')}</textarea>
          </div>
          <div class="form-group">
            <label>Auteur</label>
            <input name="author" value="${escapeHtml((data.author as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Rôle</label>
            <input name="role" value="${escapeHtml((data.role as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Style</label>
            <select name="style" data-block-id="${block.id}">
              <option value="default" ${(data.style as string) === 'default' ? 'selected' : ''}>Défaut</option>
              <option value="large" ${(data.style as string) === 'large' ? 'selected' : ''}>Grand</option>
              <option value="bordered" ${(data.style as string) === 'bordered' ? 'selected' : ''}>Encadré</option>
            </select>
          </div>
        </div>`;

    case 'button':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Texte</label>
            <input name="text" value="${escapeHtml((data.text as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Lien</label>
            <input name="url" value="${escapeHtml((data.url as string) || '')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label>Style</label>
            <select name="style" data-block-id="${block.id}">
              <option value="primary" ${(data.style as string) === 'primary' ? 'selected' : ''}>Principal</option>
              <option value="secondary" ${(data.style as string) === 'secondary' ? 'selected' : ''}>Secondaire</option>
              <option value="outline" ${(data.style as string) === 'outline' ? 'selected' : ''}>Contour</option>
              <option value="ghost" ${(data.style as string) === 'ghost' ? 'selected' : ''}>Ghost</option>
            </select>
          </div>
        </div>`;

    case 'timeline':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Étapes (JSON)</label>
            <textarea name="items" rows="6" data-block-id="${block.id}">${escapeHtml(JSON.stringify((data.items as any[]) || []))}</textarea>
          </div>
          <div class="form-group">
            <label>Disposition</label>
            <select name="layout" data-block-id="${block.id}">
              <option value="left" ${(data.layout as string) === 'left' ? 'selected' : ''}>Gauche</option>
              <option value="alternating" ${(data.layout as string) === 'alternating' ? 'selected' : ''}>Alterné</option>
            </select>
          </div>
        </div>`;

    case 'code':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Code</label>
            <textarea name="code" rows="6" class="font-mono" data-block-id="${block.id}">${escapeHtml((data.code as string) || '')}</textarea>
          </div>
          <div class="form-group">
            <label>Langage</label>
            <input name="language" value="${escapeHtml((data.language as string) || 'text')}" data-block-id="${block.id}">
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="showLineNumbers" value="true" ${(data.showLineNumbers as boolean) ? 'checked' : ''} data-block-id="${block.id}"> Afficher les numéros de ligne</label>
          </div>
        </div>`;

    case 'divider':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>Style</label>
            <select name="style" data-block-id="${block.id}">
              <option value="solid" ${(data.style as string) === 'solid' ? 'selected' : ''}>Plein</option>
              <option value="dashed" ${(data.style as string) === 'dashed' ? 'selected' : ''}>Tireté</option>
              <option value="dotted" ${(data.style as string) === 'dotted' ? 'selected' : ''}>Pointillé</option>
            </select>
          </div>
        </div>`;

    case 'custom-html':
      return `
        <div class="editor-form">
          <div class="form-group">
            <label>HTML</label>
            <textarea name="html" rows="4" class="font-mono" data-block-id="${block.id}">${escapeHtml((data.html as string) || '')}</textarea>
          </div>
          <div class="form-group">
            <label>CSS</label>
            <textarea name="css" rows="3" class="font-mono" data-block-id="${block.id}">${escapeHtml((data.css as string) || '')}</textarea>
          </div>
          <div class="form-group">
            <label>JavaScript</label>
            <textarea name="js" rows="3" class="font-mono" data-block-id="${block.id}">${escapeHtml((data.js as string) || '')}</textarea>
          </div>
        </div>`;

    default:
      return `<div class="editor-form"><p>Aucun éditeur pour ce type de bloc</p></div>`;
  }
}
