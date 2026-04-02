import { NavLink } from "react-router-dom";
import logo from '../assets/logo/eldec-logo.jpg'

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Electrical Design & Consultancy",
  "Installation & Supervision",
  "Solar & Backup Power",
  "Fire & Life Safety Systems",
  "EV Charging Stations",
  "Specialized Engineering",
];

const standards = [
  "BS 7671 IET Wiring Regulations",
  "IEC 60364 Electrical Installations",
  "KS 662 Wiring Code (Kenya)",
  "NFPA 70 National Electrical Code",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D2137] text-white relative overflow-hidden">

      {/* Top red accent line */}
      <div className="h-1 w-full bg-[#8B1A1A]" />

      {/* Decorative background shapes */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B1A1A] opacity-5 rotate-12 translate-x-32 translate-y-32 rounded-sm pointer-events-none" />
      <div className="absolute top-10 left-0 w-64 h-64 bg-white opacity-[0.02] -rotate-12 -translate-x-20 rounded-sm pointer-events-none" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="ELDEC Limited"
              className="h-12 w-auto brightness-0 invert mb-5"
            />
            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              Professional electrical engineering services — design, consultancy,
              installation and supervision across Africa and beyond.
            </p>
            {/* Divider */}
            <div className="w-12 h-[2px] bg-[#8B1A1A]" />
            <p className="font-sans text-white/40 text-xs mt-4 tracking-wider uppercase">
              Incorporated in Kenya, 2025
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-6 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="font-body text-white/60 text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-[#8B1A1A] group-hover:w-6 transition-all duration-300" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-6 font-medium">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="font-body text-white/60 text-sm flex items-start gap-2">
                  <span className="w-4 h-[1px] bg-[#8B1A1A] mt-[9px] flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact & Standards */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-6 font-medium">
              Contact Us
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#8B1A1A] mt-0.5 flex-shrink-0">
                  {/* Location icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <span className="font-body text-white/60 text-sm leading-relaxed">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B1A1A] mt-0.5 flex-shrink-0">
                  {/* Email icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <a
                  href="mailto:info@eldeclimited.com"
                  className="font-body text-white/60 text-sm hover:text-white transition-colors duration-300"
                >
                  info@eldeclimited.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8B1A1A] mt-0.5 flex-shrink-0">
                  {/* Phone icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
                <a
                  href="tel:+254700000000"
                  className="font-body text-white/60 text-sm hover:text-white transition-colors duration-300"
                >
                  +254 700 000 000
                </a>
              </li>
            </ul>

            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-4 font-medium">
              Standards
            </h4>
            <ul className="space-y-2">
              {standards.map((s) => (
                <li key={s} className="font-body text-white/50 text-xs flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#8B1A1A] flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/30 text-xs tracking-wider">
            &copy; {year} ELDEC Limited. All rights reserved.
          </p>
          <p className="font-sans text-white/20 text-xs tracking-wider uppercase">
            Electrical Engineering &middot; Consultancy &middot; Design &middot; Installation
          </p>
        </div>
      </div>
    </footer>
  );
}
