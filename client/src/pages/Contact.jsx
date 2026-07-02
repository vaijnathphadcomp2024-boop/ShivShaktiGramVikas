import { useState } from 'react';

// ─── Real Data ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'Mr. Vasant Digambar Dahiphale',
    role: '[Role / Designation — Placeholder]',
    phone: '9763660738',
    initials: 'VD',
  },
  {
    name: 'Mr. Pandurang Digambar Dahiphale',
    role: '[Role / Designation — Placeholder]',
    phone: '9822375105',
    initials: 'PD',
  },
  {
    name: 'Mr. Mahipati Vasantrao Dahiphale',
    role: '[Role / Designation — Placeholder]',
    phone: '7875013301',
    initials: 'MD',
  },
];

const NOTICES = [
  {
    category: 'Admission',
    categoryColor: 'bg-navy text-white',
    date: 'June 2026',
    title: 'Safety College Admissions Open — 2026–27',
    desc: 'Applications are now invited for Diploma in Industrial Safety and Diploma in Fire & Safety Engineering for the academic year 2026–27. Limited seats available.',
  },
  {
    category: 'Event',
    categoryColor: 'bg-forest text-white',
    date: '5 July 2026',
    title: 'Tree Plantation Drive — Kingaon',
    desc: 'Join us for our annual Tree Plantation Drive at Kingaon village on 5 July 2026. All volunteers and community members are welcome. Saplings will be provided.',
  },
  {
    category: 'General',
    categoryColor: 'bg-saffron text-white',
    date: 'July 2026',
    title: 'Akhand Harinam Saptah — Schedule Announced',
    desc: 'Shivshakti GramVikas Pratishtan announces the schedule for the upcoming Akhand Harinam Saptah. Seven days of Kirtan, Bhajan, and Pravachan. Open to all.',
  },
  {
    category: 'Ambulance',
    categoryColor: 'bg-[#e11d48] text-white',
    date: 'Ongoing',
    title: 'Ambulance Service Now 24×7 — Call 9272418496',
    desc: 'Our ambulance service is now operational 24 hours a day, 7 days a week. Call 9272418496 for emergency patient transport, ICU ambulance, and outstation trips.',
  },
  {
    category: 'Social',
    categoryColor: 'bg-cyan text-white',
    date: 'July 2026',
    title: 'ReadIndia Center — New Batch Open',
    desc: "A new batch for Literacy, Digital Skills, and Women's Empowerment programs is now open at the Read India Center. Enroll for free at your nearest center.",
  },
];

const SUBJECTS = [
  'General Enquiry',
  'PreSchool Admission',
  'ReadIndia Center',
  'Safety College',
  'Ambulance Service',
  'Volunteer with Us',
  'Donation / Support',
  'Other',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\s/g, ''));
const isValidEmail  = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// WhatsApp link helper
const waLink = (phone) => `https://wa.me/91${phone}`;

