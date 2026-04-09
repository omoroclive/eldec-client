import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── in-view hook ── */
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

/* ══ DATA ══ */
const coreServices = [
  {
    id: "01",
    title: "Electrical Design & Consultancy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5 11.12 10 12.5 10c.57 0 1.08.19 1.5.5V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
      </svg>
    ),
    desc: "Comprehensive electrical design and engineering consultancy tailored to your project's specific requirements — from initial load assessment through to detailed technical drawings and specifications.",
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
  },
  {
    id: "02",
    title: "Installation & Supervision",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
      </svg>
    ),
    desc: "End-to-end installation oversight ensuring every electrical system is built exactly to specification, tested thoroughly and certified before handover.",
    items: [
      "Electrical installation supervision",
      "Site inspection & testing",
      "Commissioning & certification",
      "Project coordination",
      "Contractor technical support",
      "Quality assurance & compliance checks",
    ],
  },
  {
    id: "03",
    title: "Specialized Engineering Works",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    desc: "Complex and high-specification electrical engineering for demanding environments — from military-grade facilities to hazardous area installations and cutting-edge data centres.",
    items: [
      "Data centers (Tier 3 design)",
      "EV charging stations & infrastructure",
      "Military & security facilities",
      "Fuel & hazardous area installations",
      "Industrial plant electrical works",
      "Off-grid power systems",
    ],
  },
];

const training = [
  {
    title: "Electrical Safety",
    desc: "Comprehensive training covering electrical safety principles, hazard identification, safe working practices and regulatory compliance for site personnel and engineers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
  },
  {
    title: "Electrical Installation",
    desc: "Practical and theoretical training on correct installation methods, cable management, termination techniques and testing procedures to industry standards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    ),
  },
  {
    title: "Electrical Engineering Regulations & Compliance",
    desc: "In-depth training on Kenya's KS 662, Energy Act 2019, BS 7671 IET Wiring Regulations and relevant IEC/NFPA codes — essential for engineers and project managers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
  },
];

const projects = [
  { num: "01", title: "Electric Vehicle Charging Stations", location: "Kenya & Rwanda",        value: "7,500 kW",     desc: "Design and installation of EV charging stations with cumulative capacity of 7,500 kW including transformers, LV distribution, DC fast chargers, and outdoor yard installations.", tag: "Energy" },
  { num: "02", title: "Off-Grid Solar Installation",        location: "Remote Facility",        value: "80 kWp",       desc: "Design and implementation of solar PV system including inverters, protection systems, charge controllers, and commissioning in remote facility.", tag: "Solar" },
  { num: "03", title: "Rapid Deployment Camps",            location: "Various Countries",       value: "Multi-site",   desc: "Electrical design for temporary and permanent camps including generators, LV distribution, fuel systems, and hazardous area installations.", tag: "Infrastructure" },
  { num: "04", title: "Police Training Facility",          location: "Somalia",                 value: "Full Design",  desc: "Electrical tender proposal and system design including power distribution, lighting, and generator backup.", tag: "Security" },
  { num: "05", title: "Oman Camp Facilities",              location: "Oman",                    value: "Multi-building",desc: "Electrical design for hangars, kitchens, and camp buildings including lighting, distribution, and lightning protection.", tag: "Infrastructure" },
  { num: "06", title: "Catmini Plot Development",          location: "Central African Republic",value: "Full LV Design",desc: "Electrical design for residential/hotel development including full LV distribution and feasibility study.", tag: "Commercial" },
  { num: "07", title: "Fuel Support Installations",        location: "Various Countries",       value: "NFPA & UFC",   desc: "Design of electrical systems for fuel storage and servicing facilities complying with NFPA and UFC standards.", tag: "Hazardous" },
  { num: "08", title: "Kooba Data Center",                 location: "Mombasa, Kenya",          value: "USD 2.5M",     desc: "Tier 3 data center design including RMU systems, transformers, UPS, generators, and dual power supply configuration.", tag: "Data Center" },
  { num: "09", title: "BATUK Phase 2A",                   location: "Laikipia, Kenya",         value: "KES 442M",     desc: "Electrical design and supervision for accommodation, catering, and support facilities including street lighting and fire alarm systems.", tag: "Infrastructure" },
  { num: "10", title: "BATUK HV & LV Distribution",       location: "Laikipia, Kenya",         value: "KES 248M",     desc: "Design of electrical distribution network including substations, overhead lines, transformers, and protection systems.", tag: "Distribution" },
  { num: "11", title: "Peponi School Electrical Upgrade",  location: "Nairobi, Kenya",          value: "KES 33M",      desc: "Upgrade to 11kV supply, installation of RMU, transformer, and internal wiring systems.", tag: "Education" },
  { num: "12", title: "Buhler Service Center",             location: "Kenya",                   value: "KES 24M",      desc: "Electrical works for warehouse, offices, and industrial plant.", tag: "Industrial" },
];

