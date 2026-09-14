import { httpsCallable } from "firebase/functions";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseFunctions } from "../firebase.js";

function slugFromText(text) {
  const base = String(text || "historia")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  return `${base || "historia"}-${Date.now().toString(36)}`;
}

export async function fetchPrivateStories() {
  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase não configurado.");

  const db = getFirestore(app);
  const col = collection(db, "stories_private");

  try {
    const q = query(col, orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    const snap = await getDocs(query(col, limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}

async function updateStoryState(storyId, decision, internalComment) {
  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase não configurado.");
  const db = getFirestore(app);
  await updateDoc(doc(db, "stories_private", storyId), {
    state: decision,
    internal_comment: internalComment || null,
    updatedAt: serverTimestamp(),
  });
  return { ok: true };
}

export async function reviewStoryCall(payload) {
  const functions = getFirebaseFunctions();
  if (functions) {
    try {
      const fn = httpsCallable(functions, "reviewStory");
      const result = await fn(payload);
      return result.data;
    } catch (error) {
      const code = error?.code || "";
      if (!code.includes("not-found") && !code.includes("unimplemented") && !code.includes("unavailable")) {
        throw error;
      }
    }
  }

  return updateStoryState(payload.storyId, payload.decision, payload.internal_comment);
}

export async function publishStoryCall(payload) {
  const functions = getFirebaseFunctions();
  if (functions) {
    try {
      const fn = httpsCallable(functions, "publishStory");
      const result = await fn(payload);
      return result.data;
    } catch (error) {
      const code = error?.code || "";
      if (!code.includes("not-found") && !code.includes("unimplemented") && !code.includes("unavailable")) {
        throw error;
      }
    }
  }

  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase não configurado.");
  const db = getFirestore(app);

  const stories = await fetchPrivateStories();
  const story = stories.find((s) => s.id === payload.storyId);
  if (!story) throw new Error("História não encontrada.");

  const content = story.private_content || "";
  const title = content.split("\n").find((line) => line.trim())?.trim().slice(0, 80) || "História";
  const excerpt = content.trim().slice(0, 180);

  await addDoc(collection(db, "stories_public"), {
    title,
    excerpt,
    content_public: content,
    category: story.category || "general",
    shareSlug: slugFromText(title),
    publishedAt: serverTimestamp(),
    authorLabel: story.author?.mode === "pseudonym" ? story.author?.pseudonym || "Anónima" : "Anónima",
  });

  await updateDoc(doc(db, "stories_private", payload.storyId), {
    state: "published",
    updatedAt: serverTimestamp(),
  });

  return { ok: true };
}
