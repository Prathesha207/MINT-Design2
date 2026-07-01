import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const sourceLogo = path.resolve("public/logo.png");
const publicDir = path.resolve("public");
const tempDir = path.resolve(".tmp-favicon");

const LOGO_GRADIENT_START = "#BBA5F4";
const LOGO_GRADIENT_END = "#5F33D6";

await fs.access(sourceLogo);
await fs.mkdir(publicDir, { recursive: true });
await fs.mkdir(tempDir, { recursive: true });

async function createIcon(size, outputPath) {
  const padding = Math.round(size * 0.04);
  const logoSize = size - padding * 2;

  const logoMask = await sharp(sourceLogo)
    .trim()
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .png()
    .toBuffer();

  const gradientSvg = `
    <svg
      width="${logoSize}"
      height="${logoSize}"
      viewBox="0 0 ${logoSize} ${logoSize}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${LOGO_GRADIENT_START}" />
          <stop offset="100%" stop-color="${LOGO_GRADIENT_END}" />
        </linearGradient>
      </defs>
      <rect width="${logoSize}" height="${logoSize}" fill="url(#logo-grad)" />
    </svg>
  `;

  const coloredLogo = await sharp(Buffer.from(gradientSvg))
    .composite([
      {
        input: logoMask,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: coloredLogo,
        gravity: "center",
      },
    ])
    .png()
    .toFile(outputPath);
}

await createIcon(192, path.join(publicDir, "icon-192.png"));
await createIcon(512, path.join(publicDir, "icon-512.png"));
await createIcon(180, path.join(publicDir, "apple-touch-icon.png"));

const faviconSizes = [16, 32, 48];
const faviconPngPaths = [];

for (const size of faviconSizes) {
  const output = path.join(tempDir, `favicon-${size}.png`);
  await createIcon(size, output);
  faviconPngPaths.push(output);
}

const icoBuffer = await pngToIco(faviconPngPaths);
await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);

await fs.writeFile(
  path.join(publicDir, "site.webmanifest"),
  `${JSON.stringify(
    {
      name: ""MINT | Multimodal Intelligence & Networked Tracking"",
      short_name: "MINT",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#08070F",
      background_color: "#08070F",
      display: "standalone",
    },
    null,
    2,
  )}\n`,
);

await fs.rm(tempDir, { recursive: true, force: true });

console.log("Generated clean favicon assets:");
console.log("public/favicon.ico");
console.log("public/icon-192.png");
console.log("public/icon-512.png");
console.log("public/apple-touch-icon.png");
console.log("public/site.webmanifest");