import React, { useEffect, useRef } from 'react';

export default function BESS() {
  const rootRef = useRef(null);
  const tabsRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------------------------------------------------------------
    // Dispatch mode switcher (Peak / Frequency / Arbitrage / Backup)
    // ---------------------------------------------------------------
    const svgEl = root.querySelector('#dvSvg');
    const curve = root.querySelector('#dvCurve');
    const dot = root.querySelector('#dvDot');
    const desc = root.querySelector('#dispDesc');
    const tabs = tabsRef.current.filter(Boolean);

    const modes = {
      peak: {
        c: '#1AA081',
        speed: 0.16,
        d: 'M30 90 C90 90 100 52 150 52 C210 52 220 90 270 90 C330 90 350 140 410 140 C450 140 470 90 480 90',
        t: 'Through the day the battery charges off-peak and discharges to shave the evening demand peak — cutting maximum-demand charges and deferring network upgrades.',
      },
      freq: {
        c: '#E8A33D',
        speed: 0.5,
        freq: true,
        t: 'Sub-second charge and discharge around 50 Hz delivers fast frequency response — a high-power, low-energy duty that demands headroom and cycle endurance.',
      },
      arb: {
        c: '#1AA081',
        speed: 0.12,
        d: 'M30 90 C80 90 90 50 140 50 C180 50 190 90 230 90 C280 90 300 140 350 140 C400 140 420 90 480 90',
        t: 'The battery charges when energy is cheap and discharges when it is dear — a deeper, slower cycle sized for energy rather than peak power.',
      },
      backup: {
        c: '#E8A33D',
        speed: 0.22,
        d: 'M30 90 H150 L150 138 C150 140 152 140 154 140 L300 140 C302 140 304 140 304 138 L304 90 H480',
        t: 'On loss of mains the system islands and sustains critical loads for the design duration — a single deep discharge sized to the outage, with black-start support.',
      },
    };

    const order = ['peak', 'freq', 'arb', 'backup'];
    let idx = 0;
    const start = performance.now();
    let timer = null;
    let cur = 'peak';
    let rafId1 = null;
    let rafId2 = null;

    function sine(ph) {
      let s = '';
      for (let x = 30; x <= 480; x += 6) {
        const y = 90 - 32 * Math.sin((x - 30) / 22 + ph);
        s += (x === 30 ? 'M' : 'L') + x + ' ' + y.toFixed(1) + ' ';
      }
      return s;
    }

    function apply(k) {
      const m = modes[k];
      cur = k;
      svgEl.setAttribute('class', 'm-' + k);
      curve.setAttribute('stroke', m.c);
      dot.setAttribute('fill', m.c);
      dot.style.filter = 'drop-shadow(0 0 5px ' + m.c + 'd9)';
      desc.textContent = m.t;
      curve.setAttribute('d', m.freq ? sine(0) : m.d);
      if (rm) {
        const L = curve.getTotalLength();
        const p = curve.getPointAtLength(L * 0.5);
        dot.setAttribute('cx', p.x);
        dot.setAttribute('cy', p.y);
      }
    }

    function select(k) {
      idx = order.indexOf(k);
      tabs.forEach((x) => {
        x.classList.toggle('on', x.dataset.mode === k);
      });
      apply(k);
    }

    function nxt() {
      select(order[(idx + 1) % order.length]);
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (!rm) timer = setInterval(nxt, 3000);
    }

    function frame(now) {
      const t = (now - start) / 1000;
      const m = modes[cur];
      if (m.freq) curve.setAttribute('d', sine(t * 7));
      const L = curve.getTotalLength();
      const p = (t * m.speed) % 1;
      const pt = curve.getPointAtLength(p * L);
      dot.setAttribute('cx', pt.x.toFixed(1));
      dot.setAttribute('cy', pt.y.toFixed(1));
      rafId1 = requestAnimationFrame(frame);
    }

    tabs.forEach((t) => {
      const handler = () => {
        select(t.dataset.mode);
        restart();
      };
      t.addEventListener('click', handler);
      t.__handler = handler;
    });

    select('peak');
    restart();
    if (!rm) rafId1 = requestAnimationFrame(frame);

    // ---------------------------------------------------------------
    // Hero readout count-up (usable energy, PCS power)
    // ---------------------------------------------------------------
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }
    function hx(r, g, b) {
      return (
        '#' +
        [r, g, b]
          .map((n) => {
            n = Math.round(n).toString(16);
            return n.length < 2 ? '0' + n : n;
          })
          .join('')
      );
    }
    function chargeColor(p) {
      const s = [
        [224, 73, 44],
        [232, 144, 42],
        [232, 193, 42],
        [54, 179, 106],
      ];
      const q = p * 3;
      const i = Math.min(2, Math.floor(q));
      const f = q - i;
      const a = s[i];
      const b = s[i + 1];
      return hx(lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f));
    }
    function countUp(el) {
      const to = parseFloat(el.dataset.to);
      const dec = parseInt(el.dataset.dec || 0, 10);
      if (rm) {
        el.textContent = to.toFixed(dec);
        return;
      }
      let s = null;
      requestAnimationFrame(function tk(ts) {
        if (!s) s = ts;
        const k = Math.min(1, (ts - s) / 1000);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = (to * e).toFixed(dec);
        if (k < 1) requestAnimationFrame(tk);
        else el.textContent = to.toFixed(dec);
      });
    }
    root.querySelectorAll('.sig .ro:not(.soc) .count').forEach(countUp);

    // ---------------------------------------------------------------
    // Battery fill / state-of-charge animation loop
    // ---------------------------------------------------------------
    const bfill = root.querySelector('.bfill');
    const soc = root.querySelector('.ro.soc .count');
    const socv = root.querySelector('.ro.soc .v');
    const gstops = root.querySelectorAll('#gGlow stop');
    const bp = 6200;

    if (rm) {
      if (soc) soc.textContent = '78';
    } else {
      const bf = (now) => {
        const p = now % bp / bp;
        const lvl = p < 0.84 ? lerp(0.1, 0.96, p / 0.84) : 0.96;
        const col = chargeColor(Math.min(1, lvl));
        bfill.style.transform = 'scaleY(' + lvl.toFixed(3) + ')';
        bfill.style.fill = col;
        if (soc) soc.textContent = Math.round(lvl * 100);
        if (socv) socv.style.color = col;
        gstops.forEach((s) => s.setAttribute('stop-color', col));
        rafId2 = requestAnimationFrame(bf);
      };
      rafId2 = requestAnimationFrame(bf);
    }

    // ---------------------------------------------------------------
    // Scroll reveal + counter triggers
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
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
      if (timer) clearInterval(timer);
      tabs.forEach((t) => {
        if (t.__handler) t.removeEventListener('click', t.__handler);
      });
      io.disconnect();
      statObservers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div ref={rootRef} className="bess-page">
      <style>{`
        .bess-page {
          --bg:#FBF6EC; --panel:#FFFFFF; --panel2:#FFFDF6;
          --ink:#16243C; --muted:#5E6472; --muted2:#8C8675;
          --line:#EADFCB; --line2:#DBCEB4;
          --charge:#1AA081; --charge-soft:rgba(26,160,129,.14);
          --amber:#E8A33D; --crimson:#C23A52; --crimson-deep:#9E1B32;
          --serif:Cambria,"Cambria Math","Hoefler Text","Liberation Serif",Georgia,"Times New Roman",serif;
          --mono:"IBM Plex Mono",ui-monospace,monospace; --eldec-orange:#EA7A1B;
          --maxw:1200px;
          background:var(--bg);
          color:var(--ink);
          font-family:var(--serif);
          font-size:18px;
          line-height:1.62;
          -webkit-font-smoothing:antialiased;
          background-image:repeating-linear-gradient(180deg,rgba(20,30,45,.025) 0 1px,transparent 1px 7px);
        }
        .bess-page *{box-sizing:border-box}
        .bess-page ::selection{background:var(--charge);color:#06231d}
        .bess-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 40px}
        .bess-page h1,.bess-page h2,.bess-page h3{font-family:var(--serif);font-weight:700;line-height:1.08;margin:0;letter-spacing:-.005em}
        .bess-page h1,.bess-page h2,.bess-page h3,.bess-page h4{text-transform:capitalize}
        .bess-page .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--charge);font-weight:600}
        .bess-page .mono{font-family:var(--mono)}
        .bess-page a{color:inherit}

        /* hero */
        .bess-page .hero{padding:102px 0 44px;border-bottom:1px solid var(--line)}
        .bess-page .hero__grid{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center}
        .bess-page .hero h1{font-size:clamp(38px,6vw,76px);max-width:13ch}
        .bess-page .hero h1 .c{color:var(--charge)}
        .bess-page .hero h1 .a{color:var(--amber)}
        .bess-page .hero .lede{font-size:clamp(17px,1.8vw,21px);max-width:50ch;margin:24px 0 0;color:var(--muted)}
        .bess-page .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px}
        .bess-page .chip{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--ink);background:var(--panel);border:1px solid var(--line2);border-radius:2px;padding:7px 13px}
        .bess-page .chip b{color:var(--charge);font-weight:600}

        /* hero signature: battery + waveform + readouts */
        .bess-page .sig{background:linear-gradient(180deg,var(--panel),var(--bg));border:1px solid var(--line2);border-radius:12px;padding:24px;
          box-shadow:0 22px 44px -28px rgba(120,90,30,.22)}
        .bess-page .sig__row{display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center}
        .bess-page .battery{width:118px}
        .bess-page .bcase{fill:none;stroke:var(--muted2);stroke-width:2.5}
        .bess-page .bterm{fill:var(--muted2)}
        .bess-page .bmod{stroke:rgba(20,30,45,.10);stroke-width:1.4}
        .bess-page .bfill{fill:#E0492C;transform:scaleY(.12);transform-origin:50% 100%}

        .bess-page .readouts{display:flex;flex-direction:column;gap:14px}
        .bess-page .ro{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dashed var(--line2);padding-bottom:10px}
        .bess-page .ro .k{font-family:var(--mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted2)}
        .bess-page .ro .v{font-family:var(--serif);font-weight:700;font-size:26px}
        .bess-page .ro .v .u{font-size:13px;font-family:var(--mono);color:var(--muted);margin-left:3px}
        .bess-page .ro.soc .v{color:var(--charge)}
        .bess-page .ro.pw .v{color:var(--amber)}
        .bess-page .wave{margin-top:20px;border-top:1px solid var(--line);padding-top:14px}
        .bess-page .wave svg{width:100%;height:auto;display:block}
        .bess-page .wcurve{fill:none;stroke:var(--charge);stroke-width:2.6;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.5s ease .3s}
        .bess-page .sig.in .wcurve{stroke-dashoffset:0}
        .bess-page .waxis{stroke:var(--line2)}
        .bess-page .wlbl{font-family:var(--mono);font-size:10px;fill:var(--muted2)}

        .bess-page section{position:relative}
        .bess-page .sect{padding:50px 0;border-bottom:1px solid var(--line)}
        .bess-page .sect h2{font-size:clamp(28px,4vw,44px);max-width:20ch}
        .bess-page .lead{color:var(--muted);max-width:62ch;margin:14px 0 0}

        /* dispatch toggle */
        .bess-page .disp{display:grid;grid-template-columns:300px 1fr;gap:38px;margin-top:26px;align-items:stretch}
        .bess-page .disp__tabs{display:flex;flex-direction:column;gap:10px;justify-content:space-between}
        .bess-page .dtab{text-align:left;background:var(--panel);border:1px solid var(--line2);color:var(--muted);border-radius:8px;padding:16px 18px;cursor:pointer;font-family:var(--serif);transition:.2s}
        .bess-page .dtab b{display:block;font-size:18px;color:var(--ink);font-weight:700;margin-bottom:3px}
        .bess-page .dtab span{font-family:var(--mono);font-size:11px;letter-spacing:.05em;color:var(--muted2)}
        .bess-page .dtab:hover{border-color:var(--line2);background:var(--panel2)}
        .bess-page .dtab.on{border-color:var(--charge);box-shadow:inset 3px 0 0 var(--charge);background:var(--panel2)}
        .bess-page .dtab.on b{color:var(--charge)}
        .bess-page .disp__view{background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:22px}
        .bess-page .disp__view svg{width:100%;height:auto;display:block}
        .bess-page .dvaxis{stroke:var(--line2)}
        .bess-page .dvmid{stroke:var(--muted2);stroke-dasharray:3 4;opacity:.6}
        .bess-page .dvcurve{fill:none;stroke-width:2.8}
        .bess-page .dvlbl{font-family:var(--mono);font-size:10.5px;fill:var(--muted2)}
        .bess-page .disp__desc{margin-top:14px;color:var(--muted);font-size:15px}

        /* sizing dashboard */
        .bess-page .statwrap{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-top:24px}
        .bess-page .stat{background:var(--panel);padding:26px 22px}
        .bess-page .stat .cap{font-family:var(--mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted2)}
        .bess-page .stat .big{font-size:44px;font-weight:700;line-height:1;margin:10px 0 6px;letter-spacing:-.02em}
        .bess-page .stat .big .u{font-size:15px;color:var(--muted);margin-left:4px;font-family:var(--mono)}
        .bess-page .stat .sub{font-family:var(--mono);font-size:11.5px;color:var(--muted2)}
        .bess-page .stat:nth-child(1) .big{color:var(--amber)}
        .bess-page .stat:nth-child(2) .big{color:var(--charge)}

        /* power flow */
        .bess-page .flowwrap{margin-top:26px;background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:30px 24px}
        .bess-page .flowwrap svg{width:100%;height:auto;display:block}
        .bess-page .fbox{fill:var(--panel2);stroke:var(--muted2);stroke-width:1.6}
        .bess-page .ftext{font-family:var(--mono);font-size:12px;fill:var(--ink)}
        .bess-page .fsub{font-family:var(--mono);font-size:10px;fill:var(--muted2)}
        .bess-page .fline{stroke:var(--line2);stroke-width:2;fill:none}
        .bess-page .fchg{stroke:var(--charge);stroke-width:3;fill:none;stroke-dasharray:7 9;opacity:0}
        .bess-page .flowwrap.in .fchg{opacity:.95;animation:bessFlowL 1.1s linear infinite}
        .bess-page .fdis{stroke:var(--amber);stroke-width:3;fill:none;stroke-dasharray:7 9;opacity:0}
        .bess-page .flowwrap.in .fdis{opacity:.95;animation:bessFlowR 1.1s linear infinite}
        @keyframes bessFlowL{to{stroke-dashoffset:32}}
        @keyframes bessFlowR{to{stroke-dashoffset:-32}}

        /* safety */
        .bess-page .safety{background:#FBEEF0;border-top:1px solid rgba(194,58,82,.3)}
        .bess-page .safety .eyebrow{color:var(--crimson)}
        .bess-page .prot{display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:24px}
        .bess-page .prot .row{display:flex;gap:16px;padding:18px 0;border-top:1px solid rgba(194,58,82,.22)}
        .bess-page .prot .num{font-family:var(--mono);font-size:13px;color:var(--crimson);min-width:46px;padding-top:3px}
        .bess-page .prot h3{font-size:19px;margin:0 0 6px}
        .bess-page .prot p{margin:0;color:var(--muted);font-size:15px}
        .bess-page .prot .std{font-family:var(--mono);font-size:11px;color:var(--muted2);letter-spacing:.06em;margin-top:7px;display:block}

        /* ledger */
        .bess-page .ledger{width:100%;border-collapse:collapse;margin-top:30px;font-size:16px}
        .bess-page .ledger th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);text-align:left;padding:11px 14px;border-bottom:1px solid var(--line2);font-weight:600}
        .bess-page .ledger td{padding:14px 14px;border-bottom:1px solid var(--line);vertical-align:top}
        .bess-page .ledger tr{opacity:0;transform:translateY(6px)}
        .bess-page .ledger.in tr{opacity:1;transform:none;transition:opacity .5s ease,transform .5s ease}
        .bess-page .ledger .code{font-family:var(--mono);color:var(--charge);white-space:nowrap;font-size:13.5px}
        .bess-page .ledger .ap{color:var(--muted);font-size:14.5px}

        /* sectors */
        .bess-page .scards{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-top:26px}
        .bess-page .scard{background:var(--panel);padding:26px 22px;min-height:172px;position:relative;overflow:hidden}
        .bess-page .scard .n{font-family:var(--mono);font-size:12px;color:var(--muted2)}
        .bess-page .scard h4{font-size:20px;margin:14px 0 8px}
        .bess-page .scard p{margin:0;font-size:14px;color:var(--muted)}
        .bess-page .scard::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:0;background:var(--charge);transition:width .5s ease}
        .bess-page .scard:hover::after{width:100%}

        .bess-page .reveal{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}
        .bess-page .reveal.in{opacity:1;transform:none}

        @media(max-width:900px){
          .bess-page .wrap{padding:0 22px}
          .bess-page .hero__grid{grid-template-columns:1fr;gap:34px}
          .bess-page .disp{grid-template-columns:1fr}
          .bess-page .disp__tabs{flex-direction:row;flex-wrap:wrap}
          .bess-page .dtab{flex:1 1 45%}
          .bess-page .statwrap{grid-template-columns:1fr 1fr}
          .bess-page .prot{grid-template-columns:1fr}
          .bess-page .scards{grid-template-columns:1fr 1fr}
        }

        @media(prefers-reduced-motion:reduce){
          .bess-page *{animation:none!important;transition:none!important}
          .bess-page .bfill{transform:scaleY(.78)!important;fill:#36B36A!important}
          .bess-page .wcurve{stroke-dashoffset:0}
          .bess-page .reveal{opacity:1;transform:none}
          .bess-page .ledger tr{opacity:1;transform:none}
        }

        .bess-page .ptitle{font-family:var(--mono);font-weight:600;text-transform:uppercase;color:var(--eldec-orange);font-size:clamp(18px,2.5vw,31px);letter-spacing:.04em;line-height:1.14;margin:0 0 12px}

        /* battery + dispatch animations */
        .bess-page .bglow{opacity:.18;animation:bessBglow 3.6s ease-in-out infinite}
        .bess-page .bbubbles circle{fill:#FFFFFF;opacity:0}
        .bess-page .sig.in .bbubbles circle{animation:bessBrise 3.6s ease-in infinite}
        .bess-page .sig.in .bbubbles circle:nth-child(2){animation-duration:4.4s;animation-delay:.6s}
        .bess-page .sig.in .bbubbles circle:nth-child(3){animation-duration:3.2s;animation-delay:1.1s}
        .bess-page .sig.in .bbubbles circle:nth-child(4){animation-duration:4s;animation-delay:1.7s}
        .bess-page .sig.in .bbubbles circle:nth-child(5){animation-duration:3.9s;animation-delay:2.3s}
        .bess-page .sig.in .bbubbles circle:nth-child(6){animation-duration:4.6s;animation-delay:2.9s}
        .bess-page .bbolt{fill:#EAFBF5;opacity:0}
        .bess-page .sig.in .bbolt{animation:bessBbolt 2.8s ease-in-out infinite}
        @keyframes bessBcharge{0%,100%{transform:scaleY(.78)}50%{transform:scaleY(.84)}}
        @keyframes bessBrise{0%{transform:translateY(0);opacity:0}12%{opacity:.85}80%{opacity:.6}100%{transform:translateY(-152px);opacity:0}}
        @keyframes bessBglow{0%,100%{opacity:.14}50%{opacity:.4}}
        @keyframes bessBbolt{0%,100%{opacity:0}44%,56%{opacity:.45}}
        .bess-page .dvdot{filter:drop-shadow(0 0 5px rgba(26,160,129,.85))}
        .bess-page .arbonly,.bess-page .bkonly{opacity:0;transition:opacity .35s ease}
        .bess-page #dvSvg.m-arb .arbonly{opacity:1}
        .bess-page #dvSvg.m-backup .bkonly{opacity:1}
        .bess-page .arb-buy{fill:rgba(26,160,129,.10)}
        .bess-page .arb-sell{fill:rgba(232,163,61,.13)}
        .bess-page .arb-lbl{font-family:var(--mono);font-size:10px;letter-spacing:.05em}
        .bess-page .arb-lbl.buy{fill:#138C71}
        .bess-page .arb-lbl.sell{fill:#C5851F}
        .bess-page #dvSvg.m-arb .arb-buy{animation:bessArbB 2.6s ease-in-out infinite}
        .bess-page #dvSvg.m-arb .arb-sell{animation:bessArbS 2.6s ease-in-out 1.3s infinite}
        .bess-page .bk-badge{fill:rgba(158,27,50,.10);stroke:#9E1B32;stroke-width:1}
        .bess-page .bk-blink{fill:#C23A52}
        .bess-page #dvSvg.m-backup .bk-blink{animation:bessBkblink 1.1s steps(1,end) infinite}
        .bess-page .bk-txt{font-family:var(--mono);font-size:9.5px;fill:#9E1B32;letter-spacing:.04em}
        @keyframes bessBkblink{0%,49%{opacity:1}50%,100%{opacity:.12}}
        @keyframes bessArbB{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes bessArbS{0%,100%{opacity:.4}50%{opacity:1}}
      `}</style>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="wrap hero__grid">
          <div>
            <div className="ptitle">BATTERY ENERGY STORAGE SYSTEMS (BESS)</div>
            <span className="eyebrow">ELDEC Limited · Nairobi</span>
            <h1>
              Store Power.
              <br />
              <span className="c">Release It</span> On <span className="a">Cue</span>.
            </h1>
            <p className="lede">
              Grid-connected and hybrid battery energy storage — sized to the application, integrated through the
              BMS, PCS and EMS, and engineered for safety, fire protection and grid-code compliance.
            </p>
            <div className="chips">
              <span className="chip">
                <b>01</b> &nbsp;Application &amp; Sizing
              </span>
              <span className="chip">
                <b>02</b> &nbsp;Battery &amp; BMS
              </span>
              <span className="chip">
                <b>03</b> &nbsp;Conversion &amp; EMS
              </span>
              <span className="chip">
                <b>04</b> &nbsp;Safety &amp; Compliance
              </span>
            </div>
          </div>
          <div className="sig" id="sig">
            <div className="sig__row">
              <svg className="battery" viewBox="0 0 120 240" aria-hidden="true">
                <defs>
                  <linearGradient id="gChg" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" stopColor="#1AA081" />
                    <stop offset="1" stopColor="#49D8BA" />
                  </linearGradient>
                  <radialGradient id="gGlow">
                    <stop offset="0" stopColor="#2FCBA8" stopOpacity=".6" />
                    <stop offset="1" stopColor="#2FCBA8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse className="bglow" cx="60" cy="128" rx="56" ry="96" fill="url(#gGlow)" />
                <rect className="bterm" x="46" y="2" width="28" height="10" rx="2" />
                <rect className="bcase" x="14" y="14" width="92" height="218" rx="10" />
                <clipPath id="bclip">
                  <rect x="22" y="22" width="76" height="202" rx="5" />
                </clipPath>
                <g clipPath="url(#bclip)">
                  <rect className="bfill" x="22" y="22" width="76" height="202" />
                  <g className="bbubbles">
                    <circle cx="34" cy="216" r="2.4" />
                    <circle cx="52" cy="216" r="1.8" />
                    <circle cx="68" cy="216" r="2.6" />
                    <circle cx="84" cy="216" r="2" />
                    <circle cx="44" cy="216" r="1.6" />
                    <circle cx="76" cy="216" r="2.2" />
                  </g>
                </g>
                <g className="bmod">
                  <line x1="22" y1="62" x2="98" y2="62" />
                  <line x1="22" y1="102" x2="98" y2="102" />
                  <line x1="22" y1="142" x2="98" y2="142" />
                  <line x1="22" y1="182" x2="98" y2="182" />
                </g>
                <path className="bbolt" d="M64 90 L48 138 H59 L55 176 L75 120 H62 Z" />
                <rect className="bcase" x="14" y="14" width="92" height="218" rx="10" />
              </svg>
              <div className="readouts">
                <div className="ro soc">
                  <span className="k">State of charge</span>
                  <span className="v">
                    <span className="count" data-to="78">
                      0
                    </span>
                    <span className="u">%</span>
                  </span>
                </div>
                <div className="ro">
                  <span className="k">Usable energy</span>
                  <span className="v">
                    <span className="count" data-to="2" data-dec="1">
                      0
                    </span>
                    <span className="u">MWh</span>
                  </span>
                </div>
                <div className="ro pw">
                  <span className="k">PCS power</span>
                  <span className="v">
                    <span className="count" data-to="1">
                      0
                    </span>
                    <span className="u">MW</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="wave">
              <svg viewBox="0 0 460 90" aria-hidden="true">
                <line className="waxis" x1="10" y1="45" x2="450" y2="45" />
                <path
                  className="wcurve"
                  d="M10 45 C70 45 80 14 130 14 C180 14 190 45 230 45 C290 45 310 76 370 76 C420 76 440 45 450 45"
                  pathLength="1"
                />
                <text className="wlbl" x="12" y="14">
                  charge
                </text>
                <text className="wlbl" x="406" y="86">
                  discharge
                </text>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* DISPATCH */}
      <section className="sect" id="dispatch">
        <div className="wrap">
          <span className="eyebrow">The design problem</span>
          <h2 className="reveal">One Asset, Four Duties.</h2>
          <p className="lead reveal">
            Sizing starts with the job. Peak shaving, frequency response, energy arbitrage and backup each demand a
            different power-to-energy ratio and cycle pattern — so we design to the duty, not a datasheet.
          </p>
          <div className="disp">
            <div className="disp__tabs" role="tablist">
              <button
                className="dtab on"
                data-mode="peak"
                role="tab"
                ref={(el) => (tabsRef.current[0] = el)}
              >
                <b>Peak Shaving</b>
                <span>discharge into the daily peak</span>
              </button>
              <button
                className="dtab"
                data-mode="freq"
                role="tab"
                ref={(el) => (tabsRef.current[1] = el)}
              >
                <b>Frequency Response</b>
                <span>fast charge / discharge around 50 Hz</span>
              </button>
              <button
                className="dtab"
                data-mode="arb"
                role="tab"
                ref={(el) => (tabsRef.current[2] = el)}
              >
                <b>Energy Arbitrage</b>
                <span>buy low, sell high</span>
              </button>
              <button
                className="dtab"
                data-mode="backup"
                role="tab"
                ref={(el) => (tabsRef.current[3] = el)}
              >
                <b>Backup &amp; Islanding</b>
                <span>ride through outages</span>
              </button>
            </div>
            <div>
              <div className="disp__view">
                <svg id="dvSvg" className="m-peak" viewBox="0 0 500 180" aria-hidden="true">
                  <line className="dvaxis" x1="30" y1="20" x2="30" y2="160" />
                  <line className="dvaxis" x1="30" y1="160" x2="480" y2="160" />
                  <line className="dvmid" x1="30" y1="90" x2="480" y2="90" />
                  <g className="arbonly">
                    <rect className="arb-buy" x="30" y="20" width="180" height="140" />
                    <rect className="arb-sell" x="300" y="20" width="180" height="140" />
                    <text className="arb-lbl buy" x="42" y="36">
                      BUY · CHARGE
                    </text>
                    <text className="arb-lbl sell" x="312" y="36">
                      SELL · DISCHARGE
                    </text>
                  </g>
                  <g className="bkonly">
                    <rect className="bk-badge" x="298" y="23" width="176" height="22" rx="11" />
                    <circle className="bk-blink" cx="314" cy="34" r="4" />
                    <text className="bk-txt" x="326" y="38">
                      ISLANDED · ON BATTERY
                    </text>
                  </g>
                  <text className="dvlbl" x="34" y="32">
                    charge ▲
                  </text>
                  <text className="dvlbl" x="34" y="156">
                    discharge ▼
                  </text>
                  <path
                    id="dvCurve"
                    className="dvcurve"
                    stroke="#1AA081"
                    d="M30 90 C90 90 100 52 150 52 C210 52 220 90 270 90 C330 90 350 140 410 140 C450 140 470 90 480 90"
                  />
                  <circle id="dvDot" className="dvdot" cx="30" cy="90" r="4.5" fill="#1AA081" />
                </svg>
              </div>
              <p className="disp__desc" id="dispDesc">
                Through the day the battery charges off-peak and discharges to shave the evening demand peak —
                cutting maximum-demand charges and deferring network upgrades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIZING */}
      <section className="sect">
        <div className="wrap">
          <span className="eyebrow">Application &amp; sizing · IEC 62933</span>
          <h2 className="reveal">Power And Energy, Sized Independently.</h2>
          <p className="lead reveal">
            Power (MW) and energy (MWh) are sized separately to the duty cycle, with depth-of-discharge and C-rate
            chosen for the targeted lifetime — then efficiency and degradation are modelled against the commercial
            case.
          </p>
          <div className="statwrap">
            <div className="stat reveal">
              <div className="cap">Power rating</div>
              <div className="big">
                <span className="count" data-to="1">
                  0
                </span>
                <span className="u">MW</span>
              </div>
              <div className="sub">PCS continuous</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Usable energy</div>
              <div className="big">
                <span className="count" data-to="2" data-dec="1">
                  0
                </span>
                <span className="u">MWh</span>
              </div>
              <div className="sub">@ 90% DoD</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Round-trip eff.</div>
              <div className="big">
                <span className="count" data-to="88">
                  0
                </span>
                <span className="u">%</span>
              </div>
              <div className="sub">AC–AC</div>
            </div>
            <div className="stat reveal">
              <div className="cap">Cycle life</div>
              <div className="big">
                <span className="count" data-to="6000">
                  0
                </span>
                <span className="u">cycles</span>
              </div>
              <div className="sub">to 80% SoH</div>
            </div>
          </div>
        </div>
      </section>

      {/* POWER FLOW */}
      <section className="sect">
        <div className="wrap">
          <span className="eyebrow">Battery · conversion · grid</span>
          <h2 className="reveal">Power That Flows Both Ways.</h2>
          <p className="lead reveal">
            A four-quadrant power conversion system charges and discharges on command, tied to the network through a
            protected point of common coupling and dispatched by the energy management system.
          </p>
          <div className="flowwrap">
            <svg viewBox="0 0 980 200" aria-hidden="true">
              <rect className="fbox" x="40" y="64" width="150" height="72" rx="6" />
              <text className="ftext" x="115" y="96" textAnchor="middle">
                BATTERY + BMS
              </text>
              <text className="fsub" x="115" y="116" textAnchor="middle">
                2 MWh · LFP
              </text>
              <rect className="fbox" x="415" y="64" width="150" height="72" rx="6" />
              <text className="ftext" x="490" y="96" textAnchor="middle">
                PCS
              </text>
              <text className="fsub" x="490" y="116" textAnchor="middle">
                1 MW · 4-quadrant
              </text>
              <rect className="fbox" x="790" y="64" width="150" height="72" rx="6" />
              <text className="ftext" x="865" y="96" textAnchor="middle">
                TX · PCC · GRID
              </text>
              <text className="fsub" x="865" y="116" textAnchor="middle">
                protected
              </text>
              <line className="fline" x1="190" y1="100" x2="415" y2="100" />
              <line className="fline" x1="565" y1="100" x2="790" y2="100" />
              <path className="fchg" d="M415 84 H190" />
              <path className="fchg" d="M790 84 H565" />
              <path className="fdis" d="M190 116 H415" />
              <path className="fdis" d="M565 116 H790" />
              <text className="fsub" x="300" y="78" textAnchor="middle" fill="#1AA081">
                ◄ charge
              </text>
              <text className="fsub" x="300" y="138" textAnchor="middle" fill="#E8A33D">
                discharge ►
              </text>
              <text className="fsub" x="678" y="78" textAnchor="middle" fill="#1AA081">
                ◄ charge
              </text>
              <text className="fsub" x="678" y="138" textAnchor="middle" fill="#E8A33D">
                discharge ►
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="safety sect">
        <div className="wrap">
          <span className="eyebrow">Safety, fire &amp; protection</span>
          <h2 className="reveal">Safe By Construction, Not By Exception.</h2>
          <p className="lead reveal">
            With lithium systems, safety is the design basis. Every layer — from cell to enclosure — is designed to
            a named standard and to cell-level fire-test evidence.
          </p>
          <div className="prot">
            <div className="row reveal">
              <div className="num">01</div>
              <div>
                <h3>Battery &amp; BMS Safety</h3>
                <p>
                  The BMS enforces safe operating limits, balances cells and isolates faults — the first and most
                  important line of defence.
                </p>
                <span className="std">IEC 62619 · IEC 63056</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">02</div>
              <div>
                <h3>Fire Detection &amp; Suppression</h3>
                <p>
                  Off-gas and heat detection, deflagration venting and suppression are designed to the cell-level
                  fire-test data, with safe spacing and egress.
                </p>
                <span className="std">NFPA 855 · UL 9540A</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">03</div>
              <div>
                <h3>Thermal Management</h3>
                <p>
                  A redundant HVAC and thermal design holds cells in their ideal window across local climate
                  extremes — protecting safety and lifetime.
                </p>
                <span className="std">Enclosure design</span>
              </div>
            </div>
            <div className="row reveal">
              <div className="num">04</div>
              <div>
                <h3>Protection &amp; Emergency Stop</h3>
                <p>
                  DC and AC protection, a site-wide emergency power-off and functional-safety-rated interlocks bring
                  the system to a safe state on demand.
                </p>
                <span className="std">IEC 61508 · IEC 62477</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="sect">
        <div className="wrap">
          <span className="eyebrow">Compliance, by construction</span>
          <h2 className="reveal">One Register, From Cells To Grid.</h2>
          <p className="lead reveal">
            A standards register records the codes applied and the conformity evidence — the package an authority,
            insurer or utility needs to approve the installation.
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
                <td className="code">IEC 62933</td>
                <td>Electrical energy storage systems</td>
                <td className="ap">System design &amp; terminology</td>
              </tr>
              <tr>
                <td className="code">IEC 62619</td>
                <td>Safety of secondary lithium cells</td>
                <td className="ap">Cell &amp; module safety</td>
              </tr>
              <tr>
                <td className="code">IEC 63056</td>
                <td>Safety of LIB in energy storage</td>
                <td className="ap">Battery system</td>
              </tr>
              <tr>
                <td className="code">UL 9540 / 9540A</td>
                <td>ESS certification &amp; fire test</td>
                <td className="ap">System + fire performance</td>
              </tr>
              <tr>
                <td className="code">NFPA 855</td>
                <td>Installation of stationary ESS</td>
                <td className="ap">Siting, spacing, suppression</td>
              </tr>
              <tr>
                <td className="code">IEC 62477</td>
                <td>Safety of power conversion</td>
                <td className="ap">PCS</td>
              </tr>
              <tr>
                <td className="code">IEC 61508</td>
                <td>Functional safety</td>
                <td className="ap">Protection &amp; control (SIL)</td>
              </tr>
              <tr>
                <td className="code">Grid code / EPRA</td>
                <td>Interconnection requirements</td>
                <td className="ap">PCC &amp; grid compliance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTORS */}
      <section className="sect">
        <div className="wrap">
          <span className="eyebrow">What we deliver</span>
          <h2 className="reveal">Storage Tuned To The Duty Cycle.</h2>
          <div className="scards">
            <div className="scard">
              <div className="n">S—01</div>
              <h4>Grid Services</h4>
              <p>Frequency response, peak shaving and operating reserve for utilities and IPPs.</p>
            </div>
            <div className="scard">
              <div className="n">S—02</div>
              <h4>Renewable Firming</h4>
              <p>Smoothing and time-shifting PV and wind to make variable generation dispatchable.</p>
            </div>
            <div className="scard">
              <div className="n">S—03</div>
              <h4>C&amp;I Behind-The-Meter</h4>
              <p>Demand-charge management and resilience for commercial and industrial sites.</p>
            </div>
            <div className="scard">
              <div className="n">S—04</div>
              <h4>Microgrid &amp; Backup</h4>
              <p>Islanding and black-start support that keeps critical loads alive.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
