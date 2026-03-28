import { useEffect, useState } from "react";
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
      <StoriesNewspaper stories={stories} loading={loading} error={error} />
    </main>
  );
}

export default Historias;
