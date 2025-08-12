const Joi = require('joi');

// Base validation helpers
const validateId = Joi.number().integer().positive();
const validateString = Joi.string().trim().min(1).max(1000);
const validateOptionalString = Joi.string().trim().allow('').max(1000);
const validateEmail = Joi.string().email().max(255);
const validateUrl = Joi.string().uri().max(2000);
const validateImagePath = Joi.string().pattern(/^\/images\/[a-zA-Z0-9_\-\/\.\s]+\.(jpg|jpeg|png|gif|webp)$/i).allow('');
const validateYear = Joi.number().integer().min(1900).max(2030);

// Transform validation
const transformSchema = Joi.object({
  scale: Joi.number().min(0.1).max(5).default(1),
  translateX: Joi.number().min(-200).max(200).default(0),
  translateY: Joi.number().min(-200).max(200).default(0),
  flip: Joi.boolean().default(false)
});

// Position validation
const positionSchema = Joi.object({
  top: Joi.string().max(50).optional(),
  bottom: Joi.string().max(50).optional(),
  left: Joi.string().max(50).optional(),
  right: Joi.string().max(50).optional()
});

// Banner validation
const bannerSchema = Joi.object({
  logoSize: Joi.object({
    scale: Joi.number().min(0.5).max(3).default(1),
    unit: Joi.string().valid('rem', 'px', 'em').default('rem')
  }).default(),
  titleSize: Joi.object({
    scale: Joi.number().min(0.5).max(3).default(1),
    unit: Joi.string().valid('rem', 'px', 'em').default('rem')
  }).default()
});

// Hero validation schema - more flexible
const heroSchema = Joi.object({
  id: validateId.optional(),
  title: validateString.required(),
  subtitle: validateOptionalString.default(''),
  atelierTitle: validateString.required(),
  atelierDescription: validateString.required(),
  banner: Joi.object({
    logoSize: Joi.object({
      scale: Joi.number().min(0.1).max(5).default(1),
      unit: Joi.string().default('rem')
    }).optional(),
    titleSize: Joi.object({
      scale: Joi.number().min(0.1).max(5).default(1),
      unit: Joi.string().default('rem')
    }).optional()
  }).optional(),
  backgroundImages: Joi.array().items(
    Joi.object({
      image: Joi.string().required(),
      alt: validateString.required(),
      transform: Joi.object({
        scale: Joi.number().min(0.1).max(5).default(1),
        translateX: Joi.number().min(-500).max(500).default(0),
        translateY: Joi.number().min(-500).max(500).default(0),
        flip: Joi.boolean().default(false)
      }).optional()
    })
  ).max(10).optional(),
  polaroids: Joi.array().items(
    Joi.object({
      image: Joi.string().required(),
      alt: validateString.required(),
      rotation: Joi.number().min(-45).max(45).default(0),
      position: Joi.object().optional()
    })
  ).max(10).optional(),
  bannerHeight: Joi.object({
    min: Joi.number().min(100).max(2000).default(400),
    preferred: Joi.number().min(10).max(200).default(45),
    max: Joi.number().min(200).max(3000).default(800)
  }).optional()
}).unknown(false); // This will reject unknown fields

// Work validation schema
const workProjectSchema = Joi.object({
  id: validateId.optional(),
  title: validateString.required(),
  client: validateString.required(),
  category: Joi.string().valid('EDITORIAL', 'FILM & TV', 'THEATRE', 'CONCERT', 'MUSIC VIDEO', 'LIVE').required(),
  year: validateYear.required(),
  image: validateImagePath.required(),
  alt: validateOptionalString.default(''),
  description: validateOptionalString.default(''),
  featured: Joi.boolean().default(false),
  order: Joi.number().integer().min(0).default(0)
});

