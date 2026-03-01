import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h4v1H8v-1z"/></svg>),
    bg: "from-pink-500 to-rose-500", cardBg: "bg-pink-50",
    title: "Estudos & Conteúdos",
    desc: "Artigos e resumos sobre autoconfiança, produtividade e desenvolvimento pessoal.",
    linkColor: "text-pink-500",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>),
    bg: "from-pink-400 to-pink-600", cardBg: "bg-rose-50",
    title: "Reflexão & Autoconfiança",
    desc: "Textos sobre identidade, autoestima, valores e relacionamentos.",
    linkColor: "text-pink-500",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>),
    bg: "from-purple-400 to-purple-600", cardBg: "bg-purple-50",
    title: "Partilha de Histórias",
    desc: "Um espaço seguro para partilhar a tua história e inspirar outras mulheres.",
    linkColor: "text-purple-500",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.13 15.87 0 13.3 0c-1.3 0-2.4.52-3.23 1.36L9 2.35 7.93 1.36A4.54 4.54 0 004.7 0C2.13 0 0 2.13 0 4.7c0 .44.11.86.18 1.3H0v2h20V6zm-9.4 0H4.33c-.1-.42-.13-.85-.03-1.3C4.57 2.88 5.6 2 6.7 2c.9 0 1.62.37 2.15.97L9.96 4.1l-.97.98L8.1 4.19A1.54 1.54 0 006.7 3.5c-.63 0-1.2.49-1.2 1.2 0 .45.23.86.59 1.1l.21.2H10.6zM22 10H2v12h20V10z"/></svg>),
    bg: "from-purple-500 to-indigo-500", cardBg: "bg-indigo-50",
    title: "Projetos & Ferramentas",
    desc: "Workshops, mentorias e quizzes interativos para o teu crescimento.",
    linkColor: "text-purple-500",
  },
];

