import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";

// ── Import project images ──
import imgPanel from "../assets/logo/image3.jpeg";
import imgHeroBg from "../assets/logo/powerstation2.jpg";
import imgAbout from "../assets/logo/about.jpg";
import imgEVCharging from "../assets/logo/evcharging.jpg";
import imgDataCenter from "../assets/logo/datacenter.png";
import imgLines from "../assets/logo/image4.jpeg";
import imgFuelStation from "../assets/logo/fuelstation.jpg";
import imgHybrid from "../assets/logo/hybridsystem.jpg";
import imgSolarInstallation from "../assets/logo/solar2.jpg";

/* ── tiny hook: triggers when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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

/* ── DATA ── */
const stats = [
  { value: 12, suffix: "+", label: "Years Experience", icon: "⚡" },
  { value: 5,  suffix: "+", label: "Countries",        icon: "🌍" },
  { value: 12, suffix: "+", label: "Major Projects",   icon: "🏗️" },
  { value: 1,  suffix: "",  label: "Lead Engineer",    icon: "👨‍💻" },
];

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]" aria-hidden="true">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.25" />
        <path d="M7 12H11L13 6L17 18L19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.05" />
      </svg>
    ),
    title: "Electrical Design & Consultancy",
    desc: "Load assessments, power distribution design, LV & MV systems, transformer and switchgear design, earthing, lightning protection and lighting layouts.",
    items: ["Low & Medium Voltage Systems", "Transformer & Switchgear Design", "Earthing & Lightning Protection", "Lighting & Small Power Layouts"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3" />
      </svg>
    ),
    title: "Installation & Supervision",
    desc: "End-to-end installation supervision, site inspection, testing, commissioning and certification with full contractor technical support.",
    items: ["Site Inspection & Testing", "Commissioning & Certification", "Project Coordination", "Quality Assurance & Compliance"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]" aria-hidden="true">
        <path d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
        <path d="M12 7.5L16.5 10.5V14.5L12 17.5L7.5 14.5V10.5L12 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
        <path d="M12 2.5V7.5M20.5 16.5L16.5 14.5M3.5 16.5L7.5 14.5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
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
    image: imgEVCharging,
  },
  {
    num: "02",
    title: "Kooba Data Center",
    location: "Mombasa, Kenya",
    desc: "Tier 3 data center design — USD 2.5M project including RMU systems, transformers, UPS, generators and dual power supply configuration.",
    tag: "Data Center",
    image: imgDataCenter,
  },
  {
    num: "03",
    title: "BATUK Phase 2A",
    location: "Laikipia, Kenya",
    desc: "KES 442M electrical design and supervision for accommodation, catering and support facilities including street lighting and fire alarm systems.",
    tag: "Infrastructure",
    image: imgLines,
  },
  {
    num: "04",
    title: "Off-Grid Solar Installation",
    location: "Remote Facility",
    desc: "80 kWp solar PV system including inverters, protection systems, charge controllers and full commissioning in a remote off-grid facility.",
    tag: "Solar",
    image: imgSolarInstallation,
  },
];

