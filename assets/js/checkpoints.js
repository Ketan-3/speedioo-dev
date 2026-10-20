/* Vehicle checkpoints explorer: clickable hotspots on a bike drawing + paperwork checkpoints.
   inspectionFor(bike) maps a bike to checkpoint results. In production these come from the
   inspector's report in ERPNext; here they are derived from the listing data. */
(function () {
  const ST = { verified: 'Verified', good: 'Good', attention: 'Attention required', none: 'Not inspected' };

  const POINTS = [
    { id: 'engine', label: 'Engine & mechanical', x: 432, y: 300, view: 3, checks: ['Cold start and idle', 'Engine noise and vibration', 'Oil leaks and smoke', 'Throttle response'] },
    { id: 'drive', label: 'Gearbox, clutch & chain', x: 268, y: 336, view: 4, checks: ['Clutch play and bite point', 'Gear shifts, all gears', 'Chain slack and lubrication', 'Sprocket wear'] },
    { id: 'body', label: 'Body panels & paint', x: 438, y: 168, view: 2, checks: ['Tank dents and scratches', 'Side panels and mudguards', 'Paint match and rust', 'Mirrors and fasteners'] },
    { id: 'seat', label: 'Seat, grips & controls', x: 262, y: 186, view: 2, checks: ['Seat cover and foam', 'Grips and levers', 'Switch gear', 'Footpegs'] },
    { id: 'tyres', label: 'Tyres & wheels', x: 180, y: 246, view: 4, checks: ['Tread depth, front and rear', 'Sidewall cracks', 'Wheel alignment and run-out', 'Tyre age'] },
    { id: 'brakes', label: 'Brakes & suspension', x: 612, y: 330, view: 5, checks: ['Front and rear braking', 'Pad and disc wear', 'ABS warning light', 'Fork and shock leaks'] },
    { id: 'elec', label: 'Electricals', x: 572, y: 170, view: 1, checks: ['Headlight, tail light, indicators', 'Horn and starter', 'Instrument console', 'Wiring condition'] },
    { id: 'battery', label: 'Battery', x: 318, y: 238, view: 0, checks: ['Voltage at rest and cranking', 'Terminals and mounting', 'Charging output'] },
    { id: 'odo', label: 'Odometer & history', paper: true, checks: ['Odometer reading', 'Matches service records', 'Ownership history'] },
    { id: 'accident', label: 'Accident & damage check', paper: true, checks: ['Frame and fork alignment', 'Welds and repaint signs', 'Insurance claim history'] },
    { id: 'service', label: 'Service records', paper: true, checks: ['Service booklet or invoices', 'Last service date', 'Pending recalls'] },
    { id: 'docs', label: 'RC & documents', paper: true, checks: ['Original RC', 'Valid insurance and PUC', 'Loan / hypothecation status', 'Challans'] }
  ];

  function inspectionFor(b) {
    const ev = b.type === 'EV', tread = Math.round(55 + b.score * 4), services = Math.max(1, Math.min(6, 2026 - b.year + 1));
    const r = {
      engine: ev ? { s: 'good', rate: 9, find: 'Motor and controller run quietly. No error codes on the console.' }
        : { s: 'good', rate: Math.round(b.score), find: b.score >= 8.8 ? 'Smooth idle, clean start, no leaks or smoke.' : 'Starts and idles well. Slight tappet noise when cold, normal for this engine.' },
      drive: ev ? { s: 'good', rate: 9, find: 'Belt drive tension and wear within limits.' }
        : b.km > 20000 ? { s: 'attention', rate: 6, find: 'Chain is stretched and close to its adjustment limit.', fix: 'Plan a chain and sprocket change within about 2,000 km.' }
          : { s: 'good', rate: 8, find: b.km > 10000 ? 'Chain cleaned, lubed and adjusted during inspection.' : 'Light clutch, crisp shifts, chain in good shape.' },
      body: b.km > 10000 ? { s: 'attention', rate: 7, find: 'Minor scratches on the left side panel. No dents.', fix: 'Cosmetic only. Does not affect riding.' }
        : { s: 'good', rate: 9, find: 'Paint is original and even. No dents or rust.' },
      seat: { s: 'good', rate: 9, find: 'Seat cover intact, grips and levers in good condition.' },
      tyres: tread >= 88 ? { s: 'good', rate: Math.round(tread / 10), find: `About ${tread}% tread left on both tyres. No cracks.` }
        : { s: 'attention', rate: Math.round(tread / 10), find: `About ${tread}% tread left on the rear tyre.`, fix: 'Rear tyre will need a change in the next few thousand km.' },
      brakes: { s: 'good', rate: 9, find: `${b.abs} braking works correctly. Pads above 60%. No fork or shock leaks.` },
      elec: { s: 'verified', rate: 10, find: 'All lights, horn, starter and console work.' },
      battery: ev ? { s: 'good', rate: 9, find: 'Battery health 94% on the manufacturer’s diagnostic.' } : { s: 'good', rate: 9, find: '12.6 V at rest, strong cranking.' },
      odo: { s: 'verified', rate: 10, find: `${b.km.toLocaleString('en-IN')} km. Matches the service records.` },
      accident: { s: 'verified', rate: 10, find: 'No frame or fork damage. No repaint signs.' },
      service: b.owners > 1 ? { s: 'none', rate: 0, find: 'The previous owner’s service booklet was not available, so service history could not be verified.', fix: 'Ask us for the latest service invoice we have on file.' }
        : { s: 'verified', rate: 10, find: `${services} service${services > 1 ? 's' : ''} at an authorised centre.` },
      docs: { s: 'verified', rate: 10, find: `Original RC (${b.reg}), valid insurance and PUC. No loan on the bike, no pending challans.` }
    };
    if (ev) r.drive.find = 'Belt drive tension and wear within limits.';
    return r;
  }

  const bikeSVG = () => {
    const spokes = (cx, cy) => [...Array(18)].map((_, i) => { const a = i * Math.PI / 9; return `<line x1="${cx}" y1="${cy}" x2="${(cx + 66 * Math.cos(a)).toFixed(1)}" y2="${(cy + 66 * Math.sin(a)).toFixed(1)}"/>`; }).join('');
    const fins = [...Array(7)].map((_, i) => `<rect x="${394 + i * 2}" y="${222 + i * 9}" width="${70 - i * 2}" height="5" rx="2"/>`).join('');
    return `<svg class="cpx-svg" viewBox="0 0 800 440" role="img" aria-label="Motorcycle with inspection checkpoints">
     <ellipse cx="400" cy="430" rx="330" ry="8" fill="var(--cpx-shadow)"/>
     <g class="w"><circle cx="180" cy="330" r="92" fill="none" stroke="var(--ink)" stroke-width="20"/><circle cx="180" cy="330" r="70" fill="none" stroke="var(--cpx-metal)" stroke-width="4"/><g stroke="var(--cpx-metal)" stroke-width="1.6">${spokes(180, 330)}</g><circle cx="180" cy="330" r="16" fill="var(--cpx-metal)"/><circle cx="180" cy="330" r="30" fill="none" stroke="var(--cpx-metal)" stroke-width="6"/></g>
     <g class="w"><circle cx="612" cy="330" r="92" fill="none" stroke="var(--ink)" stroke-width="20"/><circle cx="612" cy="330" r="70" fill="none" stroke="var(--cpx-metal)" stroke-width="4"/><g stroke="var(--cpx-metal)" stroke-width="1.6">${spokes(612, 330)}</g><circle cx="612" cy="330" r="44" fill="none" stroke="var(--cpx-disc)" stroke-width="9"/><circle cx="612" cy="330" r="14" fill="var(--cpx-metal)"/></g>
     <path d="M86 300 A96 96 0 0 1 250 252" fill="none" stroke="var(--ink)" stroke-width="10" stroke-linecap="round"/>
     <path d="M540 268 A96 96 0 0 1 690 262" fill="none" stroke="var(--ink)" stroke-width="10" stroke-linecap="round"/>
     <path d="M180 330 L292 312 L392 336" fill="none" stroke="var(--cpx-metal)" stroke-width="5"/>
     <path d="M182 318 L380 322 M182 342 L380 342" stroke="var(--ink)" stroke-width="4" stroke-dasharray="6 3"/><circle cx="380" cy="332" r="16" fill="var(--ink)"/>
     <path d="M222 196 L196 300" stroke="var(--cpx-metal)" stroke-width="7"/><path d="M216 214 l14 6 l-18 6 l14 6 l-18 6 l14 6 l-18 6 l14 6 l-18 6" fill="none" stroke="var(--brand)" stroke-width="3"/>
     <path d="M248 200 L392 214 L520 150 L548 136 M392 214 L400 330 M520 150 L470 300" fill="none" stroke="var(--ink)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
     <rect x="356" y="268" width="140" height="74" rx="22" fill="var(--cpx-engine)"/><g fill="var(--cpx-metal)">${fins}</g><circle cx="460" cy="306" r="17" fill="none" stroke="var(--cpx-metal)" stroke-width="5"/>
     <path d="M490 296 C520 330 470 370 380 372 L250 368" fill="none" stroke="var(--cpx-chrome)" stroke-width="10" stroke-linecap="round"/><path d="M120 348 L262 362 L262 382 L130 372 Z" fill="var(--cpx-chrome)"/>
     <rect x="280" y="206" width="76" height="62" rx="12" fill="var(--cpx-panel)"/>
     <path d="M196 196 C226 172 300 168 340 180 L336 204 C296 210 236 210 200 208 Z" fill="var(--ink)"/>
     <path d="M336 190 C346 140 474 124 522 150 L510 204 C456 218 382 220 340 208 Z" fill="var(--brand)"/><path d="M380 172 C410 158 462 154 490 166" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".6"/>
     <path d="M548 136 L612 330" stroke="var(--cpx-chrome)" stroke-width="14" stroke-linecap="round"/><path d="M584 230 L612 330" stroke="var(--cpx-metal)" stroke-width="18" stroke-linecap="round"/>
     <path d="M540 128 L498 102 M540 128 L560 112" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/><circle cx="530" cy="112" r="15" fill="var(--panel)" stroke="var(--ink)" stroke-width="4"/>
     <circle cx="572" cy="172" r="26" fill="var(--panel)" stroke="var(--ink)" stroke-width="7"/><circle cx="572" cy="172" r="12" fill="var(--cpx-lamp)"/>
     <rect x="160" y="190" width="30" height="12" rx="4" fill="var(--brand)"/>
    </svg>`;
  };

  const pill = s => `<span class="cp-pill cp-${s}">${ST[s]}</span>`;

  function mount(root, b, opts = {}) {
    if (!root || !b) return;
    const res = inspectionFor(b), counts = { verified: 0, good: 0, attention: 0, none: 0 };
    POINTS.forEach(p => counts[res[p.id].s]++);
    let cur = opts.start || 'engine';
    root.innerHTML = `
     <div class="cpx-head">
      ${opts.sample ? `<span class="cpx-sample">Sample report · ${b.name} · ${b.year} · ${b.km.toLocaleString('en-IN')} km</span>` : ''}
      <div class="cpx-sum">${['verified', 'good', 'attention', 'none'].filter(k => counts[k]).map(k => `<span class="cp-pill cp-${k}">${counts[k]} ${ST[k].toLowerCase()}</span>`).join('')}</div>
     </div>
     <div class="cpx-grid">
      <div class="cpx-stage">${bikeSVG()}
       ${POINTS.filter(p => !p.paper).map(p => `<button class="cpx-hot cp-${res[p.id].s}" data-cp="${p.id}" style="left:${(p.x / 800 * 100).toFixed(2)}%;top:${(p.y / 440 * 100).toFixed(2)}%" aria-label="${p.label}: ${ST[res[p.id].s]}"><i></i></button>`).join('')}
      </div>
      <div class="cpx-panel" aria-live="polite"></div>
     </div>
     <div class="cpx-list" role="tablist" aria-label="All checkpoints">${POINTS.map(p => `<button role="tab" class="cpx-chip" data-cp="${p.id}"><span class="dot cp-${res[p.id].s}"></span>${p.label}</button>`).join('')}</div>`;
    const panel = root.querySelector('.cpx-panel');
    function show(id, user) {
      cur = id; const p = POINTS.find(x => x.id === id), r = res[id];
      root.querySelectorAll('[data-cp]').forEach(el => { el.classList.toggle('on', el.dataset.cp === id); if (el.classList.contains('cpx-chip')) el.setAttribute('aria-selected', el.dataset.cp === id); });
      panel.innerHTML = `<div class="cpx-p-head"><div><span class="eyebrow">${p.paper ? 'Paperwork check' : 'Physical check'}</span><h3>${p.label}</h3></div>${pill(r.s)}</div>
       ${r.s === 'none' ? '<div class="cpx-rate na">Not rated</div>' : `<div class="cpx-rate" aria-label="Rating ${r.rate} out of 10"><span class="bars">${[...Array(10)].map((_, k) => `<i class="${k < r.rate ? 'f' : ''}"></i>`).join('')}</span><b>${r.rate}/10</b></div>`}
       <div class="cpx-cols"><div><h4>What we checked</h4><ul>${p.checks.map(c => `<li>${c}</li>`).join('')}</ul></div>
        <div><h4>What we found</h4><p>${r.find}</p>${r.fix ? `<p class="cpx-fix"><b>Recommended:</b> ${r.fix}</p>` : '<p class="cpx-ok">No action needed.</p>'}</div></div>
       ${!p.paper && typeof photo === 'function' && b.photo ? `<div class="cpx-ev"><span class="cpx-ev-ph">${photo(b, { view: p.view, sizes: '160px' })}</span><span><b>Inspection photo</b><small>${p.label}, ${b.name}</small></span></div>` : ''}`;
      if (user && typeof track === 'function') track('checkpoint_view', { checkpoint: id, item_id: b.id });
    }
    root.addEventListener('click', e => { const el = e.target.closest('[data-cp]'); if (el) show(el.dataset.cp, true); });
    show(cur);
  }

  window.SpeediooCheckpoints = { mount, inspectionFor, POINTS, ST };
})();
