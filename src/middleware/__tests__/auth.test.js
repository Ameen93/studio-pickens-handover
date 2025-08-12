const request = require('supertest');
const express = require('express');
const { requireAuth, requireAdmin, loginHandler, logoutHandler } = require('../auth');

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn()
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Authentication Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    jest.clearAllMocks();
  });

  describe('requireAuth middleware', () => {
    test('should pass with valid token', async () => {
      jwt.verify.mockReturnValue({ userId: 'admin', role: 'admin' });
      
      app.get('/protected', requireAuth, (req, res) => {
        res.json({ message: 'Access granted', user: req.user });
      });

      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Access granted');
      expect(response.body.user).toEqual({ userId: 'admin', role: 'admin' });
    });

    test('should reject request without token', async () => {
      app.get('/protected', requireAuth, (req, res) => {
        res.json({ message: 'Access granted' });
      });

      const response = await request(app).get('/protected');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('NO_TOKEN');
    });

    test('should reject request with invalid token', async () => {
      jwt.verify.mockReturnValue(null);
      
      app.get('/protected', requireAuth, (req, res) => {
        res.json({ message: 'Access granted' });
      });

      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INVALID_TOKEN');
    });
  });

  describe('requireAdmin middleware', () => {
    test('should pass with admin role', async () => {
      app.get('/admin', requireAdmin, (req, res) => {
        res.json({ message: 'Admin access granted' });
      });

      const response = await request(app)
        .get('/admin')
        .set('user', JSON.stringify({ userId: 'admin', role: 'admin' }));

      expect(response.status).toBe(200);
    });

    test('should reject non-admin user', async () => {
      app.use((req, res, next) => {
        req.user = { userId: 'user', role: 'user' };
        next();
      });

      app.get('/admin', requireAdmin, (req, res) => {
        res.json({ message: 'Admin access granted' });
      });

      const response = await request(app).get('/admin');

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INSUFFICIENT_PERMISSIONS');
    });
  });

  describe('loginHandler', () => {
    test('should authenticate valid credentials', async () => {
      process.env.ADMIN_USERNAME = 'admin';
      process.env.ADMIN_PASSWORD = 'hashed-password';
      
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mock-token');

      app.post('/login', loginHandler);

      const response = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'correct-password' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBe('mock-token');
    });

    test('should reject invalid credentials', async () => {
      process.env.ADMIN_USERNAME = 'admin';
      process.env.ADMIN_PASSWORD = 'hashed-password';
      
      bcrypt.compare.mockResolvedValue(false);

      app.post('/login', loginHandler);

      const response = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'wrong-password' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INVALID_CREDENTIALS');
    });

    test('should reject missing credentials', async () => {
      app.post('/login', loginHandler);

      const response = await request(app)
        .post('/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('MISSING_CREDENTIALS');
    });
  });

  describe('logoutHandler', () => {
    test('should handle logout successfully', async () => {
      app.post('/logout', logoutHandler);

      const response = await request(app).post('/logout');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logged out successfully');
    });
  });
});