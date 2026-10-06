import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

for (const slug of ['dagen', 'ngringo', 'sroyo']) {
  const input = fileURLToPath(new URL(`../assets/source-images/Kantor-desa-${slug}-jaten-karanganyar.jpg`, import.meta.url));
  const output = fileURLToPath(new URL(`../public/images/kantor-desa-${slug}.webp`, import.meta.url));
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 76, effort: 5 }).toFile(output);
}
