// News image entry (Node 22, standard library only): the finished front page is
// entry.png beside this file, and this program writes it to /output/entry.png.
// It runs with no network, so it only copies bytes that are already in the repo.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const imagePath = join(here, 'entry.png');

// Validate the image before copying it: the entry must be a whole PNG of at
// most 1 MiB and at most 1024 by 1024 pixels. Fail loudly instead of shipping
// a file the gate would refuse.
if (!existsSync(imagePath)) {
  throw new Error(`entry.png not found at ${imagePath}`);
}
const image = readFileSync(imagePath);
if (image.length > 1048576) {
  throw new Error(`entry.png is ${image.length} bytes, over the 1 MiB limit`);
}
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (image.length < 33 || !image.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file (bad magic bytes)');
}
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}

writeFileSync(join(outDir, 'entry.png'), image);
