import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Historias from "./pages/Historias";

function App() {
  return (
    <div className="font-sans bg-white overflow-x-hidden">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/historias" element={<Historias />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
