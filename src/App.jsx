import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Reflexao from "./pages/Reflexao";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import Estudos from "./pages/Estudos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reflexao" element={<Reflexao />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/estudos" element={<Estudos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
