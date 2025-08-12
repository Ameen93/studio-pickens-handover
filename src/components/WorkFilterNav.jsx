import React from 'react';

const WorkFilterNav = ({ onFilterChange, activeFilter }) => {
  const filters = [
    'ALL MEDIA',
    'FILM & TV',
    'THEATRE',
    'EDITORIAL',
    'MUSIC VIDEO'
  ];

  return (
    <nav className="bg-studio-bg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center py-4 md:pt-12 md:pb-8 overflow-x-auto scrollbar-hide md:justify-center">
          <div className="flex items-center space-x-8 whitespace-nowrap px-4 md:px-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`text-nav font-proxima-wide uppercase tracking-wide-3 transition-all duration-200 relative flex-shrink-0 ${
                  activeFilter === filter
                    ? 'text-studio-blue opacity-100'
                    : 'text-studio-blue opacity-40 hover:opacity-100'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WorkFilterNav;