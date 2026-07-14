import { useState, useEffect, useRef } from 'react';
import BannerSlider from '../components/BannerSlider';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Gallery from '../components/Gallery';

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

// NOTE: No static gallery items.
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
    <div className="flex flex-col items-center gap-2 rounded-2xl p-6 border
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-350 group cursor-default"
         style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
      <p className="text-3xl sm:text-4xl font-extrabold text-cyan drop-shadow"
         style={{
           background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
           backgroundClip: 'text',
         }}>{num}</p>
      <p className="text-xs sm:text-sm text-blue-200 text-center font-medium mt-0.5">{label}</p>
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

      <BannerSlider pageId="readindia" />

      {/* ── 2. About the Center ─────────────────────────────────────────────────────────── */}
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
                className={`rounded-2xl border ${accent} p-6 flex flex-col gap-4
                            hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350
                            group bg-white`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block w-fit">{emoji}</span>
                <div>
                  <h3 className="font-extrabold text-navy text-base mb-1.5 leading-tight">{title}</h3>
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
                className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 flex flex-col gap-4
                           hover:shadow-xl hover:border-magenta hover:-translate-y-1.5
                           transition-all duration-350 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shrink-0"
                     style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: '1px solid #fbcfe8' }}>
                  {emoji}
                </div>
                <div>
                  <h3 className="font-extrabold text-navy mb-1.5 leading-tight text-base">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-magenta to-rose-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="text-white">
              <p className="text-rose-100 text-sm">
              </p>
            </div>
            <a
              href="#join"
              className="shrink-0 px-7 py-3 rounded-full bg-white text-magenta font-bold hover:bg-rose-50 transition-colors shadow"
            >
            </a>
          </div>
        </div>
      </section>
  
      <Gallery pageId="readindia" title="Our Centers in Action" subtitle="Glimpses of learning, engagement and community building across Read India." />
  

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
                className="bg-white rounded-2xl border border-slate-100 shadow-sm
                           hover:shadow-xl hover:border-cyan hover:-translate-y-1.5
                           transition-all duration-350 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e7490] to-cyan px-5 py-4">
                  <h3 className="text-white font-extrabold text-base leading-tight">{name}</h3>
                  <p className="text-cyan-100 text-xs mt-1 leading-relaxed">{location}</p>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan/15 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Days</p>
                      <p className="text-sm text-navy font-semibold">{days}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan/15 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Timings</p>
                      <p className="text-sm text-navy font-semibold leading-snug">{timings}</p>
                    </div>
                  </div>

                  {/* Program tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-50">
                    {programs.map((p) => (
                      <span key={p} className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan/10 text-cyan font-bold border border-cyan/20">
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
                className={`bg-white rounded-2xl border-l-4 ${accent} shadow-md p-6 flex flex-col gap-4
                            hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350`}
              >
                {/* Program tag */}
                <span className={`self-start text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tagColor} shadow-sm`}>
                  {tag}
                </span>

                {/* Quote */}
                <blockquote className="text-gray-600 text-sm leading-relaxed italic flex-1">
                  "{quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {emoji}
                  </div>
                  <div>
                    <p className="text-navy font-extrabold text-sm leading-tight">{name}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-none">{role}</p>
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
