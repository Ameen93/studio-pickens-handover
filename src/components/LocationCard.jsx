import React from 'react';

const LocationCard = ({ 
  city, 
  country, 
  imageSrc, 
  mapLink,
  address,
  className = '' 
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-studio-blue/40 transition-opacity duration-300 group-hover:bg-studio-blue/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="space-y-2">
          <h3 className="font-proxima font-bold text-2xl md:text-3xl tracking-studio uppercase">
            {city}
          </h3>
          <p className="font-proxima font-bold text-studio tracking-studio uppercase opacity-80">
            {country}
          </p>
          {address && (
            <p className="text-sm opacity-70 leading-relaxed">
              {address}
            </p>
          )}
        </div>

        {/* View on Maps Link */}
        <div className="mt-6">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-proxima font-bold text-studio tracking-studio uppercase border-b-2 border-studio-orange hover:border-white transition-colors duration-300"
          >
            VIEW ON MAPS
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;