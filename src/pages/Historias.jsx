import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoriesNewspaper from "../components/historias/StoriesNewspaper";
import { fetchPublishedStories } from "../api/stories";

function Historias() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchPublishedStories();
        if (!cancelled) setStories(list);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-paper-50">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex flex-wrap items-center justify-center gap-3 sm:justify-end">
        <Link
          to="/submeter-historia"
          className="inline-flex items-center rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 transition"
        >
          Partilhar a minha história
        </Link>
      </div>
      <StoriesNewspaper stories={stories} loading={loading} error={error} />
    </main>
  );
}

export default Historias;
