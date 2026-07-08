import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Gallery from '../components/Gallery';

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSES = [
  {
    code: 'DIS-01',
    name: 'Diploma in Industrial Safety',
    duration: '1 Year (2 Semesters)',
    eligibility: 'HSC (10+2) or ITI Pass in any trade',
    seats: '60',
    mode: 'Full-time',
    highlights: [
      'Hazard identification & risk assessment',
      'Industrial fire prevention',
      'Occupational health & hygiene',
      'Safety management systems (ISO 45001)',
      'First aid & emergency response',
    ],
  },
  {
    code: 'DFS-02',
    name: 'Diploma in Fire & Safety Engineering',
    duration: '1 Year (2 Semesters)',
    eligibility: 'HSC (10+2) Science stream preferred',
    seats: '60',
    mode: 'Full-time',
    highlights: [
      'Fire behaviour & suppression systems',
      'Firefighting equipment & techniques',
      'Fire audit & safety inspections',
      'Disaster management & planning',
      'Construction & electrical safety',
    ],
  },
];

const FACULTY = [
  { initials: 'Dr.', name: 'Dr. [Faculty Name]',   qual: 'Ph.D. Occupational Safety, [University]', desig: 'Principal & Head of Department', exp: '20+ yrs' },
  { initials: 'Pr.', name: 'Prof. [Faculty Name]',  qual: 'M.Tech. Industrial Safety Engineering',    desig: 'Senior Lecturer — Industrial Safety',  exp: '15+ yrs' },
  { initials: 'Pr.', name: 'Prof. [Faculty Name]',  qual: 'B.E. Fire Engineering, [University]',      desig: 'Lecturer — Fire & Safety Engineering',  exp: '10+ yrs' },
  { initials: 'Mr.', name: 'Mr. [Faculty Name]',   qual: 'M.Sc. Industrial Chemistry',               desig: 'Lab Instructor — Hazmat & Safety',       exp: '8+ yrs'  },
];

const LABS = [
  { label: 'Fire Safety Lab',              emoji: '🔥', bg: 'from-red-400 to-rose-600' },
  { label: 'Industrial Safety Simulation', emoji: '🏭', bg: 'from-gray-500 to-gray-700' },
  { label: 'First Aid & Medical Lab',      emoji: '🩺', bg: 'from-green-400 to-emerald-600' },
  { label: 'Electrical Safety Workshop',   emoji: '⚡', bg: 'from-yellow-400 to-amber-600' },
  { label: 'Hazmat Storage & Handling',    emoji: '⚗️', bg: 'from-purple-400 to-purple-700' },
  { label: 'Computer & CAD Lab',           emoji: '💻', bg: 'from-blue-400 to-blue-600' },
];

const PLACEMENTS = [
  { name: '[Student Name]', batch: 'Batch [Year]', company: '[Company Name]', role: 'Safety Officer', emoji: '👷' },
  { name: '[Student Name]', batch: 'Batch [Year]', company: '[Company Name]', role: 'Fire Safety Inspector', emoji: '🧑‍🚒' },
  { name: '[Student Name]', batch: 'Batch [Year]', company: '[Company Name]', role: 'HSE Executive', emoji: '👩‍💼' },
  { name: '[Student Name]', batch: 'Batch [Year]', company: '[Company Name]', role: 'Site Safety Supervisor', emoji: '👷‍♀️' },
];

const ADMISSION_STEPS = [
  { n: '01', title: 'Check Eligibility',    desc: 'Confirm you meet the educational qualification requirements for your chosen diploma programme.' },
  { n: '02', title: 'Download Form',        desc: 'Download the Admission Form from the Downloads section below or collect a physical copy from the college office.' },
  { n: '03', title: 'Submit Documents',     desc: 'Submit completed form along with: Mark sheets (SSC / HSC / ITI), Transfer Certificate, Caste Certificate (if applicable), 4 passport-size photos, and Aadhar Card copy.' },
  { n: '04', title: 'Entrance Interaction', desc: 'A brief aptitude interaction session is conducted to assess the candidate. No written exam — attendance is sufficient.' },
  { n: '05', title: 'Merit List & Allotment', desc: 'Merit list published within 7 working days. Selected candidates receive an allotment letter via registered mobile number.' },
  { n: '06', title: 'Fee Payment & Joining', desc: "Pay the first-semester fee and report on the joining date with originals of all submitted documents. Receive your I-card and college kit." },
];

const DOWNLOADS = [
  { label: 'College Prospectus [Year]',       icon: '📘', size: '[X MB]', href: '#' },
  { label: 'Admission Form — DIS',             icon: '📋', size: '[X KB]', href: '#' },
  { label: 'Admission Form — DFS',             icon: '📋', size: '[X KB]', href: '#' },
  { label: 'Fee Structure [Academic Year]',    icon: '💰', size: '[X KB]', href: '#' },
  { label: 'Syllabus — Diploma in Industrial Safety', icon: '📚', size: '[X MB]', href: '#' },
  { label: 'Syllabus — Diploma in Fire & Safety',    icon: '📚', size: '[X MB]', href: '#' },
];

