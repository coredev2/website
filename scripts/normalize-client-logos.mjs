import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "public/images/clients");
const outDir = path.join(root, "public/images/clients/fit");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const CANVAS_W = 480;
const CANVAS_H = 200;
const MAX_W = 400;
const MAX_H = 140;
const COLOR_THRESHOLD = 18;
const ALPHA_THRESHOLD = 10;

// Some source files are known to be exported on an opaque near-white canvas
// with meaningless blank padding (as opposed to logos that intentionally use
// white ink for their wordmark). For those specific files, also strip
// near-white opaque pixels when computing the bounding box.
const STRIP_WHITE_BG = new Set(["ontario.png"]);

async function computeBBox(inputPath, stripWhiteBg) {
  const { data, info } = await sharp(inputPath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const bg = stripWhiteBg ? [255, 255, 255] : null;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const a = data[i + 3];
      if (a <= ALPHA_THRESHOLD) continue;

      if (bg) {
        const dr = Math.abs(data[i] - bg[0]);
        const dg = Math.abs(data[i + 1] - bg[1]);
        const db = Math.abs(data[i + 2] - bg[2]);
        if (dr <= COLOR_THRESHOLD && dg <= COLOR_THRESHOLD && db <= COLOR_THRESHOLD) continue;
      }

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    // Nothing detected (shouldn't happen) - fall back to full image.
    return { left: 0, top: 0, width, height };
  }

  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".png"));

for (const file of files) {
  const inputPath = path.join(srcDir, file);
  const meta = await sharp(inputPath).metadata();
  const bbox = await computeBBox(inputPath, STRIP_WHITE_BG.has(file));

  const cropped = await sharp(inputPath).extract(bbox).toBuffer();

  const scale = Math.min(MAX_W / bbox.width, MAX_H / bbox.height, 1) || 1;
  const targetW = Math.max(1, Math.round(bbox.width * scale));
  const targetH = Math.max(1, Math.round(bbox.height * scale));

  const resized = await sharp(cropped).resize(targetW, targetH, { fit: "inside" }).toBuffer();

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resized,
        left: Math.round((CANVAS_W - targetW) / 2),
        top: Math.round((CANVAS_H - targetH) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, file));

  console.log(
    `${file}: orig ${meta.width}x${meta.height} -> bbox ${bbox.width}x${bbox.height} -> fit ${targetW}x${targetH} on ${CANVAS_W}x${CANVAS_H}`
  );
}

console.log("Done.");
