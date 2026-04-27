import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Image Imports ──
import imgHeroBg      from "../assets/logo/powerstation3.jpg";
import imgStation     from "../assets/logo/station.jpg";
import imgDataCenter  from "../assets/logo/datacenter.png";
import imgFuelStation from "../assets/logo/fuelstation.jpg";
import imgEV          from "../assets/logo/evcharging.jpg";
import imgHybrid      from "../assets/logo/hybridsystem.jpg";
import imgLines       from "../assets/logo/image4.jpeg";
import imgPanel       from "../assets/logo/image7.jpeg";
import imgSolarInstallation from "../assets/logo/solar2.jpg";
import imgSolar       from "../assets/logo/solar1.jpg";
import imgSecurity     from "../assets/logo/image1.jpeg"; 
import imgInfrustructure from "../assets/logo/powerstation2.jpg"; 
import imgEducation     from "../assets/logo/image8.jpeg";

/* ══════════════════════════════════════════
    HOOKS
══════════════════════════════════════════ */
function useInView(threshold = 0.12) {
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

/* ══════════════════════════════════════════
    DATA
══════════════════════════════════════════ */
const coreServices = [
  {
    id: "01",
    title: "Electrical Design & Consultancy",
    shortDesc: "Comprehensive electrical design and engineering consultancy — from initial load assessment through to detailed technical drawings and specifications.",
    fullDesc: "Tailored to your project's specific requirements, our design consultancy covers every stage of the electrical engineering process. We produce accurate, standards-compliant documentation that forms the backbone of every successful installation — from concept to construction.",
    items: [
      "Load assessment and power calculations",
      "Power distribution design",
      "Low voltage (LV) system design",
      "Medium voltage (MV) system design",
      "Transformer and switchgear design",
      "Earthing & lightning protection systems",
      "Lighting & small power layouts",
      "Fire alarm & emergency lighting systems",
      "Solar & backup power system design",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5 11.12 10 12.5 10c.57 0 1.08.19 1.5.5V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Installation & Supervision",
    shortDesc: "End-to-end installation oversight ensuring every electrical system is built exactly to specification, tested thoroughly and certified before handover.",
    fullDesc: "Our supervision service places a qualified electrical engineer on-site throughout the construction phase. We coordinate with contractors, verify workmanship, conduct structured testing programmes and issue formal certification — giving clients confidence that every system is safe and compliant.",
    items: [
      "Electrical installation supervision",
      "Site inspection & testing",
      "Commissioning & certification",
      "Project coordination",
      "Contractor technical support",
      "Quality assurance & compliance checks",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Specialized Engineering",
    shortDesc: "High-specification electrical engineering for demanding environments — from data centres to hazardous area installations and military-grade facilities.",
    fullDesc: "We bring deep experience in environments where electrical engineering demands exceptional precision, specialist compliance and robust risk management. Our team is qualified to work across hazardous zones, mission-critical infrastructure and off-grid systems where standard approaches fall short.",
    items: [
      "Data centers (Tier 3 design)",
      "EV charging stations & infrastructure",
      "Military & security facilities",
      "Fuel & hazardous area installations",
      "Industrial plant electrical works",
      "Off-grid solar power systems",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  },
];

const training = [
  {
    title: "Electrical Safety",
    desc: "Hazard identification, safe working practices and regulatory compliance for site personnel and engineers.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>,
  },
  {
    title: "Electrical Installation",
    desc: "Correct installation methods, cable management, termination techniques and testing procedures to industry standards.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" /></svg>,
  },
  {
    title: "Regulations & Compliance",
    desc: "KS 662, Energy Act 2019, BS 7671 IET Wiring Regulations and IEC/NFPA codes for engineers and project managers.",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>,
  },
];

// ── Tag → background image ──
const tagImages = {
  Energy:         imgEV,
  Solar:          imgSolar,
  Infrastructure: imgInfrustructure,
  Security:       imgSecurity,
  Commercial:     imgHybrid,
  Hazardous:      imgFuelStation,
  "Data Center":  imgDataCenter,
  Distribution:   imgLines,
  Education:      imgEducation,
  Industrial:     imgSolarInstallation,
};

const tagColors = {
  Energy:         "bg-[#EAF3DE] text-[#3B6D11] border-[#97C459]",
  Solar:          "bg-[#FAEEDA] text-[#633806] border-[#FAC775]",
  Infrastructure: "bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]",
  Security:       "bg-[#F1EFE8] text-[#5F5E5A] border-[#B4B2A9]",
  Commercial:     "bg-[#FBEAF0] text-[#993556] border-[#ED93B1]",
  Hazardous:      "bg-[#FCEBEB] text-[#A32D2D] border-[#F09595]",
  "Data Center":  "bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5]",
  Distribution:   "bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]",
  Education:      "bg-[#FAEEDA] text-[#633806] border-[#FAC775]",
  Industrial:     "bg-[#F1EFE8] text-[#5F5E5A] border-[#B4B2A9]",
};

const projects = [
  { num: "01", title: "Electric Vehicle Charging Stations", location: "Kenya & Rwanda",           value: "7,500 kW",       desc: "Design and installation of EV charging stations with cumulative capacity of 7,500 kW including transformers, LV distribution, DC fast chargers, and outdoor yard installations.", tag: "Energy" },
  { num: "02", title: "Off-Grid Solar Installation",         location: "Remote Facility",          value: "80 kWp",         desc: "Design and implementation of solar PV system including inverters, protection systems, charge controllers, and commissioning in remote facility.", tag: "Solar" },
  { num: "03", title: "Rapid Deployment Camps",             location: "Various Countries",         value: "Multi-site",     desc: "Electrical design for temporary and permanent camps including generators, LV distribution, fuel systems, and hazardous area installations.", tag: "Infrastructure" },
  { num: "04", title: "Police Training Facility",           location: "Somalia",                   value: "Full Design",    desc: "Electrical tender proposal and system design including power distribution, lighting, and generator backup.", tag: "Security" },
  { num: "05", title: "Oman Camp Facilities",               location: "Oman",                      value: "Multi-building", desc: "Electrical design for hangars, kitchens, and camp buildings including lighting, distribution, and lightning protection.", tag: "Infrastructure" },
  { num: "06", title: "Catmini Plot Development",           location: "Central African Republic",  value: "Full LV Design", desc: "Electrical design for residential/hotel development including full LV distribution and feasibility study.", tag: "Commercial" },
  { num: "07", title: "Fuel Support Installations",         location: "Various Countries",         value: "NFPA & UFC",     desc: "Design of electrical systems for fuel storage and servicing facilities complying with NFPA and UFC standards.", tag: "Hazardous" },
  { num: "08", title: "Kooba Data Center",                  location: "Mombasa, Kenya",            value: "USD 2.5M",       desc: "Tier 3 data center design including RMU systems, transformers, UPS, generators, and dual power supply configuration.", tag: "Data Center" },
  { num: "09", title: "BATUK Phase 2A",                     location: "Laikipia, Kenya",           value: "KES 442M",       desc: "Electrical design and supervision for accommodation, catering, and support facilities including street lighting and fire alarm systems.", tag: "Infrastructure" },
  { num: "10", title: "BATUK HV & LV Distribution",        location: "Laikipia, Kenya",           value: "KES 248M",       desc: "Design of electrical distribution network including substations, overhead lines, transformers, and protection systems.", tag: "Distribution" },
  { num: "11", title: "Peponi School Electrical Upgrade",   location: "Nairobi, Kenya",            value: "KES 33M",        desc: "Upgrade to 11kV supply, installation of RMU, transformer, and internal wiring systems.", tag: "Education" },
  { num: "12", title: "Buhler Service Center",              location: "Kenya",                     value: "KES 24M",        desc: "Electrical works for warehouse, offices, and industrial plant.", tag: "Industrial" },
];

/* ── Scope list item ── */
function ScopeItem({ text }) {
  return (
    <li className="flex items-start gap-3 group">
      <span className="flex-shrink-0 w-5 h-5 bg-[#F8F4F0] group-hover:bg-[#8B1A1A] flex items-center justify-center mt-0.5 transition-colors duration-300">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#8B1A1A] group-hover:fill-white transition-colors duration-300">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </span>
      <span className="font-body text-[#0D2137] text-sm leading-relaxed">{text}</span>
    </li>
  );
}

/* ── Project card with image thumbnail + smooth expand ── */
function ProjectCard({ project, index, expanded, onToggle }) {
  const bgImg = tagImages[project.tag] || imgPanel;
  const isOpen = expanded === index;

  return (
    <FadeIn delay={Math.min(index * 55, 380)}>
      <div className="group relative flex flex-col overflow-hidden border border-white/10 hover:border-[#8B1A1A]/50 transition-colors duration-300 h-full">

        {/* Image thumbnail */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <img
            src={bgImg}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ filter: "brightness(0.45)" }}
          />
          {/* bottom-to-top fade into card body colour */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,33,55,0.15) 0%, rgba(13,33,55,0.96) 100%)" }} />
          {/* animated top border */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
          {/* project number watermark */}
          <span className="absolute top-3 left-4 font-heading text-5xl font-bold text-white/12 leading-none select-none">{project.num}</span>
          {/* tag badge */}
          <span className={`absolute top-3 right-3 font-sans text-[10px] font-bold tracking-wider uppercase px-2 py-1 border ${tagColors[project.tag] || "bg-white/10 text-white/50"}`}>
            {project.tag}
          </span>
          {/* title + meta over image bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <h3 className="font-heading text-base font-bold text-white leading-snug mb-1">{project.title}</h3>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] tracking-wide uppercase text-[#8B1A1A] font-bold">{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="font-sans text-[10px] tracking-wide text-[#F59E0B] font-bold">{project.value}</span>
            </div>
          </div>
        </div>

        {/* Expandable description */}
        <div
          className="bg-[#0a1929] px-5 overflow-hidden transition-all duration-500"
          style={{ maxHeight: isOpen ? "180px" : "0px", opacity: isOpen ? 1 : 0 }}
        >
          <p className="font-body text-white/60 text-sm leading-relaxed py-4">{project.desc}</p>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => onToggle(index)}
          className="bg-[#0D2137] border-t border-white/08 px-5 py-3 flex items-center justify-between w-full hover:bg-[#0a1929] transition-colors duration-300 flex-shrink-0"
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-white/35 hover:text-[#F59E0B] transition-colors duration-300">
            {isOpen ? "Show Less" : "Read More"}
          </span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-4 h-4 text-white/30 transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
    PAGE
══════════════════════════════════════════ */
export default function Services() {
  const [activeService,   setActiveService]   = useState(0);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  const serviceImages = [imgStation, imgDataCenter, imgFuelStation];

  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgHeroBg})`, backgroundPosition: "center 30%", filter: "brightness(0.42) grayscale(10%)", transform: "scale(1.04)", transition: "transform 8s ease" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(13,33,55,0.97) 0%, rgba(13,33,55,0.80) 45%, rgba(139,26,26,0.28) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-0 h-full w-[3px] bg-[#8B1A1A] z-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center" style={{ minHeight: "88vh", paddingTop: "150px", paddingBottom: "72px" }}>
          <div className="flex items-center gap-3 mb-8" style={{ animation: "fadeDown 0.7s ease both" }}>
            <span className="w-8 h-[2px] bg-[#8B1A1A]" />
            <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#F59E0B]">What We Offer</span>
          </div>
          <h1 className="font-heading font-bold text-white leading-[0.93] mb-8" style={{ fontSize: "clamp(50px, 9vw, 108px)", animation: "fadeUp 0.8s ease 0.1s both" }}>
            Our<br /><span className="text-[#8B1A1A]">Services</span><br />&amp;<br /><span className="text-white/85">Expertise</span>
          </h1>
          <p className="font-body text-white/75 text-lg max-w-xl leading-relaxed mb-12" style={{ animation: "fadeUp 0.8s ease 0.25s both", borderLeft: "2px solid rgba(139,26,26,0.5)", paddingLeft: "18px" }}>
            From electrical design to specialised installations —{" "}
            <span className="text-[#F59E0B]">ELDEC delivers engineering solutions that are safe, compliant and built to last.</span>
          </p>
          <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.8s ease 0.4s both" }}>
            <Link to="/contact" className="font-sans text-[11px] tracking-widest uppercase bg-[#8B1A1A] text-white px-8 py-4 hover:bg-[#6e1515] transition-all duration-300 active:scale-95" onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(139,26,26,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>Start a Project</Link>
            <a href="#services" className="font-sans text-[11px] tracking-widest uppercase border border-white/40 text-white px-8 py-4 transition-all duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B]">Explore Services</a>
          </div>
        </div>
      </section>

      {/* ══ CORE SERVICES — TABBED ══ */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Core Offerings</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Engineering Services</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>
          <div className="flex flex-col sm:flex-row border-b border-[#0D2137]/10">
            {coreServices.map(({ id, title }, i) => (
              <button key={id} onClick={() => { setActiveService(i); setExpandedService(null); }} className={`flex items-center gap-3 px-6 py-4 font-sans text-sm tracking-wide transition-all duration-300 border-b-2 -mb-[1px] text-left ${activeService === i ? "border-[#8B1A1A] text-[#8B1A1A]" : "border-transparent text-[#0D2137]/50 hover:text-[#0D2137]"}`}>
                <span className="font-heading text-xs text-[#8B1A1A]/40">{id}</span>{title}
              </button>
            ))}
          </div>
          {coreServices.map(({ id, title, icon, shortDesc, fullDesc, items }, i) => (
            <div key={id} style={{ display: activeService === i ? "block" : "none" }}>
              <div className="grid lg:grid-cols-5 border border-[#0D2137]/08">
                <div className="lg:col-span-2 relative overflow-hidden group" style={{ minHeight: "420px" }}>
                  <img src={serviceImages[i]} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "brightness(0.52)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,33,55,0.9) 0%, rgba(13,33,55,0.3) 60%, transparent 100%)" }} />
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-[#8B1A1A]" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F59E0B] block mb-2">Service {id}</span>
                    <h3 className="font-heading text-2xl font-bold text-white leading-snug">{title}</h3>
                  </div>
                </div>
                <div className="lg:col-span-3 p-8 lg:p-12 bg-[#F8F4F0]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#8B1A1A] flex items-center justify-center text-white flex-shrink-0">{icon}</div>
                    <p className="font-body text-[#0D2137]/70 text-sm leading-relaxed max-w-md">{shortDesc}</p>
                  </div>
                  {expandedService === i ? (
                    <>
                      <p className="font-body text-[#0D2137] text-sm leading-relaxed mb-6">{fullDesc}</p>
                      <h4 className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#0D2137]/40 mb-4">Scope includes</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                        {items.map((item) => <ScopeItem key={item} text={item} />)}
                      </ul>
                      <button onClick={() => setExpandedService(null)} className="font-sans text-[11px] tracking-widest uppercase text-[#8B1A1A] flex items-center gap-2 hover:gap-4 transition-all duration-300">
                        Show Less <span className="w-6 h-[1px] bg-[#8B1A1A] inline-block" />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setExpandedService(i)} className="font-sans text-[11px] tracking-widest uppercase bg-[#8B1A1A] text-white px-6 py-3 hover:bg-[#6e1515] transition-all duration-300 mt-2">
                      Read More
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ IMAGE SHOWCASE STRIP ══ */}
      <section className="bg-[#0D2137]">
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { img: imgStation,     label: "Motor Control Centres",  sub: "LV / MV Installations" },
              { img: imgDataCenter,  label: "Data Centre Engineering", sub: "Tier 3 Design" },
              { img: imgFuelStation, label: "Fuel Station Systems",    sub: "Hazardous Area Works" },
            ].map(({ img, label, sub }) => (
              <div key={label} className="relative h-64 overflow-hidden group">
                <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: "brightness(0.48)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,33,55,0.92) 0%, transparent 60%)" }} />
                <div className="absolute top-0 left-0 w-0 group-hover:w-[3px] h-full bg-[#8B1A1A] transition-all duration-500" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F59E0B] mb-1">{sub}</p>
                  <p className="font-heading text-lg font-bold text-white">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECHNICAL TRAINING ══ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Knowledge Transfer</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Technical Training</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {training.map(({ title, desc, icon }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="bg-white border border-[#0D2137]/10 p-8 group hover:border-[#8B1A1A] transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  <div className="w-11 h-11 bg-[#0D2137] group-hover:bg-[#8B1A1A] flex items-center justify-center text-white mb-6 transition-colors duration-300">{icon}</div>
                  <h3 className="font-heading text-xl font-bold text-[#0D2137] mb-3">{title}</h3>
                  <p className="font-body text-[#0D2137] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECT EXPERIENCE — image cards ══ */}
      <section className="py-24 bg-[#0D2137] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B1A1A] opacity-10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">Track Record</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-2">Project Experience</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mt-4" />
          </FadeIn>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={i}
                expanded={expandedProject}
                onToggle={(idx) => setExpandedProject((prev) => (prev === idx ? null : idx))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative bg-[#8B1A1A] py-20 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 0% 100%, #000 0%, transparent 60%), radial-gradient(circle at 100% 0%, #000 0%, transparent 60%)" }} />
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-white/60 mb-4 block">Ready to Build?</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-5">Need an Engineering Solution?</h2>
            <p className="font-body text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From design to commissioning — ELDEC delivers electrical engineering solutions that are safe, compliant and built to last.
            </p>
            <Link to="/contact" className="inline-block font-sans text-sm tracking-widest uppercase bg-white text-[#8B1A1A] px-10 py-5 hover:bg-[#F8F4F0] transition-all duration-300 active:scale-95 font-bold">
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(30px);  } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
