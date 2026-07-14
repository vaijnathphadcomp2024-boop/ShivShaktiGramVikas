import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Gallery from '../components/Gallery';



// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ tag, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${light ? 'text-rose-200' : 'text-magenta'}`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl mx-auto text-sm sm:text-base ${light ? 'text-rose-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-magenta" />
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
    <main>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        id="safety-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-magenta via-rose-700 to-[#7f0022] min-h-[80vh] flex items-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-rose-900/30 blur-3xl pointer-events-none" />
        {/* Grid overlay texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,white 40px,white 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,white 40px,white 41px)',
          }}
        />

        <div className="relative z-10 animate-fadeInUp max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center">
          {/* MSBTE Affiliated badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-1.5 text-sm mb-6 font-semibold">
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
            MSBTE Affiliated — Maharashtra State Board of Technical Education
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">
            Shivshakti Safety College
            <span className="block text-xl sm:text-2xl font-semibold text-rose-200 mt-2">
              [Full College Name — Placeholder]
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-rose-100 leading-relaxed mb-10">
            A government-recognised, MSBTE-affiliated institute offering professional
            diplomas in Industrial Safety and Fire & Safety Engineering — shaping the
            next generation of safety professionals for Maharashtra.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="#courses"
              className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Courses ↓
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { n: '2',      l: 'Diploma Programmes'   },
              { n: '120',    l: 'Total Seats'           },
              { n: 'X+',     l: 'Alumni Placed'         },
              { n: '[Year]', l: 'MSBTE Affiliated Since' },
            ].map(({ n, l }) => (
              <div key={l} className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
                <p className="text-2xl font-extrabold">{n}</p>
                <p className="text-xs text-rose-200 mt-0.5 leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BannerSlider pageId="safetycollege" />

      {/* ── 2. About the College ──────────────────────────────────────────── */}
      <section id="about-college" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Our Institution"
            title="About Shivshakti Safety College"
            subtitle="A centre of excellence in safety education, training future professionals to protect lives and workplaces."
          />

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Text */}
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy">Shivshakti Safety College</strong>, an initiative of
                Shivshakti GramVikas Pratishtan, is a government-recognised technical institution
                affiliated with the Maharashtra State Board of Technical Education (MSBTE). Established
                in <strong>[Year]</strong>, the college was founded with a clear mission: to produce
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
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'MSBTE Affiliated',
                  'Industry Tie-ups',
                  'Site Visit Training',
                  'Expert Guest Faculty',
                  'Placement Support',
                  'Scholarship Available',
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-rose-50 text-magenta text-xs font-semibold border border-rose-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlight card */}
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-magenta to-[#7f0022] p-8 text-white shadow-2xl">
                <p className="text-4xl mb-4">🏛️</p>
                <h3 className="text-xl font-extrabold mb-4">College At a Glance</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { dt: 'Established',          dd: '[Year]' },
                    { dt: 'MSBTE Affiliation No.', dd: '[MSBTE/AFF/XXXX]' },
                    { dt: 'Approval Year',         dd: '[Year]' },
                    { dt: 'Campus Area',           dd: '[X] Acres / [X] Sq. Ft.' },
                    { dt: 'Total Faculty',         dd: '[X] Teaching + [X] Non-Teaching' },
                    { dt: 'Library Holdings',      dd: '[X] Books + [X] Journals' },
                    { dt: 'Address',               dd: '[Village/Town], [District], Maharashtra' },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex items-start gap-2">
                      <span className="text-rose-300 font-semibold shrink-0 w-36">{dt}:</span>
                      <span className="text-rose-100">{dd}</span>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Courses Offered ────────────────────────────────────────────── */}
      {courses.length > 0 && (
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Academic Programmes"
            title="Courses Offered"
            subtitle="Two MSBTE-approved diploma programmes designed for immediate industry relevance."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map(({ code, name, duration, eligibility, seats, mode, highlights }, i) => (
              <div
                key={code || i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-magenta transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-magenta to-rose-700 px-6 py-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-rose-200 text-xs font-bold uppercase tracking-widest mb-1">{code}</p>
                      <h3 className="text-white font-extrabold text-lg leading-tight">{name}</h3>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30">
                      {mode}
                    </span>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                  {[
                    { label: 'Duration',      value: duration },
                    { label: 'Seats',         value: seats    },
                    { label: 'Eligibility',   value: eligibility },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-4 py-3 text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="text-xs font-semibold text-navy mt-0.5 leading-tight">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights (if any) */}
                {highlights && (
                  <div className="p-6 bg-gray-50/50 flex-1 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Key Highlights</p>
                    <ul className="space-y-2">
                      {highlights.split(',').map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-magenta shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          <span className="leading-tight">{item.trim()}</span>
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
      <section id="faculty" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="Our Team"
            title="Faculty Profiles"
            subtitle="Experienced educators and industry practitioners committed to excellence in safety education."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faculty.map(({ initials, name, qual, desig, exp }, i) => {
              const colors = [
                'from-magenta to-rose-700',
                'from-navy to-[#0f2d4a]',
                'from-forest to-[#0a4f2b]',
                'from-purple-600 to-purple-800',
              ];
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${colors[i % colors.length]}`} />
                  <div className="p-5 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex flex-col items-center justify-center text-white font-bold text-sm shadow-md mb-4 group-hover:scale-105 transition-transform`}>
                      <span className="text-xs text-white/70">{initials}</span>
                      <span className="text-xl">👤</span>
                    </div>
                    <h3 className="font-bold text-navy text-sm leading-tight mb-1">{name}</h3>
                    <p className="text-xs text-magenta font-semibold uppercase tracking-wide mb-2">{desig}</p>
                    <div className="w-8 h-0.5 rounded-full bg-gray-200 mb-2" />
                    <p className="text-xs text-gray-400 leading-relaxed mb-2">{qual}</p>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-50 text-magenta text-[10px] font-bold border border-rose-100">
                      {exp} Experience
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            * Faculty profiles may be updated periodically.
          </p>
        </div>
      </section>
      )}



      {/* ── 8. Placement Support ──────────────────────────────────────────── */}
      {placements.length > 0 && (
      <section id="placements" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-[#0f2d4a] to-magenta">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="Career Support"
            title="Placement Support"
            subtitle="Our dedicated placement cell connects graduates with leading industries across Maharashtra and India."
            light
          />

          {/* Placement highlights */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {placements.map(({ emoji, title, desc, name, role, company }, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 text-white">
                <span className="text-3xl mb-3 block">{emoji || '🎓'}</span>
                <h3 className="font-bold mb-2">{title || name}</h3>
                <p className="text-rose-200 text-sm leading-relaxed">{desc || `${role} at ${company}`}</p>
              </div>
            ))}
          </div>

          {/* Employer logos placeholder */}
          {employers.length > 0 && (
          <div className="text-center">
            <p className="text-rose-200 text-xs uppercase tracking-widest font-bold mb-4">Our Hiring Partners</p>
            <div className="flex flex-wrap justify-center gap-3">
              {employers.map((emp, i) => (
                <span key={i} className="px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-white text-xs font-medium">
                  {emp.name}
                </span>
              ))}
            </div>
          </div>
          )}
        </div>
      </section>
      )}

      {/* CTA section removed */}

      <Gallery pageId="safetycollege" title="Photo Gallery" subtitle="A visual journey of our campus and activities." />

    </main>
  );
}
