import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Import project images ──
import imgPanel from "../assets/logo/image3.jpeg";
import imgHeroBg from "../assets/logo/powerstation3.jpg";

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
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Countries" },
  { value: 12, suffix: "+", label: "Major Projects" },
  { value: 1, suffix: "", label: "Lead Engineer" },
];

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.25"
        />
        <path
          d="M7 12H11L13 6L17 18L19 12H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.05" />
      </svg>
    ),
    title: "Electrical Design & Consultancy",
    desc: "Load assessments, power distribution design, LV & MV systems, transformer and switchgear design, earthing, lightning protection and lighting layouts.",
    items: [
      "Low & Medium Voltage Systems",
      "Transformer & Switchgear Design",
      "Earthing & Lightning Protection",
      "Lighting & Small Power Layouts",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <path
          d="M8 12L11 15L16 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 9H21M9 3V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.3"
        />
      </svg>
    ),
    title: "Installation & Supervision",
    desc: "End-to-end installation supervision, site inspection, testing, commissioning and certification with full contractor technical support.",
    items: [
      "Site Inspection & Testing",
      "Commissioning & Certification",
      "Project Coordination",
      "Quality Assurance & Compliance",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#8B1A1A]">
        <path
          d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <path
          d="M12 7.5L16.5 10.5V14.5L12 17.5L7.5 14.5V10.5L12 7.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
        <path
          d="M12 2.5V7.5M20.5 16.5L16.5 14.5M3.5 16.5L7.5 14.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    ),
    title: "Specialized Engineering",
    desc: "Data centers, EV charging stations, military & security facilities, fuel and hazardous area installations, industrial plants and off-grid power systems.",
    items: [
      "EV Charging Stations",
      "Data Centers",
      "Hazardous Area Installations",
      "Off-Grid Solar Power Systems",
    ],
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
  {
    title: "Experienced Leadership",
    desc: "Led by a Professional Electrical Engineer with 12+ years across Africa and the Middle East.",
  },
  {
    title: "International Standards",
    desc: "Every project designed to BS 7671, IEC 60364, NFPA and local KS 662 standards.",
  },
  {
    title: "Strong Safety Compliance",
    desc: "Safety of life and protection of property is at the core of every engineering decision.",
  },
  {
    title: "Proven Project History",
    desc: "Successfully delivered residential, commercial, industrial, military and infrastructure projects.",
  },
  {
    title: "Reliable Supervision",
    desc: "Full site inspection, testing, commissioning and certification on every project.",
  },
  {
    title: "Cost-Effective Solutions",
    desc: "High-quality engineering that meets your budget without compromising on compliance.",
  },
];

