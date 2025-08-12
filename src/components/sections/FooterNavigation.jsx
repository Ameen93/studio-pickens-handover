import React from 'react';
import { TYPOGRAPHY_CLASSES } from '../../constants/typography';

const FooterNavigation = ({ links, onNavigate, variant = 'desktop' }) => {
  if (variant === 'desktop') {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              if (link.external) {
                window.open(link.href, '_blank', 'noopener,noreferrer');
              } else {
                onNavigate(link.href);
              }
            }}
            className={`relative ${TYPOGRAPHY_CLASSES.navLink} hover:text-studio-orange transition-colors duration-200 text-left`}
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange transition-all duration-300 hover:w-full"></span>
          </button>
        ))}
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="space-y-4 mb-8">
      {links.map((link) => (
        <div key={link.name} className="block">
          <button
            onClick={() => onNavigate(link.href)}
            className="inline-block font-proxima-wide font-bold text-white text-lg tracking-[3%] uppercase pb-2"
          >
            {link.name}
          </button>
          <div className="h-0.5 bg-studio-orange" style={{width: `${link.name.length * 0.8}em`}}></div>
        </div>
      ))}
    </div>
  );
};

export default FooterNavigation;