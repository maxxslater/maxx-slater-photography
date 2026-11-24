import { babyloveArticles } from "./babylove.generated";

export type BabyLoveArticle = {
  id: number | string;
  title: string;
  slug: string;
  content_html: string;
  meta_description: string;
  excerpt: string;
  hero_image_url: string;
  created_at: string;
  published_url: string;
};

export { babyloveArticles };
