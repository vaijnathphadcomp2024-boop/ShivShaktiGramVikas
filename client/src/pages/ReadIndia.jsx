import { useState, useEffect, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    emoji: '📚',
    title: 'Literacy & Education',
    desc: 'Functional literacy classes for children, youth, and adults — reading, writing, and numeracy in Marathi, Hindi, and English.',
    accent: 'border-cyan bg-cyan/5',
  },
  {
    emoji: '💻',
    title: 'Digital & ICT Skills',
    desc: 'Hands-on computer literacy, internet usage, and digital financial services training for youth and adults.',
    accent: 'border-blue-400 bg-blue-50',
  },
  {
    emoji: '🧒',
    title: 'Early Childhood Development',
    desc: 'Structured play-based programmes for children aged 3–6, preparing them for formal schooling.',
    accent: 'border-saffron bg-orange-50',
  },
  {
    emoji: '👩‍🦰',
    title: "Women's Empowerment & Livelihood",
    desc: 'Vocational training, micro-enterprise support, and financial literacy to help women build independent livelihoods.',
    accent: 'border-magenta bg-rose-50',
  },
  {
    emoji: '🎯',
    title: 'Youth Programs',
    desc: 'Career guidance, competitive exam coaching, spoken English, and leadership workshops for teenagers and young adults.',
    accent: 'border-forest bg-green-50',
  },
];

const WOMENS_PROGRAM = [
  {
    emoji: '🔒',
    title: 'Safe Space',
    desc: "A private, dedicated section within each center where women and girls attend classes and receive personal guidance in a fully secure environment — free from social pressure or discomfort.",
  },
  {
    emoji: '🧵',
    title: 'Vocational & Livelihood Skills',
    desc: 'Practical training in tailoring, handicrafts, embroidery, and other regionally relevant skills — tailored to local resources and market demand to ensure viable livelihoods.',
  },
  {
    emoji: '🏪',
    title: 'Micro-Enterprise Support',
    desc: "Helping trained women turn their skills into small businesses — covering basics of pricing, branding, local marketing, and accessing government schemes.",
  },
  {
    emoji: '💰',
    title: 'Financial & Functional Literacy',
    desc: 'Practical money management, savings habits, and basic accounting for semi-literate or illiterate women, delivered through visual and activity-based methods.',
  },
  {
    emoji: '🌟',
    title: 'Leadership Recognition — Women Achievers Day',
    desc: "An annual celebration honoring local women who've overcome barriers to become community mentors and role models — inspiring the next generation of leaders.",
  },
  {
    emoji: '🩺',
    title: 'Health & Well-being Awareness',
    desc: 'Practical sessions on maternal health, menstrual hygiene, nutrition, and child health — delivered by local health workers in a comfortable, women-only setting.',
  },
];

const GALLERY_ITEMS = [
  { label: 'Literacy Class in Session',       emoji: '📖', bg: 'from-cyan-400 to-cyan-600' },
  { label: 'Vocational Training — Tailoring', emoji: '🧵', bg: 'from-rose-400 to-pink-600' },
  { label: 'Early Childhood Programme',        emoji: '🧒', bg: 'from-orange-300 to-amber-500' },
  { label: "Women's Leadership Day",           emoji: '🌟', bg: 'from-purple-400 to-purple-600' },
  { label: 'Digital Skills Training',          emoji: '💻', bg: 'from-blue-400 to-blue-600' },
  { label: 'Community Library',                emoji: '📚', bg: 'from-teal-400 to-teal-600' },
  { label: 'Health Awareness Session',         emoji: '🩺', bg: 'from-green-400 to-emerald-600' },
  { label: 'Youth Career Workshop',            emoji: '🎓', bg: 'from-indigo-400 to-indigo-600' },
];

// NOTE: When the API is ready, replace GALLERY_ITEMS with:
// const [gallery, setGallery] = useState([]);
// useEffect(() => {
//   fetch(`${import.meta.env.VITE_API_URL}/api/gallery?category=ReadIndia`)
//     .then(r => r.json()).then(d => setGallery(d.data));
// }, []);

