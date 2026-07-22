import { useState, useEffect, useRef } from 'react';
import BannerSlider from '../components/BannerSlider';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Gallery from '../components/Gallery';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    emoji: '💄',
    title: 'Beauty Parlour Course',
    desc: 'Comprehensive beautician and grooming training equipping women with practical salon skills.',
    accent: 'border-pink-400 bg-pink-50',
  },
  {
    emoji: '✂️',
    title: 'Sewing Machine Course',
    desc: 'Professional garment stitching, cutting, and tailoring classes for women to enable self-employment.',
    accent: 'border-magenta bg-rose-50',
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
    emoji: '🪡',
    title: 'Embroidery & Aari Work',
    desc: 'Traditional and modern decorative embroidery, Aari work, and handicraft creation courses.',
    accent: 'border-purple-400 bg-purple-50',
  },
  {
    emoji: '📚',
    title: 'Library for All Age Groups',
    desc: 'Rich collection of books, storybooks, reference materials, and newspapers open free for children, youth, and adults.',
    accent: 'border-cyan bg-cyan/5',
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
    quote: "Before joining the Read India Center, I could barely sign my name. After completing the Sewing Machine and Aari work course, I now run my own tailoring shop in Kingaon and earn independently.",
    name: 'Smt. Sunita Ramesh Pawar',
    role: 'Sewing & Aari Work Graduate, Kingaon',
    emoji: '👩',
    accent: 'border-magenta',
    tag: "Women's Empowerment",
    tagColor: 'bg-magenta text-white',
  },
  {
    quote: "My daughter attended the Early Childhood Development program and uses the Library daily. The dedicated teachers and peaceful environment have helped her excel in studies.",
    name: 'Shri. Vishnu Mahadev Jadhav',
    role: 'Parent & Community Member, Kingaon',
    emoji: '👨',
    accent: 'border-cyan',
    tag: 'Library & ECD',
    tagColor: 'bg-cyan text-white',
  },
  {
    quote: "Learning the Beauty Parlour Course at the center gave me the confidence and skills to start my own salon services. Shivshakti Pratishthan made this possible for rural women like me.",
    name: 'Kumari Pooja Vilas Shinde',
    role: 'Beauty Parlour Course Graduate, Ahmadpur',
    emoji: '👩‍💼',
    accent: 'border-forest',
    tag: 'Beauty Parlour',
    tagColor: 'bg-forest text-white',
  },
];

const STATS = [
  { num: '1000+', label: 'Women Trained',              emoji: '👩' },
  { num: '1+',    label: 'Active Centers',              emoji: '🏛️' },
  { num: '15+',   label: 'Villages Reached',            emoji: '🌍' },
  { num: '100+',  label: 'Children in ECD Programs',   emoji: '🧒' },
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
    <div className="text-center mb-6">
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-cyan-200' : 'text-cyan'}`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-2 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl mx-auto text-sm sm:text-base ${light ? 'text-cyan-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-cyan" />
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReadIndia() {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <main>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="readindia-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-[#0e7490] via-cyan to-[#0891b2] py-8 sm:py-10 flex items-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="relative z-10 animate-fadeInUp max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white text-center">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1 text-xs sm:text-sm mb-3">
            <span className="text-lg">📚</span>
            Shivshakti GramVikas Pratishthan
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-md">
            A Library That <span className="text-white drop-shadow-lg">Empowers a</span>{' '}
            <span className="text-navy font-black drop-shadow-lg">Whole Community</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-cyan-50 leading-relaxed mb-5">
            The Read India Center is a community-led library and resource hub offering
            literacy, digital skills, early childhood programmes, and livelihood training.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#centers"
              id="ri-visit-btn"
              className="px-6 py-2.5 rounded-full bg-white text-cyan font-bold text-sm shadow-lg hover:bg-cyan-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Visit a Center
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {STATS.map(({ num, label, emoji }) => (
              <div key={label} className="bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20">
                <p className="text-xl mb-0.5">{emoji}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-white">{num}</p>
                <p className="text-[11px] sm:text-xs text-cyan-100 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BannerSlider pageId="readindia" />
      {/* ── 2. About the Center ─────────────────────────────────────────────────────────── */}
      <section id="about-readindia" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
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
                The <strong className="text-navy">Read India Center</strong> under Shivshakti GramVikas Pratishthan
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
      <section id="services" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
      <section id="womens-program" className="py-10 px-4 sm:px-6 lg:px-8 bg-rose-50">
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
      <section id="centers" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
      <section id="stories" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
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
      <section id="impact" className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-[#0f2d4a] to-[#0e7490]">
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
