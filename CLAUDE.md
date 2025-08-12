# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Pickens is a production-ready React TypeScript application for a high-end creative studio website. It features a responsive design with premium interactions, scroll animations, and a comprehensive backend API system.

## Development Commands

### Primary Commands
- `npm start` - Start React development server (http://localhost:3000)
- `node server.js` - Start Express API server (http://localhost:3001)
- `./start-app.sh` - Start complete application with MongoDB (requires sudo)
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production

### Testing Commands
- `npm test -- --testNamePattern="test name"` - Run specific test by name
- `npm test -- --testPathPattern="Navbar"` - Run tests matching file pattern
- `npm run test:coverage` - Generate test coverage report
- `npm run test:ci` - Run tests in CI mode with coverage

### Production Commands
- `npm run server:dev` - Start server with nodemon for development
- `npm run start:production` - Start server in production mode
- `npm run validate:production` - Validate production configuration
- `npm run health-check` - Check if server is running

## Architecture

### Frontend Stack
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest with React Testing Library
- **Routing**: Custom client-side routing system in `src/utils/router.jsx`

### Backend Stack
- **Server**: Express.js with comprehensive middleware
- **Data Storage**: JSON file storage in `data/` directory
- **Authentication**: JWT-based auth with admin role management
- **Validation**: Joi schemas for request validation
- **Security**: Rate limiting, CORS, security headers

### Data Flow
1. React components use custom hooks (`src/hooks/`) to fetch data
2. Hooks call API endpoints through `src/config/api.js`
3. Express server handles requests with validation middleware
4. Data is read/written to JSON files in `data/` directory
5. Server includes error handling and security middleware

## Key Directories

- `src/pages/` - Main application pages (Home, Work, Process, Story, Locations, Contact, FAQ)
- `src/components/` - Reusable UI components organized by:
  - `common/` - Shared components across pages
  - `sections/` - Page-specific sections
  - `ui/` - Base UI elements
- `src/hooks/` - Custom data fetching hooks for each content section
- `src/middleware/` - Server middleware for auth, validation, error handling
- `src/constants/` - Configuration for typography and animations
- `data/` - JSON data storage for all content
- `public/images/` - Static assets organized by content type

## API Endpoints

All endpoints support GET for reading and PUT for updating (admin auth required):
- `/api/hero` - Hero section content
- `/api/work` - Work gallery projects
- `/api/process` - Process page content
- `/api/story` - Story page content
- `/api/locations` - Location information
- `/api/contact` - Contact details
- `/api/faq` - FAQ items (also supports POST/DELETE)
- `/api/upload` - Image upload functionality
- `/api/auth/login` - Admin authentication
- `/api/auth/logout` - Session termination
- `/api/auth/me` - Current user info

## Data Management

### JSON Storage Structure
Each content type has a corresponding JSON file in `data/`:
- `hero.json` - Hero carousel and landing content
- `work.json` - Portfolio projects with categories
- `process.json` - Process steps and descriptions
- `story.json` - About/story page content
- `locations.json` - Office locations
- `contact.json` - Contact information
- `faq.json` - Frequently asked questions
- `users.json` - Admin user credentials (hashed)
- `images.json` - Image metadata and paths

### Custom Hooks Pattern
Each data type has a corresponding hook in `src/hooks/`:
```javascript
useHeroData() - Fetches and manages hero content
useWorkData() - Manages work gallery with filtering
useProcessData() - Process page data
useStoryData() - Story/about content
useLocationsData() - Location information
useContactData() - Contact details
useFAQData() - FAQ items with CRUD operations
```

## Testing Strategy

### Test Organization
- Component tests: `src/components/__tests__/`
- Hook tests: `src/hooks/__tests__/`
- Middleware tests: `src/middleware/__tests__/`
- Integration tests: `src/__tests__/api.integration.test.js`

### Test Utilities
- Mock data fixtures for consistent testing
- Custom render functions with providers
- API mocking for isolated component tests

## Security Configuration

### Authentication
- JWT-based authentication with httpOnly cookies
- Admin role verification for protected endpoints
- Rate limiting on auth endpoints (3 attempts per 15 minutes)

### Validation
- Joi schemas for all API endpoints
- Input sanitization for file uploads
- CORS configuration for production domains

### Production Environment
Configure `.env.production` with:
- Strong JWT_SECRET (256+ bits)
- Secure ADMIN_PASSWORD
- Appropriate CORS_ORIGIN domains
- Rate limiting settings

## Design System Implementation

### Typography Constants (`src/constants/typography.js`)
- Proxima Nova Extra Wide font family
- 700 weight, uppercase transformation
- 3% letter spacing standard

### Animation System (`src/constants/animations.js`)
- Scroll-triggered animations
- Sine-based floating effects
- Smooth transitions for interactions

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Touch targets minimum 44px
- Navbar transforms on scroll with centered title

## Development Workflow

1. Start MongoDB if using database features: `sudo systemctl start mongod`
2. Run development servers: `./start-app.sh` or separately:
   - Frontend: `npm start`
   - Backend: `node server.js`
3. Access application at http://localhost:3000
4. Test changes: `npm test`
5. Build for production: `npm run build`
6. Validate production config: `npm run validate:production`

## Error Handling

The application includes comprehensive error handling:
- Custom error classes in `src/middleware/errorHandler.js`
- Async wrapper for route handlers
- Validation error formatting
- Production-safe error messages
- 404 handling for undefined routes