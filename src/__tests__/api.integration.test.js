const request = require('supertest');
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// Mock the middleware
jest.mock('../middleware/auth', () => ({
  requireAuth: (req, res, next) => {
    req.user = { userId: 'admin', role: 'admin' };
    next();
  },
  requireAdmin: (req, res, next) => next(),
  loginHandler: (req, res) => {
    res.json({ success: true, token: 'mock-token' });
  },
  logoutHandler: (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
  }
}));

jest.mock('../middleware/validation', () => ({
  validateHero: (req, res, next) => next(),
  validateWork: (req, res, next) => next(),
  validateContact: (req, res, next) => next(),
  validateFAQ: (req, res, next) => next(),
  validateIdParam: (req, res, next) => next()
}));

jest.mock('../middleware/errorHandler', () => ({
  errorHandler: (err, req, res, next) => {
    res.status(500).json({ success: false, error: err.message });
  },
  asyncHandler: (fn) => fn,
  notFoundHandler: (req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
  },
  validateRequest: (req, res, next) => next(),
  securityHeaders: (req, res, next) => next(),
  safeReadJsonFile: jest.fn(),
  safeWriteJsonFile: jest.fn(),
  sendSuccessResponse: (res, data, message) => {
    res.json({ success: true, data, message });
  },
  sendErrorResponse: (res, error, statusCode) => {
    res.status(statusCode).json({ success: false, error: error.message });
  }
}));

// Mock fs operations
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    mkdir: jest.fn(),
    readdir: jest.fn(),
    stat: jest.fn(),
    copyFile: jest.fn()
  }
}));

const { safeReadJsonFile, safeWriteJsonFile } = require('../middleware/errorHandler');

