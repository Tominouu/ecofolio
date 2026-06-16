async function uploadFile(input, blockId) {
  const file = input.files[0];
  if (!file) return;
  const form = new FormData();
  form.append('file', file);
  const zone = document.getElementById(`upload-zone-${blockId}`);
  if (zone) zone.classList.add('uploading');
  try {
    const res = await fetch('/api/assets/upload', { method: 'POST', body: form });
    const data = await res.json();
    if (data.path) {
      const srcInput = document.getElementById(`src-${blockId}`);
      if (srcInput) {
        srcInput.value = '/' + data.path;
        srcInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  } catch (e) {
    console.error('Upload failed:', e);
  } finally {
    if (zone) zone.classList.remove('uploading');
    input.value = '';
  }
}

async function uploadGalleryFiles(input, blockId) {
  const files = Array.from(input.files);
  if (!files.length) return;
  const zone = document.getElementById(`upload-zone-${blockId}`);
  if (zone) zone.classList.add('uploading');
  try {
    const results = [];
    for (const file of files) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/assets/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.path) results.push({ src: '/' + data.path, alt: file.name });
    }
    if (results.length) {
      const textarea = document.querySelector(`textarea[name="images"][data-block-id="${blockId}"]`);
      if (textarea) {
        let images = [];
        try { images = JSON.parse(textarea.value); } catch (e) {}
        images = images.concat(results);
        textarea.value = JSON.stringify(images, null, 2);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  } catch (e) {
    console.error('Gallery upload failed:', e);
  } finally {
    if (zone) zone.classList.remove('uploading');
    input.value = '';
  }
}

async function fetchUrl(blockId) {
  const input = document.getElementById(`src-${blockId}`);
  if (!input || !input.value) return;
  try {
    const res = await fetch('/api/assets/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: input.value }),
    });
    const data = await res.json();
    if (data.path) input.value = '/' + data.path;
  } catch (e) {
    console.error('URL fetch failed:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('ecofolio-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggle = document.querySelector('[data-toggle-theme]');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ecofolio-theme', next);
    });
  }

  document.querySelectorAll('.upload-zone').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const input = zone.querySelector('.upload-input');
      if (input) {
        input.files = e.dataTransfer.files;
        if (input.getAttribute('data-gallery') === 'true') {
          uploadGalleryFiles(input, zone.dataset.blockId);
        } else {
          uploadFile(input, zone.dataset.blockId);
        }
      }
    });
  });

  const previewIframe = document.getElementById('preview-frame');
  if (previewIframe) {
    let refreshTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        fetch('/api/preview/refresh', { method: 'GET' }).catch(() => {});
        previewIframe.src = '/api/preview?' + Date.now();
      }, 300);
    });

    const container = document.getElementById('blocks-container');
    if (container) observer.observe(container, { childList: true, subtree: true });
  }

  let commitTimer = null;
  document.body.addEventListener('htmx:afterRequest', (e) => {
    clearTimeout(commitTimer);
    commitTimer = setTimeout(() => {
      fetch('/api/git/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'feat: auto-save changes' }),
      }).catch(() => {});
    }, 15000);
  });
});
