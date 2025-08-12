# Studio Pickens API Documentation

## Overview
This API provides endpoints for managing the Studio Pickens website content including hero sections, work projects, FAQ items, and image uploads.

## Base URL
- Development: `http://localhost:3001`
- Production: `https://api.studiopickens.com`

## Authentication
Currently, the API does not require authentication for read operations. Write operations are intended for the admin panel.

## Response Format
All responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error description",
  "details": ["Validation error 1", "Validation error 2"]
}
```

## Endpoints

### Health Check
- **GET** `/api/health`
- **Description**: Check API health status
- **Response**: 
  ```json
  {
    "status": "healthy",
    "timestamp": "2024-07-15T19:00:00.000Z",
    "uptime": 1234.567
  }
  ```

### Hero Section

#### Get Hero Data
- **GET** `/api/hero`
- **Description**: Retrieve hero section data
- **Response**: Hero data object with background images and polaroids

#### Update Hero Data
- **PUT** `/api/hero/:id`
- **Description**: Update hero section data
- **Request Body**: Hero data object
- **Validation**: 
  - `title` (required, string)
  - `backgroundImages` (optional, array)
  - `polaroids` (optional, array)

### Work Projects

#### Get Work Data
- **GET** `/api/work`
- **Description**: Retrieve work section data including banner and projects
- **Response**: Work data object with banner and projects array

#### Update Work Data
- **PUT** `/api/work`
- **Description**: Update entire work section data
- **Request Body**: Work data object with banner and projects
- **Validation**: 
  - `banner` (required, object)
  - `projects` (required, array)

#### Add Work Project
- **POST** `/api/work`
- **Description**: Add a new work project
- **Request Body**: Project data object
- **Validation**: 
  - `title` (required, string)
  - `client` (required, string)
  - `category` (required, string)
  - `year` (required, number, 2000-2030)
  - `image` (required, string)
- **Response**: Created project with auto-generated ID and timestamps

#### Delete Work Project
- **DELETE** `/api/work/:id`
- **Description**: Delete a work project by ID
- **Parameters**: `id` (integer, project ID)
- **Response**: Success confirmation

### FAQ Items

#### Get FAQ Data
- **GET** `/api/faq`
- **Description**: Retrieve all FAQ items
- **Response**: Array of FAQ items

#### Add FAQ Item
- **POST** `/api/faq`
- **Description**: Add a new FAQ item
- **Request Body**: FAQ item data object
- **Validation**: 
  - `question` (required, string)
  - `answer` (required, string)
  - `order` (optional, positive number)
  - `category` (optional, string)
- **Response**: Created FAQ item with auto-generated ID and timestamps

#### Delete FAQ Item
- **DELETE** `/api/faq/:id`
- **Description**: Delete an FAQ item by ID
- **Parameters**: `id` (integer, FAQ item ID)
- **Response**: Success confirmation

### Contact Information

#### Get Contact Data
- **GET** `/api/contact`
- **Description**: Retrieve contact information
- **Response**: Contact data object with locations and social media

### Image Management

#### Upload Image
- **POST** `/api/upload`
- **Description**: Upload a new image file
- **Request**: Multipart form data with `image` field
- **File Requirements**:
  - Max size: 10MB
  - Allowed types: JPEG, PNG, GIF, WebP
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
      "path": "/images/uploads/filename.jpg",
      "filename": "filename.jpg",
      "originalName": "original.jpg",
      "size": 1024000,
      "mimeType": "image/jpeg"
    }
  }
  ```

#### List Images
- **GET** `/api/images`
- **Description**: List all available images
- **Response**: 
  ```json
  {
    "success": true,
    "count": 66,
    "data": [
      {
        "name": "image.jpg",
        "path": "/images/folder/image.jpg",
        "size": 1024000,
        "modified": "2024-07-15T19:00:00.000Z",
        "folder": "folder"
      }
    ]
  }
  ```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Types
- **Validation Errors**: Missing required fields or invalid data types
- **File Upload Errors**: Invalid file type or size exceeded
- **Not Found Errors**: Resource doesn't exist
- **Server Errors**: Internal processing errors

## Data Schemas

### Hero Data Schema
```json
{
  "id": 1,
  "title": "STUDIO PICKENS",
  "subtitle": "",
  "backgroundImages": [
    {
      "image": "/images/hero/background1.jpg",
      "alt": "Description",
      "transform": {
        "scale": 1,
        "translateX": 0,
        "translateY": 0,
        "flip": false
      }
    }
  ],
  "polaroids": [
    {
      "image": "/images/polaroids/polaroid1.png",
      "alt": "Description",
      "rotation": 10,
      "position": {
        "top": "10px",
        "left": "20px"
      }
    }
  ],
  "createdAt": "2024-07-15T19:00:00.000Z",
  "updatedAt": "2024-07-15T19:00:00.000Z"
}
```

### Work Project Schema
```json
{
  "id": 1,
  "title": "VOGUE HONG KONG",
  "client": "Vogue",
  "category": "EDITORIAL",
  "year": 2025,
  "image": "/images/work/editorial.jpg",
  "alt": "Editorial photo",
  "description": "Project description",
  "stylist": "jane smith",
  "photographer": "emmie america",
  "left": 132,
  "top": 0,
  "side": "left",
  "createdAt": "2024-07-15T19:00:00.000Z",
  "updatedAt": "2024-07-15T19:00:00.000Z"
}
```

### FAQ Item Schema
```json
{
  "id": 1,
  "question": "HOW LONG DOES IT TAKE TO CREATE A CUSTOM WIG?",
  "answer": "Detailed answer here...",
  "order": 1,
  "category": "process",
  "createdAt": "2024-07-15T19:00:00.000Z",
  "updatedAt": "2024-07-15T19:00:00.000Z"
}
```

## Security Features

### File Upload Security
- File type validation (whitelist approach)
- File size limits
- Secure filename generation
- Directory traversal protection

### CORS Configuration
- Production: Restricted to specific domains
- Development: Local development allowed

### Input Validation
- All inputs are validated and sanitized
- Type checking for all fields
- Range validation for numeric fields

## Performance Optimizations
- Efficient file handling
- Minimal memory usage for large files
- Proper error handling to prevent crashes
- Graceful shutdown handling

## Monitoring
- Request logging with timestamps
- Error logging with stack traces
- Health check endpoint for monitoring
- Process uptime tracking