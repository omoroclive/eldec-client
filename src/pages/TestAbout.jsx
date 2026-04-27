import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import imgHeroBg from "../assets/logo/about.jpg"
/* ── in-view hook ── */
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

/* ── fade wrapper ── */
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── data ── */
const standards = [
  { code: "BS 7671",       name: "IET Wiring Regulations",      priority: true },
  { code: "IEC 60364",     name: "Electrical Installations",    priority: true },
  { code: "KS 662",        name: "Wiring Code (Kenya)",         priority: false },
  { code: "Energy Act 2019", name: "Kenya Energy Regulations",   priority: false },
  { code: "IEC 61851",     name: "EV Charging Systems",         priority: false },
  { code: "IEC 62196",     name: "EV Connectors",               priority: false },
  { code: "NFPA 70",       name: "National Electrical Code",    priority: false },
  { code: "UFC",           name: "Unified Facilities Criteria", priority: false },
  { code: "NFPA Codes",    name: "Fire & Life Safety",          priority: false },
];

const expertise = [
  { years: "12+",  area: "Years in LV & MV electrical systems" },
  { years: "5+",   area: "Countries across Africa & Middle East" },
  { years: "3",    area: "Technical committee participations" },
  { years: "100%", area: "Standards-compliant project delivery" },
];

const sectors = [
  "Residential", "Commercial", "Industrial",
  "Military & Security", "Infrastructure", "Data Centers",
  "Hospitality", "Educational Institutions",
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.88-2.62 7.5-6 8.93C8.62 18.5 6 14.88 6 11V7.67L12 5zm-1 7h2v2h-2zm0-4h2v3h-2z"/>
      </svg>
    ),
    title: "Safety First",
    desc: "Every design decision prioritises the safety of life and protection of property above all else.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
      </svg>
    ),
    title: "Client Focus",
    desc: "We listen to the specific needs of each client and engineer solutions tailored to their project.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Quality & Compliance",
    desc: "Rigorous adherence to local and international standards on every project we undertake.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
      </svg>
    ),
    title: "Innovation",
    desc: "Embracing future-ready technologies including EV charging, solar integration, and smart distribution.",
  },
];

