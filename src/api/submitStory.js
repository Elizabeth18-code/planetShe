import { httpsCallable } from "firebase/functions";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getFirebaseApp, getFirebaseFunctions } from "../firebase.js";

async function submitStoryToFirestore(payload) {
  const app = getFirebaseApp();
  if (!app) {
    throw new Error("Configura as variáveis Firebase no ficheiro .env para submeter uma história.");
  }

  const db = getFirestore(app);
  const docRef = await addDoc(collection(db, "stories_private"), {
    private_content: payload.private_content,
    visibility: payload.visibility,
    consents: payload.consents,
    author: payload.author,
    origin: payload.origin || "web",
    category: payload.category || "general",
    risk_level: payload.risk_level || "undefined",
    state: "received",
    createdAt: serverTimestamp(),
  });

  return { storyId: docRef.id };
}

/**
 * Tenta a Cloud Function `submitStory`. Se não existir, grava em Firestore.
 */
export async function submitStoryCall(payload) {
  const functions = getFirebaseFunctions();

  if (functions) {
    try {
      const submit = httpsCallable(functions, "submitStory");
      const result = await submit(payload);
      return result.data;
    } catch (error) {
      const code = error?.code || "";
      const canFallback =
        code.includes("not-found") ||
        code.includes("unimplemented") ||
        code.includes("unavailable") ||
        code.includes("internal") ||
        code.includes("failed-precondition");

      if (!canFallback) {
        throw error;
      }
    }
  }

  return submitStoryToFirestore(payload);
}
