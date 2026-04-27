import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import imgHeroBg from "../assets/logo/contact.jpg";

/* ── in-view hook ── */
function useInView(threshold = 0.12) {
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

const contactDetails = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: "Office Location",
    value: "5th Floor Room 5A, Timschack House, Ngong Road, Dagoretti",
    sub: "Serving clients across Africa & the Middle East",
    link: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Email Address",
    value: "designs@eldecengineering.com",
    sub: "designs.eldec@gmail.com",
    link: "mailto:designs@eldecengineering.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    label: "Phone Number",
    value: "+254 721 387 121",
    sub: "Mon – Fri, 8:00 AM – 6:00 PM EAT",
    link: "tel:+254721387121",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
      </svg>
    ),
    label: "Working Hours",
    value: "Mon – Fri: 8AM – 6PM",
    sub: "Saturday by appointment only",
    link: null,
  },
];

const enquiryTypes = [
  "Electrical Design & Consultancy",
  "Installation & Supervision",
  "EV Charging Station Design",
  "Solar & Backup Power Systems",
  "Data Center Electrical Design",
  "Technical Training",
  "Specialized Engineering Works",
  "General Enquiry",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  enquiryType: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim())
      e.message = "Please describe your project or enquiry";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          company: form.company,
          enquiry_type: form.enquiryType,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS:", response);
      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("EMAIL ERROR:", error);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full font-body text-sm text-[#0D2137] bg-[#F8F4F0] border border-[#0D2137]/15 px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-[#0D2137]/30 focus:border-[#8B1A1A] focus:bg-white";

  return (
    <main className="bg-[#F8F4F0] overflow-x-hidden">

      {/* ══ HERO — Aligned with Home, Services & About Pages ══ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "85vh" }}
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

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
          style={{
            minHeight: "85vh",
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
              Get in Touch
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
            Start Your <br />
            <span className="text-[#8B1A1A]">Project</span> <br />
          
            <span className="text-white/90">With Us</span>
          </h1>

          {/* Styled Paragraph */}
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
            <span className="font-bold text-white">ELDEC Limited</span> Tell 
            us about your electrical engineering project and our team will
            get back to you within 24 hours.
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
            <a
              href="#contact-form"
              className="group relative font-sans text-[12px] tracking-widest uppercase bg-[#8B1A1A] text-white px-10 py-5 hover:bg-[#a61f1f] transition-all duration-300 active:scale-95 shadow-lg font-bold overflow-hidden"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-[#8B1A1A] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300">
                Start a Project →
              </span>
            </a>
            <a
              href="mailto:designs@eldecengineering.com"
              className="font-sans text-[12px] tracking-widest uppercase border border-white/60 text-white px-10 py-5 transition-all duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B] backdrop-blur-sm font-bold hover:scale-105"
            >
              Email Us Directly
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══ */}
      <section id="contact-form" className="py-24 bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* ── FORM — 7 cols ── */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="bg-white border border-[#0D2137]/10 p-8 md:p-12 shadow-xl">
                  <h2 className="font-heading text-3xl font-bold text-[#0D2137] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="font-body text-[#0D2137] text-sm mb-8">
                    Fill in the form below and we'll respond within 24 hours.
                  </p>

                  {/* Success */}
                  {status === "success" && (
                    <div className="bg-[#EAF3DE] border border-[#97C459] p-6 mb-8 flex items-start gap-4 animate-fadeIn">
                      <div className="w-10 h-10 bg-[#3B6D11] flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-lg font-bold text-[#3B6D11] mb-1">
                          Message Sent Successfully
                        </p>
                        <p className="font-body text-[#3B6D11]/80 text-sm leading-relaxed">
                          Thank you for reaching out. Our engineering team will
                          review your enquiry and respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {status === "error" && (
                    <div className="bg-[#FCEBEB] border border-[#F09595] p-6 mb-8 flex items-start gap-4 animate-fadeIn">
                      <div className="w-10 h-10 bg-[#A32D2D] flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-lg font-bold text-[#A32D2D] mb-1">
                          Something Went Wrong
                        </p>
                        <p className="font-body text-[#A32D2D]/80 text-sm">
                          Please try again or email us directly at
                          designs@eldecengineering.com
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                          Full Name <span className="text-[#8B1A1A]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Kamau"
                          className={`${inputBase} ${errors.name ? "border-red-400 bg-red-50" : ""}`}
                        />
                        {errors.name && (
                          <p className="font-sans text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                          Email Address <span className="text-[#8B1A1A]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className={`${inputBase} ${errors.email ? "border-red-400 bg-red-50" : ""}`}
                        />
                        {errors.email && (
                          <p className="font-sans text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone + Company */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                          Company / Organisation
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Enquiry type */}
                    <div className="mb-4">
                      <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                        Type of Enquiry
                      </label>
                      <select
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                        className={`${inputBase} cursor-pointer`}
                      >
                        <option value="">Select a service area...</option>
                        {enquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                      <label className="font-sans text-xs tracking-widest uppercase text-[#0D2137]/50 block mb-2">
                        Project Details / Message <span className="text-[#8B1A1A]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Briefly describe your project, location, scope of work and any specific requirements..."
                        className={`${inputBase} resize-none ${errors.message ? "border-red-400 bg-red-50" : ""}`}
                      />
                      {errors.message && (
                        <p className="font-sans text-xs text-red-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full font-sans text-sm tracking-widest uppercase bg-[#8B1A1A] text-white py-4 hover:bg-[#6e1515] transition-all duration-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="font-body text-[#0D2137]/50 text-xs mt-4 text-center">
                      Fields marked <span className="text-[#8B1A1A]">*</span> are required.
                      Your information is kept strictly confidential.
                    </p>
                  </form>
                </div>
              </FadeIn>
            </div>

            {/* ── SIDEBAR — 5 cols ── */}
            <div className="lg:col-span-5 space-y-6">

              {/* Contact info — Navy background */}
              <FadeIn delay={100}>
                <div className="bg-[#0D2137] p-8 shadow-xl">
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F59E0B] mb-7">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    {contactDetails.map(({ icon, label, value, sub, link }) => (
                      <div key={label} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 bg-[#8B1A1A] flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform duration-300">
                          {icon}
                        </div>
                        <div>
                          <p className="font-sans text-xs tracking-wider uppercase text-white/70 mb-0.5">
                            {label}
                          </p>
                          {link ? (
                            <a
                              href={link}
                              className="font-body text-white text-sm hover:text-[#F59E0B] transition-colors duration-300"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="font-body text-white text-sm">{value}</p>
                          )}
                          <p className="font-body text-white/70 text-xs mt-0.5">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* What happens next — White card on cream */}
              <FadeIn delay={180}>
                <div className="border border-[#0D2137]/10 bg-white p-8 shadow-xl">
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#8B1A1A] mb-6">
                    What Happens Next
                  </h3>
                  <div className="space-y-5">
                    {[
                      { step: "01", title: "We review your enquiry",   desc: "Our engineering team reads every submission carefully within 24 hours." },
                      { step: "02", title: "Initial consultation",      desc: "We'll reach out to understand your project requirements in detail." },
                      { step: "03", title: "Proposal & quotation",      desc: "We prepare a tailored engineering proposal and cost estimate." },
                      { step: "04", title: "Project kickoff",           desc: "On your approval, we mobilise our team and begin work." },
                    ].map(({ step, title, desc }) => (
                      <div key={step} className="flex gap-4 group">
                        <span className="font-heading text-2xl font-bold text-[#8B1A1A]/20 leading-none flex-shrink-0 w-8 group-hover:text-[#8B1A1A]/40 transition-colors">
                          {step}
                        </span>
                        <div>
                          <p className="font-sans text-sm font-medium text-[#0D2137] mb-1">{title}</p>
                          <p className="font-body text-[#0D2137]/60 text-xs leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Standards badge — Red background */}
              <FadeIn delay={240}>
                <div className="bg-[#8B1A1A] p-8 relative overflow-hidden shadow-xl">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 border-2 border-white/40 flex items-center justify-center mb-5 group hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                      </svg>
                    </div>
                    <p className="font-heading text-xl font-bold text-white mb-2 leading-snug">
                      Compliant Engineering. Every Time.
                    </p>
                    <p className="font-body text-white/70 text-sm leading-relaxed">
                      All ELDEC designs and installations comply with BS 7671,
                      IEC 60364, KS 662 and other applicable international standards.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </main>
  );
}