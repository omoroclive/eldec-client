// LowVoltageConsultancy.jsx — No navbar, no footer
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

/* ==================================================================== */
/* Scoped styles — inline, only applied while this component is mounted  */
/* Every selector is prefixed with .lvc-page                           */
/* ==================================================================== */

const STYLES = `
.lvc-page{
  --ink:#FAF4E8; --ink-2:#FFFFFF; --ink-3:#FFFDF6;
  --paper:#16243C; --muted:#586074; --muted-2:#8C8675;
  --line:#2B4A7C; --grid:rgba(31,56,100,.05); --grid-strong:rgba(31,56,100,.09);
  --amber:#E8A33D; --amber-soft:rgba(232,163,61,.16);
  --crimson:#C23A52; --crimson-deep:#9E1B32; --crimson-soft:rgba(194,58,82,.14);
  --navy:#1F3864;
  --disp:Cambria,"Cambria Math","Hoefler Text","Liberation Serif",Georgia,"Times New Roman",serif;
  --body:Cambria,"Cambria Math","Hoefler Text","Liberation Serif",Georgia,"Times New Roman",serif;
  --mono:"IBM Plex Mono",ui-monospace,monospace; --eldec-orange:#EA7A1B;
  --maxw:1240px;
}
.lvc-page *{box-sizing:border-box}
.lvc-page{
  margin:0; background:var(--ink); color:var(--paper);
  font-family:var(--body); font-size:17px; line-height:1.65; letter-spacing:.005em;
  -webkit-font-smoothing:antialiased; position:relative;
  scroll-behavior:smooth;
  background-image:
    linear-gradient(var(--grid) 1px,transparent 1px),
    linear-gradient(90deg,var(--grid) 1px,transparent 1px),
    linear-gradient(var(--grid-strong) 1px,transparent 1px),
    linear-gradient(90deg,var(--grid-strong) 1px,transparent 1px);
  background-size:28px 28px,28px 28px,140px 140px,140px 140px;
}
.lvc-page ::selection{background:var(--amber);color:var(--ink)}

/* ---- sheet frame + title block ---- */
.lvc-page .frame{position:fixed;inset:14px;border:1px solid rgba(124,151,187,.35);pointer-events:none;z-index:40}
.lvc-page .frame::before,.lvc-page .frame::after{content:"";position:absolute;width:13px;height:13px;border:1px solid var(--amber)}
.lvc-page .frame::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.lvc-page .frame::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.lvc-page .tblock{position:fixed;right:18px;bottom:18px;z-index:41;
  font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--muted);
  background:rgba(255,253,246,.92);border:1px solid rgba(124,151,187,.3);backdrop-filter:blur(4px)}
.lvc-page .tblock b{color:var(--paper)}
.lvc-page .tblock .row{display:flex;gap:14px;padding:6px 12px;border-bottom:1px solid rgba(124,151,187,.2)}
.lvc-page .tblock .row:last-child{border-bottom:0}
.lvc-page .tblock .k{color:var(--muted-2)}
.lvc-page .progress{position:fixed;left:0;top:0;height:2px;background:var(--amber);width:0;z-index:60;box-shadow:0 0 12px var(--amber)}

.lvc-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 40px}
.lvc-page .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber)}
.lvc-page .mono{font-family:var(--mono)}
.lvc-page h1,.lvc-page h2,.lvc-page h3{font-family:var(--disp);font-weight:700;letter-spacing:-.005em;line-height:1.04;margin:0}
.lvc-page h1,.lvc-page h2,.lvc-page h3,.lvc-page h4{text-transform:capitalize}

/* ---- hero ---- */
.lvc-page .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
.lvc-page .hero__svg{position:absolute;top:0;right:0;bottom:0;left:44%;width:auto;height:100%;opacity:.82;z-index:0}
.lvc-page .hero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,var(--ink) 0%,var(--ink) 42%,rgba(250,244,232,.85) 60%,rgba(250,244,232,0) 88%)}
.lvc-page .hero__inner{position:relative;z-index:2;max-width:var(--maxw);margin:0 auto;padding:120px 40px 46px;width:100%}
.lvc-page .brandline{display:flex;align-items:center;gap:14px;margin-bottom:30px}
.lvc-page .brandline .mark{font-family:var(--disp);font-weight:700;font-size:20px;letter-spacing:.02em}
.lvc-page .brandline .mark i{font-style:normal;color:var(--amber)}
.lvc-page .brandline .div{height:16px;width:1px;background:var(--line);opacity:.5}
.lvc-page .brandline .loc{font-family:var(--mono);font-size:12px;color:var(--muted);letter-spacing:.1em}
.lvc-page .hero h1{font-size:clamp(40px,7vw,84px);max-width:13ch}
.lvc-page .hero h1 .live{color:var(--amber)}
.lvc-page .hero p.lede{margin:28px 0 0;max-width:54ch;font-size:clamp(17px,2vw,21px);color:var(--muted)}
.lvc-page .hero .scope{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}
.lvc-page .chip{font-family:var(--mono);font-size:12px;letter-spacing:.05em;color:var(--paper);
  border:1px solid rgba(124,151,187,.4);padding:7px 13px;border-radius:1px;background:rgba(255,255,255,.6)}
.lvc-page .chip b{color:var(--amber);font-weight:500}
.lvc-page .scrollcue{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);z-index:3;
  font-family:var(--mono);font-size:11px;letter-spacing:.2em;color:var(--muted-2);text-align:center}
.lvc-page .scrollcue span{display:block;width:1px;height:34px;background:linear-gradient(var(--amber),transparent);margin:8px auto 0}

/* self-draw linework */
.lvc-page .ld{fill:none;stroke:var(--line);stroke-width:1.7;
    stroke-dasharray:1;stroke-dashoffset:1;
    transition:stroke-dashoffset 1.6s cubic-bezier(.6,.05,.2,1)}
.lvc-page .in .ld{stroke-dashoffset:0}
.lvc-page .ld.live{stroke:var(--amber);stroke-width:2}
.lvc-page .lbl{font-family:var(--mono);font-size:11.5px;fill:#2B4A7C;opacity:0;transition:opacity .8s ease .9s}
.lvc-page .in .lbl{opacity:1}
.lvc-page .node{fill:var(--ink);stroke:var(--line);stroke-width:1.4;opacity:0;transition:opacity .6s ease 1s}
.lvc-page .in .node{opacity:1}
.lvc-page .flow{stroke:var(--amber);stroke-width:2.4;fill:none;stroke-dasharray:6 10;opacity:0}
.lvc-page .in .flow{opacity:.9;animation:lvcFlow 1.1s linear infinite}
@keyframes lvcFlow{to{stroke-dashoffset:-32}}

/* Act 01 active-part highlight */
.lvc-page .svgpart.active .ld{stroke:var(--amber);stroke-width:2.4}
.lvc-page .svgpart.active .node{stroke:var(--amber)}

/* ---- section scaffold ---- */
.lvc-page .act{position:relative;border-top:1px solid rgba(124,151,187,.18)}
.lvc-page .act__head{max-width:var(--maxw);margin:0 auto;padding:44px 40px 10px;display:flex;align-items:baseline;gap:18px}
.lvc-page .act__no{font-family:var(--mono);font-size:13px;color:var(--amber);letter-spacing:.1em}
.lvc-page .act__head h2{font-size:clamp(28px,4vw,46px)}
.lvc-page .act__grid{max-width:var(--maxw);margin:0 auto;padding:0 40px 28px;
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:start}
.lvc-page .stage{position:sticky;top:74px;height:calc(100vh - 74px);display:flex;align-items:center;justify-content:center}
.lvc-page .stage__card{width:100%;border:1px solid rgba(124,151,187,.3);background:linear-gradient(180deg,#FFFFFF,#FFFDF6);
  border-radius:2px;overflow:hidden;box-shadow:0 18px 44px -26px rgba(120,90,30,.2)}
.lvc-page .stage__bar{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;
  border-bottom:1px solid rgba(124,151,187,.25);font-family:var(--mono);font-size:11px;letter-spacing:.08em;color:var(--muted)}
.lvc-page .stage__bar b{color:var(--paper)}
.lvc-page .stage__body{padding:22px}
.lvc-page .steps{padding:6vh 0 12vh}
.lvc-page .step{min-height:60vh;display:flex;flex-direction:column;justify-content:center;
  opacity:.72;transition:opacity .45s ease,transform .45s ease;transform:translateY(8px)}
.lvc-page .step.on{opacity:1;transform:none}
.lvc-page .step h3{font-size:23px;margin-bottom:12px}
.lvc-page .step h3 .tag{font-family:var(--mono);font-size:12px;color:var(--amber);display:block;letter-spacing:.12em;margin-bottom:8px}
.lvc-page .step p{margin:0;color:#3F4757}
.lvc-page .step .spec{margin-top:16px;display:grid;grid-template-columns:auto 1fr;gap:6px 16px;
  font-family:var(--mono);font-size:13px;border-top:1px dashed rgba(124,151,187,.3);padding-top:14px}
.lvc-page .step .spec .k{color:#7A8194}
.lvc-page .step .spec .v{color:var(--paper)}
.lvc-page .step .spec .v.amber{color:var(--amber)}

/* counters / calc card */
.lvc-page .calc{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(124,151,187,.2)}
.lvc-page .calc .cell{background:var(--ink-2);padding:18px}
.lvc-page .calc .cap{font-family:var(--mono);font-size:11px;color:var(--muted-2);letter-spacing:.08em;text-transform:uppercase}
.lvc-page .calc .big{font-family:var(--disp);font-weight:600;font-size:34px;margin-top:6px;letter-spacing:-.02em}
.lvc-page .calc .big .u{font-size:15px;color:var(--muted);font-weight:400;margin-left:4px}
.lvc-page .calc .big.amber{color:var(--amber)}
.lvc-page .calc .sub{font-family:var(--mono);font-size:11px;color:var(--muted-2);margin-top:4px}

/* time-current chart */
.lvc-page .tcc text{font-family:var(--mono);fill:var(--muted-2);font-size:10px}
.lvc-page .tcc .ax{stroke:rgba(124,151,187,.35);stroke-width:1}
.lvc-page .tcc .grid{stroke:rgba(124,151,187,.14);stroke-width:1}
.lvc-page .curve{fill:none;stroke-width:2.4;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s ease}
.lvc-page .in .curve{stroke-dashoffset:0}

/* standards ledger */
.lvc-page .ledger{width:100%;border-collapse:collapse;font-size:14px}
.lvc-page .ledger th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-2);
  text-align:left;padding:10px 12px;border-bottom:1px solid rgba(124,151,187,.3);font-weight:500}
.lvc-page .ledger td{padding:13px 12px;border-bottom:1px solid rgba(124,151,187,.14);vertical-align:top}
.lvc-page .ledger tr{opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease}
.lvc-page .ledger tr.show{opacity:1;transform:none}
.lvc-page .ledger .code{font-family:var(--mono);color:var(--amber);white-space:nowrap}
.lvc-page .ledger .nm{color:var(--paper)}
.lvc-page .ledger .ap{color:var(--muted);font-size:13px}
.lvc-page .tick{color:var(--amber)}

/* safety stage accents */
.lvc-page #safety .act__no,.lvc-page #safety .step h3 .tag{color:var(--crimson)}
.lvc-page #safety .stage__card{box-shadow:0 20px 60px -30px rgba(158,27,50,.5)}
.lvc-page #safety .calc .big.amber{color:var(--crimson)}
.lvc-page #safety .step .spec .v.amber{color:var(--crimson)}
.lvc-page .barfill{height:8px;background:rgba(124,151,187,.18);border-radius:1px;overflow:hidden;margin-top:8px}
.lvc-page .barfill > i{display:block;height:100%;width:0;background:var(--crimson);transition:width 1.2s ease}
.lvc-page .barfill.in > i{width:var(--w,70%)}

/* capabilities */
.lvc-page .caps{border-top:1px solid rgba(124,151,187,.18);padding:52px 0}
.lvc-page .caps .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(124,151,187,.18);
  border:1px solid rgba(124,151,187,.18)}
.lvc-page .cap-card{background:var(--ink);padding:26px 22px;min-height:180px;position:relative;overflow:hidden}
.lvc-page .cap-card .n{font-family:var(--mono);font-size:12px;color:var(--muted-2)}
.lvc-page .cap-card h4{font-family:var(--disp);font-weight:600;font-size:19px;margin:14px 0 8px}
.lvc-page .cap-card p{margin:0;font-size:14px;color:var(--muted)}
.lvc-page .cap-card::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:0;background:var(--amber);transition:width .6s ease}
.lvc-page .cap-card:hover::after{width:100%}

/* ---- no footer or navbar styles needed ---- */

@media (max-width:900px){
  .lvc-page{font-size:16px}
  .lvc-page .wrap,.lvc-page .hero__inner,.lvc-page .act__head,.lvc-page .act__grid{padding-left:24px;padding-right:24px}
  .lvc-page .act__grid{grid-template-columns:1fr;gap:0}
  .lvc-page .stage{position:static;height:auto;padding:6px 0 2px}
  .lvc-page .stage__card{position:static}
  .lvc-page .steps{padding:0 0 18px}
  .lvc-page .hero__svg{left:0;width:100%;opacity:.22}
  .lvc-page .hero::after{background:linear-gradient(180deg,rgba(250,244,232,.4),var(--ink) 72%)}
  .lvc-page .step{min-height:auto;padding:30px 0;opacity:1;transform:none}
  .lvc-page .caps .grid{grid-template-columns:repeat(2,1fr)}
  .lvc-page .calc{grid-template-columns:1fr 1fr}
  .lvc-page .tblock{display:none}
}
@media (prefers-reduced-motion:reduce){
  .lvc-page *{animation:none!important;transition:none!important}
  .lvc-page .ld{stroke-dashoffset:0}.lvc-page .curve{stroke-dashoffset:0}.lvc-page .lbl,.lvc-page .node{opacity:1}
  .lvc-page .step{opacity:1;transform:none}.lvc-page .ledger tr{opacity:1;transform:none}
}
`;

