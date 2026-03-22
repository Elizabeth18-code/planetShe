import { useState, useEffect } from "react";

const navLinks = ["Estudos", "Reflexão", "Histórias", "Projectos", "Contato"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2"
        style={{ animation: "fadeDown 0.6s ease both" }}
      >
       <img src="/logo.jpeg" alt="Planet She" className="w-10 h-10 object-contain" />
        <span className="text-xl font-bold text-pink-500">Planet She</span>
      </div>

      {/* Links */}
      <div
        className="flex items-center gap-2"
        style={{ animation: "fadeDown 0.6s ease 0.1s both" }}
      >
        <a
          href="#"
          className="px-5 py-2 rounded-full bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition"
        >
          Home
        </a>
        {navLinks.map((item) => (
          <a
            key={item}
            href="#"
            className="px-3 py-2 text-gray-700 text-sm font-medium hover:text-pink-500 transition"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
