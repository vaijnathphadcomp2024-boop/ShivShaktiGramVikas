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

  // Add shadow after scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-navy text-white transition-shadow duration-300 ${
        scrolled ? 'shadow-xl' : ''
      }`}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Real NGO logo */}
            <img
              src="/logo.png"
              alt="Shivshakti GramVikas Pratishtan Logo"
              className="h-12 w-12 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow-md"
            />
            <div className="leading-tight hidden sm:block">
              <p className="font-bold text-sm sm:text-base text-white leading-none">
                  Shivshakti GramVikas
              </p>
              <p className="text-xs text-orange-200 leading-none">Pratishtan</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-forest text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/admin/login"
              className="ml-3 px-4 py-1.5 rounded bg-saffron text-white text-sm font-semibold hover:bg-orange-500 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            id="navbar-menu-toggle"
            className="lg:hidden p-2 rounded hover:bg-white/10 transition"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-navy/95 backdrop-blur px-4 pt-2 pb-4 flex flex-col gap-1 border-t border-white/10">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest text-white' : 'text-blue-100 hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/admin/login"
            className="mt-1 px-4 py-2.5 rounded bg-saffron text-white text-sm font-semibold text-center"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
