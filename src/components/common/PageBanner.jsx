import React from 'react';

const PageBanner = React.memo(({ 
  backgroundImage, 
  mobileBackgroundImage,
  altText = "Page banner background",
  height = 'clamp(400px, 45vw, 705px)',
  objectPosition = 'center center',
  objectFit = 'cover',
  className = "",
  transform,
  children 
}) => {
  return (
    <section 
      className={`relative bg-studio-bg flex items-center justify-center w-full overflow-hidden ${className}`} 
      style={{ height }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          {/* Desktop Image */}
          <img
            src={backgroundImage.startsWith('/') ? backgroundImage : `${process.env.PUBLIC_URL}/images/${backgroundImage}`}
            alt={altText}
            className={`absolute inset-0 w-full h-full object-${objectFit} z-20 transition-transform duration-300 ease-out ${mobileBackgroundImage ? 'hidden md:block' : ''}`}
            style={{ 
              objectPosition: transform?.objectPosition || objectPosition,
              transform: transform ? `scale(clamp(1, 1vw + 0.8, 1.4)) translateX(${transform.translateX || 0}px) translateY(${transform.translateY || 0}px)` : undefined
            }}
          />
          
          {/* Mobile Image */}
          {mobileBackgroundImage && (
            <img
              src={mobileBackgroundImage.startsWith('/') ? mobileBackgroundImage : `${process.env.PUBLIC_URL}/images/${mobileBackgroundImage}`}
              alt={altText}
              className={`absolute inset-0 w-full h-full object-${objectFit} z-20 transition-transform duration-300 ease-out md:hidden`}
              style={{ 
                objectPosition: transform?.mobileObjectPosition || transform?.objectPosition || objectPosition,
                transform: transform ? `scale(clamp(1, 1vw + 0.8, 1.4)) translateX(${transform.translateX || 0}px) translateY(${transform.translateY || 0}px)` : undefined
              }}
            />
          )}
        </>
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </section>
  );
});

PageBanner.displayName = 'PageBanner';

export default PageBanner;