import React from 'react';
import { TYPOGRAPHY_CLASSES } from '../../constants/typography';

const LocationButton = ({ 
  location, 
  onClick,
  variant = 'desktop', // 'desktop' | 'mobile' | 'contact'
  isActive = false,
  className = ""
}) => {
  const getLocationName = (location) => {
    const names = {
      'brooklyn': 'NEW YORK',
      'beverlyhills': 'BEVERLY HILLS', 
      'london': 'LONDON'
    };
    return names[location] || location.toUpperCase();
  };

  const getMinWidth = (location) => {
    const widths = {
      'brooklyn': 'min-w-[200px]',
      'beverlyhills': 'min-w-[280px]',
      'london': 'min-w-[160px]'
    };
    return widths[location] || 'min-w-[200px]';
  };

  if (variant === 'mobile') {
    return (
      <button
        onClick={onClick}
        className={`block ${TYPOGRAPHY_CLASSES.navLinkMobile} ${className}`}
      >
        {getLocationName(location)}
      </button>
    );
  }

  if (variant === 'contact') {
    return (
      <div className="text-center">
        <div 
          className="flex items-center justify-center mb-4 cursor-pointer"
          onClick={onClick}
        >
          <div className={`w-6 h-6 rounded-full border-2 mr-3 transition-all duration-300 ${
            isActive ? 'border-studio-orange bg-studio-orange' : 'border-studio-orange'
          }`}></div>
          <h2 className={`${TYPOGRAPHY_CLASSES.contactLocation} text-2xl`}>
            {getLocationName(location)}
          </h2>
        </div>
      </div>
    );
  }

  // Default desktop variant
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 group ${className}`}
    >
      <div className="w-6 h-6 rounded-full border-2 border-studio-orange group-hover:bg-studio-orange transition-colors duration-200"></div>
      <span className={`${TYPOGRAPHY_CLASSES.footerLocationDesktop} inline-block ${getMinWidth(location)}`}>
        {getLocationName(location)}
      </span>
    </button>
  );
};

export default LocationButton;