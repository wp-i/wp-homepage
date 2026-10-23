import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './app/App';
import { site } from './content/site';

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}

export function renderProjectListMetadata() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: site.projects.map(project => ({
      '@type': 'Thing', name: project.title, url: project.sourceUrl,
    })),
  }).replace(/</g, '\\u003c');
}
