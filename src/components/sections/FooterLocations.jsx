import React from 'react';
import LocationButton from '../common/LocationButton';
import { useLocationsData } from '../../hooks';

const FooterLocations = ({ variant = 'desktop', onLocationClick }) => {
  const { locationsData, loading, error } = useLocationsData();
  
  const containerClass = variant === 'desktop' 
    ? 'flex flex-col space-y-4 w-[600px] flex-shrink-0'
    : 'space-y-6 mb-12';

  // Loading state
  if (loading) {
    return (
      <div className={containerClass}>
        <div className="text-white text-sm">Loading locations...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={containerClass}>
        <div className="text-white text-sm">Error loading locations</div>
      </div>
    );
  }

  // Get visible locations and convert to footer format
  const visibleLocations = locationsData?.locations
    ?.filter(location => location.visible)
    ?.sort((a, b) => a.order - b.order)
    ?.map(location => {
      // Convert location names to footer format
      const locationKey = location.name.toLowerCase().replace(/\s+/g, '');
      // Map location names to expected footer keys
      const footerLocationMap = {
        'newyork': 'brooklyn',
        'beverlyhills': 'beverlyhills', 
        'london': 'london'
      };
      return footerLocationMap[locationKey] || locationKey;
    }) || [];

  return (
    <div className={containerClass}>
      {visibleLocations.map((location) => (
        <LocationButton 
          key={location}
          location={location} 
          onClick={() => onLocationClick('/locations')} 
          variant={variant}
        />
      ))}
    </div>
  );
};

export default FooterLocations;