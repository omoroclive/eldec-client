import React, { useEffect, useRef } from 'react';

export default function SolarMiniGrids() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------------------------------------------------------------
    // Scroll reveal
    // ---------------------------------------------------------------
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    root
      .querySelectorAll('.reveal,.draw,.statwrap,.daychart,.flowwrap,.stackwrap,.wave,.ledger')
      .forEach((el) => io.observe(el));

    // ---------------------------------------------------------------
    // Counter animation
    // ---------------------------------------------------------------
    function cnt(el) {
      if (el.dataset.done) return;
      el.dataset.done = 1;
      const to = parseFloat(el.dataset.to);
      const dec = parseInt(el.dataset.dec || 0, 10);
      if (rm) {
        el.textContent = to.toFixed(dec);
        return;
      }
      let s = null;
      function t(ts) {
        if (!s) s = ts;
        const k = Math.min(1, (ts - s) / 1100);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = (to * e).toFixed(dec);
        if (k < 1) requestAnimationFrame(t);
        else el.textContent = to.toFixed(dec);
      }
      requestAnimationFrame(t);
    }

    const statObservers = [];
    root.querySelectorAll('.statwrap').forEach((g) => {
      const obs = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) e.target.querySelectorAll('.count').forEach(cnt);
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(g);
      statObservers.push(obs);
    });

    return () => {
      io.disconnect();
      statObservers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div ref={rootRef} className="mg-page">
      <style>{`
        .mg-page {
          --sand:#FBF6EC; --cream:#FFFFFF; --paper:#FFFDF6;
          --ink:#16243C; --ink2:#3A465E; --muted:#7A7361;
          --line:#EADFCB; --line2:#DBCEB4;
          --amber:#D9821F; --gold:#E8A33D; --sun:#F4A72A;
          --crimson:#9E1B32;
          --skyTop:#DCE8F1; --skyMid:#F4E7C9; --skyLow:#FBE0B4;
          --serif:Cambria,"Cambria Math","Hoefler Text","Liberation Serif",Georgia,"Times New Roman",serif;
          --mono:"IBM Plex Mono",ui-monospace,monospace; --eldec-orange:#EA7A1B;
          --maxw:1200px;
          background:var(--sand);
          color:var(--ink);
          font-family:var(--serif);
          font-size:18px;
          line-height:1.65;
          -webkit-font-smoothing:antialiased;
        }
        .mg-page *{box-sizing:border-box}
        .mg-page ::selection{background:var(--gold);color:#fff}
        .mg-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 40px}
        .mg-page h1,.mg-page h2,.mg-page h3{font-family:var(--serif);font-weight:700;line-height:1.08;margin:0;letter-spacing:-.005em}
        .mg-page h1,.mg-page h2,.mg-page h3,.mg-page h4{text-transform:capitalize}
        .mg-page .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--amber);font-weight:600}
        .mg-page .mono{font-family:var(--mono)}
        .mg-page a{color:inherit}

        /* hero */
        .mg-page .hero{position:relative;padding:128px 0 0;overflow:hidden;
          background:linear-gradient(180deg,var(--skyTop) 0%,var(--skyMid) 58%,var(--skyLow) 78%,var(--sand) 100%)}
        .mg-page .hero .wrap{position:relative;z-index:3}
        .mg-page .hero h1{font-size:clamp(40px,6.6vw,78px);max-width:14ch;color:var(--ink)}
        .mg-page .hero h1 em{font-style:normal;color:var(--amber)}
        .mg-page .hero .lede{font-size:clamp(17px,1.8vw,21px);max-width:52ch;margin:26px 0 0;color:var(--ink2)}
        .mg-page .hero .chips{display:flex;flex-wrap:wrap;gap:10px;margin:34px 0 0}
        .mg-page .chip{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--ink);background:rgba(255,255,255,.6);
          border:1px solid var(--line2);border-radius:2px;padding:7px 13px}
        .mg-page .chip b{color:var(--amber);font-weight:600}
        .mg-page .heroscene{position:relative;z-index:2;margin-top:16px;height:250px;width:100%}
        .mg-page .heroscene svg{position:absolute;inset:0;width:100%;height:100%}
        .mg-page .sun{fill:var(--sun)}
        .mg-page .sunglow{fill:var(--sun);opacity:.18}
        .mg-page .arc{fill:none;stroke:var(--amber);stroke-width:2;stroke-dasharray:5 7;stroke-dashoffset:1;transition:stroke-dashoffset 2s ease .2s;opacity:.7}
        .mg-page .heroscene.in .arc{stroke-dashoffset:0}
        .mg-page .scene{fill:none;stroke:var(--ink);stroke-width:1.7}
        .mg-page .scene .fillpv{fill:#1d3252;stroke:none;opacity:.92}
        .mg-page .scenefade{opacity:0;transform:translateY(14px);transition:opacity .9s ease .5s,transform .9s ease .5s}
        .mg-page .heroscene.in .scenefade{opacity:1;transform:none}
        .mg-page .sunwrap{opacity:0;transform:translateY(20px);transition:opacity 1.2s ease,transform 1.6s cubic-bezier(.2,.7,.3,1)}
        .mg-page .heroscene.in .sunwrap{opacity:1;transform:none}

        /* section frame */
        .mg-page section{position:relative}
        .mg-page .sect{padding:50px 0}
        .mg-page .sect h2{font-size:clamp(28px,4vw,44px);max-width:20ch}
        .mg-page .lead{color:var(--ink2);max-width:60ch;margin:14px 0 0;font-size:18px}

        /* day-cycle band */
        .mg-page .day{background:var(--ink);color:#EAF0F8}
        .mg-page .day .eyebrow{color:var(--gold)}
        .mg-page .day h2{color:#fff}
        .mg-page .day .lead{color:#B7C4D6}
        .mg-page .daychart{margin:22px 0 22px;background:#13233c;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:18px 18px 8px}
        .mg-page .daychart svg{width:100%;height:auto;display:block}
        .mg-page .dc-area{fill:url(#gGen);opacity:.9}
        .mg-page .dc-areawrap{transform:scaleX(0);transform-origin:left center;transition:transform 1.5s cubic-bezier(.5,.05,.2,1)}
        .mg-page .daychart.in .dc-areawrap{transform:scaleX(1)}
        .mg-page .dc-soc{fill:none;stroke:#5BC2A8;stroke-width:2.4;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.7s ease .4s}
        .mg-page .daychart.in .dc-soc{stroke-dashoffset:0}
        .mg-page .dc-axis{stroke:rgba(255,255,255,.16)}
        .mg-page .dc-lbl{font-family:var(--mono);font-size:10.5px;fill:#8FA3BC}
        .mg-page .phases{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);border-radius:8px;overflow:hidden}
        .mg-page .phase{background:var(--ink);padding:22px 20px}
        .mg-page .phase .t{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--gold);text-transform:uppercase}
        .mg-page .phase h3{font-size:19px;margin:10px 0 8px;color:#fff;font-weight:700}
        .mg-page .phase p{margin:0;font-size:14.5px;color:#AEBCCF;line-height:1.55}

        /* stats */
        .mg-page .statwrap{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:26px}
        .mg-page .stat{background:var(--cream);border:1px solid var(--line);border-radius:10px;padding:26px 22px;box-shadow:0 12px 30px -22px rgba(60,40,10,.4)}
        .mg-page .stat .cap{font-family:var(--mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
        .mg-page .stat .big{font-size:46px;font-weight:700;line-height:1;margin:10px 0 6px;color:var(--ink);letter-spacing:-.02em}
        .mg-page .stat .big .u{font-size:16px;color:var(--amber);margin-left:4px;font-family:var(--mono)}
        .mg-page .stat .sub{font-family:var(--mono);font-size:11.5px;color:var(--muted)}
        .mg-page .stat:first-child .big{color:var(--amber)}

        /* protection list */
        .mg-page .prot{display:grid;grid-template-columns:1fr 1fr;gap:18px 40px;margin-top:26px}
        .mg-page .prot .row{display:flex;gap:16px;padding:18px 0;border-top:1px solid var(--line2)}
        .mg-page .prot .num{font-family:var(--mono);font-size:13px;color:var(--amber);min-width:46px;padding-top:3px}
        .mg-page .prot h3{font-size:19px;margin:0 0 6px;font-weight:700}
        .mg-page .prot p{margin:0;color:var(--ink2);font-size:15px}
        .mg-page .prot .std{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.06em;margin-top:7px;display:block}

        /* standards table */
        .mg-page .standards{background:var(--paper)}
        .mg-page .ledger{width:100%;border-collapse:collapse;margin-top:22px;font-size:16px}
        .mg-page .ledger th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-align:left;padding:12px 14px;border-bottom:2px solid var(--line2);font-weight:600}
        .mg-page .ledger td{padding:15px 14px;border-bottom:1px solid var(--line);vertical-align:top}
        .mg-page .ledger tr{opacity:0;transform:translateY(6px)}
        .mg-page .ledger.in tr{opacity:1;transform:none;transition:opacity .5s ease,transform .5s ease}
        .mg-page .ledger .code{font-family:var(--mono);color:var(--amber);white-space:nowrap;font-size:13.5px}
        .mg-page .ledger .ap{color:var(--ink2);font-size:14.5px}

        /* sectors */
        .mg-page .sectors{background:var(--ink);color:#EAF0F8}
        .mg-page .sectors h2{color:#fff}
        .mg-page .sectors .eyebrow{color:var(--gold)}
        .mg-page .sectors .lead{color:#B7C4D6}
        .mg-page .scards{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);border-radius:8px;overflow:hidden;margin-top:26px}
        .mg-page .scard{background:var(--ink);padding:26px 22px;min-height:172px}
        .mg-page .scard .n{font-family:var(--mono);font-size:12px;color:#7E92AC}
        .mg-page .scard h4{font-size:20px;margin:14px 0 8px;color:#fff;font-weight:700}
        .mg-page .scard p{margin:0;font-size:14px;color:#AEBCCF}

        .mg-page .reveal{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}
        .mg-page .reveal.in{opacity:1;transform:none}

        @media(max-width:900px){
          .mg-page .wrap{padding:0 22px}
          .mg-page .statwrap{grid-template-columns:1fr 1fr}
          .mg-page .phases{grid-template-columns:1fr 1fr}
          .mg-page .prot{grid-template-columns:1fr}
          .mg-page .scards{grid-template-columns:1fr 1fr}
        }

        @media(prefers-reduced-motion:reduce){
          .mg-page *{animation:none!important;transition:none!important}
          .mg-page .arc,.mg-page .dc-soc{stroke-dashoffset:0}
          .mg-page .dc-areawrap{transform:none}
          .mg-page .reveal,.mg-page .scenefade,.mg-page .sunwrap{opacity:1;transform:none}
          .mg-page .ledger tr{opacity:1;transform:none}
        }

        .mg-page .ptitle{font-family:var(--mono);font-weight:600;text-transform:uppercase;color:var(--eldec-orange);font-size:clamp(18px,2.5vw,31px);letter-spacing:.04em;line-height:1.14;margin:0 0 12px}
      `}</style>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="ptitle">SOLAR MINI GRIDS</div>
          <span className="eyebrow">ELDEC Limited · Nairobi</span>
          <h1>
            Turning <em>daylight</em> into dependable power.
          </h1>
          <p className="lede">
            Standalone and hybrid solar mini-grids — generation, storage and distribution sized from the resource
            up, with EMS control, protection coordination and full IEC compliance, delivered as bankable,
            tender-ready design.
          </p>
          <div className="chips">
            <span className="chip">
              <b>01</b> &nbsp;Resource &amp; Yield
            </span>
            <span className="chip">
              <b>02</b> &nbsp;Generation &amp; Storage
            </span>
            <span className="chip">
              <b>03</b> &nbsp;Control &amp; Conversion
            </span>
            <span className="chip">
              <b>04</b> &nbsp;Protection &amp; Compliance
            </span>
          </div>
        </div>
        <div className="heroscene" aria-hidden="true">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">
            <path className="arc" d="M40 270 Q600 -40 1160 270" pathLength="1" />
            <g className="sunwrap">
              <circle className="sunglow" cx="600" cy="58" r="64" />
              <circle className="sun" cx="600" cy="58" r="34" />
            </g>
            <line className="scene scenefade" x1="0" y1="252" x2="1200" y2="252" />
            <g className="scenefade">
              <g transform="translate(150,196)">
                <polygon className="fillpv" points="0,46 78,46 96,8 18,8" />
                <line className="scene" x1="40" y1="8" x2="22" y2="46" />
                <line className="scene" x1="62" y1="8" x2="44" y2="46" />
                <line className="scene" x1="9" y1="27" x2="87" y2="27" />
                <line className="scene" x1="48" y1="46" x2="48" y2="56" />
              </g>
              <g transform="translate(270,196)">
                <polygon className="fillpv" points="0,46 78,46 96,8 18,8" />
                <line className="scene" x1="9" y1="27" x2="87" y2="27" />
                <line className="scene" x1="48" y1="46" x2="48" y2="56" />
              </g>
              <g transform="translate(470,206)">
                <rect className="scene" x="0" y="0" width="52" height="46" />
                <rect className="scene" x="10" y="10" width="32" height="9" />
                <rect className="scene" x="10" y="24" width="32" height="9" />
              </g>
              <g transform="translate(560,214)">
                <rect className="scene" x="0" y="0" width="58" height="38" rx="4" />
                <circle className="scene" cx="14" cy="38" r="6" />
                <circle className="scene" cx="44" cy="38" r="6" />
              </g>
              <g transform="translate(820,206)">
                <rect className="scene" x="0" y="20" width="44" height="26" />
                <polygon className="scene" points="-6,20 22,2 50,20" />
              </g>
              <g transform="translate(900,212)">
                <rect className="scene" x="0" y="16" width="38" height="24" />
                <polygon className="scene" points="-5,16 19,1 43,16" />
              </g>
              <g transform="translate(990,206)">
                <rect className="scene" x="0" y="20" width="44" height="26" />
                <polygon className="scene" points="-6,20 22,2 50,20" />
              </g>
              <line className="scene" x1="640" y1="200" x2="640" y2="252" />
              <line className="scene" x1="780" y1="200" x2="780" y2="252" />
              <line className="scene" x1="640" y1="206" x2="780" y2="206" />
              <line className="scene" x1="780" y1="206" x2="980" y2="210" />
            </g>
          </svg>
        </div>
      </header>

      {/* DAY CYCLE */}
      <section className="day sect">
        <div className="wrap">
          <span className="eyebrow">The design problem</span>
          <h2 className="reveal">A day on the mini-grid.</h2>
          <p className="lead reveal">
            Every kilowatt-hour has to be there at the right hour. We size generation, storage and backup so the
            grid carries the village from first light to the dead of night — designed against the worst day, not
            the average.
          </p>
          <div className="daychart">
            <svg viewBox="0 0 1000 230" aria-hidden="true">
              <defs>
                <linearGradient id="gGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F4A72A" stopOpacity=".95" />
                  <stop offset="1" stopColor="#F4A72A" stopOpacity=".12" />
                </linearGradient>
              </defs>
              <line className="dc-axis" x1="60" y1="180" x2="960" y2="180" />
              <line className="dc-axis" x1="60" y1="120" x2="960" y2="120" opacity=".5" />
              <line className="dc-axis" x1="60" y1="60" x2="960" y2="60" opacity=".5" />
              <g className="dc-areawrap">
                <path
                  className="dc-area"
                  d="M60 180 C200 180 230 70 320 50 C430 26 520 26 620 52 C720 78 800 180 960 180 L960 180 L60 180 Z"
                />
              </g>
              <path
                className="dc-soc"
                d="M60 150 C160 150 210 120 300 96 C380 74 470 70 560 96 C660 124 720 150 820 120 C880 102 920 100 960 110"
                pathLength="1"
              />
              <text className="dc-lbl" x="58" y="200">
                06:00
              </text>
              <text className="dc-lbl" x="300" y="200">
                10:00
              </text>
              <text className="dc-lbl" x="540" y="200">
                14:00
              </text>
              <text className="dc-lbl" x="780" y="200">
                18:00
              </text>
              <text className="dc-lbl" x="916" y="200">
                22:00
              </text>
              <text className="dc-lbl" x="360" y="40" fill="#F4A72A">
                PV generation
              </text>
              <text className="dc-lbl" x="700" y="138" fill="#5BC2A8">
                Battery SoC
              </text>
            </svg>
          </div>
          <div className="phases">
            <div className="phase">
              <div className="t">Dawn</div>
              <h3>PV wakes</h3>
              <p>Modules pick up the morning sun and serve loads directly as demand climbs — diesel stays off.</p>
            </div>
            <div className="phase">
              <div className="t">Midday</div>
              <h3>Peak &amp; charge</h3>
              <p>Surplus generation tops up the battery to full, building the reserve the evening will draw on.</p>
            </div>
            <div className="phase">
              <div className="t">Evening</div>
              <h3>Battery discharges</h3>
              <p>As the sun drops, stored energy carries the evening peak — lighting, phones, small business.</p>
            </div>
            <div className="phase">
              <div className="t">Night</div>
              <h3>Genset backup</h3>
              <p>Only on the rare deep-reserve night does a right-sized genset step in, dispatched automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIZING / STATS */}
      <section className="sect">
        <div className="wrap">
          <span className="eyebrow">Resource &amp; sizing · IEC 62257</span>
          <h2 className="reveal">Sized from the resource up.</h2>
          <p className="lead reveal">
            We model the site's solar resource and load profile, then size PV and storage together for one to two
            days of autonomy at the target reliability — balancing capital cost against unserved energy.
          </p>
          <div className="statwrap">
            <div className="stat reveal">
              <div className="cap">Installed PV</div>
              <div className="big">
                <span className="count" data-to="78">
                  0
                </span>
                <span className="u">kWp</span>
              </div>
              <div className="sub">modules + MPPT</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Battery storage</div>
              <div className="big">
                <span className="count" data-to="268">
                  0
                </span>
                <span className="u">kWh</span>
              </div>
              <div className="sub">usable, lithium</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Specific yield</div>
              <div className="big">
                <span className="count" data-to="1600">
                  0
                </span>
                <span className="u">kWh/kWp</span>
              </div>
              <div className="sub">site GHI · PR 0.78</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Renewable fraction</div>
              <div className="big">
                <span className="count" data-to="85">
                  0
                </span>
                <span className="u">%</span>
              </div>
              <div className="sub">genset as backup</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROTECTION */}
      <section className="sect" style={{ background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <span className="eyebrow">Protection &amp; safety</span>
          <h2 className="reveal">Safe on the DC side, the AC side, and to earth.</h2>
          <div className="prot">
            <div className="row reveal">
              <div className="num">01</div>
              <div>
                <h3>DC array protection</h3>
                <p>
                  String fuses, lockable DC isolators and array/inverter surge protection guard against overcurrent
                  and induced transients.
                </p>
                <span className="std">IEC 62548 · IEC 60364-7-712</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">02</div>
              <div>
                <h3>AC protection &amp; anti-islanding</h3>
                <p>
                  Inverter interface protection — voltage, frequency and anti-islanding — keeps the network safe for
                  people and plant.
                </p>
                <span className="std">IEC 61727 · IEC 62116</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">03</div>
              <div>
                <h3>Earthing &amp; lightning</h3>
                <p>
                  A TT earthing arrangement with equipotential bonding and a lightning risk assessment protects
                  exposed rural sites.
                </p>
                <span className="std">IEC 62305</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">04</div>
              <div>
                <h3>Monitoring &amp; O&amp;M</h3>
                <p>
                  Remote SCADA, fault and theft alarms and PAYG-ready metering turn a far-flung asset into a
                  manageable one.
                </p>
                <span className="std">EPRA / KOSAP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="standards sect">
        <div className="wrap">
          <span className="eyebrow">Compliance, by construction</span>
          <h2 className="reveal">Bankable, because every line cites its standard.</h2>
          <p className="lead reveal">
            Lenders and off-takers need confidence, not promises. Each design references the clause it satisfies, so
            technical due diligence is a review — not an investigation.
          </p>
          <table className="ledger">
            <thead>
              <tr>
                <th>Code</th>
                <th>Standard</th>
                <th>Applied to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="code">IEC 62257</td>
                <td>Renewable energy &amp; hybrid mini-grids</td>
                <td className="ap">Whole-system design framework</td>
              </tr>
              <tr>
                <td className="code">IEC 61215 / 61730</td>
                <td>PV module performance &amp; safety</td>
                <td className="ap">Module selection</td>
              </tr>
              <tr>
                <td className="code">IEC 62548</td>
                <td>Photovoltaic array design</td>
                <td className="ap">DC array &amp; string protection</td>
              </tr>
              <tr>
                <td className="code">IEC 60364-7-712</td>
                <td>Solar PV power supply systems</td>
                <td className="ap">Installation requirements</td>
              </tr>
              <tr>
                <td className="code">IEC 61727 / 62116</td>
                <td>Interconnection &amp; anti-islanding</td>
                <td className="ap">Inverter–grid interface</td>
              </tr>
              <tr>
                <td className="code">IEC 62109</td>
                <td>Safety of PV inverters</td>
                <td className="ap">Power conversion</td>
              </tr>
              <tr>
                <td className="code">IEC 62619</td>
                <td>Secondary battery safety</td>
                <td className="ap">Storage system</td>
              </tr>
              <tr>
                <td className="code">EPRA / KOSAP</td>
                <td>Kenyan licensing &amp; rural electrification</td>
                <td className="ap">National compliance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTORS */}
      <section className="sectors sect">
        <div className="wrap">
          <span className="eyebrow">Where we deploy</span>
          <h2 className="reveal">Reliable power for places the grid hasn't reached.</h2>
          <div className="scards">
            <div className="scard">
              <div className="n">S—01</div>
              <h4>Rural electrification</h4>
              <p>KOSAP-class village mini-grids with smart, PAYG-ready metering and remote management.</p>
            </div>
            <div className="scard">
              <div className="n">S—02</div>
              <h4>Health &amp; institutions</h4>
              <p>Resilient supply for clinics, schools and water systems where downtime isn't an option.</p>
            </div>
            <div className="scard">
              <div className="n">S—03</div>
              <h4>Productive use</h4>
              <p>Power for agro-processing, cold chain and SMEs that turns electricity into income.</p>
            </div>
            <div className="scard">
              <div className="n">S—04</div>
              <h4>Telecom &amp; hybrids</h4>
              <p>Tower and site hybridisation that slashes diesel runtime and operating cost.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
