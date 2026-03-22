function Hero() {
  return (
    <section
      className="pt-24 min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff0f5 0%, #fce7f3 40%, #f3e8ff 100%)" }}
    >
      {/* Blobs decorativos animados */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl"
        style={{ animation: "blobMove1 8s ease-in-out infinite" }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl"
        style={{ animation: "blobMove2 10s ease-in-out infinite" }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-200 rounded-full opacity-15 blur-3xl"
        style={{ animation: "blobMove3 7s ease-in-out infinite" }} />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 gap-12 items-center relative z-10">
        {/* Conteúdo esquerdo */}
        <div className="space-y-6">
          {/* Badge */}
          <div
            className="flex items-center gap-2 text-pink-500 font-medium text-sm"
            style={{ animation: "fadeUp 0.7s ease 0.2s both" }}
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="w-4 h-4"
              style={{ animation: "spinSlow 8s linear infinite" }}
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            Bem-vinda ao teu espaço
          </div>

          {/* Título */}
          <h1
            className="text-6xl font-black leading-tight"
            style={{ animation: "fadeUp 0.7s ease 0.35s both" }}
          >
            <span className="text-gray-900">Cresça, </span>
            <span className="text-pink-500">inspire-se</span>
            <br />
            <span className="text-gray-900">e transforme </span>
            <span className="text-purple-600">sua</span>
            <br />
            <span className="text-purple-600">vida</span>
          </h1>

          {/* Descrição */}
          <p
            className="text-gray-600 text-lg leading-relaxed max-w-md"
            style={{ animation: "fadeUp 0.7s ease 0.5s both" }}
          >
            O Planet She é o teu portal de crescimento pessoal, emocional e espiritual.
            Partilha a tua história, aprende com outras mulheres e descobre ferramentas
            para te tornares a melhor versão de ti mesma.
          </p>

          {/* Botões */}
          <div
            className="flex items-center gap-4 pt-2"
            style={{ animation: "fadeUp 0.7s ease 0.65s both" }}
          >
            <a
              href="#oferecemos"
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-300 hover:scale-105 transition-all duration-300"
            >
              Explorar Conteúdos →
            </a>
            <a
              href="#"
              className="px-7 py-4 rounded-full border-2 border-pink-400 text-pink-500 font-semibold text-sm hover:bg-pink-50 hover:scale-105 transition-all duration-300"
            >
              Enviar História
            </a>
          </div>
        </div>

        {/* Imagem direita */}
        <div
          className="relative"
          style={{ animation: "fadeLeft 0.9s ease 0.4s both" }}
        >
          <div
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-100"
            style={{ animation: "float 5s ease-in-out infinite" }}
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80"
              alt="Mulher sorrindo ao computador"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-pink-200 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -z-10 bottom-10 left-10 w-60 h-60 bg-purple-200 rounded-full opacity-40 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
