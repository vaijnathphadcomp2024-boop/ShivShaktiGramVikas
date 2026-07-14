import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Gallery from '../components/Gallery';



// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ tag, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-14">
      {tag && (
        <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full border ${light
          ? 'bg-white/10 border-white/20 text-rose-200'
          : 'bg-rose-50 border-rose-100 text-magenta'
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-rose-300' : 'bg-magenta'}`} />
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 leading-tight ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${light ? 'text-rose-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 mx-auto w-16 h-1 rounded-full ${light ? 'bg-rose-300' : 'bg-gradient-to-r from-magenta to-rose-400'}`} />
    </div>
  );
}

function Badge({ children, variant = 'solid' }) {
  return variant === 'outline' ? (
    <span className="px-3 py-1 rounded-full border border-magenta/40 text-magenta text-xs font-semibold">
      {children}
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full bg-magenta text-white text-xs font-bold uppercase tracking-wide">
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SafetyCollege() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cSnap = await getDocs(collection(db, 'sc_courses'));
        setCourses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const fSnap = await getDocs(collection(db, 'sc_faculty'));
        setFaculty(fSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const pSnap = await getDocs(collection(db, 'sc_placements'));
        setPlacements(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const aSnap = await getDocs(collection(db, 'sc_admission_steps'));
        setAdmissionSteps(aSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const eSnap = await getDocs(collection(db, 'sc_employers'));
        setEmployers(eSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="animate-fadeIn">

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="safety-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-[#7f0022] via-magenta to-rose-600 min-h-[90vh] flex items-center"
      >
        {/* Watermark */}
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>

        {/* Decorative orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-rose-900/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-magenta/10 blur-3xl pointer-events-none" />

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 40px,white 40px,white 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,white 40px,white 41px)',
          }}
        />

        <div className="relative z-10 animate-fadeInUp max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white text-center">
          {/* MSBTE Affiliated badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 text-sm mb-8 font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
            MSBTE Affiliated — Maharashtra State Board of Technical Education
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-lg">
            Shivshakti Institute of Technology
            <span className="block text-xl sm:text-2xl font-semibold text-rose-200 mt-3">
              Fire Engineering & Safety Management
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-rose-100 leading-relaxed mb-12">
            A government-recognised, MSBTE-affiliated institute offering professional
            diplomas in Industrial Safety and Fire &amp; Safety Engineering — shaping the
            next generation of safety professionals for Maharashtra.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="#courses"
              className="px-8 py-3.5 rounded-full bg-white text-magenta font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore Courses ↓
            </a>
            <a
              href="#faculty"
              className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Meet Our Faculty
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { n: '2', l: 'Diploma Programmes', icon: '🎓' },
              { n: '120', l: 'Total Seats', icon: '🪑' },
              { n: 'X+', l: 'Alumni Placed', icon: '💼' },
              { n: '[Year]', l: 'MSBTE Affiliated Since', icon: '📜' },
            ].map(({ n, l, icon }) => (
              <div
                key={l}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-2xl font-extrabold group-hover:scale-110 transition-transform duration-300">{n}</p>
                <p className="text-xs text-rose-200 mt-1 leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      </section>

      <BannerSlider pageId="safetycollege" />

      {/* ── 2. About the College ──────────────────────────────────────────── */}
      <section id="about-college" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Our Institution"
            title="About Shivshakti Safety College"
            subtitle="A centre of excellence in safety education, training future professionals to protect lives and workplaces."
          />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text */}
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Shivshakti Safety College</strong>, an initiative of
                Shivshakti GramVikas Pratishtan, is a government-recognised technical institution
                affiliated with the Maharashtra State Board of Technical Education (MSBTE). Established
                in <strong>2026</strong>, the college was founded with a clear mission: to produce
                skilled, certified safety professionals who can protect workplaces, reduce industrial
                accidents, and uphold health, safety, and environment (HSE) standards across Maharashtra.
              </p>
              <p>
                Our programmes are designed in alignment with the <strong>National Occupational
                  Standards (NOS)</strong> and the latest MSBTE curriculum. Students receive both
                theoretical grounding and extensive hands-on laboratory and site-visit training,
                ensuring they are industry-ready from day one.
              </p>
              <p>
                The college maintains strong industry linkages with factories, construction firms,
                power plants, and government safety departments — enabling live project exposure,
                guest lectures by industry experts, and placement assistance for all graduating students.
                Our alumni serve as Safety Officers, HSE Executives, Fire Safety Inspectors, and
                Site Safety Supervisors across Maharashtra and beyond.
              </p>

              {/* Key facts pills */}
              <div className="flex flex-wrap gap-2 pt-3">
                {[
                  'MSBTE Affiliated',
                  'Industry Tie-ups',
                  'Site Visit Training',
                  'Expert Guest Faculty',
                  'Placement Support',
                  'Scholarship Available',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-rose-50 text-magenta text-xs font-semibold border border-rose-100 hover:bg-rose-100 transition-colors duration-200 cursor-default"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlight card */}
            <div className="space-y-5">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#7f0022] via-magenta to-rose-600 p-8 text-white shadow-2xl relative">
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg,transparent,transparent 8px,white 8px,white 9px)',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">🏛️</span>
                    <h3 className="text-xl font-extrabold">College At a Glance</h3>
                  </div>
                  <dl className="space-y-3.5 text-sm">
                    {[
                      { dt: 'Established', dd: '2026' },
                      { dt: 'MSBTE Affiliation No.', dd: '[MSBTE/AFF/XXXX]' },
                      { dt: 'Approval Year', dd: '2026' },
                      { dt: 'Campus Area', dd: '1 Acres ' },
                      { dt: 'Total Faculty', dd: '[6] Teaching + [4] Non-Teaching' },
                      { dt: 'Library Holdings', dd: '[2000+] Books + [6] Journals' },
                      { dt: 'Address', dd: 'Gut No. 166, Sai Mandir Chowk, Satara, Chhatrapati Sambhajinagar – 431010' },
                    ].map(({ dt, dd }) => (
                      <div key={dt} className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0">
                        <span className="text-rose-300 font-semibold shrink-0 w-40">{dt}:</span>
                        <span className="text-rose-100">{dd}</span>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Courses Offered ────────────────────────────────────────────── */}
      {courses.length > 0 && (
        <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-rose-50/30">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              tag="Academic Programmes"
              title="Courses Offered"
              subtitle="Two MSBTE-approved diploma programmes designed for immediate industry relevance."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {courses.map(({ code, name, duration, eligibility, seats, mode, highlights }, i) => (
                <div
                  key={code || i}
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col
                             shadow-md hover:shadow-2xl hover:border-magenta/30 hover:-translate-y-2
                             transition-all duration-400 cursor-default group"
                >
                  {/* Colored top stripe */}
                  <div className="h-1.5 bg-gradient-to-r from-magenta via-rose-500 to-rose-400" />

                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#7f0022] to-rose-700 px-7 py-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-rose-300 text-[10px] font-black uppercase tracking-widest mb-2">{code}</p>
                        <h3 className="text-white font-extrabold text-lg leading-tight">{name}</h3>
                      </div>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">
                        {mode}
                      </span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                    {[
                      { label: 'Duration', value: duration },
                      { label: 'Seats', value: seats },
                      { label: 'Eligibility', value: eligibility },
                    ].map(({ label, value }) => (
                      <div key={label} className="px-4 py-4 text-center bg-slate-50/60 group-hover:bg-rose-50/40 transition-colors duration-300">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                        <p className="text-xs font-extrabold text-navy mt-1.5 leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  {highlights && (
                    <div className="p-7 bg-white flex-1 flex flex-col justify-center">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Key Highlights</p>
                      <ul className="space-y-3">
                        {highlights.split(',').map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <span className="w-5 h-5 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-magenta" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="leading-tight text-gray-600 font-medium">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Faculty Profiles ───────────────────────────────────────────── */}
      {faculty.length > 0 && (
        <section id="faculty" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              tag="Our Team"
              title="Faculty Profiles"
              subtitle="Experienced educators and industry practitioners committed to excellence in safety education."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map(({ initials, name, qual, desig, exp }, i) => {
                const colors = [
                  'from-magenta to-rose-700',
                  'from-navy to-[#0f2d4a]',
                  'from-forest to-[#0a4f2b]',
                  'from-purple-600 to-purple-800',
                ];
                const bgLight = [
                  'from-rose-50 to-rose-100/50',
                  'from-blue-50 to-blue-100/50',
                  'from-green-50 to-green-100/50',
                  'from-purple-50 to-purple-100/50',
                ];
                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-100 rounded-3xl shadow-sm
                               hover:shadow-2xl hover:border-magenta/20 hover:-translate-y-2
                               transition-all duration-350 overflow-hidden group"
                  >
                    {/* Top gradient stripe */}
                    <div className={`h-2 bg-gradient-to-r ${colors[i % colors.length]}`} />
                    {/* Avatar area */}
                    <div className={`p-6 bg-gradient-to-b ${bgLight[i % bgLight.length]} flex flex-col items-center`}>
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors[i % colors.length]}
                                    flex flex-col items-center justify-center text-white font-extrabold
                                    shadow-lg mb-0 group-hover:scale-110 transition-transform duration-300
                                    ring-4 ring-white ring-offset-0`}
                      >
                        <span className="text-[10px] text-white/80 tracking-wide font-black uppercase">{initials}</span>
                        <span className="text-2xl">👤</span>
                      </div>
                    </div>
                    <div className="px-5 pb-6 pt-4 text-center">
                      <h3 className="font-extrabold text-navy text-sm leading-tight mb-1">{name}</h3>
                      <p className="text-xs text-magenta font-bold uppercase tracking-wider mb-3">{desig}</p>
                      <div className="w-8 h-0.5 bg-gradient-to-r from-magenta to-rose-400 mx-auto mb-3" />
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 font-medium">{qual}</p>
                      <span className="inline-block px-3 py-1.5 rounded-full bg-rose-50 text-magenta text-[9px] font-black uppercase tracking-wider border border-rose-100">
                        {exp} Experience
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              * Faculty profiles may be updated periodically.
            </p>
          </div>
        </section>
      )}

      {/* ── 8. Placement Support ──────────────────────────────────────────── */}
      {placements.length > 0 && (
        <section id="placements" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f1c2e] via-navy to-[#7f0022] relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-magenta/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-rose-700/20 blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeading
              tag="Career Support"
              title="Placement Support"
              subtitle="Our dedicated placement cell connects graduates with leading industries across Maharashtra and India."
              light
            />

            {/* Placement highlights */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {placements.map(({ emoji, title, desc, name, role, company }, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 border hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                    {emoji || '🎓'}
                  </span>
                  <h3 className="font-bold text-base text-white mb-2 leading-snug">{title || name}</h3>
                  <p className="text-rose-100 text-sm leading-relaxed">{desc || `${role} at ${company}`}</p>
                </div>
              ))}
            </div>

            {/* Employer logos */}
            {employers.length > 0 && (
              <div className="text-center">
                <p className="text-rose-200 text-xs uppercase tracking-widest font-black mb-6">Our Hiring Partners</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {employers.map((emp, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 border rounded-xl text-white text-xs font-semibold
                                 transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5 cursor-default"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        borderColor: 'rgba(255,255,255,0.12)',
                      }}
                    >
                      {emp.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Gallery pageId="safetycollege" title="Photo Gallery" subtitle="A visual journey of our campus and activities." />

    </main>
  );
}
