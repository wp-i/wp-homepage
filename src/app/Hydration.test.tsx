import { act } from '@testing-library/react';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { App } from './App';
import { site } from '../content/site';

describe('prerendered App', () => {
  it('keeps the existing visible content and nodes when hydrated', async () => {
    const app = <StrictMode><App /></StrictMode>;
    const container = document.createElement('div');
    container.innerHTML = renderToString(app);
    document.body.append(container);
    const before = [...container.querySelectorAll('article')];
    expect(before.map(article => article.id)).toEqual(site.projects.map(project => project.slug));
    const originalText = before.map(article => article.textContent);
    const originalLinks = [...container.querySelectorAll('a')].map(link => link.getAttribute('href'));
    // Boundary/review metadata is not rendered by the current UI; do not newly expose it.
    for (const project of site.projects) {
      expect(container.textContent).not.toContain(project.boundary);
      expect(container.textContent).not.toContain(project.reviewedAt);
    }
    const errors: unknown[] = [];
    const root = hydrateRoot(container, app, { onRecoverableError: error => errors.push(error) });
    try {
      await act(async () => { await Promise.resolve(); });
      expect(errors).toEqual([]);
      const after = [...container.querySelectorAll('article')];
      expect(after).toHaveLength(site.projects.length);
      after.forEach((article, index) => expect(article).toBe(before[index]));
      expect(after.map(article => article.textContent)).toEqual(originalText);
      expect([...container.querySelectorAll('a')].map(link => link.getAttribute('href'))).toEqual(originalLinks);
    } finally {
      await act(async () => { root.unmount(); await Promise.resolve(); });
      container.remove();
    }
  });
});
