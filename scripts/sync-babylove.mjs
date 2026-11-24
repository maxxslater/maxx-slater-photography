
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

const API_BASE = "https://api.babylovegrowth.ai/api/integrations/v1/articles";
const PAGE_SIZE = 50;
const GENERATED_FILE = path.resolve("src/data/babylove.generated.ts");

async function requestJson(url, apiKey) {
  for (let attempt = 0; attempt <= 3; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) return response.json();

    if ((response.status === 429 || response.status >= 500) && attempt < 3) {
      const retryAfter = Number(response.headers.get("Retry-After"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(retryAfter * 1000, 30_000)
        : 1000 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }

    throw new Error(`BabyLoveGrowth API request failed (${response.status} ${response.statusText})`);
  }

  throw new Error("BabyLoveGrowth API request failed after retries");
}

function assertArticle(article, index) {
  if (
    !article ||
    (typeof article.id !== "number" && typeof article.id !== "string") ||
    typeof article.title !== "string" ||
    typeof article.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) ||
    typeof article.content_html !== "string"
  ) {
    throw new Error(`BabyLoveGrowth returned an invalid full article at index ${index}`);
  }
}

export async function syncArticles() {
  const localEnvFile = path.resolve(".env.local");
  if (existsSync(localEnvFile)) process.loadEnvFile(localEnvFile);

  const apiKey = process.env.BABYLOVE_API_KEY;
  if (!apiKey) {
    console.warn(
      "BABYLOVE_API_KEY is not set; building the blog with no articles. " +
      "Set it in .env.local and in Vercel Project Settings > Environment Variables.",
    );
    return [];
  }

  const summaries = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = new URL(API_BASE);
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(offset));
    const page = await requestJson(url, apiKey);
    if (!Array.isArray(page)) {
      throw new Error("BabyLoveGrowth returned an invalid article list; expected an array");
    }

    summaries.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  const articles = [];
  const slugs = new Set();
  for (const [index, summary] of summaries.entries()) {
    if (!summary || (typeof summary.id !== "number" && typeof summary.id !== "string")) {
      throw new Error(`BabyLoveGrowth returned an invalid article summary at index ${index}`);
    }

    const fullArticle = await requestJson(
      `${API_BASE}/${encodeURIComponent(String(summary.id))}`,
      apiKey,
    );
    assertArticle(fullArticle, index);
    if (slugs.has(fullArticle.slug)) {
      throw new Error(`BabyLoveGrowth returned duplicate article slug "${fullArticle.slug}"`);
    }
    slugs.add(fullArticle.slug);

    articles.push({
      id: fullArticle.id,
      title: fullArticle.title,
      slug: fullArticle.slug,
      content_html: sanitizeHtml(fullArticle.content_html),
      meta_description: typeof fullArticle.meta_description === "string"
        ? fullArticle.meta_description
        : typeof summary.meta_description === "string" ? summary.meta_description : "",
      excerpt: typeof fullArticle.excerpt === "string"
        ? fullArticle.excerpt
        : typeof summary.excerpt === "string" ? summary.excerpt : "",
      hero_image_url: typeof fullArticle.hero_image_url === "string"
        ? fullArticle.hero_image_url
        : typeof summary.hero_image_url === "string" ? summary.hero_image_url : "",
      created_at: typeof fullArticle.created_at === "string"
        ? fullArticle.created_at
        : typeof summary.created_at === "string" ? summary.created_at : "",
      published_url: typeof fullArticle.published_url === "string"
        ? fullArticle.published_url
        : "",
    });
  }

  const generated = [
    'import type { BabyLoveArticle } from "./babylove";',
    `export const babyloveArticles: BabyLoveArticle[] = ${JSON.stringify(articles, null, 2)};`,
    "",
  ].join("\n");
  await writeFile(GENERATED_FILE, generated, "utf8");
  console.log(`Synced ${articles.length} BabyLoveGrowth article(s).`);
  return articles;
}