const workSchema = Joi.object({
  banner: Joi.object({
    title: validateString.required(),
    subtitle: validateOptionalString.default(''),
    desktopImage: validateImagePath.required(),
    mobileImage: validateImagePath.required(),
    transform: transformSchema.required()
  }).required(),
  sectionBanners: Joi.array().items(
    Joi.object({
      category: Joi.string().valid('EDITORIAL', 'FILM & TV', 'THEATRE', 'CONCERT', 'MUSIC VIDEO', 'LIVE').required(),
      image: validateImagePath.required(),
      transform: transformSchema.required()
    })
  ).max(10).default([]),
  projects: Joi.array().items(workProjectSchema).max(50).required()
});

// Process validation schema
const processStepSchema = Joi.object({
  id: validateId.optional(),
  title: validateString.required(),
  description: validateString.required(),
  image: validateImagePath.required(),
  alt: validateString.required(),
  alignment: Joi.string().valid('left', 'right').required(),
  order: Joi.number().integer().min(0).default(0)
});

const processSchema = Joi.object({
  banner: Joi.object({
    title: validateString.required(),
    subtitle: validateOptionalString.default(''),
    desktopImage: validateImagePath.required(),
    mobileImage: validateImagePath.required(),
    transform: transformSchema.required(),
    circleScale: Joi.number().min(0.5).max(2).default(1),
    headingScale: Joi.object({
      mobile: Joi.number().min(0.5).max(2).default(1),
      desktop: Joi.number().min(0.5).max(2).default(1)
    }).default()
  }).required(),
  teamCircles: Joi.object({
    size: Joi.number().min(0.5).max(3).default(1),
    strokeWidth: Joi.number().min(1).max(10).default(2),
    gap: Joi.number().min(0).max(50).default(10),
    position: positionSchema.default({})
  }).default(),
  processSteps: Joi.array().items(processStepSchema).max(20).required()
});

// Story validation schema
const storyItemSchema = Joi.object({
  id: validateId.optional(),
  type: Joi.string().valid('polaroid', 'text', 'button').required(),
  content: Joi.alternatives().conditional('type', {
    switch: [
      {
        is: 'polaroid',
        then: Joi.object({
          image: validateImagePath.required(),
          alt: validateString.required(),
          year: validateYear.optional()
        })
      },
      {
        is: 'text',
        then: Joi.object({
          content: validateString.required(),
          font: validateString.default('default'),
          rotation: Joi.number().min(-45).max(45).default(0),
          fontSize: Joi.number().min(10).max(72).default(16)
        })
      },
      {
        is: 'button',
        then: Joi.object({
          text: validateString.required(),
          action: validateString.required(),
          href: validateUrl.optional()
        })
      }
    ]
  }).required(),
  position: Joi.object({
    desktop: positionSchema.required(),
    mobile: positionSchema.required(),
    transform: transformSchema.optional()
  }).required(),
  rotation: Joi.object({
    desktop: Joi.number().min(-180).max(180).default(0),
    mobile: Joi.number().min(-180).max(180).default(0)
  }).optional(),
  fontSize: Joi.object({
    desktop: validateString.required(),
    mobile: validateString.required()
  }).optional(),
  visibility: Joi.object({
    desktop: Joi.boolean().default(true),
    mobile: Joi.boolean().default(true)
  }).default()
});

const storyCircleSchema = Joi.object({
  id: validateId.optional(),
  name: validateString.required(),
  type: Joi.string().valid('simple', 'dashed_rotating', 'mixed').required(),
  position: Joi.object({
    desktop: positionSchema.required(),
    mobile: positionSchema.required()
  }).required(),
  size: Joi.object({
    desktop: Joi.object({
      width: validateString.required(),
      height: validateString.required()
    }).required(),
    mobile: Joi.object({
      width: validateString.required(),
      height: validateString.required()
    }).required()
  }).required(),
  content: Joi.object({
    title: validateString.required(),
    description: validateOptionalString.default('')
  }).required(),
  items: Joi.array().items(storyItemSchema).max(10).required()
});

