import { useState } from 'react';

// ─── ECG / Heartbeat SVG line (CSS-only, no images) ──────────────────────────
function EcgLine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points="0,30 40,30 55,30 65,5 75,55 85,30 95,30 115,30 125,12 132,48 139,30 155,30 195,30 205,5 215,55 225,30 240,30 280,30 290,12 297,48 304,30 320,30 360,30 370,5 380,55 390,30 400,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Star of Life medical symbol ──────────────────────────────────────────────
function StarOfLife({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <rect x="42" y="10" width="16" height="80" rx="4"/>
        <rect x="10" y="42" width="80" height="16" rx="4"/>
        <rect x="21" y="21" width="16" height="58" rx="4" transform="rotate(45 29 50)"/>
        <rect x="21" y="21" width="58" height="16" rx="4" transform="rotate(45 50 29)"/>
      </g>
      <circle cx="50" cy="50" r="14" fill="white"/>
      <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1a3c5e">✚</text>
    </svg>
  );
}

// ─── Services data ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    emoji: '🚨',
    title: '24×7 Emergency Service',
    desc: 'Round-the-clock emergency response — we never switch off. Our team is alert and ready every hour of every day, including public holidays.',
  },
  {
    emoji: '🛏️',
    title: 'Patient Transport — Local & Outstation',
    desc: 'Safe and comfortable transport within Latur district and beyond. Local village runs and outstation trips to city hospitals both covered.',
  },
  {
    emoji: '🏥',
    title: 'ICU Setup Ambulance',
    desc: 'Advanced ICU-equipped ambulance with critical care support for serious patients requiring continuous monitoring during transit.',
  },
  {
    emoji: '🫁',
    title: 'Oxygen Support',
    desc: 'Onboard oxygen cylinders and support equipment for patients requiring respiratory assistance during transport.',
  },
  {
    emoji: '👨‍⚕️',
    title: 'Trained & Experienced Staff',
    desc: 'Every ambulance is staffed by trained, experienced, and compassionate crew members dedicated entirely to patient safety.',
  },
];

const TRUST_BADGES = [
  { emoji: '🔔', label: '24×7 Availability' },
  { emoji: '⏰', label: 'On Time Every Time' },
  { emoji: '💰', label: 'Affordable Rates' },
  { emoji: '🤝', label: 'Compassionate Care' },
  { emoji: '🛡️', label: 'Your Safety Our Priority' },
];

