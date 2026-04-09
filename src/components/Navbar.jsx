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
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 py-2"
            : "bg-white py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <img
              src={logo}
              alt="ELDEC Limited"
              className="h-20 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                    isActive ? "text-[#8B1A1A]" : "text-[#0D2137]/70 hover:text-[#8B1A1A]"
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

          {/* Unique Animated Hamburger Menu - "Morphing Cube" style */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-12 h-12 rounded-xl transition-all duration-300 group"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {/* Outer ring that rotates */}
            <div className={`absolute inset-0 rounded-xl border-2 border-[#8B1A1A]/30 transition-all duration-500 ${
              menuOpen ? "rotate-90 border-[#8B1A1A]" : "group-hover:border-[#8B1A1A]/60"
            }`} />
            
            {/* Inner square background */}
            <div className={`absolute inset-1 rounded-lg bg-gradient-to-br from-[#8B1A1A]/10 to-transparent transition-all duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`} />
            
            {/* Hamburger lines */}
            <div className="relative z-10 flex flex-col gap-1.5 w-5">
              <span
                className={`block h-0.5 bg-[#0D2137] rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-2 w-5" : "w-5"
                }`}
              />
              <span
                className={`block h-0.5 bg-[#0D2137] rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "opacity-0 w-0" : "w-5"
                }`}
              />
              <span
                className={`block h-0.5 bg-[#0D2137] rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-2 w-5" : "w-3 ml-auto"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay - Premium design */}
      <div
        className={`fixed inset-0 z-40 bg-[#0D2137] flex flex-col justify-center items-center transition-all duration-700 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -right-1/2 w-96 h-96 bg-[#8B1A1A] opacity-20 rounded-full blur-3xl transition-transform duration-1000 ${
            menuOpen ? "scale-100" : "scale-0"
          }`} />
          <div className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-[#F59E0B] opacity-10 rounded-full blur-3xl transition-transform duration-1000 delay-100 ${
            menuOpen ? "scale-100" : "scale-0"
          }`} />
        </div>

        {/* Logo inside mobile menu */}
        <div
          className="absolute top-6 left-6 transition-all duration-500 delay-200"
          style={{
            transform: menuOpen ? "translateX(0)" : "translateX(-100px)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <img
            src={logo}
            alt="ELDEC Limited"
            className="h-12 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Unique Close Button - Animated X with ring */}
        <button
          className={`absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-[#8B1A1A] transition-all duration-300 group ${
            menuOpen ? "scale-100" : "scale-0"
          }`}
          onClick={() => setMenuOpen(false)}
          style={{ transitionDelay: "200ms" }}
        >
          <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Animated decorative lines */}
        <div className={`absolute left-0 top-1/2 w-1 h-32 bg-[#8B1A1A] transition-all duration-700 delay-300 ${
          menuOpen ? "translate-x-8 opacity-100" : "-translate-x-full opacity-0"
        }`} />
        <div className={`absolute right-0 top-1/2 w-1 h-32 bg-[#F59E0B] transition-all duration-700 delay-300 ${
          menuOpen ? "-translate-x-8 opacity-100" : "translate-x-full opacity-0"
        }`} />

        <nav className="flex flex-col items-center gap-8 relative z-10">
          {links.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `relative font-heading text-5xl md:text-6xl font-bold tracking-tight transition-all duration-300 group ${
                  isActive ? "text-[#8B1A1A]" : "text-white/80 hover:text-white"
                }`
              }
              style={{
                transitionDelay: menuOpen ? `${i * 100 + 300}ms` : "0ms",
                transform: menuOpen ? "translateY(0) scale(1)" : "translateY(50px) scale(0.8)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span className="relative inline-block">
                {label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#8B1A1A] transition-all duration-300 ${
                  menuOpen ? "scale-x-100" : "scale-x-0"
                } origin-left`} style={{ transitionDelay: `${i * 100 + 400}ms` }} />
              </span>
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-12 py-4 rounded-full hover:bg-[#6e1515] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#8B1A1A]/30"
            style={{
              transitionDelay: menuOpen ? `${links.length * 100 + 400}ms` : "0ms",
              transform: menuOpen ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Get a Quote
          </NavLink>
        </nav>

        {/* Social/Contact info in mobile menu */}
        <div
          className="absolute bottom-8 left-0 right-0 text-center"
          style={{
            transitionDelay: menuOpen ? "700ms" : "0ms",
            transform: menuOpen ? "translateY(0)" : "translateY(30px)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div className="flex justify-center gap-6 mb-3">
            <a href="mailto:designs@eldecengineering.com" className="text-white/40 hover:text-[#F59E0B] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="tel:+254721387121" className="text-white/40 hover:text-[#F59E0B] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
          <p className="text-white/30 text-xs font-sans tracking-wider">
            designs@eldecengineering.com • +254 721 387 121
          </p>
        </div>
      </div>
    </>
  );
}