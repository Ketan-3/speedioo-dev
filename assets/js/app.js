/* Speedioo front-end app: routing, rendering, interactions.
   Depends on data.js (BIKES, MEDIA, …) and api.js (API, DB, track). */

/* ---------- icons ---------- */
const I = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  rupee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 4h11M7 9h11M7 4c6 0 8 1.5 8 5s-3 5-8 5l7 7"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5 9 10h6l3.5 6.5M9 10 8 7h-2M15 10l1-4h3"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke-linecap="round" stroke-width="3"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 12 20 4l-5 16-3-7z"/></svg>',
  engine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="8" width="13" height="10" rx="2"/><path d="M17 11h3v4h-3M8 8V5h5v3"/></svg>',
  fuel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 21V4h9v17M3 21h13M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/></svg>',
  torque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>',
  odo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M6 16l4-6h4l4 6"/></svg>',
  helmet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 15a8 8 0 0 1 16-2v4H9a5 5 0 0 1-5-2z"/><path d="M13 13h7"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M14.5 5.5a4 4 0 0 0 5 5L12 18l-3 3-3-3 3-3 7.5-7.5"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="9" width="18" height="4"/><path d="M5 13v8h14v-8M12 9v12M12 9S10 4 7.5 5 9 9 12 9zm0 0s2-5 4.5-4S15 9 12 9z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01" stroke-linecap="round"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="4"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/></svg>'
};
const LOGO = (() => {
  const L = window.SPEEDIOO_LOGO;
  if (!L) return '<span class="logo-txt">speedioo</span>';
  return `<svg class="logo-svg" viewBox="0 0 850 253" role="img" aria-label="Speedioo"><path class="lb" d="${L.badgeOuter}"/><path class="ls" fill-rule="evenodd" d="${L.badgeInner}"/>${L.word.map(d => `<path class="lw" d="${d}"/>`).join('')}</svg>`;
})();
const ico = (n, s = 18) => I[n].replace('<svg', `<svg width="${s}" height="${s}" aria-hidden="true"`);

/* ---------- state ---------- */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = !!(navigator.connection && navigator.connection.saveData);
const defF = () => ({ minPrice: 0, maxPrice: 500000, brands: [], minYear: 0, maxKm: 0, types: [], owners: [], sort: 'new' });
const blankSell = () => ({ step: 1, reg: '', noReg: false, brand: '', model: '', year: '', km: '', owners: '', cond: {}, photos: [], name: '', mobile: '', otp: false, verified: false, est: null, date: '', slot: '', where: 'Home', done: false, leadId: '' });
const S = {
  city: DB.get('city', 'Pune'), lang: DB.get('lang', 'en'), shortlist: new Set(DB.get('sl', [])), compare: [], f: defF(), hero: 'buy', shop: 'budget', how: 'buy', coll: 'new', rsKm: '10–25k', fromQR: /[?&]utm_source=qr\b/.test(location.search), howStep: 0,
  user: DB.get('user', null), qv: { list: [], i: 0, ph: 0 }, gal: 0,
  sell: Object.assign(blankSell(), DB.get('sellDraft', {}), { photos: [] })
};
if (S.sell.done) S.sell = blankSell();
const timers = new Set();
const every = (fn, ms) => { const t = setInterval(fn, ms); timers.add(t); return t; };
const clearTimers = () => { timers.forEach(clearInterval); timers.clear(); };

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const lakh = n => n >= 100000 ? '₹' + (+(n / 100000).toFixed(2)) + 'L' : '₹' + Math.round(n / 1000) + 'k';
const kmf = n => n.toLocaleString('en-IN') + ' km';
const own = n => n === 1 ? '1st owner' : n === 2 ? '2nd owner' : n + 'rd owner';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const emi = (p, d = .2, rate = 12, n = 36) => { const P = p * (1 - d), r = rate / 1200; return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); };
const byId = id => BIKES.find(b => b.id === +id);
const mobOk = m => /^[6-9]\d{9}$/.test(m);
const isMobile = () => matchMedia('(max-width:900px)').matches;
function toast(m) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(t._t); t._t = setTimeout(() => t.hidden = true, 2800); }
function saveSL() { DB.set('sl', [...S.shortlist]); API.saveShortlist([...S.shortlist]); const c = S.shortlist.size; $('#favBtn').innerHTML = I.heart + (c ? `<span class="count">${c}</span>` : ''); }
function nextDays(n = 4) { return [...Array(n)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }); }); }

/* drawn fallback, used when a photo can't load */
function art(b) {
  const c = b.tone, g = '<rect width="320" height="200" fill="#F1EDED"/><ellipse cx="160" cy="178" rx="128" ry="7" fill="#E2DCDC"/>';
  if (b.type === 'Scooter' || b.type === 'EV') return `<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(b.name)}">${g}<circle cx="92" cy="150" r="26" fill="none" stroke="#1A1717" stroke-width="10"/><circle cx="236" cy="150" r="26" fill="none" stroke="#1A1717" stroke-width="10"/><path d="M66 146 Q66 104 114 100 L184 100 Q200 100 204 118 L212 146 Z" fill="${c}"/><path d="M204 120 L222 62 L242 62 L254 120 Q256 140 238 142 L212 142 Z" fill="${c}"/><rect x="104" y="86" width="76" height="14" rx="7" fill="#1A1717"/><path d="M226 62 L218 46 M212 44 L248 40" stroke="#1A1717" stroke-width="6" stroke-linecap="round"/></svg>`;
  return `<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(b.name)}">${g}<path d="M150 140 L52 130" stroke="#8C8585" stroke-width="8" stroke-linecap="round"/><circle cx="80" cy="142" r="32" fill="none" stroke="#1A1717" stroke-width="10"/><circle cx="242" cy="142" r="32" fill="none" stroke="#1A1717" stroke-width="10"/><path d="M80 142 L132 104 L198 104 L242 142" stroke="#1A1717" stroke-width="6" fill="none"/><rect x="132" y="106" width="56" height="32" rx="6" fill="#5F5858"/><path d="M118 84 Q140 66 190 72 L204 92 L148 100 Z" fill="${c}"/><path d="M92 88 L150 94 L146 104 L88 100 Z" fill="#1A1717"/><path d="M242 142 L212 70" stroke="#1A1717" stroke-width="7" stroke-linecap="round"/><path d="M202 62 L230 58" stroke="#1A1717" stroke-width="6" stroke-linecap="round"/><circle cx="222" cy="82" r="10" fill="#FFFFFF" stroke="#1A1717" stroke-width="4"/></svg>`;
}
/* real photo with srcset + graceful fallback */
const VIEWS = [{ l: 'Full view' }, { l: 'Front & headlight', pos: '78% 42%', z: 1.9 }, { l: 'Tank & seat', pos: '48% 40%', z: 1.8 }, { l: 'Engine', pos: '50% 66%', z: 2.1 }, { l: 'Rear wheel', pos: '18% 72%', z: 2 }, { l: 'Front wheel', pos: '84% 74%', z: 2 }];
function photo(b, { view = 0, sizes = '(max-width:600px) 90vw, 400px', eager = false, cls = '' } = {}) {
  const v = VIEWS[view] || VIEWS[0];
  return `<span class="photo ${cls}" style="--pos:${v.pos || b.pos};--z:${v.z || 1}"><img src="${PEXELS_IMG(b.photo, 800)}" srcset="${PEXELS_IMG(b.photo, 400)} 400w, ${PEXELS_IMG(b.photo, 800)} 800w, ${PEXELS_IMG(b.photo, 1400)} 1400w" sizes="${sizes}" alt="${esc(b.name)}, ${b.year}${view ? ', ' + v.l.toLowerCase() : ''}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fb="${b.id}" onerror="imgFail(this)"></span>`;
}
function imgFail(img) { const b = byId(img.dataset.fb), p = img.parentElement; if (b && p) { p.innerHTML = art(b); p.classList.add('fb'); } }
function sceneImg(id, alt, w = 900, cls = '') { return `<img class="scene ${cls}" src="${PEXELS_IMG(id, w)}" srcset="${PEXELS_IMG(id, Math.round(w / 2))} ${Math.round(w / 2)}w, ${PEXELS_IMG(id, w)} ${w}w" sizes="(max-width:600px) 90vw, ${Math.round(w / 2)}px" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.classList.add('gone')">`; }

function card(b, o = {}) {
  const fav = S.shortlist.has(b.id);
  return `<article class="card" data-act="open" data-id="${b.id}" tabindex="0" aria-label="${esc(b.name)}, ${inr(b.price)}">
  <div class="card-ph">${photo(b)}<span class="badge">${I.shield}Inspected</span>${b.added <= 2 ? '<span class="badge new">New</span>' : ''}
   <div class="card-tools"><button class="tool" data-act="qv" data-id="${b.id}" aria-label="Quick view ${esc(b.name)}">${I.eye}</button><button class="tool fav-t ${fav ? 'on' : ''}" data-act="fav" data-id="${b.id}" aria-label="Shortlist ${esc(b.name)}" aria-pressed="${fav}">${I.heart}</button></div></div>
  <div class="card-body">
   <button class="tool fav-m ${fav ? 'on' : ''}" data-act="fav" data-id="${b.id}" aria-label="Shortlist ${esc(b.name)}">${I.heart}</button>
   <h3>${esc(b.name)}</h3>
   <div class="facts"><span>${b.year}</span><span>${kmf(b.km)}</span><span>${own(b.owners)}</span>${o.city ? `<span>${b.city}</span>` : ''}</div>
   <div class="card-trust"><span>${ico('shield', 13)} 6-month warranty</span><span>Report ${b.score}/10</span></div>
   <div class="card-foot"><strong class="price">${inr(b.price)}</strong><span class="emi">EMI ${inr(emi(b.price))}/mo</span>
   ${o.compare ? `<label class="cmp"><input type="checkbox" data-cmp="${b.id}" ${S.compare.includes(b.id) ? 'checked' : ''}> Compare</label>` : ''}</div>
  </div></article>`;
}

/* ---------- i18n (sample strings; full copy via CMS) ---------- */
const T = {
  en: { h1: 'Your next ride. Your next chapter. <em>The Speedioo way.</em>', buy: 'Buy', sell: 'Sell', blog: 'Blog', about: 'About us', search: 'Search bikes, brands, guides, help…', iBuy: 'I want to Buy', iSell: 'I want to Sell' },
  hi: { h1: 'आपकी अगली राइड। आपका अगला अध्याय। <em>Speedioo के साथ।</em>', buy: 'खरीदें', sell: 'बेचें', blog: 'ब्लॉग', about: 'हमारे बारे में', search: 'बाइक, ब्रांड, गाइड खोजें…', iBuy: 'मुझे खरीदना है', iSell: 'मुझे बेचना है' },
  mr: { h1: 'तुमची पुढची राइड. तुमचा पुढचा अध्याय. <em>Speedioo सोबत.</em>', buy: 'खरेदी', sell: 'विक्री', blog: 'ब्लॉग', about: 'आमच्याबद्दल', search: 'बाइक, ब्रँड, मार्गदर्शक शोधा…', iBuy: 'मला खरेदी करायची आहे', iSell: 'मला विकायची आहे' }
};
const t = k => T[S.lang][k] || T.en[k];
function applyLang() { $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n)); document.documentElement.lang = S.lang === 'en' ? 'en' : S.lang; }
const ROT = ['bikes.', 'scooters.', 'cruisers.', 'commuters.', 'EVs.'];

