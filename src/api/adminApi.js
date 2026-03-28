import { httpsCallable } from "firebase/functions";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseFunctions } from "../firebase.js";

export async function fetchPrivateStories() {
  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase não configurado.");

  const db = getFirestore(app);
  const q = query(
    collection(db, "stories_private"),
    orderBy("createdAt", "desc"),
    limit(100),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function reviewStoryCall(payload) {
  const functions = getFirebaseFunctions();
  if (!functions) throw new Error("Firebase não configurado.");
  const fn = httpsCallable(functions, "reviewStory");
  const result = await fn(payload);
  return result.data;
}

export async function publishStoryCall(payload) {
  const functions = getFirebaseFunctions();
  if (!functions) throw new Error("Firebase não configurado.");
  const fn = httpsCallable(functions, "publishStory");
  const result = await fn(payload);
  return result.data;
}
