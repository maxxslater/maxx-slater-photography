import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
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
  const file = await readFile(filePath);

  const blob = await put(
    `galleries/${gallery}/${fileName}`,
    file,
    {
      access: "private",
      contentType: "image/jpeg",
      allowOverwrite: true,
    }
  );

  console.log(`Uploaded: ${blob.pathname}`);
}

console.log("Done.");