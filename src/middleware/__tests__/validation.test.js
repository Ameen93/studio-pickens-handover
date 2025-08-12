const { validateHero, validateWork, validateContact, validateFAQ } = require('../validation');
const request = require('supertest');
const express = require('express');

describe('Validation Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('validateHero', () => {
    test('should pass with valid hero data', async () => {
      app.post('/test', validateHero, (req, res) => {
        res.json({ success: true, data: req.body });
      });

      const validHeroData = {
        title: 'STUDIO PICKENS',
        subtitle: 'Creative Excellence',
        atelierTitle: 'CUSTOM ATELIER WIGS',
        atelierDescription: 'Professional wig services'
      };

      const response = await request(app)
        .post('/test')
        .send(validHeroData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should reject missing required fields', async () => {
      app.post('/test', validateHero, (req, res) => {
        res.json({ success: true });
      });

      const invalidHeroData = {
        title: 'STUDIO PICKENS'
        // Missing required fields
      };

      const response = await request(app)
        .post('/test')
        .send(invalidHeroData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'atelierTitle',
            message: expect.stringContaining('required')
          })
        ])
      );
    });

    test('should reject unknown fields', async () => {
      app.post('/test', validateHero, (req, res) => {
        res.json({ success: true });
      });

      const invalidHeroData = {
        title: 'STUDIO PICKENS',
        atelierTitle: 'CUSTOM ATELIER WIGS',
        atelierDescription: 'Professional wig services',
        unknownField: 'this should not be allowed'
      };

      const response = await request(app)
        .post('/test')
        .send(invalidHeroData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('validateWork', () => {
    test('should pass with valid work data', async () => {
      app.post('/test', validateWork, (req, res) => {
        res.json({ success: true, data: req.body });
      });

      const validWorkData = {
        banner: {
          title: 'OUR WORK',
          subtitle: 'Creative Projects',
          desktopImage: '/images/work/banner-desktop.jpg',
          mobileImage: '/images/work/banner-mobile.jpg',
          transform: {
            scale: 1,
            translateX: 0,
            translateY: 0,
            flip: false
          }
        },
        projects: [
          {
            title: 'Project 1',
            client: 'Client A',
            category: 'EDITORIAL',
            year: 2023,
            image: '/images/work/project1.jpg',
            alt: 'Project 1 alt text',
            description: 'Project description',
            featured: true,
            order: 1
          }
        ]
      };

      const response = await request(app)
        .post('/test')
        .send(validWorkData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should reject invalid category', async () => {
      app.post('/test', validateWork, (req, res) => {
        res.json({ success: true });
      });

      const invalidWorkData = {
        banner: {
          title: 'OUR WORK',
          desktopImage: '/images/work/banner-desktop.jpg',
          mobileImage: '/images/work/banner-mobile.jpg',
          transform: { scale: 1, translateX: 0, translateY: 0, flip: false }
        },
        projects: [
          {
            title: 'Project 1',
            client: 'Client A',
            category: 'INVALID_CATEGORY',
            year: 2023,
            image: '/images/work/project1.jpg'
          }
        ]
      };

      const response = await request(app)
        .post('/test')
        .send(invalidWorkData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('validateContact', () => {
    test('should pass with valid contact data', async () => {
      app.post('/test', validateContact, (req, res) => {
        res.json({ success: true, data: req.body });
      });

      const validContactData = {
        emails: {
          brooklyn: 'brooklyn@studiopickens.com',
          beverlyHills: 'beverlyhills@studiopickens.com',
          press: 'press@studiopickens.com'
        },
        phone: '+1234567890',
        locations: []
      };

      const response = await request(app)
        .post('/test')
        .send(validContactData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should reject invalid email format', async () => {
      app.post('/test', validateContact, (req, res) => {
        res.json({ success: true });
      });

      const invalidContactData = {
        emails: {
          brooklyn: 'invalid-email',
          beverlyHills: 'beverlyhills@studiopickens.com',
          press: 'press@studiopickens.com'
        },
        phone: '+1234567890'
      };

      const response = await request(app)
        .post('/test')
        .send(invalidContactData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('validateFAQ', () => {
    test('should pass with valid FAQ data', async () => {
      app.post('/test', validateFAQ, (req, res) => {
        res.json({ success: true, data: req.body });
      });

      const validFAQData = {
        banner: {
          desktopImage: '/images/faq/banner-desktop.jpg',
          mobileImage: '/images/faq/banner-mobile.jpg',
          height: 400,
          objectPosition: 'center',
          transform: {
            scale: 1,
            translateX: 0,
            translateY: 0,
            flip: false
          }
        },
        items: [
          {
            question: 'What services do you offer?',
            answer: 'We offer professional wig services.',
            category: 'services',
            order: 1
          }
        ]
      };

      const response = await request(app)
        .post('/test')
        .send(validFAQData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should reject empty question or answer', async () => {
      app.post('/test', validateFAQ, (req, res) => {
        res.json({ success: true });
      });

      const invalidFAQData = {
        banner: {
          desktopImage: '/images/faq/banner-desktop.jpg',
          mobileImage: '/images/faq/banner-mobile.jpg',
          transform: { scale: 1, translateX: 0, translateY: 0, flip: false }
        },
        items: [
          {
            question: '',
            answer: 'We offer professional wig services.',
            category: 'services',
            order: 1
          }
        ]
      };

      const response = await request(app)
        .post('/test')
        .send(invalidFAQData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });
});