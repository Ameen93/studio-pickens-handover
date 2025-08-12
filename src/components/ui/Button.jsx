import React from 'react';
import { TYPOGRAPHY_CLASSES } from '../../constants/typography';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className = '', 
  disabled = false,
  icon = false,
  ...props 
}) => {
  const baseClasses = `inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${TYPOGRAPHY_CLASSES.button}`;
  
  const variants = {
    primary: 'bg-white text-studio-blue hover:bg-gray-100 focus:ring-studio-blue',
    secondary: 'bg-studio-blue text-white hover:bg-studio-blue/90 focus:ring-studio-blue',
    outline: 'border-2 border-studio-blue text-studio-blue hover:bg-studio-blue hover:text-white focus:ring-studio-blue',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-studio-blue focus:ring-white',
    ghost: 'text-studio-blue hover:bg-studio-blue/10 focus:ring-studio-blue',
    link: 'text-studio-orange hover:text-studio-orange/80 focus:ring-studio-orange bg-transparent p-0',
    'nav-link': `${TYPOGRAPHY_CLASSES.navLink} text-studio-blue hover:text-studio-orange bg-transparent p-0 relative`,
    'location': 'bg-white text-studio-blue hover:bg-studio-blue hover:text-white border-2 border-transparent hover:border-studio-blue focus:ring-studio-blue',
    'back-to-top': 'w-[126px] h-[126px] rounded-full border-[2.21px] border-studio-orange text-studio-orange hover:bg-studio-orange hover:text-studio-blue focus:ring-studio-orange'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };
  
  // Special handling for link and nav-link variants that don't need standard sizing
  const needsStandardSizing = !['link', 'nav-link', 'back-to-top'].includes(variant);
  const classes = `${baseClasses} ${variants[variant]} ${needsStandardSizing ? sizes[size] : ''} ${className}`.trim();
  
  // Navigation link variant has special underline animation
  if (variant === 'nav-link') {
    const Element = href ? 'a' : 'button';
    return (
      <Element 
        {...(href ? { href } : { onClick })}
        className={classes}
        disabled={disabled}
        {...props}
      >
        <span className="relative">
          {children}
          <span className="absolute top-full left-0 h-0.5 bg-studio-orange transition-all duration-300 w-0 group-hover:w-full"></span>
        </span>
      </Element>
    );
  }

  // Link variant has custom underline that extends under arrow
  if (variant === 'link') {
    const Element = href ? 'a' : 'button';
    return (
      <Element 
        {...(href ? { href } : { onClick })}
        className={classes}
        disabled={disabled}
        {...props}
      >
        <span className="relative inline-flex items-center">
          {children}
          <svg className="ml-2 w-4 h-4 text-studio-orange" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span className="absolute left-0 right-0 h-px bg-studio-orange" style={{ top: 'calc(100% + 2px)' }}></span>
        </span>
      </Element>
    );
  }
  
  // Back to top variant has special circular layout
  if (variant === 'back-to-top') {
    return (
      <button 
        onClick={onClick}
        className={`${classes} group flex-col`}
        disabled={disabled}
        {...props}
      >
        <span className="text-center leading-[110%]">
          {children}
        </span>
      </button>
    );
  }
  
  // Standard button/link rendering
  const Element = href ? 'a' : 'button';
  const elementProps = href ? { href } : { onClick, disabled };
  
  return (
    <Element 
      {...elementProps}
      className={classes}
      {...props}
    >
      {children}
      {icon && (variant === 'primary' || variant === 'secondary' || variant === 'outline') && (
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Element>
  );
};

export default Button;