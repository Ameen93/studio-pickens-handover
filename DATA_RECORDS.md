# Studio Pickens Database Records

## Overview
Created comprehensive database records that mirror the existing Studio Pickens website content while preserving the original design.

## Database Files Created

### 1. Hero Section Data (`data/hero.json`)
- **Title**: "STUDIO PICKENS" 
- **Background Images**: 
  - `/images/hero/background1.jpg` (left side, flipped)
  - `/images/hero/background2.jpg` (right side, scaled and positioned)
- **Polaroids** (preserved as requested):
  - Polaroid 1: `new-polaroid-2.png` (Behind the scenes, 10° rotation)
  - Polaroid 2: `new-polaroid-1.png` (Creative process, 8.33° rotation)
  - Polaroid 3: `new-polaroid-3.png` (Studio work, -10° rotation)
- **Banner Height**: Responsive clamp(400px, 45vw, 800px)

### 2. Work Gallery Data (`data/work.json`)
- **9 Portfolio Projects** with complete metadata:
  - Project positioning (left, top coordinates)
  - Categories: EDITORIAL, FILM & TV, THEATRE, CONCERT, MUSIC VIDEO, LIVE
  - Layout sides: left, center, right
  - Client information and project details
  - Year and description data
  - All images verified to exist in `/images/work/`

### 3. FAQ Data (`data/faq.json`)
- **5 FAQ Items** matching current website:
  - Questions in ALL CAPS format (design consistency)
  - Lorem ipsum answers (as per original design)
  - Ordered sequence (1-5)
  - Categories for organization

### 4. Contact Data (`data/contact.json`)
- **Location Information**:
  - Brooklyn: brooklyn@studiopickens.com
  - Beverly Hills: beverlyhills@studiopickens.com
  - Press: press@studiopickens.com
- **Full Address Details** for both locations
- **Social Media** handles

## Image Verification
✅ All referenced images exist in the public/images directory:
- Hero backgrounds: `background1.jpg`, `background2.jpg`
- Polaroids: `new-polaroid-1.png`, `new-polaroid-2.png`, `new-polaroid-3.png`
- Work gallery: All 9 project images confirmed

## Data Structure Features
- **Consistent with existing constants** from `/src/constants/index.js`
- **Matches component expectations** from WorkGallery, HeroBanner, FAQSection
- **Preserves original design elements** including positioning, transforms, and styling
- **Ready for API integration** with proper ID fields and relationships

## Original Design Preserved
- No changes made to polaroid configuration (as requested)
- All original styling and animations maintained
- Background image positioning and transforms preserved
- Work gallery layout and project positioning intact
- FAQ structure and styling consistent

## Next Steps
These database records can be used with any backend system (REST API, GraphQL, CMS) while maintaining the exact same visual design and user experience.