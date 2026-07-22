import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import Gallery from '../components/Gallery';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// ─── Dummy notices (replace with API data later) ─────────────────────────────
const NOTICES = [
  'सुरक्षा महाविद्यालय प्रवेश सुरू २०२६-२७ ⬥',
  'वृक्षारोपण उपक्रम — किनगाव, ५ जुलै ⬥',
  'अखंड हरिनाम सप्ताह लवकरच ⬥',
  'रुग्णवाहिका सेवा २४×७ — ९२७२४१८४९६ ⬥',
  'रीड इंडिया केंद्र नवीन बॅच सुरू',
];

// ─── Quick-link cards data ────────────────────────────────────────────────────
const QUICK_LINKS = [
  {
    to: '/pre-school',
    marathi: 'पूर्वप्राथमिक शाळा',
    label: 'Pre School',
    desc: 'Nurturing young minds with a strong foundation in early childhood education.',
    color: 'from-blue-50 to-blue-100 border-blue-200',
    iconBg: 'bg-navy',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
  },
  {
    to: '/read-india',
    marathi: 'रीड इंडिया केंद्र',
    label: 'Read India Center',
    desc: 'Bridging the literacy gap with community-led reading & learning programmes.',
    color: 'from-green-50 to-green-100 border-green-200',
    iconBg: 'bg-forest',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
  },
  {
    to: '/safety-college',
    marathi: 'सुरक्षा महाविद्यालय',
    label: 'Safety College',
    desc: 'Professional training in Fire, Industrial & Construction Safety for youth.',
    color: 'from-orange-50 to-orange-100 border-orange-200',
    iconBg: 'bg-saffron',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    to: '/social-activities',
    marathi: 'सामाजिक उपक्रम',
    label: 'Social Activities',
    desc: 'Community drives for environment, women empowerment, and health awareness.',
    color: 'from-pink-50 to-pink-100 border-pink-200',
    iconBg: 'bg-magenta',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    to: '/ambulance',
    marathi: 'रुग्णवाहिका सेवा',
    label: 'Ambulance Service',
    desc: 'Round-the-clock emergency ambulance coverage for the rural community.',
    contact: '9272418496',
    color: 'from-red-50 to-red-100 border-red-200',
    iconBg: 'bg-red-600',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
  },
  {
    to: '/contact-news',
    marathi: 'संपर्क करा',
    label: 'Contact & News',
    desc: 'Get in touch with us or stay updated with the latest news and events.',
    color: 'from-purple-50 to-purple-100 border-purple-200',
    iconBg: 'bg-purple-600',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

const IMPACT_STATS = [
  { emoji: '🌳', title: 'वृक्षे लावली', subtitle: 'Trees Planted', value: 5000, suffix: '+' },
  { emoji: '🎓', title: 'विद्यार्थी', subtitle: 'Students Enrolled', value: 0, suffix: '+ [TODO]' },
  { emoji: '🚑', title: 'आपत्कालीन सेवा', subtitle: 'Emergency Calls', value: 0, suffix: '+ [TODO]' },
  { emoji: '🏘️', title: 'गावे', subtitle: 'Villages Reached', value: 0, suffix: '+ [TODO]' },
  { emoji: '❤️', title: 'जीवन बदलले', subtitle: 'Lives Touched', value: 2000, suffix: '+' },
];

// ─── Ticker Component ─────────────────────────────────────────────────────────
function NoticeTicker() {
  const trackRef = useRef(null);

  return (
    <div className="bg-navy border-b border-forest/30 overflow-hidden py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* Badge */}
        <span className="shrink-0 bg-saffron text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
          Notice
        </span>

        {/* Scrolling track */}
        <div className="overflow-hidden flex-1">
          <div ref={trackRef} className="ticker-track">
            {[...NOTICES, ...NOTICES].map((notice, i) => (
              <span key={i} className="text-sm text-blue-100 mr-16 shrink-0">
                {notice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [impactStats, setImpactStats] = useState([]);
  const [loadingImpact, setLoadingImpact] = useState(true);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const snap = await getDocs(collection(db, 'impactStats'));
        if (!snap.empty) {
          const fetchedStats = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          fetchedStats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setImpactStats(fetchedStats);
        }
      } catch (e) {
        console.error("Error fetching impact stats", e);
      } finally {
        setLoadingImpact(false);
      }
    };
    fetchImpact();
  }, []);

  const statsToShow = impactStats.length > 0 ? impactStats : IMPACT_STATS;

  return (
    <main>
      {/* ── 1. Notice Ticker ───────────────────────────────────────────────── */}
      <NoticeTicker />

      {/* ── 2. Hero Banner ────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-navy via-[#0f2d4a] to-forest py-10 sm:py-12 flex items-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-forest/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-white/[0.03] border border-white/5 pointer-events-none" />

        <div className="relative z-10 animate-fadeInUp max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-white text-center">
          {/* Tag line pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-1 text-xs sm:text-sm mb-3 text-orange-200">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            Empowering Rural Maharashtra
          </div>

          <p className="text-saffron text-base sm:text-lg font-semibold mb-1">Let us build the person, build the village, build the nation.</p>
          <p className="text-blue-100 italic text-xs sm:text-sm mb-3">One Goal... All-Round Development</p>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-xl">
           एकच ध्यास... सर्वांगिण विकास...
          </h1>

          {/* Tagline */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-blue-100 leading-relaxed mb-5">
            Dedicated to uplifting rural communities through quality education,
            healthcare, safety training, and sustainable social development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pre-school"
              id="hero-explore-btn"
              className="px-6 py-2.5 rounded-full bg-saffron hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              आमचे उपक्रम पाहा / Explore Programs →
            </Link>
            <Link
              to="/contact-news"
              id="hero-contact-btn"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              संपर्क करा / Contact Us
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { num: '1000+', label: 'Students Benefited' },
              { num: '5',     label: 'Active Programs' },
              { num: '24×7',  label: 'Ambulance Service' },
              { num: '10+',   label: 'Villages Covered' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                <p className="text-xl sm:text-2xl font-extrabold text-saffron">{num}</p>
                <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BannerSlider pageId="home" />

      {/* ── 3. Quick Links Grid ────────────────────────────────────────────── */}
      <section id="programs" className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
              Our Programs
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Comprehensive initiatives that serve every member of our community,
              from children to senior citizens.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_LINKS.map(({ to, marathi, label, desc, color, iconBg, icon, contact }) => (
              <Link
                key={to}
                to={to}
                className={`group rounded-2xl border bg-gradient-to-br ${color} p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>
                <div>
                  <p className="text-saffron font-semibold text-sm mb-1">{marathi}</p>
                  <h3 className="font-bold text-navy text-lg leading-tight mb-1.5">
                    {label}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  {contact && (
                    <p className="mt-3 text-red-600 font-semibold">
                      <a href={`tel:+91${contact}`}>{contact}</a>
                    </p>
                  )}
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-saffron transition-colors">
                  पाहा →
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. About Preview ───────────────────────────────────────────────── */}
      <section id="about-preview" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-navy to-forest rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-8 sm:p-12 flex flex-col justify-center text-white">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 mb-3">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight">
                  About Shivshakti GramVikas Pratishthan
                </h2>
                <p className="text-blue-100 leading-relaxed mb-4">
                  Shivshakti GramVikas Pratishthan is a registered non-governmental
                  organisation rooted in the heart of rural Maharashtra. Founded with
                  the mission to bridge the gap between urban opportunities and rural
                  realities, we run transformative programmes in education, safety,
                  and community welfare.
                </p>
                <div className="border-l-4 border-saffron pl-4 mb-5">
                  <p className="text-saffron italic text-[1.2rem] leading-tight font-serif">
                    जनसेवा हीच खरी ईश्वर सेवा
                  </p>
                  <p className="text-gray-300 italic text-[0.85rem] mt-2">
                    Service to Humanity is True Service to God
                  </p>
                </div>
                <p className="text-blue-100 leading-relaxed mb-4">
                  Our holistic approach ensures that every child gets quality early
                  education, every adult gains livelihood skills, and every family
                  has access to emergency health support — regardless of economic
                  background.
                </p>
                <p className="text-blue-100 leading-relaxed mb-4">
                  With a dedicated team of volunteers and professionals, we have
                  touched thousands of lives and continue to grow our reach across
                  multiple villages in the district.
                </p>
                <p className="text-blue-100 leading-relaxed mb-8">
                  Our work is anchored in compassion, transparency, and a belief that
                  every rural family deserves access to education, healthcare, and
                  safe livelihoods.
                </p>
                <p className="text-blue-200 text-sm mb-8">
                  📍 किनगाव, ता. अहमदपूर, जि. लातूर, महाराष्ट्र
                </p>
                <Link
                  to="/about"
                  id="about-learn-more-btn"
                  className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron hover:bg-orange-500 text-white font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-500/30"
                >
                  आमच्याबद्दल अधिक / Learn More About Us →
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              {/* Values / icon side */}
              <div className="bg-white/5 p-8 sm:p-12 flex flex-col justify-center gap-5">
                {[
                  { icon: '🎓', title: 'Education First', desc: 'Empowering communities through quality learning at every age.' },
                  { icon: '🤝', title: 'Community Driven', desc: 'Every programme is shaped by and for the people we serve.' },
                  { icon: '💚', title: 'Sustainable Impact', desc: 'Long-term solutions that create self-reliant rural societies.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-0.5">{title}</h4>
                      <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Impact Summary ───────────────────────────────────────────────── */}
      <section id="impact" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-saffron font-semibold uppercase tracking-[0.35em] text-sm mb-3">गणना आणि प्रभाव</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our Impact at a Glance</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-3">
              A transparent snapshot of the work delivered through education, health,
              safety, and sustainable social development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statsToShow.map(({ emoji, title, subtitle, value, suffix }) => (
              <div key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{emoji}</div>
                <p className="text-saffron font-bold text-3xl">{value}{suffix}</p>
                <p className="text-navy font-semibold mt-2">{title}</p>
                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Photo Gallery Preview ───────────────────────────────────────── */}
      <section id="gallery" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
              Gallery
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A glimpse of our work, our people, and our impact on the ground.
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
          </div>

          <Gallery pageId="home" />

          <div className="text-center mt-8">
            <button
              id="gallery-view-all-btn"
              className="px-7 py-3 rounded-full border-2 border-navy text-navy font-semibold hover:bg-navy hover:text-white transition-colors duration-200"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. Quote Banner ───────────────────────────────────────────────── */}
      <section className="bg-[#0f2744] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-saffron text-[4rem] leading-none font-semibold">“</p>
          <p className="text-white text-3xl sm:text-4xl font-serif leading-tight mb-4">
            माणुसकी हाच खरा धर्म आहे
          </p>
          <p className="text-saffron italic text-lg sm:text-xl mb-3">
            Humanity is the True Religion
          </p>
          <p className="text-gray-400 text-sm">— शिवशक्ती ग्रामविकास प्रतिष्ठान</p>
        </div>
      </section>

      {/* ── 7. Ambulance Emergency Strip ────────────────────────────────────── */}
      <section className="bg-[#e11d48] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">🚑 रुग्णवाहिका सेवा — किनगाव</p>
            <p className="text-3xl sm:text-4xl font-bold mb-3">हर पल आपकी सेवा में, हर सफर सुरक्षित!</p>
            <p className="text-sm text-white/80">Ambulance · Kingaon · 50km Coverage · 24×7</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <a href="tel:+919272418496" className="text-[#f9c74f] font-bold text-3xl sm:text-4xl underline decoration-white/40">9272418496</a>
            <a href="tel:+919272418496" className="inline-flex items-center justify-center rounded-full bg-white text-[#e11d48] font-bold px-6 py-3 shadow-lg hover:bg-slate-100 transition-colors duration-200">
              CALL NOW
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Contact Strip ───────────────────────────────────────────────── */}
      <section
        id="contact-strip"
        className="bg-gradient-to-r from-forest to-navy py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Reach Out to Us
            </h2>
            <p className="text-green-200 text-sm">
              We're here to help — always.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Address */}
            <div
              className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/15"
            >
              <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">📍 किनगाव, ता. अहमदपूर, जि. लातूर - ४१३५२३, महाराष्ट्र / Kingaon - 413523</p>
              </div>
            </div>

            {/* Email */}
            <div
              className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/15"
            >
              <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">
                  <a href="mailto:shivshaktigramvikas@gmail.com" className="underline decoration-white/70">shivshaktigramvikas@gmail.com</a>
                </p>
                <p className="text-green-200 text-sm">
                  <a href="mailto:sit.mh2026@gmail.com" className="underline decoration-white/70">sit.mh2026@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div
              className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/15"
            >
              <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">📞 श्री. वसंत दहिफळे</p>
                <p className="text-green-200 text-sm"><a href="tel:+919763660738" className="underline decoration-white/70">9763660738</a></p>
                <p className="text-white font-bold mt-4">📞 श्री. पांडुरंग दहिफळे</p>
                <p className="text-green-200 text-sm"><a href="tel:+919822375105" className="underline decoration-white/70">9822375105</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
