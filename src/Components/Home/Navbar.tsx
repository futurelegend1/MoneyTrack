import IconMoneyTrack from "../../assets/IconMoneyTrack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const navigate = useNavigate();

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

    setPhoneMenuOpen(false);
  };

  const handleSignInClicks = () => {
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto relative flex justify-between items-center py-20 px-6 h-16">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("hero")}
        >
          <IconMoneyTrack className="w-15 h-15" />
          <span className="text-3xl font-semibold text-emerald-400">
            MoneyTrack
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-10 text-slate-300 text-xl absolute left-1/2 -translate-x-1/2">
          <li
            className="hover:text-white transition cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            About
          </li>
          <li
            className="hover:text-white transition cursor-pointer"
            onClick={() => scrollTo("features")}
          >
            Features
          </li>
          <li
            className="hover:text-white transition cursor-pointer"
            onClick={() => scrollTo("get-started")}
          >
            Get Started
          </li>
          <li
            className="hover:text-white transition cursor-pointer"
            onClick={() => scrollTo("contact")}
          >
            Contact
          </li>
        </ul>

        <div className="ml-auto hidden lg:block">
          <button onClick={handleSignInClicks} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-lg transition text-xl">
            Sign in
          </button>
        </div>

        <button
          className="ml-auto lg:hidden text-slate-300"
          onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                phoneMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {phoneMenuOpen && (
        <ul className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-6 text-lg">
          <li
            onClick={() => scrollTo("about")}
            className="cursor-pointer hover:text-white"
          >
            About
          </li>
          <li
            onClick={() => scrollTo("features")}
            className="cursor-pointer hover:text-white"
          >
            Features
          </li>
          <li
            onClick={() => scrollTo("contact")}
            className="cursor-pointer hover:text-white"
          >
            Contact
          </li>
          <li
            onClick={() => scrollTo("get-started")}
            className="cursor-pointer hover:text-white"
          >
            Get Started
          </li>

          <li>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg">
              Sign in
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default Navbar;
