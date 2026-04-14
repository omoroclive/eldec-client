import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── tiny hook: triggers when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── animated counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── data ── */
const stats = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 5,  suffix: "+", label: "Countries" },
  { value: 12, suffix: "+", label: "Major Projects" },
  { value: 1,  suffix: "",  label: "Lead Engineer" },
];

const services = [
  {
    // BOLD MODERN ICON: Precision Blueprint / Circuit Node
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.25"/>
        <path d="M7 12H11L13 6L17 18L19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="12" r="2" fill="currentColor"/>
        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.05"/>
      </svg>
    ),
    title: "Electrical Design & Consultancy",
    desc: "Load assessments, power distribution design, LV & MV systems, transformer and switchgear design, earthing, lightning protection and lighting layouts.",
    items: ["Low & Medium Voltage Systems", "Transformer & Switchgear Design", "Earthing & Lightning Protection", "Lighting & Small Power Layouts"],
  },
  {
    // BOLD MODERN ICON: Isometric Layered Structure / Integration
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3"/>
      </svg>
    ),
    title: "Installation & Supervision",
    desc: "End-to-end installation supervision, site inspection, testing, commissioning and certification with full contractor technical support.",
    items: ["Site Inspection & Testing", "Commissioning & Certification", "Project Coordination", "Quality Assurance & Compliance"],
  },
  {
    // BOLD MODERN ICON: Geometric Hexagon Core / Specialized Power
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <path d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08"/>
        <path d="M12 7.5L16.5 10.5V14.5L12 17.5L7.5 14.5V10.5L12 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor"/>
        <path d="M12 2.5V7.5M20.5 16.5L16.5 14.5M3.5 16.5L7.5 14.5" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    ),
    title: "Specialized Engineering",
    desc: "Data centers, EV charging stations, military & security facilities, fuel and hazardous area installations, industrial plants and off-grid power systems.",
    items: ["EV Charging Stations", "Data Centers", "Hazardous Area Installations", "Off-Grid Solar Power Systems"],
  },
];

const projects = [
  {
    num: "01",
    title: "EV Charging Stations",
    location: "Kenya & Rwanda",
    desc: "Design and installation of EV charging infrastructure with cumulative capacity of 7,500 kW including transformers, LV distribution and DC fast chargers.",
    tag: "Energy",
  },
  {
    num: "02",
    title: "Kooba Data Center",
    location: "Mombasa, Kenya",
    desc: "Tier 3 data center design — USD 2.5M project including RMU systems, transformers, UPS, generators and dual power supply configuration.",
    tag: "Data Center",
  },
  {
    num: "03",
    title: "BATUK Phase 2A",
    location: "Laikipia, Kenya",
    desc: "KES 442M electrical design and supervision for accommodation, catering and support facilities including street lighting and fire alarm systems.",
    tag: "Infrastructure",
  },
  {
    num: "04",
    title: "Off-Grid Solar Installation",
    location: "Remote Facility",
    desc: "80 kWp solar PV system including inverters, protection systems, charge controllers and full commissioning in a remote off-grid facility.",
    tag: "Solar",
  },
];

const whyUs = [
  { title: "Experienced Leadership", desc: "Led by a Professional Electrical Engineer with 12+ years across Africa and the Middle East." },
  { title: "International Standards", desc: "Every project designed to BS 7671, IEC 60364, NFPA and local KS 662 standards." },
  { title: "Strong Safety Compliance", desc: "Safety of life and protection of property is at the core of every engineering decision." },
  { title: "Proven Project History", desc: "Successfully delivered residential, commercial, industrial, military and infrastructure projects." },
  { title: "Reliable Supervision", desc: "Full site inspection, testing, commissioning and certification on every project." },
  { title: "Cost-Effective Solutions", desc: "High-quality engineering that meets your budget without compromising on compliance." },
];

/* ── fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO — White background with navy text
      ══════════════════════════════════════════ */}
      <section className="relative bg-white pt-40 pb-32 overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full w-1/2 bg-[#8B1A1A] opacity-5"
          style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 60% 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#0D2137 1px,transparent 1px),linear-gradient(90deg,#0D2137 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeDown 0.7s ease both" }}
          >
            <span className="w-8 h-[2px] bg-[#8B1A1A]" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A]">
              Professional Electrical Engineering
            </span>
          </div>
          <h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0D2137] leading-tight mb-6"
            style={{ animation: "fadeUp 0.8s ease 0.1s both" }}
          >
            Powering <span className="text-[#8B1A1A]">Safe</span>
            <br />& Reliable{" "}
            <span className="text-[#0D2137]">Infrastructure</span>
          </h1>
          <p
            className="font-body text-[#0D2137] text-lg max-w-xl leading-relaxed mb-12"
            style={{ animation: "fadeUp 0.8s ease 0.25s both" }}
          >
            ELDEC Limited delivers electrical engineering consultancy, design,
            installation and project supervision across Africa — built to
            international standards, every time.
          </p>
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
          >
            <Link
              to="/contact"
              className="font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white px-8 py-4 hover:bg-[#6e1515] transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1A1A]/30 active:scale-95"
            >
              Start a Project
            </Link>
            <Link
              to="/services"
              className="font-sans text-sm tracking-widest uppercase border border-[#0D2137] text-[#0D2137] px-8 py-4 hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR — Navy background with high-visibility text
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2137]">
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="py-10 px-8 text-center">
                <div className="font-heading text-4xl lg:text-5xl font-bold text-[#F59E0B] mb-2">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="font-sans text-xs tracking-[0.15em] uppercase text-white">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT STRIP — White card on cream background
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Who We Are</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137] leading-tight mb-6">
                Engineering Excellence<br />
                <span className="text-[#8B1A1A]">Built on Standards</span>
              </h2>
              <p className="font-body text-[#0D2137] leading-relaxed mb-4 text-justify">
                ELDEC Limited is a private limited company incorporated in the Republic of Kenya in 2025
                to provide professional Electrical Engineering Services, Consultancy, Design, Installation,
                and Project Supervision for residential, commercial, industrial, institutional, and
                infrastructure developments.
              </p>
              <p className="font-body text-[#0D2137] leading-relaxed mb-8 text-justify">
                We specialise in the design and implementation of safe, reliable, and standards-compliant
                electrical systems with strong emphasis on quality engineering, technical accuracy, and
                compliance with both local and international regulations.
              </p>
              <Link to="/about"
                className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-[#8B1A1A] group">
                <span>Learn More About Us</span>
                <span className="w-8 h-[2px] bg-[#8B1A1A] group-hover:w-14 transition-all duration-300" />
              </Link>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#8B1A1A]/20 rounded-sm" />
                <div className="bg-white border border-[#0D2137]/10 p-10 relative">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { 
                        label: "Low Voltage Systems", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h4l2-5 4 10 2-5h4" /></svg> 
                      },
                      { 
                        label: "Medium Voltage", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> 
                      },
                      { 
                        label: "Solar & Backup", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="4" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg> 
                      },
                      { 
                        label: "Fire & Life Safety", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16c-2 0-3-2-3-4 0-2 3-6 3-6s3 4 3 6c0 2-1 4-3 4z" opacity="0.5"/></svg> 
                      },
                      { 
                        label: "EV Charging", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 2v4M16 2v4M4 8h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11l-2 3h4l-2 3"/></svg> 
                      },
                      { 
                        label: "Data Centers", 
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M4 16h16M8 7h.01M8 13h.01M8 19h.01"/></svg> 
                      },
                    ].map(({ label, icon }) => (
                      <div key={label} className="flex items-center gap-3 text-[#0D2137] group cursor-default">
                        <span className="text-[#8B1A1A] group-hover:scale-110 transition-transform duration-300">{icon}</span>
                        <span className="font-body text-sm font-semibold">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-[#0D2137]/10">
                    <p className="font-sans text-xs tracking-wider uppercase text-[#8B1A1A] mb-2">Our Commitment</p>
                    <p className="font-body text-[#0D2137] text-sm leading-relaxed">
                      Safety of life, protection of property, and long-term operational reliability — on every project.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — White cards on cream background
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">What We Do</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">
              Our Core Services
            </h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map(({ icon, title, desc, items }, i) => (
              <FadeIn key={title} delay={i * 120}>
                <div className="group border border-[#0D2137]/10 p-8 hover:border-[#8B1A1A] transition-all duration-500 hover:shadow-xl hover:shadow-[#8B1A1A]/10 relative overflow-hidden bg-[#F8F4F0]">
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  
                  {/* BOLD ICON WRAPPER */}
                  <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">
                    {icon}
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-[#0D2137] mb-4 leading-snug">{title}</h3>
                  <p className="font-body text-[#0D2137] text-sm leading-relaxed mb-6">{desc}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-sans text-xs text-[#0D2137]">
                        <span className="w-4 h-[1px] bg-[#8B1A1A]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link to="/services"
              className="inline-block font-sans text-sm tracking-widest uppercase border border-[#0D2137] text-[#0D2137] px-10 py-4 hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-all duration-300">
              View All Services
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROJECTS — Navy background
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0D2137] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B1A1A] opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">Track Record</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white">
                Featured Projects
              </h2>
              <Link to="/services"
                className="font-sans text-sm tracking-widest uppercase text-white hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                All Projects
                <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mt-6" />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(({ num, title, location, desc, tag }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="group border border-white/10 p-8 hover:border-[#8B1A1A]/60 transition-all duration-500 relative overflow-hidden bg-white/5">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-heading text-5xl font-bold text-white/10 leading-none">{num}</span>
                    <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#F59E0B] border border-[#F59E0B]/30 px-3 py-1">
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">{title}</h3>
                  <p className="font-sans text-xs tracking-wider uppercase text-[#8B1A1A] mb-4">{location}</p>
                  <p className="font-body text-white text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US — Cream background
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Our Advantage</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">
              Why Choose ELDEC
            </h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="flex gap-5 group">
                  {/* BOLD MODERN ICON: Rotated Glass/Solid Polygon Checkmark */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-[#8B1A1A]/20 rounded-xl flex items-center justify-center mt-1 group-hover:bg-[#8B1A1A] rotate-3 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#0D2137] mb-2">{title}</h3>
                    <p className="font-body text-[#0D2137] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER — Red background (accent)
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#8B1A1A] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 0% 100%, #000 0%, transparent 60%), radial-gradient(circle at 100% 0%, #000 0%, transparent 60%)" }} />
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="max-w-2xl">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-white mb-4 block">
              Ready to Build?
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Let's Start Your<br />Next Project Together
            </h2>
            <p className="font-body text-white text-lg leading-relaxed mb-10">
              From design to commissioning — ELDEC delivers electrical engineering
              solutions that are safe, compliant and built to last.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact"
                className="font-sans text-sm tracking-widest uppercase bg-white text-[#8B1A1A] px-10 py-4 hover:bg-[#F8F4F0] transition-all duration-300 active:scale-95">
                Get in Touch
              </Link>
              <Link to="/services"
                className="font-sans text-sm tracking-widest uppercase border border-white text-white px-10 py-4 hover:border-white transition-all duration-300">
                View Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </main>
  );
}