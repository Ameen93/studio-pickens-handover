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
  origin: NODE_ENV === 'production' 
    ? CORS_ORIGIN.split(',').map(origin => origin.trim())
    : CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many API requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Security middleware
app.use(securityHeaders);
app.use(validateRequest);

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// Data file paths
const DATA_DIR = path.join(__dirname, DATA_PATH);
const HERO_DATA_FILE = path.join(DATA_DIR, 'hero.json');
const WORK_DATA_FILE = path.join(DATA_DIR, 'work.json');
const FAQ_DATA_FILE = path.join(DATA_DIR, 'faq.json');
const CONTACT_DATA_FILE = path.join(DATA_DIR, 'contact.json');
const PROCESS_DATA_FILE = path.join(DATA_DIR, 'process.json');
const STORY_DATA_FILE = path.join(DATA_DIR, 'story.json');
const LOCATIONS_DATA_FILE = path.join(DATA_DIR, 'locations.json');

// Helper functions (legacy - will be replaced with safe operations)
async function readJsonFile(filePath) {
  return await safeReadJsonFile(filePath);
}

async function writeJsonFile(filePath, data) {
  return await safeWriteJsonFile(filePath, data);
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/images/uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${timestamp}_${randomSuffix}${ext}`);
  }
});

// Get allowed file types from environment
const ALLOWED_TYPES = process.env.UPLOAD_ALLOWED_TYPES 
  ? process.env.UPLOAD_ALLOWED_TYPES.split(',').map(type => type.trim())
  : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

const upload = multer({ 
  storage: storage,
  limits: { fileSize: UPLOAD_MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Authentication Routes
app.post('/api/auth/login', authLimiter, loginHandler);
app.post('/api/auth/logout', logoutHandler);
app.get('/api/auth/me', requireAuth, getCurrentUser);
app.post('/api/auth/change-password', requireAuth, changePasswordHandler);

// API Routes
app.get('/api/hero', asyncHandler(async (req, res) => {
  const data = await readJsonFile(HERO_DATA_FILE);
  sendSuccessResponse(res, data);
}));

app.put('/api/hero/:id', requireAuth, requireAdmin, validateIdParam, validateHero, asyncHandler(async (req, res) => {
  await writeJsonFile(HERO_DATA_FILE, req.body);
  sendSuccessResponse(res, null, 'Hero data updated successfully');
}));

app.get('/api/work', async (req, res) => {
  try {
    const data = await readJsonFile(WORK_DATA_FILE);
    res.json(data || { banner: {}, projects: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/work', requireAuth, requireAdmin, async (req, res) => {
  try {
    await writeJsonFile(WORK_DATA_FILE, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/work', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(WORK_DATA_FILE) || { projects: [] };
    const newProject = { ...req.body, id: Date.now() };
    data.projects.push(newProject);
    await writeJsonFile(WORK_DATA_FILE, data);
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/work/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(WORK_DATA_FILE);
    if (data && data.projects) {
      data.projects = data.projects.filter(p => p.id !== parseInt(req.params.id));
      await writeJsonFile(WORK_DATA_FILE, data);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/faq', async (req, res) => {
  try {
    const data = await readJsonFile(FAQ_DATA_FILE);
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/faq', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(FAQ_DATA_FILE) || [];
    const newItem = { ...req.body, id: Date.now() };
    data.push(newItem);
    await writeJsonFile(FAQ_DATA_FILE, data);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/faq/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(FAQ_DATA_FILE) || [];
    const filtered = data.filter(item => item.id !== parseInt(req.params.id));
    await writeJsonFile(FAQ_DATA_FILE, filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Process endpoints
app.get('/api/process', async (req, res) => {
  try {
    const data = await readJsonFile(PROCESS_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/process/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(PROCESS_DATA_FILE, updatedData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Process steps endpoints
app.post('/api/process/steps', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(PROCESS_DATA_FILE);
    if (!data) {
      return res.status(404).json({ error: 'Process data not found' });
    }
    
    const newStep = {
      ...req.body,
      id: Date.now(), // Simple ID generation
      order: data.processSteps ? data.processSteps.length + 1 : 1
    };
    
    data.processSteps = data.processSteps || [];
    data.processSteps.push(newStep);
    data.updatedAt = new Date().toISOString();
    
    await writeJsonFile(PROCESS_DATA_FILE, data);
    res.json({ success: true, step: newStep });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/process/steps/:stepId', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(PROCESS_DATA_FILE);
    if (!data) {
      return res.status(404).json({ error: 'Process data not found' });
    }
    
    const stepId = parseInt(req.params.stepId);
    const stepIndex = data.processSteps.findIndex(step => step.id === stepId);
    
    if (stepIndex === -1) {
      return res.status(404).json({ error: 'Process step not found' });
    }
    
    data.processSteps[stepIndex] = { ...req.body, id: stepId };
    data.updatedAt = new Date().toISOString();
    
    await writeJsonFile(PROCESS_DATA_FILE, data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/process/steps/:stepId', requireAuth, requireAdmin, async (req, res) => {
  try {
    const data = await readJsonFile(PROCESS_DATA_FILE);
    if (!data) {
      return res.status(404).json({ error: 'Process data not found' });
    }
    
    const stepId = parseInt(req.params.stepId);
    data.processSteps = data.processSteps.filter(step => step.id !== stepId);
    data.updatedAt = new Date().toISOString();
    
    await writeJsonFile(PROCESS_DATA_FILE, data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/upload', requireAuth, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imagePath = `/images/uploads/${req.file.filename}`;
  res.json({ 
    success: true, 
    path: imagePath,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

app.get('/api/images', async (req, res) => {
  try {
    const imagesDir = path.join(__dirname, 'public/images');
    const images = await getImagesRecursively(imagesDir);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

async function getImagesRecursively(dir, basePath = '') {
  const images = [];
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name).replace(/\\/g, '/');
      
      if (item.isDirectory()) {
        const subImages = await getImagesRecursively(itemPath, relativePath);
        images.push(...subImages);
      } else if (item.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
        const stats = await fs.stat(itemPath);
        images.push({
          name: item.name,
          path: `/images/${relativePath}`,
          size: stats.size,
          modified: stats.mtime,
          folder: basePath || 'root'
        });
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  return images;
}

// Story endpoints
app.get('/api/story', async (req, res) => {
  try {
    const data = await readJsonFile(STORY_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/story/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(STORY_DATA_FILE, updatedData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Locations endpoints
app.get('/api/locations', async (req, res) => {
  try {
    const data = await readJsonFile(LOCATIONS_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/locations/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(LOCATIONS_DATA_FILE, updatedData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact endpoints
app.get('/api/contact', async (req, res) => {
  try {
    const data = await readJsonFile(CONTACT_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/contact/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile(CONTACT_DATA_FILE, updatedData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Initialize authentication system
initializeAuth();

app.listen(PORT, HOST, () => {
  const serverUrl = NODE_ENV === 'production' 
    ? `https://${HOST}` 
    : `http://${HOST}:${PORT}`;
  
  console.log(`✅ Studio Pickens API Server running on ${serverUrl}`);
  console.log(`📁 Environment: ${NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${CORS_ORIGIN}`);
  console.log(`📁 Data Path: ${DATA_PATH}`);
  console.log(`📤 Upload Max Size: ${(UPLOAD_MAX_SIZE / 1024 / 1024).toFixed(1)}MB`);
});