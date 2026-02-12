function About() {
  return (
    <section id="about" className="text-slate-200 py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/*left: text*/}
        <div className="flex-1 ">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            Built to Make Money <span className="text-emerald-400">Simple</span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            MoneyTrack is a personal finance app designed to help you understand
            your spending habits, track income, and stay in control of your
            financial goals — without the complexity.
          </p>

          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            Whether you're budgeting for daily expenses or planning long-term
            savings, MoneyTrack gives you a clear view of your money in one
            place.
          </p>
        </div>

        {/*right: highlights*/}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white">
              Simple Dashboard
            </h3>
            <p className="mt-2 text-slate-400">
              See your income, expenses, and balance at a glance.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white">
              Smart Tracking
            </h3>
            <p className="mt-2 text-slate-400">
              Automatically organize transactions by category.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white">
              Secure & Private
            </h3>
            <p className="mt-2 text-slate-400">
              Your data stays encrypted and protected at all times.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white">
              Anywhere Access
            </h3>
            <p className="mt-2 text-slate-400">
              Use MoneyTrack on desktop or mobile seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
