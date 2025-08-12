/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-bg': '#F8F7F7',
        'studio-blue': '#0025B8',
        'studio-orange': '#FF7E46',
        'nav-blue': '#08249F',
        'nav-orange': '#FF7E46',
      },
      fontFamily: {
        'proxima': ['proxima-nova', 'sans-serif'],
        'proxima-semibold': ['proxima-nova', 'sans-serif'],
        'proxima-wide': ['proxima-nova-extra-wide', 'sans-serif'],
        'lovtony': ['Lovtony', 'serif'],
      },
      fontSize: {
        // Headings - Desktop
        'h1': ['80px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h2': ['64px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h3': ['48px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '600' }],
        
        // Headings - Mobile
        'h1-mobile': ['40px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '500' }],
        'h2-mobile': ['32px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '500' }],
        'h3-mobile': ['24px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '500' }],
        
        // Atelier Wigs Mobile Specific
        'atelier-heading-mobile': ['30px', { lineHeight: '107%', letterSpacing: '0.03em', fontWeight: '700' }],
        'atelier-body-mobile': ['16px', { lineHeight: '125%', letterSpacing: '0.01em', fontWeight: '400' }],
        
        // Subheadings - Desktop
        'sub-lg': ['24px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'sub': ['16px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        
        // Subheadings - Mobile
        'sub-lg-mobile': ['20px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'sub-mobile': ['14px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        
        // Body Text - Desktop
        'body-lg': ['16px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '130%', letterSpacing: '0.02em', fontWeight: '400' }],
        
        // Body Text - Mobile
        'body-lg-mobile': ['14px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'body-mobile': ['12px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'small-mobile': ['10px', { lineHeight: '130%', letterSpacing: '0.02em', fontWeight: '400' }],
        
        // Buttons & Tags
        'button': ['13px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'button-link': ['14px', { lineHeight: '100%', letterSpacing: '0em', fontWeight: '500' }],
        'atelier-link-mobile': ['16px', { lineHeight: '125%', letterSpacing: '0.01em', fontWeight: '400' }],
        'tag': ['12px', { lineHeight: '100%', letterSpacing: '0.06em', fontWeight: '500' }],
        
        // Navbar
        'nav': ['14px', { lineHeight: '150%', letterSpacing: '0.03em', fontWeight: '700' }],
        'nav-logo': ['27px', { lineHeight: '150%', letterSpacing: '0.03em', fontWeight: '700' }],
      },
      letterSpacing: {
        'tight-3': '-0.03em',
        'tight-2': '-0.02em',
        'wide-2': '0.02em',
        'wide-3': '0.03em',
        'wide-4': '0.04em',
        'wide-6': '0.06em',
      },
      spacing: {
        '2': '8px',    // 8px
        '4': '16px',   // 16px
        '6': '24px',   // 24px
        '8': '32px',   // 32px
        '10': '40px',  // 40px
        '12': '48px',  // 48px
        '14': '56px',  // 56px
        '16': '64px',  // 64px
        '20': '80px',  // 80px
        '24': '96px',  // 96px
        '28': '112px', // 112px
        '32': '128px', // 128px
        '36': '144px', // 144px
        '40': '160px', // 160px
        '44': '176px', // 176px
        '48': '192px', // 192px
        '52': '208px', // 208px
        '56': '224px', // 224px
        '60': '240px', // 240px
        '64': '256px', // 256px
      },
    },
  },
  plugins: [
    function({ addUtilities, addBase }) {
      // Add custom typography utilities
      addUtilities({
        // Primary Typography Classes
        '.heading-primary': {
          '@apply font-proxima-wide font-bold text-studio-blue uppercase': {},
        },
        '.heading-secondary': {
          '@apply font-proxima-wide font-bold text-studio-blue': {},
        },
        '.heading-tertiary': {
          '@apply font-proxima-wide font-semibold text-studio-blue uppercase': {},
        },
        
        // Body Text Classes
        '.body-text': {
          '@apply font-proxima text-studio-blue': {},
        },
        '.body-text-large': {
          '@apply font-proxima text-studio-blue text-lg': {},
        },
        '.body-text-small': {
          '@apply font-proxima text-studio-blue text-sm': {},
        },
        
        // Script Text Classes
        '.script-text': {
          '@apply font-lovtony text-studio-blue': {},
        },
        '.script-text-large': {
          '@apply font-lovtony font-normal italic lowercase text-studio-blue': {},
        },
        
        // Layout Classes
        '.section-banner': {
          '@apply relative bg-studio-bg flex items-center justify-center w-full overflow-hidden': {},
        },
        
        // Navigation Classes
        '.nav-link': {
          '@apply font-proxima-wide font-bold text-white text-sm tracking-wide uppercase': {},
        },
        '.nav-link-mobile': {
          '@apply font-proxima-wide font-bold text-white text-2xl tracking-wide uppercase': {},
        },
        
        // Button Classes
        '.btn-primary': {
          '@apply font-proxima text-white bg-studio-blue uppercase px-6 py-3 transition-all duration-200': {},
        },
        '.btn-secondary': {
          '@apply font-proxima text-studio-blue border-2 border-studio-blue uppercase px-6 py-3 transition-all duration-200 hover:bg-studio-blue hover:text-white': {},
        },
        '.btn-link': {
          '@apply font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4 transition-colors duration-300': {},
        },
        
        // Form Classes
        '.form-label': {
          '@apply font-proxima-wide font-bold text-studio-blue uppercase tracking-wide text-sm': {},
        },
        '.form-input': {
          '@apply w-full px-4 py-3 border bg-white text-studio-blue placeholder-gray-400 focus:outline-none transition-all duration-200': {},
        },
        '.form-input-error': {
          '@apply border-studio-orange': {},
        },
        '.form-input-normal': {
          '@apply border-gray-300 focus:border-studio-blue': {},
        },
        
        // Animation Classes
        '.transition-fast': {
          '@apply transition-all duration-200': {},
        },
        '.transition-medium': {
          '@apply transition-all duration-300': {},
        },
        '.transition-slow': {
          '@apply transition-all duration-500': {},
        },
        
        // Common Hover Effects
        '.hover-grow': {
          '@apply transition-transform duration-300 hover:scale-105': {},
        },
        '.hover-orange': {
          '@apply transition-colors duration-300 hover:text-studio-orange': {},
        },
        
        // Focus States
        '.focus-ring': {
          '@apply focus:ring-2 focus:ring-studio-orange focus:ring-offset-2': {},
        },
      });

      // Add custom keyframe animations
      addBase({
        '@keyframes shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        '@keyframes scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        '@keyframes fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Animation utility classes
        '.animate-shake': {
          animation: 'shake 0.6s ease-in-out',
        },
        '.animate-scroll': {
          animation: 'scroll 45s linear infinite',
        },
        '.animate-float': {
          animation: 'float 3s ease-in-out infinite',
        },
        '.animate-fade-in': {
          animation: 'fadeIn 0.6s ease-out',
        },
        '.pause-on-hover:hover': {
          'animation-play-state': 'paused',
        },
      });
    }
  ],
}