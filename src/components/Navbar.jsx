import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { label: "Estudos", to: "/estudos" },
  { label: "Reflexão", to: "/reflexao" },
  { label: "Histórias", to: "/historias" },
  { label: "Partilhar", to: "/submeter-historia" },
  { label: "Projetos", to: "/projetos" },
  { label: "Contato", to: "/contato" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isHistorias =
    pathname === "/historias" || /^\/historias\/.+/.test(pathname);

  const isSubmeter = pathname === "/submeter-historia";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <Link
        to="/"
        className="flex items-center gap-2"
        style={{ animation: "fadeDown 0.6s ease both" }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>

        <span className="text-xl font-bold text-pink-500">
          Planet She
        </span>
      </Link>

      <div
        className="flex items-center gap-2"
        style={{ animation: "fadeDown 0.6s ease 0.1s both" }}
      >
        <Link
          to="/"
          className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
            isHome
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "text-gray-700 hover:text-pink-500"
          }`}
        >
          Home
        </Link>

        {navLinks.map((item) => {
          const active =
            (item.to === "/historias" && isHistorias) ||
            (item.to === "/submeter-historia" && isSubmeter);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`px-3 py-2 text-sm font-medium transition ${
                active
                  ? "text-pink-500 font-semibold"
                  : "text-gray-700 hover:text-pink-500"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        {user ? (
          <Link
            to="/perfil"
            className={`px-3 py-2 text-sm font-medium transition ${
              pathname === "/perfil"
                ? "text-pink-500 font-semibold"
                : "text-gray-700 hover:text-pink-500"
            }`}
          >
            Perfil
          </Link>
        ) : null}

        {user && isAdmin ? (
          <Link
            to="/admin"
            className={`px-3 py-2 text-sm font-medium transition ${
              pathname === "/admin"
                ? "text-pink-500 font-semibold"
                : "text-gray-700 hover:text-pink-500"
            }`}
          >
            Painel
          </Link>
        ) : null}

        {!user ? (
          <Link
            to="/admin"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              pathname === "/admin"
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "border border-pink-300 text-pink-600 hover:bg-pink-50"
            }`}
          >
            Entrar como equipa
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
