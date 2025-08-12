# Vercel Deployment Checklist for Studio Pickens

## Pre-Deployment Tasks

### 1. ✅ Data Setup
- [ ] Verify all JSON data files exist in `/data/` directory
- [ ] Ensure data files are committed to git (not in .gitignore)
- [ ] Copy data files to `/public/data/` for static access
- [ ] Verify all hooks are fetching from `/data/*.json` (not API endpoints)

### 2. ✅ Remove Backend Dependencies
- [ ] Comment out or remove admin route in `/src/App.tsx`
- [ ] Remove AdminApp import from `/src/App.tsx`
- [ ] Ensure no components are making API calls to localhost:3001
- [ ] Remove or comment out AuthContext provider if used

### 3. ✅ Image Assets
- [ ] Verify all images are in `/public/images/` directory
- [ ] Check that all image paths in JSON files are relative to public folder
- [ ] Ensure all images are committed to git
- [ ] Test that images load correctly in development

### 4. ✅ Environment Variables
- [ ] Create `.env.production` file (if needed)
- [ ] Set `REACT_APP_API_URL` to empty string or remove it
- [ ] Remove any backend-specific environment variables

### 5. ✅ Build Configuration
- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run build` locally to test production build
- [ ] Fix any build errors or warnings
- [ ] Test the production build with `serve -s build`

### 6. ✅ Routing Configuration
- [ ] Create `vercel.json` for client-side routing support
- [ ] Ensure all routes work with client-side navigation

## Vercel-Specific Configuration

### 1. Create `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Update `.gitignore`:
- Remove `/data` from .gitignore (if present)
- Keep standard React/Node ignores
- Add `.vercel` to .gitignore

### 3. Package.json Scripts:
- Ensure `build` script is: `"build": "react-scripts build"`
- No need for custom start scripts for Vercel

## Post-Deployment Verification

### 1. ✅ Homepage
- [ ] Hero section loads with images
- [ ] Polaroid animations work
- [ ] Scroll interactions function
- [ ] Navigation works correctly

### 2. ✅ All Pages
- [ ] Work page displays all projects
- [ ] Process page shows all steps
- [ ] Story page content loads
- [ ] Locations page shows all locations
- [ ] Contact page displays info
- [ ] FAQ page shows all questions

### 3. ✅ Responsive Design
- [ ] Test on mobile devices
- [ ] Test on tablet devices
- [ ] Test on desktop

### 4. ✅ Performance
- [ ] Images load quickly
- [ ] No console errors
- [ ] Smooth animations
- [ ] Fast page transitions

## Known Issues to Address

1. **Admin Panel**: Currently disabled for static deployment
2. **Dynamic Updates**: Content updates require code deployment
3. **Image Uploads**: Not available without backend

## Deployment Steps

1. Push all changes to GitHub
2. Connect repository to Vercel
3. Set framework preset to "Create React App"
4. Deploy and test live URL
5. Set up custom domain (if applicable)

## Emergency Fixes

If deployment fails:
1. Check build logs for errors
2. Verify all dependencies are in package.json
3. Ensure no absolute paths are used
4. Check for missing environment variables
5. Verify all static assets are committed