// ─── WhatsApp icon SVG ────────────────────────────────────────────────────────
function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ─── Copy to clipboard hook ───────────────────────────────────────────────────
function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        copied ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-navy/10 hover:bg-navy/20 text-navy border border-navy/20'
      }`}
      aria-label={`Copy ${label} to clipboard`}
    >
      {copied ? '✅ Copied!' : `📋 ${label}`}
    </button>
  );
}

// ─── Enquiry Form ─────────────────────────────────────────────────────────────
function EnquiryForm() {
  const INIT = { name: '', email: '', phone: '', subject: '', message: '' };
  const [form,      setForm]      = useState(INIT);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name    = 'Full name is required.';
    if (!form.email.trim())              e.email   = 'Email is required.';
    else if (!isValidEmail(form.email))  e.email   = 'Enter a valid email address.';
    if (!form.phone.trim())              e.phone   = 'Phone number is required.';
    else if (!isValidPhone(form.phone))  e.phone   = 'Enter a valid 10-digit mobile number.';
    if (!form.subject)                   e.subject = 'Please select a subject.';
    if (!form.message.trim())            e.message = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      // TODO: Wire up to POST /api/enquiries with formType: "General" in Module 13
      console.log('📨 Contact Enquiry Submitted:', { ...form, formType: 'General' });
      setLoading(false);
      setSubmitted(true);
      setForm(INIT);
    }, 700);
  };

  const cls = (f) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
      errors[f] ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-navy/30 focus:border-navy'
    }`;

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border-2 border-green-400 p-8 text-center space-y-3" role="alert">
        <p className="text-4xl">✅</p>
        <h3 className="font-extrabold text-green-800 text-xl">Message Received!</h3>
        <p className="text-green-700 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. Our team will respond within 24 hours.
          For urgent matters, call us directly:
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          <a href="tel:+919763660738" className="px-4 py-2 rounded-full bg-navy text-white text-sm font-bold hover:bg-[#0f2d4a] transition-colors">
            📞 9763660738
          </a>
          <a href="tel:+919822375105" className="px-4 py-2 rounded-full bg-navy text-white text-sm font-bold hover:bg-[#0f2d4a] transition-colors">
            📞 9822375105
          </a>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 px-5 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="ct-name" className="text-sm font-semibold text-navy">Full Name <span className="text-red-500">*</span></label>
          <input id="ct-name" name="name" type="text" placeholder="Your full name"
            value={form.name} onChange={handleChange} className={cls('name')} autoComplete="name" />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="ct-phone" className="text-sm font-semibold text-navy">Mobile Number <span className="text-red-500">*</span></label>
          <input id="ct-phone" name="phone" type="tel" placeholder="10-digit mobile"
            value={form.phone} onChange={handleChange} maxLength={10} inputMode="numeric" className={cls('phone')} autoComplete="tel" />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ct-email" className="text-sm font-semibold text-navy">Email Address <span className="text-red-500">*</span></label>
        <input id="ct-email" name="email" type="email" placeholder="your@email.com"
          value={form.email} onChange={handleChange} className={cls('email')} autoComplete="email" />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ct-subject" className="text-sm font-semibold text-navy">Subject <span className="text-red-500">*</span></label>
        <select id="ct-subject" name="subject" value={form.subject} onChange={handleChange} className={cls('subject')}>
          <option value="">— Select a subject —</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ct-message" className="text-sm font-semibold text-navy">Message <span className="text-red-500">*</span></label>
        <textarea id="ct-message" name="message" rows={4} placeholder="Write your message here…"
          value={form.message} onChange={handleChange} className={`${cls('message')} resize-none`} />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      <button id="ct-form-submit" type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl bg-navy hover:bg-[#0f2d4a] disabled:opacity-60 text-white font-extrabold text-base shadow-lg shadow-navy/20 transition-colors flex items-center justify-center gap-2">
        {loading ? (
          <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending…</>
        ) : '📨 Send Message'}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <>
      {/* ── Sticky mobile bar (below 768px only) ───────────────────────── */}
      <div
        role="complementary"
        aria-label="Quick contact bar"
        className="fixed bottom-0 inset-x-0 z-[9999] flex md:hidden shadow-2xl"
      >
        <a
          href="tel:+919763660738"
          aria-label="Call Team 9763660738"
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-extrabold text-sm py-3.5 hover:bg-[#0f2d4a] transition-colors"
        >
          📞 <span>Call Team</span>
        </a>
        <a
          href="tel:+919272418496"
          aria-label="Call Ambulance 9272418496"
          className="flex-1 flex items-center justify-center gap-2 bg-[#e11d48] text-white font-extrabold text-sm py-3.5 hover:bg-rose-700 transition-colors"
        >
          🚑 <span>Ambulance</span>
        </a>
      </div>
      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      <main>

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <section
          id="contact-hero"
          className="relative overflow-hidden hero-section bg-gradient-to-br from-navy via-[#0f2d4a] to-forest py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="hero-watermark">
            <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 animate-fadeInUp max-w-3xl mx-auto text-white">
            {/* Devanagari tagline */}
            <p
              className="text-saffron font-bold text-xl sm:text-2xl mb-2"
              style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
            >
              एकच ध्यास... सर्वांगिण विकास...
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Get in Touch</h1>
            <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
              Reach us for queries, volunteering, admissions, or support.
              We are here to help.
            </p>

            {/* Quick contact pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+919763660738"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                📞 9763660738
              </a>
              <a href="tel:+919272418496"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e11d48]/80 border border-[#e11d48] text-white font-semibold text-sm hover:bg-[#e11d48] transition-colors">
                🚑 Ambulance: 9272418496
              </a>
              <a href="mailto:shivshaktigramvikas@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. Contact Details + Map ──────────────────────────────────── */}
        <section id="contact-details" className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

            {/* Left — Contact details */}
            <div className="space-y-8">
              {/* Address block */}
              <div>
                <h2 className="text-xl font-extrabold text-navy mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-7 rounded-full bg-saffron inline-block" />
                  Our Office
                </h2>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3">
                  <p className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-navy mt-0.5">📍</span>
                    <span><strong className="text-navy">Shivshakti Gram Vikas Pratishtan (S.S.G.V.P.)</strong><br />
                    Kingaon, Tal: Ahmadpur,<br />
                    Dist: Latur, Maharashtra</span>
                  </p>
                  <div className="h-px bg-gray-100" />
                  <p className="flex items-center gap-2 text-sm">
                    <span>✉️</span>
                    <a href="mailto:shivshaktigramvikas@gmail.com"
                      className="text-navy font-medium hover:text-forest transition-colors hover:underline">
                      shivshaktigramvikas@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span>✉️</span>
                    <a href="mailto:sit.mh2026@gmail.com"
                      className="text-navy font-medium hover:text-forest transition-colors hover:underline">
                      sit.mh2026@gmail.com
                    </a>
                  </p>
                  <div className="h-px bg-gray-100" />
                  {/* Ambulance — red highlight */}
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl" aria-label="Ambulance">🚑</span>
                    <div>
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Emergency Ambulance — 24×7</p>
                      <a
                        href="tel:+919272418496"
                        aria-label="Call Ambulance 9272418496"
                        className="text-[#e11d48] font-extrabold text-xl tracking-wide hover:underline select-all"
                      >
                        9272418496
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team contact cards */}
              <div>
                <h2 className="text-xl font-extrabold text-navy mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-7 rounded-full bg-forest inline-block" />
                  Team Contacts
                </h2>
                <div className="space-y-3">
                  {TEAM.map(({ name, role, phone, initials }, i) => {
                    const colors = ['from-navy to-[#0f2d4a]', 'from-forest to-[#0a4f2b]', 'from-saffron to-orange-600'];
                    return (
                      <div key={phone} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex items-center gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[i]} text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow`}>
                          {initials}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-navy text-sm leading-tight truncate">{name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{role}</p>
                          {/* TODO: Replace with real role/designation */}
                        </div>
                        {/* Action buttons */}
                        <div className="flex gap-2 shrink-0">
                          <a
                            href={`tel:+91${phone}`}
                            aria-label={`Call ${name}`}
                            className="w-9 h-9 rounded-full bg-navy/10 hover:bg-navy text-navy hover:text-white flex items-center justify-center transition-colors text-base"
                          >
                            📞
                          </a>
                          <a
                            href={waLink(phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${name}`}
                            className="w-9 h-9 rounded-full bg-green-100 hover:bg-green-500 text-green-600 hover:text-white flex items-center justify-center transition-colors"
                          >
                            <WhatsAppIcon />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right — Map + directions */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-navy mb-4 flex items-center gap-2">
                <span className="w-1.5 h-7 rounded-full bg-navy inline-block" />
                Find Us
              </h2>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                {/* TODO: Replace with real embed URL */}
                <iframe
                  title="Shivshakti GramVikas Pratishtan — Kingaon, Ahmadpur, Latur"
                  src="https://maps.google.com/maps?q=Kingaon,Ahmadpur,Latur,Maharashtra&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 w-full"
                  aria-label="Map showing Kingaon, Ahmadpur, Latur, Maharashtra"
                />
                {/* TODO: Replace with real embed URL from Google Maps */}
              </div>
              <p className="text-xs text-center text-gray-400 italic">
                Kingaon, Tal: Ahmadpur, Dist: Latur, Maharashtra
              </p>
              <a
                href="https://maps.google.com/?q=Kingaon,Ahmadpur,Latur,Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                id="ct-directions-btn"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-navy hover:bg-[#0f2d4a] text-white font-bold text-sm transition-colors shadow"
              >
                📍 Get Directions in Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* ── 3. Enquiry Form ───────────────────────────────────────────── */}
        <section id="enquiry-form" className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-forest mb-2">Send a Message</span>
              <h2 className="text-3xl font-extrabold text-navy mb-2">Enquiry Form</h2>
              <p className="text-gray-500 text-sm">Fill in the form below and our team will get back to you within 24 hours.</p>
              <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-saffron" />
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10">
              <div className="h-1.5 w-20 rounded-full bg-navy mb-7" />
              <EnquiryForm />
            </div>
          </div>
        </section>

        {/* ── 4. Latest Notices ─────────────────────────────────────────── */}
        <section id="notices" className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-saffron mb-1">
                  Updates
                </span>
                <h2 className="text-3xl font-extrabold text-navy">Latest Notices</h2>
              </div>
              <div className="w-16 h-1 rounded-full bg-saffron hidden sm:block" />
              <a
                href="#"
                id="ct-view-all-notices"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-[#0f2d4a] transition-colors shadow"
              >
                View All Notices →
                {/* TODO: Wire to /notices page or GET /api/notices in Module 13 */}
              </a>
            </div>

            <div className="space-y-4">
              {NOTICES.map(({ category, categoryColor, date, title, desc }) => (
                <div
                  key={title}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row gap-4"
                >
                  {/* Left accent line */}
                  <div className="hidden sm:block w-1 rounded-full bg-gradient-to-b from-navy to-forest shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${categoryColor}`}>
                        {category}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">📅 {date}</span>
                    </div>
                    <h3 className="font-bold text-navy text-base leading-tight mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{desc}</p>
                  </div>

                  {/* Read more caret */}
                  <div className="flex items-center shrink-0 self-start sm:self-center">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* TODO: Replace NOTICES array with live data from GET /api/notices in Module 13 */}
            <p className="text-center text-xs text-gray-400 mt-5 italic">
              * Notice content is placeholder data — connect to <code className="bg-gray-100 px-1 rounded">GET /api/notices</code> in Module 13.
            </p>
          </div>
        </section>

        {/* ── 5. Donate Section (navy background) ──────────────────────── */}
        <section id="donate" className="py-14 px-4 sm:px-6 lg:px-8 bg-navy">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-saffron font-bold text-xl sm:text-2xl mb-2"
                style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
              >
                दान हे श्रेष्ठ कर्म आहे
              </p>
              <h2 className="text-3xl font-extrabold text-white mb-2">Support Our Work</h2>
              <p className="text-blue-200 text-sm max-w-md mx-auto">
                Your contribution helps us run the PreSchool, Read India Center, Safety College,
                Ambulance Service, and Community Programs.
              </p>
              <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-saffron" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">

              {/* Bank Transfer card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl">
                <h3 className="font-extrabold text-navy text-base mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-navy">🏦</span>
                  Bank Transfer Details
                </h3>
                {/* TODO: Add real bank details */}
                <dl className="space-y-3 text-sm">
                  {[
                    { dt: 'Account Name',   dd: '[Account Name — Placeholder]' },
                    { dt: 'Account No.',    dd: '[XXXXXXXXXXXXXXXXXX — Placeholder]', copy: true },
                    { dt: 'IFSC Code',      dd: '[IFSC — Placeholder]',               copy: true },
                    { dt: 'Bank Name',      dd: '[Bank Name — Placeholder]' },
                    { dt: 'Branch',         dd: 'Ahmadpur' },
                    { dt: 'Account Type',   dd: 'Savings / Current — [Placeholder]' },
                  ].map(({ dt, dd, copy }) => (
                    <div key={dt} className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{dt}</p>
                        <p className="font-semibold text-navy mt-0.5">{dd}</p>
                      </div>
                      {copy && (
                        <CopyButton text={dd} label={dt === 'Account No.' ? 'Acc No.' : 'IFSC'} />
                      )}
                    </div>
                  ))}
                </dl>
                {/* TODO: Add real bank details, account number, IFSC */}
                <p className="mt-4 text-xs text-gray-400 italic">
                  * Placeholder bank details — update with real information before going live.
                </p>
              </div>

              {/* UPI / QR card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
                <h3 className="font-extrabold text-navy text-base flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-navy">📱</span>
                  UPI / QR Code Payment
                </h3>

                {/* QR placeholder */}
                {/* TODO: Add real QR code image */}
                <div className="mx-auto w-48 h-48 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl text-gray-300" aria-label="QR code placeholder">▪️</span>
                  <p className="text-xs text-gray-400 text-center leading-tight px-2">
                    [UPI QR Code Image Here]<br />
                    Replace with actual QR
                  </p>
                </div>

                {/* UPI ID */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">UPI ID</p>
                  <div className="flex items-center justify-between gap-2">
                    {/* TODO: Add real bank details, UPI ID, QR code image */}
                    <p className="font-bold text-navy text-sm">[upiid@bank — Placeholder]</p>
                    <CopyButton text="[upiid@bank — Placeholder]" label="UPI ID" />
                  </div>
                </div>

                {/* Confirmation note */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
                  <p className="font-bold text-amber-700 mb-1">📸 After Payment:</p>
                  <p>
                    Send the payment screenshot on WhatsApp to:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={waLink('9763660738')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
                      aria-label="WhatsApp 9763660738"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" /> 9763660738
                    </a>
                    <a
                      href={waLink('9822375105')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
                      aria-label="WhatsApp 9822375105"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" /> 9822375105
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 80G note */}
            <div className="mt-6 text-center">
              <p className="text-blue-200 text-xs">
                💼 Donations to Shivshakti GramVikas Pratishtan may be eligible for tax exemption under Section 80G.
                {' '}<span className="text-blue-300 italic">[Confirm 80G status — TODO]</span>
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
