# Studio Pickens React Application - Production Ready

This is the original React application that served as the reference for the WordPress theme implementation.

## 🎯 Project Overview

This React application represents the production-ready Studio Pickens website featuring:
- **Premium design** with custom animations and interactions
- **Responsive layouts** across all device types
- **Content management** via JSON data files
- **Express.js backend** with authentication and file upload
- **Performance optimized** with lazy loading and smooth animations

## 📁 Project Structure

```
studio-pickens-handover/
├── 📄 React Application
│   ├── src/                   # React source code
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── constants/         # Design system constants
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   └── server.js              # Express backend server
│
├── 📊 Data Files
│   └── data/                  # JSON content files
│       ├── hero.json          # Homepage content
│       ├── work.json          # Portfolio items
│       ├── process.json       # Process page content
│       ├── story.json         # About/story content
│       ├── locations.json     # Studio locations
│       ├── contact.json       # Contact information
│       └── faq.json           # FAQ items
│
└── 🎨 Assets
    └── public/images/         # All organized images
        ├── hero/              # Homepage banners and logos
        ├── work/              # Portfolio project images
        ├── process/           # Process page imagery
        ├── story/             # Story page photos
        ├── locations/         # Studio location images
        ├── polaroids/         # Polaroid gallery images
        └── uploads/           # User uploaded content
```

## ⚡ Quick Start

### Development Mode
```bash
# Install dependencies
npm install

# Start React development server (port 3000)
npm start

# Start Express API server (port 3001)
node server.js

# Or start both with the startup script
./start-production.sh
```

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start:production
```

## 🎨 Design System

### Typography
- **Primary**: Proxima Nova Extra Wide (headings)
- **Body**: Proxima Nova (body text)
- **Monospace**: Cutive Mono (detail text)
- **Script**: Lovtony Script (decorative)

### Color Palette
```css
:root {
  --studio-blue: #0025B8;
  --studio-orange: #FF7E46;
  --studio-bg: #F8F7F7;
  --nav-blue: #08249F;
}
```

### Key Features
- **Responsive design** with mobile-first approach
- **Smooth animations** using React state and CSS transitions
- **Image optimization** with lazy loading and responsive sizing
- **Content management** through JSON data files
- **Backend API** for dynamic content and uploads

## 📊 Content Data Structure

All content is managed through JSON files in `/data/` directory:

### Hero Content (`hero.json`)
```json
{
  "carousel": [
    {
      "id": 1,
      "desktop": "image-path.jpg",
      "mobile": "image-path-mobile.jpg",
      "alt": "Description"
    }
  ],
  "polaroids": [...],
  "atelier": {...}
}
```

### Work Portfolio (`work.json`)
```json
[
  {
    "id": 1,
    "title": "Project Name",
    "category": "FILM & TV",
    "image": "image-path.jpg",
    "mobileImage": "mobile-image-path.jpg",
    "side": "left",
    "showOnWorkPage": true,
    "content": {
      "stylist": "Name",
      "photographer": "Name",
      "date": "2024"
    }
  }
]
```

## 🔧 Technical Specifications

### Frontend Stack
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Custom hooks** for data management
- **Context API** for state management

### Backend Stack
- **Express.js** server
- **File-based JSON storage**
- **JWT authentication**
- **Multer** for file uploads
- **CORS** enabled for development

### Performance Features
- **Lazy loading** images
- **Intersection Observer** for scroll animations
- **Optimized bundle** with code splitting
- **Responsive images** with picture elements

## 🚀 Deployment Notes

### Environment Variables
```bash
JWT_SECRET=your-secret-key
ADMIN_PASSWORD=your-admin-password
PORT=3001
NODE_ENV=production
```

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure secure ADMIN_PASSWORD
- [ ] Set appropriate CORS origins
- [ ] Optimize images for web
- [ ] Test all functionality
- [ ] Monitor performance

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🔗 Related Projects

This React application was used as the reference for creating:
- **WordPress Theme** - Pixel-perfect WordPress implementation
- **HTML Previews** - Standalone preview files
- **Testing Suite** - Quality assurance tools

---

## 📞 Technical Notes

### Data Management
- All content stored in JSON files under `/data/`
- Images organized by page/section in `/public/images/`
- No database required - file-based content system
- Admin panel for content management (if implemented)

### API Endpoints
- `GET/PUT /api/hero` - Hero content management
- `GET/PUT /api/work` - Portfolio items
- `GET/PUT /api/process` - Process content
- `GET/PUT /api/story` - Story page content
- `GET/PUT /api/locations` - Location information
- `GET/PUT /api/contact` - Contact details
- `GET/POST/DELETE /api/faq` - FAQ management
- `POST /api/upload` - File upload handling

### Security Features
- JWT-based authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Secure file upload handling

---

**This React application served as the reference implementation for the WordPress theme conversion, ensuring pixel-perfect design fidelity across all pages and interactions.**

© 2024 Studio Pickens React Application