const whyUs = [
  { icon: "🏆", title: "Experienced Leadership",    desc: "Led by a Professional Electrical Engineer with 12+ years across Africa and the Middle East." },
  { icon: "📋", title: "International Standards",   desc: "Every project designed to BS 7671, IEC 60364, NFPA and local KS 662 standards." },
  { icon: "🛡️", title: "Strong Safety Compliance", desc: "Safety of life and protection of property is at the core of every engineering decision." },
  { icon: "📊", title: "Proven Project History",    desc: "Successfully delivered residential, commercial, industrial, military and infrastructure projects." },
  { icon: "🔧", title: "Reliable Supervision",      desc: "Full site inspection, testing, commissioning and certification on every project." },
  { icon: "💰", title: "Cost-Effective Solutions",  desc: "High-quality engineering that meets your budget without compromising on compliance." },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projectsWithImages = projects.map((p) =>
    p.num === "01" ? { ...p, image: imgEVCharging } : p
  );

  const filteredProjects =
    activeFilter === "All"
      ? projectsWithImages
      : projectsWithImages.filter((p) => p.tag === activeFilter);

  return (
    <>
      {/* ── Shared SEO: title, description, canonical, Open Graph, Twitter ── */}
      <SEO
        title="ELDEC Limited | Electrical Engineering & ELV Design Consultancy, Nairobi"
        description="ELDEC Limited delivers electrical design, ELV, solar, and EV charging engineering across Kenya, Africa, and the Middle East — built to international standards."
        path="/"
      />

      {/* ── Extra tags specific to this page, not covered by the shared component ──
          Note: the LocalBusiness/ProfessionalService JSON-LD block that used to live
          here has been removed — it's now rendered once, site-wide, by
          <LocalBusinessSchema /> in App.jsx. Keeping it in both places would give
          search engines two competing structured-data blocks for the same business. */}
      <Helmet>
        <meta
          name="keywords"
          content="electrical engineering Kenya, electrical consultancy Nairobi, LV MV design Africa, EV charging installation Kenya, solar PV off-grid, data center electrical design, hazardous area installation, BS 7671 IEC 60364, ELDEC Limited"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
      </Helmet>

      <main className="bg-[#F8F4F0] overflow-x-hidden">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ minHeight: "95vh" }}
          aria-label="Hero — Powering Safe & Reliable Infrastructure"
        >
          {/* Real HV substation background */}
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${imgHeroBg})`,
              backgroundPosition: "center 40%",
              filter: "brightness(0.35) grayscale(15%)",
              transform: "translateZ(0)",
            }}
            role="img"
            aria-label="High-voltage substation — ELDEC electrical engineering projects"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(13,33,55,0.98) 0%, rgba(13,33,55,0.82) 45%, rgba(139,26,26,0.38) 100%)",
            }}
          />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 rounded-full animate-float"
                style={{
                  width:  `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top:    `${Math.random() * 100}%`,
                  left:   `${Math.random() * 100}%`,
                  animationDelay:    `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                }}
              />
            ))}
          </div>

          {/* Crimson left-edge accent */}
          <div className="absolute top-0 left-0 h-full w-[4px] bg-[#8B1A1A] z-20" aria-hidden="true" />

          {/* Content */}
          <div
            className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
            style={{ minHeight: "95vh", paddingTop: "160px", paddingBottom: "80px" }}
          >
            <div className="flex items-center gap-4 mb-8" style={{ animation: "fadeDown 0.7s ease both" }}>
              <span className="w-10 h-[2px] bg-[#8B1A1A] animate-pulse" aria-hidden="true" />
              <span className="font-sans text-[12px] md:text-[14px] tracking-[0.3em] uppercase text-[#F59E0B] font-bold"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                Professional Electrical Engineering
              </span>
            </div>

            <h1
              className="font-heading font-bold text-white leading-[0.95] mb-8"
              style={{
                fontSize: "clamp(48px, 9vw, 110px)",
                animation: "fadeUp 0.8s ease 0.1s both",
                textShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              Powering <br />
              <span className="text-[#8B1A1A] relative inline-block">
                Safe
                <svg className="absolute -bottom-2 left-0 w-full h-[3px]" viewBox="0 0 100 3" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 1.5 L100 1.5" stroke="#8B1A1A" strokeWidth="2" strokeDasharray="5 5" />
                </svg>
              </span>
              &amp; <br />
              Reliable <br />
              <span className="text-white/90">Infrastructure</span>
            </h1>

            <p
              className="font-sans text-white/90 text-lg md:text-xl max-w-2xl mb-12"
              style={{
                animation: "fadeUp 0.8s ease 0.25s both",
                lineHeight: "1.6",
                fontWeight: "400",
                letterSpacing: "0.015em",
                borderLeft: "2px solid rgba(139, 26, 26, 0.5)",
                paddingLeft: "20px",
              }}
            >
              <span className="font-bold text-white">ELDEC Limited</span> delivers electrical
              engineering consultancy, design, installation and project supervision across Africa —
              <span className="text-[#F59E0B] font-medium"> built to international standards, every time.</span>
            </p>

            <div className="flex flex-wrap gap-5" style={{ animation: "fadeUp 0.8s ease 0.4s both" }}>
              <Link
                to="/contact"
                className="group relative font-sans text-[12px] tracking-widest uppercase bg-[#8B1A1A] text-white px-10 py-5 hover:bg-[#a61f1f] transition-all duration-300 active:scale-95 shadow-lg font-bold overflow-hidden"
                aria-label="Start a project with ELDEC Limited"
              >
                <span className="relative z-10">Start a Project</span>
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center text-[#8B1A1A] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true">
                  Start a Project →
                </span>
              </Link>
              <Link
                to="/services"
                className="font-sans text-[12px] tracking-widest uppercase border border-white/60 text-white px-10 py-5 transition-all duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B] backdrop-blur-sm font-bold hover:scale-105"
                aria-label="View ELDEC electrical engineering services"
              >
                Our Services
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════ */}
        <section className="relative z-10 py-8 bg-gradient-to-b from-[#F8F4F0] to-white" aria-label="ELDEC at a glance">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(({ value, suffix, label, icon }, i) => (
                <div
                  key={label}
                  className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#0D2137]/05"
                  style={{ animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#8B1A1A]/10 to-[#8B1A1A]/05 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <div className="font-heading text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8B1A1A] to-[#a61f1f] bg-clip-text text-transparent mb-2">
                    <Counter target={value} suffix={suffix} />
                  </div>
                  <div className="font-sans text-xs tracking-[0.15em] uppercase text-[#0D2137]/60">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="about-heading">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#8B1A1A]/5 to-transparent" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">
                  Who We Are
                </span>
                <h2 id="about-heading" className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137] leading-tight mb-6">
                  Engineering Excellence <br />
                  <span className="text-[#8B1A1A] relative inline-block">
                    Built on Standards
                    <svg className="absolute -bottom-2 left-0 w-full" height="3" viewBox="0 0 200 3" aria-hidden="true">
                      <path d="M0 1.5 L200 1.5" stroke="#8B1A1A" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>
                  </span>
                </h2>
                <div className="space-y-4 text-[#0D2137] leading-relaxed">
                  <p className="text-justify">
                    ELDEC Limited is a private limited company incorporated in Kenya in 2025 to
                    provide professional Electrical Engineering Services, Consultancy, Design,
                    and Project Supervision.
                  </p>
                  <p className="text-justify text-[#0D2137]/70">
                    With a commitment to international standards and local expertise, we deliver
                    solutions that prioritize safety, reliability, and long-term operational efficiency.
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 mt-8 font-sans text-sm tracking-widest uppercase text-[#8B1A1A] group"
                  aria-label="Learn more about ELDEC Limited"
                >
                  <span>Learn More About Us</span>
                  <span className="w-8 h-[2px] bg-[#8B1A1A] group-hover:w-14 transition-all duration-300" aria-hidden="true" />
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="relative group">
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#8B1A1A]/20 group-hover:border-[#8B1A1A]/40 transition-all duration-500" aria-hidden="true" />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#8B1A1A]/20 group-hover:border-[#8B1A1A]/40 transition-all duration-500" aria-hidden="true" />
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8B1A1A] z-10" aria-hidden="true" />
                  <div className="overflow-hidden relative">
                    <img
                      src={imgAbout}
                      alt="ELDEC Limited — Engineering vision powering growth across Africa"
                      className="w-full h-[480px] object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      width="640"
                      height="480"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0D2137]/90 backdrop-blur-sm px-6 py-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B]">
                        Our Vision
                      </p>
                      <p className="font-body text-white text-sm mt-1">
                        Powering Growth Across Africa — Built on Engineering Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════ */}
        <section className="py-24 bg-gradient-to-b from-[#F8F4F0] to-white" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">
                What We Do
              </span>
              <h2 id="services-heading" className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">
                Our Core Services
              </h2>
              <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" aria-hidden="true" />
              <p className="font-body text-[#0D2137]/60 max-w-2xl mx-auto mt-4">
                Comprehensive electrical engineering solutions tailored to your specific needs
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map(({ icon, title, desc, items }, i) => (
                <FadeIn key={title} delay={i * 120}>
                  <article className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#8B1A1A] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        padding: "2px",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                        {icon}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#0D2137] mb-4 leading-snug">
                        {title}
                      </h3>
                      <p className="font-body text-[#0D2137]/70 text-sm leading-relaxed mb-6">
                        {desc}
                      </p>
                      <ul className="space-y-2" aria-label={`${title} service areas`}>
                        {items.map((item) => (
                          <li key={item} className="flex items-center gap-2 font-sans text-xs text-[#0D2137]/80 group-hover:text-[#0D2137] transition-colors">
                            <span className="w-4 h-[1px] bg-[#8B1A1A] group-hover:w-6 transition-all duration-300" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 mt-6 text-xs font-sans text-[#8B1A1A] opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-label={`Learn more about ${title}`}
                      >
                        Learn More
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════ */}
        <section className="py-24 bg-[#0D2137] relative overflow-hidden" aria-labelledby="projects-heading">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B1A1A]/5 to-transparent" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeIn className="mb-12">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">
                Track Record
              </span>
              <h2 id="projects-heading" className="font-heading text-4xl lg:text-5xl font-bold text-white">
                Featured Projects
              </h2>
              <div className="w-16 h-[3px] bg-[#8B1A1A] mt-6" aria-hidden="true" />
            </FadeIn>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter projects by category">
              {["All", "Energy", "Data Center", "Infrastructure", "Solar"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`px-6 py-2 text-sm font-sans tracking-wide uppercase transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#8B1A1A] text-white shadow-lg"
                      : "border border-white/20 text-white/70 hover:border-[#8B1A1A] hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map(({ num, title, location, desc, tag, image }, i) => (
                <FadeIn key={title} delay={i * 100}>
                  <article className="group relative border border-white/10 hover:border-[#8B1A1A]/60 transition-all duration-500 bg-white/5 backdrop-blur-sm hover:bg-white/10 overflow-hidden">

                    {image ? (
                      <div className="relative overflow-hidden h-52">
                        <img
                          src={image}
                          alt={`${title} — ${location} — ELDEC Limited project`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          style={{ filter: "brightness(0.8)" }}
                          width="640"
                          height="208"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137]/90 via-[#0D2137]/20 to-transparent" aria-hidden="true" />
                        <span className="absolute top-4 right-4 font-sans font-bold text-xs text-[#F59E0B] border border-[#F59E0B]/40 px-3 py-1 bg-[#0D2137]/70 backdrop-blur-sm">
                          {tag}
                        </span>
                        <span className="absolute top-2 left-4 font-heading text-6xl font-bold text-white/10" aria-hidden="true">
                          {num}
                        </span>
                      </div>
                    ) : (
                      <div className="relative h-2 bg-gradient-to-r from-[#8B1A1A]/40 to-transparent" aria-hidden="true" />
                    )}

                    <div className="p-8">
                      {!image && (
                        <div className="flex items-start justify-between mb-6">
                          <span className="font-heading text-5xl font-bold text-white/10 group-hover:text-white/20 transition-all duration-500" aria-hidden="true">
                            {num}
                          </span>
                          <span className="font-sans font-bold text-xs text-[#F59E0B] border border-[#F59E0B]/30 px-3 py-1 group-hover:bg-[#F59E0B]/10 transition-all">
                            {tag}
                          </span>
                        </div>
                      )}
                      <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-[#F59E0B] transition-colors">
                        {title}
                      </h3>
                      <p className="font-sans text-xs text-[#8B1A1A] mb-4 uppercase tracking-wide">
                        <span className="sr-only">Location: </span>{location}
                      </p>
                      <p className="font-body text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                        {desc}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════ */}
        <section className="py-24 bg-white relative" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">
                Why Choose Us
              </span>
              <h2 id="why-heading" className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">
                The ELDEC Advantage
              </h2>
              <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" aria-hidden="true" />
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyUs.map(({ icon, title, desc }, i) => (
                <FadeIn key={title} delay={i * 80}>
                  <div className="group flex gap-5 p-6 rounded-2xl hover:bg-[#F8F4F0] transition-all duration-500 hover:shadow-xl">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#8B1A1A] to-[#a61f1f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg" aria-hidden="true">
                      <span className="text-2xl">{icon}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#0D2137] mb-2 group-hover:text-[#8B1A1A] transition-colors">
                        {title}
                      </h3>
                      <p className="font-body text-[#0D2137]/70 text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA
        ══════════════════════════════════════════ */}
        <section className="relative bg-[#8B1A1A] py-24 overflow-hidden" aria-label="Start your project with ELDEC Limited">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
            />
            <div
              className="absolute inset-0 animate-pulse"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeIn className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Power Your Next Project?
              </h2>
              <p className="font-body text-lg mb-10 text-white/80 leading-relaxed">
                From initial design to final commissioning — ELDEC delivers engineering
                solutions built to international standards, every time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="group relative bg-white text-[#8B1A1A] px-10 py-4 uppercase text-sm tracking-widest font-sans font-bold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  aria-label="Contact ELDEC to start your electrical engineering project"
                >
                  <span className="relative z-10">Start a Project</span>
                  <span className="absolute inset-0 bg-[#8B1A1A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
                  <span className="absolute inset-0 flex items-center justify-center text-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true">
                    Start a Project →
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-white/40 text-white px-10 py-4 uppercase text-sm tracking-widest font-sans font-bold hover:border-white hover:bg-white/10 transition-all duration-300"
                  aria-label="Explore ELDEC electrical engineering services"
                >
                  Explore Services
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
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            50%       { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          }
          .animate-float {
            animation: float linear infinite;
          }
        `}</style>
      </main>
    </>
  );
}
