export function normalizeStory(raw) {
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
    shareSlug: raw.shareSlug ?? raw.share_slug ?? "",
  };
}

function formatAnonymity(raw) {
  const mode = raw.anonymityMode ?? raw.anonymity ?? raw.mode;
  if (mode === "anonymous" || raw.anonymous === true) return "Anónima";
  if (mode === "pseudonym" && raw.pseudonym) return raw.pseudonym;
  return raw.authorName ?? "Colaboradora";
}
