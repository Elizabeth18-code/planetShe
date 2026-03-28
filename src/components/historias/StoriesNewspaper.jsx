import { Link } from "react-router-dom";
import StoryBody from "./StoryBody";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function formatShortDate(iso) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("pt-PT", {
      day: "numeric",
      month: "short",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function TitleLink({ href, children, className }) {
  if (!href) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Link to={href} className={`${className} hover:text-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded-sm`}>
      {children}
    </Link>
  );
}

function StoriesNewspaper({ stories, loading, error }) {
  const editionDate =
    stories.length > 0 && stories[0].publishedAt
      ? formatDate(stories[0].publishedAt)
      : formatDate(new Date().toISOString());

  const [featured, ...rest] = stories;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="animate-pulse space-y-6 border-4 border-double border-paper-300 bg-paper-100 p-8 md:p-12">
          <div className="h-4 bg-paper-200 rounded w-1/3 mx-auto" />
          <div className="h-12 bg-paper-200 rounded w-4/5 mx-auto" />
          <div className="h-32 bg-paper-200/80 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center font-paper text-paper-ink">
        <p className="text-lg">Não foi possível carregar as histórias.</p>
        <p className="text-sm text-paper-ink/60 mt-2">Tenta novamente mais tarde.</p>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center font-paper">
        <p className="font-display text-2xl md:text-3xl text-paper-ink">
          Ainda não há histórias publicadas.
        </p>
        <p className="mt-4 text-paper-ink/70 max-w-md mx-auto">
          Quando a equipa aprovar e publicar relatos na plataforma, vão aparecer aqui, em formato de
          jornal.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper-100 text-paper-ink border-y border-paper-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Masthead */}
        <header className="text-center border-b-4 border-double border-paper-300 pb-8 mb-10">
          <p className="font-paper text-xs md:text-sm uppercase tracking-[0.35em] text-paper-ink/55 mb-3">
            Planet She — Edição da comunidade
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-paper-ink">
            Histórias
          </h1>
          <p className="font-paper italic text-paper-ink/70 mt-3 text-sm md:text-base">
            {editionDate}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] md:text-xs font-paper uppercase tracking-widest text-paper-ink/50">
            <span className="border border-paper-300 px-2 py-0.5">Vozes reais</span>
            <span className="border border-paper-300 px-2 py-0.5">Respeito &amp; anonimato</span>
            <span className="border border-paper-300 px-2 py-0.5">Curadoria</span>
          </div>
        </header>

        {/* Destaque principal */}
        <article className="mb-14 md:mb-16">
          {featured.category ? (
            <p className="font-paper text-xs font-semibold uppercase tracking-[0.2em] text-pink-600 mb-3">
              {featured.category}
            </p>
          ) : null}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-4">
            <TitleLink
              href={featured.shareSlug ? `/historias/${encodeURIComponent(featured.shareSlug)}` : null}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-paper-ink"
            >
              {featured.title}
            </TitleLink>
          </h2>
          <p className="font-paper text-lg md:text-xl leading-snug text-paper-ink/85 mb-6 max-w-3xl">
            {featured.excerpt ||
              (featured.body.length > 220
                ? `${featured.body.slice(0, 220).trim()}…`
                : featured.body || "—")}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-paper text-sm text-paper-ink/60 border-t border-paper-200 pt-4 mb-8">
            <span>
              Por <span className="text-paper-ink font-medium">{featured.authorLabel}</span>
            </span>
            <span aria-hidden="true">|</span>
            <time dateTime={featured.publishedAt || undefined}>
              {formatShortDate(featured.publishedAt)}
            </time>
          </div>
          {featured.body || featured.excerpt ? (
            <StoryBody text={featured.body || featured.excerpt} />
          ) : null}
        </article>

        {/* Mais histórias — grelha estilo jornal */}
        {rest.length > 0 ? (
          <>
            <div
              className="border-t-4 border-double border-paper-300 pt-10 mb-8"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-4 mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-semibold">Mais relatos</h3>
              <span className="font-paper text-xs uppercase tracking-widest text-paper-ink/45">
                Continuação
              </span>
            </div>
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
              {rest.map((story) => (
                <article
                  key={story.id}
                  className="border-t border-paper-300 pt-6 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-6"
                >
                  {story.category ? (
                    <p className="font-paper text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-600 mb-2">
                      {story.category}
                    </p>
                  ) : null}
                  <h4 className="font-display text-xl md:text-2xl font-bold leading-snug mb-3">
                    <TitleLink
                      href={
                        story.shareSlug
                          ? `/historias/${encodeURIComponent(story.shareSlug)}`
                          : null
                      }
                      className="font-display text-xl md:text-2xl font-bold leading-snug text-paper-ink"
                    >
                      {story.title}
                    </TitleLink>
                  </h4>
                  <p className="font-paper text-sm leading-relaxed text-paper-ink/80 line-clamp-4">
                    {story.excerpt ||
                      (story.body.length > 180
                        ? `${story.body.slice(0, 180).trim()}…`
                        : story.body || "—")}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 font-paper text-xs text-paper-ink/55">
                    <span>{story.authorLabel}</span>
                    <span>·</span>
                    <time dateTime={story.publishedAt || undefined}>
                      {formatShortDate(story.publishedAt)}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default StoriesNewspaper;
