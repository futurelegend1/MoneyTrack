import Navbar from "../Components/Home/Navbar.tsx";
import Hero from "../Components/Home/Hero.tsx";
import About from "../Components/Home/About.tsx";
import Feature from "../Components/Home/Feature.tsx";
import GetStarted from "../Components/Home/GetStarted.tsx";
import Footer from "../Components/Home/Footer.tsx";

function Home() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Get navbar height
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.getBoundingClientRect().height || 0;

    // Calculate top position
    const top =
      element.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen">
      <Navbar scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About />
      <Feature />
      <GetStarted />
      <Footer />
    </div>
  );
}
export default Home;
