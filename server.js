const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

// Load environment variables
require('dotenv').config();

// Import authentication middleware
const { 
  initializeAuth, 
  requireAuth, 
  requireAdmin, 
  loginHandler, 
  logoutHandler, 
  getCurrentUser, 
  changePasswordHandler 
} = require('./src/middleware/auth');

// Import validation middleware
const {
  validateHero,
  validateWork,
  validateProcess,
  validateStory,
  validateLocations,
  validateContact,
  validateFAQ,
  validateWorkProject,
  validateProcessStep,
  validateFAQItem,
  validateFileUpload,
  validateIdParam
} = require('./src/middleware/validation');

// Import error handling middleware
const {
  errorHandler,
  asyncHandler,
  notFoundHandler,
  validateRequest,
  securityHeaders,
  safeReadJsonFile,
  safeWriteJsonFile,
  sendSuccessResponse,
  sendErrorResponse,
  ValidationError,
  NotFoundError,
  DatabaseError
} = require('./src/middleware/errorHandler');

const app = express();

// Environment Configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const UPLOAD_MAX_SIZE = parseInt(process.env.UPLOAD_MAX_SIZE) || 10485760; // 10MB
const STATIC_FILES_PATH = process.env.STATIC_FILES_PATH || './public';
const DATA_PATH = process.env.DATA_PATH || './data';

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (NODE_ENV === 'development') {
      // Allow all origins in development
      return callback(null, true);
    }
    
    // Production CORS handling
    const allowedOrigins = CORS_ORIGIN.split(',').map(origin => origin.trim());
    
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`CORS: Blocked request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  preflightContinue: false
};

// Rate limiting
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.API_RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many API requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Security middleware
app.use(securityHeaders);
app.use(validateRequest);

// Apply rate limiting to API routes (temporarily disabled for development)
if (NODE_ENV === 'production') {
  app.use('/api', apiLimiter);
}

// Data file paths
const DATA_DIR = path.join(__dirname, DATA_PATH);
const HERO_DATA_FILE = path.join(DATA_DIR, 'hero.json');
const WORK_DATA_FILE = path.join(DATA_DIR, 'work.json');
const FAQ_DATA_FILE = path.join(DATA_DIR, 'faq.json');
const CONTACT_DATA_FILE = path.join(DATA_DIR, 'contact.json');
const PROCESS_DATA_FILE = path.join(DATA_DIR, 'process.json');
const STORY_DATA_FILE = path.join(DATA_DIR, 'story.json');
const LOCATIONS_DATA_FILE = path.join(DATA_DIR, 'locations.json');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/images/uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: UPLOAD_MAX_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
  }
});

// Authentication Routes
app.post('/api/auth/login', NODE_ENV === 'production' ? authLimiter : (req, res, next) => next(), loginHandler);
app.post('/api/auth/logout', logoutHandler);
app.get('/api/auth/me', requireAuth, getCurrentUser);
app.post('/api/auth/change-password', requireAuth, changePasswordHandler);

// Hero API Routes
app.get('/api/hero', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(HERO_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/hero/:id', requireAuth, requireAdmin, validateIdParam, validateHero, asyncHandler(async (req, res) => {
  await safeWriteJsonFile(HERO_DATA_FILE, req.body);
  sendSuccessResponse(res, null, 'Hero data updated successfully');
}));

// Work API Routes
app.get('/api/work', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(WORK_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/work', requireAuth, requireAdmin, validateWork, asyncHandler(async (req, res) => {
  await safeWriteJsonFile(WORK_DATA_FILE, req.body);
  sendSuccessResponse(res, null, 'Work data updated successfully');
}));

app.post('/api/work', requireAuth, requireAdmin, validateWorkProject, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(WORK_DATA_FILE) || { projects: [] };
  const newProject = { ...req.body, id: Date.now() };
  data.projects.push(newProject);
  await safeWriteJsonFile(WORK_DATA_FILE, data);
  sendSuccessResponse(res, newProject, 'Work project created successfully');
}));

app.delete('/api/work/:id', requireAuth, requireAdmin, validateIdParam, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(WORK_DATA_FILE);
  if (!data || !data.projects) {
    throw new NotFoundError('Work data not found');
  }
  
  const originalLength = data.projects.length;
  data.projects = data.projects.filter(p => p.id !== parseInt(req.params.id));
  
  if (data.projects.length === originalLength) {
    throw new NotFoundError('Work project not found');
  }
  
  await safeWriteJsonFile(WORK_DATA_FILE, data);
  sendSuccessResponse(res, null, 'Work project deleted successfully');
}));

// Process API Routes
app.get('/api/process', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(PROCESS_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/process/:id', requireAuth, requireAdmin, validateIdParam, validateProcess, asyncHandler(async (req, res) => {
  const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
  await safeWriteJsonFile(PROCESS_DATA_FILE, updatedData);
  sendSuccessResponse(res, null, 'Process data updated successfully');
}));

app.post('/api/process/steps', requireAuth, requireAdmin, validateProcessStep, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(PROCESS_DATA_FILE);
  if (!data) {
    throw new NotFoundError('Process data not found');
  }
  
  if (!data.processSteps) {
    data.processSteps = [];
  }
  
  const newStep = { ...req.body, id: Date.now() };
  data.processSteps.push(newStep);
  
  await safeWriteJsonFile(PROCESS_DATA_FILE, data);
  sendSuccessResponse(res, newStep, 'Process step created successfully');
}));

app.put('/api/process/steps/:stepId', requireAuth, requireAdmin, validateIdParam, validateProcessStep, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(PROCESS_DATA_FILE);
  if (!data || !data.processSteps) {
    throw new NotFoundError('Process data not found');
  }
  
  const stepIndex = data.processSteps.findIndex(step => step.id === parseInt(req.params.stepId));
  if (stepIndex === -1) {
    throw new NotFoundError('Process step not found');
  }
  
  data.processSteps[stepIndex] = { ...req.body, id: parseInt(req.params.stepId) };
  await safeWriteJsonFile(PROCESS_DATA_FILE, data);
  sendSuccessResponse(res, data.processSteps[stepIndex], 'Process step updated successfully');
}));

app.delete('/api/process/steps/:stepId', requireAuth, requireAdmin, validateIdParam, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(PROCESS_DATA_FILE);
  if (!data || !data.processSteps) {
    throw new NotFoundError('Process data not found');
  }
  
  const originalLength = data.processSteps.length;
  data.processSteps = data.processSteps.filter(step => step.id !== parseInt(req.params.stepId));
  
  if (data.processSteps.length === originalLength) {
    throw new NotFoundError('Process step not found');
  }
  
  await safeWriteJsonFile(PROCESS_DATA_FILE, data);
  sendSuccessResponse(res, null, 'Process step deleted successfully');
}));

// Story API Routes
app.get('/api/story', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(STORY_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/story/:id', requireAuth, requireAdmin, validateIdParam, validateStory, asyncHandler(async (req, res) => {
  const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
  await safeWriteJsonFile(STORY_DATA_FILE, updatedData);
  sendSuccessResponse(res, null, 'Story data updated successfully');
}));

// Locations API Routes
app.get('/api/locations', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(LOCATIONS_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/locations/:id', requireAuth, requireAdmin, validateIdParam, validateLocations, asyncHandler(async (req, res) => {
  const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
  await safeWriteJsonFile(LOCATIONS_DATA_FILE, updatedData);
  sendSuccessResponse(res, null, 'Locations data updated successfully');
}));

// Contact API Routes
app.get('/api/contact', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(CONTACT_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/contact/:id', requireAuth, requireAdmin, validateIdParam, validateContact, asyncHandler(async (req, res) => {
  const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
  await safeWriteJsonFile(CONTACT_DATA_FILE, updatedData);
  sendSuccessResponse(res, null, 'Contact data updated successfully');
}));

// FAQ API Routes
app.get('/api/faq', asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(FAQ_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/faq', requireAuth, requireAdmin, validateFAQ, asyncHandler(async (req, res) => {
  await safeWriteJsonFile(FAQ_DATA_FILE, req.body);
  sendSuccessResponse(res, null, 'FAQ data updated successfully');
}));

app.post('/api/faq', requireAuth, requireAdmin, validateFAQItem, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(FAQ_DATA_FILE) || { items: [] };
  const newItem = { ...req.body, id: Date.now() };
  
  if (!data.items) {
    data.items = [];
  }
  
  data.items.push(newItem);
  await safeWriteJsonFile(FAQ_DATA_FILE, data);
  sendSuccessResponse(res, newItem, 'FAQ item created successfully');
}));

app.delete('/api/faq/:id', requireAuth, requireAdmin, validateIdParam, asyncHandler(async (req, res) => {
  const data = await safeReadJsonFile(FAQ_DATA_FILE);
  if (!data || !data.items) {
    throw new NotFoundError('FAQ data not found');
  }
  
  const originalLength = data.items.length;
  data.items = data.items.filter(item => item.id !== parseInt(req.params.id));
  
  if (data.items.length === originalLength) {
    throw new NotFoundError('FAQ item not found');
  }
  
  await safeWriteJsonFile(FAQ_DATA_FILE, data);
  sendSuccessResponse(res, null, 'FAQ item deleted successfully');
}));

// Image Upload Route
app.post('/api/upload', requireAuth, requireAdmin, upload.single('image'), validateFileUpload, asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }
  
  const imagePath = `/images/uploads/${req.file.filename}`;
  const imageInfo = {
    path: imagePath,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadedAt: new Date().toISOString()
  };
  
  sendSuccessResponse(res, imageInfo, 'Image uploaded successfully');
}));

// Images List Route
app.get('/api/images', asyncHandler(async (req, res) => {
  try {
    const imagesDir = path.join(__dirname, 'public/images');
    const imagesList = await getImagesRecursively(imagesDir);
    sendSuccessResponse(res, imagesList);
  } catch (error) {
    sendSuccessResponse(res, []); // Return empty array if images directory doesn't exist
  }
}));

// Helper function to recursively get all images
async function getImagesRecursively(dir, baseDir = dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let images = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      const subImages = await getImagesRecursively(fullPath, baseDir);
      images = images.concat(subImages);
    } else if (item.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      const relativePath = path.relative(baseDir, fullPath);
      const webPath = `/images/${relativePath.replace(/\\/g, '/')}`;
      images.push({
        path: webPath,
        name: item.name,
        size: (await fs.stat(fullPath)).size
      });
    }
  }
  
  return images;
}

// Health Check Route
app.get('/api/health', (req, res) => {
  sendSuccessResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize authentication system
initializeAuth();

// Start server
app.listen(PORT, HOST, () => {
  const serverUrl = NODE_ENV === 'production' 
    ? `https://${HOST}` 
    : `http://${HOST}:${PORT}`;
  
  console.log(`✅ Studio Pickens API Server running on ${serverUrl}`);
  console.log(`📁 Environment: ${NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${CORS_ORIGIN}`);
  console.log(`📁 Data Path: ${DATA_PATH}`);
  console.log(`📤 Upload Max Size: ${(UPLOAD_MAX_SIZE / 1024 / 1024).toFixed(1)}MB`);
  console.log(`🔐 Authentication: Enabled`);
  console.log(`⚡ Rate Limiting: Enabled`);
  console.log(`🛡️  Input Validation: Enabled`);
  console.log(`🔄 Error Handling: Comprehensive`);
});