const team = [
  {
    name: "Mayra Marrufo",
    role: "Gestora de Projetos",
    desc: "Lidera a visão e estratégia do Planet She, garantindo que cada projeto impacta positivamente a nossa comunidade.",
    gradient: "from-pink-400 to-rose-500",
    initials: "MM",
  },
  {
    name: "Cindy Zacarias",
    role: "Gestora de Projetos",
    desc: "Coordena equipas e processos para transformar ideias em realidade, com foco em crescimento e impacto.",
    gradient: "from-pink-500 to-purple-500",
    initials: "CZ",
  },
  {
    name: "Rilssa Sabino",
    role: "Desenvolvedora",
    desc: "Constrói as ferramentas digitais que tornam o Planet She num espaço bonito e funcional para todas.",
    gradient: "from-purple-400 to-indigo-500",
    initials: "RS",
  },
  {
    name: "Yula Muhal",
    role: "Desenvolvedora",
    desc: "Transforma design em código e garante que cada experiência no site seja fluida e intuitiva.",
    gradient: "from-indigo-400 to-purple-600",
    initials: "YM",
  },
  {
    name: "Mwedy",
    role: "Community Manager",
    desc: "A voz da comunidade — vai ao encontro das mulheres, realiza entrevistas e traz histórias reais para o Planet She.",
    gradient: "from-rose-400 to-pink-600",
    initials: "MW",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function PlanetSheHome() {
  const [scrolled, setScrolled] = useState(false);
  const [cardsRef, cardsInView] = useInView();
  const [headingRef, headingInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
    <div className="flex items-center gap-2" style={{ animation: "fadeDown 0.6s ease both" }}>
        <img src="/logo.jpeg" alt="Planet She" className="w-10 h-10 object-contain" />
        <span className="text-xl font-bold text-pink-500">Planet She</span>
     </div>
        <div className="flex items-center gap-2" style={{ animation: "fadeDown 0.6s ease 0.1s both" }}>
          <a href="#" className="px-5 py-2 rounded-full bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition">Home</a>
          {["Estudos", "Reflexão", "Histórias", "Projetos", "Blog", "Contato"].map((item) => (
            <a key={item} href="#" className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-pink-500 transition">{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 min-h-screen flex items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff0f5 0%, #fce7f3 40%, #f3e8ff 100%)" }}>
        <div className="absolute top-20 left-10 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl" style={{ animation: "blobMove1 8s ease-in-out infinite" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" style={{ animation: "blobMove2 10s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-200 rounded-full opacity-15 blur-3xl" style={{ animation: "blobMove3 7s ease-in-out infinite" }} />

        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-pink-500 font-medium text-sm" style={{ animation: "fadeUp 0.7s ease 0.2s both" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" style={{ animation: "spinSlow 8s linear infinite" }}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              Bem-vinda ao teu espaço
            </div>
            <h1 className="text-6xl font-black leading-tight" style={{ animation: "fadeUp 0.7s ease 0.35s both" }}>
              <span className="text-gray-900">Cresça, </span>
              <span className="text-pink-500">inspire-se</span>
              <br />
              <span className="text-gray-900">e transforme </span>
              <span className="text-purple-600">sua</span>
              <br />
              <span className="text-purple-600">vida</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md" style={{ animation: "fadeUp 0.7s ease 0.5s both" }}>
              O Planet She é o teu portal de crescimento pessoal, emocional e espiritual.
              Partilha a tua história, aprende com outras mulheres e descobre ferramentas
              para te tornares a melhor versão de ti mesma.
            </p>
            <div className="flex items-center gap-4 pt-2" style={{ animation: "fadeUp 0.7s ease 0.65s both" }}>
              <a href="#oferecemos" className="flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-300 hover:scale-105 transition-all duration-300">
                Explorar Conteúdos →
              </a>
              <a href="#" className="px-7 py-4 rounded-full border-2 border-pink-400 text-pink-500 font-semibold text-sm hover:bg-pink-50 hover:scale-105 transition-all duration-300">
                Enviar História
              </a>
            </div>
          </div>

          <div className="relative" style={{ animation: "fadeLeft 0.9s ease 0.4s both" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-100" style={{ animation: "float 5s ease-in-out infinite" }}>
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

      {/* O QUE OFERECEMOS */}
      <section id="oferecemos" className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={headingRef} className="text-center mb-16 space-y-4"
            style={{ opacity: headingInView ? 1 : 0, transform: headingInView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p className="text-pink-500 font-semibold tracking-widest text-sm uppercase">O QUE OFERECEMOS</p>
            <h2 className="text-5xl font-black text-gray-900">Tudo para o teu <span className="text-pink-500">crescimento</span></h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Descobre todas as ferramentas e recursos que preparámos para te ajudar a crescer pessoalmente, emocionalmente e espiritualmente.
            </p>
          </div>
          <div ref={cardsRef} className="grid grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i}
                className={`${s.cardBg} rounded-3xl p-8 flex flex-col gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
                style={{ opacity: cardsInView ? 1 : 0, transform: cardsInView ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, box-shadow 0.3s ease` }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.bg} flex items-center justify-center shadow-lg`}>{s.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <a href="#" className={`font-semibold text-sm ${s.linkColor} hover:underline mt-auto`}>Explorar →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A NOSSA EQUIPA */}
      <section className="py-24 px-8" style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div ref={teamRef} className="text-center mb-16 space-y-4"
            style={{ opacity: teamInView ? 1 : 0, transform: teamInView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p className="text-pink-500 font-semibold tracking-widest text-sm uppercase">A NOSSA EQUIPA</p>
            <h2 className="text-5xl font-black text-gray-900">As mulheres por trás do <span className="text-pink-500">Planet She</span></h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Uma equipa apaixonada, unida pelo propósito de criar um espaço seguro e inspirador para todas as mulheres.
            </p>
          </div>

          {/* Linha de 3 + linha de 2 centrada */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
              {team.slice(0, 3).map((member, i) => (
                <TeamCard key={i} member={member} i={i} inView={teamInView} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
              {team.slice(3).map((member, i) => (
                <TeamCard key={i + 3} member={member} i={i + 3} inView={teamInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 px-8 relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 40%, #a855f7 100%)" }}>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" style={{ animation: "blobMove1 8s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl" style={{ animation: "blobMove2 10s ease-in-out infinite" }} />

        <div className="text-center max-w-3xl relative z-10"
          style={{ opacity: ctaInView ? 1 : 0, transform: ctaInView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 text-white rounded-full px-4 py-2 text-sm font-medium mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" style={{ animation: "spinSlow 8s linear infinite" }}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            Junta-te a nós
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Pronta para começar a tua jornada<br />de transformação?
          </h2>
          <p className="text-white text-opacity-90 text-lg mb-10">
            Partilha a tua história, conecta-te com outras mulheres e descobre o teu potencial. O primeiro passo é teu.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="px-8 py-4 rounded-full bg-white text-pink-600 font-bold text-sm hover:scale-105 hover:shadow-xl transition-all duration-300">
              Partilhar Minha História →
            </a>
            <a href="#oferecemos" className="px-8 py-4 rounded-full bg-white bg-opacity-20 border-2 border-white text-white font-bold text-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300">
              Explorar Conteúdos
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-8" style={{ background: "linear-gradient(180deg, #3b0764 0%, #1e1b4b 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-12 mb-12">
            {/* Logo + desc */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">Planet She</span>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                Cresça, inspire-se e transforme sua vida. Um espaço para mulheres que desejam crescer pessoalmente, emocionalmente e espiritualmente.
              </p>
            </div>

            {/* Navegação */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navegação</h4>
              <div className="grid grid-cols-2 gap-2">
                {["Home", "Reflexão", "Projetos", "Estudos", "Histórias", "Blog"].map((item) => (
                  <a key={item} href="#" className="text-purple-200 text-sm hover:text-pink-400 transition">{item}</a>
                ))}
              </div>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <p className="text-purple-200 text-sm">contato@planetshe.com</p>
                <a href="#" className="text-purple-200 text-sm hover:text-pink-400 transition block">Segue-nos nas redes sociais</a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800 pt-8 text-center">
            <p className="text-purple-300 text-sm">© 2026 Planet She. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes blobMove1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.1); } }
        @keyframes blobMove2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,15px) scale(1.08); } }
        @keyframes blobMove3 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,25px) scale(0.95); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function TeamCard({ member, i, inView }) {
  return (
    <div
      className="bg-white rounded-3xl p-8 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s ease`,
      }}
    >
      {/* Avatar com iniciais */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}>
        <span className="text-white font-black text-lg">{member.initials}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
        <span className="inline-block mt-1 mb-3 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold">{member.role}</span>
        <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
      </div>
    </div>
  );
}