const storySchema = Joi.object({
  id: validateId.optional(),
  circles: Joi.array().items(storyCircleSchema).max(20).required(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional()
});

// Locations validation schema
const locationSchema = Joi.object({
  id: validateId.optional(),
  name: validateString.required(),
  address: validateString.required(),
  image: validateImagePath.required(),
  alt: validateString.required(),
  googleMapsUrl: validateUrl.optional(),
  variant: Joi.string().valid('left', 'right').default('left'),
  order: Joi.number().integer().min(0).default(0)
});

const locationsSchema = Joi.object({
  banner: Joi.object({
    title: validateString.required(),
    animationSettings: Joi.object({
      delay: Joi.number().min(0).max(5000).default(0),
      duration: Joi.number().min(100).max(10000).default(1000),
      circleCount: Joi.number().min(1).max(20).default(3)
    }).default()
  }).required(),
  locations: Joi.array().items(locationSchema).max(10).required()
});

// Contact validation schema
const contactSchema = Joi.object({
  id: validateId.optional(),
  emails: Joi.object({
    brooklyn: validateEmail.required(),
    beverlyHills: validateEmail.required(),
    press: validateEmail.required()
  }).required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d\s\-\(\)]{0,20}$/).required(),
  locations: Joi.array().items(locationSchema).max(10).default([])
});

// FAQ validation schema
const faqItemSchema = Joi.object({
  id: validateId.optional(),
  question: validateString.required(),
  answer: validateString.required(),
  category: validateOptionalString.default('general'),
  order: Joi.number().integer().min(0).default(0)
});

const faqSchema = Joi.object({
  id: Joi.number().optional(),
  banner: Joi.object({
    backgroundImage: Joi.object({
      desktop: validateImagePath.required(),
      mobile: validateImagePath.required()
    }).required(),
    height: Joi.string().required(),
    objectPosition: Joi.string().required(),
    transform: transformSchema.required()
  }).required(),
  items: Joi.array().items(faqItemSchema).max(50).required(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional()
});

// Image upload validation
const imageUploadSchema = Joi.object({
  mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp').required(),
  size: Joi.number().max(10485760).required(), // 10MB max
  filename: Joi.string().pattern(/^[a-zA-Z0-9_\-\.]+$/).required()
}).unknown(true); // Allow additional properties from multer

/**
 * Validation middleware factory
 */
function validateSchema(schema, property = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errorDetails
      });
    }

    // Replace the request data with validated and sanitized data
    req[property] = value;
    next();
  };
}

/**
 * Custom validation for file uploads
 */
function validateFileUpload(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded',
      code: 'NO_FILE'
    });
  }

  const { error } = imageUploadSchema.validate(req.file);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid file upload',
      code: 'INVALID_FILE',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  next();
}

/**
 * Validate ID parameters
 */
function validateIdParam(req, res, next) {
  const { error, value } = validateId.validate(req.params.id);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID parameter',
      code: 'INVALID_ID'
    });
  }

  req.params.id = value;
  next();
}

module.exports = {
  // Schema exports
  heroSchema,
  workSchema,
  processSchema,
  storySchema,
  locationsSchema,
  contactSchema,
  faqSchema,
  workProjectSchema,
  processStepSchema,
  faqItemSchema,
  
  // Validation middleware
  validateSchema,
  validateFileUpload,
  validateIdParam,
  
  // Specific validators
  validateHero: validateSchema(heroSchema),
  validateWork: validateSchema(workSchema),
  validateProcess: validateSchema(processSchema),
  validateStory: validateSchema(storySchema),
  validateLocations: validateSchema(locationsSchema),
  validateContact: validateSchema(contactSchema),
  validateFAQ: validateSchema(faqSchema),
  validateWorkProject: validateSchema(workProjectSchema),
  validateProcessStep: validateSchema(processStepSchema),
  validateFAQItem: validateSchema(faqItemSchema)
};