import React from 'react';

const NavLink = React.memo(({ 
  link, 
  isActive, 
  onClick, 
  variant = 'desktop',
  className = ""
}) => {
  if (variant === 'mobile') {
    return (
      <button
        onClick={() => onClick(link.href)}
        className={`block text-left py-3 w-full font-proxima-wide font-bold text-nav-blue text-xl uppercase tracking-wide hover:text-nav-orange transition-colors duration-200 ${className}`}
      >
        {link.name}
      </button>
    );
  }

  // Desktop variant
  return (
    <button
      onClick={() => onClick(link.href)}
      className={`relative text-nav font-proxima-wide font-bold text-nav-blue uppercase min-h-[44px] flex items-center text-center group mx-6 ${className}`}
    >
      <span className="relative">
        {link.name}
        <span className={`absolute top-full left-0 h-0.5 bg-nav-orange transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      </span>
    </button>
  );
});

NavLink.displayName = 'NavLink';

export default NavLink;