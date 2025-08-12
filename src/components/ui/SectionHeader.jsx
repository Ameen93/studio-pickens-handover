import React from 'react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  showDivider = true, 
  alignment = 'center',
  size = 'large',
  className = ''
}) => {
  const alignmentClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  };

  const titleSizes = {
    small: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl'
  };

  return (
    <div className={`mb-16 ${alignmentClasses[alignment]} ${className}`}>
      <h1 className={`font-proxima font-bold ${titleSizes[size]} text-studio-blue tracking-studio uppercase mb-4`}>
        {title}
      </h1>
      
      {showDivider && (
        <div className={`w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-blue mb-6 ${
          alignment === 'center' ? 'mx-auto' : 
          alignment === 'right' ? 'ml-auto' : ''
        }`} />
      )}
      
      {subtitle && (
        <p className="text-lg text-studio-blue/80 leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;