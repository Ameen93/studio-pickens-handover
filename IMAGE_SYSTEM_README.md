# Image Management System for Studio Pickens Admin Panel

## Overview
The admin panel now features a comprehensive image management system that makes it easy for non-developers to upload, browse, and manage images.

## Key Features

### 1. Image Upload
- **Quick Upload**: Click "Upload New Image" for instant file upload
- **File Validation**: Automatically validates file types (JPG, PNG, GIF, WebP)
- **Size Limit**: 10MB maximum file size
- **Auto-naming**: Files are automatically renamed with timestamps to prevent conflicts

### 2. Image Selection
- **Visual Browser**: Browse all existing images with thumbnails
- **Search**: Search images by name or folder
- **Filter by Folder**: Filter images by category (hero, work, process, etc.)
- **Organized Display**: Images are organized by folder structure

### 3. Image Preview
- **Live Preview**: See selected images immediately
- **Remove Option**: Easy one-click image removal
- **Path Display**: Shows current image path for reference

## How to Use

### For Banner Images (Work Page)
1. Go to Admin Panel → Work Editor
2. In the "Banner Settings" section:
   - For Desktop: Click "Upload New Image" or "Browse Existing Images"
   - For Mobile: Same options for mobile-specific banner
3. Select or upload your image
4. Click "Save Banner"

### For Project Images
1. In the "Add New Project" section
2. Under "Project Image": Click "Upload New Image" or "Browse Existing Images"
3. Select your image and fill in other project details
4. Click "Add Project"

### For Hero Section
1. Go to Admin Panel → Hero Editor
2. For Background Images: Use the image upload components
3. For Polaroids: Each polaroid has its own image upload component
4. Click "Save Changes"

## Existing Image Records

The system has catalogued all existing images in the following categories:

### Hero Images
- Background images for the main hero section
- Studio Pickens logos (regular and white versions)

### Polaroid Images
- new-polaroid-1.png, new-polaroid-2.png, new-polaroid-3.png (currently used)
- Original polaroid images for reference

### Work Portfolio Images
- Editorial work samples
- Concert work samples
- Film & TV work samples
- Theatre work samples
- Music video work samples
- Live performance work samples

### Banner Images
- Desktop and mobile work page banners
- Desktop and mobile process page banners
- Category-specific banners (editorial, film/tv, theatre, music)

### Brand Assets
- Client logos for the "brag bar" (Vogue, HBO, Apple TV, etc.)
- Footer signatures
- Location images (Beverly Hills, London, New York)

## Technical Details

### API Endpoints
- `POST /api/upload` - Upload new images
- `GET /api/images` - List all existing images

### Storage
- Uploaded images are stored in `/public/images/uploads/`
- Existing images are organized in folders by category
- All images are served statically from the `/public/images/` directory

### File Naming
- Uploaded files are automatically renamed with format: `fieldname-timestamp-random.ext`
- Example: `image-1752601687235-526206618.jpg`

## Benefits for Non-Developers

1. **No Technical Knowledge Required**: Users never need to type file paths
2. **Visual Interface**: All image operations are visual and intuitive
3. **Error Prevention**: File validation prevents upload issues
4. **Organized Library**: Easy to find and reuse existing images
5. **Instant Feedback**: Live previews show exactly what will be displayed
6. **Safe Operations**: Images can be easily removed or replaced

## Current Status
✅ Image upload API working
✅ Image listing and browsing working
✅ Visual image selection modal working
✅ All editors updated with image upload components
✅ Existing images catalogued and accessible
✅ Live preview system integrated