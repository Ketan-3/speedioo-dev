/* City experiences: landscape illustrations, local copy and texture per city.
   Content here is editorial (routes, riding conditions); inventory-based parts are computed from BIKES at render time. */
(function () {
  const ICONS = {
    Pune: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M2 19 8.5 8l4 6 3-4L22 19z"/><path d="M8.5 8V5h2"/></svg>',
    Mumbai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M6 14V5M18 14V5M6 6l-3 8M6 6l3 8M18 6l-3 8M18 6l3 8"/></svg>',
    Bangalore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-6"/><path d="M5 14c-2.5-1-2.5-5 .5-5.5C5 5 9 3.5 11 6c2-3 7-2 7 2 3 .5 3 5 .5 6z"/></svg>'
  };

  const CITY = {
    Pune: {
      short: 'Sahyadri foothills', greet: 'नमस्कार, पुणे', lang: 'mr',
      heroLine: 'From Hinjewadi commutes to Sinhagad sunrises.',
      title: 'Pune rides two ways',
      intro: 'Weekdays are stop-start runs to Hinjewadi, Kharadi and Magarpatta. Weekends climb into the Sahyadri ghats. Every Speedioo bike in Pune is checked for both.',
      rides: [
        ['Sinhagad Fort', 'An early-morning climb up the ghat road to the hill fort, with breakfast at the top.'],
        ['Tamhini Ghat', 'Waterfalls and wet curves in the monsoon. Good tyres matter here.'],
        ['Mulshi and Lavasa', 'Lake views and a smooth half-day loop west of the city.']
      ],
      everyday: 'Short city trips suit light commuters and scooters. Ghat weekends reward 350cc torque and strong brakes.',
      picks: [['Scooter', 'City scooters'], ['Commuter', 'Daily commuters'], ['Cruiser', 'Ghat-ready cruisers']],
      hub: 'Baner hub · Office No. 404, Icon Tower, Baner Road (opp. KFC), Pune 411045',
      guide: 'Monsoon riding checklist for Pune and Mumbai'
    },
    Mumbai: {
      short: 'City by the sea', greet: 'नमस्कार, मुंबई', lang: 'mr',
      heroLine: 'From Western Express Highway crawls to Marine Drive nights.',
      title: 'Mumbai rides on mileage and monsoons',
      intro: 'Long traffic crawls, sea air and monsoon water-logging are part of the daily ride. On weekends the old highway opens up towards the ghats.',
      rides: [
        ['Marine Drive', 'A late-night cruise along the Queen’s Necklace.'],
        ['Lonavala via the old highway', 'The Mumbai–Pune Expressway is closed to two-wheelers, so take the old NH 48 through Khandala.'],
        ['Malshej Ghat', 'Mist, waterfalls and green cliffs in the monsoon.']
      ],
      everyday: 'Look for a light clutch, good mileage and sealed electricals. Our report shows rust and electrical checks for every bike.',
      picks: [['Scooter', 'Traffic-friendly scooters'], ['Commuter', 'High-mileage commuters'], ['Sports', 'Weekend sport bikes']],
      hub: '[Mumbai hub address]',
      guide: 'Monsoon riding checklist for Pune and Mumbai'
    },
    Bangalore: {
      short: 'Garden city', greet: 'ನಮಸ್ಕಾರ, ಬೆಂಗಳೂರು', lang: 'en',
      heroLine: 'From Outer Ring Road commutes to Nandi Hills sunrises.',
      title: 'Bangalore rides long and early',
      intro: 'Commutes are long and slow, which is why EVs and automatic scooters make sense here. Weekend rides start before dawn.',
      rides: [
        ['Nandi Hills', 'The classic pre-dawn ride for a sunrise above the clouds.'],
        ['Kanakapura Road', 'River views towards Sangama on an easy half-day loop.'],
        ['Coorg', 'Coffee estates and twisting roads for a long weekend.']
      ],
      everyday: 'Stop-go traffic suits EVs and automatic scooters you can charge at home overnight.',
      picks: [['EV', 'Electric scooters'], ['Scooter', 'Automatic scooters'], ['Sports', 'Weekend sport bikes']],
      hub: '[Bangalore hub address]',
      guide: 'Is an EV right for your Bangalore commute?'
    }
  };

  /* palette: dark = hero overlay, light = content panels */
  const PAL = {
    dark: { far: '#262222', mid: '#1E1B1B', near: '#121010', line: '#3A3535', sun: '#D7141A', glow: 'rgba(215,20,26,.18)', light: '#FFD9DA', road: '#4A4545', water: '#1A1717', cloud: 'rgba(255,255,255,.05)' },
    light: { far: '#E3DCDC', mid: '#CEC5C5', near: '#9F9595', line: '#B3A9A9', sun: '#D7141A', glow: 'rgba(215,20,26,.12)', light: '#0F0E0E', road: '#5F5858', water: '#DCD5D5', cloud: '#FFFFFF' }
  };

  const rider = (p, path, dur, id) => `<g class="cs-rider"><g transform="translate(-14 -22)"><circle cx="5" cy="18" r="4.5" fill="none" stroke="${p.light}" stroke-width="2"/><circle cx="23" cy="18" r="4.5" fill="none" stroke="${p.light}" stroke-width="2"/><path d="M5 18 L11 11 L19 11 L23 18 M11 11 L14 6 M19 11 L21 7" stroke="${p.light}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="15" cy="3" r="3" fill="${p.sun}"/></g>
    <animateMotion dur="${dur}s" repeatCount="indefinite" rotate="auto"><mpath href="#${id}"/></animateMotion></g>`;

  function clouds(p) {
    return `<g class="cs-clouds" fill="${p.cloud}"><ellipse cx="260" cy="70" rx="90" ry="14"/><ellipse cx="320" cy="60" rx="60" ry="12"/><ellipse cx="1180" cy="96" rx="110" ry="14"/><ellipse cx="1250" cy="86" rx="60" ry="11"/></g>`;
  }

  function pune(p, uid) {
    const road = `M1640 352 C1500 350 1420 318 1330 300 C1240 282 1230 250 1150 246 C1070 242 1040 268 960 262 C880 256 860 228 790 226`;
    return `
    <circle cx="1210" cy="150" r="70" fill="${p.sun}" opacity=".9"/><circle cx="1210" cy="150" r="120" fill="${p.glow}"/>
    ${clouds(p)}
    <path d="M0 250 L90 210 L170 228 L260 170 L330 196 L420 140 L500 170 L560 150 L650 190 L740 160 L830 196 L930 150 L1010 176 L1100 132 L1180 170 L1280 150 L1370 186 L1460 156 L1600 200 L1600 400 L0 400Z" fill="${p.far}"/>
    <path d="M0 300 L120 250 L210 268 L300 230 L380 248 L470 214 L520 214 L540 200 L700 200 L720 214 L800 222 L900 260 L1010 236 L1120 270 L1230 246 L1360 282 L1480 258 L1600 290 L1600 400 L0 400Z" fill="${p.mid}"/>
    <g fill="${p.mid}" stroke="${p.line}" stroke-width="2">
      <path d="M540 200 v-26 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v-8 h10 v26"/>
      <path d="M548 200 a22 22 0 0 1 0 -40 v40z M692 200 a22 22 0 0 0 0 -40 v40z"/>
      <path d="M612 200 v-18 a8 8 0 0 1 16 0 v18"/>
    </g>
    <path id="${uid}" d="${road}" fill="none" stroke="${p.road}" stroke-width="3" stroke-dasharray="10 9" stroke-linecap="round"/>
    <path d="M0 360 L80 330 L170 344 L260 316 L340 330 L460 300 L560 326 L640 312 L760 340 L860 322 L980 346 L1100 330 L1220 352 L1340 334 L1460 356 L1600 340 L1600 400 L0 400Z" fill="${p.near}"/>
    <g fill="${p.near}"><path d="M120 330 v-26 l14 -14 l14 14 v26z"/><path d="M128 290 l6 -18 l6 18z"/><rect x="250" y="300" width="34" height="30"/><rect x="290" y="292" width="22" height="38"/><rect x="380" y="306" width="30" height="24"/></g>
    ${rider(p, road, 16, uid)}`;
  }

  function mumbai(p, uid) {
    const deck = `M-40 268 C300 262 600 256 900 254 C1200 252 1400 256 1660 262`;
    let cables = '';
    [[620, 120], [1040, 116]].forEach(([x, top]) => {
      for (let i = 1; i <= 7; i++) { cables += `<line x1="${x}" y1="${top + i * 10}" x2="${x - i * 46}" y2="256" /><line x1="${x}" y1="${top + i * 10}" x2="${x + i * 46}" y2="255" />`; }
    });
    let lights = '';
    for (let i = 0; i < 26; i++) { const t = i / 25, x = 40 + t * 520, y = 312 - Math.sin(t * Math.PI) * 26; lights += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2.6"/>`; }
    let waves = '';
    for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) { const x = i * 96 + (r % 2) * 48, y = 300 + r * 22; waves += `<path d="M${x} ${y} q12 -7 24 0 t24 0"/>`; }
    return `
    <circle cx="300" cy="150" r="60" fill="${p.sun}" opacity=".9"/><circle cx="300" cy="150" r="110" fill="${p.glow}"/>
    ${clouds(p)}
    <g fill="${p.far}">
      <rect x="1180" y="120" width="40" height="160"/><rect x="1226" y="90" width="34" height="190"/><rect x="1266" y="140" width="44" height="140"/><rect x="1316" y="70" width="30" height="210"/><rect x="1352" y="110" width="50" height="170"/><rect x="1408" y="150" width="36" height="130"/><rect x="1450" y="96" width="40" height="184"/><rect x="1496" y="130" width="46" height="150"/><rect x="1548" y="160" width="60" height="120"/>
    </g>
    <rect x="0" y="270" width="1600" height="140" fill="${p.water}"/>
    <g stroke="${p.line}" stroke-width="2" fill="none" opacity=".8">${waves}</g>
    <g stroke="${p.line}" stroke-width="1.6">${cables}</g>
    <g fill="${p.mid}"><path d="M608 270 L616 110 L624 110 L632 270z"/><path d="M1028 270 L1036 104 L1044 104 L1052 270z"/></g>
    <path id="${uid}" d="${deck}" fill="none" stroke="${p.mid}" stroke-width="12"/>
    <path d="${deck}" fill="none" stroke="${p.road}" stroke-width="2" stroke-dasharray="12 10" transform="translate(0 -1)"/>
    <g fill="${p.light}" opacity=".9">${lights}</g>
    <path d="M0 330 C140 300 400 296 560 330 L560 410 L0 410Z" fill="${p.near}"/>
    ${rider(p, deck, 14, uid)}`;
  }

  function bangalore(p, uid) {
    const road = `M-40 336 C300 330 520 318 800 318 C1080 318 1300 330 1660 338`;
    const tree = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-6" width="8" height="40" fill="${p.near}"/><path d="M-60 -6 C-70 -40 -30 -60 -8 -52 C0 -78 40 -76 46 -50 C72 -54 80 -20 60 -6Z" fill="${p.near}"/></g>`;
    let grid = '';
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) grid += `<rect x="${1262 + c * 18}" y="${132 + r * 22}" width="10" height="12"/>`;
    return `
    <circle cx="420" cy="170" r="64" fill="${p.sun}" opacity=".9"/><circle cx="420" cy="170" r="116" fill="${p.glow}"/>
    ${clouds(p)}
    <path d="M140 300 C180 200 300 150 420 160 C540 150 640 210 700 300Z" fill="${p.far}"/>
    <path d="M520 300 C560 240 640 220 700 236 C760 224 820 260 840 300Z" fill="${p.far}"/>
    <g fill="${p.mid}">
      <rect x="860" y="230" width="300" height="70"/><rect x="900" y="200" width="220" height="30"/><path d="M980 200 a30 30 0 0 1 60 0z"/><rect x="1006" y="152" width="8" height="20"/>
      <path d="M940 200 l70 -26 l70 26z"/>
      <rect x="1250" y="120" width="80" height="180"/><rect x="1340" y="160" width="60" height="140"/><rect x="1410" y="100" width="70" height="200"/>
    </g>
    <g fill="${p.far}">${grid}</g>
    <g stroke="${p.line}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${876 + i * 44}" y1="236" x2="${876 + i * 44}" y2="298"/>`).join('')}</g>
    <path d="M0 300 L1600 300 L1600 410 L0 410Z" fill="${p.mid}"/>
    <path id="${uid}" d="${road}" fill="none" stroke="${p.road}" stroke-width="3" stroke-dasharray="10 9"/>
    ${tree(80, 300, 1.1)}${tree(250, 312, .8)}${tree(720, 306, .9)}${tree(1180, 310, 1)}${tree(1530, 300, 1.15)}
    <path d="M0 356 L1600 356 L1600 410 L0 410Z" fill="${p.near}"/>
    ${rider(p, road, 15, uid)}`;
  }

  let n = 0;
  function scene(city, mode = 'dark') {
    const p = PAL[mode], uid = 'csr' + (++n);
    const body = { Pune: pune, Mumbai: mumbai, Bangalore: bangalore }[city](p, uid);
    const svg = `<svg class="cs cs-${mode}" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${body}</svg>`;
    return matchMedia('(prefers-reduced-motion: reduce)').matches ? svg.replace(/<animateMotion[\s\S]*?<\/animateMotion>/g, '') : svg;
  }

  /* subtle repeating texture per city, as a CSS background */
  const PATTERNS = {
    Pune: `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='60'><path d='M0 50 Q30 20 60 40 T120 30 M0 58 Q30 30 60 50 T120 40' fill='none' stroke='COL' stroke-width='1'/></svg>`,
    Mumbai: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='24'><path d='M0 12 q7.5 -8 15 0 t15 0 t15 0 t15 0' fill='none' stroke='COL' stroke-width='1'/></svg>`,
    Bangalore: `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M14 30 c0 -10 10 -16 16 -14 c-2 8 -8 14 -16 14z M30 16 l-16 14' fill='none' stroke='COL' stroke-width='1'/></svg>`
  };
  const pattern = (city, col) => `url("data:image/svg+xml,${encodeURIComponent(PATTERNS[city].replace(/COL/g, col))}")`;

  function apply(city) {
    const r = document.documentElement;
    r.dataset.city = city;
    r.style.setProperty('--city-pat-dark', pattern(city, 'rgba(255,255,255,0.07)'));
    r.style.setProperty('--city-pat-light', pattern(city, 'rgba(15,14,14,0.06)'));
    document.querySelectorAll('.cityIcon').forEach(e => e.innerHTML = ICONS[city]);
  }

  window.SpeediooCity = { CITY, ICONS, scene, apply };
})();
