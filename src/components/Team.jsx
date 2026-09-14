import useInView from "../hooks/useInView";
import { team } from "../data/team";
import TeamCard from "./TeamCard";

function Team() {
  const [headingRef, headingInView] = useInView();
  const [teamRef, teamInView] = useInView();

  return (
    <section
      id="equipa"
      className="py-24 px-8"
      style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%)" }}
    >
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
            A NOSSA EQUIPA
          </p>
          <h2 className="text-5xl font-black text-gray-900">
            As mulheres por trás do <span className="text-pink-500">Planet She</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Uma equipa apaixonada, unida pelo propósito de criar um espaço seguro
            e inspirador para todas as mulheres.
          </p>
        </div>

        {/* Cards — 3 em cima, 2 centrados em baixo */}
        <div ref={teamRef} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-6">
            {team.slice(0, 3).map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} inView={teamInView} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
            {team.slice(3).map((member, index) => (
              <TeamCard key={member.name} member={member} index={index + 3} inView={teamInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Team;
