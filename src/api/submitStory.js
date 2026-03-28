import { httpsCallable } from "firebase/functions";
import { getFirebaseFunctions } from "../firebase.js";

/**
 * Chama a Cloud Function `submitStory` (mesmo contrato que `planetShe_backend`).
 */
export async function submitStoryCall(payload) {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw new Error(
      "Configura as variáveis Firebase no ficheiro .env para submeter uma história.",
    );
  }

  const submit = httpsCallable(functions, "submitStory");
  const result = await submit(payload);
  return result.data;
}
