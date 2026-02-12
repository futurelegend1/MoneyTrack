import IconMoneyTrack from "../../assets/IconMoneyTrack.tsx";

function Footer() {
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
    <footer
      id="contact"
      className="bg-slate-950 border-t border-slate-800 text-slate-400"
    >
      <div className="max-w-7xl mx-auto py-26">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconMoneyTrack className="w-8 h-8" />
              <span className="text-2xl font-semibold text-emerald-400">
                MoneyTrack
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed">
              Track your expenses, manage your budget, and grow your savings
              with clarity and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li
                onClick={() => scrollTo("hero")}
                className="hover:text-white cursor-pointer transition"
              >
                About
              </li>
              <li
                onClick={() => scrollTo("features")}
                className="hover:text-white cursor-pointer transition"
              >
                Features
              </li>
              <li
                onClick={() => scrollTo("get-started")}
                className="hover:text-white cursor-pointer transition"
              >
                Get Started
              </li>
              <li
                onClick={() => scrollTo("contact")}
                className="hover:text-white cursor-pointer transition"
              >
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>

            <p className="text-slate-500">support@moneytrack.com</p>
            <p className="text-slate-500 mt-2">New York, USA</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} MoneyTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
