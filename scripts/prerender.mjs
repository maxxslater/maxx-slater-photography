import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const pages = JSON.parse(await readFile("src/data/seo.json", "utf8"));
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
try {
  const { render, metadata, origin } = await server.ssrLoadModule("/src/entry-server.tsx");
  const template = await readFile("dist/index.html", "utf8");
  for (const route of [...Object.keys(pages), "/galleries", "/galleries/pink-pony-2026", "/galleries/polo-2026"]) {
    const data = metadata(route);
    const head = `<title>${escape(data.title)}</title>
<meta name="description" content="${escape(data.description)}">
<meta name="robots" content="${data.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"}">
<link rel="canonical" href="${data.url}">
<meta property="og:title" content="${escape(data.title)}">
<meta property="og:description" content="${escape(data.description)}">
<meta property="og:url" content="${data.url}">
<meta property="og:image" content="${origin}/images/self.JPG">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Person",name:"Maxx Slater",url:origin,jobTitle:"Photographer",address:{"@type":"PostalAddress",addressLocality:"Columbus",addressRegion:"OH",addressCountry:"US"}})}</script>`;
    const html = template.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta\b[^>]*(?:name="description"|property="og:(?:title|description)")[^>]*>/g, "").replace("</head>", head + "</head>").replace('<div id="root"></div>', () => `<div id="root">${render(route)}</div>`);
    const destination = route === "/" ? "dist/index.html" : `dist${route}.html`;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html);
    console.log(`Prerendered ${route}`);
  }
} finally { await server.close(); }
