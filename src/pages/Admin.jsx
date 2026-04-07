import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchPrivateStories,
  publishStoryCall,
  reviewStoryCall,
} from "../api/adminApi";
import { useAuth } from "../hooks/useAuth";

const STATE_LABELS = {
  received: "Recebida",
  in_review: "Em revisão",
  approved: "Aprovada",
  rejected: "Reprovada",
  published: "Publicada",
};

function formatTs(ts) {
  if (!ts) return "—";
  try {
    const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat("pt-PT", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  } catch {
    return "—";
  }
}

function firebaseErr(e) {
  return e?.message || "Erro desconhecido.";
}

function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(
        err?.code === "auth/invalid-credential"
          ? "Email ou palavra-passe incorretos."
          : firebaseErr(err),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Entrar — equipa</h2>
      <p className="text-sm text-gray-600 mb-6">Usa a conta com permissão em admin_users.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </div>
        ) : null}
        <div>
          <label htmlFor="admin-email" className="block text-xs font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-xs font-medium text-gray-700 mb-1">
            Palavra-passe
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-pink-500 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? "A entrar…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}

function StoryRow({ story, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const state = story.state || "received";
  const content = story.private_content || "";
  const canPublish =
    state === "approved" && story.consents?.publication === true && state !== "published";

  async function review(decision) {
    setBusy(true);
    setMsg(null);
    try {
      await reviewStoryCall({
        storyId: story.id,
        decision,
        internal_comment: comment.trim() || null,
      });
      setComment("");
      setMsg("Guardado.");
      await onRefresh();
    } catch (e) {
      setMsg(firebaseErr(e));
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    setBusy(true);
    setMsg(null);
    try {
      await publishStoryCall({ storyId: story.id });
      setMsg("Publicada.");
      await onRefresh();
    } catch (e) {
      setMsg(firebaseErr(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex flex-wrap items-start justify-between gap-3 text-left px-4 py-4 hover:bg-gray-50"
      >
        <div>
          <p className="font-mono text-xs text-gray-400">{story.id}</p>
          <p className="text-sm text-gray-800 line-clamp-2 mt-1">{content.slice(0, 160)}…</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            state === "published"
              ? "bg-green-100 text-green-800"
              : state === "rejected"
                ? "bg-red-100 text-red-800"
                : state === "approved"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-gray-100 text-gray-700"
          }`}
        >
          {STATE_LABELS[state] || state}
        </span>
      </button>

      {open ? (
        <div className="border-t border-gray-100 px-4 py-4 space-y-4 bg-gray-50/80">
          <p className="text-xs text-gray-500">Criada: {formatTs(story.createdAt)}</p>
          <div className="text-sm text-gray-800 whitespace-pre-wrap">{content}</div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">
              Visibilidade: {story.visibility === "public" ? "pública" : "privada"}
            </span>
            {story.category ? (
              <span className="text-xs text-gray-500">· {story.category}</span>
            ) : null}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Comentário interno (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              disabled={busy}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              placeholder="Notas só para a equipa…"
            />
          </div>

          {msg ? <p className="text-sm text-pink-700">{msg}</p> : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy || state === "approved"}
              onClick={() => review("approved")}
              className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
            >
              Aprovar
            </button>
            <button
              type="button"
              disabled={busy || state === "rejected"}
              onClick={() => review("rejected")}
              className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-40"
            >
              Reprovar
            </button>
            <button
              type="button"
              disabled={busy || state === "in_review"}
              onClick={() => review("in_review")}
              className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-40"
            >
              Em revisão
            </button>
            {canPublish ? (
              <button
                type="button"
                disabled={busy}
                onClick={publish}
                className="rounded-full bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700"
              >
                Publicar no site
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdminDashboard() {
  const { signOut } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const list = await fetchPrivateStories();
      setStories(list);
    } catch (e) {
      setError(firebaseErr(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const total = stories.length;
  const receivedCount = stories.filter((s) => (s.state || "received") === "received").length;
  const inReviewCount = stories.filter((s) => s.state === "in_review").length;
  const publishedCount = stories.filter((s) => s.state === "published").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Histórias recebidas</h2>
          <p className="text-sm text-gray-600">Lê, altera o estado e publica quando estiver aprovada.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => load()}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            Sair
          </button>
        </div>
      </div>
      {!loading && !error ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <p className="text-xs uppercase tracking-wider text-gray-500">Total</p>
            <p className="mt-1 text-2xl font-black text-gray-900">{total}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p className="text-xs uppercase tracking-wider text-amber-700">Pendentes</p>
            <p className="mt-1 text-2xl font-black text-amber-800">{receivedCount}</p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4">
            <p className="text-xs uppercase tracking-wider text-blue-700">Em revisão</p>
            <p className="mt-1 text-2xl font-black text-blue-800">{inReviewCount}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
            <p className="text-xs uppercase tracking-wider text-emerald-700">Publicadas</p>
            <p className="mt-1 text-2xl font-black text-emerald-800">{publishedCount}</p>
          </div>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">A carregar…</p>
      ) : error ? (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      ) : stories.length === 0 ? (
        <p className="text-sm text-gray-600">Nenhuma história em stories_private.</p>
      ) : (
        <div className="space-y-3">
          {stories.map((s) => (
            <StoryRow key={s.id} story={s} onRefresh={load} />
          ))}
        </div>
      )}
    </div>
  );
}

function Admin() {
  const { user, isAdmin, ready, firebaseOk, signOut } = useAuth();

  if (!firebaseOk) {
    return (
      <main className="pt-28 pb-16 px-4 min-h-screen">
        <div className="max-w-xl mx-auto text-center text-gray-600">
          <p>Configura o Firebase no <code className="bg-gray-100 px-1 rounded">.env</code>.</p>
          <Link to="/" className="mt-4 inline-block text-pink-600 font-semibold">
            Voltar ao site
          </Link>
        </div>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="pt-28 pb-16 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">A carregar sessão…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="pt-24 pb-16 px-4 min-h-screen bg-gray-50">
        <AdminLogin />
        <p className="text-center mt-8">
          <Link to="/" className="text-sm text-pink-600 hover:underline">
            Voltar ao site
          </Link>
        </p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="pt-28 pb-16 px-4 min-h-screen">
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-gray-800 font-medium">Esta conta não tem permissão de administradora.</p>
          <p className="text-sm text-gray-600">
            O teu utilizador precisa de um documento <code className="bg-gray-100 px-1 rounded text-xs">admin_users/{user.uid}</code> com{" "}
            <code className="bg-gray-100 px-1 rounded text-xs">active: true</code>.
          </p>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-white"
          >
            Sair
          </button>
          <p>
            <Link to="/" className="text-sm text-pink-600 hover:underline">
              Voltar ao site
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 px-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-pink-500">Planet She</p>
            <h1 className="text-2xl font-black text-gray-900">Painel da equipa</h1>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          </div>
          <Link to="/historias" className="text-sm font-semibold text-pink-600 hover:underline">
            Ver site público →
          </Link>
          <Link to="/perfil" className="text-sm font-semibold text-pink-600 hover:underline">
            Ver perfil →
          </Link>
        </header>
        <AdminDashboard />
      </div>
    </main>
  );
}

export default Admin;
