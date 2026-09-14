import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStoryBySlug } from "../api/stories";
import StoryBody from "../components/historias/StoryBody";

function formatLongDate(iso) {
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

function HistoriaDetalhe() {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setStory(null);
      try {
        const s = await fetchStoryBySlug(slug);
        if (!cancelled) setStory(s);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-24 min-h-screen bg-paper-50">
        <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-4">
          <div className="h-8 bg-paper-200 rounded w-2/3" />
          <div className="h-4 bg-paper-200 rounded w-1/4" />
          <div className="h-40 bg-paper-200/70 rounded" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-24 min-h-screen bg-paper-50 px-4">
        <div className="max-w-3xl mx-auto py-16 text-center font-paper text-paper-ink">
          <p className="text-lg">Não foi possível carregar esta história.</p>
          <Link to="/historias" className="mt-6 inline-block text-pink-600 font-semibold hover:underline">
            Voltar às histórias
          </Link>
        </div>
      </main>
    );
  }

  if (!story) {
    return (
      <main className="pt-24 min-h-screen bg-paper-50 px-4">
        <div className="max-w-3xl mx-auto py-16 text-center font-paper text-paper-ink">
          <p className="font-display text-2xl">História não encontrada</p>
          <p className="mt-2 text-sm text-paper-ink/70">
            O link pode estar incorreto ou o conteúdo já não está disponível.
          </p>
          <Link to="/historias" className="mt-8 inline-block text-pink-600 font-semibold hover:underline">
            Voltar às histórias
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-paper-100 text-paper-ink border-y border-paper-200">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <Link
          to="/historias"
          className="inline-flex items-center gap-1 font-paper text-sm text-pink-600 hover:text-pink-700 mb-10"
        >
          ← Todas as histórias
        </Link>

        {story.category ? (
          <p className="font-paper text-xs font-semibold uppercase tracking-[0.2em] text-pink-600 mb-3">
            {story.category}
          </p>
        ) : null}

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-4">
          {story.title}
        </h1>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-paper text-sm text-paper-ink/60 border-b border-paper-300 pb-8 mb-8">
          <span>
            Por <span className="text-paper-ink font-medium">{story.authorLabel}</span>
          </span>
          <span aria-hidden="true">|</span>
          <time dateTime={story.publishedAt || undefined}>{formatLongDate(story.publishedAt)}</time>
        </div>

        {story.body || story.excerpt ? (
          <StoryBody text={story.body || story.excerpt} />
        ) : null}
      </article>
    </main>
  );
}

export default HistoriaDetalhe;
