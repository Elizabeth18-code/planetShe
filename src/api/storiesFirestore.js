import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase.js";
import { normalizeStory } from "./storyNormalize.js";

function publishedAtToIso(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return null;
}

/**
 * Lê `stories_public` (regras: leitura pública). Ordenação por data de publicação.
 */
export async function fetchStoriesFromFirestore() {
  const app = getFirebaseApp();
  if (!app) {
    throw new Error("Firebase não configurado.");
  }

  const db = getFirestore(app);
  const q = query(
    collection(db, "stories_public"),
    orderBy("publishedAt", "desc"),
    limit(50),
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const data = doc.data();
    return normalizeStory({
      id: doc.id,
      title: data.title,
      body: data.content_public ?? "",
      excerpt: data.excerpt ?? "",
      publishedAt: publishedAtToIso(data.publishedAt),
      category: data.category ?? "",
      authorLabel: "Anónima",
      shareSlug: data.shareSlug ?? "",
    });
  });
}

/**
 * Uma história pública pelo `shareSlug` (único por documento após publish).
 */
export async function fetchStoryByShareSlug(slug) {
  const app = getFirebaseApp();
  if (!app) {
    throw new Error("Firebase não configurado.");
  }

  const db = getFirestore(app);
  const q = query(
    collection(db, "stories_public"),
    where("shareSlug", "==", slug),
    limit(1),
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const doc = snap.docs[0];
  const data = doc.data();
  return normalizeStory({
    id: doc.id,
    title: data.title,
    body: data.content_public ?? "",
    excerpt: data.excerpt ?? "",
    publishedAt: publishedAtToIso(data.publishedAt),
    category: data.category ?? "",
    authorLabel: "Anónima",
    shareSlug: data.shareSlug ?? slug,
  });
}
