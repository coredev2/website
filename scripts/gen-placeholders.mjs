// One-off generator for placeholder brand SVGs. Not part of the app build.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const NAVY = "#082C7F";
const BLUE = "#135AD6";
const AZURE = "#117EC8";
const STEEL = "#4D7EBE";

function wordmark(name, initials) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" role="img" aria-label="${name} logo placeholder">
  <rect width="240" height="80" rx="10" fill="none"/>
  <circle cx="34" cy="40" r="22" fill="${NAVY}"/>
  <text x="34" y="48" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#fff" text-anchor="middle">${initials}</text>
  <text x="68" y="48" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="${NAVY}">${name}</text>
</svg>`;
}

const clients = [
  ["City of Toronto", "toronto", "CT"],
  ["Government of Ontario", "ontario", "ON"],
  ["Transport Canada", "transport-canada", "TC"],
  ["Canadian Food Inspection Agency", "cfia", "FI"],
  ["Indigenous Services Canada", "isc", "IS"],
  ["Bell Canada", "bell", "BC"],
  ["Time Warner Telecom", "twtelecom", "TW"],
  ["ECS Team", "ecs", "EC"],
  ["EmergiTEL", "emergitel", "EM"],
  ["Shaw Communications", "shaw", "SC"],
  ["TELUS", "telus", "TL"],
];

for (const [name, slug, initials] of clients) {
  writeFileSync(
    path.join(root, "public/images/clients", `${slug}.svg`),
    wordmark(name, initials)
  );
}

function projectArt(title, tag, gradA, gradB) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${title} project preview placeholder">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${gradA}"/>
      <stop offset="1" stop-color="${gradB}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <rect x="60" y="230" width="680" height="140" rx="20" fill="rgba(255,255,255,0.12)"/>
  <text x="400" y="290" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#fff" text-anchor="middle">${title}</text>
  <text x="400" y="330" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="500" fill="rgba(255,255,255,0.85)" text-anchor="middle">${tag}</text>
</svg>`;
}

writeFileSync(
  path.join(root, "public/images/projects", "halal-stage.svg"),
  projectArt("Halal Stage", "Digital Platform", NAVY, BLUE)
);
writeFileSync(
  path.join(root, "public/images/projects", "2sooq.svg"),
  projectArt("2Sooq", "Halal Food Marketplace App", AZURE, STEEL)
);

function avatar(initials, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Client avatar placeholder">
  <circle cx="60" cy="60" r="60" fill="${bg}"/>
  <text x="60" y="72" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#fff" text-anchor="middle">${initials}</text>
</svg>`;
}

const testimonials = [
  ["ad", NAVY],
  ["as", BLUE],
  ["sf", AZURE],
];
for (const [slug, color] of testimonials) {
  writeFileSync(
    path.join(root, "public/images/testimonials", `${slug}.svg`),
    avatar(slug.toUpperCase(), color)
  );
}

console.log("Placeholder assets generated.");
