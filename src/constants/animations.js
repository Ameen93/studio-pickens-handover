/**
 * Studio Pickens Animation System
 * Centralized animations and transitions for consistent motion across the application
 * Extracted from inline CSS to improve maintainability and reusability
 */

/**
 * Animation constants including keyframes, transitions, and timing functions
 * @type {Object}
 */
export const ANIMATIONS = {
  // Keyframe Animations (extracted from inline CSS)
  keyframes: {
    shake: `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
      }
    `,
    scroll: `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
    `,
    float: `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `,
    fadeIn: `
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `,
    slideIn: `
      @keyframes slideIn {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
      }
    `,
    zoomIn: `
      @keyframes zoomIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
    `
  },

  // Animation Classes
  classes: {
    shake: "animate-[shake_0.6s_ease-in-out]",
    scroll: "animate-[scroll_45s_linear_infinite]",
    float: "animate-[float_3s_ease-in-out_infinite]",
    fadeIn: "animate-[fadeIn_0.6s_ease-out]",
    slideIn: "animate-[slideIn_0.5s_ease-out]",
    zoomIn: "animate-[zoomIn_0.4s_ease-out]",
    pauseOnHover: "hover:animate-[paused]"
  },

  // Transition Classes - Common durations and easings
  transitions: {
    // Duration variations
    fast: "transition-all duration-200",
    medium: "transition-all duration-300", 
    slow: "transition-all duration-500",
    verySlow: "transition-all duration-1000",
    
    // Specific property transitions
    colors: "transition-colors duration-300",
    transform: "transition-transform duration-300",
    opacity: "transition-opacity duration-300",
    
    // Common easing patterns
    easeOut: "transition-all duration-300 ease-out",
    easeIn: "transition-all duration-300 ease-in",
    easeInOut: "transition-all duration-300 ease-in-out",
    
    // Component-specific transitions
    button: "transition-all duration-200 ease-out",
    nav: "transition-all duration-200 ease-out", 
    modal: "transition-all duration-300 ease-in-out",
    
    // Polaroid animations
    polaroidEntry: "transition-all duration-[2400ms] ease-out",
    
    // Hover effects
    hoverGrow: "transition-transform duration-300 hover:scale-105",
    hoverShrink: "transition-transform duration-300 hover:scale-95",
    hoverFade: "transition-opacity duration-300 hover:opacity-80"
  },

  // Scroll-based Animations
  scroll: {
    // Parallax effects
    parallaxSlow: "transform transition-transform duration-100",
    parallaxMedium: "transform transition-transform duration-200", 
    parallaxFast: "transform transition-transform duration-75",
    
    // Reveal animations
    revealUp: "transform translate-y-8 opacity-0 transition-all duration-600",
    revealDown: "transform -translate-y-8 opacity-0 transition-all duration-600",
    revealLeft: "transform translate-x-8 opacity-0 transition-all duration-600",
    revealRight: "transform -translate-x-8 opacity-0 transition-all duration-600",
    
    // States for intersection observer
    revealed: "transform translate-y-0 opacity-100"
  },

  // Interaction States
  states: {
    // Loading states
    loading: "animate-pulse",
    spinning: "animate-spin",
    bouncing: "animate-bounce",
    
    // Focus states  
    focusRing: "focus:ring-2 focus:ring-studio-orange focus:ring-offset-2",
    focusVisible: "focus-visible:ring-2 focus-visible:ring-studio-orange",
    
    // Disabled states
    disabled: "opacity-50 cursor-not-allowed",
    
    // Group hover states
    groupHover: "group-hover:opacity-100 group-hover:transform group-hover:scale-105"
  },

  // Timing Functions (for JavaScript animations)
  timing: {
    easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
    easeInOutCubic: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  },

  // Duration Constants (for JavaScript)
  durations: {
    instant: 0,
    fast: 200,
    medium: 300,
    slow: 500,
    verySlow: 1000,
    polaroid: 2400,
    scroll: 45000
  }
};

// Helper function to combine animation classes
export const combineAnimations = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Common animation combinations for quick access
export const COMMON_ANIMATIONS = {
  buttonHover: combineAnimations(ANIMATIONS.transitions.button, ANIMATIONS.states.focusRing),
  cardHover: combineAnimations(ANIMATIONS.transitions.medium, ANIMATIONS.transitions.hoverGrow),
  fadeInUp: combineAnimations(ANIMATIONS.scroll.revealUp, ANIMATIONS.classes.fadeIn),
  smoothTransform: combineAnimations(ANIMATIONS.transitions.transform, ANIMATIONS.transitions.easeOut),
  
  // Form elements
  formInput: combineAnimations(ANIMATIONS.transitions.fast, ANIMATIONS.states.focusRing),
  formButton: combineAnimations(ANIMATIONS.transitions.button, "hover:bg-studio-orange"),
  
  // Navigation 
  navLink: combineAnimations(ANIMATIONS.transitions.colors, "hover:text-studio-orange"),
  navButton: combineAnimations(ANIMATIONS.transitions.nav, ANIMATIONS.transitions.hoverGrow)
};

// CSS-in-JS Animation Styles (for components that need inline styles)
export const INLINE_ANIMATIONS = {
  shake: {
    animation: 'shake 0.6s ease-in-out'
  },
  
  scroll: {
    animation: 'scroll 45s linear infinite'
  },
  
  pauseOnHover: {
    '&:hover': {
      animationPlayState: 'paused'
    }
  },
  
  polaroidEntry: {
    transition: 'all 2400ms ease-out'
  }
};