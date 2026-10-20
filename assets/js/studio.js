/* Home "studio": a framed bike in a dark studio with four points to explore.
   Layout and interaction model adapted from the VEYRA interactive scene
   (github.com/amirmushichge/veyra-interactive-car, MIT, © 2026 Amir Mušić):
   hover a system to see inside, click to zoom into a detail view, open Paint or Wheels to restyle.
   The bike is drawn in SVG, so paint and wheels restyle it directly and the "inside" views are live. */
(function () {
  const W = 1672, H = 941, CX = 855, CY = 492, PX = 836, PY = 478, K = 1.14;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const plane = (x, y) => [(PX + (x - CX) * K) / W * 100, (PY + (y - CY) * K) / H * 100];
  const inBox = (x, y, vb) => [(x - vb[0]) / vb[2] * 100, (y - vb[1]) / vb[3] * 100];
  const r1 = n => Math.round(n * 10) / 10;

  const SYS = {
    engine: {
      index: '01', label: 'Engine & gearbox', short: 'Look inside the engine', category: 'Powertrain inspection',
      title: 'Heard, felt,\nthen passed.',
      description: 'Our inspector cold-starts every bike, listens to the engine at idle and under load, and rides it through every gear before it is listed.',
      benefit: 'What we find is written into the bike’s inspection report, so you see it before you visit.',
      at: [900, 446], vb: [630, 330, 640, 360.2],
      points: [
        { label: 'Cylinder & piston', text: 'Compression, blow-by and exhaust smoke are checked from a cold start.', at: [902, 430] },
        { label: 'Crank & clutch', text: 'We listen for knocks and test the clutch for slip and drag.', at: [880, 585] },
        { label: 'Gearbox', text: 'Every gear is selected on the test ride, with no false neutrals or jumps.', at: [780, 560] },
      ],
    },
    chassis: {
      index: '02', label: 'Brakes & suspension', short: 'Look inside the front end', category: 'Chassis inspection',
      title: 'Stops straight.\nRides true.',
      description: 'The front end carries most of the braking and steering load, so we check it closely, then confirm the frame is straight and accident-free.',
      benefit: 'Anything that needs attention is listed in the report, so the price reflects the bike’s real condition.',
      at: [1108, 478], vb: [944, 372, 780, 439],
      points: [
        { label: 'Fork seals & travel', text: 'Seals are checked for oil leaks and the forks for smooth, full travel.', at: [1100, 450] },
        { label: 'Disc & pads', text: 'Disc thickness and pad wear are measured, and the brakes tested on the ride.', at: [1232, 612] },
        { label: 'Tyre tread & age', text: 'Tread depth and the tyre’s manufacturing date are recorded.', at: [1300, 726] },
      ],
    },
  };
  const APPEAR = { paint: { label: 'Paint', aria: 'Body colour', at: [948, 318] }, wheels: { label: 'Wheels', aria: 'Wheel design', at: [520, 650] } };
  const PAINT = [
    { id: 'crimson', label: 'Crimson Red', a: ['#E8344C', '#C8102E', '#5E0612'], b: ['#E8344C', '#C8102E', '#5E0612'] },
    { id: 'black', label: 'Jet Black', a: ['#6A6A6A', '#1A1A1A', '#050505'], b: ['#6A6A6A', '#1A1A1A', '#050505'] },
    { id: 'white', label: 'Pearl White', a: ['#FFFFFF', '#ECECEC', '#8E8E8E'], b: ['#FFFFFF', '#ECECEC', '#8E8E8E'] },
    { id: 'blackred', label: 'Black & Crimson', a: ['#6A6A6A', '#1A1A1A', '#050505'], b: ['#E8344C', '#C8102E', '#5E0612'] },
    { id: 'whitered', label: 'White & Crimson', a: ['#FFFFFF', '#ECECEC', '#8E8E8E'], b: ['#E8344C', '#C8102E', '#5E0612'] },
  ];
  const WHEELS = [
    { id: 'alloy', label: 'Five-spoke alloy', note: 'Cast, satin black' },
    { id: 'wire', label: 'Wire-spoke', note: 'Classic, chrome' },
    { id: 'sport', label: 'Sport Y-spoke', note: 'Cast, pearl white' },
  ];
  const paintVars = p => `--a1:${p.a[0]};--a2:${p.a[1]};--a3:${p.a[2]};--b1:${p.b[0]};--b2:${p.b[1]};--b3:${p.b[2]}`;

  /* ---------- the bike ---------- */
  function rimAlloy() {
    return `<g class="rim rim-alloy">${[0, 72, 144, 216, 288].map(a => `<path transform="rotate(${a})" d="M-11 -24 C-8 -50 -7 -80 -7 -101 L7 -101 C7 -80 8 -50 11 -24 Z" fill="#161616" stroke="#333" stroke-width="1.4"/>`).join('')}</g>`;
  }
  function rimWire() {
    let s = '';
    for (let i = 0; i < 36; i++) { const a = i * Math.PI / 18, b = a + (i % 2 ? .45 : -.45); s += `<line x1="${r1(20 * Math.cos(a))}" y1="${r1(20 * Math.sin(a))}" x2="${r1(103 * Math.cos(b))}" y2="${r1(103 * Math.sin(b))}"/>`; }
    return `<g class="rim rim-wire" stroke="#D6D6D6" stroke-width="1.5">${s}</g>`;
  }
  function rimSport() {
    return `<g class="rim rim-sport" fill="none" stroke="#EDEDED" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${[0, 72, 144, 216, 288].map(a => `<path transform="rotate(${a})" d="M0 -24 L0 -56 L-25 -101 M0 -56 L25 -101"/>`).join('')}</g>`;
  }
  function disc(r, k) {
    let holes = '';
    for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; holes += `<circle cx="${r1((r - 11) * Math.cos(a))}" cy="${r1((r - 11) * Math.sin(a))}" r="2.4"/>`; }
    const arms = [0, 72, 144, 216, 288].map(a => `<line transform="rotate(${a})" x1="0" y1="-22" x2="0" y2="${-(r - 22)}"/>`).join('');
    return `<g class="disc"><circle class="disc-ring" r="${r - 11}" fill="none" stroke="url(#${k}-disc)" stroke-width="22"/><g fill="#0b0b0c">${holes}</g><g stroke="#5a5a5a" stroke-width="5">${arms}</g></g>`;
  }
  function wheel(k, cls, x, y, discR, cal) {
    return `<g class="wheel ${cls}" transform="translate(${x} ${y})">
      <g class="tyre-g">
        <circle r="131" fill="none" stroke="#151515" stroke-width="38"/>
        <circle r="148" fill="none" stroke="#070707" stroke-width="5" stroke-dasharray="5 9"/>
        <circle r="139" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="2"/>
        <circle r="114" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="1.2"/>
      </g>
      <g class="spin">${rimAlloy()}${rimWire()}${rimSport()}
        <circle class="lip lip-dark" r="107" fill="none" stroke="#161616" stroke-width="9"/>
        <circle class="lip lip-chrome" r="107" fill="none" stroke="url(#${k}-chromeR)" stroke-width="9"/>
        <circle class="pin" r="102" fill="none" stroke="#C8102E" stroke-width="1.6"/>
        ${disc(discR, k)}
        <circle r="21" fill="#1d1d1d" stroke="#444" stroke-width="2"/><circle r="7" fill="#A8A8A8"/>
      </g>
      <g class="caliper" transform="translate(${cal[0]} ${cal[1]}) rotate(${cal[2]})">
        <rect x="-25" y="-14" width="50" height="28" rx="9" fill="url(#${k}-cal)"/>
        <rect class="pad int-ch" x="-19" y="-3" width="38" height="6" rx="2" fill="#fff"/>
      </g>
    </g>`;
  }
  function spring(x, y0, y1, w, n) {
    let d = `M${x} ${y0}`; const step = (y1 - y0) / n;
    for (let i = 1; i <= n; i++) d += ` L${x + (i % 2 ? w : -w)} ${r1(y0 + step * i - step / 2)}`;
    return d + ` L${x} ${y1}`;
  }
  function bikeSVG(k, { vb = `0 0 ${W} ${H}`, scaled = true, cls = '', paint = PAINT[0], wheelId = 'alloy' } = {}) {
    const fins = []; for (let y = -190; y <= -92; y += 12) fins.push(`<rect x="-62" y="${y}" width="124" height="6" rx="3" fill="#4C4C4C"/>`);
    return `<svg class="bk w-${wheelId} ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" style="${paintVars(paint)}" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${k}-pa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--a1)"/><stop offset=".42" style="stop-color:var(--a2)"/><stop offset="1" style="stop-color:var(--a3)"/></linearGradient>
      <linearGradient id="${k}-pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--b1)"/><stop offset=".45" style="stop-color:var(--b2)"/><stop offset="1" style="stop-color:var(--b3)"/></linearGradient>
      <linearGradient id="${k}-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A9A9A"/><stop offset=".45" stop-color="#4A4A4A"/><stop offset="1" stop-color="#1A1A1A"/></linearGradient>
      <linearGradient id="${k}-seat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3A3A"/><stop offset=".5" stop-color="#1C1C1C"/><stop offset="1" stop-color="#0E0E0E"/></linearGradient>
      <linearGradient id="${k}-case" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A5A5A"/><stop offset="1" stop-color="#161616"/></linearGradient>
      <linearGradient id="${k}-chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A4A4A"/><stop offset=".35" stop-color="#F4F4F4"/><stop offset=".6" stop-color="#8A8A8A"/><stop offset=".85" stop-color="#DADADA"/><stop offset="1" stop-color="#444"/></linearGradient>
      <linearGradient id="${k}-chromeR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2F2F2"/><stop offset=".5" stop-color="#7A7A7A"/><stop offset="1" stop-color="#E6E6E6"/></linearGradient>
      <linearGradient id="${k}-slider" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E0E0E"/><stop offset=".4" stop-color="#3A3A3A"/><stop offset="1" stop-color="#0E0E0E"/></linearGradient>
      <linearGradient id="${k}-disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9D9D9"/><stop offset=".5" stop-color="#7C7C7C"/><stop offset="1" stop-color="#C4C4C4"/></linearGradient>
      <linearGradient id="${k}-cal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8344C"/><stop offset="1" stop-color="#7A0A1A"/></linearGradient>
      <linearGradient id="${k}-pipe" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3C3C3C"/><stop offset=".5" stop-color="#9C9C9C"/><stop offset="1" stop-color="#2A2A2A"/></linearGradient>
      <radialGradient id="${k}-lens" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E9EEF0"/><stop offset="1" stop-color="#8E9599"/></radialGradient>
      <radialGradient id="${k}-shadow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".85"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <filter id="${k}-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g class="bike"${scaled ? ` transform="translate(${PX} ${PY}) scale(${K}) translate(${-CX} ${-CY})"` : ''}>
      <ellipse cx="850" cy="803" rx="470" ry="26" fill="url(#${k}-shadow)"/>
      <g class="rest rest-r">${wheel(k, 'wheel-rear', 520, 650, 66, [-42, 40, 40])}</g>
      <g class="rest">
        <circle cx="520" cy="650" r="46" fill="none" stroke="#2C2C2C" stroke-width="6" stroke-dasharray="5 3"/>
        <path d="M762 575 L520 604 M762 617 L520 696" stroke="#2C2C2C" stroke-width="6" stroke-dasharray="5 3" fill="none"/>
        <path d="M770 570 L520 636 L520 664 L772 604 Z" fill="#1E1E1E" stroke="#3A3A3A" stroke-width="1.5"/>
        <path d="M640 636 L700 620" stroke="rgba(255,255,255,.15)" stroke-width="2"/>
      </g>
      <g class="rest shock">
        <line x1="738" y1="414" x2="648" y2="610" stroke="url(#${k}-chrome)" stroke-width="10" stroke-linecap="round"/>
        <path class="shock-spring" d="${spring(0, 0, 150, 13, 14)}" transform="translate(728 440) rotate(24.6)" fill="none" stroke="#C8102E" stroke-width="5" stroke-linejoin="round"/>
      </g>
      <g class="rest frame" stroke="#262626" stroke-width="12" stroke-linecap="round" fill="none">
        <path d="M1050 332 L862 410 L772 470 L765 590"/>
        <path d="M1056 372 L940 462 L862 410 M940 462 L772 470"/>
        <path d="M800 420 L560 346 M772 470 L612 362"/>
      </g>
      <g class="rest exhaust">
        <path d="M708 642 L604 590 C588 582 576 600 590 612 L694 668 Z" fill="url(#${k}-metal)" stroke="#222" stroke-width="2"/>
        <path d="M604 590 L592 584" stroke="#C8102E" stroke-width="4"/>
      </g>
      <g class="engine">
        <path class="shell-eng" d="M744 478 L936 468 C962 500 966 548 946 588 C922 628 862 644 800 640 L752 628 C732 590 730 520 744 478 Z" fill="url(#${k}-case)" stroke="#5A5A5A" stroke-width="1.5"/>
        <circle class="shell-eng" cx="905" cy="586" r="44" fill="url(#${k}-metal)" stroke="#6A6A6A" stroke-width="2"/>
        <circle class="shell-eng" cx="905" cy="586" r="30" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>
        <ellipse class="shell-eng" cx="786" cy="552" rx="34" ry="38" fill="#2A2A2A" stroke="#5A5A5A" stroke-width="1.5"/>
        <path class="shell-eng" d="M748 500 C800 494 880 490 940 486 M760 620 C820 632 890 626 932 600" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/>
        <g class="shell-eng" fill="#8A8A8A">${[[905,546],[945,586],[905,626],[865,586],[786,518],[786,586]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
        <path class="shell-eng" d="M800 640 L900 634 L888 656 L812 660 Z" fill="#1A1A1A" stroke="#444" stroke-width="1"/>
        <g transform="translate(855 554) rotate(22)">
          <g class="shell-eng">
            <rect x="-50" y="-196" width="100" height="120" rx="6" fill="url(#${k}-metal)"/>${fins.join('')}
            <rect x="-55" y="-232" width="110" height="40" rx="10" fill="url(#${k}-metal)"/>
            <rect x="-40" y="-248" width="80" height="18" rx="6" fill="#262626"/>
          </g>
          <g class="int-eng eng-axis">
            <rect x="-37" y="-200" width="74" height="126" fill="none" stroke="#fff" stroke-width="2"/>
            <path d="M-37 -200 Q0 -222 37 -200" fill="none" stroke="#fff" stroke-width="2"/>
            <line x1="0" y1="-236" x2="0" y2="-212" stroke="#fff" stroke-width="3"/>
            <circle class="spark" cx="0" cy="-208" r="5" fill="#fff" filter="url(#${k}-glow)"/>
            <line class="rod" x1="0" y1="0" x2="0" y2="-110" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
            <g class="pist" transform="translate(0 -110)"><rect x="-34" y="-28" width="68" height="46" rx="4" fill="rgba(200,16,46,.28)" stroke="#E8344C" stroke-width="2.5"/><path d="M-34 -18 H34 M-34 -10 H34" stroke="#fff" stroke-width="1.5"/><circle r="5" fill="#fff"/></g>
            <g class="crank"><circle r="38" fill="none" stroke="#fff" stroke-width="2"/><path d="M-36 10 A37 37 0 0 0 36 10 Z" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-width="1.5"/><circle cy="-26" r="7" fill="#E8344C"/><circle r="5" fill="#fff"/></g>
          </g>
        </g>
        <g class="int-eng" fill="none" stroke-linecap="round">
          <circle class="gear g1" cx="780" cy="556" r="30" stroke="#fff" stroke-width="6" stroke-dasharray="4 4"/>
          <circle cx="780" cy="556" r="20" stroke="#fff" stroke-width="1.5"/>
          <circle class="gear g2" cx="808" cy="604" r="21" stroke="#fff" stroke-width="5" stroke-dasharray="3.5 3.5"/>
          <circle class="gear g3" cx="905" cy="586" r="40" stroke="#E8344C" stroke-width="6" stroke-dasharray="5 4"/>
          <circle cx="905" cy="586" r="31" stroke="#fff" stroke-width="1.5"/><circle cx="905" cy="586" r="23" stroke="#fff" stroke-width="1.5"/><circle cx="905" cy="586" r="15" stroke="#fff" stroke-width="1.5"/>
          <circle class="gear g2" cx="762" cy="598" r="20" stroke="#E8344C" stroke-width="5" stroke-dasharray="3.5 3.5"/>
        </g>
      </g>
      <g class="rest">
        <path d="M963 414 C1012 440 1014 560 962 640 C924 684 824 690 760 668 L700 644" fill="none" stroke="url(#${k}-pipe)" stroke-width="15" stroke-linecap="round"/>
        <path d="M963 414 C1012 440 1014 560 962 640" fill="none" stroke="rgba(200,16,46,.35)" stroke-width="3"/>
        <line x1="728" y1="628" x2="694" y2="790" stroke="#2A2A2A" stroke-width="8" stroke-linecap="round"/>
        <rect x="738" y="630" width="44" height="10" rx="5" fill="#3A3A3A"/>
      </g>
      <g class="rest body-rear">
        <path d="M842 364 L700 374 C640 370 560 346 470 318 L482 342 C560 374 640 394 722 400 L822 398 Z" fill="url(#${k}-pb)"/>
        <path d="M470 318 L492 322 L486 338 L470 334 Z" fill="#C8102E" filter="url(#${k}-glow)"/>
        <path d="M520 346 L470 430" stroke="#222" stroke-width="7"/>
        <rect x="438" y="420" width="54" height="32" rx="3" fill="#E6E6E6" transform="rotate(-8 465 436)"/>
        <path d="M762 382 L842 372 L854 424 L792 444 Z" fill="url(#${k}-pb)"/>
        <path d="M836 326 C800 338 742 348 690 350 C640 348 600 336 570 326 L584 354 C650 374 760 374 842 364 Z" fill="url(#${k}-seat)" stroke="#3A3A3A" stroke-width="1.5"/>
        <path d="M596 334 C660 351 760 353 826 338" stroke="rgba(255,255,255,.22)" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
      </g>
      <g class="shell-eng tank">
        <path d="M1002 396 C1032 390 1054 372 1064 352 L1050 452 C1030 470 1000 476 976 470 Z" fill="url(#${k}-pb)"/>
        <path d="M830 330 C850 285 910 262 975 266 C1016 268 1042 286 1052 312 L1060 350 C1042 372 1010 392 970 400 L870 404 C850 392 836 368 830 330 Z" fill="url(#${k}-pa)"/>
        <path d="M858 302 C900 279 962 274 1014 286" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="4" stroke-linecap="round"/>
        <path d="M880 382 C930 388 990 380 1030 360" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/>
      </g>
      <g class="rest rest-f">${wheel(k, 'wheel-front', 1170, 650, 86, [-48, -58, -40])}</g>
      <g class="fork-g" transform="translate(1035 262) rotate(-19.18)">
        <rect class="rest" x="-10" y="-6" width="20" height="214" fill="url(#${k}-chrome)"/>
        <rect class="shell-ch" x="-15" y="196" width="30" height="208" rx="9" fill="url(#${k}-slider)"/>
        <g class="int-ch" fill="none">
          <rect x="-15" y="196" width="30" height="208" rx="9" stroke="#fff" stroke-width="2"/>
          <path class="fork-spring" d="${spring(0, 214, 386, 9, 18)}" stroke="#E8344C" stroke-width="3.5" stroke-linejoin="round"/>
          <line x1="0" y1="150" x2="0" y2="398" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 4"/>
        </g>
        <rect class="seal" x="-17" y="191" width="34" height="9" rx="3" fill="#C8102E"/>
        <rect class="rest" x="-26" y="-12" width="52" height="16" rx="4" fill="#1D1D1D"/>
        <rect class="rest" x="-26" y="42" width="52" height="16" rx="4" fill="#1D1D1D"/>
        <circle class="rest" cx="0" cy="411" r="14" fill="#1E1E1E" stroke="#555" stroke-width="2"/>
      </g>
      <g class="shell-ch fender"><path d="M1102 514 C1150 488 1216 492 1254 520 L1248 532 C1212 508 1156 506 1110 526 Z" fill="url(#${k}-pb)"/></g>
      <g class="rest front">
        <path d="M1062 270 C1090 262 1124 270 1140 292 L1118 300 C1100 286 1080 282 1064 286 Z" fill="url(#${k}-pb)"/>
        <circle cx="1104" cy="320" r="40" fill="#121212" stroke="#333" stroke-width="2"/>
        <circle cx="1108" cy="320" r="29" fill="url(#${k}-lens)"/>
        <circle cx="1108" cy="320" r="34" fill="none" stroke="#fff" stroke-width="2.5" opacity=".85" filter="url(#${k}-glow)"/>
        <path d="M1036 252 L1000 236 L972 240" fill="none" stroke="#1E1E1E" stroke-width="9" stroke-linecap="round"/>
        <rect x="956" y="232" width="26" height="14" rx="6" fill="#0E0E0E"/>
        <path d="M1000 236 L986 196" stroke="#2A2A2A" stroke-width="4"/><ellipse cx="982" cy="186" rx="20" ry="11" fill="#1A1A1A" stroke="#444" stroke-width="1.5"/>
        <rect x="1028" y="236" width="34" height="18" rx="4" fill="#161616" stroke="#C8102E" stroke-width="1.5" transform="rotate(-12 1045 245)"/>
      </g>
    </g></svg>`;
  }

  /* ---------- markup ---------- */
  const plus = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  const xIc = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  const arrowUR = '<svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true"><path d="M4 11L11 4M5 4h6v6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  const arrowL = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M15 9H3M8 4L3 9l5 5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  const wheelChip = id => `<svg viewBox="-150 -150 300 300" aria-hidden="true"><g class="bk w-${id}"><g class="wheel"><circle r="131" fill="none" stroke="#151515" stroke-width="38"/><g class="spin">${rimAlloy()}${rimWire()}${rimSport()}<circle class="lip lip-dark" r="107" fill="none" stroke="#161616" stroke-width="9"/><circle class="lip lip-chrome" r="107" fill="none" stroke="#CFCFCF" stroke-width="9"/><circle r="21" fill="#1d1d1d" stroke="#444" stroke-width="2"/></g></g></g></svg>`;

  function markup({ eyebrow, h1, state = {} }) {
    const paint = PAINT.find(p => p.id === state.paint) || PAINT[0], wheelId = state.wheel || 'alloy';
    const hs = ['engine', 'chassis'].map(id => { const [x, y] = plane(...SYS[id].at); return `<button class="hs" type="button" data-hs="${id}" style="left:${r1(x)}%;top:${r1(y)}%" aria-label="${SYS[id].short}"><span class="hs-ring">${plus}</span><span class="hs-label">${SYS[id].label}${arrowUR}</span></button>`; }).join('');
    const ap = ['paint', 'wheels'].map(id => { const [x, y] = plane(...APPEAR[id].at); return `<div class="hs-app" data-mode="${id}" style="--ax:${r1(x)}%;--ay:${r1(y)}%"><button class="hs" type="button" data-ap="${id}" aria-expanded="false" aria-controls="ap-${id}" aria-label="${APPEAR[id].aria}"><span class="hs-ring">${plus}</span><span class="hs-label">${APPEAR[id].label}</span></button><span class="menu-bridge" aria-hidden="true"></span><div class="ap-menu ${id}" id="ap-${id}" role="group" aria-label="${APPEAR[id].aria}" hidden></div></div>`; }).join('');
    const details = Object.keys(SYS).map(id => `<div class="st-detail" data-sys="${id}">${bikeSVG('sd' + id, { vb: SYS[id].vb.join(' '), scaled: false, cls: `detail x-${id}`, paint, wheelId })}</div>`).join('');
    return `<section class="studio phase-overview" id="studio" aria-label="Explore a Speedioo bike">
      <div class="st-top">
        <div class="st-intro">
          <div><span class="st-eyebrow"><i></i>${eyebrow}</span><h1>${h1}</h1></div>
          <div class="st-side"><p class="st-desc"><span>Look inside a Speedioo bike.</span><span>Select a point to begin.</span></p>
            <div class="st-ctas"><a class="st-btn st-btn-red" href="#sell">Sell your bike</a><a class="st-btn" href="#buy" data-act="reset-buy">Explore bikes</a></div></div>
        </div>
        <button class="st-back" type="button" hidden>${arrowL}<span>Back to bike</span><kbd>Esc</kbd></button>
      </div>
      <div class="st-stage">
        <div class="st-plane">
          <div class="st-frame">
            <div class="st-bg" aria-hidden="true">${window.SpeediooCity ? SpeediooCity.scene(state.city || 'Pune', 'studio') : ''}</div>
            <div class="st-bike">${bikeSVG('sb', { paint, wheelId })}</div>
            ${details}
          </div>
          ${hs}${ap}
          <div class="st-annos"></div>
        </div>
        <aside class="st-copy" aria-hidden="true"></aside>
        <div class="st-status" aria-hidden="true"></div>
      </div>
      <div class="st-foot">
        <div class="st-notes" aria-label="Ways to explore">
          <div><h3>Engine & gearbox</h3><p>Lift the tank. See what our inspector hears, feels and checks.</p></div>
          <div><h3>Brakes & suspension</h3><p>Look inside the front end. Forks, discs, pads and tyres.</p></div>
          <div><h3>Paint</h3><p>Five finishes. From crimson red to pearl white.</p></div>
          <div><h3>Wheels</h3><p>Three styles. Compare alloy, wire-spoke and sport wheels.</p></div>
        </div>
        <div class="st-base"><span>Speedioo — inspected before it’s listed</span><span class="st-base-r">Explore the bike. Then find yours.</span></div>
      </div>
      <p class="sr" role="status" aria-live="polite"></p>
    </section>`;
  }

  /* ---------- behaviour ---------- */
  let ctl = null;
  function mount(sec, opts = {}) {
    if (!sec) return;
    const st = { phase: 'overview', sel: 'engine', hovered: null, mode: null, pinned: false, closing: false, anno: null, paint: opts.paint || 'crimson', wheel: opts.wheel || 'alloy', lock: false, req: 0 };
    const $ = s => sec.querySelector(s), $$ = s => [...sec.querySelectorAll(s)];
    const bike = $('.st-bike .bk'), planeEl = $('.st-plane'), back = $('.st-back'), copy = $('.st-copy'), status = $('.st-status'), live = $('[role=status]');
    const timers = {};
    const later = (name, fn, ms) => { clearTimeout(timers[name]); timers[name] = setTimeout(fn, ms); };
    const emit = (n, p) => { if (typeof track === 'function') track(n, p); };

    function setHover(id) {
      st.hovered = id;
      bike.classList.toggle('x-engine', id === 'engine');
      bike.classList.toggle('x-chassis', id === 'chassis');
      engineLoop();
    }
    function setPhase(p) {
      st.phase = p; sec.classList.remove('phase-overview', 'phase-entering', 'phase-detail', 'phase-returning'); sec.classList.add('phase-' + p);
      const busy = p === 'entering' || p === 'returning';
      sec.setAttribute('aria-busy', busy);
      back.hidden = p === 'overview'; back.disabled = busy;
      back.querySelector('span').textContent = p === 'returning' ? 'Returning to the bike' : 'Back to bike';
      $$('.hs').forEach(b => { b.tabIndex = p === 'overview' ? 0 : -1; });
      const s = SYS[st.sel];
      status.innerHTML = busy ? `<i></i>${p === 'returning' ? 'Returning to the bike' : 'Inside the ' + s.label.toLowerCase()}` : '';
      live.textContent = busy ? `${p === 'entering' ? 'Opening' : 'Closing'} ${s.label}` : p === 'detail' ? `${s.label} view. Press Escape to return.` : '';
      copy.setAttribute('aria-hidden', p !== 'detail');
      copy.classList.toggle('shown', p === 'detail');
      $('.st-base-r').textContent = p === 'overview' ? 'Explore the bike. Then find yours.' : 'Illustration. Every listed bike has its own report.';
    }
    function renderCopy() {
      const s = SYS[st.sel];
      copy.innerHTML = `<div class="st-copy-in"><p class="st-cat">${s.category}</p><h2>${s.title.split('\n').map(l => `<span>${l}</span>`).join('')}</h2><p class="st-sysdesc">${s.description}</p></div>
        <div class="st-copy-parts"><div class="st-parts">${s.points.map((p, i) => `<button type="button" data-part="${i}" aria-expanded="false"><span class="st-row"><small>0${i + 1}</small>${p.label}${plus}</span><span class="st-ptext" hidden>${p.text}</span></button>`).join('')}</div>
        <div class="st-benefit"><span>For the buyer</span><p>${s.benefit}</p></div>
        <a class="st-btn st-btn-red st-copy-cta" href="#buy" data-act="reset-buy">See inspected bikes</a></div>`;
      $('.st-annos').innerHTML = s.points.map((p, i) => { const [x, y] = inBox(...p.at, s.vb); return `<button class="anno" type="button" data-part="${i}" style="left:${r1(x)}%;top:${r1(y)}%" aria-label="${p.label}" aria-expanded="false"><span>0${i + 1}</span><span class="anno-label">${p.label}</span></button>`; }).join('');
    }
    function setAnno(i) {
      st.anno = st.anno === i ? null : i;
      $$('[data-part]').forEach(b => { const on = +b.dataset.part === st.anno; b.classList.toggle('open', on); b.setAttribute('aria-expanded', on); const t = b.querySelector('.st-ptext'); if (t) t.hidden = !on; });
    }
    function transition(id, returning = false) {
      if (st.mode || st.lock || (!returning && st.phase !== 'overview')) return;
      st.lock = true; const token = ++st.req;
      st.sel = id; st.anno = null;
      const [fx, fy] = at(...SYS[id].at);
      planeEl.style.setProperty('--fx', fx + '%'); planeEl.style.setProperty('--fy', fy + '%');
      if (!returning) { renderCopy(); setHover(id); emit('studio_open', { system: id }); } else setHover(null);
      setPhase(returning ? 'returning' : 'entering');
      later('reveal', () => {
        if (st.req !== token) return;
        $$('.st-detail').forEach(d => d.classList.toggle('shown', !returning && d.dataset.sys === id));
        engineLoop();
      }, reduce ? 0 : 350);
      later('finish', () => {
        if (st.req !== token) return;
        if (!returning) setHover(null);
        setPhase(returning ? 'overview' : 'detail'); st.lock = false; engineLoop();
        setTimeout(() => (returning ? $(`[data-hs="${id}"]`) : back).focus({ preventScroll: true }), 0);
      }, reduce ? 0 : 1250);
    }
    const returnToBike = () => { if (st.phase === 'detail') transition(st.sel, true); };

    /* appearance */
    function menuHTML(mode) {
      const opts = mode === 'paint' ? PAINT : WHEELS, cur = mode === 'paint' ? st.paint : st.wheel, c = opts.find(o => o.id === cur);
      return `<div class="ap-head"><span>${APPEAR[mode].label}</span><button class="ap-close" type="button" aria-label="Close ${APPEAR[mode].label.toLowerCase()}">${xIc}</button></div>
        <div class="ap-opts">${opts.map(o => `<button class="ap-opt${o.id === cur ? ' sel' : ''}" type="button" data-opt="${o.id}" aria-pressed="${o.id === cur}" aria-label="${o.label}" title="${o.label}">${mode === 'paint' ? `<span class="chip-paint" style="background:linear-gradient(135deg,${o.a[1]} 50%,${o.b[1]} 50%)"></span>` : `<span class="chip-wheel">${wheelChip(o.id)}</span>`}</button>`).join('')}</div>
        <div class="ap-cap" aria-live="polite">${c.label}<small>${mode === 'paint' ? 'Finishes on bikes we list vary by model' : c.note}</small></div>`;
    }
    function syncAppearance() {
      $$('.hs-app').forEach(w => {
        const m = w.dataset.mode, open = st.mode === m && !st.closing, btn = w.querySelector('.hs'), menu = w.querySelector('.ap-menu');
        w.classList.toggle('expanded', open);
        btn.classList.toggle('active', open); btn.setAttribute('aria-expanded', open);
        btn.querySelector('.hs-ring').innerHTML = open && st.pinned ? xIc : plus;
        menu.hidden = !open;
        if (open && !menu.innerHTML) menu.innerHTML = menuHTML(m);
        if (!open) menu.innerHTML = '';
      });
      const anyOpen = !!st.mode && !st.closing;
      sec.classList.toggle('menu-open', anyOpen);
      $$('.hs').forEach(b => { const own = b.dataset.ap && b.dataset.ap === st.mode; b.disabled = st.closing || (!!st.mode && !own); });
    }
    function openMode(m) {
      if (st.phase !== 'overview' || st.closing || (st.mode && st.mode !== m)) return;
      clearTimeout(timers.leave); setHover(null);
      if (st.mode === m) return;
      st.mode = m; st.pinned = false; syncAppearance();
    }
    function closeMode(restore = true) {
      if (!st.mode || st.closing) return;
      const prev = st.mode; clearTimeout(timers.leave); st.closing = true; syncAppearance();
      later('close', () => {
        st.mode = null; st.pinned = false; st.closing = false; syncAppearance();
        if (restore) { st.suppress = true; $(`[data-ap="${prev}"]`).focus({ preventScroll: true }); st.suppress = false; }
      }, reduce ? 0 : 260);
    }
    function choose(id) {
      if (!st.mode || st.closing) return;
      st.pinned = true;
      if (st.mode === 'paint') {
        st.paint = id; const p = PAINT.find(o => o.id === id);
        $$('.bk').forEach(s => { if (s.closest('.st-bike,.st-detail')) s.setAttribute('style', paintVars(p)); });
      } else {
        st.wheel = id;
        $$('.st-bike .bk, .st-detail .bk').forEach(s => { s.classList.remove('w-alloy', 'w-wire', 'w-sport'); s.classList.add('w-' + id); });
        if (!reduce) { const sp = bike.querySelectorAll('.spin'); sp.forEach(g => g.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 900, easing: 'cubic-bezier(.3,.6,.2,1)' })); }
      }
      const menu = $(`#ap-${st.mode}`); menu.innerHTML = menuHTML(st.mode); syncAppearance();
      const f = menu.querySelector(`[data-opt="${id}"]`); if (f) f.focus({ preventScroll: true });
      if (opts.onChange) opts.onChange({ paint: st.paint, wheel: st.wheel });
      emit('studio_' + st.mode, { option: id });
    }

    /* events */
    $$('.hs[data-hs]').forEach(b => {
      const id = b.dataset.hs;
      b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && !b.disabled && st.phase === 'overview') setHover(id); });
      b.addEventListener('pointerleave', () => { if (st.phase === 'overview') setHover(null); });
      b.addEventListener('focus', () => { if (!b.disabled && st.phase === 'overview' && b.matches(':focus-visible')) setHover(id); });
      b.addEventListener('blur', () => { if (st.phase === 'overview') setHover(null); });
      b.addEventListener('click', () => transition(id));
    });
    $$('.hs-app').forEach(w => {
      const m = w.dataset.mode, btn = w.querySelector('.hs');
      w.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') openMode(m); });
      w.addEventListener('pointerleave', () => { if (!st.pinned && !w.contains(document.activeElement)) timers.leave = setTimeout(() => closeMode(false), 140); });
      w.addEventListener('focusout', e => { if (!st.pinned && !w.contains(e.relatedTarget)) closeMode(false); });
      btn.addEventListener('focus', () => { if (!st.suppress && btn.matches(':focus-visible')) openMode(m); });
      btn.addEventListener('click', () => { if (st.mode === m && st.pinned) closeMode(); else { openMode(m); st.pinned = true; syncAppearance(); } });
      w.querySelector('.ap-menu').addEventListener('click', e => {
        const o = e.target.closest('[data-opt]'); if (o) return choose(o.dataset.opt);
        if (e.target.closest('.ap-close')) closeMode();
      });
    });
    back.addEventListener('click', returnToBike);
    sec.addEventListener('click', e => { const p = e.target.closest('[data-part]'); if (p && st.phase === 'detail') setAnno(+p.dataset.part); });

    /* piston + crank, only while an engine view is visible */
    let raf = 0, th = .6, last = 0;
    function engineLoop() {
      const on = !reduce && (bike.classList.contains('x-engine') || sec.querySelector('.st-detail.shown[data-sys=engine]'));
      if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(step); }
      if (!on && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    function pose() {
      const R = 26, L = 110, s = Math.sin(th), c = Math.cos(th), px = R * s, py = -R * c, yy = -(R * c + Math.sqrt(L * L - R * R * s * s));
      $$('.eng-axis').forEach(g => {
        g.querySelector('.pist').setAttribute('transform', `translate(0 ${r1(yy)})`);
        const rod = g.querySelector('.rod'); rod.setAttribute('x1', r1(px)); rod.setAttribute('y1', r1(py)); rod.setAttribute('y2', r1(yy));
        g.querySelector('.crank').setAttribute('transform', `rotate(${r1(th * 180 / Math.PI)})`);
        g.querySelector('.spark').style.opacity = Math.cos(th) > .93 ? 1 : 0;
      });
    }
    function step(now) {
      if (!sec.isConnected) { raf = 0; return; }
      th = (th + Math.min(.05, (now - last) / 1000) * 9) % (Math.PI * 2); last = now; pose();
      raf = requestAnimationFrame(step);
    }
    pose();

    const FULL = [0, 0, W, H], TIGHT = [200, 124, 1260, 709];
    let vbNow = null;
    const at = (x, y) => inBox(PX + (x - CX) * K, PY + (y - CY) * K, vbNow);
    function place(vb) {
      if (vbNow && vbNow.join() === vb.join()) return; vbNow = vb;
      bike.setAttribute('viewBox', vb.join(' '));
      $$('.hs[data-hs]').forEach(b => { const [x, y] = at(...SYS[b.dataset.hs].at); b.style.left = r1(x) + '%'; b.style.top = r1(y) + '%'; });
      $$('.hs-app').forEach(w => { const [x, y] = at(...APPEAR[w.dataset.mode].at); w.style.setProperty('--ax', r1(x) + '%'); w.style.setProperty('--ay', r1(y) + '%'); });
    }
    const size = () => { const r = planeEl.getBoundingClientRect(); sec.style.setProperty('--pwpx', r.width + 'px'); sec.style.setProperty('--phpx', r.height + 'px'); place(r.width < 700 ? TIGHT : FULL); };
    size(); if ('ResizeObserver' in window) new ResizeObserver(size).observe(planeEl); else addEventListener('resize', size);
    ctl = { sec, escape: () => { if (st.mode) closeMode(); else returnToBike(); } };
    setPhase('overview'); syncAppearance();
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && ctl && ctl.sec.isConnected) ctl.escape(); });

  window.SpeediooStudio = { markup, mount, SYS, PAINT, WHEELS };
})();
