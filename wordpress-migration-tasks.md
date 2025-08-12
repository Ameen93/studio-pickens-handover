# Studio Pickens WordPress Migration Tasks

## Project Overview
Recreate the premium Studio Pickens React/Tailwind site as a custom WordPress theme while maintaining all design elements, animations, and functionality.

## Phase 1: Analysis & Planning

### 1.1 Current Site Analysis
- [ ] Document all existing React components and their functionality
- [ ] Catalog current animations and micro-interactions
- [ ] Map out data structure from JSON files
- [ ] Document API endpoints and their WordPress equivalents
- [ ] Review responsive design patterns

### 1.2 WordPress Architecture Planning
- [ ] Design custom post types for content sections
- [ ] Plan custom fields structure using ACF or similar
- [ ] Map React components to WordPress template parts
- [ ] Design theme file structure following WordPress standards

## Phase 2: WordPress Setup & Theme Foundation

### 2.1 Environment Setup
- [ ] Set up local WordPress development environment
- [ ] Install required plugins (ACF, Custom Post Type UI, etc.)
- [ ] Create custom theme folder structure
- [ ] Set up build tools for CSS/JS compilation

### 2.2 Theme Foundation
- [ ] Create `style.css` and `functions.php`
- [ ] Set up Tailwind CSS integration
- [ ] Configure Proxima Nova font loading
- [ ] Implement design system variables

## Phase 3: Custom Post Types & Fields

### 3.1 Content Structure
- [ ] Create "Work" custom post type with gallery fields
- [ ] Create "Process" custom post type with step-by-step content
- [ ] Create "Story" custom post type for company narrative
- [ ] Create "Locations" custom post type with address/contact info
- [ ] Create "FAQ" custom post type with question/answer pairs
- [ ] Set up hero section custom fields for homepage

### 3.2 Custom Fields Setup
- [ ] Hero section fields (title, subtitle, background image)
- [ ] Work gallery fields (images, titles, descriptions, categories)
- [ ] Process step fields (title, description, icons)
- [ ] Story content fields (sections, images, text blocks)
- [ ] Location fields (name, address, phone, email, image)
- [ ] Contact information fields
- [ ] Polaroid pile image fields

## Phase 4: Template Development

### 4.1 Core Templates
- [ ] `index.php` - Homepage with hero and polaroids
- [ ] `header.php` - Navbar with scroll animation
- [ ] `footer.php` - Footer component
- [ ] `single-work.php` - Individual work pages
- [ ] `archive-work.php` - Work gallery page
- [ ] `page-process.php` - Process page template
- [ ] `page-story.php` - Story page template
- [ ] `page-locations.php` - Locations page template
- [ ] `page-contact.php` - Contact page template
- [ ] `page-faq.php` - FAQ page template

### 4.2 Template Parts
- [ ] `template-parts/hero.php` - Hero section component
- [ ] `template-parts/navbar.php` - Navigation with scroll effects
- [ ] `template-parts/polaroid-pile.php` - Polaroid component
- [ ] `template-parts/work-grid.php` - Work gallery grid
- [ ] `template-parts/process-steps.php` - Process visualization
- [ ] `template-parts/location-card.php` - Individual location display

## Phase 5: Styling & Interactions

### 5.1 CSS Implementation
- [ ] Port Tailwind classes to WordPress theme
- [ ] Implement responsive design patterns
- [ ] Set up typography system (Proxima Nova, 14px, 700 weight)
- [ ] Configure color palette (#F8F7F7, #0025B8, #FF7E46)
- [ ] Implement 8pt spacing system

### 5.2 JavaScript Interactions
- [ ] Navbar scroll animation (title centering, link repositioning)
- [ ] Scroll-based layout transitions
- [ ] Polaroid floating animations (sine-based)
- [ ] Hover effects for links and interactive elements
- [ ] Mobile navigation behavior
- [ ] Smooth scrolling implementation

## Phase 6: Data Migration

### 6.1 Content Migration
- [ ] Export data from existing JSON files
- [ ] Create WordPress import scripts for custom post types
- [ ] Migrate hero section content
- [ ] Import work gallery items with images
- [ ] Transfer process steps and descriptions
- [ ] Migrate story content sections
- [ ] Import location information
- [ ] Transfer FAQ entries
- [ ] Upload and organize all images in WordPress media library

### 6.2 URL Structure
- [ ] Plan permalink structure to match current site
- [ ] Set up redirects if needed
- [ ] Configure SEO-friendly URLs
- [ ] Test all internal linking

## Phase 7: Advanced Features

### 7.1 Performance & SEO
- [ ] Implement image optimization
- [ ] Set up lazy loading for images
- [ ] Configure caching strategies
- [ ] Optimize for Core Web Vitals
- [ ] Add structured data markup
- [ ] Implement proper meta tags

### 7.2 WordPress Integration
- [ ] Customize WordPress admin for client-friendly editing
- [ ] Set up custom field groups for easy content management
- [ ] Configure user roles and permissions
- [ ] Add custom dashboard widgets
- [ ] Create content editing documentation

## Phase 8: Testing & Deployment

### 8.1 Quality Assurance
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness verification
- [ ] Performance testing and optimization
- [ ] Content management testing
- [ ] Form functionality testing
- [ ] Animation performance testing

### 8.2 Deployment
- [ ] Set up staging environment
- [ ] Configure production WordPress hosting
- [ ] Deploy theme to production
- [ ] DNS configuration and SSL setup
- [ ] Final content migration
- [ ] Post-launch monitoring setup

## Technical Requirements

### WordPress Standards
- Follow WordPress coding standards
- Use proper sanitization and validation
- Implement proper security practices
- Ensure accessibility compliance
- Use WordPress hooks and filters appropriately

### Performance Targets
- Page load time < 3 seconds
- Mobile-first responsive design
- Optimized images and assets
- Minimal plugin dependencies
- Clean, semantic HTML output

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari
- Android Chrome

## Deliverables
1. Custom WordPress theme files
2. Content migration scripts
3. Documentation for content management
4. Performance optimization report
5. Testing results and browser compatibility matrix
6. Deployment guide and backup procedures