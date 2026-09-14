import mockStories from "../data/stories.mock.js";
import { isFirebaseConfigured } from "../firebase.js";
import { normalizeStory } from "./storyNormalize.js";

/**
 * Lista histórias publicadas.
 *
 * Ordem de prioridade:
 * 1. Firebase Firestore (`stories_public`) — se `VITE_FIREBASE_*` estiver completo no `.env`
 * 2. `VITE_PUBLIC_STORIES_URL` — GET JSON (array ou `{ stories: [...] }`)
 * 3. Dados de exemplo (desenvolvimento)
 */
export async function fetchPublishedStories() {
  if (isFirebaseConfigured()) {
    try {
      const { fetchStoriesFromFirestore } = await import("./storiesFirestore.js");
      return await fetchStoriesFromFirestore();
    } catch (e) {
      console.error("[stories] Firestore:", e);
      throw e;
    }
  }

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

/**
 * Uma história pelo `shareSlug` (URL amigável após publicação no backend).
 */
export async function fetchStoryBySlug(slug) {
  const clean = decodeURIComponent(String(slug || "").trim());
  if (!clean) return null;

  if (isFirebaseConfigured()) {
    try {
      const { fetchStoryByShareSlug } = await import("./storiesFirestore.js");
      return await fetchStoryByShareSlug(clean);
    } catch (e) {
      console.error("[stories] Firestore:", e);
      throw e;
    }
  }

  const found = mockStories.find((s) => s.shareSlug === clean);
  return found ? normalizeStory(found) : null;
}
