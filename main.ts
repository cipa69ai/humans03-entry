// Entry point for the bring-the-humans-03 TikTok ad.
// All this program does is hand VIDEO.json to the grader: the house reads
// the TikTok video from the url it holds and scores the entry on its views.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SOURCE = join(HERE, 'VIDEO.json');

// The url is the whole entry, so refuse to copy a file that is not valid.
const text = readFileSync(SOURCE, 'utf8');
const data = JSON.parse(text);
if (typeof data !== 'object' || data === null || typeof data.url !== 'string') {
  throw new Error('VIDEO.json must be a JSON object with a string "url"');
}
if (!/^https:\/\/(www\.|m\.)?tiktok\.com\//.test(data.url)) {
  throw new Error('VIDEO.json url must be a TikTok video address');
}

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SOURCE, join(OUT_DIR, 'VIDEO.json'));
console.log(`VIDEO.json copied to ${OUT_DIR}`);
