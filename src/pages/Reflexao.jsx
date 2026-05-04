import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dados dos artigos — edita aqui para adicionar novos
const artigos = [
  {
    id: 1,
    categoria: "Autoestima",
    titulo: "Aprender a amar-te antes de amar o mundo",
    resumo: "A relação que tens contigo mesma define todas as outras relações da tua vida. Descobre como construir uma base sólida de autoamor e confiança.",
    foto: null,
    autora: "Mwedy Jeremias",
    data: "20 de Março, 2026",
    tempoLeitura: "5 min",
  },
  {
    id: 2,
    categoria: "Identidade",
    titulo: "Quem és tu para além dos teus papéis?",
    resumo: "Mãe, filha, profissional... mas quem és tu quando estás sozinha? Uma reflexão sobre identidade além das expectativas sociais.",
    foto: null,
    autora: "Cindy Zacarias",
    data: "15 de Março, 2026",
    tempoLeitura: "4 min",
  },
  {
    id: 3,
    categoria: "Relacionamentos",
    titulo: "Limites saudáveis: o ato de amor mais poderoso",
    resumo: "Dizer não não é egoísmo — é respeito próprio. Aprende a estabelecer limites sem culpa e com amor.",
    foto: null,
    autora: "Mayra Marrufo",
    data: "10 de Março, 2026",
    tempoLeitura: "6 min",
  },
  {
    id: 4,
    categoria: "Espiritualidade",
    titulo: "Encontrar paz interior no caos do dia a dia",
    resumo: "Pequenas práticas diárias que te ajudam a manter a calma, o foco e a gratidão mesmo nos momentos mais difíceis.",
    foto: null,
    autora: "Mwedy Jeremias",
    data: "5 de Março, 2026",
    tempoLeitura: "7 min",
  },
  {
    id: 5,
    categoria: "Autoconfiança",
    titulo: "A síndrome do impostor e como superá-la",
    resumo: "Sentir que não mereces o teu lugar é mais comum do que pensas. Vamos falar sobre isso e encontrar o caminho para a confiança real.",
    foto: null,
    autora: "Cindy Zacarias",
    data: "1 de Março, 2026",
    tempoLeitura: "5 min",
  },
  {
    id: 6,
    categoria: "Valores",
    titulo: "Viver alinhada com os teus valores",
    resumo: "Quando as tuas ações estão em conflito com o que valorizas, sentes um vazio. Descobre como alinhar a tua vida com o que realmente importa.",
    foto: null,
    autora: "Mayra Marrufo",
    data: "25 de Fevereiro, 2026",
    tempoLeitura: "6 min",
  },
];

const categorias = ["Todas", "Autoestima", "Identidade", "Relacionamentos", "Espiritualidade", "Autoconfiança", "Valores"];

const categoryColors = {
  Autoestima: "bg-pink-100 text-pink-600",
  Identidade: "bg-purple-100 text-purple-600",
  Relacionamentos: "bg-rose-100 text-rose-600",
  Espiritualidade: "bg-indigo-100 text-indigo-600",
  Autoconfiança: "bg-fuchsia-100 text-fuchsia-600",
  Valores: "bg-violet-100 text-violet-600",
};

function ArtigoCard({ artigo, destaque = false }) {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex ${destaque ? "flex-row" : "flex-col"}`}>
      {/* Foto ou placeholder */}
      <div className={`bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center ${destaque ? "w-72 shrink-0" : "h-48 w-full"}`}>
        {artigo.foto ? (
          <img src={artigo.foto} alt={artigo.titulo} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-pink-300">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[artigo.categoria]}`}>
            {artigo.categoria}
          </span>
          <span className="text-gray-400 text-xs">{artigo.tempoLeitura} de leitura</span>
        </div>

        <h3 className={`font-black text-gray-900 leading-tight ${destaque ? "text-2xl" : "text-lg"}`}>
          {artigo.titulo}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">{artigo.resumo}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{artigo.autora.charAt(0)}</span>
            </div>
            <span className="text-gray-600 text-xs font-medium">{artigo.autora}</span>
          </div>
          <span className="text-gray-400 text-xs">{artigo.data}</span>
        </div>

        <a href="#" className="text-pink-500 text-sm font-semibold hover:underline">
          Ler artigo →
        </a>
      </div>
    </div>
  );
}

function Reflexao() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* HERO da página */}
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
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Reflexão & Autoconfiança
          </span>
          <h1 className="text-5xl font-black text-gray-900">
            Textos que te fazem <span className="text-pink-500">pensar</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Artigos sobre identidade, autoestima, valores e relacionamentos — escritos para te inspirar a crescer por dentro.
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

      {/* ARTIGOS */}
      <section className="py-16 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)" }}>
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Artigo em destaque */}
          <div>
            <p className="text-pink-500 font-semibold tracking-widest text-xs uppercase mb-6">Em Destaque</p>
            <ArtigoCard artigo={artigos[0]} destaque={true} />
          </div>

          {/* Grid de artigos */}
          <div>
            <p className="text-pink-500 font-semibold tracking-widest text-xs uppercase mb-6">Mais Artigos</p>
            <div className="grid grid-cols-3 gap-6">
              {artigos.slice(1).map((artigo) => (
                <ArtigoCard key={artigo.id} artigo={artigo} />
              ))}
            </div>
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

export default Reflexao;
