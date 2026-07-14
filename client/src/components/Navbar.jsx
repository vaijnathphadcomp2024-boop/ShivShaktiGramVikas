import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/',                   label: 'Home' },
  { to: '/about',              label: 'About' },
  { to: '/pre-school',         label: 'Pre School' },
  { to: '/read-india',         label: 'Read India' },
  { to: '/safety-college',     label: 'Safety College' },
  { to: '/social-activities',  label: 'Social Activities' },
  { to: '/ambulance',          label: 'Ambulance' },
  { to: '/contact-news',       label: 'Contact & News' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  // Add shadow + border after scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-navy text-white transition-all duration-300 ${
        scrolled
          ? 'shadow-2xl shadow-navy/40'
          : ''
      }`}
      style={scrolled ? { borderBottom: '1px solid rgba(249,115,22,0.25)' } : {}}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Shivshakti GramVikas Pratishtan Logo"
                className="h-11 w-11 object-contain shrink-0 transition-all duration-300
                           group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="font-bold text-sm sm:text-base text-white leading-none tracking-tight">
                Shivshakti GramVikas
              </p>
              <p className="text-[11px] text-orange-300 leading-none mt-0.5 font-medium">Pratishtan</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                   group overflow-hidden ${
                    isActive
                      ? 'text-saffron bg-white/10'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {/* Active / hover underline indicator */}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-saffron
                                  transition-all duration-300 ${isActive ? 'w-4' : 'w-0 group-hover:w-4'}`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* Admin button */}
            <Link
              to="/admin/login"
              className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold
                         bg-gradient-to-r from-saffron to-orange-500
                         hover:from-orange-500 hover:to-saffron
                         text-white shadow-lg shadow-orange-500/30
                         transition-all duration-200 hover:shadow-orange-500/50
                         hover:-translate-y-0.5"
            >
              Admin
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            id="navbar-menu-toggle"
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-white mb-1.5 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu — glassmorphism panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-350 ease-in-out ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="px-4 pt-2 pb-4 flex flex-col gap-1
                     border-t border-white/10
                     bg-navy/95 backdrop-blur-xl"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-saffron'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <Link
            to="/admin/login"
            className="mt-1 px-4 py-2.5 rounded-xl
                       bg-gradient-to-r from-saffron to-orange-500
                       text-white text-sm font-semibold text-center
                       shadow-lg shadow-orange-500/30"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
