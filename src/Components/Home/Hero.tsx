import { useNavigate } from "react-router-dom";

function Hero({scrollTo}: {scrollTo: (id: string) => void}) {
  const navigate = useNavigate();
  const handleSignInClicks = () => {
    navigate("/login");
  }


  return (
    <section id="hero" className="text-slate-200">
      <div className="max-w-7xl min-h-[calc(100vh-20rem)] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* left */}
        <div className="flex-1 text-center lg:text-left animate-fade-up">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Take Control of Your <span className="text-emerald-400">Money</span>
          </h1>

          <p className="text-slate-400 text-xl max-w-xl mx-auto lg:mx-0">
            Track your income, expenses, and savings in one simple dashboard.
            MoneyTrack helps you understand where your money goes —
            effortlessly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 py-3 text-xl transition duration-200 hover:-translate-y-0.5" onClick={handleSignInClicks}>Get Started</button>
            <button className="bg-gray-800 hover:bg-gray-900 border-2 border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-3 rounded-xl text-xl transition duration-200 hover:-translate-y-0.5" onClick={()=>scrollTo("about")}>Learn More</button>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg animate-fade-right">
            <div className="h-72 lg:h-96 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                App Preview
            </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
