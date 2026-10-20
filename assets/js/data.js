/* Speedioo — static data for the front-end build.
   In production this comes from ERPNext (Item / Vehicle doctypes) through the API layer in api.js.
   Media: free-licence photos and videos from Pexels (pexels.com/license). Replace with Speedioo's own
   inspection photos per bike before launch. */

const PEXELS_IMG = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const PEXELS_VIDEO_POSTER = (id, w = 1600) =>
  `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const MEDIA = {
  hero: {
    poster: PEXELS_VIDEO_POSTER(4606791),
    // The browser tries each source in order and falls back to the next if one is missing.
    sources: [
      'https://videos.pexels.com/video-files/4606791/4606791-hd_1920_1080_24fps.mp4',
      'https://videos.pexels.com/video-files/4606791/4606791-uhd_2560_1440_24fps.mp4',
      'https://videos.pexels.com/video-files/5052415/5052415-hd_1920_1080_30fps.mp4'
    ],
    credit: 'Video: Pexels'
  },
  story: {
    poster: 'https://images.pexels.com/videos/9606662/biker-city-girl-on-a-bike-motorcycle-9606662.jpeg?auto=compress&cs=tinysrgb&w=1260',
    sources: ['https://videos.pexels.com/video-files/9606662/9606662-uhd_2560_1440_25fps.mp4'],
    credit: 'Video: Anastasia Shuraeva, Pexels'
  },
  ride: {
    poster: 'https://images.pexels.com/videos/5052415/pexels-photo-5052415.jpeg?auto=compress&cs=tinysrgb&w=1260',
    sources: ['https://videos.pexels.com/video-files/5052415/5052415-hd_1920_1080_30fps.mp4'],
    credit: 'Video: Pavel Danilyuk, Pexels'
  },
  sellHero: 40161972,
  types: { Commuter: 13123543, Cruiser: 2611658, Sports: 7211301, Scooter: 4424018, EV: 26564330 },
  blog: [16330298, 5794270, 27100161, 9481684, 5722508, 32076462]
};

/* onRoad = current new on-road price (city of listing, Oct 2026: BikeWale, Autocar India, Shriram Finance).
   tone = fallback illustration colour if a photo fails to load.
   pos = focal point used when cropping the photo into cards. */
const BIKES = [
  { id: 1,  brand: 'Harley-Davidson', model: 'X440', year: 2025, km: 11861, owners: 1, price: 239000, city: 'Pune', area: 'Wakad', type: 'Cruiser', cc: 440, bhp: 27, nm: 38, tank: 13.5, engine: 'Single-cyl, air-oil cooled', gear: '6-speed', abs: 'Dual-channel', tone: '#1A1717', reg: 'MH-14', added: 2, score: 8.8, photo: 2747793, pos: '50% 60%', onRoad: 282000 },
  { id: 2,  brand: 'Royal Enfield', model: 'Hunter 350', year: 2024, km: 2659, owners: 1, price: 179000, city: 'Pune', area: 'Baner', type: 'Cruiser', cc: 349, bhp: 20.2, nm: 27, tank: 13, engine: 'Single-cyl, air-oil cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#D7141A', reg: 'MH-12', added: 1, score: 9.1, photo: 28965338, pos: '50% 60%', onRoad: 207000 },
  { id: 3,  brand: 'Royal Enfield', model: 'Continental GT 650', year: 2026, km: 2474, owners: 1, price: 440000, city: 'Pune', area: 'Kothrud', type: 'Sports', cc: 648, bhp: 47, nm: 52, tank: 12.5, engine: 'Parallel-twin, air-oil cooled', gear: '6-speed', abs: 'Dual-channel', tone: '#8F0B0F', reg: 'MH-12', added: 3, score: 9.4, photo: 15302003, pos: '50% 55%', onRoad: 458000 },
  { id: 4,  brand: 'Honda', model: "H'ness CB350 DLX", year: 2022, km: 11163, owners: 1, price: 170000, city: 'Pune', area: 'Hadapsar', type: 'Cruiser', cc: 348, bhp: 20.8, nm: 30, tank: 15, engine: 'Single-cyl, air cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#5F5858', reg: 'MH-12', added: 6, score: 8.4, photo: 12680555, pos: '50% 60%', onRoad: 235000 },
  { id: 5,  brand: 'Royal Enfield', model: 'Hunter 350', year: 2026, km: 4733, owners: 1, price: 199000, city: 'Pune', area: 'Aundh', type: 'Cruiser', cc: 349, bhp: 20.2, nm: 27, tank: 13, engine: 'Single-cyl, air-oil cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#1A1717', reg: 'MH-12', added: 4, score: 9.2, photo: 28758293, pos: '50% 60%', onRoad: 207000 },
  { id: 6,  brand: 'Royal Enfield', model: 'Classic 350', year: 2024, km: 7107, owners: 1, price: 220000, city: 'Pune', area: 'Baner', type: 'Cruiser', cc: 349, bhp: 20.2, nm: 27, tank: 13, engine: 'Single-cyl, air-oil cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#8F0B0F', reg: 'MH-12', added: 5, score: 8.9, photo: 36429479, pos: '50% 60%', onRoad: 248000 },
  { id: 7,  brand: 'Honda', model: 'Activa 6G', year: 2021, km: 18400, owners: 2, price: 62000, city: 'Pune', area: 'Pimple Saudagar', type: 'Scooter', cc: 109.5, bhp: 7.7, nm: 8.8, tank: 5.3, engine: 'Single-cyl, air cooled', gear: 'CVT automatic', abs: 'CBS', tone: '#D7141A', reg: 'MH-14', added: 7, score: 7.9, photo: 13119036, pos: '50% 55%', onRoad: 95000 },
  { id: 12, brand: 'Honda', model: 'Shine 125', year: 2022, km: 12040, owners: 1, price: 64000, city: 'Pune', area: 'Kharadi', type: 'Commuter', cc: 123.9, bhp: 10.6, nm: 11, tank: 10.5, engine: 'Single-cyl, air cooled', gear: '5-speed', abs: 'CBS', tone: '#1A1717', reg: 'MH-12', added: 8, score: 8.2, photo: 13123543, pos: '50% 60%', onRoad: 102000 },
  { id: 8,  brand: 'Bajaj', model: 'Pulsar 150', year: 2020, km: 24800, owners: 2, price: 68000, city: 'Delhi', area: 'Rohini', type: 'Commuter', cc: 149.5, bhp: 13.8, nm: 13.3, tank: 15, engine: 'Single-cyl, air cooled', gear: '5-speed', abs: 'Single-channel', tone: '#1A1717', reg: 'DL-8S', added: 2, score: 7.8, photo: 31136865, pos: '50% 60%', onRoad: 139000 },
  { id: 9,  brand: 'TVS', model: 'Apache RTR 160 4V', year: 2022, km: 14200, owners: 1, price: 98000, city: 'Delhi', area: 'Dwarka', type: 'Sports', cc: 159.7, bhp: 17.3, nm: 14.7, tank: 12, engine: 'Single-cyl, oil cooled', gear: '5-speed', abs: 'Single-channel', tone: '#D7141A', reg: 'DL-9C', added: 3, score: 8.5, photo: 38138175, pos: '50% 60%', onRoad: 142000 },
  { id: 10, brand: 'Yamaha', model: 'MT-15 V2', year: 2023, km: 8900, owners: 1, price: 145000, city: 'Bangalore', area: 'HSR Layout', type: 'Sports', cc: 155, bhp: 18.1, nm: 14.1, tank: 10, engine: 'Single-cyl, liquid cooled', gear: '6-speed', abs: 'Dual-channel', tone: '#5F5858', reg: 'KA-01', added: 1, score: 9.0, photo: 17821689, pos: '50% 60%', onRoad: 197000 },
  { id: 11, brand: 'Ather', model: '450X', year: 2023, km: 9600, owners: 1, price: 110000, city: 'Bangalore', area: 'Koramangala', type: 'EV', cc: 0, bhp: 8.6, nm: 26, tank: 0, engine: 'Electric motor, 2.9 kWh battery', gear: 'Single-speed', abs: 'CBS', tone: '#1A1717', reg: 'KA-03', added: 2, score: 8.7, photo: 26564330, pos: '50% 55%', onRoad: 158000 },
  { id: 13, brand: 'Royal Enfield', model: 'Meteor 350', year: 2023, km: 9820, owners: 1, price: 185000, city: 'Delhi', area: 'Laxmi Nagar', type: 'Cruiser', cc: 349, bhp: 20.2, nm: 27, tank: 15, engine: 'Single-cyl, air-oil cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#1A1717', reg: 'DL-7S', added: 1, score: 8.9, photo: 22845706, pos: '50% 60%', onRoad: 229000 },
  { id: 14, brand: 'Royal Enfield', model: 'Classic 350', year: 2022, km: 15400, owners: 1, price: 168000, city: 'Bangalore', area: 'Indiranagar', type: 'Cruiser', cc: 349, bhp: 20.2, nm: 27, tank: 13, engine: 'Single-cyl, air-oil cooled', gear: '5-speed', abs: 'Dual-channel', tone: '#8F0B0F', reg: 'KA-05', added: 4, score: 8.6, photo: 9528459, pos: '50% 60%', onRoad: 267000 }
];
BIKES.forEach(b => { b.name = b.brand + ' ' + b.model; b.slug = (b.name + ' ' + b.year).toLowerCase().replace(/[^a-z0-9]+/g, '-'); });

const CITIES = ['Pune', 'Delhi', 'Bangalore'];
const HUBS = { Pune: 'Baner', Delhi: 'Delhi', Bangalore: 'Bangalore' };
const TYPES = ['Commuter', 'Cruiser', 'Sports', 'Scooter', 'EV'];
const BRANDS_MARQUEE = ['Royal Enfield', 'Honda', 'Bajaj', 'TVS', 'Yamaha', 'Harley-Davidson', 'Ather', 'Hero', 'Suzuki', 'KTM', 'Jawa', 'Triumph'];
const BUDGETS = [['Under ₹1L', 0, 100000], ['₹1L – 1.5L', 100000, 150000], ['₹1.5L – 2L', 150000, 200000], ['₹2L – 3L', 200000, 300000], ['₹3L +', 300000, 500000]];

const GUIDES = [
  { t: 'How to sell a Royal Enfield online', c: 'Selling', m: 4 },
  { t: 'Classic 350 vs Hunter 350: which to buy used?', c: 'Buying', m: 6 },
  { t: 'Yamaha MT-15 used buyer guide', c: 'Buying', m: 5 },
  { t: 'TVS Apache RTR: what to check before you buy', c: 'Buying', m: 5 },
  { t: 'Top 10 questions sellers ask us', c: 'Selling', m: 7 },
  { t: 'Monsoon ghat riding checklist for Pune', c: 'Ownership', m: 4 },
  { t: 'Riding in Delhi’s winter fog: a safety checklist', c: 'Ownership', m: 4 },
  { t: 'Is an EV right for your Bangalore commute?', c: 'Ownership', m: 5 }
];

const HELP = [
  { t: 'Which documents do I need?', a: 'Original RC, valid insurance, PUC, Aadhaar or PAN, and a bank NOC if the bike was on loan.' },
  { t: 'How is the price decided?', a: 'Your estimate is based on model, year, km and condition. The final price is fixed after the free inspection, with no haggling after that.' },
  { t: 'Is there a test ride?', a: 'Yes. Book a free test ride at your home or at our hub.' },
  { t: 'When do I get paid?', a: 'By UPI within 30 minutes of accepting the final offer and signing the documents.' },
  { t: 'Documents needed for RC transfer', a: 'Form 29 and 30 (we prepare them), original RC, insurance, PUC and ID proof of both parties.' }
];

const REVIEWS = [
  { n: 'Taran Kamble', k: 'Sold', m: 'Two-wheeler', txt: 'Seamless and hassle-free sale. Rahul made the transaction smooth and fair.' },
  { n: 'Harshit Wali', k: 'Sold', m: 'Activa', txt: 'Shubham and Rohan supported us through the whole process. Very satisfied.' },
  { n: 'Sukhbir Singh', k: 'Sold', m: 'Bike', txt: 'Quick response and testing. Payment reached my account within 30 minutes.' },
  { n: '[Customer name]', k: 'Bought', m: 'Hunter 350', txt: '[Buyer review from Google, once purchase flow is live]' },
  { n: '[Customer name]', k: 'Bought', m: 'Classic 350', txt: '[Buyer review from Google, once purchase flow is live]' }
];

const CONTACT = { phone: '+91 88532 32885', tel: '+918853232885', wa: '918853232885', email: 'customercare@speedioo.com', address: 'Office No. 404, Icon Tower, Baner Road, Baner (opp. KFC), Pune 411045' };
