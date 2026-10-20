/* "Sell your bike in 28 minutes" — interactive 11-step journey.
   Phases make clear what the 28 minutes cover (the doorstep visit) and what happens before and after. */
(function () {
  const QR_SRC = 'assets/img/speedioo-qr.png';
  const PHASES = [
    { id: 'before', label: 'Before your visit', note: 'Online, about 5 minutes', from: 0, to: 5 },
    { id: 'window', label: 'The 28 minutes', note: 'At your doorstep', from: 6, to: 8 },
    { id: 'after', label: 'After the sale', note: 'Paperwork, tracked live', from: 9, to: 10 }
  ];
  const STEPS = [
    { t: 'Discover Speedioo', d: 'You find us on Google, Instagram or Facebook, through a friend, or on a Speedioo banner with our QR code.', v: 'discover' },
    { t: 'Visit the website', d: 'One clear button: Sell your bike. No account needed to see your price.', v: 'site' },
    { t: 'Scan the QR code', d: 'Scanning a banner or this page takes you straight to the phone-friendly sell form. Already on your phone? Start right here.', v: 'qr', cta: ['Start on this phone', '#sell'] },
    { t: 'Enter your mobile number', d: 'We verify it with a one-time code. You choose how we may contact you, and you can change it any time.', v: 'otp' },
    { t: 'Get your estimated quote', d: 'Type your number plate and km. You see an estimated range in about 60 seconds. It is an estimate, not the final offer.', v: 'quote', cta: ['Get my estimate', '#sell'] },
    { t: 'Book a free inspection', d: 'Pick a slot at your home or at our hub. You get a confirmation on WhatsApp and can reschedule any time.', v: 'slot' },
    { t: 'Doorstep inspection', d: 'Our inspector checks engine, brakes, tyres, electricals and documents. The 28 minutes start here.', v: 'inspect' },
    { t: 'Final offer', d: 'A fixed price based on the inspection, with every deduction explained. No haggling.', v: 'offer' },
    { t: 'Accept and get paid', d: 'Accept or decline, with no pressure. If you accept, you e-sign and the money is sent by UPI. The 28 minutes end here.', v: 'accept' },
    { t: 'RC transfer', d: 'We file the ownership transfer with the RTO and you can track every stage. This usually takes <span class="ph">[N]</span> working days.', v: 'rc' },
    { t: 'SOLD', d: 'Money in your account, paperwork handled by us. We message you when the new RC is issued.', v: 'sold' }
  ];

  const V = {
    discover: () => `<div class="jv-chips"><span>Google</span><span>Instagram</span><span>Facebook</span><span>A friend</span><span class="on">QR banner</span></div>`,
    site: () => `<div class="jv-phone"><div class="jv-scr"><b class="jv-h">Sell your bike from home</b><span class="jv-btn">Sell your bike</span><span class="jv-line"></span><span class="jv-line s"></span></div></div>`,
    qr: () => `<div class="jv-qr"><img src="${QR_SRC}" alt="Speedioo QR code: scan to sell your bike" width="120" height="163" loading="lazy"><span class="jv-scan"></span></div>`,
    otp: () => `<div class="jv-phone"><div class="jv-scr"><small>Mobile number</small><span class="jv-in">+91 98XXX XXXXX</span><small>Enter OTP</small><span class="jv-otp"><i>4</i><i>8</i><i>1</i><i class="c"></i></span></div></div>`,
    quote: () => `<div class="jv-phone"><div class="jv-scr"><span class="jv-plate">MH 12 AB 1234</span><span class="jv-est"><small>Estimated range</small><b>₹1.62L – ₹1.80L</b></span></div></div>`,
    slot: () => `<div class="jv-slots"><span>Tue 10:00</span><span class="on">Tue 11:30</span><span>Wed 15:00</span><span>Wed 18:00</span></div>`,
    inspect: () => `<ul class="jv-check"><li class="ok">Engine &amp; gearbox</li><li class="ok">Brakes &amp; suspension</li><li class="ok">Tyres &amp; wheels</li><li class="ok">Electricals</li><li class="ok">RC &amp; documents</li></ul>`,
    offer: () => `<div class="jv-offer"><small>Final offer</small><b>₹1,72,000</b><span>Estimate ₹1,62,000 – ₹1,80,000</span><span>Rear tyre wear − ₹3,000</span></div>`,
    accept: () => `<div class="jv-accept"><span class="jv-btn">Accept &amp; e-sign</span><span class="jv-btn ghost">Decline</span><span class="jv-paid">₹1,72,000 sent by UPI</span></div>`,
    rc: () => `<ol class="jv-rc"><li class="done">Documents collected</li><li class="done">Filed with RTO</li><li class="now">RTO approval</li><li>New RC issued</li></ol>`,
    sold: () => `<div class="jv-sold"><span class="stamp">SOLD</span><div class="conf">${'<i></i>'.repeat(14)}</div></div>`
  };

  function mount(root, opts = {}) {
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0, user = false, vis = false, timer = null;
    root.innerHTML = `
     <div class="jr-def"><span class="jr-clock">28<small>min</small></span><p>The 28 minutes cover the doorstep visit: inspection, final offer, and UPI payment once you accept. Getting your estimate and booking a slot happen online before. The RC transfer happens after, and you can track it.</p></div>
     <div class="jr-track" role="tablist" aria-label="Selling journey steps">
      ${PHASES.map(p => `<div class="jr-phase jr-${p.id}" style="--n:${p.to - p.from + 1}"><div class="jr-phase-h"><b>${p.label}</b><span>${p.note}</span></div><div class="jr-nodes">${STEPS.slice(p.from, p.to + 1).map((s, k) => { const idx = p.from + k; return `<button role="tab" class="jr-node" data-j="${idx}" aria-label="Step ${idx + 1}: ${s.t.replace(/<[^>]+>/g, '')}"><i>${idx === 10 ? '✓' : idx + 1}</i><span>${s.t}</span></button>`; }).join('')}</div></div>`).join('')}
     </div>
     <div class="jr-bar"><i></i></div>
     <div class="jr-card" aria-live="polite"></div>`;
    const card = root.querySelector('.jr-card'), nodes = [...root.querySelectorAll('.jr-node')], bar = root.querySelector('.jr-bar i');
    function show(k, fromUser) {
      i = (k + STEPS.length) % STEPS.length;
      const s = STEPS[i], ph = PHASES.find(p => i >= p.from && i <= p.to);
      nodes.forEach((n, x) => { n.classList.toggle('on', x === i); n.classList.toggle('done', x < i); n.setAttribute('aria-selected', x === i); });
      root.querySelectorAll('.jr-phase').forEach(p => p.classList.toggle('on', p.classList.contains('jr-' + ph.id)));
      bar.style.width = ((i + 1) / STEPS.length * 100) + '%';
      card.className = 'jr-card jr-in ph-' + ph.id;
      card.innerHTML = `<div class="jr-txt"><span class="eyebrow">${ph.label} · Step ${i + 1} of ${STEPS.length}</span><h3>${s.t}</h3><p>${s.d}</p>
        <div class="jr-nav"><button class="btn btn-line btn-sm" data-jn="-1" aria-label="Previous step">←</button><button class="btn btn-line btn-sm" data-jn="1" aria-label="Next step">→</button>${s.cta ? `<a class="btn btn-red btn-sm" href="${s.cta[1]}">${s.cta[0]}</a>` : ''}</div></div>
        <div class="jr-vis">${V[s.v]()}</div>`;
      if (fromUser && typeof track === 'function') track('journey_step', { step: i + 1 });
      if (fromUser) { const n = nodes[i]; n.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
    }
    root.addEventListener('click', e => {
      const n = e.target.closest('[data-j]'), nav = e.target.closest('[data-jn]');
      if (n) { user = true; show(+n.dataset.j, true); }
      if (nav) { user = true; show(i + +nav.dataset.jn, true); }
    });
    root.addEventListener('keydown', e => { if (e.target.closest('.jr-track') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); user = true; show(i + (e.key === 'ArrowRight' ? 1 : -1), true); nodes[i].focus(); } });
    show(opts.start || 0);
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { vis = en.isIntersecting; }, { threshold: .35 }).observe(root);
      timer = setInterval(() => { if (!root.isConnected) { clearInterval(timer); return; } if (vis && !user) show(i + 1); }, 2600);
    }
  }

  window.SpeediooJourney = { mount, STEPS, QR_SRC };
})();
