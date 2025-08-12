import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationInfo from '../components/common/LocationInfo';

const LocationsPage = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        // Force fresh data with timestamp
        const response = await fetch(`/data/locations.json?t=${Date.now()}`);
        const data = await response.json();
        setLocationsData(data);
      } catch (error) {
        console.error('Error fetching locations data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationsData();
  }, []);

  useEffect(() => {
    if (!locationsData) return;
    
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

  const visibleLocations = locationsData?.locations?.filter(location => location.visible)?.sort((a, b) => a.order - b.order) || [];

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
            {locationsData?.banner.title || 'Locations'}
          </h1>
        </div>
      </section>

      {/* Location Images with Info Boxes */}
      <section className="bg-studio-bg pt-16 pb-16">
        <div className="w-full px-4 md:px-10 max-w-none">
          <div className="space-y-16">
            {visibleLocations.map((location) => (
              <LocationInfo
                key={location.id}
                location={location.name}
                address={location.address}
                imagePath={location.image}
                imageAlt={location.imageAlt}
                mapsUrl={location.mapsUrl}
                variant={location.variant}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationsPage;