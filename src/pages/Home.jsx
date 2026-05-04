import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="font-sans bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
