// LMDhub - White Label Configuration
// This file contains all configurable settings for white-labeling the platform

export const whiteLabelConfig = {
  // Company Information
  company: {
    name: 'LMDhub',
    tagline: 'Last Mile Delivery Hub - Complete Delivery Management Platform',
    domain: 'lmdhub.com',
    phone: '(801) 555-0123',
    email: 'support@lmdhub.com',
    address: 'Salt Lake City, UT',
    website: 'https://lmdhub.com'
  },

  // Branding & Design
  branding: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    logo: null, // URL to company logo
    favicon: null, // URL to favicon
    fonts: {
      primary: 'Inter',
      secondary: 'Roboto'
    }
  },

  // Service Areas
  serviceAreas: {
    primary: 'Salt Lake City, UT',
    secondary: ['Provo', 'Ogden', 'Park City', 'Sandy', 'West Valley City'],
    radius: 50, // miles
    coverage: {
      sameDay: true,
      nextDay: true,
      scheduled: true,
      urgent: true
    }
  },

  // Pricing Structure
  pricing: {
    baseRate: 25,
    perMile: 2.50,
    multipleDrops: {
      enabled: true,
      additionalFee: 5
    },
    terrainFees: {
      enabled: true,
      mountain: 15,
      rural: 10,
      urban: 0
    },
    weightFees: {
      enabled: true,
      light: 0, // 0-10 lbs
      medium: 5, // 11-50 lbs
      heavy: 15 // 50+ lbs
    },
    urgencyFees: {
      sameDay: 20,
      urgent: 35,
      scheduled: 0
    }
  },

  // Business Categories for Lead Generation
  businessCategories: [
    'Restaurants & Food Service',
    'Retail Stores',
    'Manufacturing',
    'Healthcare',
    'Construction',
    'Landscaping',
    'Automotive',
    'Real Estate',
    'Professional Services',
    'E-commerce',
    'Garden Centers',
    'Hardware Stores',
    'Contractors',
    'Medical Supplies',
    'Office Supplies'
  ],

  // Platform Features
  features: {
    customerPortal: true,
    leadGeneration: true,
    roiCalculator: true,
    crmDashboard: true,
    analytics: true,
    whiteLabel: true,
    apiAccess: true,
    mobileApp: false,
    realTimeTracking: true,
    paymentProcessing: true,
    emailNotifications: true,
    smsNotifications: true
  },

  // Authentication & Security
  authentication: {
    method: 'email', // email, phone, social
    mfa: true,
    sessionTimeout: 24, // hours
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    }
  },

  // Integrations
  integrations: {
    googlePlaces: true,
    stripe: true,
    twilio: true,
    sendGrid: true,
    quickbooks: false,
    shopify: false,
    woocommerce: false
  },

  // Support
  support: {
    phone: '(801) 555-0123',
    email: 'support@lmdhub.com',
    hours: 'Monday - Friday, 8AM - 6PM MST',
    emergency: '(801) 555-9999'
  },

  // Legal
  legal: {
    termsOfService: 'https://lmdhub.com/terms',
    privacyPolicy: 'https://lmdhub.com/privacy',
    serviceAgreement: 'https://lmdhub.com/agreement'
  }
}

// Helper functions for configuration management
export const getConfig = (path) => {
  const keys = path.split('.')
  let value = whiteLabelConfig
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return null
    }
  }
  
  return value
}

export const updateConfig = (path, newValue) => {
  const keys = path.split('.')
  let current = whiteLabelConfig
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {}
    }
    current = current[keys[i]]
  }
  
  current[keys[keys.length - 1]] = newValue
}

export default whiteLabelConfig
