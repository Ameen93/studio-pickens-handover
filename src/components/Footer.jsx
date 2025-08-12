import React from 'react';
import { NAVIGATION_LINKS } from '../constants';
import FooterLocations from './sections/FooterLocations';
import FooterNavigation from './sections/FooterNavigation';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const pageLinks = NAVIGATION_LINKS.all;
  const desktopLinks = NAVIGATION_LINKS.desktop;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-studio-blue">
      {/* Desktop Layout */}
      <div className="hidden md:block px-[50px] pt-[50px] pb-[50px]">
        <div className="flex justify-between items-start mb-8">
          {/* Left Column - Locations */}
          <FooterLocations 
            variant="desktop" 
            onLocationClick={navigate}
          />

          {/* Center Column - Page Links */}
          <FooterNavigation 
            links={desktopLinks}
            onNavigate={navigate}
            variant="desktop"
          />

          {/* Right Column - Back to Top */}
          <button
            onClick={scrollToTop}
            className="group cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <div className="w-[126px] h-[126px] rounded-full border-[2.21px] border-studio-orange flex items-center justify-center group-hover:bg-studio-orange transition-colors duration-200">
              <span className="font-proxima-wide font-bold text-studio-orange group-hover:text-studio-blue text-[20px] leading-[110%] tracking-[3%] text-center uppercase">
                BACK<br />TO TOP
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Section - Signature positioned under links */}
        <div className="flex justify-between">
          <div className="w-[600px]"></div> {/* Match left column width */}
          <div 
            className="flex justify-center group"
            // onClick={() => navigate('/story')}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter' || e.key === ' ') {
            //     e.preventDefault();
            //     navigate('/story');
            //   }
            // }}
            // tabIndex={0}
            // role="button"
            // aria-label="Navigate to story page"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/footer/footer-signature.png`}
              alt="Studio Pickens Signature"
              className="w-auto group-hover:hidden"
              style={{ height: '80px' }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/footer/footer-signature-white.png`}
              alt="Studio Pickens Signature"
              className="w-auto hidden group-hover:block"
              style={{ height: '80px' }}
            />
          </div>
          <div className="w-[126px]"></div> {/* Match right column width */}
        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center mt-8">
          <p className="font-proxima text-white text-sm">
            © Studio Pickens 2025
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/terms')}
              className="font-proxima text-white text-sm hover:text-white transition-colors duration-200"
              aria-label="View terms and conditions"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/legal')}
              className="font-proxima text-white text-sm hover:text-white transition-colors duration-200"
              aria-label="View legal information"
            >
              Legal
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 pt-12 pb-8">
        {/* Signature at top */}
        <div className="flex justify-left mb-12">
          <img
            src={`${process.env.PUBLIC_URL}/images/footer/footer-signature.png`}
            alt="Studio Pickens Signature"
            className="h-16 w-auto"
          />
        </div>

        {/* Locations */}
        <FooterLocations 
          variant="mobile" 
          onLocationClick={navigate}
        />

        {/* Page Links */}
        <FooterNavigation 
          links={pageLinks}
          onNavigate={navigate}
          variant="mobile"
        />
        
        {/* Instagram Link */}
        <div className="space-y-4 mb-8">
          <div className="block">
            <button
              onClick={() => window.open('https://www.instagram.com/studio_pickens/', '_blank')}
              className="inline-block font-proxima-wide font-bold text-white text-lg tracking-[3%] uppercase pb-2"
            >
              INSTAGRAM
            </button>
            <div className="h-0.5 bg-studio-orange" style={{width: '7.2em'}}></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center">
          <p className="font-proxima text-white text-sm">
            © Studio Pickens 2025
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/terms')}
              className="font-proxima text-white text-sm"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/legal')}
              className="font-proxima text-white text-sm"
            >
              Legal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;