const CENTERS = [
  {
    name: '[Center Name 1]',
    location: '[Village], [Taluka], [District]',
    days: 'Monday – Saturday',
    timings: '8:00 AM – 12:00 PM & 3:00 PM – 6:00 PM',
    programs: ['Literacy', 'Digital Skills', "Women's Program"],
  },
  {
    name: '[Center Name 2]',
    location: '[Village], [Taluka], [District]',
    days: 'Monday – Friday',
    timings: '9:00 AM – 1:00 PM',
    programs: ['Early Childhood', 'Literacy', 'Youth Programs'],
  },
  {
    name: '[Center Name 3]',
    location: '[Village], [Taluka], [District]',
    days: 'Tuesday, Thursday & Saturday',
    timings: '10:00 AM – 2:00 PM',
    programs: ["Women's Program", 'Vocational Training'],
  },
];

const TESTIMONIALS = [
  {
    quote: "Before joining the Read India Center, I could barely sign my own name. Today I run a small tailoring business from home and keep my own accounts. The center changed my life completely.",
    name: 'Smt. [Name], [Village]',
    role: "Women's Livelihood Program Graduate",
    emoji: '👩',
    accent: 'border-magenta',
    tag: "Women's Program",
    tagColor: 'bg-magenta text-white',
  },
  {
    quote: "My son was struggling with reading before he joined the Early Childhood Programme here. Within six months he could read full sentences. The teachers here are so dedicated and patient.",
    name: 'Shri. [Name], [Village]',
    role: 'Parent of Early Childhood Graduate',
    emoji: '👨',
    accent: 'border-cyan',
    tag: 'ECD Program',
    tagColor: 'bg-cyan text-white',
  },
  {
    quote: "I learned computer basics and mobile banking at the Digital Skills class. Now I help other villagers with their online government applications. This center gave me confidence I never had.",
    name: 'Kumari [Name], [Village]',
    role: 'Digital Skills Program, Batch [Year]',
    emoji: '👩‍💻',
    accent: 'border-forest',
    tag: 'Digital Skills',
    tagColor: 'bg-forest text-white',
  },
];

const STATS = [
  { num: 'X+',  label: 'Women Trained',              emoji: '👩' },
  { num: 'X',   label: 'Active Centers',              emoji: '🏛️' },
  { num: 'X+',  label: 'Villages Reached',            emoji: '🌍' },
  { num: 'X+',  label: 'Children in ECD Programs',   emoji: '🧒' },
];

const INTERESTS = [
  "Join Women's Program",
  'Enroll My Child (Early Childhood)',
  'Literacy / Digital Skills Classes',
  'Youth Programs',
  'Volunteer with Us',
  'Partner / Donate',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ tag, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-cyan-200' : 'text-cyan'}`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl mx-auto text-sm sm:text-base ${light ? 'text-cyan-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-cyan" />
    </div>
  );
}