/* ---------- motion helpers ---------- */
let revealIO = null;
function armReveal() {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('anim');
  revealIO = revealIO || new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); e.target.querySelectorAll('[data-count]').forEach(countUp); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  $$('#app .rv:not(.in)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight) { el.classList.add('in'); el.querySelectorAll('[data-count]').forEach(countUp); } else revealIO.observe(el);
  });
}
function countUp(el) {
  if (el._done) return; el._done = true;
  const to = +el.dataset.count, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
  if (reduceMotion) { el.textContent = pre + to + suf; return; }
  const t0 = performance.now(), d = 1300;
  const step = now => { const p = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function setupVideo(v, media, { autoplay = true } = {}) {
  if (!v) return;
  v.poster = media.poster;
  if (!autoplay || reduceMotion || saveData) return;
  media.sources.forEach(src => { const s = document.createElement('source'); s.src = src; s.type = 'video/mp4'; v.appendChild(s); });
  v.muted = true; v.load();
  const p = v.play(); if (p) p.catch(() => {});
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { if (!v.dataset.user) e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }).observe(v);
}

/* ---------- HOME ---------- */
const GOALS = [['sell', 'Sell my bike', 'tag'], ['buy', 'Buy a bike', 'bike'], ['worth', 'What’s my bike worth?', 'rupee'], ['compare', 'Compare bikes', 'eye'], ['condition', 'Check a bike’s condition', 'shield'], ['finance', 'Finance, insurance & warranty', 'card'], ['why', 'Why Speedioo?', 'star'], ['explore', 'Just exploring', 'route']];
const COLLECTIONS = [['new', 'Just in'], ['under1l', 'Under ₹1 lakh'], ['re', 'Royal Enfield'], ['scoot', 'Scooters & EVs']];
const CITY_SAMPLE = { Pune: 1, Delhi: 9, Bangalore: 14 };
const BRAND_REF = { 'Royal Enfield': 200000, 'Harley-Davidson': 280000, Honda: 95000, Bajaj: 110000, TVS: 120000, Yamaha: 160000, Ather: 150000, Hero: 75000, Suzuki: 90000, KTM: 200000, Jawa: 200000, Triumph: 300000 };
const phTxt = s => s.startsWith('[') ? `<span class="ph">${esc(s)}</span>` : esc(s);
function scrollToId(id, focusSel) {
  const el = document.getElementById(id); if (!el) return;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  if (focusSel) setTimeout(() => $(focusSel)?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
}
function collList(k) {
  const f = { new: () => true, under1l: b => b.price < 100000, re: b => b.brand === 'Royal Enfield', scoot: b => b.type === 'Scooter' || b.type === 'EV' }[k];
  const sort = (a, b) => a.added - b.added;
  const local = BIKES.filter(b => b.city === S.city && f(b)).sort(sort);
  return local.length ? { list: local, all: false } : { list: BIKES.filter(f).sort(sort), all: true };
}
function collRail() {
  const { list, all } = collList(S.coll || 'new');
  return `${all ? `<p class="coll-note">None in ${S.city} right now. Showing all cities.</p>` : ''}<div class="rail" id="freshRail">${list.map(b => card(b, { city: all })).join('')}</div>`;
}
function resaleCalc() {
  const o = $('#rsOut'); if (!o) return;
  const brand = $('#rsBrand').value, year = +$('#rsYear').value, km = S.rsKm || '10–25k';
  const kf = { '<10k': 1, '10–25k': .9, '25–50k': .8, '50k+': .68 }[km];
  const v = (BRAND_REF[brand] || 100000) * Math.pow(.87, Math.max(0, 2026 - year)) * kf;
  const lo = Math.round(v * .92 / 1000) * 1000, hi = Math.round(v * 1.07 / 1000) * 1000;
  o.innerHTML = `<small>Estimated value</small><strong>${inr(lo)} – ${inr(hi)}</strong><span>Based on brand, year and km. Your final offer is fixed after a free inspection.</span>`;
  clearTimeout(S._rsT); S._rsT = setTimeout(() => track('resale_estimate', { brand, year, km }), 600);
}
function renderHome() {
  const C = SpeediooCity.CITY[S.city], inCity = BIKES.filter(b => b.city === S.city);
  const swap = S.citySwap ? ' swap' : ''; S.citySwap = false;
  const ben = (ic, title, text, cta, attrs) => `<article class="ben"><span class="ben-i">${I[ic]}</span><h3>${title}</h3><p>${text}</p><button class="link-arrow" ${attrs}>${cta} →</button></article>`;
  $('#app').innerHTML = `
  <section class="hero hero-v5${swap}">
   <div class="hero-media" aria-hidden="true"><video id="heroVid" muted loop playsinline preload="none"></video><div class="hero-shade"></div></div>
   <div class="hero-city" aria-hidden="true">${SpeediooCity.scene(S.city, 'hero')}</div>
   <div class="wrap hero-in">
    <div class="hero-copy">
     <span class="eyebrow on-dark"><span class="live"></span>Speedioo ${S.city} · ${C.short}</span>
     <h1>${t('h1')}</h1>
     <p class="sub">Buy smarter, sell confidently, and experience a more transparent way to move forward.</p>
     <p class="hero-local">${C.heroLine}</p>
     <div class="hero-ctas"><a class="btn btn-red" href="#sell">Sell your bike</a><a class="btn btn-ghost-w" href="#buy" data-act="reset-buy">Explore bikes</a><button class="textbtn on-dark disc" data-act="scrollto" data-t="why">Discover Speedioo ↓</button></div>
    </div>
    <div class="finder">
     <div class="seg" role="tablist" aria-label="Buy or sell"><button role="tab" class="${S.hero === 'buy' ? 'on' : ''}" data-act="hero" data-v="buy" aria-selected="${S.hero === 'buy'}">${t('iBuy')}</button><button role="tab" class="${S.hero === 'sell' ? 'on' : ''}" data-act="hero" data-v="sell" aria-selected="${S.hero === 'sell'}">${t('iSell')}</button></div>
     <div id="heroPane">${heroPane()}</div>
    </div>
    <div class="goals"><span class="eyebrow on-dark">I want to…</span><div class="chips">${GOALS.map(([k, l, ic]) => `<button class="chip chip-dark" data-act="goal" data-v="${k}">${ico(ic, 15)}${l}</button>`).join('')}</div></div>
   </div>
   <button class="vid-ctl" data-act="vidtoggle" aria-label="Pause background video">${I.pause}</button>
  </section>

  <section class="sec why" id="why"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Why Speedioo</span><h2>Trust, transparency and ownership in every ride</h2></div></div>
   <div class="pillars rv">
    <article class="pillar"><span class="pi">${I.shield}</span><h3>Trust</h3><p>Every bike is inspected before it is listed, and every promise is written down.</p><ul><li>Inspection report on every listing</li><li>Documents verified before sale</li><li>6-month warranty on bikes you buy</li></ul><button class="link-arrow" data-act="scrollto" data-t="checkpoints">Our inspection standard →</button></article>
    <article class="pillar"><span class="pi">${I.eye}</span><h3>Transparency</h3><p>See what we checked, what we found and how every price is set.</p><ul><li>Listed price, estimate and final offer clearly labelled</li><li>Every deduction explained</li><li>Live status for your sale and RC transfer</li></ul><button class="link-arrow" data-act="pricing">How pricing works →</button></article>
    <article class="pillar"><span class="pi">${I.home}</span><h3>Ownership</h3><p>We stay with you after the sale, from paperwork to insurance and warranty.</p><ul><li>RC transfer handled and tracked</li><li>Insurance and extended warranty help</li><li>A real person on call and WhatsApp</li></ul><button class="link-arrow" data-act="scrollto" data-t="benefits">Ownership benefits →</button></article>
   </div>
   <div class="stats stats-row rv">
    <div><strong data-count="28" data-suf=" min">28 min</strong><span>Doorstep sale, inspection to UPI</span></div>
    <div><strong data-count="60" data-suf=" sec">60 sec</strong><span>To see your estimated price</span></div>
    <div><strong data-count="0" data-pre="₹">₹0</strong><span>Inspection fee, at your doorstep</span></div>
    <div><strong data-count="6" data-suf=" months">6 months</strong><span>Standard warranty on bikes you buy</span></div>
   </div>
  </div></section>

  <section class="sec jr-sec" id="sell28"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow on-dark">Sell your bike in 28 minutes</span><h2>From a QR scan to SOLD</h2></div><a class="btn btn-red" href="#sell">Sell my bike</a></div>
   <div id="journey" class="rv jr-light"></div>
   <div class="jr-watch rv"><div><h3>Watch a 28-minute sale</h3><p>Twenty seconds, from the QR scan to SOLD.</p></div><div id="storyAnim"></div></div>
  </div></section>

  <section class="sec cpx-sec" id="checkpoints"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Vehicle checkpoints</span><h2>See exactly what we checked</h2><p class="sec-sub">Tap any point on the bike to see what our inspector checked, what they found and whether it needs attention.</p></div><a class="link-arrow" href="#buy" data-act="reset-buy">Bikes with full reports →</a></div>
   <div id="cpxHome" class="cpx rv"></div>
  </div></section>

  <section class="marquee" aria-label="Brands we buy and sell"><div class="marquee-track">${[...BRANDS_MARQUEE, ...BRANDS_MARQUEE].map((b, i) => `<button data-act="shop" data-k="brand" data-v="${b}" ${i >= BRANDS_MARQUEE.length ? 'aria-hidden="true" tabindex="-1"' : ''}>${b}</button>`).join('<i>✦</i>')}</div></section>

  <section class="sec sec-alt" id="discover"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Discover bikes with confidence</span><h2>Curated in ${S.city}</h2><p class="sec-sub">Inspected, fixed-price and covered by a 6-month warranty.</p></div>
    <div class="rail-ctl"><button class="tool" data-act="rail" data-d="-1" aria-label="Scroll left">${I.left}</button><button class="tool" data-act="rail" data-d="1" aria-label="Scroll right">${I.right}</button><a class="link-arrow" href="#buy" data-act="reset-buy">View all ${inCity.length} →</a></div></div>
   <div class="tabs" role="tablist">${COLLECTIONS.map(([k, l]) => `<button role="tab" class="${(S.coll || 'new') === k ? 'on' : ''}" data-act="coll" data-v="${k}">${l}</button>`).join('')}</div>
   <div id="collRail">${collRail()}</div>
   <div class="browse"><span class="eyebrow">Browse by</span><div class="chips scroll">${BUDGETS.map((b, i) => `<button class="chip" data-act="shop" data-k="budget" data-v="${i}">${b[0]}</button>`).join('')}${TYPES.map(ty => `<button class="chip" data-act="shop" data-k="type" data-v="${ty}">${ty}</button>`).join('')}</div></div>
  </div></section>

  <section class="sec how-sec"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow on-dark">How buying works</span><h2>Four stops from start to done</h2></div>
    <div class="seg seg-dark" role="tablist"><button role="tab" class="${S.how === 'buy' ? 'on' : ''}" data-act="how" data-v="buy">Buying</button><button role="tab" class="${S.how === 'sell' ? 'on' : ''}" data-act="how" data-v="sell">Selling</button></div></div>
   <div class="how-grid rv"><div class="gauge-box">${gaugeSVG()}</div><ol class="how-steps" id="howSteps"></ol></div>
  </div></section>

  <section class="sec" id="benefits"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Ownership benefits</span><h2>We stay with you after the sale</h2></div></div>
   <div class="bens rv">
    ${ben('shield', 'Standard 6-month warranty', 'Every bike bought from Speedioo comes with a 6-month warranty.', 'What’s covered', 'data-act="warranty"')}
    ${ben('card', 'EMI calculator', 'Estimate your monthly payment from price, down payment, rate and tenure.', 'Check my EMI', 'data-act="emi"')}
    ${ben('gift', 'Extended warranty', 'Extend your cover beyond the standard six months.', 'Explore options', 'data-act="enquiry" data-k="extended_warranty"')}
    ${ben('doc', 'Insurance assistance', 'New policy, renewal or a claim: we help with the paperwork.', 'Get insurance help', 'data-act="enquiry" data-k="insurance"')}
    ${ben('route', 'RC transfer & documents', 'We file the ownership transfer and you can track every stage.', 'Track RC transfer', 'data-act="rc"')}
    ${ben('home', 'Doorstep inspection', 'Book a free slot at home or at our hub, and reschedule any time.', 'Book an inspection', 'data-act="go" data-v="sell"')}
   </div>
  </div></section>

  <section class="sec city-sec${swap}" id="city"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Made for your city</span><h2>${C.title}</h2></div>
    <div class="seg city-tabs" role="tablist" aria-label="Choose city">${CITIES.map(c => `<button role="tab" class="${c === S.city ? 'on' : ''}" aria-selected="${c === S.city}" data-act="setcity" data-v="${c}" data-keep="city"><span class="ci">${SpeediooCity.ICONS[c]}</span>${c}</button>`).join('')}</div></div>
   <div class="city-art">${SpeediooCity.scene(S.city, 'light')}<span class="city-greet">${C.greet}</span></div>
   <div class="city-grid">
    <div class="city-info">
     <p class="city-intro">${C.intro}</p>
     <h3>Weekend rides</h3>
     <ol class="rides">${C.rides.map(([n, d]) => `<li><strong>${n}</strong><span>${d}</span></li>`).join('')}</ol>
    </div>
    <div class="city-info">
     <h3>Everyday riding</h3>
     <p>${C.everyday}</p>
     <div class="chips">${C.picks.filter(([ty]) => inCity.some(b => b.type === ty)).map(([ty, l]) => `<button class="chip" data-act="shop" data-k="type" data-v="${ty}">${l} · ${inCity.filter(b => b.type === ty).length} in stock</button>`).join('')}</div>
     <div class="city-meta">
      <div><span class="eyebrow">Your hub</span><p>${phTxt(C.hub)}</p></div>
      <div><span class="eyebrow">Local guide</span><a class="link-arrow" href="#blog">${C.guide} →</a></div>
      ${C.lang !== 'en' && S.lang !== C.lang ? `<div><span class="eyebrow">Language</span><button class="chip" data-act="langpick" data-v="${C.lang}">${C.lang === 'mr' ? 'मराठीत वाचा' : 'हिंदी में पढ़ें'}</button></div>` : ''}
     </div>
    </div>
   </div>
  </div></section>

  <section class="sec sec-alt"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Real customer experiences</span><h2>What riders say</h2></div><a class="link-arrow" href="#reviews">All reviews →</a></div>
   <div class="rating-bar rv"><strong>★ <span class="ph">[4.x]</span></strong><span class="muted">from <span class="ph">[N]</span> Google reviews</span></div>
   <div class="revs rv">${REVIEWS.slice(0, 4).map(revCard).join('')}</div>
  </div></section>

  <section class="sec" id="tools"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow">Interactive tools</span><h2>Useful even if you’re just looking</h2></div></div>
   <div class="tools rv">
    <div class="tool-card tool-resale">
     <h3>${ico('rupee', 20)} What’s my bike worth?</h3>
     <div class="rs-form">
      <div class="field"><label for="rsBrand">Brand</label><select class="input" id="rsBrand">${Object.keys(BRAND_REF).map(b => `<option ${b === 'Royal Enfield' ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      <div class="field"><label for="rsYear">Year</label><select class="input" id="rsYear">${[...Array(15)].map((_, i) => 2026 - i).map(y => `<option ${y === 2022 ? 'selected' : ''}>${y}</option>`).join('')}</select></div>
     </div>
     <div class="field"><span class="lab">KM driven</span><div class="chips" id="rsKm">${['<10k', '10–25k', '25–50k', '50k+'].map(k => `<button class="chip ${k === (S.rsKm || '10–25k') ? 'on' : ''}" data-act="rskm" data-v="${k}">${k}</button>`).join('')}</div></div>
     <div class="rs-out" id="rsOut" aria-live="polite"></div>
     <a class="btn btn-red" href="#sell">Get my exact quote</a>
    </div>
    <button class="tool-card" data-act="emi">${I.card}<strong>EMI calculator</strong><span>Price, down payment, rate and tenure</span></button>
    <button class="tool-card" data-act="cmppick">${I.eye}<strong>Compare bikes</strong><span>Up to three, side by side</span></button>
    <button class="tool-card" data-act="scrollto" data-t="checkpoints">${I.shield}<strong>Inspection report explorer</strong><span>Tap through every checkpoint</span></button>
    <button class="tool-card" data-act="rc">${I.route}<strong>Track your sale or RC transfer</strong><span>Live status by number plate</span></button>
    <a class="tool-card" href="#sell">${I.home}<strong>Book an inspection</strong><span>Free, at home or our hub</span></a>
    <button class="tool-card" data-act="warranty">${I.doc}<strong>Warranty explainer</strong><span>What the 6-month cover includes</span></button>
   </div>
  </div></section>

  <section class="sec final-sec"><div class="wrap">
   <div class="sec-head rv"><div><span class="eyebrow on-dark">Ready when you are</span><h2>What would you like to do?</h2></div></div>
   <div class="final-grid rv">
    <a class="fin" href="#sell">${I.tag}<strong>Sell my bike</strong><span>Estimate in 60 seconds</span></a>
    <a class="fin" href="#buy" data-act="reset-buy">${I.bike}<strong>Buy a bike</strong><span>${inCity.length} inspected bikes in ${S.city}</span></a>
    <a class="fin" href="#sell">${I.home}<strong>Book an inspection</strong><span>Free, at home or at our hub</span></a>
    <form class="fin fin-form" data-form="callback" novalidate>
     <strong>Talk to our team</strong>
     <label class="sr" for="cbName">Name</label><input class="input" id="cbName" placeholder="Your name" autocomplete="name" value="${esc(S.user?.name || '')}">
     <label class="sr" for="cbMob">Mobile number</label><input class="input" id="cbMob" placeholder="Mobile number" inputmode="numeric" maxlength="10" autocomplete="tel" value="${esc(S.user?.mobile || '')}">
     <label class="sr" for="cbTopic">Topic</label><select class="input" id="cbTopic"><option>Selling my bike</option><option>Buying a bike</option><option>Finance or EMI</option><option>Insurance or warranty</option><option>Something else</option></select>
     <label class="consent"><input type="checkbox" id="cbCons" checked> Call me about this request.</label>
     <span class="err" id="eCb" hidden>Enter your name and a 10-digit mobile number.</span>
     <button class="btn btn-red btn-block" type="submit">Request a callback</button>
     <span class="fine">We use your number only for this request.</span>
    </form>
   </div>
  </div></section>

  <section class="sec"><div class="wrap two">
   <div class="panel about-teaser rv">${sceneImg(MEDIA.blog[2], 'Rider leaning into a mountain curve', 900)}<div><span class="eyebrow">About Speedioo</span><h2 style="font-size:var(--fs-xl)">Making used two-wheelers simple, honest and fast.</h2>
    <p class="muted">We take full responsibility for paperwork and for selling each vehicle to the right buyer, so neither side is left with legal loose ends.</p>
    <a class="link-arrow" href="#team">Meet our team →</a></div></div>
   <div class="panel rv"><span class="eyebrow">FAQ</span>${HELP.slice(0, 4).map(h => `<details class="faq"><summary>${h.t}</summary><p>${h.a}</p></details>`).join('')}</div>
  </div></section>

  <section class="wa-band"><div class="wrap rv">
   <div><h2>Price drops and new arrivals, on WhatsApp</h2><p class="fmuted">One message a week. Stop any time. The Speedioo app is coming soon.</p></div>
   <form data-form="waOpt" novalidate class="wa-form"><label class="sr" for="waMob">Mobile number</label><input id="waMob" class="input" inputmode="numeric" maxlength="10" placeholder="Mobile number"><button class="btn btn-red" type="submit">${ico('wa', 18)} Notify me</button></form>
  </div></section>`;

  setupVideo($('#heroVid'), MEDIA.hero);
  SpeediooJourney.mount($('#journey'));
  SpeediooStory.mount($('#storyAnim'));
  SpeediooCheckpoints.mount($('#cpxHome'), byId(CITY_SAMPLE[S.city]) || inCity[0] || BIKES[0], { sample: true });
  resaleCalc();
  SpeediooCity.animate($('#app'));
  drawHow();
  const box = $('.gauge-box');
  if (box && 'IntersectionObserver' in window && !reduceMotion) {
    let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting, { threshold: .4 }).observe(box);
    every(() => { if (vis && !S.howPinned) { S.howStep = (S.howStep + 1) % 4; drawHow(); } }, 1700);
  }
}

/* ---------- explainers, enquiries, pickers ---------- */
const ENQ = {
  callback: { t: 'Request a callback', d: 'Tell us when to call and we’ll get back to you.' },
  extended_warranty: { t: 'Extended warranty', d: 'Extend your cover beyond the standard six months. We’ll call with the plans available for your bike.' },
  insurance: { t: 'Insurance assistance', d: 'Tell us what you need and we’ll help with the paperwork.', options: ['New policy', 'Renewal', 'Claim help'] }
};
function openEnquiry(kind, bikeId) {
  const e = ENQ[kind], b = bikeId ? byId(bikeId) : null;
  layer(`${mhead(e.t)}<form class="m-body" data-form="enquiry" data-k="${kind}" data-id="${b ? b.id : ''}" novalidate>
   <p class="muted">${e.d}</p>
   ${b ? `<div class="who"><span class="ride-thumb">${photo(b, { sizes: '100px' })}</span><div><strong>${esc(b.name)}</strong><div class="muted tnum">${inr(b.price)} · ${b.year} · ${kmf(b.km)}</div></div></div>` : ''}
   ${e.options ? `<div class="field"><span class="lab">I need help with</span><div class="chips" id="enqOpt">${e.options.map((o, i) => `<button type="button" class="chip ${i ? '' : 'on'}" data-act="enqopt" data-v="${o}">${o}</button>`).join('')}</div></div>` : ''}
   <div class="field"><label for="eqName">Name</label><input class="input" id="eqName" autocomplete="name" value="${esc(S.user?.name || '')}"></div>
   <div class="field"><label for="eqMob">Mobile number</label><input class="input" id="eqMob" inputmode="numeric" maxlength="10" autocomplete="tel" value="${esc(S.user?.mobile || '')}"></div>
   ${kind === 'callback' ? `<div class="field"><label for="eqTime">Best time to call</label><select class="input" id="eqTime"><option>As soon as possible</option><option>Morning (10am–1pm)</option><option>Afternoon (1pm–5pm)</option><option>Evening (5pm–8pm)</option></select></div>` : ''}
   <label class="consent"><input type="checkbox" id="eqCons" checked> I agree to Speedioo contacting me about this request.</label>
   <span class="err" id="eEq" hidden>Enter your name and a 10-digit mobile number.</span>
   <button class="btn btn-red btn-block" type="submit">${kind === 'callback' ? 'Request callback' : 'Send request'}</button>
   <p class="fine">We use your number only for this request.</p></form>`, 'modal narrow', e.t);
}
function openWarranty() {
  track('warranty_view');
  const li = a => a.map(x => `<li><span class="ph">${x}</span></li>`).join('');
  layer(`${mhead('Standard 6-month warranty')}<div class="m-body">
   <p>Every bike bought from Speedioo comes with a 6-month warranty from the date of delivery.</p>
   <div class="wty-grid"><div><h4>What’s covered</h4><ul>${li(['[Engine internals]', '[Gearbox and clutch assembly]', '[Starter motor and wiring harness]'])}</ul></div>
    <div><h4>Not covered</h4><ul>${li(['[Wear parts: tyres, brake pads, chain, clutch plates]', '[Accident damage and modifications]', '[Routine servicing]'])}</ul></div></div>
   <h4>Who it applies to</h4><p><span class="ph">[Bikes bought from Speedioo, serviced as per the owner’s manual]</span></p>
   <h4>How to claim</h4><ol class="track"><li class="done">Call or WhatsApp us with your booking reference</li><li class="done">We check the issue at our hub</li><li>Approved repairs are done at no cost to you</li></ol>
   <div class="two-btn"><button class="btn btn-line" data-act="enquiry" data-k="extended_warranty">Extended warranty</button><button class="btn btn-red" data-act="closeL">Got it</button></div></div>`, 'modal narrow', 'Warranty');
}
function openPricing() {
  layer(`${mhead('How pricing works')}<div class="m-body">
   <div class="price-def"><span class="cp-pill cp-verified">Listed price</span><p>The fixed price of a bike you buy. No haggling, no surprise add-ons.</p></div>
   <div class="price-def"><span class="cp-pill cp-good">Estimated quote</span><p>The range you see when selling, based on your bike’s details. It is a guide, not an offer.</p></div>
   <div class="price-def"><span class="cp-pill cp-attention">Final offer</span><p>The fixed price after our inspection, with every deduction shown. You can accept or decline.</p></div>
   <div class="price-def"><span class="cp-pill cp-none">Other charges</span><p>RC transfer paperwork is handled by us. Insurance follows your chosen policy. <span class="ph">[Any other charges]</span></p></div>
   <button class="btn btn-red btn-block" data-act="closeL">Got it</button></div>`, 'modal narrow', 'How pricing works');
}
function openCmpPicker() {
  const list = BIKES.filter(b => b.city === S.city); S._pick = S.compare.filter(id => list.some(b => b.id === id));
  layer(`${mhead('Compare bikes')}<div class="m-body"><p class="muted">Pick two or three bikes in ${S.city}.</p>
   <div class="pick-list">${list.map(b => `<label class="pick"><input type="checkbox" data-pick="${b.id}" ${S._pick.includes(b.id) ? 'checked' : ''}><span class="thumb">${photo(b, { sizes: '80px' })}</span><span class="t"><strong>${esc(b.name)}</strong><span class="muted">${b.year} · ${kmf(b.km)}</span></span><b>${lakh(b.price)}</b></label>`).join('')}</div>
   <button class="btn btn-red btn-block" id="pickGo" data-act="pickgo" ${S._pick.length < 2 ? 'disabled' : ''}>Compare</button></div>`, 'modal narrow', 'Compare bikes');
}
function toggleQR(force) {
  const pop = $('#qrPop'), fab = $('#qrFab'); if (!pop) return;
  const open = force ?? pop.hidden; pop.hidden = !open; fab.setAttribute('aria-expanded', open);
  if (open) track('qr_open');
}
const HOW = {
  sell: [['Get your price', 'Registration number and km. About 60 seconds.'], ['Free inspection', 'At your doorstep or at our hub, at a slot you choose.'], ['Fixed offer', 'No haggling after the inspection. Accept or walk away.'], ['UPI in 30 minutes', 'E-sign, get paid, and track the RC transfer live.']],
  buy: [['Pick an inspected bike', 'Filter by budget, brand or body type. Every listing has a full report.'], ['Free test ride', 'At your home or our hub, at a slot you choose.'], ['Reserve with a token', 'A refundable <span class="ph-w">[₹token]</span> holds the bike while you decide.'], ['Pay & ride home', 'Cash, UPI or EMI. We handle the RC transfer.']]
};
function gaugeSVG() {
  const cx = 160, cy = 160, r = 124, P = (a, rr = r) => [cx + rr * Math.cos(a * Math.PI / 180), cy + rr * Math.sin(a * Math.PI / 180)].map(v => v.toFixed(1));
  const [sx, sy] = P(135), [ex, ey] = P(45), arc = `M${sx} ${sy} A${r} ${r} 0 1 1 ${ex} ${ey}`;
  let ticks = '';
  for (let i = 0; i <= 40; i++) { const a = 135 + 270 * i / 40, maj = i % 10 === 0; const [x1, y1] = P(a, r - (maj ? 22 : 12)), [x2, y2] = P(a, r - 4); ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${maj ? 'g-maj' : 'g-min'}"/>`; }
  let labs = '';
  for (let i = 1; i <= 4; i++) { const [x, y] = P(135 + 270 * i / 4, r + 18); labs += `<g class="g-stop" data-i="${i - 1}"><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${(+y + 4).toFixed(1)}">${i}</text></g>`; }
  return `<svg viewBox="-10 0 340 300" class="gauge" role="img" aria-label="Progress dial"><path d="${arc}" class="g-track"/><path d="${arc}" class="g-prog" pathLength="100"/>${ticks}${labs}
  <g class="g-needle"><path d="M160 153 L274 160 L160 167 Z"/></g><circle cx="160" cy="160" r="15" class="g-hub"/><circle cx="160" cy="160" r="5" class="g-hub-in"/>
  <text x="160" y="222" class="g-num" id="gNum">1/4</text><text x="160" y="248" class="g-lab" id="gLab"></text></svg>`;
}
function drawHow() {
  const steps = HOW[S.how], i = S.howStep, frac = (i + 1) / 4, box = $('#howSteps'); if (!box) return;
  box.innerHTML = steps.map((s, k) => `<li class="${k === i ? 'on' : ''} ${k < i ? 'done' : ''}"><button data-act="howstep" data-i="${k}" aria-pressed="${k === i}"><span class="n">${k + 1}</span><span><strong>${s[0]}</strong><span>${s[1]}</span></span></button></li>`).join('') +
    `<li class="how-cta">${S.how === 'sell' ? '<a class="btn btn-red" href="#sell">Get my price</a>' : '<a class="btn btn-red" href="#buy" data-act="reset-buy">Browse bikes</a>'}</li>`;
  const svg = $('.gauge'); svg.style.setProperty('--a', (135 + 270 * frac) + 'deg'); svg.style.setProperty('--p', 100 - frac * 100);
  $('#gNum').textContent = `${i + 1}/4`; $('#gLab').textContent = steps[i][0];
  $$('.g-stop').forEach(g => g.classList.toggle('lit', +g.dataset.i <= i));
}
function heroPane() {
  if (S.hero === 'sell') return `<form class="sellbox" data-form="heroSell" novalidate>
   <div class="sellrow"><div class="field"><label for="heroReg">Registration number</label>${plate('heroReg')}</div>
   <div class="field"><label for="heroKm">KM driven</label><select id="heroKm" class="input"><option value="">Select</option><option>&lt;10k</option><option>10–25k</option><option>25–50k</option><option>50k+</option></select></div>
   <button class="btn btn-red" type="submit">Get price →</button></div>
   <p class="hint">We auto-fill brand, model and year from the number. Phone is asked only after you see your price.</p></form>`;
  const o = a => a.map(x => `<option value="${x[1]}">${x[0]}</option>`).join('');
  const brands = [...new Set(BIKES.filter(b => b.city === S.city).map(b => b.brand))].sort();
  return `<form data-form="heroBuy" novalidate><div class="fgrid">
   <div class="fcell"><label for="hb">Budget</label><select id="hb">${o([['Any', ''], ...BUDGETS.map(b => [b[0], b[1] + '-' + b[2]])])}</select></div>
   <div class="fcell"><label for="hbr">Brand</label><select id="hbr"><option value="">Any</option>${brands.map(b => `<option>${b}</option>`).join('')}</select></div>
   <div class="fcell"><label for="ht">Body type</label><select id="ht"><option value="">Any</option>${TYPES.map(b => `<option>${b}</option>`).join('')}</select></div>
   <div class="fcell"><label for="hk">KM driven</label><select id="hk"><option value="">Any</option><option value="5000">Under 5,000 km</option><option value="10000">Under 10,000 km</option><option value="20000">Under 20,000 km</option></select></div>
   <button class="btn btn-red" type="submit" id="heroCount">Show ${countFor(defF())} bikes</button></div></form>
   <div class="qp"><span class="eyebrow">Quick picks</span><div class="chips scroll">
    <button class="chip" data-act="shop" data-k="budget" data-v="0">Under ₹1L</button><button class="chip" data-act="shop" data-k="brand" data-v="Royal Enfield">Royal Enfield</button><button class="chip" data-act="shop" data-k="type" data-v="Scooter">Scooters</button><button class="chip" data-act="shop" data-k="km" data-v="5000">Under 5,000 km</button><button class="chip" data-act="shop" data-k="year" data-v="2024">2024+</button></div></div>`;
}
const countFor = f => filterSync(f).length;
function filterSync(f, city = S.city) {
  return BIKES.filter(b => b.city === city && b.price >= f.minPrice && b.price <= f.maxPrice && (!f.brands.length || f.brands.includes(b.brand)) && (!f.minYear || b.year >= f.minYear) && (!f.maxKm || b.km < f.maxKm) && (!f.types.length || f.types.includes(b.type)) && (!f.owners.length || f.owners.includes(b.owners)));
}
function heroFilter() { const f = defF(), b = $('#hb').value; if (b) { const [a, c] = b.split('-'); f.minPrice = +a; f.maxPrice = +c; } if ($('#hbr').value) f.brands = [$('#hbr').value]; if ($('#ht').value) f.types = [$('#ht').value]; if ($('#hk').value) f.maxKm = +$('#hk').value; return f; }
function plate(id, val = '') { return `<div class="plate"><span class="ind"><i>●</i>IND</span><input id="${id}" value="${esc(val)}" placeholder="MH 12 AB 1234" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="go" maxlength="13" aria-label="Registration number"></div>`; }
function shopTiles() {
  const inCity = BIKES.filter(b => b.city === S.city);
  if (S.shop === 'budget') return `<div class="tiles">${BUDGETS.map((b, i) => `<button class="tile" data-act="shop" data-k="budget" data-v="${i}">${b[0]}<small>${inCity.filter(x => x.price >= b[1] && x.price <= b[2]).length} bikes</small></button>`).join('')}</div>`;
  if (S.shop === 'brand') return `<div class="tiles">${[...new Set(BIKES.map(b => b.brand))].map(br => `<button class="tile" data-act="shop" data-k="brand" data-v="${br}">${br}<small>${inCity.filter(x => x.brand === br).length}</small></button>`).join('')}</div>`;
  return `<div class="types">${TYPES.map(ty => `<button class="type-card" data-act="shop" data-k="type" data-v="${ty}">${sceneImg(MEDIA.types[ty], ty + ' motorcycle', 700)}<span class="tc-lab"><strong>${ty}</strong><small>${inCity.filter(x => x.type === ty).length} in ${S.city}</small></span></button>`).join('')}</div>`;
}
function revCard(r) {
  const ph = r.n.startsWith('[');
  return `<div class="rev" data-kind="${r.k}"><span class="stars" aria-label="5 stars">★★★★★</span><p${ph ? ' class="muted"' : ''}>${ph ? `<span class="ph">${r.txt}</span>` : esc(r.txt)}</p><div class="who"><span class="av">${ph ? '?' : r.n.split(' ').map(x => x[0]).join('')}</span><div><strong>${ph ? `<span class="ph">${r.n}</span>` : r.n}</strong><div><span class="tag ${r.k === 'Sold' ? 'sold' : ''}">${r.k}</span> <span class="muted" style="font-size:var(--fs-xs)">${r.m}</span></div></div></div></div>`;
}

/* ---------- BUY ---------- */
function renderBuy() {
  const brands = [...new Set(BIKES.filter(b => b.city === S.city).map(b => b.brand))].sort(), f = S.f;
  $('#app').innerHTML = `<div class="wrap">
  <div class="crumb"><a href="#home">Home</a> / Used bikes in ${S.city}</div>
  <div class="list-head"><h1>Used bikes in ${S.city} <span id="resCount"></span></h1>
   <label class="sr" for="sortD">Sort</label><select class="selectbox" id="sortD" data-sort>${sortOpts()}</select></div>
  <div class="mbar"><button data-act="fopen" id="fBtn">Filters</button><label class="sr" for="sortM">Sort</label><select id="sortM" data-sort>${sortOpts()}</select></div>
  <div class="active-f" id="activeF"></div>
  <div class="listing">
   <aside class="filters" id="filters" aria-label="Filters">
    <div class="fsheet-head"><strong>Filters</strong><button class="close" data-act="fclose" aria-label="Close filters">${I.x}</button></div>
    <span class="eyebrow fl">Filters</span>
    <div class="fg"><h3>Budget</h3><input type="range" id="fPrice" min="50000" max="500000" step="10000" value="${f.maxPrice}" aria-label="Maximum price"><div class="range-lab"><span>₹50K</span><span id="fPriceV">Up to ${lakh(f.maxPrice)}</span></div></div>
    <div class="fg"><h3>Brand</h3><div class="checks">${brands.map(b => `<label><input type="checkbox" data-fbrand="${b}" ${f.brands.includes(b) ? 'checked' : ''}> ${b} <span class="muted">(${BIKES.filter(x => x.city === S.city && x.brand === b).length})</span></label>`).join('')}</div></div>
    <div class="fg"><h3>Registration year</h3><div class="chips">${[[2025, '2025+'], [2022, '2022+'], [0, 'Any']].map(([v, l]) => `<button class="chip ${f.minYear === v ? 'on' : ''}" data-act="fone" data-k="minYear" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="fg"><h3>KM driven</h3><div class="chips">${[[5000, '<5k'], [10000, '<10k'], [20000, '<20k'], [0, 'Any']].map(([v, l]) => `<button class="chip ${f.maxKm === v ? 'on' : ''}" data-act="fone" data-k="maxKm" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="fg"><h3>Body type</h3><div class="chips">${TYPES.map(v => `<button class="chip ${f.types.includes(v) ? 'on' : ''}" data-act="fmulti" data-k="types" data-v="${v}">${v}</button>`).join('')}</div></div>
    <div class="fg"><h3>Owners</h3><div class="chips">${[1, 2].map(v => `<button class="chip ${f.owners.includes(v) ? 'on' : ''}" data-act="fmulti" data-k="owners" data-v="${v}">${v === 1 ? '1st' : '2nd'}</button>`).join('')}</div></div>
    <div class="fsheet-foot"><button class="btn btn-red btn-block" data-act="fclose" id="fShow">Show bikes</button></div>
   </aside>
   <div style="min-width:0"><div id="results"><div class="grid">${'<div class="card skel"></div>'.repeat(6)}</div></div>
    <div class="note-card"><div><strong>Didn't find your bike?</strong><p class="muted">Tell us what you want and we'll call when it arrives.</p></div><button class="btn btn-black" data-act="request">Request a bike</button></div>
   </div>
  </div></div>`;
  updateResults();
}
const sortOpts = () => [['new', 'Sort: Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['km', 'KM: lowest']].map(([v, l]) => `<option value="${v}" ${S.f.sort === v ? 'selected' : ''}>${l}</option>`).join('');
function activeChips() {
  const f = S.f, c = [];
  if (f.minPrice || f.maxPrice < 500000) c.push(['price', '', f.minPrice ? `${lakh(f.minPrice)} – ${lakh(f.maxPrice)}` : `Up to ${lakh(f.maxPrice)}`]);
  f.brands.forEach(b => c.push(['brands', b, b]));
  if (f.minYear) c.push(['minYear', '', f.minYear + '+']);
  if (f.maxKm) c.push(['maxKm', '', 'Under ' + (f.maxKm / 1000) + 'k km']);
  f.types.forEach(v => c.push(['types', v, v])); f.owners.forEach(v => c.push(['owners', v, own(v)]));
  return c;
}
let resultsReq = 0;
async function updateResults() {
  const my = ++resultsReq, l = await API.listBikes({ ...S.f, city: S.city }); if (my !== resultsReq || !$('#results')) return;
  const ac = activeChips();
  $('#resCount').textContent = '· ' + l.length + ' result' + (l.length === 1 ? '' : 's');
  $('#activeF').innerHTML = ac.map(([k, v, lab]) => `<button class="chip on" data-act="rmf" data-k="${k}" data-v="${v}" aria-label="Remove ${esc(lab)}">${esc(lab)} ${I.x}</button>`).join('') + (ac.length ? '<button class="textbtn" data-act="clearf">Clear all</button>' : '<span class="muted" style="font-size:var(--fs-sm)">No filters applied</span>');
  $('#fBtn').textContent = 'Filters' + (ac.length ? ` (${ac.length})` : '');
  $('#fShow').textContent = `Show ${l.length} bike${l.length === 1 ? '' : 's'}`;
  S.qv.list = l.map(b => b.id);
  $('#results').innerHTML = l.length ? `<div class="grid">${l.map(b => card(b, { compare: 1 })).join('')}</div>` : `<div class="empty"><strong>No bikes match these filters in ${S.city}.</strong><p class="muted">Remove a filter, or tell us what you want.</p><div class="chips"><button class="btn btn-line btn-sm" data-act="clearf">Clear filters</button><button class="btn btn-red btn-sm" data-act="request">Request a bike</button></div></div>`;
  track('view_item_list', { item_list_name: 'buy_' + S.city, items: l.length });
  cmpTray();
}
function cmpTray() {
  let tr = $('#cmpTray');
  if (!S.compare.length) { tr && tr.remove(); return; }
  if (!tr) { tr = document.createElement('div'); tr.id = 'cmpTray'; tr.className = 'cmp-tray'; document.body.appendChild(tr); }
  tr.innerHTML = `<span>${S.compare.length} of 3 selected</span><button class="textbtn on-dark" data-act="cmpclear">Clear</button><button class="btn btn-red btn-sm" data-act="cmpopen" ${S.compare.length < 2 ? 'disabled' : ''}>Compare</button>`;
}

/* ---------- DETAIL ---------- */
function renderDetail(id) {
  const b = byId(id); if (!b) { renderHome(); return; }
  document.body.classList.add('on-detail'); S.gal = 0;
  const fav = S.shortlist.has(b.id);
  const similar = BIKES.filter(x => x.id !== b.id && Math.abs(x.price - b.price) <= 90000).slice(0, 6);
  const insp = [['Engine & gearbox', 'Good'], ['Brakes & suspension', 'Good'], ['Electricals', 'Good'], ['Tyres', Math.round(55 + b.score * 4) + '% left'], ['Body & paint', b.km > 10000 ? 'Minor marks' : 'Clean'], ['Documents', 'Verified']];
  const specs = {
    Engine: [['Engine type', b.engine], ['Displacement', b.cc ? b.cc + ' cc' : '—'], ['Max power', b.bhp + ' bhp'], ['Max torque', b.nm + ' Nm'], ['Gearbox', b.gear], ['Fuel system', b.cc ? 'Fuel injection' : 'Electric'], ['Start', 'Electric'], ['Fuel tank', b.tank ? b.tank + ' L' : '—']],
    Dimensions: [['Kerb weight', '[— kg]'], ['Seat height', '[— mm]'], ['Ground clearance', '[— mm]'], ['Wheelbase', '[— mm]']],
    'Brakes & tyres': [['Braking', b.abs], ['Front brake', 'Disc'], ['Tyre tread', insp[3][1]], ['Tyre type', 'Tubeless']],
    Features: [['Instrument cluster', '[Digital-analog]'], ['Bluetooth', '[—]'], ['Lighting', '[LED / halogen]'], ['USB charging', '[—]']],
    Documents: [['RC', 'Original, verified'], ['Insurance', 'Valid till [—]'], ['PUC', 'Valid till [—]'], ['Hypothecation', 'None'], ['Last service', '[— date]'], ['Registration', b.reg]]
  };
  const emiV = inr(emi(b.price));
  $('#app').innerHTML = `<div class="wrap">
  <div class="crumb"><a href="#buy">← Back to results</a> · ${esc(b.brand)} · ${esc(b.model)}</div>
  <div class="vdp">
  <div style="min-width:0">
   <div class="gal-main" id="galMain" data-act="lightbox" role="button" tabindex="0" aria-label="Open photo viewer">${photo(b, { eager: true, sizes: '(max-width:900px) 100vw, 800px' })}
    <span class="gal-pill l" id="galN">1 / ${VIEWS.length} · ${VIEWS[0].l}</span>
    <button class="gal-pill r" data-act="walk">${ico('play', 12)} Walk-around video</button>
    <button class="gal-nav l" data-act="galstep" data-d="-1" aria-label="Previous photo">${I.left}</button><button class="gal-nav r" data-act="galstep" data-d="1" aria-label="Next photo">${I.right}</button></div>
   <div class="gal-thumbs">${VIEWS.map((v, i) => `<button class="${i ? '' : 'on'}" data-act="gal" data-i="${i}" aria-label="${v.l}">${photo(b, { view: i, sizes: '120px' })}</button>`).join('')}</div>
   <div id="mDecide"></div>
   <nav class="stabs" aria-label="Sections">${[['hl', 'Highlights'], ['desc', 'Description'], ['report', 'Inspection report'], ['specs', 'Full specs'], ['incl', "What's included"], ['own', 'Warranty']].map(([k, l]) => `<button data-act="jump" data-t="${k}">${l}</button>`).join('')}</nav>

   <section class="vsec" id="v-hl"><h2><span class="n">1</span>Key highlights</h2>
    <div class="khl">
     <div>${I.engine}<strong>${b.cc ? b.cc + ' cc' : '2.9 kWh'}</strong><span>${b.cc ? 'Engine' : 'Battery'}</span></div>
     <div>${I.fuel}<strong><span class="ph">[—]</span> ${b.cc ? 'kmpl' : 'km'}</strong><span>${b.cc ? 'Mileage' : 'Range'}</span></div>
     <div>${I.gauge}<strong>${b.bhp} bhp</strong><span>Max power</span></div>
     <div>${I.torque}<strong>${b.nm} Nm</strong><span>Torque</span></div>
     <div>${I.drop}<strong>${b.tank ? b.tank + ' L' : '—'}</strong><span>Fuel tank</span></div>
     <div>${I.odo}<strong>${kmf(b.km)}</strong><span>Driven</span></div>
    </div></section>

   <section class="vsec" id="v-desc"><h2><span class="n">2</span>Description</h2>
    <p>Speedioo's take: ridden in ${b.city} city by its ${own(b.owners).replace(' owner', '')} owner, ${kmf(b.km)} on the clock, registered ${b.reg}. Serviced at <span class="ph">[authorised centre]</span>, colour <span class="ph">[colour]</span>, mods <span class="ph">[none / list]</span>.</p></section>

   <section class="vsec" id="v-report"><h2><span class="n">3</span>Inspection report</h2>
    <div class="insp"><div class="insp-head"><span class="muted" style="font-size:var(--fs-sm)">Checked at our ${HUBS[b.city]} hub by <span class="ph">[inspector]</span></span><span class="score"><span class="score-bar" style="--s:${b.score * 10}%"></span>${b.score}/10</span></div>
     <div class="cpx" id="cpxBike"></div>
     <div class="insp-links"><button data-act="lightbox">See inspection photos</button><button data-act="toast" data-msg="We'll share the full report on WhatsApp">Download full report (PDF)</button><button data-act="chatask" data-q="Explain the inspection report for ${esc(b.name)}">Explain this report in plain words</button></div></div></section>

   <section class="vsec" id="v-specs"><h2><span class="n">4</span>Full specifications</h2>
    <div class="spec"><div class="spec-tabs">${Object.keys(specs).map((k, i) => `<button class="chip ${i ? '' : 'on'}" data-act="spectab" data-k="${i}">${k}</button>`).join('')}</div>
     ${Object.entries(specs).map(([k, rows], i) => `<div class="spec-panel ${i ? '' : 'active open'}" data-sp="${i}"><button class="spec-sum" data-act="specacc" data-k="${i}">${k}<span>${i ? '+' : '−'}</span></button><div class="spec-body">${rows.map(([a, v]) => `<div><span class="muted">${a}</span><b>${/\[/.test(v) ? `<span class="ph">${v}</span>` : esc(v)}</b></div>`).join('')}</div></div>`).join('')}
    </div></section>

   <section class="vsec" id="v-incl"><h2><span class="n">5</span>Included free with this bike</h2>
    <div class="incl"><span class="eyebrow">Worth <span class="ph">₹[—]</span> in total</span>
     <div class="incl-grid">
      <div>${I.helmet}<strong>Helmet</strong><small>[ISI-certified, brand]</small></div>
      <div>${I.wrench}<strong>First service</strong><small>[Free within — days]</small></div>
      <div>${I.doc}<strong>RC transfer</strong><small>Paperwork handled</small></div>
      <div>${I.shield}<strong>[Warranty]</strong><small>[— months, engine]</small></div>
      <div>${I.gift}<strong>[Accessory]</strong><small>[Phone mount / cover / lock]</small></div>
     </div>
     <div class="addons"><span><strong>Add-ons</strong> · Extended warranty · Saddle bags · Crash guard</span><button class="textbtn" style="padding:0" data-act="toast" data-msg="Add-ons are coming soon">View add-ons</button></div>
    </div></section>

   <section class="vsec" id="v-own"><h2><span class="n">6</span>Warranty &amp; insurance</h2>
    <div class="bens bens-3">
     <article class="ben"><span class="ben-i">${I.shield}</span><h3>6-month warranty included</h3><p>Standard cover from the day you take delivery.</p><button class="link-arrow" data-act="warranty">What’s covered →</button></article>
     <article class="ben"><span class="ben-i">${I.gift}</span><h3>Extended warranty</h3><p>Extend your cover for this ${esc(b.model)}.</p><button class="link-arrow" data-act="enquiry" data-k="extended_warranty" data-id="${b.id}">Explore options →</button></article>
     <article class="ben"><span class="ben-i">${I.doc}</span><h3>Insurance assistance</h3><p>New policy or transfer of the existing one.</p><button class="link-arrow" data-act="enquiry" data-k="insurance" data-id="${b.id}">Get insurance help →</button></article>
    </div></section>

   <section class="vsec"><div class="vsec-h"><h2>Similar bikes around ${lakh(b.price)}</h2>${similar.length ? `<button class="btn btn-line btn-sm" data-act="cmpsimilar" data-id="${b.id}">Compare with similar</button>` : ''}</div>
    ${similar.length ? `<div class="rail">${similar.map(x => card(x, { city: 1 })).join('')}</div>` : '<p class="muted">No close matches right now.</p>'}</section>
  </div>
  <aside id="dDecide"></aside>
  </div></div>
  <div class="dbar"><div class="p"><strong>${inr(b.price)}</strong><span class="emi">EMI ${emiV}/mo</span></div><a class="btn btn-line" href="https://wa.me/${CONTACT.wa}?text=${encodeURIComponent('Hi Speedioo, I am interested in the ' + b.name + ' (' + b.year + ', ' + inr(b.price) + ')')}" target="_blank" rel="noopener">WhatsApp</a><button class="btn btn-red" data-act="ride" data-id="${b.id}">Test ride</button></div>`;
  const decide = `<div class="decide"><span class="eyebrow">${esc(b.brand)}</span><h1>${esc(b.model)}</h1>
    <div class="facts"><span>${b.year}</span><span>${kmf(b.km)}</span><span>${own(b.owners)}</span><span>${b.cc ? 'Petrol' : 'Electric'}</span><span>${b.reg}</span></div>
    <strong class="price">${inr(b.price)}</strong>
    <span class="save-line">New on-road ≈ ${inr(b.onRoad)} · <b>You save ${inr(b.onRoad - b.price)}</b></span>
    <div class="emi-box"><span>EMI from <strong>${emiV}</strong>/mo</span><button data-act="emi" data-price="${b.price}">Calculate</button></div>
    <span class="wty-line">${ico('shield', 14)} 6-month warranty included · <button class="textbtn" data-act="warranty">Details</button></span>
    <button class="btn btn-red btn-block" data-act="ride" data-id="${b.id}">Book free test ride</button>
    <button class="btn btn-line btn-block" data-act="enquiry" data-k="callback" data-id="${b.id}">Request a callback</button>
    <div class="two-btn"><a class="btn btn-line" href="tel:${CONTACT.tel}">Call</a><a class="btn btn-line" href="https://wa.me/${CONTACT.wa}?text=${encodeURIComponent('Hi Speedioo, I am interested in the ' + b.name + ' (' + b.year + ')')}" target="_blank" rel="noopener">WhatsApp</a></div>
    <div class="two-btn"><button class="btn btn-line btn-sm" data-act="fav" data-id="${b.id}">${fav ? '♥ Saved' : '♡ Save'}</button><button class="btn btn-line btn-sm" data-act="reserve" data-id="${b.id}">Reserve with token</button></div>
    <a href="#sell" class="link-arrow" style="justify-self:start;font-size:var(--fs-sm)">Have an old bike? Exchange it →</a>
    <p class="fine">Inspected · RC transfer included · ${b.area}, ${b.city}</p></div>`;
  const place = () => { const m = isMobile(); $('#dDecide').innerHTML = m ? '' : decide; $('#mDecide').innerHTML = m ? decide : ''; };
  place(); S._place = place;
  SpeediooCheckpoints.mount($('#cpxBike'), b);
  setLD({ '@context': 'https://schema.org', '@type': 'Motorcycle', name: b.name, brand: { '@type': 'Brand', name: b.brand }, model: b.model, vehicleModelDate: String(b.year), mileageFromOdometer: { '@type': 'QuantitativeValue', value: b.km, unitCode: 'KMT' }, image: PEXELS_IMG(b.photo, 1200), offers: { '@type': 'Offer', price: b.price, priceCurrency: 'INR', availability: 'https://schema.org/InStock', areaServed: b.city } });
  track('view_item', { item_id: b.id, item_name: b.name, price: b.price, currency: 'INR' });
}
function setGal(i) {
  const b = byId(S.detailId); S.gal = (i + VIEWS.length) % VIEWS.length;
  const main = $('#galMain .photo'); if (!main) return;
  main.outerHTML = photo(b, { view: S.gal, eager: true, sizes: '(max-width:900px) 100vw, 800px' });
  $('#galN').textContent = `${S.gal + 1} / ${VIEWS.length} · ${VIEWS[S.gal].l}`;
  $$('.gal-thumbs button').forEach((x, k) => x.classList.toggle('on', k === S.gal));
}

/* ---------- SELL ---------- */
function renderSell() {
  $('#app').innerHTML = `<section class="sell-top"><div class="sell-bg" aria-hidden="true">${sceneImg(MEDIA.sellHero, '', 1600)}</div><div class="wrap">
   <div class="sell-hero">
    <div class="sell-copy">${S.fromQR ? `<div class="qr-hello">${ico('bolt', 16)} Welcome from our QR code. Your estimate is one step away.</div>` : ''}<span class="eyebrow on-dark">Sell your bike or scooter</span><h1>Sell your bike from home. Paid by UPI in 30 minutes.</h1>
     <ul class="ticks"><li>Free doorstep inspection in ${S.city}</li><li>RC transfer &amp; paperwork handled</li><li>No haggling. Price fixed after inspection</li></ul>
     <div class="chips" style="margin-top:20px"><a class="btn btn-ghost-w btn-sm" href="tel:${CONTACT.tel}">${ico('phone', 16)} Call 88532 32885</a><button class="btn btn-ghost-w btn-sm" data-act="chatask" data-q="I want to sell my bike">${ico('chat', 16)} Ask the assistant</button></div></div>
    <div class="qform" id="qform" aria-live="polite"></div>
   </div></div></section>
   <div class="wrap">
   <section class="sec"><div class="sec-head rv"><div><span class="eyebrow">Watch it happen</span><h2>A 28-minute sale, in 20 seconds</h2></div></div><div id="storyAnim" class="rv"></div></section>
   <section class="sec" style="padding-top:0"><div class="sec-head rv"><div><span class="eyebrow">How selling works</span><h2>From a QR scan to SOLD</h2></div></div><div id="journey" class="rv jr-light"></div></section>
   <section class="sec two" style="padding-top:0">
    <div class="panel rv"><span class="eyebrow">Documents checklist</span><ul class="doclist" id="docList">${['RC (original)', 'Valid insurance', 'PUC', 'Aadhaar / PAN', 'NOC if a loan was taken'].map((d, i) => `<li><label><input type="checkbox" data-doc="${i}" ${DB.get('docs', [])[i] ? 'checked' : ''}> ${d}</label></li>`).join('')}</ul><span class="hint">Tick what you have ready. We'll remind you about the rest.</span></div>
    <div class="panel rv"><span class="eyebrow">Seller FAQ &amp; guides</span>${HELP.slice(1, 4).map(h => `<details class="faq"><summary>${h.t}</summary><p>${h.a}</p></details>`).join('')}
     <div class="chips"><a class="chip" href="#blog">MT-15 guide</a><a class="chip" href="#blog">Apache RTR guide</a><a class="chip" href="#blog">Top 10 seller questions</a></div></div>
   </section></div>`;
  if (S.sell.step === 4 && !S.sell.est) S.sell.step = 3;
  renderQ();
  window.SpeediooStory && SpeediooStory.mount($('#storyAnim'));
  SpeediooJourney.mount($('#journey'), { start: 4 });
}
function renderQ() {
  const s = S.sell, el = $('#qform'); if (!el) return;
  const { photos, ...draft } = s; DB.set('sellDraft', draft);
  const prog = `<div class="prog" aria-label="Step ${Math.min(s.step, 3)} of 3">${[1, 2, 3].map(i => `<i class="${i <= Math.min(s.step, 3) ? 'on' : ''}"></i>`).join('')}</div>`;
  const kms = ['<10k', '10–25k', '25–50k', '50k+'];
  const brands = [...new Set(BIKES.map(b => b.brand)), 'Hero', 'Suzuki', 'KTM', 'Other'];
  if (s.step === 1) el.innerHTML = `${prog}<strong>Step 1 of 3 · Your bike</strong>
   ${s.noReg ? `<div class="two-sel"><div class="field"><label for="sBrand">Brand</label><select class="input" id="sBrand"><option value="">Select</option>${brands.map(b => `<option ${s.brand === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
     <div class="field"><label for="sYear">Year</label><select class="input" id="sYear"><option value="">Select</option>${[...Array(15)].map((_, i) => 2026 - i).map(y => `<option ${+s.year === y ? 'selected' : ''}>${y}</option>`).join('')}</select></div></div>
     <div class="field"><label for="sModel">Model</label><input class="input" id="sModel" value="${esc(s.model)}" placeholder="e.g. Classic 350"></div>
     <span class="hint"><button data-act="noreg">Use registration number instead</button></span>`
    : `<div class="field"><label for="sReg">Registration number</label>${plate('sReg', s.reg)}<span class="hint">We auto-fill brand, model and year from this. <button data-act="noreg">Don't have it?</button></span></div>`}
   <span class="err" id="eReg" hidden></span>
   <div class="field"><span class="lab">KM driven</span><div class="chips">${kms.map(k => `<button class="chip ${s.km === k ? 'on' : ''}" data-act="sv" data-k="km" data-v="${k}">${k}</button>`).join('')}</div><span class="err" id="eKm" hidden>Pick a range.</span></div>
   <button class="btn btn-black btn-block" data-act="s1">Continue →</button>`;
  else if (s.step === 2) el.innerHTML = `${prog}<strong>Step 2 of 3 · Condition</strong><p class="hint">${esc(s.noReg ? [s.brand, s.model, s.year].join(' ') : s.reg)} · ${s.km} km</p>
   ${qRow('Owners', 'owners', ['1st', '2nd', '3rd+'], s.owners)}
   ${qRow('Does it start easily?', 'start', ['Yes', 'Sometimes', 'No'], s.cond.start)}
   ${qRow('Any accident damage?', 'acc', ['None', 'Minor', 'Major'], s.cond.acc)}
   ${qRow('Tyres', 'tyre', ['Good', 'Need change'], s.cond.tyre)}
   <div class="field"><span class="lab">Photos (optional)</span><label class="upload" for="sPh">${I.camera}<span><strong>Add photos</strong><span class="hint">Front, side, odometer. Speeds up the final offer.</span></span></label><input type="file" id="sPh" accept="image/*" multiple class="sr">
    <div class="thumbs" id="sThumbs">${s.photos.map((p, i) => `<span class="th"><img src="${p}" alt="Photo ${i + 1}"><button data-act="rmphoto" data-i="${i}" aria-label="Remove photo ${i + 1}">${I.x}</button></span>`).join('')}</div></div>
   <span class="err" id="e2" hidden>Answer all four questions.</span>
   <div class="two-btn"><button class="btn btn-line" data-act="sback">Back</button><button class="btn btn-black" data-act="s2">Continue →</button></div>`;
  else if (s.step === 3) el.innerHTML = `${prog}<strong>Step 3 of 3 · See your price</strong>
   <div class="field"><label for="sName">Name</label><input class="input" id="sName" value="${esc(s.name || S.user?.name || '')}" autocomplete="name"></div>
   <div class="field"><label for="sMob">Mobile number</label><input class="input" id="sMob" value="${esc(s.mobile || S.user?.mobile || '')}" inputmode="numeric" maxlength="10" placeholder="98XXX XXXXX" autocomplete="tel"></div>
   ${s.otp ? `<div class="field"><label for="sOtp">OTP sent to +91 ${esc(s.mobile)}</label><input class="input otp" id="sOtp" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="one-time-code"><span class="hint"><button data-act="resend">Resend</button></span></div>` : ''}
   <label class="consent"><input type="checkbox" id="sCons" checked> I agree to Speedioo contacting me about this sale on call, SMS or WhatsApp. Privacy policy applies.</label>
   <span class="err" id="e3" hidden></span>
   <div class="two-btn"><button class="btn btn-line" data-act="sback">Back</button><button class="btn btn-red" data-act="s3" id="s3Btn">${s.otp ? 'Verify & see price' : 'Send OTP'}</button></div>
   <span class="saved">Progress is saved on this device. Come back any time.</span>`;
  else if (s.step === 4) {
    if (!s.est) { el.innerHTML = `<strong>Working out your price…</strong><div class="est est-load"><span class="shimmer"></span><span class="fine">Checking model, year, km and condition</span></div>`; return; }
    const days = nextDays();
    el.innerHTML = `<strong>Hi ${esc(s.name.split(' ')[0])}, here's your estimate</strong>
   <div class="est"><span class="eyebrow on-dark">${esc(s.noReg ? s.brand + ' ' + s.model : s.reg)} · ${s.km} km · ${s.owners} owner</span><strong><span id="estLo">${inr(s.est.lo)}</span> – <span id="estHi">${inr(s.est.hi)}</span></strong><span class="fine">Final price is fixed after the free inspection.</span></div>
   <strong>Book your free inspection</strong>
   <div class="seg"><button class="${s.where === 'Home' ? 'on' : ''}" data-act="sv" data-k="where" data-v="Home">At my home</button><button class="${s.where === 'Hub' ? 'on' : ''}" data-act="sv" data-k="where" data-v="Hub">At ${HUBS[S.city]} hub</button></div>
   <div class="field"><span class="lab">Date</span><div class="chips">${days.map(d => `<button class="chip ${s.date === d ? 'on' : ''}" data-act="sv" data-k="date" data-v="${d}">${d}</button>`).join('')}</div></div>
   <div class="field"><span class="lab">Time</span><div class="slots">${['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'].map(x => `<button class="chip ${s.slot === x ? 'on' : ''}" data-act="sv" data-k="slot" data-v="${x}">${x}</button>`).join('')}</div></div>
   <span class="err" id="e4" hidden>Pick a date and a time.</span>
   <button class="btn btn-red btn-block" data-act="s4" id="s4Btn">Book free inspection</button>`;
  } else el.innerHTML = `<div class="ok-box"><span class="big">✓</span><strong style="font-size:var(--fs-lg)">Inspection booked</strong><p class="muted">${s.date}, ${s.slot} · ${s.where === 'Home' ? 'at your address' : 'at our ' + HUBS[S.city] + ' hub'}. Reference <b>${esc(s.bookingId || '')}</b>. Details sent to +91 ${esc(s.mobile)} on WhatsApp.</p></div>
   <ol class="track"><li class="done">Price estimate<span>Done</span></li><li class="done">Inspection booked<span>${s.date}, ${s.slot}</span></li><li>Inspector visit<span>Reschedule any time on WhatsApp</span></li><li>Final offer &amp; e-sign<span>Fixed price, no haggling</span></li><li>UPI payment<span>Within 30 minutes</span></li><li>RC transfer tracking<span>Live status in My Account</span></li></ol>
   <div class="panel" style="background:var(--surface)"><strong>Refer a friend who's selling</strong><span class="muted" style="font-size:var(--fs-sm)">You both get <span class="ph">[₹— reward]</span> after their sale.</span><div class="copyline"><span>speedioo.com/r/${esc((s.name || 'rider').split(' ')[0].toLowerCase())}${s.mobile.slice(-3)}</span><button data-act="copy" data-v="https://speedioo.com/r/${esc((s.name || 'rider').split(' ')[0].toLowerCase())}${s.mobile.slice(-3)}">Copy</button></div></div>
   <button class="btn btn-line" data-act="snew">Sell another bike</button>`;
}
const qRow = (l, k, opts, v) => `<div class="field"><span class="lab">${l}</span><div class="chips">${opts.map(o => `<button class="chip ${v === o ? 'on' : ''}" data-act="sv" data-k="${k}" data-v="${o}">${o}</button>`).join('')}</div></div>`;
const regOk = r => /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{0,3}\s?\d{1,4}$/.test(String(r).toUpperCase().trim());
function normReg(r) { const c = r.toUpperCase().replace(/[^A-Z0-9]/g, ''); const m = c.match(/^([A-Z]{2})(\d{1,2})([A-Z]{0,3})(\d{1,4})$/); return m ? [m[1], m[2], m[3], m[4]].filter(Boolean).join(' ') : r.toUpperCase(); }
function readSell1() { const s = S.sell; if (s.noReg) { s.brand = $('#sBrand')?.value || s.brand; s.year = $('#sYear')?.value || s.year; s.model = $('#sModel')?.value || s.model; } else s.reg = $('#sReg')?.value ?? s.reg; }

/* ---------- ABOUT ---------- */
function renderAbout() {
  $('#app').innerHTML = `<div class="subnav"><div class="wrap">${[['story', 'Our story'], ['reviews', 'Reviews'], ['team', 'Our team'], ['contact', 'Contact us']].map(([k, l]) => `<button data-act="ajump" data-t="${k}">${l}</button>`).join('')}</div></div>
  <div class="wrap">
  <section class="sec vsec" id="story"><div class="about-hero">
   <div class="rv"><span class="eyebrow">Company</span><h1 style="margin-top:8px">Making used two-wheelers simple, honest and fast.</h1>
    <p class="muted" style="margin-top:14px;max-width:60ch">The used two-wheeler market runs on guesswork and paperwork headaches. We inspect every vehicle, fix the price up front, and take full responsibility for the RC transfer, so buyers and sellers are free of legal loose ends.</p>
    <div class="stats-sm"><div><strong class="ph">[n]+</strong><span>Bikes sold</span></div><div><strong class="ph">[n]+</strong><span>Happy sellers</span></div><div><strong>★ <span class="ph">[4.x]</span></strong><span>Google rating</span></div></div></div>
   <div class="photo-ph rv">${sceneImg(MEDIA.blog[1], 'Rider on a forest road', 1200)}</div></div></section>

  <section class="sec vsec" id="reviews" style="padding-top:0"><div class="sec-head"><h2>What riders say</h2><div class="chips" id="revF">${['All', 'Buyers', 'Sellers', 'Videos'].map((k, i) => `<button class="chip ${i ? '' : 'on'}" data-act="revf" data-v="${k}">${k}</button>`).join('')}</div></div>
   <div class="rating-bar"><strong>★ <span class="ph">[4.x]</span></strong><span class="muted">from <span class="ph">[N]</span> Google reviews</span><a href="https://www.google.com/maps/search/Speedioo+Baner+Pune" target="_blank" rel="noopener" class="link-arrow" style="margin-left:auto">Write a review on Google</a></div>
   <div class="revs" id="revList">${REVIEWS.map(revCard).join('')}
    <div class="rev" data-kind="Video"><div class="video" role="button" tabindex="0" data-act="playmodal" data-v="story"><img src="${MEDIA.story.poster}" alt="" loading="lazy" onerror="this.remove()"><span>${I.play}</span></div><strong>Video: <span class="ph">[Customer]</span> sells Pulsar in 30 min</strong></div></div></section>

  <section class="sec vsec" id="team" style="padding-top:0"><div class="sec-head"><h2>The people behind Speedioo</h2></div>
   <div class="team">${['Founder & CEO', 'Head of Inspections', 'Sales Advisor', 'Customer Care'].map(r => `<div class="person rv"><div class="pp">${ico('user', 48)}</div><div class="b"><strong class="ph" style="justify-self:start">[Name]</strong><small>${r}</small><small>[1-line bio: years with bikes]</small><a href="https://www.linkedin.com/" target="_blank" rel="noopener" style="font-size:var(--fs-xs)">LinkedIn</a></div></div>`).join('')}</div></section>

  <section class="sec vsec" id="contact" style="padding-top:0"><div class="contact">
   <form class="qform" data-form="contact" novalidate id="cForm"><span class="eyebrow">Contact us</span><h2 style="font-size:var(--fs-xl)">Send us your enquiry</h2>
    <div class="chips" role="radiogroup" aria-label="I want to">${['I want to buy', 'I want to sell', 'Other'].map((k, i) => `<button type="button" class="chip ${i ? '' : 'on'}" data-act="intent" data-v="${k}" role="radio" aria-checked="${!i}">${k}</button>`).join('')}</div>
    <div class="field"><label for="cName">Name *</label><input class="input" id="cName" placeholder="Full name" autocomplete="name" value="${esc(S.user?.name || '')}"></div>
    <div class="field"><label for="cMob">Mobile number *</label><input class="input" id="cMob" placeholder="98XXX XXXXX" inputmode="numeric" maxlength="10" autocomplete="tel" value="${esc(S.user?.mobile || '')}"></div>
    <div class="field"><label for="cMsg">Description *</label><textarea class="input" id="cMsg" placeholder="Tell us which bike, budget, or your question…"></textarea></div>
    <label class="consent"><input type="checkbox" id="cWa" checked> Reply on WhatsApp too</label>
    <label class="consent"><input type="checkbox" id="cCons" checked> I agree to Speedioo contacting me about this enquiry.</label>
    <span class="err" id="eC" hidden>Fill in name, a 10-digit mobile number and a short description.</span>
    <button class="btn btn-black btn-block" type="submit">Send enquiry</button></form>
   <div style="display:grid;gap:10px">
    <div class="panel"><strong>Visit us</strong><p>${CONTACT.address}</p><span class="fine">Open <span class="ph">[Mon–Sun, 10am–8pm]</span></span></div>
    <a class="map" href="https://www.google.com/maps/search/Icon+Tower+Baner+Road+Pune" target="_blank" rel="noopener">${ico('route', 22)} Get directions on Google Maps ↗</a>
    <div class="two-btn"><a class="btn btn-line" href="tel:${CONTACT.tel}">Call 88532 32885</a><a class="btn btn-line" href="https://wa.me/${CONTACT.wa}" target="_blank" rel="noopener">WhatsApp us</a></div>
    <div class="copyline"><span>${CONTACT.email}</span><button data-act="copy" data-v="${CONTACT.email}">Copy</button></div>
   </div></div></section>
  </div>`;
}

/* ---------- BLOG ---------- */
function renderBlog(cat = 'All') {
  $('#app').innerHTML = `<div class="wrap"><div class="crumb"><a href="#home">Home</a> / Blog</div>
  <div class="list-head"><h1>Riding guides &amp; selling tips</h1></div>
  <div class="chips" style="margin-bottom:18px">${['All', 'Buying', 'Selling', 'Ownership'].map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-act="blogcat" data-v="${c}">${c}</button>`).join('')}</div>
  <div class="posts">${GUIDES.map((g, i) => g.c === cat || cat === 'All' ? `<button class="post rv" data-act="post" data-i="${i}"><div class="cover">${sceneImg(MEDIA.blog[i % MEDIA.blog.length], '', 800)}<span>${g.c}</span></div><div class="b"><span class="eyebrow">${g.c} · ${g.m} min read</span><strong>${g.t}</strong></div></button>` : '').join('')}</div></div>`;
}

/* ---------- LEAD INBOX (team demo) ---------- */
function renderLeads() {
  const leads = API.myLeads(), sells = API.mySells(), rides = API.myRides();
  const row = (cells) => `<tr>${cells.map(c => `<td>${esc(c ?? '')}</td>`).join('')}</tr>`;
  $('#app').innerHTML = `<div class="wrap"><div class="crumb"><a href="#home">Home</a> / Lead inbox</div>
  <div class="list-head"><h1>Lead inbox <span>· demo</span></h1><div class="chips"><button class="btn btn-line btn-sm" data-act="csv">Export CSV</button><button class="btn btn-line btn-sm" data-act="cleardemo">Clear demo data</button></div></div>
  <p class="muted" style="max-width:70ch">Everything captured by the site's forms in <b>this browser</b>. Once the API is connected, these go to ERPNext as Leads, Inspection Bookings and Test Rides instead.</p>
  <div class="kpis"><div><strong>${leads.length}</strong><span>Leads</span></div><div><strong>${sells.length}</strong><span>Inspections booked</span></div><div><strong>${rides.length}</strong><span>Test rides</span></div><div><strong>${S.shortlist.size}</strong><span>Shortlisted bikes</span></div></div>
  <h2 class="tbl-h">Leads</h2><div class="scroll-x"><table class="cmp-table"><thead><tr><th>ID</th><th>Type</th><th>Name</th><th>Mobile</th><th>City</th><th>Detail</th><th>Created</th></tr></thead><tbody>${leads.map(l => row([l.id, l.type, l.name, l.mobile, l.city, l.detail, new Date(l.created).toLocaleString('en-IN')])).join('') || '<tr><td colspan="7" class="muted">No leads yet. Try the sell form, contact form or "Request a bike".</td></tr>'}</tbody></table></div>
  <h2 class="tbl-h">Inspections</h2><div class="scroll-x"><table class="cmp-table"><thead><tr><th>ID</th><th>Vehicle</th><th>Name</th><th>Mobile</th><th>Where</th><th>Slot</th><th>Estimate</th></tr></thead><tbody>${sells.map(r => row([r.id, r.vehicle, r.name, r.mobile, r.where, r.date + ' ' + r.slot, r.estimate])).join('') || '<tr><td colspan="7" class="muted">None yet.</td></tr>'}</tbody></table></div>
  <h2 class="tbl-h">Test rides</h2><div class="scroll-x" style="margin-bottom:48px"><table class="cmp-table"><thead><tr><th>ID</th><th>Bike</th><th>Name</th><th>Mobile</th><th>Where</th><th>Slot</th></tr></thead><tbody>${rides.map(r => row([r.id, byId(r.bikeId)?.name, r.name, r.mobile, r.where, r.date + ' ' + r.slot])).join('') || '<tr><td colspan="6" class="muted">None yet.</td></tr>'}</tbody></table></div></div>`;
}
function exportCSV() {
  const leads = API.myLeads(); if (!leads.length) { toast('No leads to export yet'); return; }
  const cols = ['id', 'type', 'name', 'mobile', 'city', 'detail', 'created'];
  const csv = [cols.join(','), ...leads.map(l => cols.map(c => `"${String(l[c] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'speedioo-leads.csv'; document.body.appendChild(a); a.click(); a.remove();
}

/* ---------- overlays ---------- */
function layer(html, cls = 'modal narrow', label = 'Dialog') {
  S._lastFocus = document.activeElement;
  $('#layer').innerHTML = `<div class="scrim" data-act="closeL"></div><div class="sheet ${cls}" role="dialog" aria-modal="true" aria-label="${label}">${html}</div>`;
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const f = $('#layer .sheet input:not([type=checkbox]), #layer .sheet button:not(.close)'); f && f.focus(); }, 40);
}
function closeL() { $$('#layer video').forEach(v => v.pause()); $('#layer').innerHTML = ''; document.body.style.overflow = ''; $('#filters')?.classList.remove('open'); S._lastFocus?.focus?.(); }
const mhead = t => `<div class="m-head"><h2>${t}</h2><button class="close" data-act="closeL" aria-label="Close">${I.x}</button></div>`;
const okBox = (title, msg, extra = '') => `<div class="ok-box"><span class="big">✓</span><strong style="font-size:var(--fs-lg)">${title}</strong><p class="muted">${msg}</p>${extra}</div>`;

function openDrawer() {
  layer(`<div class="drawer-top"><a href="#home" class="logo" aria-label="Speedioo home">${LOGO}</a><button class="icon-btn dark close" data-act="closeL" aria-label="Close menu">${I.x}</button></div>
   <button class="login-card" data-act="account"><span class="av">${S.user ? esc(S.user.name[0]) : ico('user', 22)}</span><span style="flex:1">${S.user ? `<strong>Hi, ${esc(S.user.name)}</strong><small>My account</small>` : '<strong style="font-size:20px">Log in / Sign up</strong><small>Mobile OTP · 10 seconds</small>'}</span>›</button>
   <nav class="dnav"><a href="#buy" data-act="reset-buy">${I.bike}${t('buy')} now</a><a href="#sell">${I.tag}${t('sell')} now</a><a href="#about">${I.user}${t('about')}</a><a href="#contact">${I.phone}Contact us</a><a href="#blog">${I.guide}${t('blog')}</a><a class="small" href="#" data-act="shortlist">${I.heart}My shortlist · My test rides</a></nav>
   <div class="drow"><span class="eyebrow">Language</span><div class="chips">${[['en', 'EN'], ['hi', 'हिंदी'], ['mr', 'मराठी']].map(([k, l]) => `<button class="chip ${S.lang === k ? 'on' : ''}" data-act="lang" data-v="${k}">${l}</button>`).join('')}</div></div>
   <div class="drow"><span class="eyebrow">City</span><div class="chips">${CITIES.map(c => `<button class="chip ${S.city === c ? 'on' : ''}" data-act="setcity" data-v="${c}">${c}</button>`).join('')}</div></div>
   <div class="drawer-cta"><a class="btn btn-line" href="tel:${CONTACT.tel}">Call</a><a class="btn btn-black" href="https://wa.me/${CONTACT.wa}" target="_blank" rel="noopener">WhatsApp</a></div>`, 'drawer', 'Menu');
}

function openQV(id, list) {
  S.qv.list = list && list.length ? list : BIKES.filter(b => b.city === S.city).map(b => b.id); S.qv.i = Math.max(0, S.qv.list.indexOf(+id)); S.qv.ph = 0;
  layer('<div id="qvIn"></div>', 'modal', 'Quick view'); drawQV();
}
function drawQV() {
  const b = byId(S.qv.list[S.qv.i]), n = S.qv.list.length, fav = S.shortlist.has(b.id);
  track('select_item', { item_id: b.id, method: 'quick_view' });
  $('#qvIn').innerHTML = `<div class="m-head"><span class="eyebrow">Quick view · ${S.qv.i + 1} of ${n}</span><button class="close" data-act="closeL" aria-label="Close">${I.x}</button></div>
  <div class="qv-grid"><div class="qv-photo">${photo(b, { view: S.qv.ph, eager: true, sizes: '(max-width:760px) 100vw, 520px' })}
    <button class="nav-arrow l" data-act="qvph" data-d="-1" aria-label="Previous photo">${I.left}</button><button class="nav-arrow r" data-act="qvph" data-d="1" aria-label="Next photo">${I.right}</button>
    <div class="dots">${VIEWS.map((_, i) => `<i class="${i === S.qv.ph ? 'on' : ''}"></i>`).join('')}</div></div>
   <div style="display:grid;gap:12px;align-content:start"><span class="eyebrow">${esc(b.brand)}</span><h2 style="font-size:var(--fs-xl);margin-top:-8px">${esc(b.model)}</h2>
    <div class="facts"><span>${b.year}</span><span>${kmf(b.km)}</span><span>${own(b.owners)}</span><span>${b.reg}</span></div>
    <div><strong class="price" style="font-size:30px">${inr(b.price)}</strong><div class="emi">EMI from ${inr(emi(b.price))}/mo</div><div class="save-line">New on-road ≈ ${inr(b.onRoad)} · <b>You save ${inr(b.onRoad - b.price)}</b></div></div>
    <div class="hl"><div>${I.engine}<strong>${b.cc ? b.cc + ' cc' : '2.9 kWh'}</strong><span>${b.cc ? 'Engine' : 'Battery'}</span></div><div>${I.fuel}<strong><span class="ph">[—]</span></strong><span>${b.cc ? 'Mileage' : 'Range'}</span></div><div>${I.gauge}<strong>${b.bhp} bhp</strong><span>Power</span></div></div>
    <a class="btn btn-black btn-block" href="#bike-${b.id}">View full details &amp; report →</a>
    <div class="act3"><a class="btn btn-line btn-sm" href="tel:${CONTACT.tel}">Call</a><a class="btn btn-line btn-sm" href="https://wa.me/${CONTACT.wa}?text=${encodeURIComponent('Hi Speedioo, I am interested in the ' + b.name)}" target="_blank" rel="noopener">WhatsApp</a><button class="btn btn-line btn-sm" data-act="fav" data-id="${b.id}">${fav ? '♥ Saved' : '♡ Save'}</button></div>
   </div></div>
  <div class="qv-foot"><button data-act="qvnav" data-d="-1" ${S.qv.i ? '' : 'disabled'}>‹ Previous bike</button><span class="eyebrow">Swipe for next</span><button data-act="qvnav" data-d="1" ${S.qv.i < n - 1 ? '' : 'disabled'}>Next bike ›</button></div>`;
}

function openLightbox() {
  const b = byId(S.detailId); if (!b) return;
  layer(`<div class="lb"><div class="lb-top"><span id="lbN">${S.gal + 1} / ${VIEWS.length} · ${VIEWS[S.gal].l}</span><button class="close lb-close" data-act="closeL" aria-label="Close">${I.x}</button></div>
   <div class="lb-img" id="lbImg">${photo(b, { view: S.gal, eager: true, sizes: '100vw' })}</div>
   <button class="lb-nav l" data-act="lbstep" data-d="-1" aria-label="Previous photo">${I.left}</button><button class="lb-nav r" data-act="lbstep" data-d="1" aria-label="Next photo">${I.right}</button>
   </div>`, 'lightbox', 'Photo viewer');
}
function lbStep(d) { const b = byId(S.detailId); setGal(S.gal + d); $('#lbImg').innerHTML = photo(b, { view: S.gal, eager: true, sizes: '100vw' }); $('#lbN').textContent = `${S.gal + 1} / ${VIEWS.length} · ${VIEWS[S.gal].l}`; }

function openVideo(key, title) {
  const m = MEDIA[key];
  layer(`${mhead(title)}<div class="m-body"><video controls playsinline autoplay poster="${m.poster}" class="modal-vid">${m.sources.map(s => `<source src="${s}" type="video/mp4">`).join('')}Your browser can't play this video.</video></div>`, 'modal', title);
}

function openSearch(q = '') {
  S._lastFocus = document.activeElement;
  $('#layer').innerHTML = `<div class="search" role="dialog" aria-modal="true" aria-label="Search"><div class="search-in">
   <div class="sbar"><button class="close" data-act="closeL" aria-label="Close search">${I.back}</button><div class="sbox"><input id="sq" value="${esc(q)}" placeholder="Try “activa under 70k” or “enfeild”" autocomplete="off" aria-label="Search"><button data-act="sclear" aria-label="Clear">${I.x}</button><button data-act="mic" aria-label="Voice search">${I.mic}</button></div></div>
   <div id="sres"></div></div></div>`;
  document.body.style.overflow = 'hidden'; $('#sq').focus(); drawSearch();
}
function lev(a, b) { if (Math.abs(a.length - b.length) > 2) return 9; const d = [...Array(b.length + 1).keys()]; for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const tt = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = tt; } } return d[b.length]; }
function parseQ(q) {
  q = q.toLowerCase(); let max = 0;
  const m = q.match(/(?:under|below|upto|up to|within|<)\s*₹?\s*([\d.]+)\s*(lakh|lac|thousand|k|l)?/);
  const m2 = m || q.match(/([\d.]+)\s*(lakh|lac|k|l)(?![a-z])/);
  if (m2) { let v = parseFloat(m2[1]); const u = m2[2] || ''; if (/^l/.test(u)) v *= 100000; else if (u === 'k' || u === 'thousand') v *= 1000; else if (v < 100) v *= 100000; max = v; q = q.replace(m2[0], ' '); }
  const city = CITIES.find(c => q.includes(c.toLowerCase())) || null;
  const type = /electric|\bev\b|ather/.test(q) ? 'EV' : TYPES.find(ty => q.includes(ty.toLowerCase()) || (ty === 'Scooter' && /scooty|scooter/.test(q))) || null;
  const toks = q.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && !/^\d/.test(w) && !['in', 'a', 'the', 'bike', 'bikes', 'used', 'for', 'me', 'reliable', 'good', 'cheap', 'show', 'pune', 'mumbai', 'bangalore', 'commuter', 'cruiser', 'sports', 'scooter', 'scooters', 'ev', 'electric', 'lakh', 'k', 'buy', 'want', 'i', 'to', 'second', 'hand', 'best'].includes(w));
  return { max, city, type, toks };
}
function matchBike(b, toks) { const words = (b.name + ' ' + b.type).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/); return toks.every(tk => words.some(w => w.startsWith(tk) || (tk.length >= 4 && lev(tk, w.slice(0, tk.length + 1)) <= 2) || (tk.length >= 4 && lev(tk, w) <= 2))); }
function drawSearch() {
  const raw = $('#sq').value.trim(), box = $('#sres');
  if (!raw) { box.innerHTML = `<div class="sgroup"><span class="eyebrow">Recent &amp; trending</span><div class="chips">${['Activa under 70k', 'Pulsar 150', 'Sell my scooter', 'Royal Enfield under 2 lakh', 'Electric scooter Bangalore'].map(x => `<button class="chip" data-act="sfill" data-v="${x}">${/sell/i.test(x) ? '↗' : '↺'} ${x}</button>`).join('')}</div></div>`; return; }
  let h = '';
  if (/^sell/i.test(raw)) h += `<div class="sgroup"><span class="eyebrow">Selling</span><button class="srow" data-act="go" data-v="sell"><span class="gi">${I.tag}</span><span class="t"><strong>Get your selling price</strong><span class="muted">Registration number + km, about 60 seconds</span></span></button></div>`;
  const p = parseQ(raw);
  const bikes = BIKES.filter(b => (!p.max || b.price <= p.max) && (!p.type || b.type === p.type) && (!p.city || b.city === p.city) && (!p.toks.length || matchBike(b, p.toks))).sort((a, b) => (a.city === S.city ? 0 : 1) - (b.city === S.city ? 0 : 1));
  const rx = new RegExp('(' + (p.toks.filter(x => x.length > 1).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '')).join('|') || '\\b\\B') + ')', 'ig');
  const hl = s => p.toks.length ? esc(s).replace(rx, '<mark>$1</mark>') : esc(s);
  const brands = [...new Set(bikes.map(b => b.brand))];
  const guides = p.toks.length ? GUIDES.filter(g => p.toks.some(tk => g.t.toLowerCase().includes(tk) || g.t.toLowerCase().split(/\W+/).some(w => tk.length >= 4 && lev(tk, w) <= 2))) : [];
  const help = p.toks.length ? HELP.filter(x => p.toks.some(tk => x.t.toLowerCase().includes(tk))) : [];
  h += `<div class="chips"><span class="chip on">All</span><span class="chip">Bikes (${bikes.length})</span><span class="chip">Guides (${guides.length})</span><span class="chip">Help (${help.length})</span></div>`;
  if (bikes.length) h += `<div class="sgroup"><span class="eyebrow">Bikes</span>${bikes.slice(0, 5).map(b => `<button class="srow" data-act="go" data-v="bike-${b.id}"><span class="thumb">${photo(b, { sizes: '80px' })}</span><span class="t"><strong>${hl(b.name)}</strong><span class="muted tnum">${b.year} · ${kmf(b.km)} · ${b.city}</span></span><strong class="tnum">${lakh(b.price)}</strong></button>`).join('')}
   ${brands.length === 1 ? `<button class="srow" data-act="shop" data-k="brand" data-v="${brands[0]}"><span class="t"><strong>See all ${brands[0]} bikes in ${S.city} →</strong></span></button>` : ''}</div>`;
  if (brands.length) h += `<div class="sgroup"><span class="eyebrow">Brands &amp; models</span><div class="chips">${brands.map(b => `<button class="chip" data-act="shop" data-k="brand" data-v="${b}">${b}</button>`).join('')}</div></div>`;
  if (guides.length) h += `<div class="sgroup"><span class="eyebrow">Guides (blog)</span>${guides.map(g => `<button class="srow" data-act="go" data-v="blog"><span class="gi">${I.guide}</span><span class="t">${hl(g.t)}</span></button>`).join('')}</div>`;
  if (help.length) h += `<div class="sgroup"><span class="eyebrow">Help</span>${help.map(g => `<details class="faq"><summary>${hl(g.t)}</summary><p>${g.a}</p></details>`).join('')}</div>`;
  if (!bikes.length && !guides.length && !help.length) h += `<div class="empty"><strong>No bikes match “${esc(raw)}” right now.</strong><p class="muted">Tell us what you're looking for and we'll call when it arrives.</p><button class="btn btn-red" data-act="request" data-v="${esc(raw)}">Request this bike</button></div>`;
  box.innerHTML = h;
  clearTimeout(S._st); S._st = setTimeout(() => track('search', { search_term: raw }), 800);
}

function openRequest(pref = '') {
  layer(`${mhead('Request a bike')}<form class="m-body" data-form="request" novalidate>
   <p class="muted">We'll call you when a matching bike is inspected and listed in ${S.city}.</p>
   <div class="field"><label for="rWhat">Bike, budget or body type</label><input class="input" id="rWhat" value="${esc(pref)}" placeholder="e.g. Classic 350 under 2 lakh"></div>
   <div class="field"><label for="rName">Name</label><input class="input" id="rName" autocomplete="name" value="${esc(S.user?.name || '')}"></div>
   <div class="field"><label for="rMob">Mobile number</label><input class="input" id="rMob" inputmode="numeric" maxlength="10" autocomplete="tel" value="${esc(S.user?.mobile || '')}"></div>
   <label class="consent"><input type="checkbox" checked> Notify me on WhatsApp. I can opt out any time.</label>
   <span class="err" id="eR" hidden>Add what you want, your name and a 10-digit mobile number.</span>
   <button class="btn btn-red btn-block" type="submit">Request bike</button></form>`, 'modal narrow', 'Request a bike');
}
function openRide(id) {
  const b = byId(id), days = nextDays();
  S._ride = { id, where: 'Home', date: '', slot: '' };
  layer(`${mhead('Book a free test ride')}<form class="m-body" data-form="ride" novalidate>
   <div class="who"><span class="ride-thumb">${photo(b, { sizes: '100px' })}</span><div><strong>${esc(b.name)}</strong><div class="muted tnum">${inr(b.price)} · ${b.year} · ${kmf(b.km)}</div></div></div>
   <div class="seg"><button type="button" class="on" data-act="rv" data-k="where" data-v="Home">At my home</button><button type="button" data-act="rv" data-k="where" data-v="Hub">At ${b.area} hub</button></div>
   <div class="field"><span class="lab">Date</span><div class="chips">${days.map(d => `<button type="button" class="chip" data-act="rv" data-k="date" data-v="${d}">${d}</button>`).join('')}</div></div>
   <div class="field"><span class="lab">Time</span><div class="slots">${['10:00', '12:00', '14:00', '16:00', '18:00'].map(x => `<button type="button" class="chip" data-act="rv" data-k="slot" data-v="${x}">${x}</button>`).join('')}</div></div>
   <div class="field"><label for="tName">Name</label><input class="input" id="tName" value="${esc(S.user?.name || '')}" autocomplete="name"></div>
   <div class="field"><label for="tMob">Mobile number</label><input class="input" id="tMob" value="${esc(S.user?.mobile || '')}" inputmode="numeric" maxlength="10" autocomplete="tel"></div>
   <label class="consent"><input type="checkbox" checked> Send confirmation and reminders on WhatsApp.</label>
   <span class="err" id="eT" hidden>Pick a date and time, and enter your name and 10-digit mobile.</span>
   <button class="btn btn-red btn-block" type="submit">Confirm test ride</button>
   <p class="fine">Bring your driving licence. Free and no obligation.</p></form>`, 'modal narrow', 'Test ride');
}
function openReserve(id) {
  const b = byId(id);
  layer(`${mhead('Reserve this bike')}<div class="m-body" id="rsvBody">
   <div class="who"><span class="ride-thumb">${photo(b, { sizes: '100px' })}</span><div><strong>${esc(b.name)}</strong><div class="muted tnum">${inr(b.price)}</div></div></div>
   <p>Pay a refundable token of <span class="ph">₹[token]</span> to hold this bike for <span class="ph">[48 hours]</span>. It's adjusted against the price, or refunded if you don't buy.</p>
   <button class="btn btn-red btn-block" data-act="pay" data-id="${b.id}">Pay token with UPI</button></div>`, 'modal narrow', 'Reserve');
}
function openEMI(price = 200000) {
  layer(`${mhead('EMI calculator')}<div class="m-body">
   <div class="field"><label for="ePrice">Bike price</label><input type="range" id="ePrice" min="30000" max="500000" step="5000" value="${price}"><span class="range-lab"><span>₹30K</span><strong id="ePriceV" class="tnum"></strong><span>₹5L</span></span></div>
   <div class="field"><label for="eDown">Down payment</label><input type="range" id="eDown" min="10" max="60" step="5" value="20"><span class="range-lab"><span>10%</span><strong id="eDownV" class="tnum"></strong><span>60%</span></span></div>
   <div class="field"><span class="lab">Tenure</span><div class="chips" id="eTen">${[12, 24, 36, 48].map(n => `<button class="chip ${n === 36 ? 'on' : ''}" data-act="eten" data-v="${n}">${n} months</button>`).join('')}</div></div>
   <div class="field"><label for="eRate">Interest rate (% p.a.)</label><input class="input" id="eRate" type="number" step="0.5" value="12" inputmode="decimal"></div>
   <div class="est"><span class="eyebrow on-dark">Estimated EMI</span><strong id="eOut"></strong><span class="fine" id="eSub"></span><span class="emi-split"><i id="eBarP"></i><i id="eBarI"></i></span><span class="fine"><b class="key-p">■</b> Principal <b class="key-i">■</b> Interest</span></div>
   <button class="btn btn-red btn-block" data-act="toast" data-msg="Finance application is coming soon">Check eligibility</button></div>`, 'modal narrow', 'EMI calculator');
  S._ten = 36; calcEMI();
}
function calcEMI() {
  if (!S._emiT) { S._emiT = 1; track('emi_calc_used'); }
  const p = +$('#ePrice').value, d = +$('#eDown').value, rate = +$('#eRate').value || 0, n = S._ten, P = p * (1 - d / 100), r = rate / 1200;
  const e = r ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n, int = e * n - P;
  $('#ePriceV').textContent = inr(p); $('#eDownV').textContent = d + '% · ' + inr(p * d / 100); $('#eOut').textContent = inr(e) + '/mo';
  $('#eSub').textContent = `Loan ${inr(P)} · total interest ${inr(int)} over ${n} months`;
  const tot = P + int; $('#eBarP').style.width = (P / tot * 100) + '%'; $('#eBarI').style.width = (int / tot * 100) + '%';
}
function openLogin() {
  layer(`${mhead('Log in or sign up')}<form class="m-body" data-form="login" novalidate>
   <p class="muted">No passwords. We'll send a one-time code to your mobile.</p>
   <div class="field"><label for="lName">Name</label><input class="input" id="lName" autocomplete="name"></div>
   <div class="field"><label for="lMob">Mobile number</label><input class="input" id="lMob" inputmode="numeric" maxlength="10" placeholder="98XXX XXXXX" autocomplete="tel"></div>
   <div class="field" id="lOtpF" hidden><label for="lOtp">Enter OTP</label><input class="input otp" id="lOtp" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="one-time-code"></div>
   <label class="consent"><input type="checkbox" id="lCons" checked> I agree to the Terms and Privacy policy, and to receive updates on WhatsApp/SMS. I can withdraw consent any time.</label>
   <span class="err" id="eL" hidden></span>
   <button class="btn btn-red btn-block" type="submit" id="lBtn">Send OTP</button></form>`, 'modal narrow', 'Log in');
}
function openAccount(tab = 'shortlist') {
  if (!S.user) { openLogin(); return; }
  const sl = [...S.shortlist].map(byId).filter(Boolean), rides = API.myRides(), sells = API.mySells();
  const body = {
    shortlist: sl.length ? `<div class="acc-list">${sl.map(b => `<button class="srow" data-act="go" data-v="bike-${b.id}"><span class="thumb">${photo(b, { sizes: '80px' })}</span><span class="t"><strong>${esc(b.name)}</strong><span class="muted">${b.year} · ${kmf(b.km)} · ${b.city}</span></span><strong>${lakh(b.price)}</strong></button>`).join('')}</div><p class="fine">We'll alert you on WhatsApp if any of these drop in price.</p>` : '<p class="muted">Tap ♡ on any bike to save it here. We\'ll alert you if the price drops.</p>',
    rides: rides.length ? rides.map(r => `<div class="panel"><strong>${esc(byId(r.bikeId)?.name || '')}</strong><span class="muted">${r.date}, ${r.slot} · ${r.where === 'Home' ? 'At home' : 'At hub'} · ${r.id}</span></div>`).join('') : '<p class="muted">No test rides booked yet.</p>',
    sells: sells.length ? sells.map(r => `<div class="panel"><strong>${esc(r.vehicle)}</strong><span class="muted">Inspection ${r.date}, ${r.slot} · ${r.id}</span><ol class="track"><li class="done">Inspection booked</li><li>Final offer</li><li>UPI payment</li><li>RC transfer</li></ol></div>`).join('') : '<p class="muted">No sell requests yet. <a href="#sell">Get your price</a>.</p>',
    garage: `<div class="panel" style="background:var(--surface)"><strong>My Garage · coming soon</strong><span class="muted" style="font-size:var(--fs-sm)">Your bike's current value, service reminders, insurance and PUC expiry, and challans, in one place.</span></div>`
  };
  layer(`${mhead('Hi, ' + esc(S.user.name))}<div class="m-body"><div class="tabs">${[['shortlist', 'Shortlist (' + sl.length + ')'], ['rides', 'Test rides'], ['sells', 'Sell requests'], ['garage', 'My Garage']].map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-act="acctab" data-v="${k}">${l}</button>`).join('')}</div>${body[tab]}<button class="textbtn" data-act="logout" style="justify-self:start">Log out</button></div>`, 'modal narrow', 'Account');
}
function openCompare() {
  const bs = S.compare.map(byId);
  const rows = [['Price', b => inr(b.price), 'min', b => b.price], ['Year', b => b.year, 'max', b => b.year], ['KM driven', b => kmf(b.km), 'min', b => b.km], ['Owners', b => own(b.owners), 'min', b => b.owners], ['Engine', b => b.cc ? b.cc + ' cc' : 'Electric'], ['Power', b => b.bhp + ' bhp', 'max', b => b.bhp], ['Torque', b => b.nm + ' Nm', 'max', b => b.nm], ['Inspection score', b => b.score + '/10', 'max', b => b.score], ['EMI*', b => inr(emi(b.price)) + '/mo', 'min', b => b.price], ['Location', b => b.area]];
  layer(`${mhead('Compare bikes')}<div class="m-body"><div class="scroll-x"><table class="cmp-table"><thead><tr><th></th>${bs.map(b => `<td><span class="cmp-ph">${photo(b, { sizes: '160px' })}</span><strong>${esc(b.name)}</strong></td>`).join('')}</tr></thead><tbody>
  ${rows.map(([l, f, best, v]) => { let bi = -1; if (best) { const vals = bs.map(v); const tt = best === 'min' ? Math.min(...vals) : Math.max(...vals); if (vals.filter(x => x === tt).length === 1) bi = vals.indexOf(tt); } return `<tr><th>${l}</th>${bs.map((b, i) => `<td class="${i === bi ? 'best' : ''}">${f(b)}</td>`).join('')}</tr>`; }).join('')}
  <tr><th></th>${bs.map(b => `<td><a class="btn btn-black btn-sm" href="#bike-${b.id}">View</a></td>`).join('')}</tr></tbody></table></div><p class="fine">Red = best in row.</p></div>`, 'modal', 'Compare');
}

/* ---------- chat assistant (scripted v1 flows; swap botReply for the LLM endpoint) ---------- */
const CH = { msgs: [], ctx: null, lang: 'en' };
const GREET = { en: "Hi! I'm Speedioo's assistant. I can find you a bike, start your selling price, book an inspection or test ride, or check an RC transfer.", hi: 'नमस्ते! मैं Speedioo असिस्टेंट हूँ। बाइक ढूँढना, बेचने का दाम, इंस्पेक्शन या टेस्ट राइड बुक करना, मैं मदद कर सकता हूँ।', mr: 'नमस्कार! मी Speedioo सहाय्यक आहे. बाइक शोधणे, विक्रीची किंमत, तपासणी किंवा टेस्ट राइड बुक करणे, मी मदत करू शकतो.' };
const QR = { en: ['Commuter under 80k in Pune', 'Sell my bike', 'EMI on 2 lakh', 'RC transfer status', 'Talk to a human'], hi: ['पुणे में 80k तक बाइक', 'मेरी बाइक बेचनी है', 'इंसान से बात करें'], mr: ['पुण्यात 80k पर्यंत बाइक', 'माझी बाइक विकायची आहे', 'माणसाशी बोला'] };
function openChat(q) {
  if (!CH.msgs.length) CH.msgs.push({ r: 'sys', h: 'Chats are saved to help with your request' }, { r: 'bot', h: GREET[CH.lang] });
  let c = $('#chat');
  if (!c) { c = document.createElement('div'); c.id = 'chat'; c.className = 'chat'; c.setAttribute('role', 'dialog'); c.setAttribute('aria-label', 'Speedioo assistant'); document.body.appendChild(c); track('chat_open'); }
  c.innerHTML = `<div class="chat-h"><div class="row"><div class="who"><span class="av">S</span><div><strong>Speedioo Assistant</strong><small><span class="live"></span> Replies instantly · people 10am–8pm</small></div></div><button class="close" data-act="chatclose" aria-label="Close chat">${I.x}</button></div>
   <div class="langs">${[['en', 'English'], ['hi', 'हिंदी'], ['mr', 'मराठी']].map(([k, l]) => `<button class="${CH.lang === k ? 'on' : ''}" data-act="chatlang" data-v="${k}">${l}</button>`).join('')}</div></div>
   <div class="msgs" id="msgs" aria-live="polite"></div>
   <div class="qr">${QR[CH.lang].map(x => `<button class="chip" data-act="chatq" data-v="${x}">${x}</button>`).join('')}</div>
   <form data-form="chat"><input id="chatIn" placeholder="Type a message…" autocomplete="off" aria-label="Message"><button type="submit" aria-label="Send">${I.send}</button></form>`;
  drawMsgs(); $('#chatFab').hidden = true;
  if (q) chatSend(q); else setTimeout(() => $('#chatIn')?.focus(), 50);
}
function drawMsgs() { const m = $('#msgs'); if (!m) return; m.innerHTML = CH.msgs.map(x => `<div class="msg ${x.r}">${x.h}</div>`).join(''); m.scrollTop = m.scrollHeight; }
function chatSend(text) {
  CH.msgs.push({ r: 'me', h: esc(text) }); CH.msgs.push({ r: 'bot', h: '<span class="typing"><i></i><i></i><i></i></span>', tmp: 1 }); drawMsgs();
  setTimeout(() => { CH.msgs = CH.msgs.filter(x => !x.tmp); CH.msgs.push({ r: 'bot', h: botReply(text) }); drawMsgs(); }, 650);
}
const miniList = l => `<div class="mini">${l.map(b => `<button data-act="go" data-v="bike-${b.id}"><span class="mini-ph">${photo(b, { sizes: '60px' })}</span><span>${esc(b.name)}<br><span class="muted">${b.year} · ${kmf(b.km)} · ${b.area}</span></span><b>${lakh(b.price)}</b></button>`).join('')}</div>`;
function botReply(raw) {
  const q = raw.toLowerCase();
  if (CH.ctx === 'sellReg' && regOk(raw)) { CH.ctx = null; Object.assign(S.sell, { step: 1, reg: normReg(raw), noReg: false, done: false }); return `Got it: <b>${esc(normReg(raw))}</b>. I've filled your number into the 60-second price form.<div class="mini"><button data-act="go" data-v="sell"><span>Continue to your price</span><b>→</b></button></div>`; }
  if (CH.ctx === 'status') { CH.ctx = null; return `Thanks. I'm handing you to a person who can check the status, with this conversation attached.<div class="mini"><button data-act="handoff"><span>Connect to a person</span><b>→</b></button></div>`; }
  if (/human|agent|person|call me|इंसान|माणस/.test(q)) return handoffMsg();
  if (/sell|बेच|विक/.test(q)) { CH.ctx = 'sellReg'; return 'Happy to help you sell. What is the registration number? (e.g. MH 12 AB 1234)'; }
  if (/\brc\b|transfer|status|order|track/.test(q)) { CH.ctx = 'status'; return 'Please share your request ID, or the registration number of the bike.'; }
  if (/document|paper|kagaz|कागज/.test(q)) return 'For selling you need: original RC, valid insurance, PUC, Aadhaar or PAN, and a bank NOC if the bike was on loan. We handle the RC transfer after the sale.';
  if (/emi|loan|finance|installment/.test(q)) { const m = q.match(/([\d.]+)\s*(lakh|k|l)?/); let p = 200000; if (m) { p = parseFloat(m[1]); if (/^l/.test(m[2] || '')) p *= 100000; else if (m[2] === 'k') p *= 1000; else if (p < 100) p *= 100000; } return `For a bike priced ${inr(p)}, with 20% down, 12% p.a. and 36 months, the EMI is about <b>${inr(emi(p))}/mo</b>. Actual rates depend on the lender.<div class="mini"><button data-act="emi" data-price="${p}"><span>Open EMI calculator</span><b>→</b></button></div>`; }
  if (/compare/.test(q)) return 'Tick “Compare” on up to 3 bikes in the listing and I can explain the differences. <div class="mini"><button data-act="go" data-v="buy"><span>Open listing</span><b>→</b></button></div>';
  if (/inspection report|explain/.test(q)) { const b = BIKES.find(x => q.includes(x.name.toLowerCase())); if (b) return `Plain-language summary for the ${esc(b.name)}: score ${b.score}/10. Engine, brakes and electricals passed. Tyres have about ${Math.round(55 + b.score * 4)}% tread left. ${b.km > 10000 ? 'Body has minor cosmetic marks, photographed in the full report.' : 'Body is clean.'} Documents are verified, so the RC transfer should be straightforward.`; }
  if (/test ride|ride/.test(q)) return 'Open any bike and tap “Book free test ride”. You can choose home or hub, date and time.';
  if (/buy|under|below|bike|scooter|commuter|cruiser|sports|ev|electric|enfield|honda|activa|pulsar|yamaha|tvs|ather|खरीद|खरेदी|80k|lakh/.test(q)) {
    const p = parseQ(raw.replace(/पुण्यात|पुणे/, 'pune')); const city = p.city || S.city;
    const l = BIKES.filter(b => b.city === city && (!p.max || b.price <= p.max) && (!p.type || b.type === p.type) && (!p.toks.length || matchBike(b, p.toks))).sort((a, b) => b.score - a.score);
    if (!l.length) return `I found no listed ${p.type ? p.type.toLowerCase() + ' ' : ''}bikes${p.max ? ' under ' + inr(p.max) : ''} in ${city} right now. I won't guess availability. Want me to note a request so the team calls you when one arrives?<div class="mini"><button data-act="request" data-v="${esc(raw)}"><span>Request a bike</span><b>→</b></button></div>`;
    return `Here ${l.length === 1 ? 'is the bike' : 'are ' + Math.min(3, l.length) + ' bikes'} in ${city}${p.max ? ' under ' + inr(p.max) : ''}${p.type ? ' (' + p.type.toLowerCase() + ')' : ''}, ranked by inspection score. Prices are live listing prices.${miniList(l.slice(0, 3))}`;
  }
  return `I'm not confident I understood that. I can help with buying, selling, test rides, EMI and RC transfer status, or connect you to a person.<div class="mini"><button data-act="handoff"><span>Talk to a person</span><b>→</b></button></div>`;
}
const handoffMsg = () => `Connecting you to a Speedioo advisor. They'll see this whole conversation, so you won't need to repeat yourself. Usual reply time: <span class="ph">[— min]</span> during 10am–8pm.<div class="mini"><a href="https://wa.me/${CONTACT.wa}" target="_blank" rel="noopener"><span>Continue on WhatsApp</span><b>→</b></a></div>`;

/* ---------- routing ---------- */
const TITLES = { home: 'Speedioo · Buy & Sell Inspected Used Bikes', buy: 'Used bikes in {city} · Speedioo', sell: 'Sell your bike from home · Speedioo', about: 'About Speedioo', blog: 'Riding guides & selling tips · Speedioo', leads: 'Lead inbox · Speedioo' };
function setLD(obj) { let s = $('#ld-page'); if (!obj) { s && s.remove(); return; } if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-page'; document.head.appendChild(s); } s.textContent = JSON.stringify(obj); }
function route() {
  const h = (location.hash || '#home').slice(1);
  closeL(); clearTimers(); document.body.classList.remove('on-detail'); $('#cmpTray')?.remove(); S._place = null; setLD(null);
  let m, anchor = null, key = h;
  if (h === 'buy') renderBuy();
  else if (h === 'sell') renderSell();
  else if (['about', 'story', 'reviews', 'team', 'contact'].includes(h)) { renderAbout(); key = 'about'; if (h !== 'about') anchor = h; }
  else if (h === 'blog') renderBlog();
  else if (h === 'leads') renderLeads();
  else if ((m = h.match(/^bike-(\d+)$/))) { S.detailId = +m[1]; renderDetail(+m[1]); const b = byId(m[1]); document.title = b ? `${b.name} ${b.year} · ${inr(b.price)} · Speedioo` : TITLES.home; key = 'buy'; }
  else { renderHome(); key = 'home'; }
  if (!m) document.title = (TITLES[key] || TITLES.home).replace('{city}', S.city);
  $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  const app = $('#app'); app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView()); else window.scrollTo(0, 0);
  armReveal();
  track('page_view', { page_path: '/' + (h || 'home'), page_title: document.title });
}
function go(h) { if (location.hash === '#' + h) route(); else location.hash = h; }
function setCity(c, keep) {
  const changed = c !== S.city; S.city = c; DB.set('city', c); $$('.cityName').forEach(e => e.textContent = c); SpeediooCity.apply(c); S.compare = [];
  if (changed) { S.citySwap = true; track('city_change', { city: c }); toast(`${SpeediooCity.CITY[c].greet} · Showing Speedioo ${c}`); }
  route();
  if (keep && document.getElementById(keep)) requestAnimationFrame(() => document.getElementById(keep).scrollIntoView({ block: 'start' }));
}

/* ---------- events ---------- */
const A = {
  ribbon: () => { $('#ribbon').remove(); DB.set('ribbonOff', 1); },
  drawer: () => openDrawer(), closeL: () => closeL(), search: () => openSearch(), sclear: () => { $('#sq').value = ''; drawSearch(); $('#sq').focus(); }, sfill: el => { $('#sq').value = el.dataset.v; drawSearch(); },
  mic: () => toast('Voice search is coming soon'),
  city: el => { const w = el.parentElement, ex = w.querySelector('.city-menu'); $$('.city-menu').forEach(x => x.remove()); if (ex) return; const m = document.createElement('div'); m.className = 'city-menu'; m.innerHTML = CITIES.map(c => `<button class="${S.city === c ? 'on' : ''}" data-act="setcity" data-v="${c}"><span class="ci">${SpeediooCity.ICONS[c]}</span><span><b>${c}</b><small>${SpeediooCity.CITY[c].short}</small></span></button>`).join(''); w.appendChild(m); },
  setcity: el => { $$('.city-menu').forEach(x => x.remove()); if (el.closest('#layer')) closeL(); setCity(el.dataset.v, el.dataset.keep); },
  citylink: (el, e) => { e.preventDefault(); S.f = defF(); S.city = el.dataset.city; DB.set('city', S.city); SpeediooCity.apply(S.city); $$('.cityName').forEach(x => x.textContent = S.city); go('buy'); },
  lang: el => { S.lang = el.dataset.v; DB.set('lang', S.lang); applyLang(); openDrawer(); if (!location.hash || location.hash === '#home') { clearTimers(); renderHome(); armReveal(); } },
  hero: el => { S.hero = el.dataset.v; $$('[data-act=hero]').forEach(b => { b.classList.toggle('on', b.dataset.v === S.hero); b.setAttribute('aria-selected', b.dataset.v === S.hero); }); $('#heroPane').innerHTML = heroPane(); },
  vidtoggle: el => { const v = $('#heroVid'); if (!v) return; if (v.paused) { v.dataset.user = ''; if (!v.querySelector('source')) setupVideo(v, MEDIA.hero); else v.play().catch(() => {}); el.innerHTML = I.pause; el.setAttribute('aria-label', 'Pause background video'); } else { v.pause(); v.dataset.user = '1'; el.innerHTML = I.play; el.setAttribute('aria-label', 'Play background video'); } },
  story: el => { const v = $('#storyVid'); if (!v.querySelector('source')) MEDIA.story.sources.forEach(s => { const x = document.createElement('source'); x.src = s; x.type = 'video/mp4'; v.appendChild(x); }); v.controls = true; v.muted = false; v.play().catch(() => toast('Video could not start')); el.hidden = true; track('video_start', { video_title: 'rider_story' }); },
  playmodal: el => openVideo(el.dataset.v, 'Rider story'),
  walk: (el, e) => { e.stopPropagation(); openVideo('ride', 'Sample walk-around video'); },
  shoptab: el => { S.shop = el.dataset.v; $$('[data-act=shoptab]').forEach(b => b.classList.toggle('on', b === el)); $('#shopTiles').innerHTML = shopTiles(); },
  shop: (el, e) => { e.preventDefault(); const f = defF(), k = el.dataset.k, v = el.dataset.v; if (k === 'budget') { f.minPrice = BUDGETS[v][1]; f.maxPrice = BUDGETS[v][2]; } if (k === 'brand') f.brands = [v]; if (k === 'type') f.types = [v]; if (k === 'km') f.maxKm = +v; if (k === 'year') f.minYear = +v; S.f = f; go('buy'); },
  'reset-buy': (el, e) => { S.f = defF(); if (location.hash === '#buy') { e.preventDefault(); route(); } },
  rail: el => { const r = $('#freshRail'); r && r.scrollBy({ left: +el.dataset.d * r.clientWidth * .8, behavior: reduceMotion ? 'auto' : 'smooth' }); },
  how: el => { S.how = el.dataset.v; S.howStep = 0; $$('[data-act=how]').forEach(b => b.classList.toggle('on', b === el)); drawHow(); },
  howstep: el => { S.howStep = +el.dataset.i; S.howPinned = true; drawHow(); },
  open: el => go('bike-' + el.dataset.id),
  qv: el => openQV(el.dataset.id, location.hash === '#buy' ? S.qv.list : null),
  qvnav: el => { S.qv.i = Math.min(S.qv.list.length - 1, Math.max(0, S.qv.i + +el.dataset.d)); S.qv.ph = 0; drawQV(); },
  qvph: el => { S.qv.ph = (S.qv.ph + +el.dataset.d + VIEWS.length) % VIEWS.length; drawQV(); },
  gal: el => setGal(+el.dataset.i), galstep: (el, e) => { e.stopPropagation(); setGal(S.gal + +el.dataset.d); },
  lightbox: (el, e) => { if (e.target.closest('.gal-pill.r,.gal-nav')) return; openLightbox(); }, lbstep: el => lbStep(+el.dataset.d),
  fav: el => {
    const id = +el.dataset.id, on = !S.shortlist.has(id); on ? S.shortlist.add(id) : S.shortlist.delete(id); saveSL();
    $$(`[data-act=fav][data-id="${id}"]`).forEach(b => { if (b.classList.contains('tool')) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); } else b.textContent = on ? '♥ Saved' : '♡ Save'; });
    if (on) track('add_to_wishlist', { item_id: id });
    toast(on ? (S.user ? "Saved. We'll alert you on price drops." : 'Saved on this device. Log in to keep it across devices.') : 'Removed from shortlist');
  },
  shortlist: (el, e) => { e && e.preventDefault(); if (!S.user) { toast(S.shortlist.size ? S.shortlist.size + ' saved on this device. Log in to see them anywhere.' : 'Tap ♡ on a bike to shortlist it'); openLogin(); } else openAccount('shortlist'); },
  account: () => S.user ? openAccount() : openLogin(), acctab: el => openAccount(el.dataset.v),
  logout: () => { S.user = null; DB.set('user', null); closeL(); drawAcc(); toast('Logged out'); },
  fopen: () => { $('#filters').classList.add('open'); $('#layer').innerHTML = '<div class="scrim" data-act="closeL" style="z-index:85"></div>'; document.body.style.overflow = 'hidden'; },
  fclose: () => closeL(),
  fone: el => { S.f[el.dataset.k] = +el.dataset.v; el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === el)); updateResults(); },
  fmulti: el => { const k = el.dataset.k, v = k === 'owners' ? +el.dataset.v : el.dataset.v, a = S.f[k], i = a.indexOf(v); i > -1 ? a.splice(i, 1) : a.push(v); el.classList.toggle('on', i < 0); updateResults(); },
  rmf: el => { const k = el.dataset.k, v = el.dataset.v; if (k === 'price') { S.f.minPrice = 0; S.f.maxPrice = 500000; } else if (k === 'minYear' || k === 'maxKm') S.f[k] = 0; else { const a = S.f[k]; a.splice(a.indexOf(k === 'owners' ? +v : v), 1); } renderBuy(); },
  clearf: () => { S.f = Object.assign(defF(), { sort: S.f.sort }); renderBuy(); },
  cmpclear: () => { S.compare = []; $$('[data-cmp]').forEach(c => c.checked = false); cmpTray(); }, cmpopen: () => openCompare(),
  request: el => openRequest(el.dataset.v || ''),
  ride: el => openRide(el.dataset.id),
  rv: el => { S._ride[el.dataset.k] = el.dataset.v; el.parentElement.querySelectorAll('[data-act=rv]').forEach(c => c.classList.toggle('on', c === el)); },
  reserve: el => openReserve(el.dataset.id),
  pay: async el => { el.disabled = true; el.textContent = 'Opening payment…'; const r = await API.reserve(+el.dataset.id, 0); $('#rsvBody').innerHTML = okBox('Reservation started', `Reference <b>${r.id}</b>. Our team will call you to complete the token payment. The bike is held once it's paid.`, '<button class="btn btn-black" data-act="closeL">Done</button>'); },
  emi: el => openEMI(+el.dataset.price || 200000), eten: el => { S._ten = +el.dataset.v; $$('#eTen .chip').forEach(c => c.classList.toggle('on', c === el)); calcEMI(); },
  rc: () => layer(`${mhead('RC transfer status')}<form class="m-body" data-form="rc" novalidate><div class="field"><label for="rcReg">Registration number</label>${plate('rcReg')}</div><button class="btn btn-black btn-block" type="submit">Check status</button><div id="rcOut"></div></form>`, 'modal narrow', 'RC status'),
  jump: el => document.getElementById('v-' + el.dataset.t)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }),
  ajump: el => document.getElementById(el.dataset.t)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }),
  spectab: el => { const k = el.dataset.k; $$('.spec-tabs .chip').forEach(c => c.classList.toggle('on', c === el)); $$('.spec-panel').forEach(p => p.classList.toggle('active', p.dataset.sp === k)); },
  specacc: el => { const p = el.parentElement; p.classList.toggle('open'); el.lastElementChild.textContent = p.classList.contains('open') ? '−' : '+'; },
  revf: el => { const v = el.dataset.v; $$('#revF .chip').forEach(c => c.classList.toggle('on', c === el)); $$('#revList .rev').forEach(r => r.hidden = !(v === 'All' || (v === 'Buyers' && r.dataset.kind === 'Bought') || (v === 'Sellers' && r.dataset.kind === 'Sold') || (v === 'Videos' && r.dataset.kind === 'Video'))); },
  intent: el => $$('[data-act=intent]').forEach(c => { c.classList.toggle('on', c === el); c.setAttribute('aria-checked', c === el); }),
  blogcat: el => { renderBlog(el.dataset.v); armReveal(); },
  post: el => { const g = GUIDES[+el.dataset.i]; layer(`${mhead(esc(g.t))}<div class="m-body">${sceneImg(MEDIA.blog[+el.dataset.i % MEDIA.blog.length], '', 1200, 'post-hero')}<span class="eyebrow">${g.c} · ${g.m} min read</span><a class="btn btn-red" href="#${g.c === 'Selling' ? 'sell' : 'buy'}">${g.c === 'Selling' ? 'Get your price' : 'Browse bikes'}</a></div>`, 'modal narrow', g.t); },
  copy: el => { const v = el.dataset.v; try { navigator.clipboard.writeText(v).then(() => toast('Copied ' + v), () => toast(v)); } catch (e) { toast(v); } },
  toast: (el, e) => { e && e.preventDefault(); toast(el.dataset.msg); },
  go: el => { if (el.closest('.chat') && matchMedia('(max-width:600px)').matches) A.chatclose(); go(el.dataset.v); },
  csv: () => exportCSV(), cleardemo: () => { ['leads', 'sells', 'rides', 'sellDraft', 'docs'].forEach(k => DB.set(k, [])); DB.set('sellDraft', {}); S.sell = blankSell(); renderLeads(); toast('Demo data cleared'); },
  // sell flow
  sv: el => { const s = S.sell, k = el.dataset.k; if (s.step === 1) readSell1(); if (['start', 'acc', 'tyre'].includes(k)) s.cond[k] = el.dataset.v; else s[k] = el.dataset.v; renderQ(); },
  noreg: () => { readSell1(); S.sell.noReg = !S.sell.noReg; renderQ(); },
  s1: async () => {
    const s = S.sell; readSell1(); const e = $('#eReg');
    let ok = s.noReg ? !!(s.brand && s.model.trim() && s.year) : regOk(s.reg);
    e.textContent = s.noReg ? 'Pick brand and year, and type the model.' : 'Enter a number like MH 12 AB 1234.'; e.hidden = ok; $('#eKm').hidden = !!s.km;
    if (ok && s.km) { if (!s.noReg) { s.reg = normReg(s.reg); API.lookupReg(s.reg); } s.step = 2; renderQ(); track('sell_step', { step: 1 }); track('quote_start'); }
  },
  s2: () => { const s = S.sell, ok = s.owners && s.cond.start && s.cond.acc && s.cond.tyre; $('#e2').hidden = !!ok; if (ok) { s.step = 3; renderQ(); track('sell_step', { step: 2 }); } },
  rmphoto: el => { S.sell.photos.splice(+el.dataset.i, 1); renderQ(); },
  sback: () => { S.sell.step--; S.sell.otp = false; renderQ(); },
  resend: async () => { await API.sendOtp(S.sell.mobile); toast('OTP sent again'); },
  s3: async el => {
    const s = S.sell; s.name = $('#sName').value.trim(); s.mobile = $('#sMob').value.trim(); const e = $('#e3');
    if (!s.name || !mobOk(s.mobile)) { e.textContent = 'Enter your name and a 10-digit Indian mobile number.'; e.hidden = false; return; }
    if (!$('#sCons').checked) { e.textContent = 'Please agree to be contacted so we can share your price.'; e.hidden = false; return; }
    el.disabled = true;
    if (!s.otp) { await API.sendOtp(s.mobile); s.otp = true; renderQ(); toast('OTP sent to +91 ' + s.mobile + ''); $('#sOtp')?.focus(); return; }
    try { await API.verifyOtp(s.mobile, $('#sOtp').value); } catch (err) { e.textContent = err.message; e.hidden = false; el.disabled = false; return; }
    s.verified = true; s.step = 4; s.est = null; renderQ();
    if (!S.user) { S.user = { name: s.name, mobile: s.mobile }; DB.set('user', S.user); drawAcc(); }
    const vehicle = s.noReg ? `${s.brand} ${s.model} ${s.year}` : s.reg;
    const [est, lead] = await Promise.all([API.estimate(s), API.createLead({ type: 'sell', name: s.name, mobile: s.mobile, city: S.city, detail: `${vehicle} · ${s.km} km · ${s.owners} owner · start ${s.cond.start}, damage ${s.cond.acc}, tyres ${s.cond.tyre} · ${s.photos.length} photos` })]);
    s.est = est; s.leadId = lead.id; renderQ(); track('otp_verified'); track('quote_complete'); track('inspection_booking_start');
  },
  s4: async el => {
    const s = S.sell; if (!s.date || !s.slot) { $('#e4').hidden = false; return; }
    el.disabled = true; el.textContent = 'Booking…';
    const vehicle = s.noReg ? `${s.brand} ${s.model} ${s.year}` : s.reg;
    const r = await API.bookInspection({ vehicle, name: s.name, mobile: s.mobile, city: S.city, where: s.where, date: s.date, slot: s.slot, estimate: `${inr(s.est.lo)}–${inr(s.est.hi)}`, leadId: s.leadId });
    track('inspection_booking_complete'); s.bookingId = r.id; s.step = 5; s.done = true; renderQ(); toast('Inspection booked. Confirmation sent on WhatsApp.');
  },
  snew: () => { S.sell = Object.assign(blankSell(), { name: S.user?.name || '', mobile: S.user?.mobile || '' }); renderQ(); },
  // chat
  goal: el => {
    const v = el.dataset.v; track('intent_select', { intent: v });
    ({ sell: () => go('sell'), buy: () => { S.f = defF(); go('buy'); }, worth: () => scrollToId('tools', '#rsBrand'), compare: () => openCmpPicker(), condition: () => scrollToId('checkpoints'), finance: () => scrollToId('benefits'), why: () => scrollToId('why'), explore: () => scrollToId('city') })[v]();
  },
  scrollto: el => scrollToId(el.dataset.t),
  coll: el => { S.coll = el.dataset.v; $$('[data-act=coll]').forEach(b => b.classList.toggle('on', b === el)); $('#collRail').innerHTML = collRail(); },
  rskm: el => { S.rsKm = el.dataset.v; $$('#rsKm .chip').forEach(c => c.classList.toggle('on', c === el)); resaleCalc(); },
  warranty: () => openWarranty(), pricing: () => openPricing(),
  enquiry: el => openEnquiry(el.dataset.k, el.dataset.id),
  enqopt: el => $$('#enqOpt .chip').forEach(c => c.classList.toggle('on', c === el)),
  cmppick: () => openCmpPicker(),
  pickgo: () => { if (S._pick.length < 2) return; S.compare = [...S._pick]; track('compare_open', { items: S.compare.length }); openCompare(); },
  cmpsimilar: el => { const b = byId(el.dataset.id); S.compare = [b.id, ...BIKES.filter(x => x.id !== b.id && Math.abs(x.price - b.price) <= 90000).slice(0, 2).map(x => x.id)]; track('compare_open', { items: S.compare.length }); openCompare(); },
  langpick: el => { S.lang = el.dataset.v; DB.set('lang', S.lang); applyLang(); clearTimers(); renderHome(); armReveal(); requestAnimationFrame(() => document.getElementById('city')?.scrollIntoView()); },
  qrpop: (el, e) => { if (el.tagName === 'A') { toggleQR(false); return; } e.stopPropagation(); toggleQR(); },
  chat: () => openChat(), chatclose: () => { $('#chat')?.remove(); $('#chatFab').hidden = false; },
  chatq: el => chatSend(el.dataset.v), chatask: el => openChat(el.dataset.q),
  chatlang: el => { CH.lang = el.dataset.v; CH.msgs.push({ r: 'bot', h: GREET[CH.lang] }); openChat(); },
  handoff: async () => { await API.createLead({ type: 'chat_handoff', name: S.user?.name || '', mobile: S.user?.mobile || '', city: S.city, detail: CH.msgs.filter(m => m.r === 'me').map(m => m.h).join(' | ') }); CH.msgs.push({ r: 'bot', h: handoffMsg() }); drawMsgs(); }
};

