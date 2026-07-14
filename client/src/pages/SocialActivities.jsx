import { useState, useEffect, useRef } from 'react';
import Gallery from '../components/Gallery';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_TABS = [
  { href: '#tree-plantation', label: 'Tree Plantation',      emoji: '🌳' },
  { href: '#varkari',         label: 'Varkari Shikshan',     emoji: '🙏' },
  { href: '#saptah',          label: 'सप्ताह (Saptah)',      emoji: '🥁' },
  { href: '#other-programs',  label: 'Other Programs',        emoji: '✨' },
];

const DEFAULT_PLANTATIONS = [
  { date: 'Upcoming', location: 'Location TBD', trees: '500+', species: 'Neem, Peepal, Banyan', emoji: '??', bg: 'from-green-400 to-emerald-600', note: 'Details to be added.' },
  { date: 'Upcoming', location: 'Location TBD', trees: '200+', species: 'Mango, Amla', emoji: '??', bg: 'from-teal-400 to-teal-700', note: 'Details to be added.' },
  { date: 'Upcoming', location: 'Location TBD', trees: '100+', species: 'Custard Apple, Neem', emoji: '??', bg: 'from-lime-400 to-green-600', note: 'Details to be added.' },
];

const DEFAULT_VARKARI = [
  { emoji: '??', title: 'Educational Support', subtitle: 'Sant Sahitya Studies', desc: 'Supporting students of Varkari Shikshan Sanstha in accessing Sant literature.' },
  { emoji: '??', title: 'Community Outreach', subtitle: 'Kirtan & Bhajan', desc: 'Organizing Kirtan and Bhajan sessions in villages to spread Varkari values.' },
  { emoji: '??', title: 'Development Support', subtitle: 'Infrastructure', desc: 'Providing infrastructure support to Varkari Shikshan Sanstha study centres.' },
];

const DEFAULT_SAPTAH = [
  { time: 'Morning', activity: 'Bhajan & Dindi', emoji: '??', desc: 'Morning procession through the village.' },
  { time: 'Afternoon', activity: 'Pravachan', emoji: '??', desc: 'Discourse on the teachings of Saints.' },
  { time: 'Evening', activity: 'Kirtan', emoji: '??', desc: 'Extended Kirtan sessions.' },
];

const DEFAULT_PROGRAMS = [
  { emoji: '??', title: 'Free Health Camp', desc: 'Periodic free health check-up camps organized in villages.', color: 'from-blue-50 to-sky-100 border-blue-200', dot: 'bg-navy' },
  { emoji: '??', title: 'Water Conservation', desc: 'Community awareness drives on rainwater harvesting.', color: 'from-cyan-50 to-teal-100 border-teal-200', dot: 'bg-teal-500' },
  { emoji: '?????', title: 'Women Awareness', desc: 'Programmes promoting girl child education.', color: 'from-rose-50 to-pink-100 border-rose-200', dot: 'bg-magenta' },
];

