// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '2010',
    title: 'Foundation Established',
    desc: 'Shivshakti GramVikas Pratishtan was registered as a non-governmental organisation with the primary goal of rural upliftment in Maharashtra.',
  },
  {
    year: '2012',
    title: 'Pre School Programme Launched',
    desc: 'Our first Pre School centre opened its doors, providing quality early childhood education to children from economically weaker families.',
  },
  {
    year: '2014',
    title: 'Read India Center Inaugurated',
    desc: 'Partnering with national literacy missions, we set up the Read India Center to combat adult illiteracy across five villages.',
  },
  {
    year: '2016',
    title: 'Safety College Established',
    desc: 'Recognising the need for vocational safety training, we launched a Fire & Industrial Safety College, producing certified safety professionals.',
  },
  {
    year: '2018',
    title: '24×7 Ambulance Service',
    desc: 'A dedicated ambulance service was commissioned to provide round-the-clock emergency healthcare access to remote rural households.',
  },
  {
    year: '2021',
    title: 'Social Activities Wing',
    desc: 'A dedicated wing for tree plantation, women empowerment, and health awareness drives was formally constituted, expanding our community reach.',
  },
  {
    year: '2024',
    title: 'Expanding Horizons',
    desc: 'Today we operate across 10+ villages, have benefited 1000+ students, and continue growing our network of volunteers and partners.',
  },
];

const TRUSTEES = [
  { name: 'Shri. [Trustee Name]',   designation: 'Founder & Chairman',       initials: 'FC' },
  { name: 'Smt. [Trustee Name]',    designation: 'Managing Trustee',          initials: 'MT' },
  { name: 'Shri. [Trustee Name]',   designation: 'Secretary',                 initials: 'SE' },
  { name: 'Shri. [Trustee Name]',   designation: 'Treasurer',                 initials: 'TR' },
  { name: 'Smt. [Trustee Name]',    designation: 'Education Committee Head',  initials: 'EC' },
  { name: 'Shri. [Trustee Name]',   designation: 'Health & Safety Director',  initials: 'HD' },
];

const ACHIEVEMENTS = [
  { emoji: '🏆', text: 'District-Level Best NGO Award — [Year]' },
  { emoji: '📜', text: '80G & 12A certification from Income Tax Department' },
  { emoji: '🤝', text: 'Official partner of Read India National Literacy Mission' },
  { emoji: '🌳', text: '5,000+ saplings planted across 10 villages' },
  { emoji: '🎓', text: '500+ students enrolled in Safety College courses' },
  { emoji: '🚑', text: '1,200+ emergency calls responded by Ambulance Service' },
  { emoji: '👩‍💼', text: '200+ women empowered through livelihood training programmes' },
  { emoji: '📚', text: '300+ adults made literate through Read India Center' },
];

// ─── Reusable section heading ─────────────────────────────────────────────────
function SectionHeading({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-saffron mb-2">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">{subtitle}</p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
    </div>
  );
}

