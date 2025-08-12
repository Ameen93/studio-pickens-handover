import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationInfo from '../components/common/LocationInfo';

const LocationsPage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animation after 1.5 second delay
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Layout 
      title="Studio Pickens - Locations"
      description="Visit Studio Pickens creative studios in New York, Beverly Hills, and London. Professional creative spaces for film, television, and artistic collaboration."
    >
      {/* Locations Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(400px, 45vw, 800px)',
          paddingTop: '64px',
          paddingBottom: '64px'
        }}
      >
        {/* Animated Outline Circles */}
        {[...Array(6)].map((_, index) => {
          // 3 circles move left, 3 circles move right, all starting from behind main circle
          const isLeftGroup = index < 3;
          const positionInGroup = index % 3; // 0, 1, 2 for each group
          
          // Final positions: left group goes negative, right group goes positive
          // Spacing: -100px, -200px, -300px for left; +100px, +200px, +300px for right
          const finalPosition = isLeftGroup 
            ? -100 - (positionInGroup * 100) // -100, -200, -300
            : 100 + (positionInGroup * 100);  // +100, +200, +300
          
          // Stagger animation: left and right circles at same position animate together
          const animationDelay = positionInGroup * 100; // Same delay for matching left/right pairs
          
          return (
            <div 
              key={index}
              className="absolute w-full flex justify-center z-5" 
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <div 
                className="rounded-full border-2 border-studio-blue transition-transform ease-out"
                style={{
                  width: 'clamp(300px, 35.76vw, 515px)',
                  height: 'clamp(300px, 35.76vw, 515px)',
                  transform: animationStarted 
                    ? `translateX(${finalPosition}px)` 
                    : 'translateX(0px)',
                  transitionDuration: '800ms',
                  transitionDelay: animationStarted ? `${animationDelay}ms` : '0ms'
                }}
              />
            </div>
          );
        })}

        {/* Blue Filled Circle */}
        <div className="absolute w-full flex justify-center z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div 
            className="rounded-full bg-studio-blue"
            style={{
              width: 'clamp(300px, 35.76vw, 515px)',
              height: 'clamp(300px, 35.76vw, 515px)'
            }}
          />
        </div>

        {/* Center Content */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-orange uppercase" style={{ fontSize: '55px' }}>
            Locations
          </h1>
        </div>
      </section>

      {/* Location Images with Info Boxes */}
      <section className="bg-studio-bg pt-16 pb-16">
        <div className="w-full px-4 md:px-10 max-w-none">
          <div className="space-y-16">
            {/* New York - Info Left, Image Right */}
            <LocationInfo
              location="New York"
              address={`283 Wythe Avenue
Brooklyn, NY 11249
USA`}
              imagePath="locations-new-york.png"
              imageAlt="New York Studio"
              mapsUrl="https://maps.google.com/?q=283+Wythe+Avenue+Brooklyn+NY+11249+USA"
              variant="left"
            />

            {/* Beverly Hills - Image Left, Info Right */}
            <LocationInfo
              location="Beverly Hills"
              address={`9465 Wilshire Boulevard
Beverly Hills, CA 90212
USA`}
              imagePath="locations-beverley-hills.png"
              imageAlt="Beverly Hills Studio"
              mapsUrl="https://maps.google.com/?q=9465+Wilshire+Boulevard+Beverly+Hills+CA+90212+USA"
              variant="right"
            />

            {/* London - Info Left, Image Right */}
            <LocationInfo
              location="London"
              address={`17 Langley Court
Covent Garden
London WC2E 9JY
United Kingdom`}
              imagePath="locations-london.png"
              imageAlt="London Studio"
              mapsUrl="https://maps.google.com/?q=17+Langley+Court+Covent+Garden+London+WC2E+9JY+United+Kingdom"
              variant="left"
            />
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default LocationsPage;