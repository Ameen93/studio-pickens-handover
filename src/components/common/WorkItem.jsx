import React from 'react';

const WorkItem = ({ project, content, getCirclePosition, getTextRotation, getTextHoverRotation, getContentPosition, onCategoryClick }) => {
  return (
    <div
      className="absolute group cursor-pointer"
      style={{ 
        left: `clamp(${project.left * 0.2}px, ${(project.left / 1440) * 100}vw, ${project.left}px)`,
        top: `clamp(${project.top * 0.2}px, ${(project.top / 1440) * 100}vw, ${project.top}px)`,
        width: 'clamp(300px, 45.83vw, 660px)',
        height: 'clamp(169px, 25.83vw, 372px)',
      }}
    >
      {/* Image and Circle Container */}
      <div className="relative w-full h-full">
        {/* Project Image */}
        <img
          src={project.image || project.src}
          alt={project.alt}
          className="w-full h-full object-cover"
          style={{
            objectPosition: (project.image || project.src)?.includes('editorial2') || (project.image || project.src)?.includes('editorial3') || (project.image || project.src)?.includes('nine-perfect-strangers') ? 'center top' : (project.image || project.src)?.includes('beyonce-editorial') ? 'center 10%' : 'center center',
            transform: project.transform ? `scale(${project.transform.scale || 1}) translateX(${project.transform.translateX || 0}px) translateY(${project.transform.translateY || 0}px) ${project.transform.flip ? 'scaleX(-1)' : ''}` : 'none'
          }}
        />
        
        {/* Category Label Circle - positioned relative to image */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCategoryClick?.(project.category);
          }}
          className={`absolute top-1/2 ${getCirclePosition(project.side)} bg-studio-blue group-hover:bg-studio-bg border-2 border-studio-blue rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer z-20`}
          style={{
            width: 'clamp(64px, 6.69vw, 96px)',
            height: 'clamp(64px, 6.69vw, 96px)',
            transform: 'translateY(-50%)',
          paddingTop: 'clamp(29px, 3.06vw, 44px)',
          paddingBottom: 'clamp(29px, 3.06vw, 44px)',
          paddingLeft: 'clamp(6px, 0.63vw, 9px)',
          paddingRight: 'clamp(6px, 0.63vw, 9px)'
        }}
      >
        <span 
          className={`text-studio-orange group-hover:text-studio-blue font-proxima-wide font-bold uppercase text-center leading-tight whitespace-nowrap transition-all duration-300 ${getTextHoverRotation(project.side)}`}
          style={{
            fontSize: 'clamp(7px, 0.69vw, 10px)',
            letterSpacing: '0.02em',
            transform: getTextRotation(project.side)
          }}
        >
          {project.category}
        </span>
      </button>
      </div>

      {/* Content Panel - Slides out on hover (only for left and right positioned items) */}
      {project.side !== 'center' && (
        <div 
          className={`absolute top-0 ${getContentPosition(project.side)} bg-studio-bg p-8 transition-all duration-500 ease-out z-10 h-full flex flex-col justify-between
            ${project.side === 'left' ? 'opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0' : ''}
            ${project.side === 'right' ? 'opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0' : ''}
          `}
          style={{
            width: 'clamp(330.48px, 50.49vw, 727.06px)',
            height: 'clamp(169px, 25.83vw, 372px)'
          }}
        >
        {/* Title */}
        <div className="flex-shrink-0">
          <h5 className="font-proxima-wide font-bold text-studio-blue uppercase tracking-wide mb-2"
              style={{ fontSize: 'clamp(16px, 2.22vw, 32px)' }}>
            {content?.title || project.title}
          </h5>
        </div>

        {/* Content Sections - Fill remaining space */}
        <div className="flex-1 flex flex-col justify-center space-y-2">
          {/* Photographer Section */}
          <div>
            <h6 className="font-proxima-nova font-semibold text-studio-blue uppercase tracking-wide mb-0 lg:mb-4"
                style={{ fontSize: 'clamp(8px, 0.83vw, 12px)' }}>
              {content?.labels?.photographer || 'PHOTOGRAPHER'}
            </h6>
            <p className="font-['Cutive_Mono'] font-normal uppercase text-studio-blue pl-2 py-2"
               style={{ fontSize: 'clamp(6px, 1.11vw, 16px)', lineHeight: '50%' }}>
              {content?.photographer}
            </p>
            <div className="w-5/8 h-px border-b border-dotted border-studio-blue mt-1"></div>
          </div>

          {/* Stylist Section */}
          <div>
            <h6 className="font-proxima-nova font-semibold text-studio-blue uppercase tracking-wide mb-0 lg:mb-4"
                style={{ fontSize: 'clamp(8px, 0.83vw, 12px)' }}>
              {content?.labels?.stylist || 'STYLIST'}
            </h6>
            <p className="font-['Cutive_Mono'] font-normal uppercase text-studio-blue pl-2 py-2"
               style={{ fontSize: 'clamp(6px, 1.11vw, 16px)', lineHeight: '50%' }}>
              {content?.stylist}
            </p>
            <div className="w-5/8 h-px border-b border-dotted border-studio-blue mt-1"></div>
          </div>

          {/* Date Section */}
          <div>
            <h6 className="font-proxima-nova font-semibold text-studio-blue uppercase tracking-wide mb-0 lg:mb-4"
                style={{ fontSize: 'clamp(8px, 0.83vw, 12px)' }}>
              {content?.labels?.date || 'DATE'}
            </h6>
            <p className="font-['Cutive_Mono'] font-normal uppercase text-studio-blue pl-2 py-2"
               style={{ fontSize: 'clamp(6px, 1.11vw, 16px)', lineHeight: '50%' }}>
              {content?.date}
            </p>
            <div className="w-5/8 h-px border-b border-dotted border-studio-blue mt-1"></div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default WorkItem;