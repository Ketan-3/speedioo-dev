/* City experiences: landscape illustrations with the city's own ride roads, local copy and texture.
   Riders are moved along each road by JS (not SMIL) so they stay upright on hairpins in both directions. */
(function () {
  const ICONS = {
    Pune: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M2 19 8.5 8l4 6 3-4L22 19z"/><path d="M8.5 8V5h2"/></svg>',
    Delhi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V9h16v12M4 9l1-3h14l1 3M9 21v-6a3 3 0 0 1 6 0v6"/></svg>',
    Bangalore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-6"/><path d="M5 14c-2.5-1-2.5-5 .5-5.5C5 5 9 3.5 11 6c2-3 7-2 7 2 3 .5 3 5 .5 6z"/></svg>'
  };

  const CITY = {
    Pune: {
      short: 'Sahyadri foothills', greet: 'नमस्कार, पुणे', lang: 'mr',
      heroLine: 'From Hinjewadi commutes to Sinhagad sunrises.',
      title: 'Pune rides two ways',
      intro: 'Weekdays are stop-start runs to Hinjewadi, Kharadi and Magarpatta. Weekends climb the Sahyadri ghats. Every Speedioo bike in Pune is checked for both.',
      rides: [
        ['Sinhagad Fort', 'Hairpin bends up the ghat road to the hill fort, with breakfast at the top.'],
        ['Lavasa via Temghar', 'Curving lakeside roads and misty valleys west of the city.'],
        ['Lonavala and Khandala', 'Ghat views on the old Mumbai–Pune highway. The Expressway is closed to two-wheelers.']
      ],
      everyday: 'Short city trips suit light commuters and scooters. Ghat weekends reward 350cc torque and strong brakes.',
      picks: [['Scooter', 'City scooters'], ['Commuter', 'Daily commuters'], ['Cruiser', 'Ghat-ready cruisers']],
      hub: 'Baner hub · Office No. 404, Icon Tower, Baner Road (opp. KFC), Pune 411045',
      guide: 'Monsoon ghat riding checklist for Pune'
    },
    Delhi: {
      short: 'Capital city', greet: 'नमस्ते, दिल्ली', lang: 'hi',
      heroLine: 'From Ring Road commutes to Murthal paratha runs.',
      title: 'Delhi rides long and wide',
      intro: 'Daily rides are long flyover commutes across the city, through summer heat and winter fog. Weekends head out on the highways for food and forts.',
      rides: [
        ['Murthal', 'The classic early-morning run up the GT Karnal Road for dhaba parathas.'],
        ['Damdama Lake', 'Aravalli views and an easy half-day loop past Gurugram.'],
        ['Neemrana Fort', 'A longer highway ride to a 15th-century hill fort.']
      ],
      everyday: 'Long distances reward a comfortable seat and good mileage. In winter fog, bright lights matter: our report checks every bulb.',
      picks: [['Commuter', 'High-mileage commuters'], ['Sports', 'Highway-ready sport bikes'], ['Cruiser', 'Long-ride cruisers']],
      hub: '[Delhi hub address]',
      guide: 'Riding in Delhi’s winter fog: a safety checklist'
    },
    Bangalore: {
      short: 'Garden city', greet: 'ನಮಸ್ಕಾರ, ಬೆಂಗಳೂರು', lang: 'en',
      heroLine: 'From Outer Ring Road commutes to Nandi Hills sunrises.',
      title: 'Bangalore rides long and early',
      intro: 'Commutes are long and slow, which is why EVs and automatic scooters make sense here. Weekend rides start before dawn.',
      rides: [
        ['Nandi Hills', 'Hairpin bends to the top for a sunrise above the clouds.'],
        ['Kanakapura Road', 'River views towards Sangama on an easy half-day loop.'],
        ['Coorg', 'Coffee estates and twisting roads for a long weekend.']
      ],
      everyday: 'Stop-go traffic suits EVs and automatic scooters you can charge at home overnight.',
      picks: [['EV', 'Electric scooters'], ['Scooter', 'Automatic scooters'], ['Sports', 'Weekend sport bikes']],
      hub: '[Bangalore hub address]',
      guide: 'Is an EV right for your Bangalore commute?'
    }
  };

  /* hero = over the red hero; light = content panels */
  const PAL = {
    hero: { sky: 'none', far: 'rgba(255,255,255,.10)', mid: 'rgba(255,255,255,.16)', hill: 'rgba(255,255,255,.22)', near: '#FFFAF7', line: 'rgba(255,255,255,.35)', sun: '#FFE7DF', glow: 'rgba(255,231,223,.22)', rider: '#FFFFFF', helmet: '#FFFFFF', road: 'rgba(255,255,255,.28)', mark: 'rgba(255,255,255,.75)', water: 'rgba(255,255,255,.14)', cloud: 'rgba(255,255,255,.14)', accent: '#FFFFFF' },
    light: { sky: '#FFF4EF', far: '#F3DCD6', mid: '#E8C5BD', hill: '#DDB0A6', near: '#C98E82', line: '#C98E82', sun: '#DE2227', glow: 'rgba(222,34,39,.14)', rider: '#221C1C', helmet: '#DE2227', road: '#FFFFFF', mark: '#C98E82', water: '#F6D8D0', cloud: '#FFFFFF', accent: '#DE2227' }
  };

  const riderG = p => `<g class="cs-rider" transform="translate(-100 -100)"><g transform="translate(-14 -24)">
    <circle cx="5" cy="19" r="4.6" fill="none" stroke="${p.rider}" stroke-width="2.2"/><circle cx="24" cy="19" r="4.6" fill="none" stroke="${p.rider}" stroke-width="2.2"/>
    <path d="M5 19 L11 12 L20 12 L24 19 M11 12 L15 6 M20 12 L22 8" stroke="${p.rider}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="16" cy="3.5" r="3.4" fill="${p.helmet}"/></g></g>`;
  const road = (p, id, d, w = 12) => `<path d="${d}" fill="none" stroke="${p.road}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path id="${id}" class="cs-road" d="${d}" fill="none" stroke="${p.mark}" stroke-width="1.6" stroke-dasharray="7 7"/>`;
  const clouds = p => `<g class="cs-clouds" fill="${p.cloud}"><ellipse cx="240" cy="70" rx="90" ry="13"/><ellipse cx="300" cy="60" rx="56" ry="11"/><ellipse cx="1320" cy="80" rx="100" ry="12"/></g>`;

  function pune(p, id) {
    /* Sinhagad: ghat road with hairpins up to the hill fort; Lavasa-style lake on the left */
    const r = 'M-30 368 C120 366 260 356 400 344 C540 332 700 340 860 322 C960 310 1010 300 960 286 C900 270 860 262 940 248 C1020 234 1080 238 1040 220 C990 200 980 192 1050 180 C1110 170 1150 168 1120 152 C1100 142 1110 132 1160 124';
    let ripples = '';
    for (let i = 0; i < 7; i++) ripples += `<path d="M${40 + i * 52} ${318 + (i % 3) * 8} h${26 + (i % 2) * 14}" stroke="${p.line}" stroke-width="2" stroke-linecap="round"/>`;
    return `
    ${p.sky !== 'none' ? `<rect width="1600" height="400" fill="${p.sky}"/>` : ''}
    <circle cx="1380" cy="120" r="56" fill="${p.sun}"/><circle cx="1380" cy="120" r="100" fill="${p.glow}"/>
    ${clouds(p)}
    <path d="M0 250 L120 205 L220 228 L330 170 L420 196 L520 150 L620 186 L720 160 L820 200 L920 150 L1040 120 L1200 160 L1320 140 L1460 180 L1600 160 L1600 400 L0 400Z" fill="${p.far}"/>
    <path d="M620 400 L760 300 L900 260 L1010 190 L1100 128 L1150 108 L1210 112 L1290 160 L1400 210 L1500 250 L1600 270 L1600 400Z" fill="${p.hill}"/>
    <g fill="${p.hill}" stroke="${p.line}" stroke-width="1.6"><path d="M1118 112 v-18 h8 v6 h8 v-6 h8 v6 h8 v-6 h8 v6 h8 v-6 h8 v6 h8 v-6 h8 v18"/><path d="M1124 112 a14 14 0 0 1 0 -26 v26z M1200 112 a14 14 0 0 0 0 -26 v26z"/></g>
    <path d="M0 300 L120 284 L240 296 L380 280 L520 300 L640 296 L640 400 L0 400Z" fill="${p.mid}"/>
    <path d="M0 312 C120 304 300 304 440 316 L440 342 C300 352 120 352 0 344Z" fill="${p.water}"/>
    <g fill="none">${ripples}</g>
    <g fill="${p.mid}"><rect x="470" y="282" width="22" height="30"/><rect x="496" y="272" width="18" height="40"/><rect x="518" y="286" width="26" height="26"/></g>
    ${road(p, id, r)}
    <path d="M0 384 L300 372 L600 380 L900 366 L1200 380 L1600 370 L1600 400 L0 400Z" fill="${p.near}"/>
    ${riderG(p)}`;
  }

  function delhi(p, id) {
    /* Qutub Minar, India Gate, Aravalli ridge and a highway that bends past them */
    const r = 'M-30 352 C200 352 340 330 520 330 C700 330 760 360 940 360 C1120 360 1240 328 1400 326 C1500 324 1560 330 1640 334';
    let bands = '';
    for (let i = 0; i < 5; i++) bands += `<rect x="${236 + i * 2.2}" y="${110 + i * 38}" width="${44 - i * 4.4}" height="5" fill="${p.line}"/>`;
    return `
    ${p.sky !== 'none' ? `<rect width="1600" height="400" fill="${p.sky}"/>` : ''}
    <circle cx="1240" cy="120" r="56" fill="${p.sun}"/><circle cx="1240" cy="120" r="100" fill="${p.glow}"/>
    ${clouds(p)}
    <path d="M0 270 C200 240 360 250 520 236 C700 222 860 250 1040 238 C1220 226 1400 246 1600 236 L1600 400 L0 400Z" fill="${p.far}"/>
    <path d="M232 320 L240 110 L276 110 L284 320Z" fill="${p.hill}"/><path d="M244 110 L252 86 L264 86 L272 110Z" fill="${p.hill}"/>${bands}
    <g fill="${p.hill}"><rect x="760" y="196" width="190" height="24"/><rect x="772" y="220" width="166" height="100"/><rect x="784" y="186" width="142" height="12"/></g>
    <path d="M818 320 V262 a37 37 0 0 1 74 0 V320Z" fill="${p.sky === 'none' ? 'rgba(120,10,14,.35)' : p.sky}"/>
    <path d="M0 330 L1600 330 L1600 400 L0 400Z" fill="${p.mid}"/>
    <g fill="${p.hill}"><rect x="420" y="276" width="34" height="54"/><rect x="460" y="290" width="26" height="40"/><rect x="1040" y="270" width="40" height="60"/><rect x="1086" y="284" width="30" height="46"/><rect x="1380" y="280" width="44" height="50"/></g>
    ${road(p, id, r, 14)}
    <path d="M0 386 L1600 382 L1600 400 L0 400Z" fill="${p.near}"/>
    ${riderG(p)}`;
  }

  function bangalore(p, id) {
    /* Nandi Hills with its hairpin road, Vidhana Soudha and rain-tree canopy */
    const r = 'M-30 366 C150 366 300 356 420 340 C520 326 560 312 500 300 C440 288 450 276 520 266 C590 256 610 246 550 236 C500 228 510 216 570 206 C620 198 640 188 600 178 C580 172 590 164 630 160';
    const tree = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-6" width="8" height="40" fill="${p.near}"/><path d="M-60 -6 C-70 -40 -30 -60 -8 -52 C0 -78 40 -76 46 -50 C72 -54 80 -20 60 -6Z" fill="${p.near}"/></g>`;
    return `
    ${p.sky !== 'none' ? `<rect width="1600" height="400" fill="${p.sky}"/>` : ''}
    <circle cx="760" cy="120" r="56" fill="${p.sun}"/><circle cx="760" cy="120" r="100" fill="${p.glow}"/>
    ${clouds(p)}
    <path d="M0 260 C200 236 380 250 560 240 C760 228 960 250 1160 240 C1360 230 1480 244 1600 240 L1600 400 L0 400Z" fill="${p.far}"/>
    <path d="M300 400 C360 300 440 200 560 150 C620 132 680 140 740 180 C820 236 880 320 920 400Z" fill="${p.hill}"/>
    <g fill="${p.mid}">
      <rect x="1060" y="252" width="300" height="80"/><rect x="1100" y="222" width="220" height="30"/><path d="M1180 222 a30 30 0 0 1 60 0z"/><rect x="1206" y="176" width="8" height="18"/>
      <path d="M1140 222 l70 -26 l70 26z"/>
    </g>
    <path d="M0 332 L1600 332 L1600 400 L0 400Z" fill="${p.mid}"/>
    ${road(p, id, r)}
    ${tree(120, 336, 1)}${tree(980, 338, .9)}${tree(1460, 330, 1.1)}
    <path d="M0 388 L1600 384 L1600 400 L0 400Z" fill="${p.near}"/>
    ${riderG(p)}`;
  }

  let n = 0;
  function scene(city, mode = 'hero') {
    const p = PAL[mode], id = 'csr' + (++n);
    const body = { Pune: pune, Delhi: delhi, Bangalore: bangalore }[city](p, id);
    return `<svg class="cs cs-${mode}" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true" data-road="${id}">${body}</svg>`;
  }

  /* Move each rider along its road. Facing flips with direction so the rider is never upside down. */
  function animate(root) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    (root || document).querySelectorAll('svg.cs[data-road]').forEach(svg => {
      if (svg._anim) return; svg._anim = true;
      const path = svg.querySelector('#' + svg.dataset.road), rider = svg.querySelector('.cs-rider');
      if (!path || !rider || !path.getTotalLength) return;
      const L = path.getTotalLength(), speed = 70; let s = 0, last = 0, vis = true;
      if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(svg);
      const tick = now => {
        if (!svg.isConnected) return;
        const dt = Math.min(64, now - (last || now)); last = now;
        if (vis) {
          s = (s + speed * dt / 1000) % L;
          const a = path.getPointAtLength(s), b = path.getPointAtLength(Math.min(L, s + 2));
          let ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
          const left = b.x < a.x - .01;
          if (left) ang -= 180;
          rider.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})${left ? ' scale(-1 1)' : ''}`);
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  const PATTERNS = {
    Pune: `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='60'><path d='M0 50 Q30 20 60 40 T120 30 M0 58 Q30 30 60 50 T120 40' fill='none' stroke='COL' stroke-width='1'/></svg>`,
    Delhi: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><path d='M8 40 V20 a16 16 0 0 1 32 0 V40' fill='none' stroke='COL' stroke-width='1'/></svg>`,
    Bangalore: `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M14 30 c0 -10 10 -16 16 -14 c-2 8 -8 14 -16 14z M30 16 l-16 14' fill='none' stroke='COL' stroke-width='1'/></svg>`
  };
  const pattern = (city, col) => `url("data:image/svg+xml,${encodeURIComponent(PATTERNS[city].replace(/COL/g, col))}")`;

  function apply(city) {
    const r = document.documentElement;
    r.dataset.city = city;
    r.style.setProperty('--city-pat-dark', pattern(city, 'rgba(255,255,255,0.10)'));
    r.style.setProperty('--city-pat-light', pattern(city, 'rgba(222,34,39,0.07)'));
    document.querySelectorAll('.cityIcon').forEach(e => e.innerHTML = ICONS[city]);
  }

  window.SpeediooCity = { CITY, ICONS, scene, apply, animate };
})();