export default function About() {
  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">

      {/* ══ HERO — Off-White background with navy text ══ */}
      <section className="relative bg-[#F8F4F0] pt-40 pb-32 overflow-hidden">
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
              Our Story
            </span>
          </div>
          <h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0D2137] leading-tight mb-6"
            style={{ animation: "fadeUp 0.8s ease 0.1s both" }}
          >
            About <span className="text-[#8B1A1A]">ELDEC</span>
            <br />
            <span className="text-[#0D2137]/25">Limited</span>
          </h1>
          <p
            className="font-body text-[#0D2137] text-lg max-w-xl leading-relaxed"
            style={{ animation: "fadeUp 0.8s ease 0.25s both" }}
          >
            A professional electrical engineering firm committed to delivering
            safe, reliable and internationally compliant solutions across Africa.
          </p>
        </div>
      </section>

      {/* ══ COMPANY OVERVIEW — White background ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Text — 7 cols */}
            <div className="lg:col-span-7">
              <FadeIn>
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Who We Are</span>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#0D2137] mb-8 leading-tight">
                  Engineering Solutions Built<br />to International Standards
                </h2>
                {/* Text box is Off-White, popping against White section */}
                <div className="font-body text-[#0D2137] leading-relaxed text-justify space-y-5 border border-[#0D2137]/10 p-8 bg-[#F8F4F0]">
                  <p>
                    <span className="float-left font-heading text-7xl font-bold text-[#8B1A1A] leading-none mr-3 mt-1"
                      style={{ lineHeight: "0.75" }}>E</span>
                    LDEC Limited is a private limited company incorporated in the
                    Republic of Kenya in 2025 to provide professional Electrical
                    Engineering Services, Consultancy, Design, Installation, and
                    Project Supervision for residential, commercial, industrial,
                    institutional, and infrastructure developments.
                  </p>
                  <p>
                    The company specialises in the design and implementation of
                    safe, reliable, and standards-compliant electrical systems,
                    with strong emphasis on quality engineering, technical
                    accuracy, and compliance with both local and international
                    regulations.
                  </p>
                  <p>
                    Our services cover Low Voltage, Medium Voltage, Solar Systems,
                    Backup Power, Electrical Distribution Networks, Fire &amp; Life
                    Safety Systems, and Specialised Installations. ELDEC Limited
                    is committed to delivering engineering solutions that guarantee
                    safety of life, protection of property, and long-term
                    operational reliability.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar — 5 cols */}
            <div className="lg:col-span-5 space-y-6">

              <FadeIn delay={150}>
                <div className="bg-[#0D2137] p-8 mt-10 lg:mt-0">
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-6">At a Glance</h3>
                  <div className="space-y-5">
                    {expertise.map(({ years, area }) => (
                      <div key={area} className="flex items-center gap-5">
                        {/* Changed color from #8B1A1A to #F59E0B to match home page stats */}
                        <span className="font-heading text-3xl font-bold text-[#F59E0B] min-w-[56px]">{years}</span>
                        <span className="font-body text-white text-sm leading-snug border-l border-white/10 pl-5">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={220}>
                {/* Sectors box changed to Off-White to contrast with White section */}
                <div className="border border-[#0D2137]/10 bg-[#F8F4F0] p-8">
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#8B1A1A] mb-5">Sectors We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((s) => (
                      <span key={s}
                        className="bg-white font-sans text-xs tracking-wide text-[#0D2137] border border-[#0D2137]/10 px-3 py-1.5 hover:border-[#8B1A1A] hover:text-[#8B1A1A] hover:shadow-sm transition-all duration-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION — Off-White background ══ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">What Drives Us</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Mission &amp; Vision</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission — White Card on Off-White background */}
            <FadeIn delay={80}>
              <div className="relative bg-white border border-[#0D2137]/10 p-10 h-full overflow-hidden group hover:border-[#8B1A1A] transition-all duration-500">
                <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="#8B1A1A" className="w-40 h-40"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>
                </div>
                <div className="w-12 h-12 bg-[#8B1A1A] flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#8B1A1A] mb-3 block">Our Mission</span>
                <h3 className="font-heading text-2xl font-bold text-[#0D2137] mb-5 leading-snug">Delivering Safe, Reliable Engineering</h3>
                <div className="w-10 h-[2px] bg-[#8B1A1A] mb-5" />
                <p className="font-body text-[#0D2137] leading-relaxed text-justify">
                  To provide safe, reliable, and high-quality electrical engineering
                  solutions that meet international standards while satisfying the
                  specific needs of our clients — on every project, without compromise.
                </p>
              </div>
            </FadeIn>

            {/* Vision — Navy Card */}
            <FadeIn delay={180}>
              <div className="relative bg-[#0D2137] border border-white/10 p-10 h-full overflow-hidden group hover:border-[#8B1A1A]/50 transition-all duration-500">
                <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="#F59E0B" className="w-40 h-40">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
                <div className="w-12 h-12 bg-[#F59E0B] flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-3 block">Our Vision</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-5 leading-snug">Globally Recognised Engineering Excellence</h3>
                <div className="w-10 h-[2px] bg-[#F59E0B] mb-5" />
                <p className="font-body text-white/70 leading-relaxed text-justify">
                  To be a globally recognised leader in Engineering Excellence —
                  setting the benchmark for electrical consultancy by delivering
                  safe, compliant, and innovative solutions that power sustainable
                  infrastructure and future-ready technologies.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES — White background ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">What We Stand For</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Our Core Values</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 100}>
                {/* Off-White Cards on White background */}
                <div className="group text-center p-8 border border-[#0D2137]/10 hover:border-[#8B1A1A] hover:shadow-xl hover:shadow-[#8B1A1A]/10 transition-all duration-500 relative overflow-hidden bg-[#F8F4F0]">
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  <div className="w-14 h-14 bg-white group-hover:bg-[#8B1A1A] flex items-center justify-center mx-auto mb-5 transition-colors duration-500">
                    <span className="text-[#8B1A1A] group-hover:text-white transition-colors duration-500">{icon}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#0D2137] mb-3">{title}</h3>
                  <p className="font-body text-[#0D2137] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEAD ENGINEER — Navy background ══ */}
      <section className="py-24 bg-[#0D2137] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 top-0 h-full w-1 bg-[#8B1A1A]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#8B1A1A] opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">Engineering Leadership</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Led by a Seasoned<br />
                <span className="text-[#8B1A1A]">Professional Engineer</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#8B1A1A] mb-8" />
              <p className="font-body text-white/70 leading-relaxed mb-6 text-justify">
                ELDEC Limited is led by a Professional Electrical Engineer with over
                12 years of experience in Low Voltage and Medium Voltage electrical
                systems across Africa and the Middle East.
              </p>
              <p className="font-body text-white/70 leading-relaxed mb-6 text-justify">
                He has worked on residential, commercial, industrial, military, and
                infrastructure projects, and has participated in technical committees
                involved in the development of electrical installation and EV charging
                standards.
              </p>
              <p className="font-body text-white/70 leading-relaxed text-justify">
                This experience enables ELDEC Limited to deliver projects that meet
                both local regulations and international engineering practices —
                ensuring every client receives the highest standard of technical
                execution.
              </p>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Low Voltage Systems",  detail: "Design & Installation" },
                  { label: "Medium Voltage",       detail: "Distribution & Protection" },
                  { label: "EV Charging Standards",detail: "IEC 61851 & 62196" },
                  { label: "Military Facilities",  detail: "UFC Compliant Designs" },
                  { label: "Solar & Off-Grid",     detail: "PV System Design" },
                  { label: "Data Centers",         detail: "Tier 3 Design" },
                ].map(({ label, detail }) => (
                  <div key={label} className="border border-white/10 p-5 hover:border-[#8B1A1A]/50 transition-colors duration-300 bg-white/5">
                    <div className="w-2 h-2 bg-[#8B1A1A] mb-3" />
                    <p className="font-sans text-xs  tracking-wide uppercase text-white/80 mb-1">{label}</p>
                    <p className="font-body text-white/40 text-xs">{detail}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ STANDARDS & COMPLIANCE — Off-White background ══ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Our Benchmarks</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Standards &amp; Compliance</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
            <p className="font-body text-[#0D2137] max-w-xl mx-auto mt-6 leading-relaxed">
              We ensure every project is designed, installed, tested and commissioned
              according to approved engineering standards.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {standards.map(({ code, name, priority }, i) => (
              <FadeIn key={code} delay={i * 60}>
                {/* White Cards on Off-White background */}
                <div className={`flex items-center gap-5 p-5 border transition-all duration-300 hover:shadow-lg group ${
                  priority ? "border-[#8B1A1A] bg-white" : "border-[#0D2137]/10 bg-white hover:border-[#8B1A1A]/40"
                }`}>
                  <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                    priority ? "bg-[#8B1A1A]" : "bg-[#0D2137]/5 group-hover:bg-[#8B1A1A]"
                  } transition-colors duration-300`}>
                    <svg viewBox="0 0 24 24" fill={priority ? "white" : "#8B1A1A"} className="w-5 h-5 group-hover:fill-white transition-colors duration-300">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="font-sans text-sm font-medium text-[#0D2137] tracking-wide">{code}</span>
                      {priority && (
                        <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B1A1A] border border-[#8B1A1A] px-2 py-0.5">Primary</span>
                      )}
                    </div>
                    <span className="font-body text-[#0D2137] text-sm">{name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA — Deep Red background ══ */}
      <section className="relative bg-[#8B1A1A] py-20 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-5">Ready to Work With Us?</h2>
            <p className="font-body text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Talk to our engineering team about your next project — from design
              to commissioning, we deliver it right.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact"
                className="font-sans text-sm tracking-widest uppercase bg-white text-[#8B1A1A] px-10 py-4 hover:bg-[#F8F4F0] transition-all duration-300 active:scale-95">
                Contact Us
              </Link>
              <Link to="/services"
                className="font-sans text-sm tracking-widest uppercase border border-white/40 text-white px-10 py-4 hover:border-white transition-all duration-300">
                Our Services
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
      `}</style>
    </main>
  );
}