import { useState, useEffect, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANTATION_DRIVES = [
  {
    date: '[DD Month YYYY]',
    location: '[Village Name], [Taluka], [District]',
    trees: 'X+',
    species: ['Neem (कडुलिंब)', 'Peepal (पिंपळ)', 'Amla (आवळा)'],
    emoji: '🌳',
    bg: 'from-green-400 to-emerald-600',
    note: 'Placeholder — Add details of this plantation drive, organising team, community participation, and any partners involved.',
  },
  {
    date: '[DD Month YYYY]',
    location: '[Village Name], [Taluka], [District]',
    trees: 'X+',
    species: ['Neem (कडुलिंब)', 'Mango (आंबा)', 'Banyan (वड)'],
    emoji: '🌿',
    bg: 'from-teal-400 to-teal-700',
    note: 'Placeholder — Add details of this drive including student volunteers, government partnership, and species selection rationale.',
  },
  {
    date: '[DD Month YYYY]',
    location: '[Village Name], [Taluka], [District]',
    trees: 'X+',
    species: ['Amla (आवळा)', 'Custard Apple (सीताफळ)', 'Neem (कडुलिंब)'],
    emoji: '🌱',
    bg: 'from-lime-400 to-green-600',
    note: 'Placeholder — Add details of this seasonal plantation drive on World Environment Day or similar occasion.',
  },
];

const VARKARI_ACTIVITIES = [
  {
    emoji: '📖',
    title: 'Educational Support',
    subtitle: 'Sant Sahitya & Haripath Studies',
    desc: 'Supporting students of Varkari Shikshan Sanstha in accessing Sant literature — Abhangas, Gathas, Haripath, and the Dnyaneshwari — through distribution of study materials, reading sessions, and dedicated learning circles.',
  },
  {
    emoji: '🎵',
    title: 'Community Outreach',
    subtitle: 'Kirtan, Bhajan & Pravachan',
    desc: 'Organizing Kirtan and Bhajan sessions in villages to spread the Varkari values of समता (equality), करुणा (compassion), and अभेद (non-discrimination) — rooted in the teachings of the Sant Parampara.',
  },
  {
    emoji: '🏗️',
    title: 'Development Support',
    subtitle: 'Infrastructure & Resources',
    desc: 'Providing infrastructure support, resource materials, and logistical assistance to Varkari Shikshan Sanstha learners and their study centres — placeholder. Add specific activities here.',
  },
];

const SAPTAH_SCHEDULE = [
  { time: 'Brahma Muhurta\n(4:00 – 6:00 AM)', activity: 'Haripath & Namsmaran', emoji: '🙏', desc: 'Opening chanting of the Haripath composed by Sant Dnyaneshwar Maharaj.' },
  { time: 'Pratah Kal\n(6:00 – 9:00 AM)',   activity: 'Bhajan & Dindi',        emoji: '🥁', desc: 'Morning procession (Dindi) through the village with traditional devotional songs.' },
  { time: 'Purvahn\n(9:00 AM – 12:00 PM)',  activity: 'Pravachan',              emoji: '📿', desc: 'Discourse on the teachings of Sant Dnyaneshwar, Namdev, Eknath, and Tukaram Maharaj.' },
  { time: 'Madhyahn\n(12:00 – 1:00 PM)',    activity: 'Prasad Vitaran',         emoji: '🍽️', desc: 'Community Mahaprasad — open to all attendees regardless of background.' },
  { time: 'Aparahn\n(2:00 – 5:00 PM)',      activity: 'Kirtan',                 emoji: '🎶', desc: 'Extended Kirtan sessions by invited Kirtankars, including narrative storytelling from Sant lives.' },
  { time: 'Sandhya\n(6:00 – 8:00 PM)',      activity: 'Abhang Gayan',           emoji: '🪔', desc: 'Evening Abhang singing — collective recitation of Abhangas by the congregation.' },
  { time: 'Ratri\n(8:00 – 10:00 PM)',       activity: 'Akhand Kirtan',          emoji: '🌙', desc: 'Night session of continuous Kirtan — carrying the devotional atmosphere into the next day.' },
];

const OTHER_PROGRAMS = [
  {
    emoji: '🏥',
    title: 'Free Health Camp',
    desc: 'Periodic free health check-up camps organized in villages — blood pressure, blood sugar, eye checkups, and basic consultations by visiting doctors. Placeholder — add dates and partners.',
    color: 'from-blue-50 to-sky-100 border-blue-200',
    dot: 'bg-navy',
  },
  {
    emoji: '💧',
    title: 'Water Conservation Awareness',
    desc: 'Community awareness drives on rainwater harvesting, borewell recharge, and water-saving practices — particularly before the monsoon season. Placeholder — add specific activities.',
    color: 'from-cyan-50 to-teal-100 border-teal-200',
    dot: 'bg-teal-500',
  },
  {
    emoji: '👩‍🎓',
    title: 'Women & Girl Child Awareness',
    desc: 'Programmes promoting girl child education, prevention of child marriage, and women\'s rights awareness in collaboration with local Panchayats and self-help groups. Placeholder.',
    color: 'from-rose-50 to-pink-100 border-rose-200',
    dot: 'bg-magenta',
  },
];

const GALLERY_ITEMS = [
  { label: 'Tree Plantation Drive — [Village]',  emoji: '🌳', bg: 'from-green-400 to-emerald-600',  category: 'tree' },
  { label: 'Kirtan Sabha at [Village]',           emoji: '🎵', bg: 'from-amber-400 to-orange-600',  category: 'varkari' },
  { label: 'Saptah Dindi Procession',             emoji: '🥁', bg: 'from-rose-400 to-red-700',      category: 'saptah' },
  { label: 'Plantation Drive — [Date]',           emoji: '🌱', bg: 'from-lime-400 to-green-600',    category: 'tree' },
  { label: 'Pravachan Session',                   emoji: '📿', bg: 'from-violet-400 to-purple-700', category: 'varkari' },
  { label: 'Akhand Kirtan — Night Session',       emoji: '🪔', bg: 'from-yellow-500 to-amber-700',  category: 'saptah' },
  { label: 'Free Health Camp',                    emoji: '🏥', bg: 'from-blue-400 to-blue-600',     category: 'other' },
  { label: 'Haripath Study Circle',               emoji: '📖', bg: 'from-teal-400 to-teal-700',     category: 'varkari' },
  { label: 'Saptah Mahaprasad',                   emoji: '🍽️', bg: 'from-orange-400 to-red-600',   category: 'saptah' },
  { label: 'Community Awareness Drive',           emoji: '📢', bg: 'from-gray-400 to-gray-600',     category: 'other' },
];

// NOTE: Replace GALLERY_ITEMS with:
// fetch(`${import.meta.env.VITE_API_URL}/api/gallery?category=SocialActivity`)

const GALLERY_FILTERS = [
  { key: 'all',     label: 'All' },
  { key: 'tree',    label: '🌳 Tree Plantation' },
  { key: 'varkari', label: '🙏 Varkari Programs' },
  { key: 'saptah',  label: '🥁 Saptah' },
  { key: 'other',   label: '✨ Other' },
];

const STATS = [
  { num: 'X+',    label: 'Trees Planted',             emoji: '🌳' },
  { num: 'X+',    label: 'Saptah Events Organized',   emoji: '🙏' },
  { num: 'X+',    label: 'Villages Reached',          emoji: '🌍' },
  { num: 'X+',    label: 'Varkari Students Supported',emoji: '📖' },
  { num: 'X+',    label: 'Lives Touched',             emoji: '❤️' },
];

const VOLUNTEER_OPTIONS = [
  'Tree Plantation Drive',
  'Varkari Shikshan Support',
  'Saptah Seva (Volunteer)',
  'Health Camp Volunteer',
  'Women Empowerment Drive',
  'General Community Volunteer',
];

const NAV_TABS = [
  { href: '#tree-plantation', label: 'Tree Plantation',      emoji: '🌳' },
  { href: '#varkari',         label: 'Varkari Shikshan',     emoji: '🙏' },
  { href: '#saptah',          label: 'सप्ताह (Saptah)',      emoji: '🥁' },
  { href: '#other-programs',  label: 'Other Programs',        emoji: '✨' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ tag, title, subtitle, light = false, accentColor = 'bg-forest' }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-green-200' : 'text-forest'}`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl mx-auto text-sm sm:text-base ${light ? 'text-green-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 mx-auto w-20 h-1 rounded-full ${accentColor}`} />
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white text-navy font-bold flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors" aria-label="Close">✕</button>
        <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.bg} flex flex-col items-center justify-center gap-4 shadow-2xl`}>
          <span className="text-8xl drop-shadow-lg">{item.emoji}</span>
          <span className="text-white font-bold text-lg text-center px-6 drop-shadow-md">{item.label}</span>
          <span className="text-xs text-white/60 italic">[Replace with actual photo]</span>
        </div>
        <p className="text-white/70 text-center text-sm mt-3">{item.label}</p>
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
const validatePhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\s/g, ''));
const validateEmail  = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function VolunteerForm() {
  const INIT = { name: '', phone: '', email: '', activity: '' };
  const [form,      setForm]      = useState(INIT);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name     = 'Full name is required.';
    if (!form.phone.trim())              e.phone    = 'Phone number is required.';
    else if (!validatePhone(form.phone)) e.phone    = 'Enter a valid 10-digit Indian mobile number.';
    if (!form.email.trim())              e.email    = 'Email address is required.';
    else if (!validateEmail(form.email)) e.email    = 'Enter a valid email address.';
    if (!form.activity)                  e.activity = 'Please select an activity.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      console.log('🌿 Social Activities — Volunteer Form:', form);
      setLoading(false);
      setSubmitted(true);
      setForm(INIT);
    }, 800);
  };

  const cls = (f) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 transition-colors ${
      errors[f] ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-forest/40 focus:border-forest'
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-12 gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl shadow">✅</div>
        <h3 className="text-2xl font-extrabold text-navy">जय हरि विठ्ठल! 🙏</h3>
        <p className="text-gray-500 max-w-sm text-sm">Your volunteer registration has been received. Our team will contact you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="mt-2 px-6 py-2.5 rounded-full bg-forest hover:bg-green-800 text-white font-semibold transition-colors">
          Register Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="sa-name" className="text-sm font-semibold text-navy">Full Name <span className="text-red-500">*</span></label>
        <input id="sa-name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} className={cls('name')} />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sa-phone" className="text-sm font-semibold text-navy">Mobile Number <span className="text-red-500">*</span></label>
        <input id="sa-phone" name="phone" type="tel" placeholder="10-digit mobile" value={form.phone} onChange={handleChange} maxLength={10} className={cls('phone')} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sa-email" className="text-sm font-semibold text-navy">Email Address <span className="text-red-500">*</span></label>
        <input id="sa-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} className={cls('email')} />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sa-activity" className="text-sm font-semibold text-navy">I want to participate in <span className="text-red-500">*</span></label>
        <select id="sa-activity" name="activity" value={form.activity} onChange={handleChange} className={cls('activity')}>
          <option value="">— Select activity —</option>
          {VOLUNTEER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {errors.activity && <p className="text-xs text-red-500">{errors.activity}</p>}
      </div>
      <div className="sm:col-span-2">
        <button id="sa-volunteer-submit" type="submit" disabled={loading}
          className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-forest hover:bg-green-800 disabled:opacity-60 text-white font-bold text-base shadow-lg shadow-green-800/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
          {loading ? (
            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Submitting…</>
          ) : 'Register as Volunteer →'}
        </button>
        <p className="mt-2 text-xs text-gray-400">* All fields required. We respond within 24 hours.</p>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SocialActivities() {
  const [galleryFilter,  setGalleryFilter]  = useState('all');
  const [lightboxItem,   setLightboxItem]   = useState(null);
  const [activeTab,      setActiveTab]      = useState(NAV_TABS[0].href);

  const filteredGallery = galleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === galleryFilter);

  // Highlight active tab on scroll
  useEffect(() => {
    const sectionIds = NAV_TABS.map((t) => t.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab('#' + entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="social-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-forest via-[#0a4f2b] to-navy min-h-[85vh] flex items-center"
      >
        {/* Logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] !opacity-0">
          <img src="/logo.png" alt="" className="w-[60vmin] h-[60vmin] object-contain !w-[400px] !h-[400px]" aria-hidden="true" />
        </div>
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 animate-fadeInUp max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            Shivshakti GramVikas Pratishtan — सामाजिक उपक्रम
          </div>

          {/* Marathi tagline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-3 drop-shadow-lg"
              style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}>
            एकच ध्यास...
            <br />
            <span className="text-saffron">सर्वांगिण विकास</span>
          </h1>

          {/* English subtitle */}
          <p className="text-lg sm:text-xl text-green-200 italic mb-3">
            "One Goal... All-Round Development"
          </p>
          <p className="text-base text-green-100 mb-10 max-w-xl mx-auto">
            Rooted in Faith, Committed to Community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tree-plantation"
              className="px-8 py-3.5 rounded-full bg-saffron hover:bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5">
              Explore Our Activities
            </a>
            <a href="#volunteer-form"
              className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold transition-all duration-200 hover:-translate-y-0.5">
              Volunteer With Us 🙏
            </a>
          </div>

          {/* 5 quick stats */}
          <div className="mt-14 grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {STATS.map(({ num, label, emoji }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/10">
                <p className="text-xl mb-0.5">{emoji}</p>
                <p className="text-xl font-extrabold text-white">{num}</p>
                <p className="text-[10px] text-green-200 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Activity Category Nav ──────────────────────────────────────── */}
      <nav className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-2">
            {NAV_TABS.map(({ href, label, emoji }) => (
              <a
                key={href}
                href={href}
                onClick={() => setActiveTab(href)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                  activeTab === href
                    ? 'bg-forest text-white shadow'
                    : 'text-gray-500 hover:bg-green-50 hover:text-forest'
                }`}
              >
                <span>{emoji}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 3. Tree Plantation Drives ─────────────────────────────────────── */}
      <section id="tree-plantation" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="पर्यावरण उपक्रम"
            title="Tree Plantation Drives"
            subtitle="Growing a greener Maharashtra — one village, one tree at a time."
          />

          {/* Cumulative counter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow border border-green-100 px-8 py-5 text-center">
              <p className="text-4xl font-extrabold text-forest">X+</p>
              <p className="text-sm text-gray-500 mt-1">Trees Planted in Total</p>
            </div>
            <div className="text-3xl text-gray-300 font-thin hidden sm:block">|</div>
            <div className="bg-white rounded-2xl shadow border border-green-100 px-8 py-5 text-center">
              <p className="text-4xl font-extrabold text-forest">Y+</p>
              <p className="text-sm text-gray-500 mt-1">Villages Covered</p>
            </div>
            <div className="text-3xl text-gray-300 font-thin hidden sm:block">|</div>
            <div className="bg-white rounded-2xl shadow border border-green-100 px-8 py-5 text-center">
              <p className="text-4xl font-extrabold text-forest">Z+</p>
              <p className="text-sm text-gray-500 mt-1">Species Planted</p>
            </div>
          </div>

          {/* Drive cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {PLANTATION_DRIVES.map(({ date, location, trees, species, emoji, bg, note }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
                {/* Photo placeholder */}
                <div className={`relative h-40 bg-gradient-to-br ${bg} flex items-center justify-center`}>
                  <span className="text-7xl drop-shadow-lg">{emoji}</span>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2">
                    <p className="text-white text-xs font-semibold">{date}</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-forest mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="text-sm font-semibold text-navy">{location}</p>
                  </div>

                  {/* Trees count */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-forest">{trees}</span>
                    <span className="text-sm text-gray-500">trees planted</span>
                  </div>

                  {/* Species tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {species.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-medium">{s}</span>
                    ))}
                  </div>

                  {/* Note */}
                  <p className="text-gray-400 text-xs leading-relaxed italic flex-1">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            * All drive details are placeholders — replace with actual event data, photos, and statistics.
          </p>
        </div>
      </section>

      {/* ── 4. Varkari Shikshan Sanstha ───────────────────────────────────── */}
      <section id="varkari" className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          {/* Special heading with saffron accent */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
              आध्यात्मिक शिक्षण सहाय्य
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
              Varkari Shikshan Sanstha Support
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Supporting the spiritual and educational mission of the Varkari Sampraday —
              rooted in the bhakti tradition of Saints Dnyaneshwar, Namdev, Eknath, and Tukaram Maharaj.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
          </div>

          {/* About text */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 sm:p-8 mb-10">
            <p className="text-gray-600 leading-relaxed mb-4">
              The <strong className="text-navy">Varkari Sampraday</strong> is one of Maharashtra's most
              profound spiritual and social movements — a living tradition of bhakti rooted in the teachings
              of Santshreshtha Dnyaneshwar Maharaj, Sant Namdev Maharaj, Sant Eknath Maharaj, and
              Jagadguru Sant Tukaram Maharaj. The movement's core philosophy is radical equality:
              <em> "आम्ही वारकरी, भेद नाही कोणाशी"</em> — no caste, no creed, only devotion.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-navy">Shivshakti GramVikas Pratishtan</strong> actively supports the
              Varkari Shikshan Sanstha — an organisation dedicated to formal spiritual education in the
              Varkari tradition. We provide educational, outreach, and developmental support to its students
              and centres, helping preserve and propagate this sacred tradition across rural Maharashtra.
            </p>
          </div>

          {/* Pull quote */}
          <div className="relative bg-gradient-to-br from-amber-500 to-saffron rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 overflow-hidden">
            <div className="absolute -top-4 -left-4 text-[10rem] leading-none text-white/10 font-serif select-none pointer-events-none">"</div>
            <div className="relative text-center">
              <p className="text-xl sm:text-2xl font-semibold italic leading-relaxed mb-4"
                 style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
                "जे का रंजले गांजले । त्यासी म्हणे जो आपुले ॥
                <br />
                तोचि साधु ओळखावा । देव तेथेचि जाणावा ॥"
              </p>
              <div className="w-12 h-0.5 rounded-full bg-white/40 mx-auto mb-3" />
              <p className="text-orange-100 text-sm font-medium">
                — Sant Tukaram Maharaj (Abhanga)
              </p>
              <p className="text-orange-200 text-xs mt-1 italic">
                "One who considers the suffering as their own — know that person as a true Saint;
                know that God resides there."
              </p>
            </div>
          </div>

          {/* 3 activity cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {VARKARI_ACTIVITIES.map(({ emoji, title, subtitle, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 hover:shadow-lg hover:border-saffron transition-all duration-200 group flex flex-col gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {emoji}
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-0.5">{title}</h3>
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">{subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Saints footer strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { name: 'Sant Dnyaneshwar Maharaj', year: '1275–1296' },
              { name: 'Sant Namdev Maharaj',      year: '1270–1350' },
              { name: 'Sant Eknath Maharaj',       year: '1533–1599' },
              { name: 'Sant Tukaram Maharaj',      year: '1608–1650' },
            ].map(({ name, year }) => (
              <div key={name} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-amber-100 shadow-sm">
                <span className="text-saffron">🙏</span>
                <div>
                  <p className="text-xs font-bold text-navy leading-none">{name}</p>
                  <p className="text-[10px] text-gray-400">{year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Saptah (सप्ताह) ────────────────────────────────────────────── */}
      <section id="saptah" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1e0a2e] scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-300 mb-2">
              भक्ती महोत्सव
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              अखंड हरिनाम सप्ताह
              <span className="block text-lg font-semibold text-violet-300 mt-1">
                Akhand Harinam Saptah — 7-Day Devotional Programme
              </span>
            </h2>
            <p className="text-violet-200 max-w-2xl mx-auto text-sm sm:text-base">
              An unbroken seven-day devotional programme rooted in the Varkari tradition —
              open to all, uniting the community in bhakti, seva, and spiritual fellowship.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-violet-500" />
          </div>

          {/* About paragraph */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 sm:p-8 mb-10 text-violet-100 leading-relaxed text-sm sm:text-base">
            <p className="mb-3">
              The <strong className="text-white">Akhand Harinam Saptah</strong> is a seven-day uninterrupted
              devotional programme where Kirtan, Bhajan, Pravachan, Haripath, and Dindi continue
              around the clock, creating a sacred atmosphere of continuous remembrance of God
              (<em>Hari</em>) in the Varkari tradition.
            </p>
            <p>
              Shivshakti GramVikas Pratishtan organises and supports the Saptah in villages across
              our region, ensuring that this tradition reaches every home — regardless of caste, class,
              or creed, as commanded by the Varkari Sampraday itself.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Daily schedule timeline */}
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-sm">📅</span>
                Daily Schedule (Each of 7 Days)
              </h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-600 to-violet-900" />
                <div className="space-y-5">
                  {SAPTAH_SCHEDULE.map(({ time, activity, emoji, desc }) => (
                    <div key={activity} className="relative flex items-start gap-4 pl-12">
                      {/* Timeline node */}
                      <div className="absolute left-2.5 -translate-x-1/2 w-5 h-5 rounded-full bg-violet-700 border-2 border-violet-400 flex items-center justify-center text-xs z-10">
                        {emoji}
                      </div>
                      <div>
                        <p className="text-violet-300 text-[10px] font-bold uppercase tracking-wide whitespace-pre-line leading-tight">{time}</p>
                        <p className="text-white font-semibold text-sm">{activity}</p>
                        <p className="text-violet-200 text-xs leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: Event details + Who participates */}
            <div className="flex flex-col gap-5">
              {/* Event details card */}
              <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span>📋</span> Event Details — Next Saptah
                </h3>
                <dl className="space-y-3">
                  {[
                    { dt: 'Event Name',        dd: 'अखंड हरिनाम सप्ताह' },
                    { dt: 'Venue',             dd: '[Village / Temple / Ground Name] — Placeholder' },
                    { dt: 'Next Date',         dd: '[Date TBD] — Placeholder' },
                    { dt: 'Duration',          dd: '7 Days (Uninterrupted)' },
                    { dt: 'Chief Kirtankar',   dd: '[Kirtankar Name] — Placeholder' },
                    { dt: 'Organized By',      dd: 'Shivshakti GramVikas Pratishtan' },
                    { dt: 'Entry',             dd: 'Free & Open to All — No Registration Required' },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex items-start gap-2 text-sm">
                      <span className="text-violet-400 font-semibold w-32 shrink-0">{dt}:</span>
                      <span className="text-violet-100">{dd}</span>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Who participates */}
              <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <h3 className="text-white font-bold text-base mb-3">👥 Who Can Participate?</h3>
                <p className="text-violet-200 text-sm leading-relaxed mb-4">
                  The Saptah is open to <strong className="text-white">all villagers, devotees, and families</strong> —
                  without any distinction of caste, religion, or social background, in keeping with the
                  core Varkari philosophy: <em>"विठ्ठलाचे द्वार सर्वांसाठी खुले आहे।"</em>
                </p>
                <div className="flex flex-wrap gap-2">
                  {['All Villagers', 'Devotees & Warkaris', 'Families & Children', 'Youth Groups', 'NGO Volunteers', 'Neighbouring Villages'].map((g) => (
                    <span key={g} className="px-3 py-1 rounded-full bg-violet-800/50 border border-violet-600 text-violet-200 text-xs font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Register CTA */}
              <div className="bg-gradient-to-br from-violet-700 to-purple-900 rounded-2xl p-6 border border-violet-500 shadow-xl">
                <h3 className="text-white font-bold text-base mb-2">🙏 Join the Saptah Seva</h3>
                <p className="text-violet-200 text-sm mb-4">
                  Register as a volunteer to help with organisation, prasad distribution, Dindi coordination, or logistics.
                </p>
                <a href="#volunteer-form"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-saffron hover:bg-orange-500 text-white font-bold text-sm transition-colors shadow">
                  Register / Join Seva →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Other Community Programs ───────────────────────────────────── */}
      <section id="other-programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="सामाजिक सेवा"
            title="Other Community Programs"
            subtitle="Beyond our three pillars — additional drives that serve the broader community."
          />
          <div className="grid sm:grid-cols-3 gap-5">
            {OTHER_PROGRAMS.map(({ emoji, title, desc, color, dot }) => (
              <div key={title} className={`rounded-2xl border bg-gradient-to-br ${color} p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group`}>
                <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{emoji}</span>
                <div>
                  <h3 className="font-bold text-navy text-base mb-1.5">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
                <span className={`inline-block self-start mt-auto w-2 h-2 rounded-full ${dot}`} />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">
            * Program descriptions are placeholders — add specific dates, partners, and outcomes.
          </p>
        </div>
      </section>

      {/* ── 7. Photo Gallery with Filter Tabs + Lightbox ──────────────────── */}
      <section id="sa-gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="आमचे क्षण"
            title="Photo Gallery"
            subtitle="Glimpses from our plantation drives, devotional programmes, and community services."
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {GALLERY_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setGalleryFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  galleryFilter === key
                    ? 'bg-forest text-white shadow'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-forest hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredGallery.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightboxItem(item)}
                className={`relative ${i % 5 === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-square'} rounded-2xl bg-gradient-to-br ${item.bg} overflow-hidden group focus:outline-none focus:ring-2 focus:ring-forest`}
                aria-label={`View: ${item.label}`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl drop-shadow">{item.emoji}</span>
                </div>
                {/* Hover reveal caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-white text-xs font-semibold leading-tight">{item.label}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-10">No photos in this category yet.</p>
          )}
          <p className="text-center text-xs text-gray-400 mt-4">
            * Placeholder images — replace with actual event photos from each activity. Click any image to enlarge.<br />
            API note: When backend is ready, fetch from <code className="bg-gray-100 px-1 rounded">GET /api/gallery?category=SocialActivity</code>
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}

      {/* ── 8. Impact Statistics Band ─────────────────────────────────────── */}
      <section id="impact" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest via-[#0a4f2b] to-navy">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-green-300 mb-8">
            Our Impact — By the Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {STATS.map(({ num, label, emoji }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
                <span className="text-3xl">{emoji}</span>
                <p className="text-3xl font-extrabold text-white">{num}</p>
                <p className="text-xs text-green-200 text-center leading-tight">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-green-400/60 mt-5 italic">
            * All statistics are placeholders — replace with verified programme data.
          </p>
        </div>
      </section>

      {/* ── 9. Volunteer Sign-up Form ─────────────────────────────────────── */}
      <section id="volunteer-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            tag="सहभागी व्हा"
            title="Volunteer Sign-up"
            subtitle="Join hands with us — every helping hand makes the community stronger."
          />

          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-10">
            <div className="h-1.5 w-24 rounded-full bg-forest mb-8" />
            <VolunteerForm />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-400 text-sm">Or contact us directly:</p>
            <a href="tel:+910000000000"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 border border-forest/30 text-forest font-semibold text-sm hover:bg-forest hover:text-white transition-colors">
              📞 +91 00000 00000
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