// ─── Page hero banner ─────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative hero-section bg-gradient-to-br from-navy via-[#0f2d4a] to-forest py-20 px-4 text-white overflow-hidden">      <div className="hero-watermark">
        <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
      </div>      {/* decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-forest/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 animate-fadeInUp max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 mb-3">
          Know Us Better
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          About <span className="text-saffron">Shivshakti</span>
          <br />
          <span className="text-green-300">GramVikas Pratishtan</span>
        </h1>
        <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A grassroots NGO committed to transforming rural Maharashtra through
          education, healthcare, safety training, and sustainable community development.
        </p>
      </div>
    </section>
  );
}

// ─── 1. Founder's Message ─────────────────────────────────────────────────────
function FounderMessage() {
  return (
    <section id="founders-message" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="From the Desk of Our Founder"
          title="Founder's Message"
        />

        <div className="relative bg-gradient-to-br from-navy to-forest rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
          {/* giant decorative quote mark */}
          <span className="absolute top-4 left-6 text-[10rem] leading-none text-white/5 font-serif select-none pointer-events-none">
            "
          </span>

          <div className="relative flex flex-col sm:flex-row gap-8 items-start">
            {/* Photo placeholder */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/10 border-4 border-saffron flex items-center justify-center text-4xl shadow-xl">
                👤
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-sm">Shri. [Founder Name]</p>
                <p className="text-xs text-orange-200">Founder & Chairman</p>
              </div>
            </div>

            {/* Quote text */}
            <blockquote className="flex-1">
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed italic mb-4">
                "When I look at our villages, I see immense potential waiting to be
                unlocked. Every child deserves quality education, every family
                deserves dignity, and every young person deserves a skill that can
                transform their life. Shivshakti GramVikas Pratishtan was born from
                this belief — that change begins at the grassroots level, one
                community at a time."
              </p>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed italic mb-4">
                "We do not see ourselves as outsiders helping the village — we are
                of the village. Our strength lies in the trust the community has
                placed in us, and we honour that trust every single day through
                our work."
              </p>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed italic">
                "I invite every well-wisher to join this journey. Together, we can
                build a Maharashtra where no child is left behind."
              </p>
              <div className="mt-6 h-px bg-white/20" />
              <p className="mt-4 text-sm text-orange-200 font-medium">
                — Shri. [Founder Name], Founder, Shivshakti GramVikas Pratishtan
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. History Timeline ──────────────────────────────────────────────────────
function History() {
  return (
    <section id="history" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="Our Journey"
          title="History of the Trust"
          subtitle="From humble beginnings to a multi-programme organisation — our story of growth and impact."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron via-forest to-navy sm:-translate-x-0.5" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Year bubble — always on the left on mobile, centred on desktop */}
                  <div className="flex sm:hidden items-center gap-4 pl-0">
                    <div className="w-12 h-12 rounded-full bg-navy border-4 border-saffron flex items-center justify-center text-white font-extrabold text-xs shrink-0 z-10 shadow-lg">
                      {item.year.slice(2)}
                    </div>
                  </div>

                  {/* Desktop bubble (centred) */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-navy border-4 border-saffron items-center justify-center text-white font-extrabold text-xs z-10 shadow-lg flex-col leading-tight text-center">
                    <span className="text-[10px] text-orange-200">{item.year.slice(0, 2)}</span>
                    <span>{item.year.slice(2)}</span>
                  </div>

                  {/* Card — offset left or right on desktop */}
                  <div
                    className={`ml-16 sm:ml-0 sm:w-[calc(50%-3rem)] bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow ${
                      isLeft ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                    }`}
                  >
                    <span className="inline-block text-xs font-bold text-saffron uppercase tracking-wider mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-navy text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. Vision & Mission ──────────────────────────────────────────────────────
function VisionMission() {
  return (
    <section id="vision-mission" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="Our Purpose"
          title="Vision & Mission"
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#0f2d4a] p-8 text-white shadow-xl group">
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-saffron flex items-center justify-center mb-5 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-saffron">Vision</h3>
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                A self-reliant, educated, and healthy rural Maharashtra where every
                individual — regardless of economic background — has equal access
                to opportunities, safety, and dignity.
              </p>
              <ul className="mt-5 space-y-2">
                {['Zero illiteracy in our villages', 'Skilled and employed youth', 'Safe and healthy communities'].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mission */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-[#0a4f2b] p-8 text-white shadow-xl group">
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-saffron flex items-center justify-center mb-5 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-saffron">Mission</h3>
              <p className="text-green-100 leading-relaxed text-sm sm:text-base">
                To empower rural communities through sustainable, on-ground
                programmes in early childhood education, literacy, vocational safety
                training, emergency healthcare, and social welfare — touching every
                life in the villages we serve.
              </p>
              <ul className="mt-5 space-y-2">
                {['Quality education for every child', 'Vocational skills for youth', '24×7 health & safety support'].map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm text-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Registration Details ──────────────────────────────────────────────────
function RegistrationDetails() {
  const rows = [
    { label: 'Organisation Name',         value: 'Shivshakti GramVikas Pratishtan' },
    { label: 'Registration Number',       value: '[REG-XXXX/YYYY]' },
    { label: 'Date of Registration',      value: '[DD/MM/YYYY]' },
    { label: 'Registered Under',          value: 'Maharashtra Public Trust Act, 1950' },
    { label: 'PAN Number',                value: '[XXXXXXXXXX]' },
    { label: '12A Certification',         value: '[12A Ref. No. / Pending]' },
    { label: '80G Certification',         value: '[80G Ref. No. / Pending]' },
    { label: 'FCRA Registration',         value: '[FCRA No. / Not Applicable]' },
    { label: 'Registered Office Address', value: '[Village], [Taluka], [District], Maharashtra — [PIN]' },
  ];

  return (
    <section id="registration" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="Legal & Compliance"
          title="Registration Details"
          subtitle="Official registration and tax-exemption information for donors and partners."
        />

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Header bar */}
          <div className="bg-navy px-6 py-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="text-white font-semibold text-sm">Official Trust Documents</span>
          </div>

          {/* Table */}
          <div className="divide-y divide-gray-100">
            {rows.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row sm:items-center px-6 py-4 gap-1 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                }`}
              >
                <dt className="sm:w-56 text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
                  {label}
                </dt>
                <dd className="text-navy font-medium text-sm sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="bg-saffron/10 border-t border-saffron/20 px-6 py-3">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-navy">Note:</span> Donations to Shivshakti GramVikas Pratishtan are eligible for tax deduction under Section 80G of the Income Tax Act (subject to certification). Please contact us for the latest certificates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. Trustees / Committee Members ─────────────────────────────────────────
const AVATAR_COLORS = [
  'from-navy to-[#0f2d4a]',
  'from-forest to-[#0a4f2b]',
  'from-saffron to-orange-500',
  'from-magenta to-rose-700',
  'from-purple-600 to-purple-800',
  'from-teal-500 to-teal-700',
];

function Trustees() {
  return (
    <section id="trustees" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="Leadership"
          title="Trustees & Committee Members"
          subtitle="Meet the dedicated individuals who guide and govern Shivshakti GramVikas Pratishtan."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUSTEES.map(({ name, designation, initials }, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden group"
            >
              {/* Top colour strip */}
              <div className={`h-2 bg-gradient-to-r ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`} />

              <div className="p-6 flex flex-col items-center text-center">
                {/* Avatar placeholder */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  } flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-4 group-hover:scale-105 transition-transform duration-200`}
                >
                  {initials}
                </div>

                <h3 className="font-bold text-navy text-base leading-tight mb-1">{name}</h3>
                <p className="text-xs font-semibold text-saffron uppercase tracking-wide mb-3">
                  {designation}
                </p>

                {/* Divider */}
                <div className="w-10 h-0.5 rounded-full bg-gray-200 mb-3" />

                <p className="text-xs text-gray-400 leading-relaxed">
                  Dedicated to the mission of rural empowerment and community development.
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          * Names and photos will be updated with real details. Replace initials with actual trustee photos.
        </p>
      </div>
    </section>
  );
}

// ─── 6. Achievements & Recognitions ──────────────────────────────────────────
function Achievements() {
  return (
    <section id="achievements" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy to-forest">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 mb-2">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Achievements & Recognitions
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto text-sm sm:text-base">
            Proud moments that reflect the trust, hard work, and impact of our community.
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-saffron" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map(({ emoji, text }, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {emoji}
              </div>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed self-center">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main>
      <PageHero />
      <FounderMessage />
      <History />
      <VisionMission />
      <RegistrationDetails />
      <Trustees />
      <Achievements />
    </main>
  );
}