const tagColors = {
  Energy:        "bg-[#EAF3DE] text-[#3B6D11] border-[#97C459]",
  Solar:         "bg-[#FAEEDA] text-[#633806] border-[#FAC775]",
  Infrastructure:"bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]",
  Security:      "bg-[#F1EFE8] text-[#5F5E5A] border-[#B4B2A9]",
  Commercial:    "bg-[#FBEAF0] text-[#993556] border-[#ED93B1]",
  Hazardous:     "bg-[#FCEBEB] text-[#A32D2D] border-[#F09595]",
  "Data Center": "bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5]",
  Distribution:  "bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]",
  Education:     "bg-[#FAEEDA] text-[#633806] border-[#FAC775]",
  Industrial:    "bg-[#F1EFE8] text-[#5F5E5A] border-[#B4B2A9]",
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">

      {/* ══ HERO — gray-950 warm dark ══ */}
      <section className="relative bg-gray-950 pt-40 pb-32 overflow-hidden">
        {/* warm radial glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(139,26,26,0.25) 0%, transparent 55%), radial-gradient(ellipse at 90% 20%, rgba(80,40,10,0.2) 0%, transparent 50%)" }} />
        {/* diagonal red shard */}
        <div className="absolute bottom-0 left-0 w-3/4 h-full bg-[#8B1A1A] opacity-10"
          style={{ clipPath: "polygon(0 0%, 70% 0%, 100% 100%, 0% 100%)" }} />
        {/* grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "70px 70px" }} />
        {/* lightning watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none hidden lg:block">
          <svg viewBox="0 0 24 24" fill="#F59E0B" className="w-[500px] h-[500px]">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-6" style={{ animation: "fadeDown 0.7s ease both" }}>
            <span className="w-8 h-[2px] bg-[#8B1A1A]" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B]">What We Offer</span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
            Our <span className="text-[#8B1A1A]">Services</span>
            <br /><span className="text-white/25">&amp; Expertise</span>
          </h1>
          <p className="font-body text-white/60 text-lg max-w-xl leading-relaxed"
            style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
            From electrical design to specialised installations — ELDEC delivers
            engineering solutions that are safe, compliant and built to last.
          </p>
        </div>
      </section>

      {/* ══ CORE SERVICES — TABBED ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Core Offerings</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Engineering Services</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
          </FadeIn>

          {/* Tab buttons */}
          <FadeIn className="flex flex-col sm:flex-row gap-2 mb-0 border-b border-[#0D2137]/10">
            {coreServices.map(({ id, title }, i) => (
              <button key={id} onClick={() => setActiveService(i)}
                className={`flex items-center gap-3 px-6 py-4 font-sans text-sm tracking-wide transition-all duration-300 border-b-2 -mb-[1px] text-left ${
                  activeService === i
                    ? "border-[#8B1A1A] text-[#8B1A1A]"
                    : "border-transparent text-[#0D2137]/50 hover:text-[#0D2137]"
                }`}>
                <span className="font-heading text-xs text-[#8B1A1A]/40">{id}</span>
                {title}
              </button>
            ))}
          </FadeIn>

          {/* Tab content */}
          {coreServices.map(({ id, title, icon, desc, items }, i) => (
            <div key={id} style={{ display: activeService === i ? "block" : "none" }}>
              <div className="grid lg:grid-cols-2 gap-12 pt-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#8B1A1A] flex items-center justify-center text-white flex-shrink-0">{icon}</div>
                    <div>
                      <p className="font-sans text-xs tracking-widest uppercase text-[#8B1A1A]">Service {id}</p>
                      <h3 className="font-heading text-2xl font-bold text-[#0D2137]">{title}</h3>
                    </div>
                  </div>
                  <p className="font-body text-[#0D2137]/65 leading-relaxed mb-8 text-justify">{desc}</p>
                  <Link to="/contact"
                    className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-[#8B1A1A] group">
                    <span>Enquire About This Service</span>
                    <span className="w-8 h-[2px] bg-[#8B1A1A] group-hover:w-14 transition-all duration-300" />
                  </Link>
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#0D2137]/40 mb-5">Scope includes</h4>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 bg-[#F8F4F0] group-hover:bg-[#8B1A1A] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                          <svg viewBox="0 0 24 24" fill="#8B1A1A" className="w-3 h-3 group-hover:fill-white transition-colors duration-300">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="font-body text-[#0D2137]/70 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TECHNICAL TRAINING ══ */}
      <section className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#8B1A1A] mb-4 block">Knowledge Transfer</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#0D2137]">Technical Training</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mx-auto mt-6" />
            <p className="font-body text-[#0D2137]/60 max-w-lg mx-auto mt-5 leading-relaxed">
              We offer structured technical training programmes for engineers, contractors and project teams.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {training.map(({ title, desc, icon }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="bg-white border border-[#0D2137]/10 p-8 group hover:border-[#8B1A1A] hover:shadow-xl hover:shadow-[#8B1A1A]/10 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  {/* gray-900 icon box instead of navy */}
                  <div className="w-12 h-12 bg-gray-900 group-hover:bg-[#8B1A1A] flex items-center justify-center text-white mb-6 transition-colors duration-500">
                    {icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#0D2137] mb-4 leading-snug">{title}</h3>
                  <p className="font-body text-[#0D2137]/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECT EXPERIENCE — gray-950 ══ */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* red glow bottom right */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#8B1A1A] opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-16">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F59E0B] mb-4 block">Track Record</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">Project Experience</h2>
            <div className="w-16 h-[3px] bg-[#8B1A1A] mb-6" />
            <p className="font-body text-white/50 max-w-xl leading-relaxed">
              A selection of projects successfully completed by the ELDEC engineering team
              across multiple sectors and countries.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map(({ num, title, location, value, desc, tag }, i) => (
              <FadeIn key={num} delay={Math.min(i * 60, 400)}>
                <div className="group border border-white/10 p-6 hover:border-[#8B1A1A]/60 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#8B1A1A] group-hover:w-full transition-all duration-500" />
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-heading text-4xl font-bold text-white/10 leading-none">{num}</span>
                    <span className={`font-sans text-[10px] tracking-wider uppercase px-2.5 py-1 border ${tagColors[tag] || "bg-white/10 text-white/50 border-white/20"}`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1 leading-snug">{title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-sans text-xs tracking-wide uppercase text-[#8B1A1A]">{location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="font-sans text-xs tracking-wide text-[#F59E0B]">{value}</span>
                  </div>
                  <p className="font-body text-white/45 text-sm leading-relaxed flex-1">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative bg-[#8B1A1A] py-20 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1/2 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-5">Need an Engineering Solution?</h2>
            <p className="font-body text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Whether it's design, installation, consultancy or training — get in touch
              and we'll tailor the right solution for your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact"
                className="font-sans text-sm tracking-widest uppercase bg-white text-[#8B1A1A] px-10 py-4 hover:bg-[#F8F4F0] transition-all duration-300 active:scale-95">
                Get in Touch
              </Link>
              <Link to="/about"
                className="font-sans text-sm tracking-widest uppercase border border-white/40 text-white px-10 py-4 hover:border-white transition-all duration-300">
                About ELDEC
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