const FLEET = [
  {
    icon: '🚑',
    title: 'Force Ambulance',
    subtitle: 'Basic Life Support (BLS)',
    features: [
      'Stretcher with patient restraint',
      'Oxygen cylinder & mask',
      'First aid & trauma equipment',
      'Trained attendant on board',
      'Available 24×7',
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    base: 'Kolwadi Base',
  },
  {
    icon: '🏥',
    title: 'ICU Setup Ambulance',
    subtitle: 'Advanced Life Support (ALS)',
    features: [
      'Advanced life support equipment',
      'Continuous patient monitoring',
      'Oxygen & suction support',
      'Experienced critical care attendant',
      'Available on call',
    ],
    status: 'On Request',
    statusColor: 'bg-yellow-400',
    base: 'Kolwadi Base',
  },
];

const EMERGENCY_TYPES = [
  '🚨 Accident / Trauma',
  '❤️ Cardiac Emergency',
  '🤰 Maternity / Delivery',
  '👴 Elderly Patient Transport',
  '🏥 Non-Emergency Medical Transfer',
  '🔄 Post-Discharge Transfer',
  '📋 Other (please specify)',
];

// ─── Form validation ───────────────────────────────────────────────────────────
const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\s/g, ''));

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Ambulance() {
  return (
    <>
      {/* ── STICKY MOBILE CALL BAR (hidden on md+) ──────────────────────── */}
      <div
        role="complementary"
        aria-label="Emergency call bar"
        className="fixed bottom-0 inset-x-0 z-[9999] flex items-center justify-between gap-3 bg-[#e11d48] px-4 py-3 md:hidden shadow-2xl"
      >
        <div className="flex items-center gap-2 text-white">
          <span className="text-xl" aria-hidden="true">🚑</span>
          <span className="font-extrabold text-lg tracking-wide select-all">9272418496</span>
        </div>
        <a
          href="tel:+919272418496"
          aria-label="Call Shivshakti Ambulance 9272418496"
          className="shrink-0 px-5 py-2 rounded-full bg-white text-[#e11d48] font-extrabold text-sm shadow hover:bg-red-50 transition-colors"
        >
          CALL NOW
        </a>
      </div>
      {/* Bottom padding on mobile so content isn't hidden behind the bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      <main>

        {/* ── 2. HERO ─────────────────────────────────────────────────────── */}
        <section
          id="amb-hero"
          className="relative overflow-hidden hero-section bg-[#1a3c5e] py-6 sm:py-8 px-4 sm:px-6 lg:px-8"
          aria-labelledby="amb-hero-heading"
        >
          <div className="hero-watermark">
            <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
          </div>
          {/* ECG line — top */}
          <div className="absolute top-0 inset-x-0 h-8 text-[#e11d48]/30 pointer-events-none">
            <EcgLine className="w-full h-full" />
          </div>
          {/* ECG line — bottom */}
          <div className="absolute bottom-0 inset-x-0 h-8 text-[#e11d48]/20 pointer-events-none">
            <EcgLine className="w-full h-full" />
          </div>

          {/* Logo + 24/7 badge row */}
          <div className="relative max-w-4xl mx-auto flex items-center justify-between mb-4">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Shivshakti GramVikas Pratishthan Logo"
              className="h-12 w-12 object-contain"
              loading="eager"
              decoding="sync"
            />

            {/* 24/7 Emergency badge */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-[#e11d48] shadow-md text-center">
              <p className="text-[#e11d48] font-extrabold text-[9px] leading-tight uppercase tracking-tight">
                24/7<br />EMERGENCY
              </p>
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 animate-fadeInUp max-w-3xl mx-auto text-center">
            {/* Trust tagline in Devanagari */}
            <p
              className="text-[#f9c74f] font-bold text-lg sm:text-xl mb-0.5"
              style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
            >
              जनसेवा हीच खरी ईश्वर सेवा
            </p>
            <p className="text-blue-200 text-xs italic mb-3">
              "Service to People is True Service to God"
            </p>

            {/* Main heading */}
            <h1
              id="amb-hero-heading"
              className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wide mb-1 drop-shadow"
            >
              Shivshakti Ambulance Service
            </h1>
            <p className="text-[#e11d48] font-bold text-sm sm:text-lg mb-3">
              Kolwadi &nbsp;|&nbsp; Tal: Ahmadpur &nbsp;|&nbsp; Dist: Latur
            </p>

            {/* Emergency number */}
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              CONTACT US — 24×7
            </p>
            <p
              className="text-[#f9c74f] font-extrabold leading-none mb-4 select-all"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
              aria-label="Ambulance contact number 9272418496"
            >
              9272418496
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a
                href="tel:+919272418496"
                aria-label="Call Shivshakti Ambulance 9272418496"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#e11d48] hover:bg-rose-700 text-white font-extrabold text-base shadow-lg shadow-red-900/40 transition-colors"
              >
                📞 Call Now
              </a>
            </div>

            {/* Coverage badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-700 text-white font-semibold text-xs shadow">
              📍 Covering 100 km radius from Kolwadi, Latur
            </div>
          </div>
        </section>

        {/* ── 3. OUR SERVICES ──────────────────────────────────────────────── */}
        <section id="services" className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            {/* Section heading with red left border — matches branding */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-10 rounded-full bg-[#e11d48]" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] uppercase tracking-wide">
                Our Services
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map(({ emoji, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-white rounded-xl border-l-4 border-[#e11d48] shadow-sm hover:shadow-md transition-shadow p-5"
                >
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-full bg-[#e11d48] flex items-center justify-center text-xl shrink-0 shadow">
                    {emoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#1a3c5e] text-base mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. TRUST BADGES ROW ───────────────────────────────────────────── */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-label="Trust indicators">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
              {TRUST_BADGES.map(({ emoji, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a3c5e] flex items-center justify-center text-2xl shadow-md">
                    {emoji}
                  </div>
                  <p className="text-[#1a3c5e] font-bold text-xs sm:text-sm leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. WE CARE BANNER ────────────────────────────────────────────── */}
        <section
          className="bg-[#e11d48] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          aria-label="Mission statement"
        >
          {/* ECG lines */}
          <div className="absolute inset-y-0 left-0 w-1/3 text-white/20 flex items-center pointer-events-none">
            <EcgLine className="w-full h-12" />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/3 text-white/20 flex items-center pointer-events-none">
            <EcgLine className="w-full h-12" />
          </div>

          <div className="relative max-w-4xl mx-auto flex items-center justify-center gap-6">
            {/* Left ECG decor — desktop only */}
            <div className="hidden sm:flex flex-col items-center">
              <EcgLine className="w-28 h-8 text-white/40" />
            </div>

            {/* Center text */}
            <p className="text-white font-extrabold text-xl sm:text-3xl uppercase tracking-widest text-center">
              WE CARE… WE SERVE… WE SAVE LIVES
            </p>

            {/* Right — Star of Life */}
            <div className="hidden sm:flex w-14 h-14 rounded-full bg-[#1a3c5e] items-center justify-center shrink-0 shadow-lg">
              <span className="text-white text-2xl font-extrabold">✚</span>
            </div>
          </div>
        </section>

        {/* ── 6. COVERAGE AREA ─────────────────────────────────────────────── */}
        <section id="coverage" className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-10 rounded-full bg-[#e11d48]" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] uppercase tracking-wide">
                Coverage Area
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Coverage details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <dl className="space-y-4">
                  {[
                    { icon: '📍', dt: 'Base Location',     dd: 'Kolwadi' },
                    { icon: '🏛️', dt: 'Taluka',            dd: 'Ahmadpur' },
                    { icon: '🗺️', dt: 'District',          dd: 'Latur, Maharashtra' },
                    { icon: '🔵', dt: 'Coverage Radius',   dd: '100 km from Kolwadi' },
                    { icon: '📞', dt: 'Emergency Number',  dd: '9272418496 (24×7)' },
                  ].map(({ icon, dt, dd }) => (
                    <div key={dt} className="flex items-center gap-3">
                      <span className="text-xl w-7 shrink-0">{icon}</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide w-28 shrink-0">{dt}:</span>
                        <span className="font-semibold text-[#1a3c5e]">{dd}</span>
                      </div>
                    </div>
                  ))}
                </dl>

                {/* Nearby areas */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                    Nearby Areas Covered {/* TODO: Replace with real village coverage list */}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '[Village/Town 1]', '[Village/Town 2]', '[Village/Town 3]',
                      '[Village/Town 4]', '[Village/Town 5]', '[Village/Town 6]',
                      '[Village/Town 7]', '[Village/Town 8]',
                    ].map((v) => (
                      <span key={v} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1a3c5e] text-xs font-medium">
                        {v}
                      </span>
                    ))}
                  </div>
                  {/* TODO: Replace with real village coverage list */}
                </div>
              </div>

              {/* Map placeholder */}
              {/* REPLACE THIS WITH GOOGLE MAPS IFRAME FOR KINGAON */}
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-3 p-8 min-h-[280px] text-center">
                <span className="text-5xl" aria-hidden="true">📍</span>
                <p className="font-bold text-[#1a3c5e] text-base">Kolwadi, Tal: Ahmadpur, Dist: Latur</p>
                <p className="text-gray-400 text-sm">Maharashtra — 413 706</p>
                <p className="text-xs text-gray-400 italic mt-2">[Google Maps embed will appear here]</p>
                {/* TODO: Replace with Google Maps iframe for Kingaon
                <iframe
                  title="Shivshakti Ambulance Base — Kolwadi"
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%" height="300" loading="lazy"
                  allowFullScreen referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl border-0"
                /> */}
              </div>
              {/* END MAP PLACEHOLDER */}
            </div>
          </div>
        </section>

        {/* ── 7. HOW TO REQUEST (3 Steps) ──────────────────────────────────── */}
        <section id="how-to-request" className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-10 rounded-full bg-[#e11d48]" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] uppercase tracking-wide">
                How to Request Our Ambulance
              </h2>
            </div>

            <div className="relative grid sm:grid-cols-3 gap-8">
              {/* Connector line — desktop only */}
              <div className="hidden sm:block absolute top-10 left-[17%] right-[17%] h-0.5 bg-[#e11d48]/30" aria-hidden="true" />

              {[
                {
                  step: '1',
                  icon: '📞',
                  title: 'CALL IMMEDIATELY',
                  desc: 'Dial 9272418496 — our team answers 24×7. Tell us your name and exact pickup location.',
                  cta: true,
                },
                {
                  step: '2',
                  icon: '📍',
                  title: 'SHARE YOUR LOCATION',
                  desc: 'Give your village name, landmark, or nearest main road. Our team will confirm your location and dispatch immediately.',
                  cta: false,
                },
                {
                  step: '3',
                  icon: '🚑',
                  title: 'WE REACH YOU',
                  desc: 'Our trained crew arrives, provides first aid and oxygen support if needed, and safely transports you to the nearest appropriate hospital.',
                  cta: false,
                },
              ].map(({ step, icon, title, desc, cta }) => (
                <div key={step} className="relative flex flex-col items-center text-center gap-4">
                  {/* Step number circle */}
                  <div className="relative w-20 h-20 rounded-full bg-[#e11d48] flex flex-col items-center justify-center text-white shadow-lg shrink-0 z-10">
                    <span className="text-xs font-bold opacity-70">STEP</span>
                    <span className="text-3xl font-extrabold leading-none">{step}</span>
                  </div>
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h3 className="font-extrabold text-[#1a3c5e] text-base uppercase tracking-wide mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {cta && (
                    <a
                      href="tel:+919272418496"
                      aria-label="Call Shivshakti Ambulance 9272418496"
                      className="mt-1 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#e11d48] text-white font-bold text-sm hover:bg-rose-700 transition-colors shadow"
                    >
                      📞 9272418496
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. FLEET DETAILS ─────────────────────────────────────────────── */}
        <section id="fleet" className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-10 rounded-full bg-[#e11d48]" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] uppercase tracking-wide">
                Our Fleet
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {FLEET.map(({ icon, title, subtitle, features, status, statusColor, base }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="bg-[#1a3c5e] px-6 py-5 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl" role="img" aria-label="Ambulance">{icon}</span>
                      <div>
                        <h3 className="text-white font-extrabold text-base">{title}</h3>
                        <p className="text-blue-300 text-xs">{subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 bg-white/10 rounded-full px-3 py-1">
                      <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                      <span className="text-white text-xs font-semibold">{status}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <ul className="space-y-2">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#e11d48] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-gray-400 flex items-center gap-1">
                      <span>📍</span> {base}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. PARTNER HOSPITALS ─────────────────────────────────────────── */}
        <section id="hospitals" className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-10 rounded-full bg-[#e11d48]" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] uppercase tracking-wide">
                Empanelled &amp; Partner Hospitals
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {/* TODO: Replace with real partner hospital name */}
              {[
                { name: '[Hospital Name 1]', location: '[City/Town], Latur District', phone: '[Placeholder]', hours: 'Emergency: 24×7' },
                { name: '[Hospital Name 2]', location: '[City/Town], Latur District', phone: '[Placeholder]', hours: 'Emergency: 24×7' },
                { name: '[Hospital Name 3]', location: 'Latur City',                   phone: '[Placeholder]', hours: 'Emergency: 24×7' },
              ].map(({ name, location, phone, hours }) => (
                <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <p className="font-extrabold text-[#1a3c5e] text-base mb-3 flex items-center gap-2">
                    <span>🏥</span> {name}
                  </p>
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📍</span>
                      <span className="text-gray-600">{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📞</span>
                      <span className="text-gray-600">{phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🕐</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            {/* TODO: Replace with real partner hospital name */}

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-[#1a3c5e] leading-relaxed">
              <span className="font-bold">ℹ️ Note:</span> We will transport you to the most appropriate hospital
              based on your emergency type, doctor's referral, or your preference. Our team will
              advise you on the best option during your call.
            </div>
          </div>
        </section>

        {/* ── 10. AFFORDABLE RATES BANNER ──────────────────────────────────── */}
        <section
          id="charges"
          className="py-8 px-4 sm:px-6 lg:px-8 bg-amber-50 border-y border-amber-100"
          aria-labelledby="charges-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="text-6xl shrink-0" role="img" aria-label="Hands joined in service">🙏</div>
              <div>
                <h2 id="charges-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] mb-4">
                  Affordable Rates — No One is Turned Away
                </h2>
                {/* TODO: Confirm actual ambulance charges policy */}
                <ul className="space-y-2 mb-5">
                  {[
                    'Transparent, affordable pricing for all communities',
                    'Subsidised or free service for patients in genuine financial need',
                    'No advance payment required in genuine emergencies',
                    'Rates discussed openly and honestly before transport begins',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-gray-700 text-sm">
                      <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <blockquote className="border-l-4 border-saffron pl-4">
                  <p
                    className="font-bold text-[#1a3c5e] text-base mb-0.5"
                    style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
                  >
                    "जनसेवा हीच खरी ईश्वर सेवा"
                  </p>
                  <p className="text-gray-500 text-sm italic">
                    Service to people is our highest calling.
                    — Shivshakti Gram Vikas Pratishthan
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. FOOTER STRIP ─────────────────────────────────────────────── */}
        <div className="bg-[#1a3c5e] py-5 px-4" role="contentinfo" aria-label="Ambulance service footer">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-[#e11d48]/60" aria-hidden="true" />
            <p className="text-white font-extrabold text-sm sm:text-base uppercase tracking-widest text-center whitespace-nowrap">
              SHIVSHAKTI AMBULANCE SERVICE, KOLWADI
            </p>
            <div className="flex-1 h-px bg-[#e11d48]/60" aria-hidden="true" />
          </div>
          <p className="text-center text-blue-300 text-xs mt-2">
            Kolwadi &nbsp;|&nbsp; Tal: Ahmadpur &nbsp;|&nbsp; Dist: Latur, Maharashtra &nbsp;|&nbsp;
            <a href="tel:+919272418496" className="text-[#f9c74f] font-bold hover:underline">
              9272418496
            </a>
            &nbsp;|&nbsp; 24×7, 365 Days
          </p>
        </div>

      </main>
    </>
  );
}
