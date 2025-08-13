import React, { useState } from 'react';

const MobileWorkItem = ({ project, content, onCategoryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const handleTap = () => {
    // Only allow expansion if the item has content info
    const hasContent = content && (content.stylist || content.photographer || content.date);
    if (hasContent) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mb-12 last:mb-0">
      {/* Image container */}
      <div 
        className="relative overflow-hidden"
        style={{ aspectRatio: '9/16' }}
      >
        <img
          src={project.mobileImage || project.image || project.src}
          alt={project.alt}
          className="w-full h-full object-cover shadow-lg"
          style={{
            objectPosition: (project.mobileImage || project.image || project.src)?.includes('editorial2') || (project.mobileImage || project.image || project.src)?.includes('editorial3') || (project.mobileImage || project.image || project.src)?.includes('nine-perfect-strangers') ? 'center top' : (project.mobileImage || project.image || project.src)?.includes('beyonce-editorial') ? '40% 0%' : (project.mobileImage || project.image || project.src)?.includes('the-last-show-girl') ? '10% center' : (project.mobileImage || project.image || project.src)?.includes('stereo-phonic') ? '30% center' : (project.mobileImage || project.image || project.src)?.includes('house-of-david') ? '25% center' : (project.mobileImage || project.image || project.src)?.includes('the-killer') ? '75% center' : (project.mobileImage || project.image || project.src)?.includes('bullet-train') ? '32% center' : 'center center',
            transform: (project.mobileImage || project.image || project.src)?.includes('beyonce-editorial') ? 'scale(1.4) translateY(10%)' : 'none'
          }}
        />
        
        {/* Category Label Circle */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleTap();
          }}
          className={`absolute bottom-8 w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer z-20 ${
            project.id % 2 === 1 ? 'left-4' : 'right-4'
          } ${isExpanded ? 'bg-studio-bg border-2 border-studio-blue' : 'bg-studio-blue'}`}
        >
          <span 
            className={`font-proxima-wide font-bold uppercase text-center leading-tight text-xs transition-colors duration-300 ${
              isExpanded ? 'text-studio-blue' : 'text-studio-orange'
            }`}
            style={{
              letterSpacing: '0.02em',
              transform: project.id % 2 === 1 ? 'rotate(-15deg)' : 'rotate(15deg)',
              whiteSpace: project.category === 'MUSIC VIDEO' ? 'pre-line' : 'nowrap'
            }}
          >
            {project.category === 'MUSIC VIDEO' ? 'MUSIC\nVIDEO' : project.category}
          </span>
        </button>
      </div>

      {/* Info Card - Displayed below image when expanded */}
      <div 
        className={`mt-4 bg-studio-bg p-6 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Title */}
        <h5 className="font-proxima-wide font-bold text-studio-blue text-3xl uppercase tracking-wide mb-4">
          {content?.title || project.title}
        </h5>

        {/* Photographer Section */}
        <div className="mb-3">
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-base uppercase tracking-wide mb-4">
            {content?.labels?.photographer || 'PHOTOGRAPHER'}
          </h6>
          <p className="font-['Cutive_Mono'] font-normal uppercase text-[1.5rem] leading-[50%] text-studio-blue py-1">
            {content?.photographer}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-1"></div>
        </div>

        {/* Stylist Section */}
        <div className="mb-3">
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-base uppercase tracking-wide mb-4">
            {content?.labels?.stylist || 'STYLIST'}
          </h6>
          <p className="font-['Cutive_Mono'] font-normal uppercase text-[1.5rem] leading-[50%] text-studio-blue py-1">
            {content?.stylist}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-1"></div>
        </div>

        {/* Date Section */}
        <div>
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-base uppercase tracking-wide mb-4">
            {content?.labels?.date || 'DATE'}
          </h6>
          <p className="font-['Cutive_Mono'] font-normal uppercase text-[1.5rem] leading-[50%] text-studio-blue py-1">
            {content?.date}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileWorkItem;