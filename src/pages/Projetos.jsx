import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const projetos = [
  {
    id: 1,
    tipo: "Projecto",
    titulo: "She Talks",
    desc: "Um espaço de conversas abertas onde mulheres partilham as suas histórias, desafios e conquistas em sessões mensais.",
    status: "Em curso",
    statusColor: "bg-green-100 text-green-600",
    foto: null,
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    tipo: "Workshop",
    titulo: "Autoconfiança na Prática",
    desc: "Workshop intensivo de um dia focado em ferramentas práticas para construir autoconfiança no trabalho e nas relações pessoais.",
    status: "Próximamente",
    statusColor: "bg-yellow-100 text-yellow-600",
    foto: null,
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    id: 3,
    tipo: "Iniciativa",
    titulo: "Mentoria She Grows",
    desc: "Programa de mentoria que conecta mulheres experientes com jovens profissionais que estão a iniciar a sua jornada.",
    status: "Em curso",
    statusColor: "bg-green-100 text-green-600",
    foto: null,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    id: 4,
    tipo: "Evento",
    titulo: "Planet She Summit",
    desc: "Evento anual que reúne mulheres inspiradoras para partilhar conhecimento, experiências e criar conexões significativas.",
    status: "Em breve",
    statusColor: "bg-blue-100 text-blue-600",
    foto: null,
    gradient: "from-indigo-400 to-purple-600",
  },
  {
    id: 5,
    tipo: "Workshop",
    titulo: "Finanças para Mulheres",
    desc: "Workshop prático sobre independência financeira, investimentos e como gerir o dinheiro com confiança e estratégia.",
    status: "Próximamente",
    statusColor: "bg-yellow-100 text-yellow-600",
    foto: null,
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: 6,
    tipo: "Iniciativa",
    titulo: "She Reads",
    desc: "Clube do livro mensal focado em obras escritas por mulheres ou que abordam temas de crescimento pessoal e feminismo.",
    status: "Em curso",
    statusColor: "bg-green-100 text-green-600",
    foto: null,
    gradient: "from-violet-400 to-purple-500",
  },
];

const tipos = ["Todos", "Projecto", "Workshop", "Iniciativa", "Evento"];

const tipoColors = {
  Projecto: "bg-pink-100 text-pink-600",
  Workshop: "bg-purple-100 text-purple-600",
  Iniciativa: "bg-indigo-100 text-indigo-600",
  Evento: "bg-rose-100 text-rose-600",
};

function ProjetoCard({ projeto }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Imagem ou gradiente */}
      <div className={`h-48 bg-gradient-to-br ${projeto.gradient} flex items-center justify-center relative`}>
        {projeto.foto ? (
          <img src={projeto.foto} alt={projeto.titulo} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-14 h-14 opacity-50">
            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
        {/* Status badge */}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${projeto.statusColor}`}>
          {projeto.status}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold ${tipoColors[projeto.tipo]}`}>
          {projeto.tipo}
        </span>
        <h3 className="text-xl font-black text-gray-900">{projeto.titulo}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{projeto.desc}</p>
        <a href="#" className="text-pink-500 text-sm font-semibold hover:underline mt-2">
          Saber mais →
        </a>
      </div>
    </div>
  );
}

function Projetos() {
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
          <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 text-sm font-semibold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Projectos & Iniciativas
          </span>
          <h1 className="text-5xl font-black text-gray-900">
            O que estamos a <span className="text-purple-600">construir</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Workshops, eventos, mentorias e iniciativas pensadas para te ajudar a crescer e conectar com outras mulheres.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="py-8 px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tipo === "Todos"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </section>

      {/* GRID DE PROJECTOS */}
      <section className="py-16 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {projetos.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
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

export default Projetos;
