function Feature() {
    return (
    <section id="features" className="bg-slate-900 text-slate-200 py-24 md:mt-0 -mt-25">
      <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
        {/* Section header */}
        <h2 className="text-3xl lg:text-4xl font-semibold animate-fade-up">
          Features That Make <span className="text-emerald-400">MoneyTrack</span> Powerful
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto lg:mx-0 animate-fade-up delay-200">
          Manage your money effortlessly with our intuitive tools and smart insights.
        </p>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up delay-400">
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Real-Time Tracking</h3>
            <p className="mt-2 text-slate-400">Track your expenses and income instantly, anytime.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Budget Planner</h3>
            <p className="mt-2 text-slate-400">Set monthly budgets and see where your money goes.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Insights & Analytics</h3>
            <p className="mt-2 text-slate-400">Get clear charts and reports about your spending habits.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Secure & Private</h3>
            <p className="mt-2 text-slate-400">Your data stays encrypted and protected at all times.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Multi-Device</h3>
            <p className="mt-2 text-slate-400">Access MoneyTrack on desktop and mobile seamlessly.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-xl font-medium text-white">Custom Categories</h3>
            <p className="mt-2 text-slate-400">Organize your transactions the way that makes sense for you.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Feature;