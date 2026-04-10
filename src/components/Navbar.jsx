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

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 py-2"
            : "bg-white py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Real Imported Logo */}
          <NavLink 
            to="/" 
            className="flex items-center group py-2"
            onClick={() => setMenuOpen(false)}
          >
            <img 
              src={logo} 
              alt="Eldec Limited Logo" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left"
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

          {/* Animated Hamburger Menu */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-12 h-12 rounded-xl transition-all duration-300 group"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${
              menuOpen ? "rotate-90 border-[#8B1A1A]" : "border-[#8B1A1A]/30 group-hover:border-[#8B1A1A]/60"
            }`} />
            
            <div className="relative z-10 flex flex-col gap-1.5 w-5">
              <span
                className={`block h-0.5 rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-2 w-5 bg-[#8B1A1A]" : "w-5 bg-[#0D2137]"
                }`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "opacity-0 w-0 bg-[#8B1A1A]" : "w-5 bg-[#0D2137]"
                }`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-400 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-2 w-5 bg-[#8B1A1A]" : "w-3 ml-auto bg-[#0D2137]"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu Dark Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#0D2137]/40 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Modern Slide-out Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-40 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden pt-28 px-8 pb-8 flex flex-col ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
          {links.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-heading text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  isActive ? "text-[#8B1A1A]" : "text-[#0D2137] hover:text-[#8B1A1A]"
                }`
              }
              style={{
                transitionDelay: menuOpen ? `${i * 100 + 100}ms` : "0ms",
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: "all 0.4s ease-out"
              }}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-6 py-3.5 text-center transition-all duration-300 hover:bg-[#6e1515] shadow-md shadow-[#8B1A1A]/20"
            style={{
              transitionDelay: menuOpen ? `${links.length * 100 + 100}ms` : "0ms",
              transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: "all 0.4s ease-out"
            }}
          >
            Get a Quote
          </NavLink>
        </nav>

        {/* Clean Contact Info at Bottom of Drawer */}
        <div 
          className="mt-8 pt-8 border-t border-gray-100"
          style={{
            transitionDelay: menuOpen ? "500ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.5s ease-out"
          }}
        >
          <div className="flex flex-col gap-4">
            <a href="mailto:designs@eldecengineering.com" className="flex items-center gap-3 text-sm font-sans text-[#0D2137]/70 hover:text-[#8B1A1A] transition-colors break-all">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              designs@eldecengineering.com
            </a>
            <a href="tel:+254721387121" className="flex items-center gap-3 text-sm font-sans text-[#0D2137]/70 hover:text-[#8B1A1A] transition-colors">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +254 721 387 121
            </a>
          </div>
        </div>
      </div>
    </>
  );
}