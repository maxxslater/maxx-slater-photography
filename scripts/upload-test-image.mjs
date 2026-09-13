import { readFile } from "node:fs/promises";
import { put } from "@vercel/blob";

const filePath = "./test-upload.jpg";

const file = await readFile(filePath);

const blob = await put(
  "galleries/pink-pony-2026/test-upload.jpg",
  file,
  {
    access: "private",
    contentType: "image/jpeg",
  }
);

console.log("Uploaded:");
console.log(blob);