document.addEventListener('click', e => {
  if (!e.target.closest('.city-wrap,.city-wrap-m,.city-menu')) $$('.city-menu').forEach(x => x.remove());
  if (!e.target.closest('#qrPop,#qrFab') && $('#qrPop') && !$('#qrPop').hidden) toggleQR(false);
  if (e.target.closest('.cmp')) return;
  if (e.target.closest('#layer a[href^="#"]') && !e.target.closest('[data-act]')) setTimeout(closeL, 0);
  const el = e.target.closest('[data-act]'); if (!el) return;
  const a = A[el.dataset.act]; if (a) { if (el.tagName === 'BUTTON' && el.type === 'submit' && el.form) return; a(el, e); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#qrPop') && !$('#qrPop').hidden) { toggleQR(false); $('#qrFab').focus(); return; }
  if (e.key === 'Escape') { if ($('#chat') && !$('#layer').innerHTML) A.chatclose(); else closeL(); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.card,[role=button]')) { e.preventDefault(); e.target.click(); }
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const d = e.key === 'ArrowRight' ? 1 : -1; if ($('#qvIn')) A.qvnav({ dataset: { d } }); else if ($('.lb')) lbStep(d); }
});
document.addEventListener('input', e => {
  const id = e.target.id;
  if (id === 'fPrice') { S.f.maxPrice = +e.target.value; if (S.f.minPrice > S.f.maxPrice) S.f.minPrice = 0; $('#fPriceV').textContent = 'Up to ' + lakh(S.f.maxPrice); updateResults(); }
  if (id === 'sq') drawSearch();
  if (['ePrice', 'eDown', 'eRate'].includes(id)) calcEMI();
  if (e.target.closest('.plate')) { const p = e.target.selectionStart; e.target.value = e.target.value.toUpperCase(); e.target.setSelectionRange(p, p); }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.matches('[data-cmp]')) { const id = +el.dataset.cmp; if (el.checked) { if (S.compare.length >= 3) { el.checked = false; toast('Compare up to 3 bikes'); return; } S.compare.push(id); } else S.compare = S.compare.filter(x => x !== id); cmpTray(); }
  if (el.matches('[data-fbrand]')) { const v = el.dataset.fbrand, a = S.f.brands; el.checked ? a.push(v) : a.splice(a.indexOf(v), 1); updateResults(); }
  if (el.matches('[data-sort]')) { S.f.sort = el.value; $$('[data-sort]').forEach(s => s.value = S.f.sort); updateResults(); }
  if (el.matches('[data-pick]')) { const id = +el.dataset.pick; if (el.checked) { if (S._pick.length >= 3) { el.checked = false; toast('Compare up to 3 bikes'); return; } S._pick.push(id); } else S._pick = S._pick.filter(x => x !== id); $('#pickGo').disabled = S._pick.length < 2; }
  if (el.id === 'rsBrand' || el.id === 'rsYear') resaleCalc();
  if (el.matches('[data-doc]')) { const d = DB.get('docs', []); d[+el.dataset.doc] = el.checked; DB.set('docs', d); }
  if (el.id === 'sPh') {
    const files = [...el.files].slice(0, 6 - S.sell.photos.length);
    Promise.all(files.map(f => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => res(null); r.readAsDataURL(f); })))
      .then(urls => { S.sell.photos.push(...urls.filter(Boolean)); renderQ(); toast(urls.length + ' photo' + (urls.length === 1 ? '' : 's') + ' added'); });
  }
  if (el.closest('[data-form=heroBuy]')) $('#heroCount').textContent = `Show ${countFor(heroFilter())} bikes`;
});
document.addEventListener('submit', async e => {
  const f = e.target.dataset.form; if (!f) return; e.preventDefault();
  const form = e.target, btn = form.querySelector('[type=submit]');
  if (f === 'heroBuy') { S.f = heroFilter(); go('buy'); }
  if (f === 'heroSell' || f === 'bandSell') { const v = (f === 'heroSell' ? $('#heroReg') : $('#bandReg')).value; if (!regOk(v)) { toast('Enter a registration number like MH 12 AB 1234'); return; } Object.assign(S.sell, { step: 1, noReg: false, reg: normReg(v), km: f === 'heroSell' ? ($('#heroKm').value || S.sell.km) : S.sell.km, done: false }); track('sell_start', { source: f }); go('sell'); }
  if (f === 'chat') { const i = $('#chatIn'); if (i.value.trim()) { chatSend(i.value.trim()); i.value = ''; } }
  if (f === 'waOpt') { const m = $('#waMob').value.trim(); if (!mobOk(m)) { toast('Enter a 10-digit mobile number'); return; } btn.disabled = true; await API.createLead({ type: 'whatsapp_optin', mobile: m, city: S.city, detail: 'Price drops & new arrivals' }); form.innerHTML = `<p class="opt-ok">✓ You're on the list. We'll message +91 ${esc(m)} on WhatsApp.</p>`; }
  if (f === 'contact') {
    const name = $('#cName').value.trim(), mob = $('#cMob').value.trim(), msg = $('#cMsg').value.trim(), ok = name && mobOk(mob) && msg && $('#cCons').checked;
    $('#eC').hidden = !!ok; if (!ok) return; btn.disabled = true; btn.textContent = 'Sending…';
    const intent = $('[data-act=intent].on')?.dataset.v || '';
    const lead = await API.createLead({ type: 'contact', name, mobile: mob, city: S.city, detail: intent + ' · ' + msg, whatsapp: $('#cWa').checked });
    form.innerHTML = okBox(`Thanks, ${esc(name.split(' ')[0])}!`, `We'll call you within <span class="ph">[— hours]</span>${$('#cWa')?.checked !== false ? ' and reply on WhatsApp' : ''}. Reference <b>${lead.id}</b>.`);
  }
  if (f === 'request') {
    const what = $('#rWhat').value.trim(), name = $('#rName').value.trim(), mob = $('#rMob').value.trim(), ok = what && name && mobOk(mob);
    $('#eR').hidden = !!ok; if (!ok) return; btn.disabled = true;
    const lead = await API.createLead({ type: 'request_bike', name, mobile: mob, city: S.city, detail: what });
    form.innerHTML = okBox('Request saved', `We'll call +91 ${esc(mob)} when a match for “${esc(what)}” is listed in ${S.city}. Reference <b>${lead.id}</b>.`, '<button class="btn btn-black" data-act="closeL">Done</button>');
  }
  if (f === 'ride') {
    const r = S._ride, name = $('#tName').value.trim(), mob = $('#tMob').value.trim(), ok = r.date && r.slot && name && mobOk(mob);
    $('#eT').hidden = !!ok; if (!ok) return; btn.disabled = true; btn.textContent = 'Booking…';
    const b = byId(r.id), rec = await API.bookTestRide({ bikeId: b.id, name, mobile: mob, where: r.where, date: r.date, slot: r.slot, city: b.city });
    API.createLead({ type: 'buy_enquiry', name, mobile: mob, city: b.city, detail: `Test ride ${b.name} · ${r.date} ${r.slot} · ${r.where}` });
    if (!S.user) { S.user = { name, mobile: mob }; DB.set('user', S.user); drawAcc(); }
    form.innerHTML = okBox('Test ride booked', `${esc(b.name)} · ${r.date}, ${r.slot} · ${r.where === 'Home' ? 'at your home' : 'at our hub'}. Reference <b>${rec.id}</b>. Confirmation sent on WhatsApp.`, `<div class="two-btn" style="width:100%"><button class="btn btn-line" data-act="closeL">Done</button><button class="btn btn-red" data-act="emi" data-price="${b.price}">Check EMI</button></div>`);
  }
  if (f === 'login') {
    const err = $('#eL'), n = $('#lName').value.trim(), m = $('#lMob').value.trim();
    if (!n || !mobOk(m)) { err.textContent = 'Enter your name and a 10-digit Indian mobile number.'; err.hidden = false; return; }
    if (!$('#lCons').checked) { err.textContent = 'Consent is needed to create your account.'; err.hidden = false; return; }
    if ($('#lOtpF').hidden) { btn.disabled = true; await API.sendOtp(m); btn.disabled = false; $('#lOtpF').hidden = false; btn.textContent = 'Verify & log in'; err.hidden = true; $('#lOtp').focus(); toast('OTP sent'); return; }
    try { await API.verifyOtp(m, $('#lOtp').value); } catch (x) { err.textContent = x.message; err.hidden = false; return; }
    S.user = { name: n, mobile: m }; DB.set('user', S.user); drawAcc(); openAccount();
  }
  if (f === 'enquiry' || f === 'callback') {
    const cb = f === 'callback', name = $(cb ? '#cbName' : '#eqName').value.trim(), mob = $(cb ? '#cbMob' : '#eqMob').value.trim(), cons = $(cb ? '#cbCons' : '#eqCons').checked;
    const ok = name && mobOk(mob) && cons; $(cb ? '#eCb' : '#eEq').hidden = !!ok; if (!ok) return;
    btn.disabled = true; btn.textContent = 'Sending…';
    const kind = cb ? 'callback' : form.dataset.k, b = form.dataset.id ? byId(form.dataset.id) : null;
    const detail = [cb ? $('#cbTopic').value : $('#enqOpt .chip.on')?.dataset.v, $('#eqTime')?.value, b && `${b.name} (${b.year}, ${inr(b.price)})`].filter(Boolean).join(' · ');
    const lead = await API.createLead({ type: kind, name, mobile: mob, city: S.city, detail });
    track(kind === 'callback' ? 'callback_request' : 'enquiry_submit', { kind });
    form.innerHTML = okBox(`Thanks, ${esc(name.split(' ')[0])}!`, `${kind === 'callback' ? 'We’ll call you' : 'Our team will call you'} on +91 ${esc(mob)}. Reference <b>${lead.id}</b>.`, cb ? '' : '<button class="btn btn-black" data-act="closeL">Done</button>');
  }
  if (f === 'rc') {
    const v = $('#rcReg').value; if (!regOk(v)) { toast('Enter a registration number'); return; }
    $('#rcOut').innerHTML = '<p class="hint">Checking…</p>'; const r = await API.rcStatus(normReg(v));
    $('#rcOut').innerHTML = `<p class="hint">${esc(r.reg)}</p><ol class="track">${r.steps.map(([l, d]) => `<li class="${d ? 'done' : ''}">${l}<span>${d ? 'Done' : 'Pending'}</span></li>`).join('')}</ol>`;
  }
});
/* swipe for quick view / lightbox on touch */
let tx = null;
document.addEventListener('touchstart', e => { if (e.target.closest('#qvIn,.lb')) tx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 60) { const d = dx < 0 ? 1 : -1; if ($('#qvIn')) A.qvnav({ dataset: { d } }); else if ($('.lb')) lbStep(d); } }, { passive: true });
/* header: hides on scroll down (mobile), progress bar */
let ly = 0, ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const y = scrollY, hide = isMobile() && y > ly && y > 160;
    $('#hdr').classList.toggle('hide', hide); document.body.classList.toggle('hdr-hidden', hide);
    const max = document.documentElement.scrollHeight - innerHeight; $('#progress').style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    ly = y; ticking = false;
  });
}, { passive: true });
addEventListener('resize', () => S._place && S._place());
addEventListener('hashchange', route);

