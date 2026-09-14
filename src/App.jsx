import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Historias from "./pages/Historias";
import HistoriaDetalhe from "./pages/HistoriaDetalhe";
import SubmeterHistoria from "./pages/SubmeterHistoria";
import Admin from "./pages/Admin";
import Perfil from "./pages/Perfil";
import Estudos from "./pages/Estudos";
import Reflexao from "./pages/Reflexao";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";


function App() {
  return (
    <div className="font-sans bg-white overflow-x-hidden">
      <Routes>
        <Route path="/admin" element={<Admin />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/historias" element={<Historias />} />
          <Route path="/historias/:slug" element={<HistoriaDetalhe />} />
          <Route path="/submeter-historia" element={<SubmeterHistoria />} />
          <Route path="/perfil" element={<Perfil />} />

      
          <Route path="/estudos" element={<Estudos />} />
          <Route path="/reflexao" element={<Reflexao />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/projetos" element={<Projetos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;