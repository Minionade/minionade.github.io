import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const html = readFileSync('dist/index.html', 'utf8');
if (/src=["'][^"']*\/src\//.test(html)) throw new Error('Unbuilt source entry point in deployment.');
const assets = [...html.matchAll(/(?:src|href)=["']([^"']*assets\/[^"']+)["']/g)];
if (!assets.length) throw new Error('No compiled assets found in deployment.');
for (const [, asset] of assets) {
  if (!existsSync(resolve('dist', asset.replace(/^\.\//, '').replace(/^\//, '')))) {
    throw new Error(`Missing compiled asset: ${asset}`);
  }
}
console.log('Verified compiled HTML and asset files.');
