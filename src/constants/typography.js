/**
 * Studio Pickens Typography System
 * Centralized typography classes for consistent styling across the application
 * 
 * Usage patterns:
 * - headingPrimary: Most used heading pattern (33 occurrences)
 * - bodyText: Most used text pattern (46 occurrences)
 * - scriptText: Decorative accents (11 occurrences)
 */

/**
 * Main typography classes object containing all text styling definitions
 * @type {Object}
 */
export const TYPOGRAPHY_CLASSES = {
  // Primary Headings - Most used pattern (33 occurrences)
  headingPrimary: "font-proxima-wide font-bold text-studio-blue uppercase",
  
  // Secondary Headings - Variations of the primary
  headingSecondary: "font-proxima-wide font-bold text-studio-blue",
  headingTertiary: "font-proxima-wide font-semibold text-studio-blue uppercase",
  
  // Body Text - Most used text pattern (46 occurrences)
  bodyText: "font-proxima text-studio-blue",
  bodyTextLarge: "font-proxima text-studio-blue text-lg",
  bodyTextSmall: "font-proxima text-studio-blue text-sm",
  
  // Decorative Script Text - Used for accents (11 occurrences)
  scriptText: "font-lovtony text-studio-blue",
  scriptTextLarge: "font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue",
  scriptTextMedium: "font-lovtony font-normal italic lowercase text-2xl leading-[50%] text-studio-blue",
  
  // Navigation and UI Elements
  navLink: "font-proxima-wide font-bold text-white text-sm tracking-wide uppercase",
  navLinkMobile: "font-proxima-wide font-bold text-white text-2xl tracking-[3%] uppercase",
  navLogo: "font-proxima-wide font-normal text-studio-blue uppercase text-center whitespace-nowrap",
  
  // Button Styles
  buttonPrimary: "font-proxima text-white bg-studio-blue uppercase",
  buttonSecondary: "font-proxima text-studio-blue border-2 border-studio-blue uppercase",
  buttonLink: "font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4",
  
  // Form Elements
  formLabel: "font-proxima-wide font-bold text-studio-blue uppercase tracking-wide",
  formInput: "font-proxima text-studio-blue",
  formError: "text-sm text-studio-orange",
  
  // Special Categories
  categoryLabel: "font-proxima-wide font-bold uppercase text-center leading-tight",
  workTitle: "font-proxima-wide font-bold text-studio-blue uppercase tracking-wide",
  
  // Footer Specific
  footerLocation: "font-proxima-wide font-bold text-white uppercase transition-all duration-200",
  footerLocationDesktop: "font-proxima-wide font-bold group-hover:font-normal text-white text-[40px] leading-[110%] tracking-[6%] uppercase transition-all duration-200",
  
  // Contact Page Specific  
  contactLocation: "font-proxima-wide font-bold text-white uppercase tracking-wide",
  contactEmail: "text-white hover:text-studio-orange transition-colors duration-300",
  
  // Size Variations for Responsive Design
  sizeResponsive: {
    h1: "text-h1 md:text-h1 sm:text-h1-mobile",
    h2: "text-h2 md:text-h2 sm:text-h2-mobile", 
    h3: "text-h3 md:text-h3 sm:text-h3-mobile",
    bodyLg: "text-body-lg md:text-body-lg sm:text-body-lg-mobile",
    body: "text-body md:text-body sm:text-body-mobile",
    small: "text-small md:text-small sm:text-small-mobile",
    sub: "text-sub md:text-sub sm:text-sub-mobile",
    subLg: "text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile"
  },
  
  // Common Color Variations
  colors: {
    primary: "text-studio-blue",
    secondary: "text-studio-orange", 
    white: "text-white",
    muted: "text-studio-blue/60"
  },
  
  // Common Text Modifiers
  modifiers: {
    uppercase: "uppercase",
    lowercase: "lowercase", 
    italic: "italic",
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal"
  }
};

/**
 * Helper function to combine typography classes safely
 * Filters out falsy values and joins with spaces
 * @param {...string} classes - Typography class strings to combine
 * @returns {string} Combined class string
 */
export const combineTypography = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Commonly used typography combinations for quick access
 * Pre-defined combinations for consistent page elements
 * @type {Object}
 */
export const COMMON_COMBINATIONS = {
  pageTitle: combineTypography(TYPOGRAPHY_CLASSES.headingPrimary, "text-4xl md:text-5xl"),
  sectionTitle: combineTypography(TYPOGRAPHY_CLASSES.headingPrimary, "text-2xl md:text-3xl"),
  cardTitle: combineTypography(TYPOGRAPHY_CLASSES.headingSecondary, "text-xl"),
  description: combineTypography(TYPOGRAPHY_CLASSES.bodyText, "text-base"),
  caption: combineTypography(TYPOGRAPHY_CLASSES.bodyTextSmall, "text-gray-600")
};