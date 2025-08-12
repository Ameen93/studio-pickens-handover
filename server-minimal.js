const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const HERO_DATA_FILE = path.join(DATA_DIR, 'hero.json');
const WORK_DATA_FILE = path.join(DATA_DIR, 'work.json');
const FAQ_DATA_FILE = path.join(DATA_DIR, 'faq.json');
const CONTACT_DATA_FILE = path.join(DATA_DIR, 'contact.json');

// Helper functions
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
    throw error;
  }
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

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// API Routes
app.get('/api/hero', async (req, res) => {
  try {
    const data = await readJsonFile(HERO_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/hero/:id', async (req, res) => {
  try {
    await writeJsonFile(HERO_DATA_FILE, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/work', async (req, res) => {
  try {
    const data = await readJsonFile(WORK_DATA_FILE);
    res.json(data || { banner: {}, projects: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/work', async (req, res) => {
  try {
    await writeJsonFile(WORK_DATA_FILE, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/work', async (req, res) => {
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

app.delete('/api/work/:id', async (req, res) => {
  try {
    const data = await readJsonFile(WORK_DATA_FILE);
    if (data && data.projects) {
      data.projects = data.projects.filter(p => p.id != req.params.id);
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

app.post('/api/faq', async (req, res) => {
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

app.delete('/api/faq/:id', async (req, res) => {
  try {
    const data = await readJsonFile(FAQ_DATA_FILE) || [];
    const filtered = data.filter(item => item.id != req.params.id);
    await writeJsonFile(FAQ_DATA_FILE, filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const data = await readJsonFile(CONTACT_DATA_FILE);
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`✅ Studio Pickens API Server running on http://localhost:${PORT}`);
});