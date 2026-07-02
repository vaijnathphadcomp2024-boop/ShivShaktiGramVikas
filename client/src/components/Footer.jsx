import { Link } from 'react-router-dom';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1eVRJYWho5/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919822375105',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.526 5.855L0 24l6.335-1.509A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.668-.497-5.198-1.364L3 21.5l.885-3.7A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    // TODO: Add YouTube URL
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
    <footer className="bg-navy text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Column 1 — About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Shivshakti GramVikas Pratishtan Logo"
                className="h-14 w-14 object-contain shrink-0 drop-shadow-md"
              />
              <div>
                <p className="font-bold text-white leading-tight">शिवशक्ती ग्रामविकास प्रतिष्ठान</p>
                <p className="text-xs text-orange-200">Shivshakti Gram Vikas Pratishtan</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              एकच ध्यास... सर्वांगिण विकास...
            </p>
            {/* Trust Registration Placeholder */}
            <div className="text-xs bg-white/5 rounded p-3 space-y-1 border border-white/10">
              <p className="font-semibold text-white uppercase tracking-wide text-[10px] mb-1">
                Registration Details
              </p>
              <p>Regd. No.: <span className="text-saffron">[XXXX/YYYY]</span></p>
              <p>80G / 12A: <span className="text-saffron">[Pending / Add Here]</span></p>
              <p>PAN: <span className="text-saffron">[XXXXXXXXXX]</span></p>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-saffron transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron group-hover:w-2 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact + Social */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Get in Touch
            </h3>
            <address className="not-italic text-sm space-y-3 mb-6">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 text-saffron mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>किनगाव, ता. अहमदपूर, जि. लातूर, महाराष्ट्र / Kinganv, Tal: Ahmadpur, Dist: Latur, Maharashtra</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-saffron shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+919272418496" className="hover:text-saffron transition-colors">🚑 Ambulance 24×7</a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-saffron shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:shivshaktigramvikas@gmail.com?cc=sit.mh2026@gmail.com" className="hover:text-saffron transition-colors">shivshaktigramvikas@gmail.com, sit.mh2026@gmail.com</a>
              </p>
            </address>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron text-blue-100 hover:text-white transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <p>© 2026 शिवशक्ती ग्रामविकास प्रतिष्ठान, किनगाव | सर्व हक्क राखीव | All Rights Reserved</p>
          <p>Designed with ❤️ Vaijanath Phad</p>
        </div>
      </div>
    </footer>
  );
}
