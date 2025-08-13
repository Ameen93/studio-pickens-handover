const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Helper function to read JSON files safely
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// API Routes - Read Only
app.get('/api/hero', async (req, res) => {
  try {
    const data = await readJsonFile('./data/hero.json');
    if (!data) return res.status(404).json({ error: 'Hero data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero data' });
  }
});

app.get('/api/work', async (req, res) => {
  try {
    const data = await readJsonFile('./data/work.json');
    if (!data) return res.status(404).json({ error: 'Work data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch work data' });
  }
});

app.get('/api/process', async (req, res) => {
  try {
    const data = await readJsonFile('./data/process.json');
    if (!data) return res.status(404).json({ error: 'Process data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch process data' });
  }
});

app.get('/api/story', async (req, res) => {
  try {
    const data = await readJsonFile('./data/story.json');
    if (!data) return res.status(404).json({ error: 'Story data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story data' });
  }
});

app.get('/api/locations', async (req, res) => {
  try {
    const data = await readJsonFile('./data/locations.json');
    if (!data) return res.status(404).json({ error: 'Locations data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations data' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const data = await readJsonFile('./data/contact.json');
    if (!data) return res.status(404).json({ error: 'Contact data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
});

app.get('/api/faq', async (req, res) => {
  try {
    const data = await readJsonFile('./data/faq.json');
    if (!data) return res.status(404).json({ error: 'FAQ data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQ data' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});