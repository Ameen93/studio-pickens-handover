import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationInfo from '../components/common/LocationInfo';
import { useLocationsData } from '../hooks';

const LocationsPage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const { locationsData, loading, error } = useLocationsData();

  useEffect(() => {
    if (!locationsData) return;
    
    // Start animation after configured delay
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, locationsData.banner.animationSettings.animationDelay);

    return () => clearTimeout(timer);
  }, [locationsData]);

  if (loading) {
    return (
      <Layout title="Studio Pickens - Locations">
        <section className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
          style={{ height: 'clamp(400px, 45vw, 800px)', paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="text-center z-20">
            <div className="text-studio-blue">Loading locations...</div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Studio Pickens - Locations">
        <section className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
          style={{ height: 'clamp(400px, 45vw, 800px)', paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="text-center z-20">
            <div className="text-red-600">Error loading locations: {error}</div>
          </div>
        </section>
      </Layout>
    );
  }

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
        {[...Array(locationsData.banner.animationSettings.circleCount)].map((_, index) => {
          // Half circles move left, half circles move right, all starting from behind main circle
          const isLeftGroup = index < locationsData.banner.animationSettings.circleCount / 2;
          const positionInGroup = index % (locationsData.banner.animationSettings.circleCount / 2); // 0, 1, 2 for each group
          
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
                  transitionDuration: `${locationsData.banner.animationSettings.transitionDuration}ms`,
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
            {locationsData.banner.title}
          </h1>
        </div>
      </section>

      {/* Location Images with Info Boxes */}
      <section className="bg-studio-bg pt-16 pb-16">
        <div className="w-full px-4 md:px-10 max-w-none">
          <div className="space-y-16">
            {locationsData.locations
              .sort((a, b) => a.order - b.order)
              .map((location) => (
                <LocationInfo
                  key={location.id}
                  location={location.name}
                  address={location.address}
                  imagePath={location.image}
                  imageAlt={location.imageAlt}
                  mapsUrl={location.mapsUrl}
                  variant={location.variant}
                />
              ))
            }
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default LocationsPage;