// ─── Animated counter ──────────────────────────────────────────────────────────
function CounterCard({ num, label, emoji }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
      <span className="text-3xl">{emoji}</span>
      <p className="text-3xl sm:text-4xl font-extrabold text-cyan">{num}</p>
      <p className="text-xs sm:text-sm text-blue-200 text-center">{label}</p>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white text-navy font-bold flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Enlarged image placeholder */}
        <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.bg} flex flex-col items-center justify-center gap-4 shadow-2xl`}>
          <span className="text-8xl drop-shadow-lg">{item.emoji}</span>
          <span className="text-white font-bold text-lg text-center px-6 drop-shadow-md">
            {item.label}
          </span>
          <span className="text-xs text-white/60 italic">
            [Replace with actual photo]
          </span>
        </div>

        <p className="text-white/70 text-center text-sm mt-3">{item.label}</p>
      </div>
    </div>
  );
}

// ─── Form validation ───────────────────────────────────────────────────────────

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReadIndia() {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <main>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="readindia-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-[#0e7490] via-cyan to-[#0891b2] min-h-[80vh] flex items-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-navy/30 blur-3xl pointer-events-none" />
        {/* Floating shapes */}
        <div className="absolute top-12 left-8 w-10 h-10 rounded-full bg-white/10 animate-bounce" style={{ animationDuration: '3.2s' }} />
        <div className="absolute bottom-20 right-12 w-6 h-6 rounded-full bg-white/15 animate-bounce" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 rounded-full bg-magenta/40 animate-bounce" style={{ animationDuration: '1.9s' }} />

        <div className="relative z-10 animate-fadeInUp max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="text-xl">📚</span>
            Shivshakti GramVikas Pratishtan
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-md">
            A Library That<br />
            <span className="text-white drop-shadow-lg">Empowers a</span>{' '}
            <span className="text-navy font-black drop-shadow-lg">Whole Community</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-cyan-50 leading-relaxed mb-10">
            The Read India Center is a community-led library and resource hub offering
            literacy, digital skills, early childhood programmes, and livelihood training
            to children, women, youth, and adults — free of barriers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#centers"
              id="ri-visit-btn"
              className="px-8 py-3.5 rounded-full bg-white text-cyan font-bold shadow-lg hover:bg-cyan-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Visit a Center
            </a>
            <a
              href="#womens-program"
              id="ri-womens-btn"
              className="px-8 py-3.5 rounded-full bg-magenta hover:bg-rose-700 border border-magenta text-white font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-magenta/30"
            >
              Join the Women's Program
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(({ num, label, emoji }) => (
              <div key={label} className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
                <p className="text-2xl mb-0.5">{emoji}</p>
                <p className="text-2xl font-extrabold text-white">{num}</p>
                <p className="text-xs text-cyan-100 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. About the Center ───────────────────────────────────────────── */}
      <section id="about-readindia" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Who We Serve"
            title="About the Read India Center"
            subtitle="More than a library — a living community hub where every person finds the knowledge they need to grow."
          />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text block */}
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                The <strong className="text-navy">Read India Center</strong> under Shivshakti GramVikas Pratishtan
                is a community-managed library and multi-programme resource hub located in the heart
                of rural Maharashtra. It is open to <em>everyone</em> — children, women, youth, and adults —
                regardless of age, education level, or economic background.
              </p>
              <p>
                Our centres offer a wide range of programmes: from foundational literacy for first-time
                learners to advanced digital skills for youth; from early childhood development classes
                for toddlers to vocational training for women seeking independent livelihoods.
              </p>
              <p>
                Since [Year], the center has reached <strong className="text-cyan">X+ people across X villages</strong>,
                creating a ripple effect of empowerment that extends from individual learners to entire families
                and communities.
              </p>

              {/* Audience tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Children (3–14)', 'Adolescent Girls', 'Women & Mothers', 'Youth (15–25)', 'Adult Learners', 'Senior Citizens'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-semibold border border-cyan/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature highlight card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0e7490] to-navy p-8 text-white shadow-2xl">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
              <p className="text-5xl mb-4">🏛️</p>
              <h3 className="text-xl font-extrabold mb-4">What Makes Us Different</h3>
              <ul className="space-y-3">
                {[
                  'Free or heavily subsidised access for all',
                  'Community volunteers run alongside trained staff',
                  'Women-only safe space within every center',
                  'Multi-language resources (Marathi, Hindi, English)',
                  'Linked to government literacy & livelihood schemes',
                  'Mobile library service for remote hamlets',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-cyan-100">
                    <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What We Offer ──────────────────────────────────────────────── */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Our Services"
            title="What We Offer"
            subtitle="Five core programme areas covering every stage of life and learning."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ emoji, title, desc, accent }) => (
              <div
                key={title}
                className={`rounded-2xl border ${accent} p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group bg-white`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{emoji}</span>
                <div>
                  <h3 className="font-bold text-navy text-base mb-1.5">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Women's Empowerment Program ───────────────────────────────── */}
      <section id="womens-program" className="py-16 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          {/* Special heading with magenta accent */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-magenta mb-2">
              Dedicated Programme
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
              Women's Empowerment Program
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base mb-4">
              A comprehensive, women-first initiative offering safe spaces, practical skills, and
              economic independence to women and girls across our villages.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-magenta" />
          </div>

          {/* 6-feature grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {WOMENS_PROGRAM.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-lg hover:border-magenta transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-xl bg-magenta/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shrink-0">
                  {emoji}
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1.5 leading-tight">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="bg-gradient-to-r from-magenta to-rose-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="text-white">
              <h3 className="text-xl font-extrabold mb-1">Ready to Join the Women's Program?</h3>
              <p className="text-rose-100 text-sm">
                Free enrollment — open to all women aged 15 and above from partner villages.
              </p>
            </div>
            <a
              href="#join"
              className="shrink-0 px-7 py-3 rounded-full bg-white text-magenta font-bold hover:bg-rose-50 transition-colors shadow"
            >
              Enroll Now →
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. Photo Gallery (with Lightbox) ─────────────────────────────── */}
      <section id="ri-gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Gallery"
            title="Our Centers in Action"
            subtitle="A glimpse into the learning, laughter, and transformation happening every day."
          />

          {/* NOTE: Replace GALLERY_ITEMS with API data when backend is ready:
              GET /api/gallery?category=ReadIndia → map over response.data */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightboxItem(item)}
                className={`relative ${i === 0 || i === 5 ? 'sm:col-span-2 aspect-video' : 'aspect-square'} rounded-2xl bg-gradient-to-br ${item.bg} overflow-hidden group focus:outline-none focus:ring-2 focus:ring-cyan`}
                aria-label={`View: ${item.label}`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl drop-shadow">{item.emoji}</span>
                </div>
                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-white text-xs font-semibold text-center leading-tight">{item.label}</p>
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
          <p className="text-center text-xs text-gray-400 mt-4">
            * Placeholder images — replace with actual center photos. Click any image to enlarge.
          </p>
        </div>
      </section>

      {/* Lightbox portal */}
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}

      {/* ── 6. Centers & Timings ──────────────────────────────────────────── */}
      <section id="centers" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="Find Us"
            title="Centers & Timings"
            subtitle="Visit us at any of our community centers — all facilities are free of charge."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            {CENTERS.map(({ name, location, days, timings, programs }) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-cyan transition-all duration-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e7490] to-cyan px-5 py-4">
                  <h3 className="text-white font-bold text-base">{name}</h3>
                  <p className="text-cyan-100 text-xs mt-0.5">{location}</p>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Days</p>
                      <p className="text-sm text-navy font-medium">{days}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Timings</p>
                      <p className="text-sm text-navy font-medium">{timings}</p>
                    </div>
                  </div>

                  {/* Program tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {programs.map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan/10 text-cyan font-semibold border border-cyan/20">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            * Location names and timings are placeholders — update with actual center details.
          </p>
        </div>
      </section>

      {/* ── 7. Impact Stories / Testimonials ─────────────────────────────── */}
      <section id="stories" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="Real Stories"
            title="Impact Stories"
            subtitle="In their own words — how the Read India Center changed lives."
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, emoji, accent, tag, tagColor }) => (
              <div
                key={name}
                className={`bg-white rounded-2xl border-l-4 ${accent} shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow`}
              >
                {/* Program tag */}
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${tagColor}`}>
                  {tag}
                </span>

                {/* Quote */}
                <blockquote className="text-gray-600 text-sm leading-relaxed italic flex-1">
                  "{quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shrink-0">
                    {emoji}
                  </div>
                  <div>
                    <p className="text-navy font-bold text-sm leading-tight">{name}</p>
                    <p className="text-gray-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            * All names and quotes are placeholders — replace with real beneficiary stories.
          </p>
        </div>
      </section>

      {/* ── 8. Impact Statistics ──────────────────────────────────────────── */}
      <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-[#0f2d4a] to-[#0e7490]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan mb-2">
              By the Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Impact Statistics</h2>
            <p className="text-blue-200 max-w-xl mx-auto text-sm">
              Every number represents a real life changed — a child who can now read,
              a woman who now earns, a youth who now leads.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-cyan" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => <CounterCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>


    </main>
  );
}
