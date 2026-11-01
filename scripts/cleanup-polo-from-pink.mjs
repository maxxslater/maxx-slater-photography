import { readdir } from "node:fs/promises";
import { list, del } from "@vercel/blob";

const localFolder = "./gallery-upload/pink-pony-2026";
const wrongBlobFolder = "galleries/polo-2026/";

const localFiles = await new Set(
  (await readdir(localFolder)).filter((file) =>
    /\.(jpg|jpeg)$/i.test(file)
  )
);

let cursor;
let hasMore = true;
const matches = [];

while (hasMore) {
  const result = await list({
    prefix: wrongBlobFolder,
    cursor,
    limit: 1000,
  });

  matches.push(
    ...result.blobs.filter((blob) => {
      const fileName = blob.pathname.split("/").pop();
      return fileName && localFiles.has(fileName);
    })
  );

  cursor = result.cursor;
  hasMore = result.hasMore;
}

console.log(`Found ${matches.length} misplaced blobs.`);

if (process.argv[2] !== "--confirm") {
  console.log("Nothing deleted. Run again with --confirm after checking the count.");
  process.exit(0);
}

for (let index = 0; index < matches.length; index += 50) {
  await del(matches.slice(index, index + 50).map((blob) => blob.url));
}

console.log(`Deleted ${matches.length} misplaced Polo blobs.`);