import React from 'react';
import { useWorkData } from '../hooks';

const WorkBanners = ({ onBannerClick }) => {
  const { workData, loading, error } = useWorkData();
  // Include all banners including MUSIC VIDEO
  const sectionBanners = workData.sectionBanners || [];

  if (loading) {
    return <div className="bg-studio-bg pt-16 relative w-full h-64">Loading...</div>;
  }

  return (
    <section className="bg-studio-bg pt-12 relative w-full">
      {sectionBanners.map((banner, index) => (
        <div
          key={`${banner.category}-${index}`}
          className="relative w-full group cursor-pointer overflow-hidden"
          onClick={() => onBannerClick && onBannerClick(banner.category)}
          style={{
            height: 'clamp(100px, 22.36vw, 322px)' // Half height on mobile, same on desktop
          }}
        >
            {/* Banner Image */}
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              style={{
                objectPosition: banner.transform?.objectPosition || 'center center',
                transform: `scale(${banner.transform?.scale || 1}) translateX(${banner.transform?.translateX || 0}px) translateY(${banner.transform?.translateY || 0}px)`
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />
            
            {/* Category Text */}
            <div className="absolute inset-0 flex items-center">
              <div className="pl-16"> {/* Left padding for alignment */}
                <h2 
                  className="font-proxima-wide font-bold uppercase text-left text-studio-bg group-hover:text-studio-orange transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(24px, 3.33vw, 48px)', // 48/1440 = 3.33%
                    lineHeight: '100%',
                    letterSpacing: '0.03em'
                  }}
                >
                  {banner.category}
                </h2>
              </div>
            </div>
        </div>
      ))}
    </section>
  );
};

export default WorkBanners;