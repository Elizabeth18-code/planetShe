import { useState } from "react";
import { Link } from "react-router-dom";
import { submitStoryCall } from "../api/submitStory";
import { isFirebaseConfigured } from "../firebase.js";

const VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const AUTHOR_MODE = {
  ANONYMOUS: "anonymous",
  PSEUDONYM: "pseudonym",
  IDENTIFIABLE: "identifiable",
};

function firebaseErrorMessage(error) {
  const code = error?.code;
  const msg = error?.message || "";
  if (code === "functions/resource-exhausted") {
    return "Muitas tentativas em pouco tempo. Espera um minuto e tenta de novo.";
  }
  if (code === "functions/failed-precondition") {
    return msg || "Não foi possível concluir o pedido. Verifica os consentimentos.";
  }
  if (code === "functions/invalid-argument") {
    return msg || "Dados inválidos. Revisa o formulário.";
  }
  if (code === "functions/unavailable") {
    return "Serviço temporariamente indisponível. Tenta mais tarde.";
  }
  return msg || "Ocorreu um erro ao enviar. Tenta novamente.";
}

function SubmeterHistoria() {
  const [privateContent, setPrivateContent] = useState("");
  const [visibility, setVisibility] = useState(VISIBILITY.PRIVATE);
  const [readingTeam, setReadingTeam] = useState(true);
  const [publication, setPublication] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [supportRequest, setSupportRequest] = useState(false);
  const [authorMode, setAuthorMode] = useState(AUTHOR_MODE.ANONYMOUS);
  const [pseudonym, setPseudonym] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const contentLen = privateContent.trim().length;
  const contentOk = contentLen >= 30;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isFirebaseConfigured()) {
      setError("Adiciona as credenciais Firebase ao ficheiro .env (ver .env.example).");
      return;
    }

    if (!contentOk) {
      setError("O texto da história precisa de pelo menos 30 caracteres.");
      return;
    }

    if (visibility === VISIBILITY.PUBLIC && !publication) {
      setError('Para visibilidade "pública", é obrigatório aceitar a publicação.');
      return;
    }

    if (authorMode === AUTHOR_MODE.PSEUDONYM && !pseudonym.trim()) {
      setError("Indica um pseudónimo.");
      return;
    }

    if (authorMode === AUTHOR_MODE.IDENTIFIABLE && !contact.trim()) {
      setError("Indica um contacto (email ou outro) para o modo identificável.");
      return;
    }

    const payload = {
      private_content: privateContent.trim(),
      visibility,
      consents: {
        reading_team: readingTeam,
        publication,
        contact: contactConsent,
        support_request: supportRequest,
      },
      author: {
        mode: authorMode,
        pseudonym: authorMode === AUTHOR_MODE.PSEUDONYM ? pseudonym.trim() : null,
        contact: authorMode === AUTHOR_MODE.IDENTIFIABLE ? contact.trim() : null,
      },
      origin: "web",
      category: "general",
      risk_level: "undefined",
    };

    setSubmitting(true);
    try {
      const data = await submitStoryCall(payload);
      setSuccess(data);
      setPrivateContent("");
      setPublication(false);
      setPseudonym("");
      setContact("");
    } catch (err) {
      setError(firebaseErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="pt-24 pb-16 px-4 sm:px-8 min-h-screen bg-gradient-to-b from-pink-50/80 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-pink-500 font-semibold tracking-widest text-xs uppercase mb-2">
            Partilha segura
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Submeter uma história</h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            O teu relato é tratado com cuidado. Podes escolher anonimato, pseudónimo ou identificação
            — e definir se queres que possa ser lido pela equipa ou publicado no futuro, conforme os
            consentimentos abaixo.
          </p>
          <Link
            to="/historias"
            className="inline-block mt-4 text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Ver histórias publicadas
          </Link>
        </div>

        {!isFirebaseConfigured() ? (
          <div
            className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="status"
          >
            <strong className="font-semibold">Firebase não configurado.</strong> Copia{" "}
            <code className="rounded bg-amber-100/80 px-1">.env.example</code> para{" "}
            <code className="rounded bg-amber-100/80 px-1">.env</code> e preenche com os dados da app
            Web no Firebase Console.
          </div>
        ) : null}

        {success ? (
          <div
            className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center space-y-3"
            role="status"
          >
            <p className="text-lg font-semibold text-green-900">História recebida com sucesso.</p>
            <p className="text-green-800 text-sm">
              A tua mensagem foi registada. A equipa pode entrar em contacto segundo as opções que
              escolheste.
            </p>
            {success.storyId ? (
              <p className="text-xs text-green-700/80 font-mono">Ref.: {success.storyId}</p>
            ) : null}
            <div className="pt-4 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => setSuccess(null)}
                className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600"
              >
                Enviar outra história
              </button>
              <Link
                to="/historias"
                className="rounded-full border border-pink-300 px-5 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-50"
              >
                Ir para Histórias
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-10 rounded-3xl border border-pink-100 bg-white p-6 sm:p-10 shadow-sm"
          >
            {error ? (
              <div
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <section className="space-y-3">
              <label htmlFor="story-content" className="block text-sm font-semibold text-gray-900">
                A tua história
              </label>
              <textarea
                id="story-content"
                value={privateContent}
                onChange={(e) => setPrivateContent(e.target.value)}
                rows={12}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                placeholder="Escreve com as tuas palavras (mínimo 30 caracteres)."
                required
                disabled={submitting}
              />
              <p className="text-xs text-gray-500">
                {contentLen} caracteres
                {!contentOk ? ` — faltam ${10000 - contentLen} para o mínimo` : " — ok"}
              </p>
            </section>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-gray-900">Visibilidade</legend>
              <p className="text-xs text-gray-500">
                &quot;Pública&quot; significa que poderá ser considerada para publicação no site,
                desde que aceites o consentimento de publicação.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === VISIBILITY.PRIVATE}
                    onChange={() => setVisibility(VISIBILITY.PRIVATE)}
                    disabled={submitting}
                    className="text-pink-500 focus:ring-pink-400"
                  />
                  Privada (só equipa / processo interno)
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === VISIBILITY.PUBLIC}
                    onChange={() => {
                      setVisibility(VISIBILITY.PUBLIC);
                      setPublication(true);
                    }}
                    disabled={submitting}
                    className="text-pink-500 focus:ring-pink-400"
                  />
                  Pública (pode ser publicada, com consentimento)
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-3 border-t border-pink-100 pt-8">
              <legend className="text-sm font-semibold text-gray-900">Consentimentos</legend>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={readingTeam}
                  onChange={(e) => setReadingTeam(e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 text-pink-500 focus:ring-pink-400"
                />
                <span>Autorizo a equipa Planet She a ler esta história para acompanhamento.</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={publication}
                  onChange={(e) => setPublication(e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 text-pink-500 focus:ring-pink-400"
                />
                <span>
                  Aceito que a minha história possa ser publicada (obrigatório se escolheres
                  visibilidade pública).
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={contactConsent}
                  onChange={(e) => setContactConsent(e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 text-pink-500 focus:ring-pink-400"
                />
                <span>Autorizo contacto da equipa, se necessário.</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={supportRequest}
                  onChange={(e) => setSupportRequest(e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 text-pink-500 focus:ring-pink-400"
                />
                <span>Quero indicar que procuro apoio ou acompanhamento.</span>
              </label>
            </fieldset>

            <fieldset className="space-y-4 border-t border-pink-100 pt-8">
              <legend className="text-sm font-semibold text-gray-900">Como queres aparecer?</legend>
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="authorMode"
                    checked={authorMode === AUTHOR_MODE.ANONYMOUS}
                    onChange={() => setAuthorMode(AUTHOR_MODE.ANONYMOUS)}
                    disabled={submitting}
                    className="text-pink-500"
                  />
                  Anónima
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="authorMode"
                    checked={authorMode === AUTHOR_MODE.PSEUDONYM}
                    onChange={() => setAuthorMode(AUTHOR_MODE.PSEUDONYM)}
                    disabled={submitting}
                    className="text-pink-500"
                  />
                  Pseudónimo
                </label>
                {authorMode === AUTHOR_MODE.PSEUDONYM ? (
                  <input
                    type="text"
                    value={pseudonym}
                    onChange={(e) => setPseudonym(e.target.value)}
                    placeholder="O teu pseudónimo"
                    disabled={submitting}
                    className="ml-6 max-w-md rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                  />
                ) : null}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="authorMode"
                    checked={authorMode === AUTHOR_MODE.IDENTIFIABLE}
                    onChange={() => setAuthorMode(AUTHOR_MODE.IDENTIFIABLE)}
                    disabled={submitting}
                    className="text-pink-500"
                  />
                  Identificável (contacto visível para a equipa)
                </label>
                {authorMode === AUTHOR_MODE.IDENTIFIABLE ? (
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email ou telefone"
                    autoComplete="email"
                    disabled={submitting}
                    className="ml-6 max-w-md rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                  />
                ) : null}
              </div>
            </fieldset>

            <div className="border-t border-pink-100 pt-8">
              <button
                type="submit"
                disabled={submitting || !contentOk}
                className="w-full rounded-full bg-pink-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
              >
                {submitting ? "A enviar…" : "Enviar história"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default SubmeterHistoria;
