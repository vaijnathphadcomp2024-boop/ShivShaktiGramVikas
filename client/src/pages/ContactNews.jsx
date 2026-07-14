import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

// ─── WhatsApp helper ─────────────────────────────────────────────────────────
const waLink = (phone) => `https://wa.me/91${phone}`;

// ─── Default notices (fallback while Firestore loads) ───────────────────────
const DEFAULT_NOTICES = [
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

const getCategoryColor = (category) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('admission')) return 'bg-navy text-white';
  if (cat.includes('event')) return 'bg-forest text-white';
  if (cat.includes('general')) return 'bg-saffron text-white';
  if (cat.includes('ambulance')) return 'bg-[#e11d48] text-white';
  if (cat.includes('social')) return 'bg-cyan text-white';
  return 'bg-gray-500 text-white';
};

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────
function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────
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
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
        copied
          ? 'bg-green-100 text-green-700 border border-green-200 scale-95'
          : 'bg-navy/10 hover:bg-navy/20 text-navy border border-navy/20 hover:scale-105'
      }`}
      aria-label={`Copy ${label} to clipboard`}
    >
      {copied ? '✅ Copied!' : `📋 ${label}`}
    </button>
  );
}

// ─── Bank Detail Row ──────────────────────────────────────────────────────────
function BankRow({ label, value, copyLabel }) {
  const isEmpty = !value || String(value).trim() === '';
  return (
    <div className="flex items-start justify-between gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`font-semibold text-sm leading-snug break-words ${isEmpty ? 'text-gray-300 italic' : 'text-navy'}`}>
          {isEmpty ? '—' : value}
        </p>
      </div>
      {copyLabel && !isEmpty && (
        <div className="shrink-0 mt-3">
          <CopyButton text={String(value)} label={copyLabel} />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactNews() {
  const [bankDetails, setBankDetails] = useState(null);
  const [bankLoading, setBankLoading] = useState(true);
  const [notices, setNotices] = useState(DEFAULT_NOTICES);

  useEffect(() => {
    // Fetch bank details from Firestore settings/bankDetails
    const fetchBank = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'bankDetails'));
        if (snap.exists()) {
          setBankDetails(snap.data());
        }
      } catch (e) {
        console.error('Bank details fetch error:', e);
      } finally {
        setBankLoading(false);
      }
    };

    // Fetch notices from Firestore notices collection
    const fetchNotices = async () => {
      try {
        const snap = await getDocs(collection(db, 'notices'));
        if (!snap.empty) {
          const fetched = snap.docs.map((d) => d.data());
          fetched.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setNotices(fetched);
        }
      } catch (e) {
        console.error('Notices fetch error:', e);
      }
    };

    fetchBank();
    fetchNotices();
  }, []);

  const bd = bankDetails || {};

  return (
    <main className="animate-fadeIn">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        id="cn-hero"
        className="relative overflow-hidden hero-section bg-gradient-to-br from-navy via-[#0f2d4a] to-forest py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="hero-watermark">
          <img src="/assets/logo.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 animate-fadeInUp max-w-3xl mx-auto text-white">
          <p
            className="text-saffron font-bold text-xl sm:text-2xl mb-2"
            style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
          >
            एकच ध्यास... सर्वांगिण विकास...
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact &amp; Latest News</h1>
          <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
            Stay updated with the latest notices, donate to our cause, and reach out to our team.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#bank-details"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron text-white font-bold text-sm
                         hover:bg-orange-500 hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              🏦 Donate / Bank Details
            </a>
            <a
              href="#notices"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20
                         text-white font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              📢 Latest Notices
            </a>
          </div>
        </div>
      </section>

      {/* ── Bank Transfer + UPI ────────────────────────────────────────────── */}
      <section id="bank-details" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-navy/10 border border-navy/20 text-navy">
              <span className="w-1.5 h-1.5 rounded-full bg-navy" />
              Support Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Donate to Shivshakti</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Your contribution helps run the PreSchool, ReadIndia Center, Safety College, Ambulance Service,
              and Community Programs.
            </p>
            <p
              className="text-saffron font-bold text-lg mt-2"
              style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
            >
              दान हे श्रेष्ठ कर्म आहे
            </p>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-saffron to-orange-400" />
          </div>

          {/* Loading skeleton */}
          {bankLoading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-md p-7 space-y-4">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="skeleton h-5 w-full rounded-md" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">

              {/* ── Bank Transfer Card ── */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-navy to-forest" />
                <div className="p-7">
                  <h3 className="font-extrabold text-navy text-base mb-6 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center text-lg shadow-sm">
                      🏦
                    </span>
                    Bank Transfer Details
                  </h3>

                  <dl>
                    <BankRow label="Account Name"  value={bd.accountName}   />
                    <BankRow label="Account No."   value={bd.accountNumber}  copyLabel="Acc No." />
                    <BankRow label="IFSC Code"     value={bd.ifscCode}       copyLabel="IFSC" />
                    <BankRow label="Bank Name"     value={bd.bankName}       />
                    <BankRow label="Branch"        value={bd.branch}         />
                    <BankRow label="Account Type"  value={bd.accountType}    />
                  </dl>

                  <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
                    💼 Donations may be eligible for <strong>Section 80G</strong> tax exemption. Contact us for a receipt.
                  </div>
                </div>
              </div>

              {/* ── UPI / QR Card ── */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-saffron to-orange-400" />
                <div className="p-7 flex flex-col gap-5">
                  <h3 className="font-extrabold text-navy text-base flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-saffron/10 flex items-center justify-center text-lg shadow-sm">
                      📱
                    </span>
                    UPI / QR Code Payment
                  </h3>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    {bd.qrUrl ? (
                      <div className="relative w-48 h-48">
                        <img
                          src={bd.qrUrl}
                          alt="UPI QR Code for donation"
                          className="w-48 h-48 object-contain rounded-xl border-2 border-saffron/30 shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                          Scan to Pay
                        </div>
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-3">
                        <span className="text-4xl text-gray-300">▪️</span>
                        <p className="text-xs text-gray-400 text-center leading-tight px-4">
                          QR Code not available.<br />Use UPI ID below.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* UPI ID */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">UPI ID</p>
                    {bd.upiId ? (
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-navy text-sm break-all">{bd.upiId}</p>
                        <CopyButton text={bd.upiId} label="UPI ID" />
                      </div>
                    ) : (
                      <p className="text-gray-300 italic text-sm">Not available</p>
                    )}
                  </div>

                  {/* After payment */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
                    <p className="font-bold text-green-700 mb-2">📸 After Payment:</p>
                    <p className="mb-2">Send the payment screenshot on WhatsApp to:</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={waLink('9763660738')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
                        aria-label="WhatsApp 9763660738"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" /> 9763660738
                      </a>
                      <a
                        href={waLink('9822375105')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
                        aria-label="WhatsApp 9822375105"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" /> 9822375105
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ── Latest Notices ───────────────────────────────────────────────────── */}
      <section id="notices" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="block text-xs font-black uppercase tracking-widest text-saffron mb-1">Updates</span>
              <h2 className="text-3xl font-extrabold text-navy">Latest Notices</h2>
            </div>
            <div className="w-16 h-1 rounded-full bg-saffron hidden sm:block" />
          </div>

          <div className="space-y-4">
            {notices.map(({ category, categoryColor, date, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5
                           transition-all duration-300 p-5 flex flex-col sm:flex-row gap-4 group"
              >
                <div className="hidden sm:block w-1 rounded-full bg-gradient-to-b from-navy to-forest shrink-0
                                group-hover:from-saffron group-hover:to-orange-400 transition-all duration-300" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        categoryColor || getCategoryColor(category)
                      }`}
                    >
                      {category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">📅 {date}</span>
                  </div>
                  <h3 className="font-bold text-navy text-base leading-tight mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{desc}</p>
                </div>
                <div className="flex items-center shrink-0 self-start sm:self-center">
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-saffron transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
