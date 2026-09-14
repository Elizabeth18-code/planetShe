function Contato() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-32 pb-16 px-8 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff0f5 0%, #fce7f3 50%, #f3e8ff 100%)" }}
      >
        <div className="absolute top-10 left-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl"
          style={{ animation: "blobMove1 8s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"
          style={{ animation: "blobMove2 10s ease-in-out infinite" }} />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-4 py-2 text-sm font-semibold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contacto
          </span>
          <h1 className="text-5xl font-black text-gray-900">
            Fala <span className="text-pink-500">connosco</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Tens uma questão, sugestão ou queres colaborar? Estamos aqui para ti.
          </p>
        </div>
      </section>

      {/* CONTACTOS */}
      <section className="py-20 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)" }}>
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Email */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Email</p>
              <a href="mailto:contato@planetshe.com" className="text-xl font-bold text-gray-900 hover:text-pink-500 transition">
                contato@planetshe.com
              </a>
              <p className="text-gray-400 text-sm mt-1">Respondemos em até 48 horas</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Instagram</p>
              <a href="https://instagram.com/planetshe" target="_blank" rel="noreferrer" className="text-xl font-bold text-gray-900 hover:text-pink-500 transition">
                @planetshe {/* ← substitui pelo vosso username */}
              </a>
              <p className="text-gray-400 text-sm mt-1">Segue-nos para conteúdo diário</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">LinkedIn</p>
              <a href="https://linkedin.com/company/planetshe" target="_blank" rel="noreferrer" className="text-xl font-bold text-gray-900 hover:text-blue-500 transition">
                Planet She {/* ← substitui pelo vosso link */}
              </a>
              <p className="text-gray-400 text-sm mt-1">Conecta-te com a nossa equipa</p>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes blobMove1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.1); } }
        @keyframes blobMove2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,15px) scale(1.08); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

export default Contato;
