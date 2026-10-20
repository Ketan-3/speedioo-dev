/* "Sold in 28 minutes" — a 20-second animated story, drawn in SVG and driven by one timeline function.
   Deterministic: render(t) draws the frame for any time t (ms), so it can be scrubbed, paused,
   or exported frame by frame to MP4 (see README). */
(function () {
  const DUR = 20000;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const easeOut = x => 1 - Math.pow(1 - x, 3);
  const inOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const back = x => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const lerp = (a, b, p) => a + (b - a) * p;

  const CAPS = [
    [0, 3000, 'Day before', 'Rahul scans the Speedioo QR and sees his price in 60 seconds.'],
    [3000, 5600, 'Next day', 'At 10:00 a Speedioo inspector rides to his home. The inspection is free.'],
    [5600, 10500, '10:00', 'The 28 minutes start: doorstep inspection of engine, brakes, tyres and documents.'],
    [10500, 14000, '10:18', 'A fixed offer, no haggling. Rahul accepts and e-signs on his phone.'],
    [14000, 17400, '10:28', '₹1,72,000 lands in his bank account by UPI.'],
    [17400, 20000, 'Done', 'Sold in 28 minutes at his doorstep. Speedioo handles the RC transfer.']
  ];
  /* story minutes for the clock, as [ms, minutes] keyframes */
  const CLOCK = [[0, 0], [5600, 0], [10500, 18], [14000, 22], [16000, 28], [20000, 28]];
  const minutesAt = t => { for (let i = 1; i < CLOCK.length; i++) if (t <= CLOCK[i][0]) return lerp(CLOCK[i - 1][1], CLOCK[i][1], seg(t, CLOCK[i - 1][0], CLOCK[i][0])); return 28; };

  const wheel = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="32" fill="none" stroke="#1A1717" stroke-width="10"/>${[0, 72, 144, 216, 288].map(a => `<line x1="${cx}" y1="${cy}" x2="${(cx + 24 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(cy + 24 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="#8C8585" stroke-width="3"/>`).join('')}<circle cx="${cx}" cy="${cy}" r="7" fill="#5F5858"/>`;
  const bike = (tone, wa, wb, logo) => `<path d="M150 140 L52 130" stroke="#8C8585" stroke-width="8" stroke-linecap="round"/>
    <g id="${wa}">${wheel(80, 142)}</g><g id="${wb}">${wheel(242, 142)}</g>
    <path d="M80 142 L132 104 L198 104 L242 142" stroke="#1A1717" stroke-width="6" fill="none" stroke-linejoin="round"/>
    <rect x="132" y="106" width="56" height="32" rx="6" fill="#5F5858"/>
    <path d="M118 84 Q140 66 190 72 L204 92 L148 100 Z" fill="${tone}"/>${logo ? '<text x="-163" y="90" transform="scale(-1 1)" fill="#FFFFFF" font-size="15" font-weight="700" font-style="italic" font-family="Inter, sans-serif">S</text>' : ''}
    <path d="M92 88 L150 94 L146 104 L88 100 Z" fill="#1A1717"/>
    <path d="M242 142 L212 70" stroke="#1A1717" stroke-width="7" stroke-linecap="round"/>
    <path d="M202 62 L230 58" stroke="#1A1717" stroke-width="6" stroke-linecap="round"/>
    <circle cx="222" cy="82" r="10" fill="#FFFFFF" stroke="#1A1717" stroke-width="4"/>`;
  const tyre = id => `<g id="${id}"><circle r="22" fill="none" stroke="#D7141A" stroke-width="8" stroke-dasharray="9 2.5"/><path d="M0 -15V15M-13 -7.5L13 7.5M13 -7.5L-13 7.5" stroke="#D7141A" stroke-width="2.2"/><circle r="5" fill="#D7141A"/></g>`;
  const checks = ['Engine & gearbox', 'Brakes & suspension', 'Tyres & wheels', 'RC & documents'];
  const F = 'font-family="Inter, system-ui, sans-serif"', M = 'font-family="Inter, system-ui, sans-serif"';

  const svg = `<svg class="sx-svg" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated story: a customer sells his bike to Speedioo in 28 minutes">
   <rect width="1280" height="720" fill="#F6F4F4"/>
   <g fill="#ECE7E7"><rect x="720" y="300" width="110" height="260"/><rect x="840" y="250" width="80" height="310"/><rect x="930" y="330" width="130" height="230"/><rect x="1070" y="280" width="90" height="280"/><rect x="1170" y="350" width="110" height="210"/></g>
   <g><rect x="40" y="250" width="260" height="310" fill="#FFFFFF" stroke="#E0D9D9" stroke-width="3"/>
    <path d="M28 252 L170 186 L312 252" fill="none" stroke="#1A1717" stroke-width="6" stroke-linejoin="round"/>
    <g fill="#F1EDED" stroke="#E0D9D9" stroke-width="2"><rect x="70" y="290" width="70" height="56"/><rect x="200" y="290" width="70" height="56"/><rect x="70" y="372" width="70" height="56"/><rect x="200" y="372" width="70" height="56"/></g>
    <rect x="140" y="452" width="60" height="108" fill="#1A1717"/><circle cx="188" cy="508" r="4" fill="#D7141A"/>
    <text x="60" y="244" ${M} font-size="15" fill="#5F5858" letter-spacing="0">Baner, Pune</text></g>
   <rect y="560" width="1280" height="160" fill="#E6E0E0"/><line x1="0" y1="640" x2="1280" y2="640" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="44 30"/>
   <g id="sx-qrpost"><rect x="527" y="300" width="7" height="262" fill="#1A1717"/><rect x="466" y="226" width="130" height="174" rx="8" fill="#FFFFFF" stroke="#1A1717" stroke-width="3"/><image href="assets/img/speedioo-qr.png" x="473" y="232" width="116" height="158" preserveAspectRatio="xMidYMid meet"/></g>
   <path id="sx-beam" d="M712 398 L590 268 L590 372 Z" fill="#D7141A" opacity="0"/>
   <g id="sx-sellerbike" transform="translate(300 377) scale(1.05)">${bike('#5F5858', 'sw1', 'sw2')}</g>
   <rect id="sx-scanglow" x="340" y="430" width="40" height="132" fill="#D7141A" opacity="0"/>
   <rect id="sx-scan" x="350" y="430" width="5" height="132" fill="#D7141A" opacity="0"/>
   <g id="sx-cust">
    <path d="M641 560 L645 482 M668 560 L664 482" stroke="#1A1717" stroke-width="16" stroke-linecap="round"/>
    <rect x="628" y="392" width="54" height="98" rx="22" fill="#FFFFFF" stroke="#1A1717" stroke-width="4"/>
    <circle cx="655" cy="362" r="25" fill="#C98E6A"/><path d="M630 358 Q632 330 657 332 Q682 333 680 356 Q668 345 655 347 Q640 347 630 358Z" fill="#1A1717"/>
    <path d="M678 410 L702 440 L714 414" stroke="#C98E6A" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect id="sx-handphone" x="707" y="390" width="16" height="27" rx="4" fill="#1A1717"/>
   </g>
   <g id="sx-insp" transform="translate(1600 377) scale(-.95 .95)">
    ${bike('#D7141A', 'iw1', 'iw2', true)}
    <path d="M130 96 L160 124 L150 148" stroke="#2B2828" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M128 92 L168 48" stroke="#1A1717" stroke-width="18" stroke-linecap="round"/>
    <path d="M166 54 L210 64" stroke="#1A1717" stroke-width="9" stroke-linecap="round"/>
    <circle cx="176" cy="30" r="18" fill="#D7141A"/><path d="M182 22 h14 a6 6 0 0 1 0 12 h-14z" fill="#1A1717"/>
   </g>
   <g id="sx-wind" opacity="0" stroke="#B9B1B1" stroke-width="4" stroke-linecap="round"><line x1="0" y1="430" x2="70" y2="430"/><line x1="20" y1="470" x2="110" y2="470"/><line x1="0" y1="510" x2="60" y2="510"/></g>
   <g id="sx-checkwrap" transform="translate(0 30)"><g id="sx-check" opacity="0"><rect x="360" y="70" width="340" height="232" rx="18" fill="#0F0E0E"/>
    <text x="386" y="110" ${M} font-size="14" fill="#B9B1B1" letter-spacing="0">Doorstep inspection</text>
    ${checks.map((c, i) => `<g id="sx-r${i}"><circle cx="398" cy="${148 + i * 40}" r="13" fill="none" stroke="#5F5858" stroke-width="2.5"/><path d="M391 ${148 + i * 40} l5 5 l10 -11" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0"/><text x="424" y="${154 + i * 40}" ${F} font-size="18" fill="#FFFFFF">${c}</text></g>`).join('')}</g></g>
   <g id="sx-sold" opacity="0"><g transform="translate(470 452) rotate(-12)"><rect x="-96" y="-32" width="192" height="64" rx="8" fill="#FFFFFF" stroke="#D7141A" stroke-width="5"/><text x="0" y="13" text-anchor="middle" ${F} font-size="34" font-weight="700" fill="#D7141A" letter-spacing="6">SOLD</text></g></g>
   <g id="sx-phone" transform="translate(0 640)">
    <rect x="990" y="104" width="246" height="440" rx="36" fill="#0F0E0E"/><rect x="1003" y="118" width="220" height="412" rx="26" fill="#FFFFFF"/><rect x="1078" y="126" width="70" height="10" rx="5" fill="#0F0E0E"/>
    <g id="sx-s1">
     <text x="1022" y="174" ${F} font-size="19" font-weight="600" fill="#1A1717">Sell your bike</text>
     <rect x="1020" y="192" width="186" height="50" rx="8" fill="#FFFFFF" stroke="#0F0E0E" stroke-width="3"/><rect x="1020" y="192" width="26" height="50" rx="6" fill="#0F0E0E"/><text x="1033" y="223" ${F} font-size="8" font-weight="700" fill="#FFFFFF" text-anchor="middle">IND</text>
     <text id="sx-plate" x="1054" y="225" ${M} font-size="17" font-weight="500" fill="#1A1717" letter-spacing="1"></text><rect id="sx-caret" x="1054" y="207" width="2" height="22" fill="#D7141A"/>
     <text x="1022" y="272" ${M} font-size="11" fill="#5F5858" letter-spacing="0">KM driven</text><rect x="1020" y="280" width="74" height="28" rx="14" fill="#0F0E0E"/><text x="1057" y="299" ${F} font-size="12" fill="#FFFFFF" text-anchor="middle">10–25k</text>
     <g id="sx-btn1"><rect x="1020" y="324" width="186" height="46" rx="10" fill="#D7141A"/><text x="1113" y="353" ${F} font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">Get price →</text></g>
     <g id="sx-est" opacity="0"><rect x="1020" y="386" width="186" height="118" rx="12" fill="#0F0E0E"/><text x="1036" y="414" ${M} font-size="11" fill="#B9B1B1" letter-spacing="0">Your estimate</text><text x="1036" y="450" ${F} font-size="24" font-weight="600" fill="#FFFFFF">₹1.62L –</text><text x="1036" y="480" ${F} font-size="24" font-weight="600" fill="#FFFFFF">₹1.80L</text></g>
    </g>
    <g id="sx-s2" opacity="0">
     <text x="1022" y="174" ${M} font-size="12" fill="#5F5858" letter-spacing="0">Final offer</text>
     <text x="1022" y="214" ${F} font-size="32" font-weight="600" fill="#1A1717">₹1,72,000</text>
     <text x="1022" y="240" ${F} font-size="13" fill="#5F5858">Fixed price · no haggling</text>
     <g id="sx-acc"><rect x="1020" y="258" width="186" height="46" rx="10" fill="#D7141A"/><text x="1113" y="287" ${F} font-size="16" font-weight="600" fill="#FFFFFF" text-anchor="middle">Accept offer</text></g>
     <text x="1022" y="336" ${M} font-size="11" fill="#5F5858" letter-spacing="0">E-sign documents</text>
     <rect x="1020" y="346" width="186" height="110" rx="10" fill="#F6F4F4" stroke="#E3DEDE" stroke-width="2"/>
     <path id="sx-sig" d="M1036 420 C1050 380 1062 380 1060 418 C1058 440 1074 396 1088 404 C1100 412 1094 430 1110 414 C1124 400 1132 426 1146 410 C1160 396 1172 420 1190 408" fill="none" stroke="#0F0E0E" stroke-width="3.2" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
     <line x1="1032" y1="436" x2="1194" y2="436" stroke="#B9B1B1" stroke-width="1.5"/>
    </g>
    <g id="sx-s3" opacity="0">
     <g id="sx-conf"></g>
     <g id="sx-ok"><circle cx="1113" cy="262" r="50" fill="#D7141A"/><path d="M1090 262 l16 16 l30 -34" stroke="#FFFFFF" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
     <text x="1113" y="358" ${F} font-size="30" font-weight="600" fill="#1A1717" text-anchor="middle">₹1,72,000</text>
     <text x="1113" y="386" ${F} font-size="15" fill="#5F5858" text-anchor="middle">credited by UPI</text>
     <rect x="1050" y="410" width="126" height="30" rx="15" fill="#0F0E0E"/><text x="1113" y="430" ${M} font-size="13" fill="#FFFFFF" text-anchor="middle">10:28 AM</text>
    </g>
   </g>
   <g id="sx-end" opacity="0"><rect x="-2000" width="5000" height="720" fill="#0F0E0E"/>
    <g id="sx-endc"><text x="40" y="330" ${F} font-size="84" font-weight="700" font-style="italic" fill="#FFFFFF" text-anchor="end">speed<tspan fill="#D7141A">i</tspan></text>
     ${tyre('sx-t1')}${tyre('sx-t2')}
     <text id="sx-end1" x="0" y="420" ${F} font-size="40" font-weight="600" fill="#FFFFFF" text-anchor="middle">Sold in 28 minutes.</text>
     <text id="sx-end2" x="0" y="464" ${F} font-size="22" fill="#B9B1B1" text-anchor="middle">Free inspection · UPI payout · RC transfer handled</text></g>
   </g>
  </svg>`;

  function html() {
    return `<div class="sx" tabindex="0" aria-label="Story animation player">
     <div class="sx-stage">${svg}
      <div class="sx-clock" aria-hidden="true"><span class="sx-tod">10:00 AM</span><strong class="sx-el">0 min</strong></div>
      <button class="sx-big" data-sx="toggle" aria-label="Play story">${'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'}</button>
     </div>
     <div class="sx-bar">
      <button class="sx-btn" data-sx="toggle" aria-label="Pause"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>
      <input class="sx-seek" type="range" min="0" max="${DUR}" step="50" value="0" aria-label="Seek">
      <span class="sx-time">0:00 / 0:20</span>
      <button class="sx-btn" data-sx="replay" aria-label="Replay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg></button>
     </div>
     <div class="sx-cap" aria-live="polite"><span class="sx-cap-t"></span><p></p></div>
     <ol class="sx-steps">${CAPS.map((c, i) => `<li><button data-sx="jump" data-t="${c[0]}" aria-label="Jump to ${c[2]}"><i></i><span>${['Price', 'Rides over', 'Inspection', 'Offer', 'Paid', 'Sold'][i]}</span></button></li>`).join('')}</ol>
    </div>`;
  }

  function mount(root, opts = {}) {
    if (!root) return null;
    root.innerHTML = html();
    const q = s => root.querySelector(s), $id = id => root.querySelector('#' + id);
    const S = { t: 0, playing: false, last: 0, raf: 0, user: false };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const svgEl = q('.sx-svg');
    const conf = $id('sx-conf');
    conf.innerHTML = [...Array(16)].map((_, i) => `<rect width="8" height="14" rx="2" fill="${i % 3 ? '#D7141A' : '#0F0E0E'}"/>`).join('');
    const confEls = [...conf.children];
    let crop = null;
    function fit() {
      const narrow = opts.crop !== false && root.clientWidth < 640;
      crop = narrow ? [340, 0, 900, 720] : [0, 0, 1280, 720];
      svgEl.setAttribute('viewBox', crop.join(' '));
      root.classList.toggle('sx-narrow', narrow);
    }
    const set = (id, attr, v) => { const e = $id(id); if (e) e.setAttribute(attr, v); };
    function render(t) {
      S.t = t;
      /* phone in/out */
      const pin = easeOut(seg(t, 0, 500)) * (1 - inOut(seg(t, 2900, 3400))) + easeOut(seg(t, 10300, 10800)) * (1 - inOut(seg(t, 17100, 17500)));
      set('sx-phone', 'transform', `translate(0 ${lerp(640, 0, pin).toFixed(1)})`);
      set('sx-s1', 'opacity', t < 5000 ? 1 : 0);
      set('sx-s2', 'opacity', t >= 10000 && t < 14000 ? 1 : (t >= 14000 && t < 14300 ? 1 - seg(t, 14000, 14300) : 0));
      set('sx-s3', 'opacity', t >= 14000 ? seg(t, 14000, 14300) : 0);
      /* screen 1: typing plate */
      const plate = 'MH 12 AB 1234', n = Math.round(seg(t, 600, 1900) * plate.length);
      $id('sx-plate').textContent = plate.slice(0, n);
      set('sx-caret', 'x', 1054 + n * 10.4); set('sx-caret', 'opacity', t < 2100 && Math.floor(t / 380) % 2 === 0 ? 1 : 0);
      const press1 = seg(t, 2050, 2200) * (1 - seg(t, 2200, 2350));
      set('sx-btn1', 'transform', `translate(1113 347) scale(${1 - .06 * press1}) translate(-1113 -347)`);
      const est = easeOut(seg(t, 2300, 2650)); set('sx-est', 'opacity', est); set('sx-est', 'transform', `translate(0 ${(1 - est) * 14})`);
      /* inspector rides in, stops, rides out at end */
      const arrive = inOut(seg(t, 3100, 5300)), leave = Math.pow(seg(t, 16400, 18000), 2);
      const ix = lerp(1600, 960, arrive) - leave * 1400;
      set('sx-insp', 'transform', `translate(${ix.toFixed(1)} 377) scale(-.95 .95)`);
      const dist = (1600 - ix);
      const wa = (dist / 32 * 180 / Math.PI).toFixed(1);
      set('iw1', 'transform', `rotate(${wa} 80 142)`); set('iw2', 'transform', `rotate(${wa} 242 142)`);
      const moving = (t > 3100 && t < 5200) || (t > 16400 && t < 18000);
      set('sx-wind', 'opacity', moving ? .9 : 0); set('sx-wind', 'transform', `translate(${(ix + 230).toFixed(1)} 0)`);
      /* customer phone glow */
      set('sx-handphone', 'fill', t < 3000 || (t > 10300 && t < 17000) ? '#D7141A' : '#1A1717');
      /* inspection */
      const ck = easeOut(seg(t, 5600, 6100)) * (1 - seg(t, 10200, 10600));
      set('sx-check', 'opacity', ck); set('sx-check', 'transform', `translate(0 ${(1 - ck) * -20})`);
      checks.forEach((_, i) => {
        const on = t > 6500 + i * 900 && t < 10600; const g = $id('sx-r' + i);
        g.children[0].setAttribute('fill', on ? '#D7141A' : 'none'); g.children[0].setAttribute('stroke', on ? '#D7141A' : '#5F5858'); g.children[1].setAttribute('opacity', on ? 1 : 0);
      });
      const scanOn = t > 6100 && t < 9800, sx = 350 + ((t - 6100) % 1200) / 1200 * 240;
      set('sx-scan', 'opacity', scanOn ? 1 : 0); set('sx-scan', 'x', sx.toFixed(1));
      set('sx-scanglow', 'opacity', scanOn ? .14 : 0); set('sx-scanglow', 'x', (sx - 18).toFixed(1));
      /* offer + e-sign */
      const press2 = seg(t, 11600, 11750) * (1 - seg(t, 11750, 11900));
      set('sx-acc', 'transform', `translate(1113 281) scale(${1 - .06 * press2}) translate(-1113 -281)`);
      set('sx-sig', 'stroke-dashoffset', (100 - 100 * inOut(seg(t, 12100, 13600))).toFixed(1));
      /* paid */
      const ok = back(seg(t, 14200, 14700)); set('sx-ok', 'transform', `translate(1113 262) scale(${Math.max(0, ok)}) translate(-1113 -262)`);
      const cp = seg(t, 14300, 15600);
      confEls.forEach((r, i) => {
        const a = (i / confEls.length) * Math.PI * 2 + .3, d = easeOut(cp) * (70 + (i % 4) * 18);
        r.setAttribute('x', (1109 + Math.cos(a) * d).toFixed(1)); r.setAttribute('y', (255 + Math.sin(a) * d + cp * cp * 60).toFixed(1));
        r.setAttribute('transform', `rotate(${(cp * 400 + i * 30).toFixed(0)} ${(1113 + Math.cos(a) * d).toFixed(1)} ${(262 + Math.sin(a) * d).toFixed(1)})`);
        r.setAttribute('opacity', cp > 0 && cp < 1 ? 1 - cp * .8 : 0);
      });
      /* SOLD stamp */
      const sold = back(seg(t, 15000, 15450)); set('sx-sold', 'opacity', t > 15000 ? 1 : 0);
      set('sx-sold', 'transform', `translate(470 452) scale(${(t > 15000 ? 1.6 - .6 * Math.min(1, sold) : 1).toFixed(3)}) translate(-470 -452)`);
      /* end card */
      const endA = easeOut(seg(t, 17400, 17900)); set('sx-end', 'opacity', endA);
      const cx = crop[0] + crop[2] / 2; set('sx-endc', 'transform', `translate(${cx} 0)`);
      [['sx-t1', 76, 17800], ['sx-t2', 132, 17950]].forEach(([id, x, st]) => {
        const p = easeOut(seg(t, st, st + 1000)), off = (1 - p) * 700;
        set(id, 'transform', `translate(${(x + off).toFixed(1)} 306) rotate(${(off * 0.9).toFixed(0)})`);
      });
      const e1 = easeOut(seg(t, 18500, 18900)); set('sx-end1', 'opacity', e1); set('sx-end2', 'opacity', easeOut(seg(t, 18800, 19200)));
      const beam = t < 1100 ? (Math.sin(t / 90) * .5 + .5) * .22 * (1 - seg(t, 800, 1100)) : 0; set('sx-beam', 'opacity', beam.toFixed(3));
      /* HTML overlays */
      const m = minutesAt(t);
      const pre = t < 5600; q('.sx-clock').classList.toggle('pre', pre);
      q('.sx-el').textContent = pre ? 'Clock starts at your door' : Math.round(m) + ' min';
      const mins = Math.floor(m); q('.sx-tod').textContent = pre ? (t < 3000 ? 'Day before' : 'Next day') : `10:${String(mins).padStart(2, '0')} AM`;
      q('.sx-clock').classList.toggle('done', t > 16000);
      const ci = CAPS.findIndex(c => t >= c[0] && t < c[1]); const c = CAPS[ci < 0 ? CAPS.length - 1 : ci];
      if (q('.sx-cap p').textContent !== c[3]) { q('.sx-cap-t').textContent = c[2]; q('.sx-cap p').textContent = c[3]; }
      root.querySelectorAll('.sx-steps li').forEach((li, i) => { li.classList.toggle('on', i === ci); li.classList.toggle('done', i < ci); });
      q('.sx-seek').value = t; q('.sx-seek').style.setProperty('--p', (t / DUR * 100) + '%');
      q('.sx-time').textContent = `0:${String(Math.floor(t / 1000)).padStart(2, '0')} / 0:20`;
    }
    function frame(now) {
      if (!root.isConnected) { cancelAnimationFrame(S.raf); return; }
      if (S.playing) { S.t += Math.min(64, now - S.last); if (S.t >= DUR) S.t = opts.loop === false ? DUR : 0; render(S.t); }
      S.last = now; S.raf = requestAnimationFrame(frame);
    }
    function setPlaying(p) {
      S.playing = p; root.classList.toggle('playing', p);
      const b = q('.sx-bar [data-sx=toggle]'); b.setAttribute('aria-label', p ? 'Pause' : 'Play');
      b.innerHTML = p ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>' : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      if (p && typeof track === 'function' && !S.tracked) { S.tracked = true; track('video_start', { video_title: 'sold_in_28_minutes' }); }
    }
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-sx]'); if (!b) return;
      S.user = true;
      if (b.dataset.sx === 'toggle') setPlaying(!S.playing);
      if (b.dataset.sx === 'replay') { render(0); setPlaying(true); }
      if (b.dataset.sx === 'jump') { render(+b.dataset.t + 1); setPlaying(true); }
    });
    root.addEventListener('keydown', e => { if (e.key === ' ' && e.target === root) { e.preventDefault(); S.user = true; setPlaying(!S.playing); } });
    q('.sx-seek').addEventListener('input', e => { S.user = true; render(+e.target.value); });
    fit(); render(opts.start ?? (reduce ? 14600 : 0));
    addEventListener('resize', () => { if (root.isConnected) { fit(); render(S.t); } });
    if (opts.manual) return { render, DUR };
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { if (!S.user) setPlaying(en.isIntersecting); }, { threshold: .45 }).observe(root);
    }
    S.raf = requestAnimationFrame(t => { S.last = t; frame(t); });
    return { render, play: () => setPlaying(true), pause: () => setPlaying(false), DUR };
  }

  window.SpeediooStory = { mount, DUR };
})();
