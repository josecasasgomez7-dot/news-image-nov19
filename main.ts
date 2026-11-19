// News Image — 19 November 2026
// Copies the finished front page (entry.png) into the output directory,
// after checking that it is a real PNG file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Every PNG file begins with this exact 8-byte signature.
const PNG_SIGNATURE: Buffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

const scriptDir: string = dirname(fileURLToPath(import.meta.url));
const sourcePath: string = join(scriptDir, "entry.png");
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const targetPath: string = join(outputDir, "entry.png");

const image: Buffer = readFileSync(sourcePath);

// A PNG file always starts with these 8 bytes. If they do not match, the
// file is not a PNG (or it is damaged), so stop here instead of copying
// bad data into the output directory.
if (
  image.length < PNG_SIGNATURE.length ||
  !image.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)
) {
  const seen: string = image.subarray(0, 8).toString("hex");
  throw new Error(
    `entry.png is not a valid PNG file: its first bytes are ${seen}, ` +
      "but a PNG must start with 89504e470d0a1a0a.",
  );
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, image);
console.log(`Wrote ${targetPath}`);
