import { list, del } from "@vercel/blob";

const prefixes = [
  "galleries/pink-pony-2026/originals/",
  "galleries/polo-2026/originals/",
];

for (const prefix of prefixes) {
  console.log(`\nChecking: ${prefix}`);

  let cursor;

  do {
    const result = await list({
      prefix,
      limit: 1000,
      cursor,
    });

    for (const blob of result.blobs) {
      // SAFETY CHECK: never delete anything outside /originals/
      if (!blob.pathname.includes("/originals/")) {
        console.log(`SKIPPED: ${blob.pathname}`);
        continue;
      }

      console.log(`Deleting: ${blob.pathname}`);

      await del(blob.pathname);
    }

    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);
}

console.log("\nFinished deleting Blob originals.");
console.log("Preview folders were left untouched.");