function drawAcc() { $('#accBtn').innerHTML = S.user ? `<span class="acc-i">${esc(S.user.name[0].toUpperCase())}</span>` : I.user; }

/* boot */
$('#burger').innerHTML = I.menu; $$('.sIcon').forEach(s => s.outerHTML = I.search); $$('.mic').forEach(m => m.outerHTML = `<span class="mic-i">${I.mic}</span>`);
$('#bn1').innerHTML = I.home + 'Home'; $('#bn2').innerHTML = I.bike + 'Buy'; $('#bn3').innerHTML = I.tag + 'Sell'; $('#bn4').innerHTML = I.phone + 'Call'; $('#bn5').innerHTML = I.wa + 'WhatsApp';
$('#chatFab').innerHTML = I.chat + '<span>Ask Speedioo</span>'; $('#waFab').innerHTML = I.wa;
$$('.logo').forEach(l => l.innerHTML = LOGO);
SpeediooCity.apply(S.city);
if (S.fromQR) track('qr_landing', { medium: (location.search.match(/utm_medium=([^&]+)/) || [])[1] || '' });
$$('.cityName').forEach(e => e.textContent = S.city);
$('#yr') && ($('#yr').textContent = new Date().getFullYear());
if (DB.get('ribbonOff', 0)) $('#ribbon')?.remove();
if (isMobile()) $$('footer details').forEach(d => d.open = false);
saveSL(); drawAcc(); applyLang(); route();
