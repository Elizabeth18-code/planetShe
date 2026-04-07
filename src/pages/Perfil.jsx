import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Perfil() {
  const { user, isAdmin, ready, firebaseOk, signOut } = useAuth();

  if (!firebaseOk) {
    return (
      <main className="pt-28 pb-16 px-4 min-h-screen">
        <div className="max-w-xl mx-auto text-center text-gray-600">
          <p>
            Configura o Firebase no <code className="bg-gray-100 px-1 rounded">.env</code>.
          </p>
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
      <main className="pt-28 pb-16 px-4 min-h-screen">
        <div className="max-w-xl mx-auto text-center text-gray-600 space-y-4">
          <p>Inicia sessão para veres o teu perfil.</p>
          <Link to="/admin" className="inline-block text-pink-600 font-semibold hover:underline">
            Entrar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 px-4 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-pink-500">Conta</p>
        <h1 className="mt-2 text-2xl font-black text-gray-900">O teu perfil</h1>
        <div className="mt-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              isAdmin ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"
            }`}
          >
            {isAdmin ? "Admin ativa" : "Conta padrão"}
          </span>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Email:</span> {user.email || "—"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">UID:</span> {user.uid}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Tipo de conta:</span>{" "}
            {isAdmin ? "Administradora" : "Utilizadora"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {isAdmin ? (
            <Link
              to="/admin"
              className="rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-700"
            >
              Ir para painel admin
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            Sair
          </button>
        </div>
      </div>
    </main>
  );
}

export default Perfil;