/* ==================================================================== */
/* Hooks                                                                */
/* ==================================================================== */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useActiveStepIndex(count) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const steps = Array.from(container.querySelectorAll(':scope > .step'));
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = steps.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: [0.5], rootMargin: '-20% 0px -20% 0px' }
    );
    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return [containerRef, activeIndex];
}

function useReducedMotion() {
  return useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
}

/* ==================================================================== */
/* Small presentational pieces                                          */
/* ==================================================================== */

const Counter = ({ to, dec = 0 }) => {
  const [ref, inView] = useInView(0.4);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf;
    let t0 = null;
    const dur = 1100;
    const tick = (ts) => {
      if (t0 === null) t0 = ts;
      const k = Math.min(1, (ts - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setValue(to * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  return <span ref={ref} className="count">{value.toFixed(dec)}</span>;
};

const CalcCard = ({ label, to, dec = 0, unit, sub, highlight }) => (
  <div className="cell">
    <div className="cap">{label}</div>
    <div className={`big ${highlight ? 'amber' : ''}`}>
      <Counter to={to} dec={dec} />
      {unit && <span className="u">{unit}</span>}
    </div>
    {sub && <div className="sub">{sub}</div>}
  </div>
);

const SpecRow = ({ label, value, highlight }) => (
  <>
    <span className="k">{label}</span>
    <span className={`v ${highlight ? 'amber' : ''}`}>{value}</span>
  </>
);

const Step = ({ active, tag, title, children }) => (
  <div className={`step${active ? ' on' : ''}`}>
    <h3>
      <span className="tag">{tag}</span>
      {title}
    </h3>
    {children}
  </div>
);

/* ==================================================================== */
/* Hero SVG                                                              */
/* ==================================================================== */

const HeroSVG = () => {
  const [ref, inView] = useInView(0.2);
  return (
    <svg
      ref={ref}
      className={`hero__svg${inView ? ' in' : ''}`}
      id="heroSvg"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle className="ld" cx="150" cy="120" r="26" pathLength={1} />
      <circle className="ld" cx="150" cy="150" r="26" pathLength={1} />
      <text className="lbl" x="190" y="120">11kV / 415V · 315 kVA</text>

      <path className="ld live" d="M150 176 V 250" pathLength={1} />
      <path className="flow" d="M150 176 V 250" />
      <text className="lbl" x="160" y="220">4×185mm² Cu/XLPE/SWA</text>

      <rect className="ld" x="134" y="250" width="32" height="34" pathLength={1} />
      <path className="ld" d="M138 254 L162 280" pathLength={1} />
      <text className="lbl" x="180" y="272">630A ACB · LSIG</text>

      <path className="ld live" d="M150 300 H 860" pathLength={1} />
      <path className="flow" d="M150 300 H 860" />
      <text className="lbl" x="700" y="292">TPN BUSBAR 630A</text>

      <g>
        <path className="ld" d="M250 300 V 360" pathLength={1} />
        <rect className="node" x="226" y="360" width="48" height="40" />
        <text className="lbl" x="232" y="385">DB-G</text>

        <path className="ld" d="M380 300 V 360" pathLength={1} />
        <rect className="node" x="356" y="360" width="48" height="40" />
        <text className="lbl" x="362" y="385">DB-1</text>

        <path className="ld" d="M510 300 V 360" pathLength={1} />
        <rect className="node" x="486" y="360" width="48" height="40" />
        <text className="lbl" x="492" y="385">DB-2</text>

        <path className="ld" d="M640 300 V 360" pathLength={1} />
        <rect className="node" x="616" y="360" width="48" height="40" />
        <text className="lbl" x="622" y="385">DB-3</text>

        <path className="ld" d="M770 300 V 360" pathLength={1} />
        <rect className="node" x="746" y="360" width="48" height="40" />
        <text className="lbl" x="752" y="385">APFC</text>
      </g>

      <path className="ld" d="M150 300 V 470 M150 300" pathLength={1} />
      <path className="ld" d="M120 470 H180 M130 480 H170 M140 490 H160" pathLength={1} />
      <text className="lbl" x="60" y="455">TN-S · MET</text>
    </svg>
  );
};

/* ==================================================================== */
/* Act 01 — Drawings                                                     */
/* ==================================================================== */

const drawSteps = [
  {
    part: 'source',
    drawTitle: 'SINGLE LINE DIAGRAM',
    tag: 'SHEET 004 · SOURCE',
    title: 'Single-line diagrams',
    body:
      'Every installation begins with the source. We model the supply transformer, main feeder and incomer as a coordinated single-line diagram — the spine that every downstream decision references.',
    spec: [
      { label: 'SUPPLY', value: '415 / 240 V · 50 Hz' },
      { label: 'FEEDER', value: '4×185mm² Cu/XLPE/SWA', highlight: true },
      { label: 'INCOMER', value: '630 A ACB, LSIG' },
    ],
  },
  {
    part: 'mdb',
    drawTitle: 'MAIN DISTRIBUTION',
    tag: 'MAIN DISTRIBUTION',
    title: 'Schematics & busbar',
    body:
      'The main board is drawn to Form, IP rating and busbar rating, with each outgoing way labelled, sized and protected — readable by the contractor on site and by the authority at approval.',
    spec: [
      { label: 'BOARD', value: 'Form 3b · IP42' },
      { label: 'BUSBAR', value: '630 A TPN', highlight: true },
      { label: 'FORMAT', value: 'Editable DXF + PDF' },
    ],
  },
  {
    part: 'dist',
    drawTitle: 'FLOOR LAYOUT',
    tag: 'DISTRIBUTION',
    title: 'Floor layouts',
    body:
      'Distribution boards, final circuits, luminaires, small power and ELV devices are laid out floor-by-floor on a layered CAD sheet — power, lighting and containment each on their own layer for clean coordination.',
    spec: [
      { label: 'BOARDS', value: 'DB-G / 1 / 2 / 3 + sub-mains' },
      { label: 'METHOD', value: 'Lumen-method lighting' },
      { label: 'LAYERS', value: 'By service, by discipline', highlight: true },
    ],
  },
  {
    part: 'earth',
    drawTitle: 'EARTHING SCHEMATIC',
    tag: 'EARTHING',
    title: 'Earthing & protective bonding',
    body:
      'The earthing philosophy is drawn explicitly — system type, main earthing terminal, protective and supplementary bonding, and a CPC on every circuit — so the safety strategy is never left to assumption.',
    spec: [
      { label: 'SYSTEM', value: 'TN-S / TN-C-S', highlight: true },
      { label: 'MET', value: '≤ 1 Ω target' },
      { label: 'CPC', value: 'Every final circuit' },
    ],
  },
];

const DrawSVG = ({ activePart }) => {
  const [ref, inView] = useInView(0.2);
  const part = (name) => `svgpart${activePart === name ? ' active' : ''}`;
  return (
    <svg
      ref={ref}
      id="drawSvg"
      className={inView ? 'in' : ''}
      viewBox="0 0 460 320"
      aria-hidden="true"
      style={{ width: '100%', height: 'auto' }}
    >
      <g className={part('source')}>
        <circle className="ld" cx="70" cy="50" r="16" pathLength={1} />
        <circle className="ld" cx="70" cy="68" r="16" pathLength={1} />
        <path className="ld live" d="M70 84 V 120" pathLength={1} />
        <path className="flow" d="M70 84 V 120" />
      </g>
      <g className={part('mdb')}>
        <rect className="ld" x="58" y="120" width="24" height="22" pathLength={1} />
        <path className="ld live" d="M70 150 H 420" pathLength={1} />
        <path className="flow" d="M70 150 H 420" />
      </g>
      <g className={part('dist')}>
        <path className="ld" d="M130 150 V 196" pathLength={1} />
        <rect className="node" x="112" y="196" width="36" height="30" />
        <path className="ld" d="M210 150 V 196" pathLength={1} />
        <rect className="node" x="192" y="196" width="36" height="30" />
        <path className="ld" d="M290 150 V 196" pathLength={1} />
        <rect className="node" x="272" y="196" width="36" height="30" />
        <path className="ld" d="M370 150 V 196" pathLength={1} />
        <rect className="node" x="352" y="196" width="36" height="30" />
      </g>
      <g className={part('earth')}>
        <path className="ld" d="M70 150 V 270" pathLength={1} />
        <path className="ld" d="M52 270 H88 M58 278 H82 M64 286 H76" pathLength={1} />
      </g>
    </svg>
  );
};

const DrawingsAct = () => {
  const [stepsRef, activeIndex] = useActiveStepIndex(drawSteps.length);
  const active = drawSteps[activeIndex];

  return (
    <section className="act" id="drawings" data-sheet="01 / DRAWINGS">
      <div className="act__head">
        <span className="act__no">01</span>
        <h2>Drawings</h2>
      </div>
      <div className="act__grid">
        <div className="stage">
          <div className="stage__card">
            <div className="stage__bar">
              <span>SLD · <b>{active.drawTitle}</b></span>
              <span className="mono">1:100 · DXF</span>
            </div>
            <div className="stage__body">
              <DrawSVG activePart={active.part} />
            </div>
          </div>
        </div>
        <div className="steps" ref={stepsRef}>
          {drawSteps.map((s, i) => (
            <Step key={s.part} active={i === activeIndex} tag={s.tag} title={s.title}>
              <p>{s.body}</p>
              <div className="spec">
                {s.spec.map((row) => (
                  <SpecRow key={row.label} label={row.label} value={row.value} highlight={row.highlight} />
                ))}
              </div>
            </Step>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================================================================== */
/* Act 02 — Technical Calculations                                      */
/* ==================================================================== */

const calcSteps = [
  {
    calcTitle: 'FAULT LEVEL',
    tag: 'IEC 60909',
    title: 'Fault levels & ratings',
    body:
      'We establish prospective fault current at every board so that the breaking capacity of each protective device is verified against the worst case — never assumed.',
    spec: [
      { label: 'FLC', value: '438 A', highlight: true },
      { label: 'PSCC', value: '~16 kA at MDB' },
      { label: 'RULE', value: <>I<sub>cn</sub> ≥ PSCC</> },
    ],
  },
  {
    calcTitle: 'CABLE AMPACITY',
    tag: 'IEC 60364-5-52',
    title: 'Cable sizing & volt drop',
    body:
      'Conductors are sized for current-carrying capacity under real installation and grouping conditions, then checked again for voltage drop and thermal withstand — three tests, every cable.',
    spec: [
      { label: 'CHECK 1', value: <>I<sub>b</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub></> },
      { label: 'CHECK 2', value: 'ΔV ≤ 3% / 5%', highlight: true },
      { label: 'CHECK 3', value: 'k²S² ≥ I²t' },
    ],
  },
  {
    calcTitle: 'COORDINATION',
    tag: 'DISCRIMINATION',
    title: 'Protection coordination',
    body:
      'Devices are graded so a fault clears at the nearest upstream protection only — ACB over MCCB over final RCBO — keeping the rest of the building live. We plot the time–current curves to prove it.',
    spec: [
      { label: 'GRADING', value: '630A → 100A → 30mA', highlight: true },
      { label: 'SELECTIVITY', value: 'Verified on TCC' },
    ],
  },
  {
    calcTitle: 'LIGHTING / LUX',
    tag: 'EN 12464-1',
    title: 'Lighting & energy',
    body:
      'Illuminance is designed by the lumen method to task levels, with emergency lighting to a 3-hour duration — balancing lux, uniformity and connected load against the demand budget.',
    spec: [
      { label: 'CLASSROOM', value: '≈ 430 lux', highlight: true },
      { label: 'EMERGENCY', value: '3 h · BS 5266' },
      { label: 'PFC', value: '25 kVAr APFC' },
    ],
  },
];

const TccChart = () => {
  const [ref, inView] = useInView(0.35);
  return (
    <div ref={ref} className={inView ? 'in' : ''}>
      <svg className="tcc" viewBox="0 0 460 180" style={{ width: '100%', height: 'auto', marginTop: 16 }} aria-hidden="true">
        <line className="ax" x1="44" y1="12" x2="44" y2="150" />
        <line className="ax" x1="44" y1="150" x2="440" y2="150" />
        <line className="grid" x1="44" y1="60" x2="440" y2="60" />
        <line className="grid" x1="44" y1="105" x2="440" y2="105" />
        <line className="grid" x1="160" y1="12" x2="160" y2="150" />
        <line className="grid" x1="280" y1="12" x2="280" y2="150" />
        <text x="6" y="20">t/s</text>
        <text x="410" y="168">I (A) →</text>
        <path className="curve" stroke="var(--amber)" pathLength={1} d="M70 26 C130 30 150 70 175 105 C195 132 210 146 230 148 L300 148" />
        <path
          className="curve"
          stroke="var(--crimson)"
          pathLength={1}
          style={{ transitionDelay: '.3s' }}
          d="M70 60 C150 70 230 96 300 120 C350 136 400 144 430 146"
        />
        <text x="86" y="40" fill="var(--amber)">Device</text>
        <text x="330" y="112" fill="var(--crimson)">Cable I²t</text>
      </svg>
    </div>
  );
};

const CalcsAct = () => {
  const [stepsRef, activeIndex] = useActiveStepIndex(calcSteps.length);
  const active = calcSteps[activeIndex];
  const [stageRef, stageIn] = useInView(0.35);

  return (
    <section className="act" id="calcs" data-sheet="02 / CALCULATIONS">
      <div className="act__head">
        <span className="act__no">02</span>
        <h2>Technical Calculations</h2>
      </div>
      <div className="act__grid">
        <div className="stage" ref={stageRef}>
          <div className={`stage__card${stageIn ? ' in' : ''}`}>
            <div className="stage__bar">
              <span>WORKSHEET · <b>{active.calcTitle}</b></span>
              <span className="mono">IEC 60909</span>
            </div>
            <div className="stage__body">
              <div className="calc">
                <CalcCard label="Transformer FLC" to={438} unit="A" sub="315 kVA · 415 V" highlight />
                <CalcCard label="Prospective fault" to={16} dec={1} unit="kA" sub={<>at MDB · confirm vs Z<sub>tx</sub></>} />
                <CalcCard label="Max demand" to={99} unit="kVA" sub="diversified · 138 A/phase" />
                <CalcCard label="Volt drop" to={2.4} dec={1} unit="%" sub="≤ 3% lighting · ≤ 5% power" />
              </div>
              <TccChart />
            </div>
          </div>
        </div>
        <div className="steps" ref={stepsRef}>
          {calcSteps.map((s, i) => (
            <Step key={s.calcTitle} active={i === activeIndex} tag={s.tag} title={s.title}>
              <p>{s.body}</p>
              <div className="spec">
                {s.spec.map((row) => (
                  <SpecRow key={row.label} label={row.label} value={row.value} highlight={row.highlight} />
                ))}
              </div>
            </Step>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================================================================== */
/* Act 03 — Safety Reviews                                              */
/* ==================================================================== */

const safetySteps = [
  {
    safetyTitle: 'EARTH FAULT LOOP',
    tag: 'EICR · BS 7671',
    title: 'Condition reporting',
    body:
      'For existing installations we carry out Electrical Installation Condition Reports — inspection and test against BS 7671, with observations classified C1 / C2 / C3 / FI and a clear remedial schedule.',
    spec: [
      { label: 'STANDARD', value: 'BS 7671 · KS 662', highlight: true },
      { label: 'OUTPUT', value: 'Coded EICR + actions' },
    ],
  },
  {
    safetyTitle: 'DISCONNECTION',
    tag: 'FAULT PROTECTION',
    title: 'Loop impedance & disconnection',
    body:
      'We verify that earth fault loop impedance is low enough for protective devices to disconnect within the required time, so a fault becomes a trip — not a hazard.',
    spec: [
      { label: 'CHECK', value: <>Z<sub>s</sub> ≤ Z<sub>s(max)</sub></> },
      { label: 'TIME', value: '≤ 0.4 s / 5 s', highlight: true },
      { label: 'RCD', value: '30 mA additional' },
    ],
  },
  {
    safetyTitle: 'ADIABATIC',
    tag: 'THERMAL WITHSTAND',
    title: 'CPC adiabatic check',
    body:
      'The protective conductor is checked against the energy let-through of the fault — the adiabatic equation — so earth conductors survive the fault they are there to carry.',
    spec: [
      { label: 'EQUATION', value: 'S ≥ √(I²t) / k', highlight: true },
      { label: 'RESULT', value: 'Withstand confirmed' },
    ],
  },
  {
    safetyTitle: 'SURGE / LPS',
    tag: 'IEC 62305',
    title: 'Surge & lightning protection',
    body:
      'Risk is assessed to IEC 62305; where required, a structural LPS and coordinated SPDs (Type 1+2 at the origin, Type 2 downstream) protect both people and sensitive ICT loads.',
    spec: [
      { label: 'LPS', value: 'Class III (typical)', highlight: true },
      { label: 'SPD', value: 'Type 1+2 / Type 2' },
    ],
  },
];

const SafetyAct = () => {
  const [stepsRef, activeIndex] = useActiveStepIndex(safetySteps.length);
  const active = safetySteps[activeIndex];
  const [stageRef, stageIn] = useInView(0.35);

  return (
    <section className="act" id="safety" data-sheet="03 / SAFETY">
      <div className="act__head">
        <span className="act__no">03</span>
        <h2>Safety Reviews</h2>
      </div>
      <div className="act__grid">
        <div className="stage" ref={stageRef}>
          <div className={`stage__card${stageIn ? ' in' : ''}`}>
            <div className="stage__bar">
              <span>REVIEW · <b>{active.safetyTitle}</b></span>
              <span className="mono">BS 7671</span>
            </div>
            <div className="stage__body">
              <div className="calc">
                <CalcCard label={<>Loop impedance Z<sub>s</sub></>} to={0.7} dec={2} unit="Ω" sub="measured ≤ tabulated max" highlight />
                <CalcCard label="Disconnection" to={0.4} dec={1} unit="s" sub="final circuits ≤ 32 A" />
              </div>
              <div style={{ padding: '18px 18px 4px' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>RCD ADDITIONAL PROTECTION</div>
                <div className="big" style={{ fontFamily: 'var(--disp)', fontSize: 30, color: 'var(--crimson)', marginTop: 4 }}>
                  30<span style={{ fontSize: 14, color: 'var(--muted)' }}> mA</span>
                </div>
                <div className={`barfill${stageIn ? ' in' : ''}`} style={{ '--w': '88%' }}><i /></div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 10 }}>CPC ADIABATIC WITHSTAND k²S² ≥ I²t</div>
                <div className={`barfill${stageIn ? ' in' : ''}`} style={{ '--w': '72%' }}><i /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="steps" ref={stepsRef}>
          {safetySteps.map((s, i) => (
            <Step key={s.safetyTitle} active={i === activeIndex} tag={s.tag} title={s.title}>
              <p>{s.body}</p>
              <div className="spec">
                {s.spec.map((row) => (
                  <SpecRow key={row.label} label={row.label} value={row.value} highlight={row.highlight} />
                ))}
              </div>
            </Step>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================================================================== */
/* Act 04 — IEC / BS Compliance                                         */
/* ==================================================================== */

const ledgerRows = [
  { code: 'IEC 60364', nm: 'LV electrical installations', ap: 'Whole-installation design basis' },
  { code: 'BS 7671', nm: 'Requirements for electrical installations', ap: 'Circuits, protection, verification' },
  { code: 'KS 662', nm: 'Kenyan electrical installations code', ap: 'National compliance & approval' },
  { code: 'IEC 60909', nm: 'Short-circuit current calculation', ap: 'Fault levels & device ratings' },
  { code: 'IEC 60364-5-52', nm: 'Selection & erection — wiring systems', ap: 'Cable sizing & ampacity' },
  { code: 'IEC 62305', nm: 'Lightning protection', ap: 'Risk assessment & LPS / SPD' },
  { code: 'BS 5266', nm: 'Emergency lighting', ap: 'Escape-route illumination' },
  { code: 'IEC 60364-7-722', nm: 'EV charging installations', ap: 'DC fast-charging infrastructure' },
];

const complianceSteps = [
  {
    tag: 'DESIGN BASIS',
    title: 'Compliance, by construction',
    body:
      'Compliance is not a checkbox at the end — it is the design basis from the first line drawn. Each calculation, drawing and review cites the clause it satisfies, so an approving authority can trace every decision to its source.',
    spec: [
      { label: 'DESIGN', value: 'IEC 60364 · BS 7671 · KS 662', highlight: true },
      { label: 'CALCS', value: 'IEC 60909 · 60364-5-52' },
    ],
  },
  {
    tag: 'TRACEABILITY',
    title: 'A documented register',
    body:
      'Every project ships with a standards register: the codes applied, where they apply, and the evidence of conformity. Reviewers spend their time checking the work, not hunting for it.',
    spec: [
      { label: 'LPS', value: 'IEC 62305' },
      { label: 'EMERGENCY', value: 'BS 5266' },
      { label: 'EV', value: 'IEC 60364-7-722', highlight: true },
    ],
  },
  {
    tag: 'SPECIALIST SCOPE',
    title: 'Beyond the building',
    body:
      'The same discipline extends to specialist systems — fire detection to BS 5839-1, video surveillance to IEC 62676, and structured cabling to ISO/IEC 11801 — all coordinated under one design authority.',
    spec: [
      { label: 'FIRE', value: 'BS 5839-1' },
      { label: 'CCTV', value: 'IEC 62676' },
      { label: 'DATA', value: 'ISO/IEC 11801', highlight: true },
    ],
  },
];

const Ledger = () => {
  const [ref, inView] = useInView(0.3);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(() => ledgerRows.map(() => false));

  useEffect(() => {
    if (!inView) return;
    const timers = ledgerRows.map((_, i) =>
      window.setTimeout(() => {
        setShown((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, reduced ? 0 : i * 90)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduced]);

  return (
    <div ref={ref} style={{ padding: '6px 8px' }}>
      <table className="ledger">
        <thead>
          <tr><th>Code</th><th>Standard</th><th>Applied to</th></tr>
        </thead>
        <tbody>
          {ledgerRows.map((row, i) => (
            <tr key={row.code} className={shown[i] ? 'show' : ''}>
              <td className="code">{row.code}</td>
              <td className="nm">{row.nm}</td>
              <td className="ap">{row.ap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ComplianceAct = () => {
  const [stepsRef, activeIndex] = useActiveStepIndex(complianceSteps.length);

  return (
    <section className="act" id="compliance" data-sheet="04 / COMPLIANCE">
      <div className="act__head">
        <span className="act__no">04</span>
        <h2>IEC / BS Compliance</h2>
      </div>
      <div className="act__grid">
        <div className="stage in">
          <div className="stage__card">
            <div className="stage__bar">
              <span>REGISTER · <b>STANDARDS APPLIED</b></span>
              <span className="mono">VERIFIED ✓</span>
            </div>
            <div className="stage__body" style={{ padding: 0 }}>
              <Ledger />
            </div>
          </div>
        </div>
        <div className="steps" ref={stepsRef}>
          {complianceSteps.map((s, i) => (
            <Step key={s.tag} active={i === activeIndex} tag={s.tag} title={s.title}>
              <p>{s.body}</p>
              <div className="spec">
                {s.spec.map((row) => (
                  <SpecRow key={row.label} label={row.label} value={row.value} highlight={row.highlight} />
                ))}
              </div>
            </Step>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==================================================================== */
/* Sectors / capabilities                                               */
/* ==================================================================== */

const sectorCards = [
  { n: 'S—01', h: 'Solar mini-grids', p: 'KOSAP-class PV + BESS mini-grids: BOM, load and cable schedules, SLDs and SCADA functional design to IEC-compliant documentation.' },
  { n: 'S—02', h: 'EV charging', p: 'DC fast-charging infrastructure to IEC 60364-7-722 — fault studies, ampacity, protection coordination and earthing for 800 kW-class stations.' },
  { n: 'S—03', h: 'Commercial & institutional', p: 'Schools, offices and mixed-use blocks: full LV distribution, lighting, small power, containment and ELV specialist systems.' },
  { n: 'S—04', h: 'Energy storage & PFC', p: 'Battery energy storage integration, power-factor correction and demand management — sized, protected and documented.' },
];

const SectorsAct = () => (
  <section className="caps" id="sectors" data-sheet="05 / SECTORS">
    <div className="wrap">
      <span className="eyebrow">Where the design language is applied</span>
      <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', margin: '18px 0 36px', maxWidth: '20ch' }}>
        One standard of rigour, across the low-voltage estate.
      </h2>
      <div className="grid">
        {sectorCards.map((c) => (
          <div className="cap-card" key={c.n}>
            <div className="n">{c.n}</div>
            <h4>{c.h}</h4>
            <p>{c.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ==================================================================== */
/* Title block / progress bar (scroll-driven "sheet" tracker)            */
/* ==================================================================== */

const sheetSections = [
  { id: 'cover', label: '00 / COVER' },
  { id: 'drawings', label: '01 / DRAWINGS' },
  { id: 'calcs', label: '02 / CALCULATIONS' },
  { id: 'safety', label: '03 / SAFETY' },
  { id: 'compliance', label: '04 / COMPLIANCE' },
  { id: 'sectors', label: '05 / SECTORS' },
];

function useSheetLabel() {
  const [sheet, setSheet] = useState(sheetSections[0].label);

  useEffect(() => {
    const observers = [];
    sheetSections.forEach(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setSheet(label);
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return sheet;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(p * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useScopedScrollPadding(value) {
  useEffect(() => {
    const prev = document.documentElement.style.scrollPaddingTop;
    document.documentElement.style.scrollPaddingTop = value;
    return () => {
      document.documentElement.style.scrollPaddingTop = prev;
    };
  }, [value]);
}

/* ==================================================================== */
/* Main page — no navbar, no footer                                     */
/* ==================================================================== */

const LowVoltageConsultancy = () => {
  const progress = useScrollProgress();
  const sheet = useSheetLabel();
  useScopedScrollPadding('74px');

  return (
    <>
      {/* ── Shared SEO: title, description, canonical, Open Graph, Twitter ── */}
      <SEO
        title="Low Voltage Consultancy | Electrical Design & Compliance | ELDEC Limited"
        description="ELDEC's low voltage consultancy: single-line diagrams, fault-level and cable-sizing calculations, safety reviews (EICR, loop impedance, surge protection) and full IEC/BS 7671/KS 662 compliance documentation."
        path="/services/low-voltage-consultancy"
      />

      {/* ── Extra tags specific to this page, not covered by the shared component ── */}
      <Helmet>
        <meta
          name="keywords"
          content="low voltage consultancy Kenya, LV electrical design, single line diagrams, cable sizing calculations, fault level analysis, EICR Kenya, BS 7671 IEC 60364, protection coordination, earthing design"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
      </Helmet>

      <div className="lvc-page">
      <style>{STYLES}</style>

      {/* No navbar */}

      <div className="frame" aria-hidden="true" />
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="tblock" aria-hidden="true">
        <div className="row"><span className="k">PROJECT</span><b>LV&nbsp;CONSULTANCY</b></div>
        <div className="row"><span className="k">SHEET</span><b>{sheet}</b></div>
        <div className="row"><span className="k">REV</span><b>P1</b><span className="k">SCALE</span><b>NTS</b></div>
      </div>

      <header className="hero" id="cover">
        <HeroSVG />
        <div className="hero__inner">
          <div className="ptitle">LV CONSULTANCY</div>
          <div className="brandline">
            <span className="eyebrow">BS 7671 · IEC 60364</span>
            <span className="div" />
            <span className="loc">ELDEC LIMITED · ELECTRICAL DESIGN CONSULTANTS · NAIROBI</span>
          </div>
          <h1>Low&nbsp;voltage design,<br />drawn to the <span className="live">standard</span>.</h1>
          <p className="lede">
            From the transformer to the last final circuit — single-line diagrams, technical calculations,
            safety reviews and full IEC&nbsp;/&nbsp;BS compliance, delivered as coordinated, tender-ready documents.
          </p>
          <div className="scope">
            <span className="chip"><b>01</b>&nbsp;Drawings</span>
            <span className="chip"><b>02</b>&nbsp;Technical Calculations</span>
            <span className="chip"><b>03</b>&nbsp;Safety Reviews</span>
            <span className="chip"><b>04</b>&nbsp;IEC / BS Compliance</span>
          </div>
        </div>
        <div className="scrollcue">SCROLL TO TRACE THE DESIGN<span /></div>
      </header>

      <DrawingsAct />
      <CalcsAct />
      <SafetyAct />
      <ComplianceAct />
      <SectorsAct />

      {/* No footer */}
      </div>
    </>
  );
};

export default LowVoltageConsultancy;
