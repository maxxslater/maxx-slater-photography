import { Link, useParams } from "react-router-dom";
import ScrambleText from "../components/ScrambleText";
import { babyloveArticles } from "../data/babylove";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function Blog() {
  return (
    <section className="bg-black text-white">
      <header className="border-b-2 border-white px-4 pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div className="mb-6 flex items-center justify-between gap-6">
          <p className="mono text-[10px] text-white/50">[ 05 ] NOTES FROM THE FIELD</p>
          <p className="mono hidden text-[10px] text-white/40 sm:block">
            PHOTOGRAPHY / PROCESS / STORIES
          </p>
        </div>
        <h1 className="display text-[19vw] leading-[0.72] sm:text-[15vw] lg:text-[12vw]">
          <ScrambleText text="JOURNAL" trigger="mount" duration={700} />
        </h1>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="mono max-w-xl text-[11px] leading-relaxed text-white/60">
            Stories, ideas, and notes on making photographs.
          </p>
          <span className="mono text-[10px] text-white/40">
            {String(babyloveArticles.length).padStart(2, "0")} ARTICLES
          </span>
        </div>
      </header>

      {babyloveArticles.length ? (
        <div className="divide-y-2 divide-white">
          {babyloveArticles.map((article, index) => (
            <article key={article.slug} className="grid gap-6 px-4 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10 sm:px-8 sm:py-12">
              <div className="mono flex items-start justify-between text-[10px] text-white/45 sm:block">
                <span>[ {String(index + 1).padStart(2, "0")} ]</span>
                {formatDate(article.created_at) && <time>{formatDate(article.created_at)}</time>}
              </div>
              <div>
                <h2 className="display text-4xl leading-[0.9] sm:text-6xl">
                  <Link className="transition-colors hover:text-white/60" to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                {article.excerpt && (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65">{article.excerpt}</p>
                )}
                <Link
                  className="mono mt-6 inline-block border-b border-white pb-1 text-[10px] hover:text-white/60"
                  to={`/blog/${article.slug}`}
                >
                  READ ARTICLE →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mono border-b-2 border-white px-4 py-10 text-[11px] text-white/55">
          ARTICLES WILL APPEAR HERE AFTER THE NEXT BUILD SYNC.
        </p>
      )}
    </section>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const article = babyloveArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="min-h-[60vh] bg-black px-4 py-16 text-white">
        <p className="mono text-xs text-white/60">ARTICLE NOT FOUND</p>
        <Link className="mono mt-8 inline-block border-b border-white pb-1 text-xs" to="/blog">
          ← BACK TO JOURNAL
        </Link>
      </section>
    );
  }

  return (
    <article className="bg-black text-white">
      <header className="border-b-2 border-white px-4 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
        <Link className="mono text-[10px] text-white/55 hover:text-white" to="/blog">← JOURNAL</Link>
        <p className="mono mb-6 mt-10 text-[10px] text-white/45">{formatDate(article.created_at)}</p>
        <h1 className="display max-w-6xl text-[14vw] leading-[0.82] sm:text-[9vw]">
          {article.title}
        </h1>
        {article.meta_description && (
          <p className="mono mt-8 max-w-2xl text-[11px] leading-relaxed text-white/60">
            {article.meta_description}
          </p>
        )}
      </header>
      {article.hero_image_url && (
        <img
          src={article.hero_image_url}
          alt=""
          className="max-h-[75vh] w-full border-b-2 border-white object-cover"
        />
      )}
      <div
        className="blog-content mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20"
        dangerouslySetInnerHTML={{ __html: article.content_html }}
      />
      <div className="border-t-2 border-white px-4 py-8 sm:px-8">
        <Link className="mono text-[10px] text-white/60 hover:text-white" to="/blog">
          ← BACK TO JOURNAL
        </Link>
      </div>
    </article>
  );
}
