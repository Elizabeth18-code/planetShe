import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const conteudos = [
  {
    id: 1,
    tipo: "Artigo",
    categoria: "Desenvolvimento pessoal",
    titulo: "Como criar hábitos que realmente duram",
    desc: "Descobre a ciência por trás da formação de hábitos e como aplicá-la na tua vida de forma prática e sustentável.",
    duracao: "8 min leitura",
    autora: "Mayra Marrufo",
    foto: null,
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    tipo: "Vídeo",
    categoria: "Autoconfiança",
    titulo: "Falar em público sem medo",
    desc: "Técnicas práticas para comunicares com confiança em reuniões, apresentações e no dia a dia profissional.",
    duracao: "12 min vídeo",
    autora: "Cindy Zacarias",
    foto: null,
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    id: 3,
    tipo: "Recurso",
    categoria: "Produtividade",
    titulo: "Guia de gestão do tempo para mulheres ocupadas",
    desc: "Um guia completo com ferramentas, templates e estratégias para organizar o teu tempo sem perder a sanidade.",
    duracao: "Download gratuito",
    autora: "Rilssa Sabino",
    foto: null,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    id: 4,
    tipo: "Artigo",
    categoria: "Saúde mental",
    titulo: "Ansiedade no trabalho: como reconhecer e gerir",
    desc: "Sinais de alerta, estratégias de gestão e quando procurar ajuda profissional. Um guia honesto sobre saúde mental no trabalho.",
    duracao: "10 min leitura",
    autora: "Mwedy Jeremias",
    foto: null,
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: 5,
    tipo: "Vídeo",
    categoria: "Carreira",
    titulo: "Como negociar o teu salário com confiança",
    desc: "Estratégias concretas para negociar melhor remuneração, com exemplos reais de como abordar a conversa.",
    duracao: "15 min vídeo",
    autora: "Mayra Marrufo",
    foto: null,
    gradient: "from-indigo-400 to-purple-600",
  },
  {
    id: 6,
    tipo: "Recurso",
    categoria: "Desenvolvimento pessoal",
    titulo: "Diário de gratidão — template semanal",
    desc: "Um template simples e bonito para praticares gratidão diariamente e notares mudanças positivas na tua vida.",
    duracao: "Download gratuito",
    autora: "Cindy Zacarias",
    foto: null,
    gradient: "from-violet-400 to-purple-500",
  },
];

const categorias = ["Todas", "Desenvolvimento pessoal", "Produtividade", "Autoconfiança", "Saúde mental", "Carreira"];

const tipoConfig = {
  Artigo: { color: "bg-pink-100 text-pink-600", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )},
  Vídeo: { color: "bg-purple-100 text-purple-600", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  Recurso: { color: "bg-indigo-100 text-indigo-600", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )},
};

function ConteudoCard({ conteudo }) {
  const tipo = tipoConfig[conteudo.tipo];
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Imagem ou gradiente */}
      <div className={`h-44 bg-gradient-to-br ${conteudo.gradient} flex items-center justify-center relative`}>
        {conteudo.foto ? (
          <img src={conteudo.foto} alt={conteudo.titulo} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-12 h-12 opacity-50">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
        {/* Tipo badge */}
        <span className={`absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${tipo.color}`}>
          {tipo.icon} {conteudo.tipo}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{conteudo.categoria}</span>
        <h3 className="text-lg font-black text-gray-900 leading-tight">{conteudo.titulo}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{conteudo.desc}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{conteudo.autora.charAt(0)}</span>
            </div>
            <span className="text-gray-500 text-xs">{conteudo.autora}</span>
          </div>
          <span className="text-gray-400 text-xs">{conteudo.duracao}</span>
        </div>

        <a href="#" className="text-pink-500 text-sm font-semibold hover:underline">
          {conteudo.tipo === "Recurso" ? "Descarregar →" : "Ver conteúdo →"}
        </a>
      </div>
    </div>
  );
}

function Estudos() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

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
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Estudos & Conteúdos
          </span>
          <h1 className="text-5xl font-black text-gray-900">
            Aprende e <span className="text-pink-500">cresce</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Artigos, vídeos e recursos gratuitos sobre autoconfiança, produtividade, saúde mental e carreira.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="py-8 px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                cat === "Todas"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* CONTEÚDOS */}
      <section className="py-16 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {conteudos.map((c) => (
              <ConteudoCard key={c.id} conteudo={c} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blobMove1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.1); } }
        @keyframes blobMove2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,15px) scale(1.08); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Estudos;
