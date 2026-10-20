/* Speedioo API layer — front-end only for now.
   Every function returns a Promise and mirrors an endpoint the ERPNext-backed API will expose.
   To connect the real backend, set API_BASE and replace each mock body with a fetch() call.
   Data captured here is kept in this browser's localStorage so the flows work end to end. */

const API_BASE = ''; // e.g. 'https://api.speedioo.com/api/v1' (Frappe REST / custom endpoints)

const DB = {
  get(k, d) { try { const v = localStorage.getItem('spd_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('spd_' + k, JSON.stringify(v)); } catch (e) { /* storage blocked: keep in memory */ } }
};
const wait = (ms = 350) => new Promise(r => setTimeout(r, ms));
const uid = p => p + '-' + Date.now().toString(36).toUpperCase().slice(-6);

/* Analytics: pushes GA4-style events to window.dataLayer. Add the GTM / gtag snippet in index.html to send them. */
window.dataLayer = window.dataLayer || [];
function track(event, params = {}) {
  window.dataLayer.push({ event, ...params });
  if (window.SPD_DEBUG) console.info('[track]', event, params);
}

const API = {
  /* GET /bikes?city=&min_price=&max_price=&brand=&type=&min_year=&max_km=&owners=&sort= */
  async listBikes(f = {}) {
    await wait(120);
    let l = BIKES.filter(b => (!f.city || b.city === f.city) && b.price >= (f.minPrice || 0) && b.price <= (f.maxPrice || 1e9)
      && (!f.brands?.length || f.brands.includes(b.brand)) && (!f.minYear || b.year >= f.minYear) && (!f.maxKm || b.km < f.maxKm)
      && (!f.types?.length || f.types.includes(b.type)) && (!f.owners?.length || f.owners.includes(b.owners)));
    const s = { new: (a, b) => a.added - b.added, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, km: (a, b) => a.km - b.km }[f.sort || 'new'];
    return l.sort(s);
  },

  /* GET /bikes/:id */
  async getBike(id) { await wait(60); return BIKES.find(b => b.id === +id) || null; },

  /* GET /vahan/:reg — registration lookup (Vahan / third-party). Mocked: returns null so the form asks for details. */
  async lookupReg(reg) { await wait(500); return { reg, brand: null, model: null, year: null, source: 'mock' }; },

  /* POST /auth/otp  and  POST /auth/verify */
  async sendOtp(mobile) { await wait(500); track('otp_sent'); return { ok: true, demoHint: 'Any 4 digits works in this build' }; },
  async verifyOtp(mobile, otp) { await wait(400); if (!/^\d{4}$/.test(otp)) throw new Error('Enter the 4-digit OTP.'); track('login', { method: 'otp' }); return { ok: true, token: 'demo-' + mobile }; },

  /* POST /leads — ERPNext Lead. type: sell | buy_enquiry | request_bike | contact | callback | chat_handoff */
  async createLead(lead) {
    await wait();
    const rec = { id: uid('LEAD'), created: new Date().toISOString(), status: 'New', source: 'website', utm: utm(), ...lead };
    const all = DB.get('leads', []); all.unshift(rec); DB.set('leads', all);
    track('generate_lead', { lead_type: lead.type, city: lead.city });
    return rec;
  },

  /* POST /valuation — returns an indicative range. Mocked with a simple formula; the real model lives server-side. */
  async estimate({ km, owners, cond }) {
    await wait(900);
    const f = ({ '<10k': 1, '10–25k': .9, '25–50k': .8, '50k+': .68 }[km] || .85) * (owners === '1st' ? 1 : owners === '2nd' ? .94 : .88)
      * (cond.acc === 'Major' ? .75 : cond.acc === 'Minor' ? .92 : 1) * (cond.start === 'No' ? .85 : 1) * (cond.tyre === 'Need change' ? .97 : 1);
    const lo = Math.round(70000 * f / 1000) * 1000;
    track('valuation_shown');
    return { lo, hi: Math.round(lo * 1.14 / 1000) * 1000, demo: true };
  },

  /* POST /inspections — ERPNext custom doctype "Inspection Booking" */
  async bookInspection(b) {
    await wait();
    const rec = { id: uid('INS'), status: 'Booked', created: new Date().toISOString(), ...b };
    const all = DB.get('sells', []); all.unshift(rec); DB.set('sells', all);
    track('book_inspection', { city: b.city });
    return rec;
  },

  /* POST /test-rides */
  async bookTestRide(r) {
    await wait();
    const rec = { id: uid('TR'), status: 'Booked', created: new Date().toISOString(), ...r };
    const all = DB.get('rides', []); all.unshift(rec); DB.set('rides', all);
    track('book_test_ride', { item_id: r.bikeId });
    return rec;
  },

  /* POST /reservations — creates a payment order (Razorpay / Cashfree) for the token amount. Mocked. */
  async reserve(bikeId, amount) { await wait(800); track('begin_checkout', { item_id: bikeId, value: amount, currency: 'INR' }); return { id: uid('RSV'), status: 'Payment gateway connects here' }; },

  /* GET /rc-status/:reg */
  async rcStatus(reg) {
    await wait(600);
    return { reg, steps: [['Documents collected', true], ['Submitted to RTO', true], ['RTO approval', false], ['New RC issued', false]], demo: true };
  },

  /* Shortlist sync — POST /me/shortlist */
  async saveShortlist(ids) { DB.set('sl', ids); return true; },

  myLeads() { return DB.get('leads', []); },
  mySells() { return DB.get('sells', []); },
  myRides() { return DB.get('rides', []); }
};

function utm() {
  try {
    const p = new URLSearchParams(location.search);
    const keep = {}; ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(k => { if (p.get(k)) keep[k] = p.get(k); });
    if (Object.keys(keep).length) DB.set('utm', keep);
    return Object.keys(keep).length ? keep : DB.get('utm', {});
  } catch (e) { return {}; }
}
utm();
