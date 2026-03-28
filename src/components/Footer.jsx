import { Link } from "react-router-dom";

const footerNav = [
  { label: "Home", to: "/" },
  { label: "Histórias", to: "/historias" },
  { label: "Partilhar história", to: "/submeter-historia" },
  { label: "Estudos", to: "/#oferecemos" },
  { label: "Reflexão", to: "/#oferecemos" },
  { label: "Projetos", to: "/#equipa" },
  { label: "Blog", to: "/historias" },
];

function Footer() {
  return (
    <footer
      className="py-16 px-8"
      style={{ background: "linear-gradient(180deg, #3b0764 0%, #1e1b4b 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-12 mb-12">
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
              Cresça, inspire-se e transforme sua vida. Um espaço para mulheres que desejam crescer
              pessoalmente, emocionalmente e espiritualmente.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-purple-200 text-sm hover:text-pink-400 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-2">
              <p className="text-purple-200 text-sm">contato@planetshe.com</p>
              <a href="#" className="text-purple-200 text-sm hover:text-pink-400 transition block">
                Segue-nos nas redes sociais
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800 pt-8 text-center">
          <p className="text-purple-300 text-sm">© 2026 Planet She. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
