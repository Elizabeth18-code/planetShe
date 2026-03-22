import useInView from "../hooks/useInView";
import { services } from "../data/services";
import ServiceIcon from "./ServiceIcon";

function Services() {
  const [headingRef, headingInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  return (
    <section id="oferecemos" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div
          ref={headingRef}
          className="text-center mb-16 space-y-4"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="text-pink-500 font-semibold tracking-widest text-sm uppercase">
            O QUE OFERECEMOS
          </p>
          <h2 className="text-5xl font-black text-gray-900">
            Tudo para o teu <span className="text-pink-500">crescimento</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Descobre todas as ferramentas e recursos que preparámos para te ajudar a crescer
            pessoalmente, emocionalmente e espiritualmente.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`${service.cardBg} rounded-3xl p-8 flex flex-col gap-5 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
              style={{
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, box-shadow 0.3s ease`,
              }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.bg} flex items-center justify-center shadow-lg`}>
                <ServiceIcon name={service.icon} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
              <a href="#" className={`font-semibold text-sm ${service.linkColor} hover:underline mt-auto`}>
                Explorar →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
