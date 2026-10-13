import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, resolveConfig } from 'vite';

// The server bundle is build input only. Pages continues to publish dist alone.
const outputDirectory = 'node_modules/.tmp/portfolio-prerender';
const clientConfig = await resolveConfig({}, 'build');
await build({
  // Vite normalizes a relative SSR base to '/'. The static HTML must instead
  // use the client's base, including when Pages is hosted in a subdirectory.
  define: { 'import.meta.env.BASE_URL': JSON.stringify(clientConfig.base) },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: outputDirectory,
    emptyOutDir: false,
    sourcemap: false,
  },
});

const { render } = await import(pathToFileURL(resolve(outputDirectory, 'entry-server.js')).href);
const htmlPath = resolve('dist/index.html');
const html = await readFile(htmlPath, 'utf8');
const root = '<div id="root"></div>';
if (html.split(root).length !== 2) {
  throw new Error('Expected exactly one empty root in the client build.');
}
const markup = render();
if (!markup.includes('<main') || !markup.includes('<article')) {
  throw new Error('The app did not render its main content.');
}
await writeFile(htmlPath, html.replace(root, `<div id="root">${markup}</div>`));