describe('API Integration Tests', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up express app similar to server.js
    app = express();
    app.use(cors());
    app.use(express.json());
    
    // Import routes after mocking
    const { requireAuth, requireAdmin, loginHandler, logoutHandler } = require('../middleware/auth');
    const { validateHero, validateWork, validateContact, validateFAQ, validateIdParam } = require('../middleware/validation');
    const { asyncHandler, sendSuccessResponse } = require('../middleware/errorHandler');
    
    // Authentication routes
    app.post('/api/auth/login', loginHandler);
    app.post('/api/auth/logout', logoutHandler);
    
    // Hero routes
    app.get('/api/hero', asyncHandler(async (req, res) => {
      const data = await safeReadJsonFile('data/hero.json');
      sendSuccessResponse(res, data);
    }));
    
    app.put('/api/hero/:id', requireAuth, requireAdmin, validateIdParam, validateHero, asyncHandler(async (req, res) => {
      await safeWriteJsonFile('data/hero.json', req.body);
      sendSuccessResponse(res, null, 'Hero data updated successfully');
    }));
    
    // Work routes
    app.get('/api/work', asyncHandler(async (req, res) => {
      const data = await safeReadJsonFile('data/work.json');
      sendSuccessResponse(res, data);
    }));
    
    app.put('/api/work', requireAuth, requireAdmin, validateWork, asyncHandler(async (req, res) => {
      await safeWriteJsonFile('data/work.json', req.body);
      sendSuccessResponse(res, null, 'Work data updated successfully');
    }));
    
    // Contact routes
    app.get('/api/contact', asyncHandler(async (req, res) => {
      const data = await safeReadJsonFile('data/contact.json');
      sendSuccessResponse(res, data);
    }));
    
    app.put('/api/contact/:id', requireAuth, requireAdmin, validateIdParam, validateContact, asyncHandler(async (req, res) => {
      await safeWriteJsonFile('data/contact.json', req.body);
      sendSuccessResponse(res, null, 'Contact data updated successfully');
    }));
    
    // FAQ routes
    app.get('/api/faq', asyncHandler(async (req, res) => {
      const data = await safeReadJsonFile('data/faq.json');
      sendSuccessResponse(res, data);
    }));
    
    app.put('/api/faq', requireAuth, requireAdmin, validateFAQ, asyncHandler(async (req, res) => {
      await safeWriteJsonFile('data/faq.json', req.body);
      sendSuccessResponse(res, null, 'FAQ data updated successfully');
    }));
    
    // Health check
    app.get('/api/health', (req, res) => {
      sendSuccessResponse(res, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });
  });

  describe('Authentication Endpoints', () => {
    test('POST /api/auth/login should return token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBe('mock-token');
    });

    test('POST /api/auth/logout should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logged out successfully');
    });
  });

  describe('Hero Endpoints', () => {
    test('GET /api/hero should return hero data', async () => {
      const mockHeroData = {
        title: 'STUDIO PICKENS',
        subtitle: 'Creative Excellence',
        atelierTitle: 'CUSTOM ATELIER WIGS',
        atelierDescription: 'Professional wig services'
      };

      safeReadJsonFile.mockResolvedValue(mockHeroData);

      const response = await request(app).get('/api/hero');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockHeroData);
    });

    test('PUT /api/hero/:id should update hero data', async () => {
      const updateData = {
        title: 'UPDATED STUDIO PICKENS',
        subtitle: 'Updated Excellence',
        atelierTitle: 'UPDATED ATELIER WIGS',
        atelierDescription: 'Updated professional wig services'
      };

      safeWriteJsonFile.mockResolvedValue(true);

      const response = await request(app)
        .put('/api/hero/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Hero data updated successfully');
      expect(safeWriteJsonFile).toHaveBeenCalledWith('data/hero.json', updateData);
    });
  });

  describe('Work Endpoints', () => {
    test('GET /api/work should return work data', async () => {
      const mockWorkData = {
        banner: { title: 'OUR WORK' },
        projects: [
          { id: 1, title: 'Project 1', client: 'Client A', category: 'EDITORIAL' }
        ]
      };

      safeReadJsonFile.mockResolvedValue(mockWorkData);

      const response = await request(app).get('/api/work');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockWorkData);
    });

    test('PUT /api/work should update work data', async () => {
      const updateData = {
        banner: { title: 'UPDATED WORK' },
        projects: [
          { id: 1, title: 'Updated Project 1', client: 'Updated Client A', category: 'EDITORIAL' }
        ]
      };

      safeWriteJsonFile.mockResolvedValue(true);

      const response = await request(app)
        .put('/api/work')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Work data updated successfully');
      expect(safeWriteJsonFile).toHaveBeenCalledWith('data/work.json', updateData);
    });
  });

  describe('Contact Endpoints', () => {
    test('GET /api/contact should return contact data', async () => {
      const mockContactData = {
        emails: {
          brooklyn: 'brooklyn@studiopickens.com',
          beverlyHills: 'beverlyhills@studiopickens.com',
          press: 'press@studiopickens.com'
        },
        phone: '+1234567890'
      };

      safeReadJsonFile.mockResolvedValue(mockContactData);

      const response = await request(app).get('/api/contact');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockContactData);
    });

    test('PUT /api/contact/:id should update contact data', async () => {
      const updateData = {
        emails: {
          brooklyn: 'updated-brooklyn@studiopickens.com',
          beverlyHills: 'updated-beverlyhills@studiopickens.com',
          press: 'updated-press@studiopickens.com'
        },
        phone: '+9876543210'
      };

      safeWriteJsonFile.mockResolvedValue(true);

      const response = await request(app)
        .put('/api/contact/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Contact data updated successfully');
      expect(safeWriteJsonFile).toHaveBeenCalledWith('data/contact.json', updateData);
    });
  });

  describe('FAQ Endpoints', () => {
    test('GET /api/faq should return FAQ data', async () => {
      const mockFAQData = {
        banner: { desktopImage: '/images/faq/banner.jpg' },
        items: [
          { id: 1, question: 'What services do you offer?', answer: 'We offer professional wig services.' }
        ]
      };

      safeReadJsonFile.mockResolvedValue(mockFAQData);

      const response = await request(app).get('/api/faq');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockFAQData);
    });

    test('PUT /api/faq should update FAQ data', async () => {
      const updateData = {
        banner: { desktopImage: '/images/faq/updated-banner.jpg' },
        items: [
          { id: 1, question: 'Updated question?', answer: 'Updated answer.' }
        ]
      };

      safeWriteJsonFile.mockResolvedValue(true);

      const response = await request(app)
        .put('/api/faq')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('FAQ data updated successfully');
      expect(safeWriteJsonFile).toHaveBeenCalledWith('data/faq.json', updateData);
    });
  });

  describe('Health Check', () => {
    test('GET /api/health should return health status', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('healthy');
      expect(response.body.data.timestamp).toBeDefined();
      expect(response.body.data.uptime).toBeDefined();
    });
  });
});