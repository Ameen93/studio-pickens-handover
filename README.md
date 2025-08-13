# Studio Pickens - Production Website

A premium creative studio website built with React and TypeScript, featuring responsive design and modern animations.

## Project Overview

Studio Pickens is a high-end creative studio website showcasing:
- Premium responsive design optimized for desktop and mobile
- Smooth scroll animations and floating effects
- High-quality image galleries with custom layouts
- Professional contact and FAQ sections

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Testing Library** for testing
- **Create React App** build system

### Backend
- **Express.js** server for API endpoints
- **JSON file storage** for content data
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd studio-pickens-handover
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:

**Frontend** (runs on http://localhost:3000):
```bash
npm start
```

**Backend** (runs on http://localhost:3001):
```bash
npm run server
```

4. Open http://localhost:3000 to view the website

## Project Structure

```
src/
├── components/
│   ├── common/        # Shared components (Header, Footer, etc.)
│   ├── sections/      # Page-specific sections
│   └── ui/           # Base UI elements
├── pages/            # Main pages (Home, Work, Process, Story, etc.)
├── hooks/            # Custom React hooks for data fetching
├── constants/        # Typography system and animations
├── utils/            # Utilities and API client
└── __tests__/        # Test files

data/                 # JSON content files
public/
├── images/          # Static image assets
└── data/           # Public JSON data files

server.js            # Express server
```

## Available Scripts

- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run server` - Start Express API server

## Content Management

Content is stored in JSON files in the `data/` directory:
- `hero.json` - Homepage hero section
- `work.json` - Portfolio projects
- `process.json` - Process page content
- `story.json` - About/story content
- `locations.json` - Location information
- `contact.json` - Contact details
- `faq.json` - FAQ items

## API Endpoints

The server provides read-only API endpoints:
- `GET /api/hero` - Hero section data
- `GET /api/work` - Work portfolio data
- `GET /api/process` - Process page data
- `GET /api/story` - Story page data
- `GET /api/locations` - Location data
- `GET /api/contact` - Contact information
- `GET /api/faq` - FAQ data

## Design Features

### Typography
- **Primary Font**: Proxima Nova Extra Wide
- **Decorative Font**: Lovtony Script
- **Colors**: Background `#F8F7F7`, Primary `#0025B8`, Accent `#FF7E46`

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Optimized layouts for 1080p and 1440p+ displays
- Touch-friendly navigation and interactions

### Animations
- Scroll-triggered animations with floating effects
- Smooth transitions and hover states
- Rotating elements and carousel components

## Building for Production

1. Build the React app:
```bash
npm run build
```

2. The built files will be in the `build/` directory
3. Deploy both the built React app and the Express server
4. Ensure the server can serve static files and API routes

## Browser Support

- Chrome, Firefox, Safari (latest versions)
- Mobile browsers on iOS and Android
- Optimized for desktop viewing with responsive mobile support

## Performance

- Optimized images with proper sizing
- Efficient component rendering with React 19
- Minimal JavaScript bundle with code splitting
- Fast loading times with responsive image handling

---

**Note**: This is a production-ready handover version with all administrative features and development tools removed for security and simplicity.