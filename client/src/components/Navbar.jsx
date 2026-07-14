import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/',                   label: 'Home' },
  { to: '/about',              label: 'About Us' },
  { to: '/our-work',           label: 'Our Work' },
  { to: '/gallery',            label: 'Gallery' },
  { to: '/events',             label: 'Events' },
  { to: '/get-involved',       label: 'Get Involved' },
  { to: '/contact-news',       label: 'Contact Us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  // Add shadow after scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      {/* Top Bar (Contact Info & Donate) */}
      <div className="hidden lg:block border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-end gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href="tel:+919763660738">+91 97636 60738</a>
          </div>
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href="mailto:shivshaktigramvikas@gmail.com">shivshaktigramvikas@gmail.com</a>
          </div>
          <Link
            to="/donate"
            className="h-full flex items-center gap-1.5 px-6 bg-saffron text-white font-bold hover:bg-orange-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            Donate Now
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Shivshakti GramVikas Pratishtan Logo"
              className="h-14 w-14 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="leading-tight hidden sm:block">
              <p className="font-extrabold text-lg text-forest leading-none mb-0.5">
                  Shivshakti GramVikas
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest leading-none">Pratishtan</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-bold uppercase tracking-wide transition-colors duration-200 border-b-2 py-1 ${
                    isActive
                      ? 'text-saffron border-saffron'
                      : 'text-gray-700 border-transparent hover:text-saffron'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile elements */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to="/donate"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-saffron text-white text-xs font-bold hover:bg-orange-600 transition-colors"
            >
              Donate
            </Link>
            {/* Hamburger */}
            <button
              id="navbar-menu-toggle"
              className="p-2 rounded text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <nav className="bg-white px-4 pt-2 pb-4 flex flex-col gap-1 shadow-inner">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive ? 'bg-orange-50 text-saffron' : 'text-gray-700 hover:bg-gray-50 hover:text-saffron'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
             <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
               <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
               <a href="tel:+919763660738">+91 97636 60738</a>
             </div>
             <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
               <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
               <a href="mailto:shivshaktigramvikas@gmail.com">shivshaktigramvikas@gmail.com</a>
             </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
