import mockStories from "../data/stories.mock.js";

/**
 * Lista histórias publicadas (coleção pública no backend).
 *
 * Configuração: define `VITE_PUBLIC_STORIES_URL` no `.env` com o endpoint GET
 * que devolve JSON — array de histórias ou `{ stories: [...] }`.
 * Quando não definido, usa dados de exemplo para desenvolvimento.
 */
export async function fetchPublishedStories() {
  const url = import.meta.env.VITE_PUBLIC_STORIES_URL;
  if (!url) {
    return mockStories.map(normalizeStory);
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.stories ?? data.items ?? [];
    if (!Array.isArray(list)) return [];
    return list.map(normalizeStory);
  } catch (e) {
    console.warn("[stories] API indisponível — a usar dados de exemplo", e);
    return mockStories.map(normalizeStory);
  }
}

function normalizeStory(raw) {
  const published =
    raw.publishedAt ?? raw.published_at ?? raw.createdAt ?? raw.created_at ?? null;
  return {
    id: String(
      raw.id ??
        raw.storyId ??
        raw._id ??
        `s-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    ),
    title: raw.title ?? raw.headline ?? "Sem título",
    excerpt: raw.excerpt ?? raw.summary ?? raw.lead ?? "",
    body: raw.body ?? raw.content ?? raw.text ?? "",
    authorLabel: raw.authorLabel ?? raw.author_label ?? raw.pseudonym ?? formatAnonymity(raw),
    publishedAt: published,
    category: raw.category ?? raw.section ?? "",
  };
}

function formatAnonymity(raw) {
  const mode = raw.anonymityMode ?? raw.anonymity ?? raw.mode;
  if (mode === "anonymous" || raw.anonymous === true) return "Anónima";
  if (mode === "pseudonym" && raw.pseudonym) return raw.pseudonym;
  return raw.authorName ?? "Colaboradora";
}
