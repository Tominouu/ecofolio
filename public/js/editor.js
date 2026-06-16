document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.querySelector('[data-toggle-theme]');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ecofolio-theme', next);
    });
  }

  const savedTheme = localStorage.getItem('ecofolio-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Refresh preview after HTMX swaps
  document.body.addEventListener('htmx:afterSwap', (evt) => {
    const previewFrame = document.getElementById('preview-frame');
    if (previewFrame && evt.detail.target.closest('#canvas')) {
      fetch('/api/preview/refresh', { method: 'GET' })
        .then(() => { previewFrame.src = '/api/preview?' + Date.now(); })
        .catch(() => {});
    }
  });

  // Auto-save: watch for changes and commit
  let saveTimer = null;
  document.body.addEventListener('htmx:afterRequest', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      fetch('/api/git/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'feat: auto-save changes' }),
      }).catch(() => {});
    }, 30000);
  });
});
