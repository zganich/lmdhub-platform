// White Label Configuration
// This file can be easily customized for different delivery companies

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

  // Branding
  branding: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    logo: null, // URL to company logo
    favicon: null // URL to favicon
  },

  // Service Areas
  serviceAreas: {
    primary: 'Salt Lake City Metro',
    radius: 15, // miles
    cities: ['Salt Lake City', 'Sandy', 'West Jordan', 'Murray', 'Taylorsville'],
    states: ['UT']
  },

  // Pricing Structure
  pricing: {
    basePrice: 25,
    perMile: 2.50,
    terrainFees: {
      flat: 0,
      hilly: 15,
      mountainous: 25,
      rural: 20
    },
    multipleDropFee: 12,
    heavyItemFee: 8,
    rushFee: 10
  },

  // Business Categories for Lead Generation
  businessCategories: {
    'retail-stores': {
      name: 'Retail Stores',
      description: 'Brick & mortar stores needing local delivery',
      targeting: ['appliance stores', 'furniture stores', 'electronics stores', 'home improvement'],
      painPoints: ['High delivery costs', 'Customer wait times', 'Limited delivery radius'],
      savings: '30-50% delivery cost reduction'
    },
    'contractors': {
      name: 'Contractors & Trades',
      description: 'Construction and service businesses',
      targeting: ['plumbers', 'electricians', 'contractors', 'HVAC', 'roofers'],
      painPoints: ['Material delivery delays', 'Job site coordination', 'Multiple supplier pickups'],
      savings: '40-60% time savings on material delivery'
    },
    'suppliers': {
      name: 'Supply Companies',
      description: 'Businesses selling to other businesses',
      targeting: ['lumber yards', 'electrical suppliers', 'plumbing suppliers', 'hardware wholesalers'],
      painPoints: ['Delivery scheduling conflicts', 'Customer service issues', 'Route optimization'],
      savings: '25-40% operational cost reduction'
    },
    'restaurants': {
      name: 'Restaurants & Food Service',
      description: 'Food businesses needing ingredient delivery',
      targeting: ['restaurants', 'catering', 'food trucks', 'cafes'],
      painPoints: ['Ingredient delivery timing', 'Multiple supplier coordination', 'Last-minute orders'],
      savings: '20-35% delivery cost savings'
    },
    'offices': {
      name: 'Office & Professional',
      description: 'Businesses needing document and supply delivery',
      targeting: ['law firms', 'accounting firms', 'real estate', 'consulting'],
      painPoints: ['Document delivery delays', 'Supply restocking', 'Client service'],
      savings: '15-30% delivery cost reduction'
    }
  },

  // Features
  features: {
    realTimeTracking: true,
    multipleDrops: true,
    terrainPricing: true,
    addressAutoComplete: true,
    crmIntegration: true,
    analytics: true,
    mobileApp: false, // Set to true if mobile app is available
    apiAccess: false // Set to true if API access is provided
  },

  // Authentication
  auth: {
    demoCredentials: {
      username: 'admin',
      password: 'delivery2024'
    },
    requireMFA: false,
    sessionTimeout: 24 // hours
  },

  // Integrations
  integrations: {
    googlePlaces: false, // Set to true when API key is available
    stripe: false, // Set to true when payment processing is added
    twilio: false, // Set to true when SMS notifications are added
    sendgrid: false // Set to true when email automation is added
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
    termsOfService: '/terms',
    privacyPolicy: '/privacy',
    serviceAgreement: '/agreement'
  }
}

// Helper function to get config value
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

// Helper function to update config
export const updateConfig = (path, newValue) => {
  const keys = path.split('.')
  let current = whiteLabelConfig
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (current && typeof current === 'object' && keys[i] in current) {
      current = current[keys[i]]
    } else {
      return false
    }
  }
  
  if (current && typeof current === 'object' && keys[keys.length - 1] in current) {
    current[keys[keys.length - 1]] = newValue
    return true
  }
  
  return false
}

export default whiteLabelConfig
