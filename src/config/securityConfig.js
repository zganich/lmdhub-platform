// Security Configuration for LMDhub
// This file centralizes all security settings and validation rules

export const securityConfig = {
  // Environment Variables (Store in Vercel's encrypted env store)
  environment: {
    // Payment Processing
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    
    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    
    // Authentication
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    
    // External APIs
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    
    // Email Service
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    
    // SMS Service
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    
    // Monitoring
    SENTRY_DSN: process.env.SENTRY_DSN,
    
    // Feature Flags
    ENABLE_PAYMENTS: process.env.ENABLE_PAYMENTS === 'true',
    ENABLE_SMS_NOTIFICATIONS: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    ENABLE_GOOGLE_PLACES: process.env.ENABLE_GOOGLE_PLACES === 'true'
  },

  // Input Validation Rules
  validation: {
    // User Registration
    user: {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 254
      },
      password: {
        required: true,
        minLength: 8,
        maxLength: 128,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
      },
      firstName: {
        required: true,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/
      },
      lastName: {
        required: true,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/
      },
      phone: {
        required: false,
        pattern: /^\+?[\d\s\-\(\)]+$/,
        maxLength: 20
      },
      company: {
        required: false,
        maxLength: 100
      }
    },

    // Delivery Addresses
    address: {
      street: {
        required: true,
        maxLength: 200,
        pattern: /^[a-zA-Z0-9\s\.,#\-]+$/
      },
      city: {
        required: true,
        maxLength: 100,
        pattern: /^[a-zA-Z\s]+$/
      },
      state: {
        required: true,
        maxLength: 2,
        pattern: /^[A-Z]{2}$/
      },
      zipCode: {
        required: true,
        pattern: /^\d{5}(-\d{4})?$/
      },
      suite: {
        required: false,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9\s\-]+$/
      }
    },

    // Delivery Details
    delivery: {
      pickupAddress: {
        required: true,
        maxLength: 500
      },
      deliveryAddress: {
        required: true,
        maxLength: 500
      },
      specialInstructions: {
        required: false,
        maxLength: 1000
      },
      scheduledDate: {
        required: false,
        pattern: /^\d{4}-\d{2}-\d{2}$/
      },
      scheduledTime: {
        required: false,
        pattern: /^\d{2}:\d{2}$/
      }
    },

    // Payment Information
    payment: {
      amount: {
        required: true,
        min: 0.01,
        max: 10000,
        pattern: /^\d+(\.\d{1,2})?$/
      },
      currency: {
        required: true,
        pattern: /^[A-Z]{3}$/
      }
    }
  },

  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://js.stripe.com",
      "https://maps.googleapis.com",
      "https://www.googletagmanager.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com"
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "https://maps.googleapis.com",
      "https://maps.gstatic.com"
    ],
    'connect-src': [
      "'self'",
      "https://api.stripe.com",
      "https://maps.googleapis.com",
      "https://api.sendgrid.com",
      "https://api.twilio.com"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com",
      "https://hooks.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  },

  // Session Configuration
  session: {
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    }
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-jwt-secret-change-in-production',
    expiresIn: '24h',
    algorithm: 'HS256',
    issuer: 'lmdhub',
    audience: 'lmdhub-users'
  },

  // Password Policy
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90, // days
    preventReuse: 5 // last 5 passwords
  },

  // Data Retention Policy
  dataRetention: {
    userAccounts: 7 * 365, // 7 years
    deliveryHistory: 3 * 365, // 3 years
    paymentRecords: 7 * 365, // 7 years (tax compliance)
    auditLogs: 2 * 365, // 2 years
    temporaryData: 30 // 30 days
  },

  // GDPR Compliance
  gdpr: {
    dataProcessingAgreement: true,
    dataLocality: 'US', // Vercel may replicate globally
    rightToErasure: true,
    rightToPortability: true,
    consentManagement: true,
    dataMinimization: true
  },

  // PCI DSS Compliance (via Stripe)
  pci: {
    useStripeElements: true,
    noCardDataStorage: true,
    secureTransmission: true,
    accessControl: true,
    auditLogging: true
  },

  // Incident Response
  incidentResponse: {
    contactEmail: 'security@lmdhub.com',
    responseTime: '4 hours',
    notificationTime: '24 hours',
    escalationMatrix: {
      low: 'security@lmdhub.com',
      medium: 'cto@lmdhub.com',
      high: 'ceo@lmdhub.com'
    }
  },

  // Monitoring and Logging
  monitoring: {
    errorTracking: 'sentry',
    performanceMonitoring: true,
    securityLogging: true,
    auditLogging: true,
    alertThresholds: {
      failedLogins: 5,
      suspiciousActivity: 3,
      systemErrors: 10
    }
  }
}

// Validation Functions
export const validateInput = (data, schema) => {
  const errors = {}
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field]
    
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`
      continue
    }
    
    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors[field] = `${field} format is invalid`
    }
    
    if (value && rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`
    }
    
    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must be no more than ${rules.maxLength} characters`
    }
    
    if (value && rules.min && parseFloat(value) < rules.min) {
      errors[field] = `${field} must be at least ${rules.min}`
    }
    
    if (value && rules.max && parseFloat(value) > rules.max) {
      errors[field] = `${field} must be no more than ${rules.max}`
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Sanitization Functions
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

// Password Strength Checker
export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  }
  
  const score = Object.values(checks).filter(Boolean).length
  
  return {
    score,
    isStrong: score >= 4,
    checks,
    feedback: getPasswordFeedback(checks)
  }
}

const getPasswordFeedback = (checks) => {
  const feedback = []
  
  if (!checks.length) feedback.push('Password must be at least 8 characters')
  if (!checks.uppercase) feedback.push('Include at least one uppercase letter')
  if (!checks.lowercase) feedback.push('Include at least one lowercase letter')
  if (!checks.numbers) feedback.push('Include at least one number')
  if (!checks.special) feedback.push('Include at least one special character (@$!%*?&)')
  
  return feedback
}

// Rate Limiting Helper
export const createRateLimiter = (maxRequests, windowMs) => {
  const requests = new Map()
  
  return (identifier) => {
    const now = Date.now()
    const windowStart = now - windowMs
    
    if (!requests.has(identifier)) {
      requests.set(identifier, [])
    }
    
    const userRequests = requests.get(identifier)
    const recentRequests = userRequests.filter(time => time > windowStart)
    
    if (recentRequests.length >= maxRequests) {
      return false // Rate limit exceeded
    }
    
    recentRequests.push(now)
    requests.set(identifier, recentRequests)
    
    return true // Request allowed
  }
}

// Security Headers
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

// Audit Logging
export const auditLog = (action, userId, details) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
    ipAddress: details.ipAddress,
    userAgent: details.userAgent,
    sessionId: details.sessionId
  }
  
  // In production, send to secure logging service
  console.log('AUDIT_LOG:', JSON.stringify(logEntry))
  
  // TODO: Send to secure logging service (e.g., AWS CloudWatch, DataDog)
}

export default securityConfig