const DEFAULT_STATS = [
  { num: '5000+', label: 'Trees Planted', emoji: '??' },
  { num: '10+', label: 'Saptah Events', emoji: '??' },
  { num: '50+', label: 'Villages Reached', emoji: '??' },
  { num: '200+', label: 'Students Supported', emoji: '??' },
  { num: '10k+', label: 'Lives Touched', emoji: '??' },
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

// ─── Lightbox logic removed ───────────────────────────────────────────────────

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SocialActivities() {
  const [activeTab,      setActiveTab]      = useState(NAV_TABS[0].href);
  const [plantations, setPlantations] = useState([]);
  const [varkari, setVarkari] = useState([]);
  const [saptah, setSaptah] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pSnap = await getDocs(collection(db, 'soc_plantations'));
        setPlantations(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const vSnap = await getDocs(collection(db, 'soc_varkari'));
        setVarkari(vSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const sSnap = await getDocs(collection(db, 'soc_saptah'));
        setSaptah(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const prSnap = await getDocs(collection(db, 'soc_programs'));
        setPrograms(prSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const stSnap = await getDocs(collection(db, 'soc_stats'));
        setStats(stSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

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
            
          </div>

          {/* 5 quick stats */}
          <div className="mt-14 grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {(stats.length > 0 ? stats : DEFAULT_STATS).map(({ num, label, emoji }, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/10">
                <p className="text-xl mb-0.5">{emoji}</p>
                <p className="text-xl font-extrabold text-white">{num}</p>
                <p className="text-xs text-green-200 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Activity Category Nav ──────────────────────────────────────── */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-3">
            {NAV_TABS.map(({ href, label, emoji }) => (
              <a
                key={href}
                href={href}
                onClick={() => setActiveTab(href)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider
                            whitespace-nowrap transition-all duration-200 ${
                  activeTab === href
                    ? 'bg-forest text-white shadow-lg shadow-green-700/25 -translate-y-0.5'
                    : 'text-gray-500 hover:bg-slate-50 hover:text-forest'
                }`}
              >
                <span>{emoji}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 2. Tree Plantation ─────────────────────────────────────────────── */}
      <section id="tree-plantation" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="पर्यावरण उपक्रम"
            title="Tree Plantation Drives"
            subtitle="Growing a greener Maharashtra — one village, one tree at a time."
          />

          {/* Drive cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {(plantations.length > 0 ? plantations : DEFAULT_PLANTATIONS).map(({ date, location, trees, species, emoji, bg, note }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col
                                     hover:shadow-2xl hover:border-forest/30 hover:-translate-y-1.5 transition-all duration-350 group cursor-default">
                {/* Photo placeholder */}
                <div className={`relative h-40 bg-gradient-to-br ${bg || 'from-green-400 to-emerald-600'} flex items-center justify-center`}>
                  {/* Backdrop subtle glow */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-350">{emoji}</span>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">{date}</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3.5 flex-1">
                  {/* Location */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-forest mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="text-sm font-extrabold text-navy leading-snug">{location}</p>
                  </div>

                  {/* Trees count */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-forest leading-none"
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #047857)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}>{trees}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">trees planted</span>
                  </div>

                  {/* Species tags */}
                  {species && (
                    <div className="flex flex-wrap gap-1.5">
                      {species.split(',').map((s) => (
                        <span key={s} className="px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">{s.trim()}</span>
                      ))}
                    </div>
                  )}

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

      {/* ── 3. Varkari Shikshan & Community Programs ──────────────────────── */}
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
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-amber-900/5 p-6 sm:p-8 mb-10">
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              The <strong className="text-navy">Varkari Sampraday</strong> is one of Maharashtra's most
              profound spiritual and social movements — a living tradition of bhakti rooted in the teachings
              of Santshreshtha Dnyaneshwar Maharaj, Sant Namdev Maharaj, Sant Eknath Maharaj, and
              Jagadguru Sant Tukaram Maharaj. The movement's core philosophy is radical equality:
              <em className="text-saffron font-bold"> "आम्ही वारकरी, भेद नाही कोणाशी"</em> — no caste, no creed, only devotion.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              <strong className="text-navy">Shivshakti GramVikas Pratishtan</strong> actively supports the
              Varkari Shikshan Sanstha — an organisation dedicated to formal spiritual education in the
              Varkari tradition. We provide educational, outreach, and developmental support to its students
              and centres, helping preserve and propagate this sacred tradition across rural Maharashtra.
            </p>
          </div>

          {/* Pull quote */}
          <div className="relative bg-gradient-to-br from-amber-500 to-saffron rounded-3xl p-8 sm:p-10 text-white shadow-2xl mb-10 overflow-hidden group">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
            <div className="absolute -top-4 -left-4 text-[10rem] leading-none text-white/10 font-serif select-none pointer-events-none">"</div>
            <div className="relative text-center">
              <p className="text-xl sm:text-2xl font-black italic leading-relaxed mb-5"
                 style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
                "जे का रंजले गांजले । त्यासी म्हणे जो आपुले ॥
                <br />
                तोचि साधु ओळखावा । देव तेथेचि जाणावा ॥"
              </p>
              <div className="w-16 h-0.5 rounded-full bg-white/30 mx-auto mb-4" />
              <p className="text-orange-100 text-sm font-bold tracking-wide uppercase">
                — Sant Tukaram Maharaj (Abhanga)
              </p>
              <p className="text-orange-200 text-xs mt-1.5 italic font-medium leading-relaxed max-w-lg mx-auto">
                "One who considers the suffering as their own — know that person as a true Saint;
                know that God resides there."
              </p>
            </div>
          </div>

          {/* 3 activity cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {(varkari.length > 0 ? varkari : DEFAULT_VARKARI).map(({ emoji, title, subtitle, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6
                           hover:shadow-xl hover:border-saffron hover:-translate-y-1.5
                           transition-all duration-350 group flex flex-col gap-4 cursor-default"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-md"
                     style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a' }}>
                  {emoji}
                </div>
                <div>
                  <h3 className="font-extrabold text-navy mb-0.5 text-base">{title}</h3>
                  <p className="text-xs font-black text-saffron uppercase tracking-wider mb-2">{subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Saints footer strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { name: 'ह.भ.प मुंजाजी महाराज चाटे ', year: '+91 8600264717' },
              { name: 'मृदंग सम्राट पंडित महाराज दहिफळे',year: '+91 9823309807' },
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

      {/* ── 4. Saptah (Haripath & Akhand Kirtan) ──────────────────────────── */}
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

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 sm:p-8 mb-10 text-violet-100 leading-relaxed text-sm sm:text-base">
            <p className="mb-3">
              The <strong className="text-white">Akhand Harinam Saptah</strong> is a seven-day uninterrupted
              devotional programme where Kirtan, Bhajan, Pravachan, Haripath, and Dindi continue
              around the clock, creating a sacred atmosphere of continuous remembrance of God
              (<em>Hari</em>) in the Varkari tradition.
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
                  {(saptah.length > 0 ? saptah : DEFAULT_SAPTAH).map(({ time, activity, emoji, desc }, i) => (
                    <div key={i} className="relative flex items-start gap-4 pl-12">
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
          </div>
        </div>
      </section>

      {/* ── 5. Other Social Programs ──────────────────────────────────────── */}
      <section id="other-programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="सामाजिक सेवा"
            title="Other Community Programs"
            subtitle="Beyond our three pillars — additional drives that serve the broader community."
          />
          <div className="grid sm:grid-cols-3 gap-5">
            {(programs.length > 0 ? programs : DEFAULT_PROGRAMS).map(({ emoji, title, desc, color, dot }, i) => (
              <div key={i} className={`rounded-2xl border bg-gradient-to-br ${color || 'from-gray-50 to-gray-100 border-gray-200'} p-6 flex flex-col gap-4
                                      hover:shadow-xl hover:border-green-300 hover:-translate-y-1.5 transition-all duration-350 group cursor-default`}>
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block w-fit">{emoji}</span>
                <div>
                  <h3 className="font-extrabold text-navy text-base mb-1.5 leading-tight">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
                <span className={`inline-block self-start mt-auto w-2 h-2 rounded-full ${dot}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery pageId="social" title="Photo Gallery" subtitle="A visual journey of our community outreach and social drives." />

      {/* ── 6. Impact & CTA ───────────────────────────────────────────────── */}
      <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest via-[#0a4f2b] to-navy">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-green-300 mb-10">
            Our Impact — By the Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {(stats.length > 0 ? stats : DEFAULT_STATS).map(({ num, label, emoji }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-2xl p-5 border
                           hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 group cursor-default"
                style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255, 255, 255, 0.12)' }}
              >
                <span className="text-3xl group-hover:scale-115 transition-transform duration-300">{emoji}</span>
                <p className="text-3xl font-black text-white drop-shadow-sm">{num}</p>
                <p className="text-xs text-green-200 text-center leading-snug font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-green-300/40 mt-6 tracking-wide uppercase">
            * All statistics are placeholders — replace with verified programme data.
          </p>
        </div>
      </section>

    </main>
  );
}
