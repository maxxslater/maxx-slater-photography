import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { put } from "@vercel/blob";

const gallery = "pink-pony-2026";
const uploadFolder = `./gallery-upload/${gallery}`;

const files = await readdir(uploadFolder);

const imageFiles = files.filter((file) =>
  /\.(jpg|jpeg)$/i.test(file)
);

console.log(`Found ${imageFiles.length} image(s).`);

for (const fileName of imageFiles) {
  const filePath = path.join(uploadFolder, fileName);
  const originalBuffer = await readFile(filePath);

  const previewBuffer = await sharp(originalBuffer)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 82,
      mozjpeg: true,
    })
    .toBuffer();

  const originalPath =
    `galleries/${gallery}/originals/${fileName}`;

  const previewPath =
    `galleries/${gallery}/previews/${fileName}`;

  await put(originalPath, originalBuffer, {
    access: "private",
    contentType: "image/jpeg",
    allowOverwrite: true,
  });

  console.log(`Original uploaded: ${originalPath}`);

  await put(previewPath, previewBuffer, {
    access: "private",
    contentType: "image/jpeg",
    allowOverwrite: true,
  });

  console.log(`Preview uploaded: ${previewPath}`);
}

console.log("Done.");