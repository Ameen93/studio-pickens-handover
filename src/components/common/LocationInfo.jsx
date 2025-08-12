import React, { useState, useRef, useEffect } from 'react';
import { TYPOGRAPHY_CLASSES } from '../../constants/typography';
import ImageWithPath from './ImageWithPath';
import { validateLocationData } from '../../utils/validation';

const LocationInfo = React.memo(({ 
  location, 
  address,
  imagePath,
  imageAlt,
  mapsUrl,
  variant = 'left' // 'left' | 'right'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const componentRef = useRef(null);
  const isLeft = variant === 'left';
  
  // Determine if we should show the expanded state
  const isExpanded = isHovered || isTapped;
  
  // Handle click outside to ensure state consistency
  useEffect(() => {
    const handleClick = (e) => {
      if (componentRef.current && !componentRef.current.contains(e.target)) {
        setIsTapped(false);
      }
    };
    
    if (window.innerWidth < 768) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, []);
  
  // Define hover content
  const getHoverContent = () => {
    if (location === 'Beverly Hills') {
      return {
        title: 'Crafting Signature Looks for TV & Film',
        description: 'Located in the heart of Beverly Hills, our West Coast studio is where artistry meets on-screen storytelling.\n\nAt Studio Pickens Beverly Hills, we specialize in designing, constructing, and customizing wigs for television, film, and live performance. From high-concept fantasy to period-accurate realism, our expert team collaborates closely with leading costume designers, stylists, and production teams to bring characters to life with precision, speed, and discretion.\n\nWhether it\'s a feature film or a last-minute pickup day, this studio is built for the fast-paced demands of the entertainment industry.'
      };
    } else if (location === 'New York') {
      return {
        title: 'Broadway\'s Trusted Wig Makers',
        description: 'Our New York studio, nestled in the Flatiron District, is a backstage staple for Broadway and live performance. Studio Pickens NYC is deeply rooted in the traditions of theatre, serving as the trusted source for handmade, performance-ready wigs for stage productions of every scale.\n\nWith a keen understanding of durability, design continuity, and the rhythm of live performance, our artists craft wigs that stand up to eight shows a week—transforming performers night after night.'
      };
    }
    return { title: location, description: address };
  };
  
  const hoverContent = getHoverContent();
  const displayTitle = isExpanded ? hoverContent.title : location;
  const displayDescription = isExpanded ? hoverContent.description : null; // address;
  
  // Validate location data in development
  if (process.env.NODE_ENV === 'development') {
    const validation = validateLocationData({
      location,
      address,
      imagePath,
      imageAlt,
      mapsUrl
    });
    
    if (!validation.isValid) {
      console.warn(`LocationInfo validation errors for "${location}":`, validation.errors);
    }
  }
  
  return (
    <>
      <style jsx>{`
        .location-info-box {
          width: 100%;
          height: auto;
          min-height: 250px;
        }
        .location-image {
          width: 100%;
          height: clamp(250px, 50vw, 720px);
        }
        @media (min-width: 768px) {
          .location-info-box {
            width: 30%;
            height: clamp(250px, 50vw, 720px);
          }
          .location-image {
            width: 70%;
            height: clamp(250px, 50vw, 720px);
          }
        }
      `}</style>
      <div 
        ref={componentRef}
        className={`flex flex-col gap-4 md:gap-0 md:flex-row items-center group px-0 cursor-pointer md:cursor-auto`}
        onMouseEnter={() => {
          if (window.innerWidth >= 768) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) {
            setIsHovered(false);
          }
        }}
        onClick={(e) => {
          // Only toggle on mobile/touch devices
          if (window.innerWidth < 768) {
            e.preventDefault();
            setIsTapped(!isTapped);
          }
        }}
      >
      {/* Info Box */}
      <div 
        className={`location-info-box ${isExpanded ? 'bg-studio-blue' : 'bg-white'} md:bg-white md:group-hover:bg-studio-blue transition-colors duration-300 pt-8 pr-8 pb-12 pl-12 flex flex-col justify-between relative ${
          isLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
        }`}
      >
        <div></div>
        
        {/* Bottom Content */}
        <div>
          {/* Location Icon */}
          <div className="w-12 h-12 mb-4 -ml-2">
            <svg className="w-full h-full text-studio-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          
          {/* Title */}
          <h3 className={`font-proxima-wide font-bold uppercase ${isExpanded ? 'text-studio-bg' : 'text-studio-blue'} md:text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 text-xl md:text-2xl mb-2 md:mb-4`}>
            {displayTitle}
          </h3>
          
          {/* Description */}
          {displayDescription && (
            <div className={`font-proxima ${isExpanded ? 'text-studio-bg' : 'text-studio-blue'} md:text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 text-sm md:text-base leading-tight md:leading-relaxed`}>
              {isExpanded ? (
                <div className="whitespace-pre-wrap">{displayDescription}</div>
              ) : (
                displayDescription.split('\n').map((line, index) => (
                  <div key={index}>
                    {line}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Image */}
      <div 
        className={`location-image bg-gray-200 overflow-hidden ${
          isLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'
        }`}
      >
        <img
          src={`${imagePath.startsWith('/') ? imagePath : `/images/locations/${imagePath}`}?cb=${Date.now()}&r=${Math.random()}`}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
    </>
  );
});

LocationInfo.displayName = 'LocationInfo';

export default LocationInfo;