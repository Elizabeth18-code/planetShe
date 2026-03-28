import useInView from "../hooks/useInView";

function CTA() {
  const [ctaRef, ctaInView] = useInView();

  return (
    <section
      id="contato"
      ref={ctaRef}
      className="py-28 px-8 relative overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 40%, #a855f7 100%)" }}
    >
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl"
        style={{ animation: "blobMove1 8s ease-in-out infinite" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"
        style={{ animation: "blobMove2 10s ease-in-out infinite" }} />

      
      <div
        className="text-center max-w-3xl relative z-10"
        style={{
          opacity: ctaInView ? 1 : 0,
          transform: ctaInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        
        <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 text-white rounded-full px-4 py-2 text-sm font-medium mb-8">
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-4 h-4"
            style={{ animation: "spinSlow 8s linear infinite" }}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          Junta-te a nós
        </div>

        <h2 className="text-5xl font-black text-white leading-tight mb-6">
          Pronta para começar a tua jornada<br />de transformação?
        </h2>

        <p className="text-white text-opacity-90 text-lg mb-10">
          Partilha a tua história, conecta-te com outras mulheres e descobre o teu potencial.
          O primeiro passo é teu.
        </p>

        
        <div className="flex items-center justify-center gap-4">
          <a
            href="#"
            className="px-8 py-4 rounded-full bg-white text-pink-600 font-bold text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Partilhar Minha História →
          </a>
          <a
            href="#oferecemos"
            className="px-8 py-4 rounded-full bg-white bg-opacity-20 border-2 border-white text-white font-bold text-sm hover:bg-opacity-30 hover:scale-105 transition-all duration-300"
          >
            Explorar Conteúdos
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
