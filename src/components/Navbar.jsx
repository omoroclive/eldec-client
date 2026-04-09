import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo/eldec-logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-lg shadow-lg shadow-black/20 py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <img
              src={logo}
              alt="ELDEC Limited"
              className="h-24 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-lighten"
            />
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative font-sans text-sm tracking-widest uppercase px-5 py-2 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute bottom-0 left-5 right-5 h-[2px] bg-[#8B1A1A] transition-all duration-300 ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      } origin-left`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* CTA button */}
            <NavLink
              to="/contact"
              className="ml-4 font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-6 py-2.5 transition-all duration-300 hover:bg-[#6e1515] hover:shadow-lg hover:shadow-[#8B1A1A]/30 active:scale-95"
            >
              Get a Quote
            </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px] w-full" : "w-full"
              }`}
            />
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 w-0" : "w-3/4"
              }`}
            />
            <span
              className={`block h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px] w-full" : "w-1/2"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative accents */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B1A1A] opacity-20 -rotate-12 translate-y-20 -translate-x-10 rounded-sm" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#8B1A1A] opacity-10 rotate-12 -translate-y-10 translate-x-10 rounded-sm" />

        {/* Logo inside mobile menu */}
        <div className="absolute top-5 left-6">
          <img
            src={logo}
            alt="ELDEC Limited"
            className="h-14 w-auto object-contain mix-blend-lighten"
          />
        </div>

        <nav className="flex flex-col items-center gap-8 relative z-10">
          {links.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `font-heading text-4xl font-semibold tracking-tight transition-all duration-300 ${
                  isActive ? "text-[#8B1A1A]" : "text-white/80 hover:text-white"
                }`
              }
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            className="mt-4 font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-10 py-3 hover:bg-[#6e1515] transition-colors duration-300"
            style={{
              transitionDelay: menuOpen ? "280ms" : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Get a Quote
          </NavLink>
        </nav>
      </div>
    </>
  );
}
