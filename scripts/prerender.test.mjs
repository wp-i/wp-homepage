import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { resolve } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

test('production HTML and client keep the same content and subdirectory image paths', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', error => errors.push(error));
  console.on('error', (...args) => errors.push(args));
  const dom = new JSDOM(html, {
    url: 'https://wp-i.github.io/wp-homepage/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: console,
  });
  try {
    // No resource loader is enabled: this check makes no external requests.
    dom.window.fetch = () => { throw new Error('External fetch is forbidden in this check.'); };
    const root = dom.window.document.getElementById('root');
    const articles = [...root.querySelectorAll('article')];
    assert.deepEqual(articles.map(article => article.id), [
      'webart', 'comment-vision-claw', 'tft-trait-atlas',
      'reelink', 'swordshield-notes', 'nodestitch',
    ]);
    const text = articles.map(article => article.textContent);
    const links = [...root.querySelectorAll('a')].map(link => link.getAttribute('href'));
    const images = [...root.querySelectorAll('article img')];
    assert.deepEqual(images.map(image => image.getAttribute('src')), [
      './projects/reelink.svg', './projects/swordshield-notes.png', './projects/nodestitch.svg',
    ]);
    for (const image of images) {
      assert.ok(image.src.startsWith('https://wp-i.github.io/wp-homepage/projects/'));
      await readFile(resolve('dist', image.getAttribute('src')));
    }
    assert.equal(root.querySelectorAll('iframe').length, 0);
    const scriptPath = dom.window.document.querySelector('script[type="module"]').getAttribute('src');
    assert.ok(scriptPath.startsWith('./assets/'));
    dom.window.eval(await readFile(resolve('dist', scriptPath), 'utf8'));
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.deepEqual(errors, []);
    const hydrated = [...root.querySelectorAll('article')];
    assert.equal(hydrated.length, articles.length);
    hydrated.forEach((article, index) => assert.equal(article, articles[index]));
    assert.deepEqual(hydrated.map(article => article.textContent), text);
    assert.deepEqual([...root.querySelectorAll('a')].map(link => link.getAttribute('href')), links);
    assert.deepEqual([...root.querySelectorAll('article img')].map(image => image.getAttribute('src')),
      images.map(image => image.getAttribute('src')));
  } finally {
    dom.window.close();
  }
});
