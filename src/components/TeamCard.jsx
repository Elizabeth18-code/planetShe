function TeamCard({ member, index, inView }) {
  return (
    <div
      className="bg-white rounded-3xl p-8 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease`,
      }}
    >
      {/* Foto ou iniciais */}
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="w-16 h-16 rounded-2xl object-cover shadow-lg"
        />
      ) : (
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-black text-lg">{member.initials}</span>
        </div>
      )}

      {/* Info */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
        <span className="inline-block mt-1 mb-3 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold">
          {member.role}
        </span>
        <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
      </div>
    </div>
  );
}

export default TeamCard;