export default function Home() {
  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO — Adjusted Padding & Font Clarity
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "95vh" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] hover:scale-105"
          style={{
            backgroundImage: `url(${imgHeroBg})`,
            backgroundPosition: "center 30%",
            filter: "brightness(0.4) grayscale(10%)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(13,33,55,0.98) 0%, rgba(13,33,55,0.85) 40%, rgba(139,26,26,0.3) 100%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Crimson left-edge accent bar */}
        <div className="absolute top-0 left-0 h-full w-[4px] bg-[#8B1A1A] z-20" />
        {/* Main Hero Content */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
          style={{
            minHeight: "95vh",
            paddingTop: "160px",
            paddingBottom: "80px",
          }}
        >
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-8"
            style={{ animation: "fadeDown 0.7s ease both" }}
          >
            <span className="w-10 h-[2px] bg-[#8B1A1A]" />
            <span
              className="font-sans text-[12px] md:text-[14px] tracking-[0.3em] uppercase text-[#F59E0B] font-bold"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              Professional Electrical Engineering
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-heading font-bold text-white leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(48px, 9vw, 110px)",
              animation: "fadeUp 0.8s ease 0.1s both",
              textShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            Powering <br />
            <span className="text-[#8B1A1A]">Safe</span> &amp; <br />
            Reliable <br />
            <span className="text-white/90">Infrastructure</span>
          </h1>

          {/* FIXED: Styled Paragraph to align with Engineering Aesthetic */}
          <p
            className="font-sans text-white/90 text-lg md:text-xl max-w-2xl mb-12"
            style={{
              animation: "fadeUp 0.8s ease 0.25s both",
              lineHeight: "1.6",
              fontWeight: "400",
              letterSpacing: "0.015em", // Subtle spacing for better legibility
              borderLeft: "2px solid rgba(139, 26, 26, 0.5)", // Small accent border to anchor the text
              paddingLeft: "20px",
            }}
          >
            <span className="font-bold text-white">ELDEC Limited</span> delivers
            electrical engineering consultancy, design, installation and project
            supervision across Africa —
            <span className="text-[#F59E0B] font-medium">
              {" "}
              built to international standards, every time.
            </span>
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-5"
            style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
          >
            <Link
              to="/contact"
              className="font-sans text-[12px] tracking-widest uppercase bg-[#8B1A1A] text-white px-10 py-5 hover:bg-[#a61f1f] transition-all duration-300 active:scale-95 shadow-lg font-bold"
            >
              Start a Project
            </Link>
            <Link
              to="/services"
              className="font-sans text-[12px] tracking-widest uppercase border border-white/60 text-white px-10 py-5 transition-all duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B] backdrop-blur-sm font-bold"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section
        className="relative z-10"
        style={{
          background: "rgba(13,33,55,1)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="py-12 px-8 text-center">
                <div className="font-heading text-4xl lg:text-5xl font-bold text-[#F59E0B] mb-2">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="font-sans text-xs tracking-[0.15em] uppercase text-white/70">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">
                Who We Are
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137] leading-tight mb-6">
                Engineering Excellence <br />
                <span className="text-[#8B1A1A]">Built on Standards</span>
              </h2>
              <p className="font-body text-[#0D2137] leading-relaxed mb-4 text-justify">
                ELDEC Limited is a private limited company incorporated in Kenya
                in 2025 to provide professional Electrical Engineering Services,
                Consultancy, Design, and Project Supervision.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-[#8B1A1A] group"
              >
                <span>Learn More About Us</span>
                <span className="w-8 h-[2px] bg-[#8B1A1A] group-hover:w-14 transition-all duration-300" />
              </Link>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#8B1A1A]/20" />
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B1A1A] z-10" />
                <div className="overflow-hidden">
                  <img
                    src={imgPanel}
                    alt="ELDEC LV Panel"
                    className="w-full h-[480px] object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0D2137]/80 backdrop-blur-sm px-6 py-4">
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B]">
                      Real Project Work
                    </p>
                    <p className="font-body text-white text-sm mt-1">
                      LV Distribution Board — Commissioned & Certified
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">
              What We Do
            </span>
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
                  <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">
                    {icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#0D2137] mb-4 leading-snug">
                    {title}
                  </h3>
                  <p className="font-body text-[#0D2137] text-sm leading-relaxed mb-6">
                    {desc}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-sans text-xs text-[#0D2137]"
                      >
                        <span className="w-4 h-[1px] bg-[#8B1A1A]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS SECTION
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0D2137] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">
              Track Record
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white">
              Featured Projects
            </h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mt-6" />
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(({ num, title, location, desc, tag }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="group border border-white/10 p-8 hover:border-[#8B1A1A]/60 transition-all duration-500 bg-white/5">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-heading text-5xl font-bold text-white/10">
                      {num}
                    </span>
                    <span className="font-sans font-bold text-xs text-[#F59E0B] border border-[#F59E0B]/30 px-3 py-1">
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {title}
                  </h3>
                  <p className="font-sans text-xs text-[#8B1A1A] mb-4 uppercase">
                    {location}
                  </p>
                  <p className="font-body text-white text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US & CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-[#8B1A1A]/20 rounded-xl flex items-center justify-center group-hover:bg-[#8B1A1A] transition-all">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-6 h-6 text-[#8B1A1A] group-hover:text-white"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#0D2137] mb-2">
                      {title}
                    </h3>
                    <p className="font-body text-[#0D2137] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#8B1A1A] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
          <FadeIn className="max-w-2xl">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
              Let's Start Your Next Project Together
            </h2>
            <p className="font-body text-lg mb-10 opacity-80">
              From design to commissioning — ELDEC delivers engineering
              solutions built to last.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-white text-[#8B1A1A] px-10 py-4 uppercase text-sm tracking-widest font-sans"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
