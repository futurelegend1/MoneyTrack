import Navbar from "../Components/Home/Navbar.tsx";
import Hero from "../Components/Home/Hero.tsx";
import About from "../Components/Home/About.tsx";
import Feature from "../Components/Home/Feature.tsx";
import GetStarted from "../Components/Home/GetStarted.tsx";
import Footer from "../Components/Home/Footer.tsx";

function Home() {
  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <GetStarted />
      <Footer />
    </div>
  );
}
export default Home;
