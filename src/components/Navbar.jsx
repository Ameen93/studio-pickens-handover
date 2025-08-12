import React, { useState, useEffect } from 'react';
import { NAVIGATION_LINKS } from '../constants';
import { TYPOGRAPHY_CLASSES } from '../constants/typography';
import NavLink from './common/NavLink';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Navbar = () => {
  // Get current pathname for active state
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll progress for smooth animations
  const scrollProgress = Math.min(Math.max(scrollY - 80, 0) / 80, 1); // Progress from 80px to 160px
  const isHomePage = currentPath === '/';

  const { left: leftLinks, right: rightLinks } = NAVIGATION_LINKS;
  const allLinks = [...leftLinks, ...rightLinks];

  const isActive = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-studio-bg w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center py-6">
          <div className="flex items-center justify-center">
            {/* Left Navigation Links */}
            {leftLinks.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={isActive(link.href)}
                onClick={navigate}
                variant="desktop"
              />
            ))}

            {/* Center Title - Show on scroll for home page, always show for other pages */}
            {(isHomePage ? scrollProgress > 0.6 : true) && (
              <div 
                className="transition-all duration-500 ease-out overflow-hidden flex justify-center mx-6"
                style={{
                  opacity: isHomePage ? Math.min((scrollProgress - 0.6) * 2.5, 1) : 1,
                  transform: isHomePage ? `translateY(${(1 - Math.min((scrollProgress - 0.6) * 2.5, 1)) * 30}px) scale(${0.6 + Math.min((scrollProgress - 0.6) * 2.5, 1) * 0.4})` : 'scale(1)',
                }}
              >
                <button
                  onClick={() => navigate('/')}
                  className={`font-proxima-wide font-semibold text-nav-blue text-center whitespace-nowrap uppercase`}
                  style={{
                    fontSize: '27px',
                    letterSpacing: '0.03em'
                  }}
                >
                  STUDIO PICKENS
                </button>
              </div>
            )}

            {/* Right Navigation Links */}
            {rightLinks.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={isActive(link.href)}
                onClick={navigate}
                variant="desktop"
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex items-center py-6">
            {/* Logo Section - Takes up remaining space and left-aligns logo */}
            <div className="flex-1 flex justify-start">
              <button
                onClick={() => navigate('/')}
                className="text-nav-logo font-proxima-wide font-semibold text-nav-blue uppercase text-left"
              >
                STUDIO PICKENS
              </button>
            </div>
            
            {/* Burger Menu Section - Fixed width with equal padding */}
            <div className="flex justify-center px-4">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-nav-blue focus:outline-none"
                aria-label="Toggle menu"
              >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="border-t border-studio-blue/10 py-4">
              <div className="flex flex-col space-y-2">
                {allLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    link={link}
                    isActive={isActive(link.href)}
                    onClick={(href) => {
                      navigate(href);
                      setIsMobileMenuOpen(false);
                    }}
                    variant="mobile"
                    className="text-center"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;