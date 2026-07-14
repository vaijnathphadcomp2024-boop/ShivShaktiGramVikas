import { Link } from 'react-router-dom';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1eVRJYWho5/',
    color: 'hover:bg-[#1877f2]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919822375105',
    color: 'hover:bg-[#25d366]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.526 5.855L0 24l6.335-1.509A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.668-.497-5.198-1.364L3 21.5l.885-3.7A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    color: 'hover:bg-[#ff0000]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const quickLinks = [
  { to: '/about',             label: 'About Us' },
  { to: '/pre-school',        label: 'Pre School' },
  { to: '/read-india',        label: 'Read India Center' },
  { to: '/safety-college',    label: 'Safety College' },
  { to: '/social-activities', label: 'Social Activities' },
  { to: '/ambulance',         label: 'Ambulance Service' },
  { to: '/contact-news',      label: 'Contact & News' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-blue-100 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-saffron/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-forest/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="Shivshakti GramVikas Pratishtan Logo"
                className="h-14 w-14 object-contain shrink-0 drop-shadow-lg"
              />
              <div>
                <p className="font-bold text-white leading-tight text-sm">शिवशक्ती ग्रामविकास प्रतिष्ठान</p>
                <p className="text-xs text-orange-300 mt-0.5">Shivshakti Gram Vikas Pratishtan</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5 text-blue-200">
              एकच ध्यास... सर्वांगिण विकास...
            </p>

            {/* Registration card — glassmorphism */}
            <div
              className="text-xs rounded-xl p-4 space-y-1.5 border"
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(249,115,22,0.2)',
              }}
            >
              <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron inline-block" />
                Registration Details
              </p>
              <p className="flex justify-between">
                <span className="text-blue-300">Regd. No.</span>
                <span className="text-saffron font-semibold">F-0025099(LTR)</span>
              </p>
              <p className="flex justify-between">
                <span className="text-blue-300">80G / 12A</span>
                <span className="text-green-400 font-semibold">✅ Registered</span>
              </p>
              <p className="flex justify-between">
                <span className="text-blue-300">PAN</span>
                <span className="text-saffron font-semibold">AAALS9265P</span>
              </p>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-saffron rounded-full inline-block" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-blue-200 hover:text-saffron transition-colors duration-200
                               flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron/50 group-hover:bg-saffron
                                     group-hover:w-2 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact + Social */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-saffron rounded-full inline-block" />
              Get in Touch
            </h3>

            <address className="not-italic text-sm space-y-3.5 mb-6 text-blue-200">
              <p className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-saffron/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <span className="leading-relaxed">किनगाव, ता. अहमदपूर, जि. लातूर, महाराष्ट्र / Kinganv, Tal: Ahmadpur, Dist: Latur, Maharashtra</span>
              </p>

              <p className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-saffron/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <a href="tel:+919272418496" className="hover:text-saffron transition-colors">🚑 Ambulance 24×7</a>
              </p>

              <p className="flex items-start gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-saffron/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <a href="mailto:shivshaktigramvikas@gmail.com?cc=sit.mh2026@gmail.com"
                   className="hover:text-saffron transition-colors text-xs leading-relaxed">
                  shivshaktigramvikas@gmail.com<br />
                  <span className="text-blue-400">sit.mh2026@gmail.com</span>
                </a>
              </p>
            </address>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center
                              text-blue-100 hover:text-white transition-all duration-200
                              hover:-translate-y-0.5 hover:shadow-lg ${color}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-400"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p>© 2026 शिवशक्ती ग्रामविकास प्रतिष्ठान, किनगाव | सर्व हक्क राखीव | All Rights Reserved</p>
          <p className="flex items-center gap-1">
            Designed with <span className="text-red-400">❤️</span> by Vaijanath Phad
          </p>
        </div>
      </div>
    </footer>
  );
}