const EMPLOYERS = [
  '[Company / Factory Name]', '[Company / Factory Name]', '[Government Dept.]',
  '[PSU Name]', '[Construction Co.]', '[Refinery / Plant Name]',
];

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
  const [partners, setPartners] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cSnap = await getDocs(collection(db, 'safetyCourses'));
        setCourses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const pSnap = await getDocs(collection(db, 'safetyPartners'));
        setPartners(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
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
            <a
              href="#downloads"
              className="px-8 py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-yellow-400/30"
            >
              📥 Download Prospectus
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

      <BannerSlider pageId="safety" />

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
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Academic Programmes"
            title="Courses Offered"
            subtitle="Two MSBTE-approved diploma programmes designed for immediate industry relevance."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {COURSES.map(({ code, name, duration, eligibility, seats, mode, highlights }) => (
              <div
                key={code}
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

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MSBTE Affiliation Details ──────────────────────────────────── */}
      <section id="msbte" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            tag="Recognition"
            title="MSBTE Affiliation Details"
            subtitle="Our programmes are approved and affiliated with the Maharashtra State Board of Technical Education, Government of Maharashtra."
          />

          <div className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-navy px-6 py-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-magenta" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              <span className="text-white font-semibold text-sm">Official MSBTE Recognition Details</span>
            </div>

            {/* Details table */}
            {[
              { label: 'Awarding Body',              value: 'Maharashtra State Board of Technical Education (MSBTE), Mumbai' },
              { label: 'Affiliation Number',         value: '[MSBTE/AFF/XXXXX/YYYY] — Placeholder' },
              { label: 'Approval Year',              value: '[Year] — Placeholder' },
              { label: 'Last Renewal Date',          value: '[DD/MM/YYYY] — Placeholder' },
              { label: 'Renewal Valid Until',        value: '[DD/MM/YYYY] — Placeholder' },
              { label: 'DTE Code',                   value: '[XXXXX] — Placeholder' },
              { label: 'Programmes Approved',        value: 'Diploma in Industrial Safety | Diploma in Fire & Safety Engineering' },
              { label: 'Government Order Reference', value: '[GO No. XXXX/YYYY] — Placeholder' },
            ].map(({ label, value }, i) => (
              <div key={label} className={`flex flex-col sm:flex-row sm:items-center px-6 py-4 gap-1 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                <dt className="sm:w-56 text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">{label}</dt>
                <dd className="text-navy font-medium text-sm">{value}</dd>
              </div>
            ))}

            {/* PDF download row */}
            <div className="px-6 py-4 bg-magenta/5 border-t border-magenta/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                Official MSBTE affiliation certificate available for download:
              </p>
              <a
                href="#"
                id="sc-msbte-cert-download"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-magenta text-white text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download MSBTE Certificate [PDF]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Admission section removed */}

      {/* ── 6. Faculty Profiles ───────────────────────────────────────────── */}
      <section id="faculty" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            tag="Our Team"
            title="Faculty Profiles"
            subtitle="Experienced educators and industry practitioners committed to excellence in safety education."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACULTY.map(({ initials, name, qual, desig, exp }, i) => {
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
            * Replace with actual faculty names, photos, and qualifications.
          </p>
        </div>
      </section>

      {/* ── 7. Infrastructure / Labs ──────────────────────────────────────── */}
      <section id="labs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            tag="Infrastructure"
            title="Labs & Facilities"
            subtitle="State-of-the-art laboratories and simulation facilities for hands-on professional training."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {LABS.map(({ label, emoji, bg }, i) => (
              <div
                key={label}
                className={`relative ${i === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-[4/3]'} rounded-2xl bg-gradient-to-br ${bg} overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-5xl sm:text-6xl drop-shadow">{emoji}</span>
                </div>
                {/* Always-visible caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <p className="text-white font-bold text-sm leading-tight">{label}</p>
                  <p className="text-white/60 text-xs">[Replace with actual lab photo]</p>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure list */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Dedicated Fire Suppression Simulator',
              'Industrial Hazmat Handling Room',
              'PPE (Personal Protective Equipment) Store',
              'Library with 1000+ Safety Titles',
              'Well-equipped Computer Lab with internet',
              'Seminar Hall (capacity: [X] students)',
              'CCTV-monitored campus',
              'Separate common rooms for boys & girls',
              'Canteen & transport facilities',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-sm text-gray-600">
                <svg className="w-4 h-4 text-magenta shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Placement Support ──────────────────────────────────────────── */}
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
            {[
              { emoji: '🤝', title: 'Industry Tie-ups', desc: 'MOUs with [X]+ companies for campus recruitment and internships.' },
              { emoji: '📋', title: 'Resume & Interview Prep', desc: 'Dedicated sessions on resume writing, group discussion, and HR interview skills.' },
              { emoji: '🎓', title: 'Campus Placement Drives', desc: 'Annual placement drives held on campus with HR representatives from industry partners.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 text-white">
                <span className="text-3xl mb-3 block">{emoji}</span>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-rose-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Graduates section removed */}

          {/* Employer logos placeholder */}
          <div className="text-center">
            <p className="text-rose-200 text-xs uppercase tracking-widest font-bold mb-4">Our Hiring Partners</p>
            <div className="flex flex-wrap justify-center gap-3">
              {EMPLOYERS.map((name) => (
                <span key={name} className="px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-white text-xs font-medium">
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/40 italic">* Replace with real company logos and names</p>
          </div>
        </div>
      </section>

      {/* ── 9. Downloads ──────────────────────────────────────────────────── */}
      <section id="downloads" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            tag="Resources"
            title="Downloads"
            subtitle="All important documents available for download — always updated for the current academic year."
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {DOWNLOADS.map(({ label, icon, size, href }) => (
              <a
                key={label}
                href={href}
                id={`sc-download-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md hover:border-magenta transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-magenta/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-magenta group-hover:scale-105 transition-all duration-200">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy text-sm leading-tight">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">PDF · {size}</p>
                </div>
                <div className="shrink-0 text-gray-300 group-hover:text-magenta transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            * All PDF links are placeholders — upload actual documents and update the <code>href</code> values.
          </p>
        </div>
      </section>

      {/* CTA section removed */}

    
      <Gallery pageId="safetycollege" title="Photo Gallery" subtitle="A glimpse into our state-of-the-art facilities and student life." />
    </main>
  );
}
